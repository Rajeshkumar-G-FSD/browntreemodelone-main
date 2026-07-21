/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, Quote, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./lightswind/ThreeDScrollTrigger";
import { GUEST_REVIEWS, type GuestReview } from "../reviewTexts";

const CARD_SIZE = "w-[250px] sm:w-[300px] md:w-[340px] h-[160px] sm:h-[180px] md:h-[200px]";

// Rotating accent palette for the glow-card effect — gold, forest, copper,
// sapphire — chosen to sit comfortably with the resort's brand colors while
// still reading as distinct "different color per card."
const GLOW_PALETTE = ["#D4AF37", "#2F6B4F", "#C17A4E", "#3B7C93"];

// Short display name + destination for the card footer (e.g. "The Abode :
// Ooty") — reviewTexts.ts carries the full formal property name, which is
// too long for a compact footer tag.
const PROPERTY_INFO: Record<string, { name: string; location: string }> = {
  "THE ABODE BY BROWN TREE": { name: "The Abode", location: "Ooty" },
  "Sholas Residency by Brown Tree": { name: "Sholas Residency", location: "Ooty" },
  "Humming Bird by Brown Tree Resorts": { name: "Humming Bird", location: "Kothagiri" },
  "Hotel Vetrivel International by Brown Tree Resorts": { name: "Hotel Vetrivel", location: "Kodaikanal" },
};

function PropertyTag({ property, color }: { property: string; color: string }) {
  const info = PROPERTY_INFO[property];
  if (!info) return null;
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      <span
        className="text-[10px] sm:text-[11px] font-bold tracking-wide truncate"
        style={{ color, textShadow: `0 0 8px ${color}66` }}
      >
        {info.name} : {info.location}
      </span>
    </div>
  );
}

// Soft colored glow blob in one corner (blurred circle, not a flat gradient —
// that's what actually produces the "light source" look) plus a "border
// beam": a conic-gradient sized to exactly match the card, spinning behind
// it, clipped to a 1px ring by the inset white content layer on top — the
// visible effect is a bright point of color continuously travelling around
// the card's edge. See .animate-border-beam in src/index.css.
function GlowCard({
  color,
  className,
  style,
  onClick,
  innerRef,
  children,
}: {
  color: string;
  className: string;
  style?: CSSProperties;
  onClick?: () => void;
  innerRef?: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  return (
    <div
      ref={innerRef}
      onClick={onClick}
      className={`relative rounded-xl overflow-hidden p-px ${className}`}
      style={{
        boxShadow: `0 24px 48px -16px ${color}40, 0 10px 24px -10px rgba(0,0,0,0.15)`,
        ...style,
      }}
    >
      <div
        className="absolute inset-0 animate-border-beam"
        style={{ background: `conic-gradient(from 0deg, transparent 0%, ${color} 15%, transparent 32%, transparent 100%)` }}
      />
      <div className="relative h-full w-full rounded-[11px] bg-white overflow-hidden">
        <div
          className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
          style={{ background: color, opacity: 0.25 }}
        />
        <div className="relative flex flex-col h-full">{children}</div>
      </div>
    </div>
  );
}

// Rows scroll continuously and speed up/reverse with page scroll velocity
// (see ThreeDScrollTrigger.tsx). Cards render real text (transcribed from
// the guest-review screenshots) instead of images, so title/description
// font sizes are genuinely uniform across every card via CSS — impossible
// with screenshots, since each one's baked-in text scale differs. Fixed
// card width/height + line-clamp keeps every card the same size regardless
// of how long that particular review is.
//
// Tapping/clicking a card reveals the full untruncated review in a portal
// (rendered into document.body, not inline) positioned over the card — a
// portal is needed because the marquee row has overflow-hidden (required
// for the scroll effect), which would otherwise clip anything taller than
// the row. This used to open on hover, but touch devices synthesize a
// "mouseenter" on tap without ever firing a matching "mouseleave" (no finger
// stays "hovering"), so the expanded panel got stuck open — and since it's
// fixed-position, captured at one scroll offset, scrolling the page left it
// stranded over whatever content ended up underneath. Click/tap is now the
// same explicit action on every device, a translucent backdrop behind the
// panel closes it on tap-outside, an explicit close button covers
// no-backdrop-visible cases, and scrolling auto-closes it as a safety net.
function ReviewCard({ review, color }: { review: GuestReview; color: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);

  const open = () => {
    const el = cardRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width });
    }
  };
  const close = () => setRect(null);

  useEffect(() => {
    if (!rect) return;
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [rect]);

  return (
    <>
      <GlowCard
        color={color}
        innerRef={cardRef}
        onClick={open}
        className={`shrink-0 mx-2 sm:mx-3 cursor-pointer ${CARD_SIZE}`}
        style={{ visibility: rect ? "hidden" : "visible" }}
      >
        <div className="p-4 sm:p-5 md:p-6 flex flex-col h-full">
          <Quote size={16} className="mb-2 shrink-0" style={{ color }} />
          <h3 className="text-sm sm:text-base font-bold leading-snug mb-1.5 line-clamp-1" style={{ color: "#18281e" }}>
            &ldquo;{review.title}&rdquo;
          </h3>
          <p className="text-xs sm:text-sm font-light leading-relaxed line-clamp-3 sm:line-clamp-4 mb-2" style={{ color: "rgba(24,40,30,0.65)" }}>
            {review.content}
          </p>
          <div className="mt-auto pt-1">
            <PropertyTag property={review.property} color={color} />
          </div>
        </div>
      </GlowCard>

      {createPortal(
        <AnimatePresence>
          {rect && (
            <>
              <motion.div
                key="backdrop"
                onClick={close}
                className="fixed inset-0 z-[998]"
                style={{ background: "rgba(0,0,0,0.4)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              />
              <motion.div
                key="expanded"
                className="fixed z-[999] rounded-xl overflow-hidden p-px"
                style={{
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  maxHeight: "min(70vh, 420px)",
                  boxShadow: `0 25px 60px -12px rgba(0,0,0,0.55), 0 0 40px -8px ${color}55`,
                }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <div
                  className="absolute inset-0 animate-border-beam"
                  style={{ background: `conic-gradient(from 0deg, transparent 0%, ${color} 15%, transparent 32%, transparent 100%)` }}
                />
                <div className="relative rounded-[11px] bg-white overflow-hidden" style={{ maxHeight: "calc(min(70vh, 420px) - 2px)" }}>
                  <div
                    className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full blur-3xl pointer-events-none"
                    style={{ background: color, opacity: 0.2 }}
                  />
                  <div className="relative p-4 sm:p-5 md:p-6 overflow-y-auto" style={{ maxHeight: "calc(min(70vh, 420px) - 2px)" }}>
                    <button
                      type="button"
                      onClick={close}
                      aria-label="Close"
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 cursor-pointer"
                      style={{ color: "rgba(24,40,30,0.5)" }}
                    >
                      <X size={16} />
                    </button>
                    <Quote size={16} className="mb-2 shrink-0" style={{ color }} />
                    <h3 className="text-sm sm:text-base font-bold leading-snug mb-1.5 pr-6" style={{ color: "#18281e" }}>
                      &ldquo;{review.title}&rdquo;
                    </h3>
                    <p className="text-xs sm:text-sm font-light leading-relaxed mb-3" style={{ color: "rgba(24,40,30,0.65)" }}>
                      {review.content}
                    </p>
                    <PropertyTag property={review.property} color={color} />
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// Split the pool into three rows (round-robin) so each row has its own mix
// rather than every row showing the same sequence.
function splitRows<T>(items: T[], rowCount: number): T[][] {
  const rows: T[][] = Array.from({ length: rowCount }, () => []);
  items.forEach((item, i) => rows[i % rowCount].push(item));
  return rows;
}

// Carry each review's original index along so its glow color is stable
// (doesn't shift if the pool is ever reordered) rather than recomputed from
// its position within its row.
const INDEXED_REVIEWS = GUEST_REVIEWS.map((review, idx) => ({ review, idx }));
const ROWS = splitRows(INDEXED_REVIEWS, 3);
const ROW_DIRECTION: (1 | -1)[] = [1, -1, 1];

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#18281e 0%,#1e3224 50%,#18281e 100%)" }}
    >
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4 mb-14">
        <div
          className="inline-flex items-center space-x-2 text-base md:text-lg font-bold tracking-[0.1em]"
          style={{ color: "#D4AF37" }}
        >
          <MessageSquare size={14} />
          <span>Our Happy Guests</span>
        </div>
        <h2 className="font-display text-base md:text-lg font-medium tracking-tight" style={{ color: "#F8F5EF" }}>
          Reflections of Luxury
        </h2>
        <p className="font-sans text-base md:text-lg font-light leading-relaxed" style={{ color: "rgba(248,245,239,0.6)" }}>
          Read notes of admiration from members of our elite travel circles.
        </p>
      </div>

      {/* Scroll-velocity-reactive marquee rows — no per-property grouping or labels */}
      <ThreeDScrollTriggerContainer className="space-y-4 sm:space-y-5 md:space-y-6">
        {ROWS.map((row, i) => (
          <ThreeDScrollTriggerRow key={i} direction={ROW_DIRECTION[i % ROW_DIRECTION.length]} baseVelocity={3}>
            {row.map(({ review, idx }, j) => (
              <ReviewCard key={j} review={review} color={GLOW_PALETTE[idx % GLOW_PALETTE.length]} />
            ))}
          </ThreeDScrollTriggerRow>
        ))}
      </ThreeDScrollTriggerContainer>

      {/* Subtle bottom gold rule */}
      <div className="max-w-xs mx-auto mt-10 px-4">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}
