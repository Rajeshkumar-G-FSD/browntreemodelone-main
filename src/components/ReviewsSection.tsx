/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, Quote } from "lucide-react";
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
// On hover, the full untruncated review appears in a portal (rendered into
// document.body, not inline) positioned over the card — a portal is needed
// because the marquee row it lives in has overflow-hidden (required for the
// scrolling effect), which would otherwise clip any expanded content taller
// than the row. Hovering a card also pauses that row (see
// ThreeDScrollTrigger.tsx), so the card's on-screen position stays put for
// the whole time the expanded panel is showing.
function ReviewCard({ review }: { review: GuestReview }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);

  const handleEnter = () => {
    const el = cardRef.current;
    if (el) {
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width });
    }
  };
  const handleLeave = () => setRect(null);

  return (
    <>
      <div
        ref={cardRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
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
            <motion.div
              key="expanded"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
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
              <Quote size={16} className="mb-2 shrink-0" style={{ color: "#D4AF37" }} />
              <h3 className="text-sm sm:text-base font-bold leading-snug mb-1.5" style={{ color: "#18281e" }}>
                &ldquo;{review.title}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm font-light leading-relaxed" style={{ color: "rgba(24,40,30,0.65)" }}>
                {review.content}
              </p>
            </motion.div>
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
          className="inline-flex items-center space-x-2 text-base md:text-lg font-bold tracking-[0.1em] uppercase"
          style={{ color: "#D4AF37" }}
        >
          <MessageSquare size={14} />
          <span>GUEST REVIEWS</span>
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
