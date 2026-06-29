/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Quote } from "lucide-react";
import { Review } from "../types";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const currentReview = reviews[activeIndex] || reviews[0];

  return (
    <section id="reviews" className="py-24 md:py-32 px-4 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-16 relative">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] text-brand-secondary uppercase">
            <MessageSquare size={14} />
            <span>GUEST REVIEWS</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-brand-primary">
            Reflections of Luxury
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
            Read notes of admiration and critique from members of our elite travel circles and architectural publications.
          </p>
        </div>

        {/* Captivating Interactive Testimonial Slider Panel */}
        <div 
          id="testimonial-container"
          className="relative bg-brand-background rounded-[40px] p-8 md:p-16 border border-brand-primary/5 shadow-2xl shadow-brand-primary/2"
        >
          {/* Aesthetic Decorative Quote Emblem */}
          <div className="absolute top-8 left-8 md:top-12 md:left-12 text-brand-gold-light/15 select-none pointer-events-none">
            <Quote size={80} className="fill-brand-gold-light/10" />
          </div>

          <div className="relative z-10 flex flex-col justify-between h-full min-h-[220px] space-y-8 animate-scale-up">
            {/* Review Message */}
            <p className="font-display text-lg md:text-2xl italic font-light text-brand-primary leading-relaxed text-center md:text-left">
              "{currentReview.content}"
            </p>

            {/* Guest Metadata & Ratings block */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-brand-primary/5">
              <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
                {/* Guest Avatar */}
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-secondary/40 shadow-md">
                  <img
                    src={currentReview.avatar}
                    alt={currentReview.author}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Guest Info */}
                <div>
                  <h3 className="font-display text-lg font-medium text-brand-primary">{currentReview.author}</h3>
                  <span className="text-[10px] text-brand-secondary font-bold tracking-widest uppercase block mt-0.5">
                    {currentReview.role}
                  </span>
                  <span className="text-[10px] text-brand-primary/40 font-medium block">
                    Stayed: {currentReview.date}
                  </span>
                </div>
              </div>

              {/* Star Rating & Controls panel */}
              <div className="flex flex-col items-center md:items-end gap-3">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: currentReview.rating }).map((_, idx) => (
                    <Star key={idx} size={14} className="fill-brand-gold-light text-brand-gold-light" />
                  ))}
                </div>

                {/* Slider Nav buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    id="prev-review-btn"
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white hover:border-brand-secondary hover:text-brand-secondary flex items-center justify-center text-brand-primary transition-all duration-300 cursor-pointer"
                    aria-label="Previous review"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-sans font-bold tracking-widest text-brand-primary/40 select-none">
                    {activeIndex + 1} / {reviews.length}
                  </span>
                  <button
                    id="next-review-btn"
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white hover:border-brand-secondary hover:text-brand-secondary flex items-center justify-center text-brand-primary transition-all duration-300 cursor-pointer"
                    aria-label="Next review"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
