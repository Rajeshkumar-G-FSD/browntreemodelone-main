/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { X, Star, Check, Sparkles, MapPin, DollarSign, BedDouble, Expand, ShieldCheck } from "lucide-react";
import { Property, Suite } from "../types";

interface PropertyDetailModalProps {
  property: Property;
  onClose: () => void;
  onBookSuite: (property: Property, suite: Suite) => void;
}

export default function PropertyDetailModal({ property, onClose, onBookSuite }: PropertyDetailModalProps) {
  const [activeImage, setActiveImage] = useState(property.gallery[0] || property.image);

  return (
    <div
      id="property-detail-overlay"
      className="fixed inset-0 z-50 bg-brand-primary/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
    >
      {/* Immersive Modal Container */}
      <div
        id="property-detail-container"
        className="bg-brand-background rounded-[32px] w-full max-w-6xl shadow-2xl border border-white/20 overflow-hidden flex flex-col max-h-[90vh] md:max-h-[95vh] animate-scale-up"
      >
        {/* Header bar */}
        <div className="p-6 md:px-10 border-b border-brand-primary/5 flex justify-between items-center bg-white/70 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-bold tracking-[0.2em] text-brand-secondary bg-brand-secondary/10 py-0.5 px-2.5 rounded-full uppercase">
                {property.type}
              </span>
              <div className="flex items-center space-x-1 text-brand-gold-light">
                <Star size={12} className="fill-brand-gold-light" />
                <span className="text-[10px] font-bold tracking-wider">{property.rating} ({property.reviewCount} reviews)</span>
              </div>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-brand-primary">
              {property.name}
            </h2>
          </div>

          <button
            id="close-property-detail"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white hover:border-brand-secondary hover:text-brand-secondary flex items-center justify-center text-brand-primary transition-all duration-300 cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body: Scrollable content split into columns */}
        <div className="overflow-y-auto flex-1 p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Galleries & Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Gallery Panel */}
            <div className="space-y-4">
              <div className="aspect-[16/10] rounded-2xl overflow-hidden shadow-lg relative bg-brand-primary/5">
                <img
                  src={activeImage}
                  alt={property.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-500"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
                {property.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      activeImage === img ? "border-brand-secondary scale-95 shadow-md" : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Narrative description */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-medium text-brand-primary">The Sanctuary Narrative</h3>
              <p className="font-sans text-xs md:text-sm text-brand-primary/75 font-light leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Highlights bullet boxes */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold text-brand-primary/50 tracking-widest uppercase">
                Sanctuary Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {property.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white/70 border border-brand-primary/5 rounded-2xl flex flex-col justify-between space-y-2"
                  >
                    <Sparkles size={16} className="text-brand-secondary" />
                    <p className="text-xs font-semibold text-brand-primary leading-snug">{hl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Amenities & Suites Selection (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:border-l lg:border-brand-primary/5 lg:pl-10">
            {/* Location meta info */}
            <div className="p-4 bg-white/70 border border-brand-primary/5 rounded-2xl flex items-center space-x-3">
              <MapPin className="text-brand-secondary shrink-0" size={18} />
              <div>
                <span className="block text-[8px] font-bold text-brand-primary/40 tracking-wider uppercase">
                  REGION COORDINATES
                </span>
                <span className="text-xs font-bold text-brand-primary">
                  {property.region}, {property.location}
                </span>
              </div>
            </div>

            {/* Curated Amenities List */}
            <div className="space-y-4">
              <h3 className="font-sans text-xs font-bold text-brand-primary/55 tracking-widest uppercase">
                Curated Amenities
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-secondary">
                      <Check size={10} />
                    </div>
                    <span className="text-xs font-semibold text-brand-primary/80">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suite Selection Section */}
            <div className="space-y-4 pt-4 border-t border-brand-primary/5">
              <h3 className="font-display text-lg font-medium text-brand-primary">Available Suites</h3>
              <div className="space-y-4">
                {property.suites.map((suite) => (
                  <div
                    key={suite.id}
                    id={`suite-card-${suite.id}`}
                    className="p-5 bg-white rounded-2xl border border-brand-primary/10 shadow-sm hover:border-brand-secondary transition-all flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-base font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors">
                          {suite.name}
                        </h4>
                        <div className="flex items-baseline space-x-0.5 text-brand-primary">
                          <span className="font-display text-lg font-bold">₹{suite.pricePerNight}</span>
                          <span className="text-[10px] text-brand-primary/50">/nt</span>
                        </div>
                      </div>
                      <p className="text-xs text-brand-primary/65 font-light leading-relaxed">
                        {suite.description}
                      </p>

                      {/* Suite details indicators */}
                      <div className="flex items-center space-x-4 pt-1 text-[10px] font-semibold text-brand-primary/45">
                        <div className="flex items-center space-x-1">
                          <Expand size={12} />
                          <span>{suite.size}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BedDouble size={12} />
                          <span>Max {suite.maxGuests} Guests</span>
                        </div>
                      </div>
                    </div>

                    <button
                      id={`select-suite-${suite.id}`}
                      onClick={() => onBookSuite(property, suite)}
                      className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-gold-light hover:text-white text-[10px] font-bold tracking-widest py-3 rounded-xl transition-all duration-300 text-center cursor-pointer uppercase"
                    >
                      Book Suite
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Assurance trust block */}
            <div className="p-4 bg-brand-primary/5 rounded-2xl flex items-start space-x-3">
              <ShieldCheck className="text-brand-secondary shrink-0 mt-0.5" size={16} />
              <p className="text-[10px] text-brand-primary/70 font-light leading-relaxed">
                <span className="font-bold text-brand-primary block mb-0.5">THE LUXE ASSURANCE</span>
                All reservations include priority helicopter transfers, dedicated butler services, custom culinary profiles, and flexible cancelation terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
