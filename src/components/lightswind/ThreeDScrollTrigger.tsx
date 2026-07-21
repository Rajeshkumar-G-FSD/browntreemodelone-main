"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import type { MotionValue } from "motion/react";
import { cn } from "../lib/utils";

/* -------------------------
   Utility: wrap (unchanged)
   ------------------------- */
export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/* -----------------------------------
   Context to share velocity between rows
   ----------------------------------- */
const ThreeDScrollTriggerContext =
  React.createContext<MotionValue<number> | null>(null);

/* --------------------------
   Container that provides velocity
   -------------------------- */
export function ThreeDScrollTriggerContainer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // map to a bounded factor [-5...5] with smoother behaviour
  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <ThreeDScrollTriggerContext.Provider value={velocityFactor}>
      <div className={cn("relative w-full", className)} {...props}>
        {children}
      </div>
    </ThreeDScrollTriggerContext.Provider>
  );
}

/* --------------------------
   Row entry that chooses shared or local velocity
   -------------------------- */
export function ThreeDScrollTriggerRow(props: ThreeDScrollTriggerRowProps) {
  const sharedVelocityFactor = useContext(ThreeDScrollTriggerContext);
  if (sharedVelocityFactor) {
    return (
      <ThreeDScrollTriggerRowImpl
        {...props}
        velocityFactor={sharedVelocityFactor}
      />
    );
  }
  return <ThreeDScrollTriggerRowLocal {...props} />;
}

/* --------------------------
   Props
   -------------------------- */
interface ThreeDScrollTriggerRowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  baseVelocity?: number; // pixels relative multiplier
  direction?: 1 | -1;
  resetIntervalMs?: number;
}

/* --------------------------
   Impl with velocity passed in
   -------------------------- */
interface ThreeDScrollTriggerRowImplProps extends ThreeDScrollTriggerRowProps {
  velocityFactor: MotionValue<number>;
}

// Wrap a position into [0, unitWidth) — shared by the ambient auto-scroll
// and by drag/inertia so both move through the same seamless loop.
const wrapX = (v: number, unitWidth: number) => {
  if (unitWidth <= 0) return v;
  if (v >= unitWidth) return v % unitWidth;
  if (v < 0) return unitWidth + (v % unitWidth);
  return v;
};

function ThreeDScrollTriggerRowImpl({
  children,
  baseVelocity = 5,
  direction = 1,
  className,
  velocityFactor,
  ...props
}: ThreeDScrollTriggerRowImplProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [numCopies, setNumCopies] = useState(3);
  const x = useMotionValue(0);

  const prevTimeRef = useRef<number | null>(null);
  const unitWidthRef = useRef(0);
  const baseXRef = useRef(0);
  // Hovering this row pauses only this row — other rows are independent
  // ThreeDScrollTriggerRowImpl instances with their own isPausedRef, so they
  // keep moving normally.
  const isPausedRef = useRef(false);

  // Drag-to-swipe: a pointer drag directly drives baseXRef (same convention
  // as the auto-scroll loop below), and isPausedRef holds the ambient
  // animation off for the duration of the drag *and* the inertia coast that
  // follows release, so the two never fight over baseXRef in the same frame.
  const dragRef = useRef<{ startX: number; startBaseX: number; lastX: number; lastT: number; velocity: number; moved: boolean; captured: boolean } | null>(null);
  const inertiaRafRef = useRef<number | null>(null);
  const suppressNextClickRef = useRef(false);

  const stopInertia = () => {
    if (inertiaRafRef.current != null) {
      cancelAnimationFrame(inertiaRafRef.current);
      inertiaRafRef.current = null;
    }
  };
  useEffect(() => stopInertia, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    stopInertia();
    isPausedRef.current = true;
    // Pointer capture is deliberately NOT taken here — capturing retargets
    // the native click event to this row element even for a plain tap with
    // zero movement, which meant a card's own onClick (open the expanded
    // view) never fired at all. It's only taken lazily in handlePointerMove
    // once real drag movement is detected, so a simple tap still dispatches
    // its click straight to the tapped card as normal.
    dragRef.current = {
      startX: e.clientX,
      startBaseX: baseXRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
      moved: false,
      captured: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    if (!drag) return;
    const now = performance.now();
    const dt = now - drag.lastT;
    if (dt > 0) {
      const instantVelocity = (e.clientX - drag.lastX) / dt; // px/ms, +right
      drag.velocity = drag.velocity * 0.7 + instantVelocity * 0.3;
    }
    drag.lastX = e.clientX;
    drag.lastT = now;

    const delta = e.clientX - drag.startX;
    if (Math.abs(delta) > 6) {
      drag.moved = true;
      if (!drag.captured) {
        drag.captured = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }
    }

    const newBaseX = wrapX(drag.startBaseX - delta, unitWidthRef.current);
    baseXRef.current = newBaseX;
    x.set(newBaseX);
  };

  const handlePointerUp = () => {
    const drag = dragRef.current;
    dragRef.current = null;
    if (!drag) return;

    if (drag.moved) suppressNextClickRef.current = true;

    // Inertia: coast on the drag's exit velocity, decaying it each frame,
    // then hand control back to the ambient auto-scroll once it settles.
    let velocity = -drag.velocity; // invert to baseX's convention (see handlePointerMove)
    let lastT = performance.now();
    const step = (t: number) => {
      const dt = t - lastT;
      lastT = t;
      velocity *= 0.94;
      const newBaseX = wrapX(baseXRef.current + velocity * dt, unitWidthRef.current);
      baseXRef.current = newBaseX;
      x.set(newBaseX);
      if (Math.abs(velocity) > 0.01) {
        inertiaRafRef.current = requestAnimationFrame(step);
      } else {
        inertiaRafRef.current = null;
        isPausedRef.current = false;
      }
    };
    if (Math.abs(velocity) > 0.03) {
      inertiaRafRef.current = requestAnimationFrame(step);
    } else {
      isPausedRef.current = false;
    }
  };

  // A drag that actually moved the row shouldn't also register as a click on
  // whatever card is underneath the pointer — capture-phase so this runs
  // before the card's own onClick (which opens its expanded view).
  const handleClickCapture = (e: React.MouseEvent) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // Memoized children
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const BlockContent = useMemo(() => {
    return (
      <div className="inline-flex shrink-0" style={{ contain: "paint" }}>
        {childrenArray}
      </div>
    );
  }, [childrenArray]);

  // Measure block width
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const block = container.querySelector(".threed-scroll-trigger-block") as HTMLElement;
    if (block) {
      unitWidthRef.current = block.scrollWidth;
      // keep just enough to cover the viewport + 1
      const containerWidth = container.offsetWidth;
      const needed = Math.max(3, Math.ceil(containerWidth / unitWidthRef.current) + 2);
      setNumCopies(needed);
    }
  }, [childrenArray]);

  // Optimize: Check if container is in view
  const isInView = useInView(containerRef, { margin: "20%" });

  // Animation loop
  useAnimationFrame((time) => {
    // prevTimeRef always advances, even while paused/out-of-view, so dt stays
    // small (~one frame) instead of jumping to the entire paused duration
    // and snapping the row forward the instant it resumes.
    if (prevTimeRef.current == null) prevTimeRef.current = time;
    const dt = Math.max(0, (time - prevTimeRef.current) / 1000);
    prevTimeRef.current = time;

    if (!isInView || isPausedRef.current) return;

    const unitWidth = unitWidthRef.current;
    if (unitWidth <= 0) return;

    const velocity = velocityFactor.get();
    const speedMultiplier = Math.min(5, Math.abs(velocity));
    const scrollDirection = velocity >= 0 ? 1 : -1;
    const currentDirection = direction * scrollDirection;

    const pixelsPerSecond = (unitWidth * baseVelocity) / 100;
    const moveBy = currentDirection * pixelsPerSecond * (1 + speedMultiplier) * dt;

    const newX = baseXRef.current + moveBy;

    // ✅ FIXED: Proper wrapping in both directions
    // When moving right (positive newX), wrap back
    if (newX >= unitWidth) {
      baseXRef.current = newX % unitWidth;
    }
    // When moving left (negative newX), wrap forward
    else if (newX <= 0) {
      baseXRef.current = unitWidth + (newX % unitWidth);
    }
    else {
      baseXRef.current = newX;
    }

    x.set(baseXRef.current);
  });

  const xTransform = useTransform(x, (v) => `translate3d(${-v}px,0,0)`);

  return (
    <div
      ref={containerRef}
      className={cn("w-full overflow-hidden whitespace-nowrap cursor-grab active:cursor-grabbing select-none", className)}
      style={{ touchAction: "pan-y" }}
      {...props}
      onMouseEnter={() => {
        // Touch devices synthesize a "mouseenter" on tap but never reliably
        // fire the matching "mouseleave" once the finger lifts or the page
        // scrolls — that permanently freezes this row's animation on mobile.
        // Only real pointer hover (desktop mouse) should pause it.
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
          isPausedRef.current = true;
        }
      }}
      onMouseLeave={() => {
        // Don't lift the pause mid-drag/inertia — a drag started with a
        // mouse can carry the cursor outside these bounds while the button
        // is still held, and this firing early would let the ambient
        // auto-scroll fight the drag over baseXRef in the same frame.
        if (!dragRef.current && inertiaRafRef.current == null) isPausedRef.current = false;
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClickCapture={handleClickCapture}
    >
      <motion.div
        className="inline-flex will-change-transform transform-gpu"
        style={{ transform: xTransform }}
      >
        {Array.from({ length: numCopies }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "inline-flex shrink-0",
              i === 0 ? "threed-scroll-trigger-block" : ""
            )}
          >
            {BlockContent}
          </div>
        ))}
      </motion.div>
    </div>
  );
}


/* --------------------------
   Local row (if no shared velocity)
   -------------------------- */
function ThreeDScrollTriggerRowLocal(props: ThreeDScrollTriggerRowProps) {
  const { scrollY } = useScroll();
  const localVelocity = useVelocity(scrollY);
  const localSmoothVelocity = useSpring(localVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const localVelocityFactor = useTransform(localSmoothVelocity, (v) => {
    const sign = v < 0 ? -1 : 1;
    const magnitude = Math.min(5, (Math.abs(v) / 1000) * 5);
    return sign * magnitude;
  });

  return (
    <ThreeDScrollTriggerRowImpl
      {...props}
      velocityFactor={localVelocityFactor}
    />
  );
}

export default ThreeDScrollTriggerRow;
