"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { cn } from "../lib/utils";
import { Calendar } from "lucide-react";

export interface TimelineEvent {
  id?: string;
  year: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
}

export interface ScrollTimelineProps {
  events: TimelineEvent[];
  title?: string;
  subtitle?: string;
  animationOrder?: "sequential" | "staggered" | "simultaneous";
  cardAlignment?: "alternating" | "left" | "right";
  progressIndicator?: boolean;
  cardEffect?: "none" | "glow" | "shadow" | "bounce";
  progressLineWidth?: number;
  dateFormat?: "text" | "badge";
  className?: string;
  revealAnimation?: "fade" | "slide" | "scale" | "flip" | "none";
}

export const ScrollTimeline = ({
  events,
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  progressIndicator = true,
  cardEffect = "shadow",
  progressLineWidth = 3,
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
}: ScrollTimelineProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 80%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const newIndex = Math.floor(v * events.length);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < events.length) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index: number) => {
    const baseDelay =
      animationOrder === "simultaneous" ? 0 : animationOrder === "staggered" ? index * 0.15 : index * 0.1;

    const initialStates: Record<string, any> = {
      fade: { opacity: 0, y: 24 },
      slide: {
        x: cardAlignment === "left" ? -80 : cardAlignment === "right" ? 80 : index % 2 === 0 ? -80 : 80,
        opacity: 0,
      },
      scale: { scale: 0.85, opacity: 0 },
      flip: { rotateY: 80, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation],
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: { duration: 0.6, delay: baseDelay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      },
      viewport: { once: true, margin: "-80px" },
    };
  };

  const effectClasses: Record<string, string> = {
    none: "",
    glow: "hover:shadow-[0_0_20px_rgba(184,138,58,0.35)]",
    shadow: "hover:shadow-xl hover:-translate-y-1.5",
    bounce: "hover:scale-[1.03] active:scale-[0.98]",
  };

  const alignmentClass = (index: number) =>
    cardAlignment === "alternating"
      ? index % 2 === 0
        ? "lg:mr-[calc(50%+28px)]"
        : "lg:ml-[calc(50%+28px)]"
      : cardAlignment === "left"
        ? "lg:mr-auto lg:ml-0"
        : "lg:ml-auto lg:mr-0";

  return (
    <div ref={scrollRef} className={cn("relative w-full", className)}>
      {(title || subtitle) && (
        <div className="text-center mb-12 md:mb-16">
          {title && <h2 className="font-display text-2xl md:text-4xl font-medium text-brand-primary mb-3">{title}</h2>}
          {subtitle && <p className="text-sm md:text-base text-brand-primary/60 max-w-xl mx-auto font-light">{subtitle}</p>}
        </div>
      )}

      <div className="relative max-w-6xl mx-auto">
        {/* Base line */}
        <div className="absolute left-6 lg:left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-brand-primary/10 rounded-full" />

        {/* Animated progress line */}
        {progressIndicator && (
          <motion.div
            className="absolute left-6 lg:left-1/2 top-0 -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-secondary to-brand-gold-light"
            style={{ height: progressHeight, width: progressLineWidth }}
          />
        )}

        <div className="relative">
          {events.map((event, index) => (
            <div
              key={event.id || index}
              className={cn(
                "relative flex items-start lg:items-center gap-5 lg:gap-0 mb-12 lg:mb-20 pl-16 lg:pl-0",
                cardAlignment === "alternating"
                  ? index % 2 === 0
                    ? "lg:flex-row lg:justify-start"
                    : "lg:flex-row-reverse lg:justify-start"
                  : cardAlignment === "left"
                    ? "lg:flex-row lg:justify-start"
                    : "lg:flex-row-reverse lg:justify-start"
              )}
            >
              {/* Node */}
              <div className="absolute left-6 lg:left-1/2 top-1 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-20">
                <motion.div
                  className={cn(
                    "w-4 h-4 lg:w-5 lg:h-5 rounded-full border-[3px] bg-brand-background",
                    index <= activeIndex ? "border-brand-secondary" : "border-brand-primary/20"
                  )}
                  animate={
                    index <= activeIndex
                      ? {
                          scale: [1, 1.35, 1],
                          boxShadow: [
                            "0 0 0px rgba(184,138,58,0)",
                            "0 0 14px rgba(184,138,58,0.55)",
                            "0 0 0px rgba(184,138,58,0)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
                />
              </div>

              {/* Card */}
              <motion.div
                variants={getCardVariants(index)}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, margin: "-80px" }}
                className={cn(
                  "w-full lg:w-[calc(50%-40px)] bg-white border border-brand-primary/8 rounded-2xl overflow-hidden shadow-sm transition-all duration-300",
                  effectClasses[cardEffect],
                  alignmentClass(index)
                )}
              >
                {event.image && (
                  <div className="h-36 md:h-44 w-full overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4 md:p-6">
                  {dateFormat === "badge" ? (
                    <div className="inline-flex items-center gap-1.5 mb-2.5 bg-brand-secondary/10 text-brand-secondary text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full">
                      {event.icon || <Calendar size={12} />}
                      <span>{event.year}</span>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-brand-secondary mb-2">{event.year}</p>
                  )}
                  <h3 className="text-sm md:text-base font-bold text-brand-primary mb-1 leading-snug">{event.title}</h3>
                  {event.subtitle && (
                    <p className="text-[11px] md:text-xs font-semibold text-brand-primary/50 mb-2 uppercase tracking-wide">
                      {event.subtitle}
                    </p>
                  )}
                  <p className="text-xs md:text-sm text-brand-primary/60 font-light leading-relaxed">{event.description}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTimeline;
