/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useReducedMotion } from "motion/react";
import { Star, MessageSquare, Quote } from "lucide-react";
import { Review } from "../types";

interface ReviewsSectionProps {
  reviews: Review[];
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      style={{
        width: "20em",
        minHeight: "260px",
        background: "linear-gradient(145deg, #ffffff 0%, #f8f5ef 100%)",
        border: "1px solid rgba(212,175,55,0.22)",
        borderRadius: "1.5em",
        padding: "1.5em",
        display: "flex",
        flexDirection: "column",
        gap: "1em",
        boxShadow: "0 8px 32px rgba(24,40,30,0.10), 0 1px 2px rgba(212,175,55,0.1)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {/* Quote icon */}
      <div style={{ color: "rgba(212,175,55,0.25)", lineHeight: 0 }}>
        <Quote size={28} fill="rgba(212,175,55,0.18)" />
      </div>

      {/* Review text */}
      <p
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "0.8em",
          fontStyle: "italic",
          color: "#18281e",
          lineHeight: 1.65,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        "{review.content}"
      </p>

      {/* Stars */}
      <div style={{ display: "flex", gap: "3px" }}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={11} fill="#D4AF37" color="#D4AF37" />
        ))}
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(212,175,55,0.2)" }} />

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75em" }}>
        <img
          src={review.avatar}
          alt={review.author}
          referrerPolicy="no-referrer"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid rgba(212,175,55,0.4)",
            flexShrink: 0,
          }}
        />
        <div>
          <p style={{ fontSize: "0.75em", fontWeight: 700, color: "#18281e", lineHeight: 1.3 }}>
            {review.author}
          </p>
          <p style={{ fontSize: "0.65em", color: "#775a19", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {review.role}
          </p>
          <p style={{ fontSize: "0.62em", color: "#9c8170" }}>{review.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const n = reviews.length;
  const prefersReducedMotion = useReducedMotion();
  const duration = prefersReducedMotion ? n * 16 : n * 4;
  const cardWidth = "20em";

  return (
    <section id="reviews" className="py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#18281e 0%,#1e3224 50%,#18281e 100%)" }}>

      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4 mb-12">
        <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] uppercase"
          style={{ color: "#D4AF37" }}>
          <MessageSquare size={14} />
          <span>GUEST REVIEWS</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight" style={{ color: "#F8F5EF" }}>
          Reflections of Luxury
        </h2>
        <p className="font-sans text-sm md:text-base font-light leading-relaxed" style={{ color: "rgba(248,245,239,0.6)" }}>
          Read notes of admiration from members of our elite travel circles.
        </p>
      </div>

      {/* 3D Carousel */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: "360px",
          perspective: "50em",
          WebkitMask: "linear-gradient(90deg, transparent, #000 18% 82%, transparent)",
          mask: "linear-gradient(90deg, transparent, #000 18% 82%, transparent)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <motion.div
            style={{ transformStyle: "preserve-3d", display: "grid" }}
            animate={{ rotateY: [0, 360] }}
            transition={{ duration, ease: "linear", repeat: Infinity }}
          >
            {reviews.map((review, i) => (
              <div
                key={review.id}
                className="col-start-1 row-start-1"
                style={{
                  transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.5em) / tan(0.5 * (1turn / ${n}))))`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <ReviewCard review={review} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Subtle bottom gold rule */}
      <div className="max-w-xs mx-auto mt-10 px-4">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}
