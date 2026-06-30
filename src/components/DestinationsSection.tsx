/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Destination } from "../types";

interface DestinationsSectionProps {
  destinations: Destination[];
  onSelectDestination: (destName: string) => void;
}

type Pos = "center" | "left" | "right";

export default function DestinationsSection({ destinations, onSelectDestination }: DestinationsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % destinations.length);
    }, 2000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const getPos = (index: number): Pos => {
    const total = destinations.length;
    if (index === activeIndex) return "center";
    if (index === (activeIndex - 1 + total) % total) return "left";
    return "right";
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      onSelectDestination(destinations[index].name);
    } else {
      setActiveIndex(index);
      startAuto();
    }
  };

  const getStyle = (pos: Pos): React.CSSProperties => {
    if (pos === "center") return {
      transform: "translateX(-50%) rotateY(0deg) scale(1)",
      zIndex: 30,
      opacity: 1,
      filter: "brightness(1)",
      width: "clamp(280px, 38vw, 440px)",
      height: "clamp(380px, 48vh, 500px)",
    };
    if (pos === "left") return {
      transform: "translateX(calc(-50% - clamp(200px, 28vw, 340px))) rotateY(42deg) scale(0.78)",
      zIndex: 10,
      opacity: 0.8,
      filter: "brightness(0.65)",
      width: "clamp(180px, 26vw, 300px)",
      height: "clamp(260px, 34vh, 370px)",
    };
    return {
      transform: "translateX(calc(-50% + clamp(200px, 28vw, 340px))) rotateY(-42deg) scale(0.78)",
      zIndex: 10,
      opacity: 0.8,
      filter: "brightness(0.65)",
      width: "clamp(180px, 26vw, 300px)",
      height: "clamp(260px, 34vh, 370px)",
    };
  };

  return (
    <section id="destinations" className="py-24 md:py-32 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 border-b border-brand-primary/5 pb-8">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] text-brand-secondary uppercase">
              <MapPin size={14} />
              <span>Sanctuary Coordinates</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-brand-primary">
              Our Curated Destinations
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
              Explore extraordinary hill station sanctuaries where BrownTree hospitality meets nature's finest backdrops.
            </p>
          </div>
        </div>

        {/* 3D Carousel Stage */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "1100px", height: "clamp(380px, 52vh, 540px)" }}
        >
          {destinations.map((dest, index) => {
            const pos = getPos(index);
            const isCenter = pos === "center";

            return (
              <div
                key={dest.id}
                onClick={() => handleCardClick(index)}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  translateY: "-50%",
                  transition: "all 0.75s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  marginTop: "calc(-1 * clamp(190px, 24vh, 250px))",
                  ...getStyle(pos),
                }}
                className="rounded-[24px] overflow-hidden shadow-2xl cursor-pointer group"
              >
                <img
                  src={dest.image}
                  alt={`${dest.name} hill station – ${dest.description} Brown Tree Resorts destination`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/15 to-transparent opacity-90" />

                {/* Center card content */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white space-y-2 transition-opacity duration-500"
                  style={{ opacity: isCenter ? 1 : 0 }}
                >
                  <span className="text-[10px] font-bold tracking-[0.25em] text-brand-gold-light uppercase block">
                    {dest.country}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-medium text-brand-background tracking-tight">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-brand-background/75 font-light leading-relaxed">
                    {dest.description}
                  </p>
                  <div className="flex items-center space-x-1 pt-2 text-xs font-semibold text-brand-gold-light">
                    <span>EXPLORE SANCTUARIES</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Side card name label */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 text-center transition-opacity duration-500"
                  style={{ opacity: isCenter ? 0 : 1 }}
                >
                  <h3 className="font-display text-base md:text-lg font-medium text-white/90 tracking-wide drop-shadow-lg">
                    {dest.name}
                  </h3>
                  <span className="text-[9px] font-bold tracking-widest text-brand-gold-light/80 uppercase">
                    Tap to explore
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 -mt-4">
          {destinations.map((dest, index) => (
            <button
              key={dest.id}
              onClick={() => { setActiveIndex(index); startAuto(); }}
              className={`rounded-full transition-all duration-400 cursor-pointer ${
                index === activeIndex
                  ? "w-7 h-2 bg-brand-secondary"
                  : "w-2 h-2 bg-brand-primary/20 hover:bg-brand-primary/40"
              }`}
              aria-label={`Go to ${dest.name}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
