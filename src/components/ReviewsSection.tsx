/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { MessageSquare, Star, X } from "lucide-react";
import { AnimatePresence, animate, motion, useInView } from "motion/react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./lightswind/ThreeDScrollTrigger";
import { GUEST_REVIEWS, type GuestReview } from "../reviewTexts";

const CARD_SIZE = "w-[270px] sm:w-[310px] md:w-[350px] h-[220px] sm:h-[230px] md:h-[240px]";

// Rotating accent palette — used for both the avatar circle and the card's
// top accent bar, one color per card so the single scrolling row still reads
// as visually varied (mirrors the green/blue/purple accents in Google's own
// review widgets) rather than every card looking identical.
const GLOW_PALETTE = ["#34A853", "#4285F4", "#8E44AD", "#C17A4E"];

// reviewTexts.ts carries the full formal property name, which is too long to
// sit on a single line next to an avatar — this gives each property a short
// display name + destination instead (e.g. "The Abode : Ooty").
const PROPERTY_INFO: Record<string, { name: string; location: string }> = {
  "THE ABODE BY BROWN TREE": { name: "The Abode", location: "Ooty" },
  "SHOLAS RESIDENCY BY BROWN TREE": { name: "Sholas Residency", location: "Ooty" },
  "HUMMING BIRD BY BROWN TREE": { name: "Humming Bird", location: "Kothagiri" },
  "HOTEL VETRIVEL INTERNATIONAL BY BROWN TREE": { name: "Hotel Vetrivel", location: "Kodaikanal" },
};

function GoogleIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59a14.5 14.5 0 0 1-.76-4.59c0-1.59.27-3.13.76-4.59l-7.98-6.19A24.03 24.03 0 0 0 0 24c0 3.87.92 7.53 2.56 10.78z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.9l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function StarRow({ size = 13 }: { size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill="#F5B301" strokeWidth={0} />
      ))}
    </div>
  );
}

// No real guest photos are available to put in these circles (only actual
// Google-review screenshots, which belong to the reviewers who wrote them)
// — colored initials reuse the same avatar treatment as the review cards
// instead of a fabricated stock photo.
const GUEST_COUNT = 2500;
const TRUST_AVATARS: { initial: string; color: string }[] = [
  { initial: "R", color: "#8E44AD" },
  { initial: "J", color: "#F5B301" },
  { initial: "A", color: "#4285F4" },
  { initial: "S", color: "#EA4335" },
  { initial: "M", color: "#34A853" },
];

// Counts up from 0 to `target` once the badge scrolls into view (not on
// mount) so the animation is actually seen rather than finishing before the
// user scrolls this far.
function useCountUp(target: number, isInView: boolean, duration = 1.6) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, duration]);
  return count;
}

function TrustBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCountUp(GUEST_COUNT, isInView);

  return (
    <div ref={ref} className="flex items-center gap-4 sm:gap-5 shrink-0">
      <div className="flex -space-x-3 shrink-0">
        {TRUST_AVATARS.map((a, i) => (
          <div
            key={i}
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold border-2 shrink-0"
            style={{ background: a.color, borderColor: "#18281e" }}
          >
            {a.initial}
          </div>
        ))}
      </div>
      <div>
        <div className="mb-1">
          <StarRow size={16} />
        </div>
        <p className="text-sm sm:text-base whitespace-nowrap" style={{ color: "#F8F5EF" }}>
          Trusted by <span className="font-bold">{count.toLocaleString()}+</span> Happy Guests
        </p>
      </div>
    </div>
  );
}

function PropertyHeader({ property, color }: { property: string; color: string }) {
  const info = PROPERTY_INFO[property];
  if (!info) return null;
  return (
    <div className="flex items-center gap-2.5 mb-2.5 min-w-0">
      <div
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
        style={{ background: color }}
      >
        {info.name.charAt(0)}
      </div>
      <span className="text-sm sm:text-[15px] font-bold truncate" style={{ color: "#18281e" }}>
        {info.name} : {info.location}
      </span>
    </div>
  );
}

// Single continuous scrolling row (was 3 stacked rows) so the section reads
// as one line of cards, per the reference design. Card style now mirrors a
// real Google review widget: white card, colored top accent, avatar +
// property name (replacing the reviewer name), star row, clamped review
// text with a "Read more" affordance, and a Google "G" mark in the footer.
//
// Tapping/clicking a card still reveals the full untruncated review in a
// portal (rendered into document.body, not inline) positioned over the card
// — needed because the marquee row has overflow-hidden (required for the
// scroll effect), which would otherwise clip anything taller than the row.
// Click/tap is the same explicit action on every device (a translucent
// backdrop closes it on tap-outside, an explicit close button covers
// no-backdrop-visible cases, and scrolling auto-closes it as a safety net) —
// hover-to-open was dropped because touch devices synthesize "mouseenter" on
// tap without a matching "mouseleave", leaving the panel stuck open.
function ReviewCard({ review, color }: { review: GuestReview; color: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<{ top: number; left: number; width: number } | null>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

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

  // "Read more" should only appear when the clamp actually cut the text off.
  // The clamp's line count changes at the sm breakpoint (3 lines -> 4), so
  // this re-measures on any resize of the paragraph itself rather than just
  // once on mount.
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollHeight - el.clientHeight > 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [review.content]);

  const cardStyle: CSSProperties = {
    boxShadow: "0 12px 32px -12px rgba(0,0,0,0.35), 0 4px 12px -4px rgba(0,0,0,0.15)",
    borderTop: `4px solid ${color}`,
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={open}
        className={`relative shrink-0 mx-2 sm:mx-3 cursor-pointer rounded-xl bg-white overflow-hidden whitespace-normal ${CARD_SIZE}`}
        style={{ ...cardStyle, visibility: rect ? "hidden" : "visible" }}
      >
        <div className="p-4 sm:p-5 flex flex-col h-full">
          <PropertyHeader property={review.property} color={color} />
          <div className="mb-2">
            <StarRow />
          </div>
          <p ref={textRef} className="text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-4 flex-1 whitespace-normal" style={{ color: "rgba(24,40,30,0.75)" }}>
            {review.content}
          </p>
          {isTruncated && (
            <span className="text-xs sm:text-sm font-semibold shrink-0" style={{ color: "#4285F4" }}>
              Read more
            </span>
          )}
          <div className="mt-2 pt-2 border-t flex items-center justify-end" style={{ borderColor: "rgba(24,40,30,0.08)" }}>
            <GoogleIcon />
          </div>
        </div>
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
                className="fixed z-[999] rounded-xl bg-white overflow-hidden"
                style={{
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  maxHeight: "min(70vh, 420px)",
                  boxShadow: `0 25px 60px -12px rgba(0,0,0,0.55), 0 0 40px -8px ${color}55`,
                  borderTop: `4px solid ${color}`,
                }}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <div className="relative p-4 sm:p-5 overflow-y-auto" style={{ maxHeight: "calc(min(70vh, 420px) - 4px)" }}>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/5 cursor-pointer"
                    style={{ color: "rgba(24,40,30,0.5)" }}
                  >
                    <X size={16} />
                  </button>
                  <PropertyHeader property={review.property} color={color} />
                  <div className="mb-2.5">
                    <StarRow />
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed mb-3 pr-6" style={{ color: "rgba(24,40,30,0.75)" }}>
                    {review.content}
                  </p>
                  <div className="pt-2 border-t flex items-center justify-end" style={{ borderColor: "rgba(24,40,30,0.08)" }}>
                    <GoogleIcon />
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

// Carry each review's original index along so its accent color is stable
// (doesn't shift if the pool is ever reordered) rather than recomputed from
// its position within the row.
const INDEXED_REVIEWS = GUEST_REVIEWS.map((review, idx) => ({ review, idx }));

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#18281e 0%,#1e3224 50%,#18281e 100%)" }}
    >
      {/* Section Header */}
      <div className="max-w-5xl mx-auto px-4 mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="text-center lg:text-left space-y-4 max-w-2xl">
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
        <TrustBadge />
      </div>

      {/* Single scroll-velocity-reactive marquee line */}
      <ThreeDScrollTriggerContainer>
        <ThreeDScrollTriggerRow direction={1} baseVelocity={3}>
          {INDEXED_REVIEWS.map(({ review, idx }, j) => (
            <ReviewCard key={j} review={review} color={GLOW_PALETTE[idx % GLOW_PALETTE.length]} />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>

      {/* Subtle bottom gold rule */}
      <div className="max-w-xs mx-auto mt-10 px-4">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}
