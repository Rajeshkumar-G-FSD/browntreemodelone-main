/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin } from "lucide-react";
import { Destination } from "../types";
import ThreeDSlider, { SliderItemData } from "./ThreeDSlider";

interface DestinationsSectionProps {
  destinations: Destination[];
  onSelectDestination: (destName: string) => void;
}

export default function DestinationsSection({ destinations, onSelectDestination }: DestinationsSectionProps) {
  const sliderItems: SliderItemData[] = destinations.map((dest, index) => ({
    title: dest.name,
    num: String(index + 1).padStart(2, "0"),
    imageUrl: dest.image,
    data: dest,
  }));

  const handleItemClick = (item: SliderItemData, _index: number, wasCentered: boolean) => {
    if (wasCentered) {
      onSelectDestination((item.data as Destination).name);
    }
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

        {/* 3D Slider Stage */}
        <ThreeDSlider items={sliderItems} onItemClick={handleItemClick} />

        <p className="text-center text-xs font-medium tracking-widest text-brand-primary/40 uppercase -mt-8">
          Scroll, drag, or tap a sanctuary to explore
        </p>

      </div>
    </section>
  );
}
