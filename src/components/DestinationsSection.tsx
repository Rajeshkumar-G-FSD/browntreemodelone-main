/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, ArrowUpRight } from "lucide-react";
import { Destination } from "../types";

interface DestinationsSectionProps {
  destinations: Destination[];
  onSelectDestination: (destName: string) => void;
}

export default function DestinationsSection({ destinations, onSelectDestination }: DestinationsSectionProps) {
  return (
    <section id="destinations" className="py-24 md:py-32 px-4 bg-white">
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
              Explore extraordinary corners of the globe where we have established our exclusive digital sanctuaries.
            </p>
          </div>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((dest, index) => {
            // Alternating heights or layout ratios for editorial interest
            const isTall = index === 1;

            return (
              <div
                key={dest.id}
                id={`destination-card-${dest.id}`}
                onClick={() => onSelectDestination(dest.name)}
                className={`group relative rounded-[28px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-end ${
                  isTall ? "md:translate-y-4 h-[420px] md:h-[480px]" : "h-[420px]"
                }`}
              >
                {/* Image Cover */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-110"
                />

                {/* Ambient Dark Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-brand-primary/20 to-transparent opacity-85 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content Overlay */}
                <div className="relative z-10 p-8 space-y-3 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-[0.25em] text-brand-gold-light uppercase">
                      {dest.country}
                    </span>
                    <span className="text-[9px] font-bold tracking-[0.15em] bg-white/10 backdrop-blur-md py-1 px-3 rounded-full border border-white/15 uppercase">
                      {dest.propertyCount} {dest.propertyCount === 1 ? "Sanctuary" : "Sanctuaries"}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-medium text-brand-background tracking-tight">
                    {dest.name}
                  </h3>

                  <p className="text-xs text-brand-background/75 font-light leading-relaxed truncate-2-lines transition-all duration-300 group-hover:text-brand-background">
                    {dest.description}
                  </p>

                  <div className="flex items-center space-x-1 pt-3 text-xs font-semibold text-brand-gold-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span>EXPLORE SANCTUARIES</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
