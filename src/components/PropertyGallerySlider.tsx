/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const AUTOPLAY_MS = 4800;

interface PropertyGallerySliderProps {
  images: string[];
  alt: string;
  overlay?: ReactNode;
}

export default function PropertyGallerySlider({ images, alt, overlay }: PropertyGallerySliderProps) {
  const total = images.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Reset to the first slide whenever the property (image set) changes.
  useEffect(() => { setIndex(0); }, [images]);

  // Autoplay — restarts its full dwell time on every manual or automatic slide change.
  useEffect(() => {
    if (paused || lightbox || total <= 1) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, lightbox, total, index]);

  // Keyboard navigation while the fullscreen lightbox is open.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, next, prev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -500) next();
    else if (info.offset.x > 60 || info.velocity.x > 500) prev();
  };

  return (
    <>
      {/* ── Hero slider ── */}
      <div
        className="group relative w-full overflow-hidden bg-brand-primary select-none"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative w-full h-[46vh] sm:h-[58vh] md:h-[72vh] lg:h-[78vh] max-h-[820px] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={index}
              src={images[index]}
              alt={`${alt} — photo ${index + 1} of ${total}`}
              drag={total > 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.985, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
              transition={{
                opacity: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: (AUTOPLAY_MS / 1000) + 1.2, ease: "easeOut" },
              }}
              className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
            />
          </AnimatePresence>
        </div>

        {/* Gradient scrim for legible overlay text */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/15 to-transparent pointer-events-none" />

        {/* Arrows */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="hidden sm:flex absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-11 md:h-11 items-center justify-center rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* View all photos */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="absolute top-4 right-4 md:top-6 md:right-6 z-10 flex items-center gap-1.5 bg-white/15 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 rounded-full px-3.5 py-2 text-[10px] font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
        >
          <Maximize2 size={12} />
          <span>View All Photos</span>
        </button>

        {/* Overlay text (badge / title / location / price etc.) */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-14 md:px-10 md:pb-16 z-10">
          {overlay}
        </div>

        {/* Dot pagination */}
        {total > 1 && (
          <div className="absolute bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to photo ${i + 1}`}
                className="relative h-1.5 rounded-full bg-white/30 overflow-hidden transition-all duration-300"
                style={{ width: i === index ? 26 : 6 }}
              >
                {i === index && (
                  <motion.div
                    layoutId="activeGalleryDot"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnail strip ── */}
      {total > 1 && (
        <div className="bg-white border-b border-brand-primary/8 px-4 md:px-8 py-3">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  className="relative shrink-0 rounded-lg overflow-hidden w-12 h-9 sm:w-16 sm:h-11 md:w-20 md:h-14 cursor-pointer"
                >
                  <img src={img} alt={`Gallery thumbnail ${idx + 1}`} loading="lazy" decoding="async" className={`w-full h-full object-cover transition-opacity duration-200 ${idx === index ? "opacity-100" : "opacity-55 hover:opacity-90"}`} />
                  {idx === index && (
                    <motion.div
                      layoutId="activeGalleryThumb"
                      className="absolute inset-0 rounded-lg border-2 border-brand-secondary shadow-md"
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Fullscreen lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 shrink-0">
              <span className="text-white/70 text-xs font-semibold tracking-wider">
                {index + 1} / {total}
              </span>
              <button
                type="button"
                onClick={() => setLightbox(false)}
                aria-label="Close gallery"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center px-2 md:px-16 overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={index}
                  src={images[index]}
                  alt={`${alt} — full view photo ${index + 1} of ${total}`}
                  drag={total > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-full max-h-full object-contain cursor-grab active:cursor-grabbing rounded-md"
                />
              </AnimatePresence>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous photo"
                    className="absolute left-1 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 cursor-pointer"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next photo"
                    className="absolute right-1 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110 cursor-pointer"
                  >
                    <ChevronRight size={22} />
                  </button>
                </>
              )}
            </div>

            <div className="shrink-0 px-4 md:px-8 py-4 md:py-5">
              <div className="max-w-4xl mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    className="relative shrink-0 rounded-md overflow-hidden w-14 h-10 md:w-20 md:h-14 cursor-pointer"
                  >
                    <img src={img} alt={`Lightbox thumbnail ${idx + 1}`} loading="lazy" decoding="async" className={`w-full h-full object-cover transition-opacity duration-200 ${idx === index ? "opacity-100" : "opacity-45 hover:opacity-80"}`} />
                    {idx === index && (
                      <motion.div
                        layoutId="activeLightboxThumb"
                        className="absolute inset-0 rounded-md border-2 border-white"
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
