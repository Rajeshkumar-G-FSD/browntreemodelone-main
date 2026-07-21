/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, Quote, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./lightswind/ThreeDScrollTrigger";
import { GUEST_REVIEWS, type GuestReview } from "../reviewTexts";

const CARD_SIZE = "w-[250px] sm:w-[300px] md:w-[340px] h-[160px] sm:h-[180px] md:h-[200px]";

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
function ReviewCard({ review }: { review: GuestReview }) {
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
      <div
        ref={cardRef}
        onClick={open}
        className={`inline-flex flex-col shrink-0 mx-2 sm:mx-3 rounded-xl bg-white shadow-xl p-4 sm:p-5 md:p-6 cursor-pointer ${CARD_SIZE}`}
        style={{ visibility: rect ? "hidden" : "visible" }}
      >
        <Quote size={16} className="mb-2 shrink-0" style={{ color: "#D4AF37" }} />
        <h3 className="text-sm sm:text-base font-bold leading-snug mb-1.5 line-clamp-1" style={{ color: "#18281e" }}>
          &ldquo;{review.title}&rdquo;
        </h3>
        <p className="text-xs sm:text-sm font-light leading-relaxed line-clamp-4 sm:line-clamp-5" style={{ color: "rgba(24,40,30,0.65)" }}>
          {review.content}
        </p>
      </div>

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
                className="fixed z-[999] rounded-xl bg-white p-4 sm:p-5 md:p-6 overflow-y-auto"
                style={{
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  maxHeight: "min(70vh, 420px)",
                  boxShadow: "0 25px 60px -12px rgba(0,0,0,0.55)",
                }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 cursor-pointer"
                  style={{ color: "rgba(24,40,30,0.5)" }}
                >
                  <X size={16} />
                </button>
                <Quote size={16} className="mb-2 shrink-0" style={{ color: "#D4AF37" }} />
                <h3 className="text-sm sm:text-base font-bold leading-snug mb-1.5 pr-6" style={{ color: "#18281e" }}>
                  &ldquo;{review.title}&rdquo;
                </h3>
                <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: "rgba(24,40,30,0.65)" }}>
                  {review.content}
                </p>
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

const ROWS = splitRows(GUEST_REVIEWS, 3);
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
            {row.map((review, j) => (
              <ReviewCard key={j} review={review} />
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
