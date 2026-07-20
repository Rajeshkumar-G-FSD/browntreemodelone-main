/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

export interface SliderItemData {
  title: string;
  num: string;
  imageUrl: string;
  data?: any;
}

interface ThreeDSliderProps {
  items: SliderItemData[];
  speedWheel?: number;
  speedDrag?: number;
  containerStyle?: CSSProperties;
  onItemClick?: (item: SliderItemData, index: number, wasCentered: boolean) => void;
}

interface SliderItemProps {
  item: SliderItemData;
  setRef: (el: HTMLDivElement | null) => void;
  onClick: () => void;
}

function SliderItem({ item, setRef, onClick }: SliderItemProps) {
  // Sensible portrait fallback until the real photo dimensions are known, then the
  // card resizes to the image's own aspect ratio so the photo fills it exactly —
  // no cropping and no letterboxed backdrop needed on the sides.
  const [aspect, setAspect] = useState(0.8);

  return (
    <div
      ref={setRef}
      className="absolute top-1/2 left-1/2 cursor-pointer select-none rounded-[24px]
        shadow-2xl bg-brand-background origin-[0%_100%] pointer-events-auto
        w-[var(--width)] h-[var(--height)]
        -mt-[calc(var(--height)/2)] -ml-[calc(var(--width)/2)]
        overflow-hidden will-change-transform"
      style={
        {
          "--height": "clamp(340px, 50vw, 640px)",
          "--width": `calc(var(--height) * ${aspect})`,
          transition: "none",
        } as CSSProperties & Record<string, string>
      }
      onClick={onClick}
    >
      <div
        className="slider-item-content absolute inset-0 z-10 transition-opacity duration-300 ease-out will-change-[opacity]"
        style={{ opacity: 1 }}
      >
        <img
          src={item.imageUrl}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
          decoding="async"
          onLoad={(e) => {
            const { naturalWidth, naturalHeight } = e.currentTarget;
            if (naturalWidth && naturalHeight) setAspect(naturalWidth / naturalHeight);
          }}
        />

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-transparent via-50% to-black/65" />

        <div className="absolute z-10 text-white bottom-5 left-5 right-5 text-[clamp(18px,2.4vw,28px)] font-display drop-shadow-md">
          {item.title}
        </div>

        <div className="absolute z-10 text-white/30 top-2.5 left-5 font-display text-[clamp(20px,8vw,64px)] leading-none">
          {item.num}
        </div>
      </div>
    </div>
  );
}

export default function ThreeDSlider({
  items,
  speedWheel = 0.05,
  speedDrag = -0.15,
  containerStyle = {},
  onItemClick,
}: ThreeDSliderProps) {
  // Start centered on the first item (Ooty) so its full image is what greets the
  // page — scrolling/dragging is what reveals Kothagiri and Kodaikanal from there.
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const isDownRef = useRef(false);
  const draggedRef = useRef(false);
  const directionRef = useRef<"none" | "x" | "y">("none");
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cacheRef = useRef<Record<number, { transform: string; zIndex: string; opacity: string }>>({});
  // Wheel-driven card switching only kicks in once the slider is actually visible on
  // screen — otherwise hovering a sliver of it at the edge of the viewport would
  // hijack the page's normal scroll before the destinations are even in view.
  const isVisibleRef = useRef(false);

  const numItems = items.length;

  const update = useCallback(() => {
    if (!itemRefs.current.length) return;

    // Lerp for buttery smoothness
    progressRef.current += (targetProgressRef.current - progressRef.current) * 0.1;

    const clamped = Math.max(0, Math.min(progressRef.current, 100));
    const denom = numItems > 1 ? numItems - 1 : 1;
    const activeFloat = (clamped / 100) * denom;

    itemRefs.current.forEach((el, index) => {
      if (!el) return;

      const ratio = (index - activeFloat) / denom; // -1 (leftmost) to 1 (rightmost)

      const tx = ratio * 125;
      const ty = ratio * 30;
      const rot = ratio * 42;

      const dist = Math.abs(index - activeFloat);
      const z = numItems - dist;
      const opacity = 1 - dist * 0.55;

      const newTransform = `translate3d(${tx}%, ${ty}%, 0) rotate(${rot}deg)`;
      const newZIndex = Math.round(z * 10).toString();
      const newOpacity = Math.max(0.15, Math.min(1, opacity)).toString();

      const cache = cacheRef.current[index] ?? (cacheRef.current[index] = { transform: "", zIndex: "", opacity: "" });

      if (cache.transform !== newTransform) {
        el.style.transform = newTransform;
        cache.transform = newTransform;
      }
      if (cache.zIndex !== newZIndex) {
        el.style.zIndex = newZIndex;
        cache.zIndex = newZIndex;
      }

      const inner = el.querySelector(".slider-item-content") as HTMLElement | null;
      if (inner && cache.opacity !== newOpacity) {
        inner.style.opacity = newOpacity;
        cache.opacity = newOpacity;
      }
    });
  }, [numItems]);

  useEffect(() => {
    let active = true;
    const loop = () => {
      if (!active) return;
      update();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      active = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!isVisibleRef.current) return; // not in view yet — let the page scroll normally
      const next = targetProgressRef.current + e.deltaY * speedWheel;
      if ((next < 0 && e.deltaY < 0) || (next > 100 && e.deltaY > 0)) return;
      e.preventDefault();
      targetProgressRef.current = Math.max(0, Math.min(100, next));
    },
    [speedWheel]
  );

  const getClientX = (e: MouseEvent | TouchEvent) => ("touches" in e ? e.touches[0].clientX : e.clientX);
  const getClientY = (e: MouseEvent | TouchEvent) => ("touches" in e ? e.touches[0].clientY : e.clientY);

  const handlePointerDown = useCallback((e: MouseEvent | TouchEvent) => {
    isDownRef.current = true;
    draggedRef.current = false;
    // Mouse drags are always horizontal; touch gestures wait to see which way the
    // finger actually moves before deciding whether this is a slide or a page scroll.
    directionRef.current = "touches" in e ? "none" : "x";
    startXRef.current = getClientX(e);
    startYRef.current = getClientY(e);
  }, []);

  const handlePointerMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isDownRef.current) return;
      const isTouch = "touches" in e;
      const x = getClientX(e);

      if (isTouch && directionRef.current === "none") {
        const y = getClientY(e);
        const dx = Math.abs(x - startXRef.current);
        const dy = Math.abs(y - startYRef.current);
        if (dx < 6 && dy < 6) return; // too small a movement yet to know the intent
        directionRef.current = dx > dy ? "x" : "y";
        if (directionRef.current === "y") {
          isDownRef.current = false; // hand the gesture back to native vertical scrolling
          return;
        }
      }

      if (isTouch && directionRef.current === "y") return;
      if (isTouch && directionRef.current === "x") e.preventDefault(); // stop vertical scroll fighting the drag

      const diff = (x - startXRef.current) * speedDrag;
      if (Math.abs(diff) > 0.3) draggedRef.current = true;
      targetProgressRef.current = Math.max(0, Math.min(100, targetProgressRef.current + diff));
      startXRef.current = x;
    },
    [speedDrag]
  );

  const handlePointerUp = useCallback(() => {
    isDownRef.current = false;
    directionRef.current = "none";
  }, []);

  const handleItemClick = useCallback(
    (item: SliderItemData, index: number) => {
      if (draggedRef.current) return; // ignore a click that was actually a drag release
      const denom = numItems > 1 ? numItems - 1 : 1;
      const currentActive = Math.round((targetProgressRef.current / 100) * denom);
      const wasCentered = currentActive === index;
      targetProgressRef.current = (index / denom) * 100;
      onItemClick?.(item, index, wasCentered);
    },
    [numItems, onItemClick]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.5 }
    );
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel as EventListener, { passive: false });
    container.addEventListener("mousedown", handlePointerDown as EventListener);
    container.addEventListener("touchstart", handlePointerDown as EventListener, { passive: true });

    window.addEventListener("mousemove", handlePointerMove as EventListener);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove as EventListener, { passive: false });
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      container.removeEventListener("wheel", handleWheel as EventListener);
      container.removeEventListener("mousedown", handlePointerDown as EventListener);
      container.removeEventListener("touchstart", handlePointerDown as EventListener);

      window.removeEventListener("mousemove", handlePointerMove as EventListener);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove as EventListener);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [handleWheel, handlePointerDown, handlePointerMove, handlePointerUp]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden touch-pan-y"
      style={{ height: "clamp(440px, 62vh, 680px)", perspective: "1400px", ...containerStyle }}
    >
      <div className="relative z-10 h-full overflow-hidden pointer-events-none w-full">
        {items.map((item, index) => (
          <SliderItem
            key={`slider-item-${index}`}
            item={item}
            setRef={(el) => {
              itemRefs.current[index] = el;
            }}
            onClick={() => handleItemClick(item, index)}
          />
        ))}
      </div>
    </div>
  );
}
