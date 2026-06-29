/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Star, Check, Sparkles, MapPin, BedDouble, Expand, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Property, Suite } from "../types";

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
  onBookSuite: (property: Property, suite: Suite) => void;
}

export default function PropertyDetailPage({ property, onBack, onBookSuite }: PropertyDetailPageProps) {
  const gallery = property.gallery.length > 0 ? property.gallery : [property.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startSlide = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % gallery.length;
      setActiveImage(gallery[indexRef.current]);
    }, 2000);
  };

  useEffect(() => {
    startSlide();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [property]);

  const handleThumbnailClick = (img: string, idx: number) => {
    indexRef.current = idx;
    setActiveImage(img);
    startSlide();
  };

  return (
    // pt-20 md:pt-24 = clears the fixed header (header is ~80px mobile / ~96px desktop)
    <div className="min-h-screen bg-brand-background pt-20 md:pt-24">

      {/* ── Back nav bar ── */}
      <div className="bg-white border-b border-brand-primary/8 shadow-sm px-4 md:px-8">
        <div className="max-w-7xl mx-auto h-12 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[11px] font-bold tracking-widest uppercase">Back to Properties</span>
          </button>
          <div className="flex items-center space-x-1.5">
            <Star size={12} className="fill-brand-gold-light text-brand-gold-light" />
            <span className="text-[11px] font-semibold text-brand-primary tracking-wider">
              {property.rating} · {property.reviewCount} reviews
            </span>
          </div>
        </div>
      </div>

      {/* ── Hero image ── */}
      <div className="relative w-full overflow-hidden bg-brand-primary/5">
        <img
          src={activeImage}
          alt={`${property.name} – luxury ${property.type.toLowerCase()} hill station stay in ${property.location}, ${property.region}`}
          className="w-full h-auto object-contain transition-all duration-700 max-h-[80vh]"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/20 to-transparent" />

        {/* Property info – anchored to hero bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 md:px-10 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block text-[9px] font-bold tracking-[0.2em] text-white/80 bg-white/10 border border-white/20 py-1 px-2.5 rounded-full uppercase mb-2">
              {property.type} · {property.region}
            </span>
            <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-medium text-white tracking-tight leading-tight mb-2">
              {property.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-1.5 text-white/70">
                <MapPin size={12} />
                <span className="text-xs font-light">{property.location}</span>
              </div>
              <div className="flex items-baseline space-x-1 text-white">
                <span className="text-[10px] text-white/60 font-light">From</span>
                <span className="font-display text-lg md:text-2xl font-semibold">
                  ₹{property.price.toLocaleString()}
                </span>
                <span className="text-[10px] text-white/60">/night</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      <div className="bg-white border-b border-brand-primary/8 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleThumbnailClick(img, idx)}
                className={`relative shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer
                  w-12 h-9 sm:w-16 sm:h-11 md:w-20 md:h-14
                  ${activeImage === img
                    ? "border-brand-secondary shadow-md scale-95"
                    : "border-transparent opacity-55 hover:opacity-100 hover:border-brand-primary/20"
                  }`}
              >
                <img src={img} alt={`${property.name} – ${property.location} accommodation gallery photo ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        {/* Left: Description + Highlights */}
        <div className="lg:col-span-7 space-y-8">

          {/* Description */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display text-xl md:text-2xl font-medium text-brand-primary">
              About This Property
            </h2>
            <div className="font-sans text-sm text-brand-primary/70 font-light leading-relaxed space-y-4">
              {property.description.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <h3 className="font-sans text-xs font-bold text-brand-primary/50 tracking-widest uppercase">
              Sanctuary Highlights
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {property.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border border-brand-primary/6 rounded-2xl flex flex-col space-y-2 shadow-sm"
                >
                  <Sparkles size={14} className="text-brand-secondary" />
                  <p className="text-xs font-semibold text-brand-primary leading-snug">{hl}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Location + Amenities + Suites */}
        <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-brand-primary/5 lg:pl-10">

          {/* Location */}
          <div className="p-4 bg-white border border-brand-primary/6 rounded-2xl flex items-center space-x-3 shadow-sm">
            <MapPin className="text-brand-secondary shrink-0" size={16} />
            <div>
              <span className="block text-[8px] font-bold text-brand-primary/40 tracking-wider uppercase">
                Location
              </span>
              <span className="text-xs font-bold text-brand-primary">
                {property.region}, {property.location}
              </span>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-3">
            <h3 className="font-sans text-xs font-bold text-brand-primary/55 tracking-widest uppercase">
              Curated Amenities
            </h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-3">
              {property.amenities.map((amenity, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                    <Check size={9} />
                  </div>
                  <span className="text-xs font-semibold text-brand-primary/80 leading-tight">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suites */}
          <div className="space-y-4 pt-4 border-t border-brand-primary/5">
            <h3 className="font-display text-lg font-medium text-brand-primary">Available Suites</h3>
            <div className="space-y-4">
              {property.suites.map((suite) => (
                <div
                  key={suite.id}
                  className="p-4 bg-white rounded-2xl border border-brand-primary/10 shadow-sm hover:border-brand-secondary transition-all duration-300 flex flex-col space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display text-sm font-semibold text-brand-primary group-hover:text-brand-secondary transition-colors leading-snug">
                        {suite.name}
                      </h4>
                      <div className="flex items-baseline space-x-0.5 shrink-0">
                        <span className="font-display text-base font-bold text-brand-primary">
                          ₹{suite.pricePerNight.toLocaleString()}
                        </span>
                        <span className="text-[9px] text-brand-primary/50">/nt</span>
                      </div>
                    </div>
                    <p className="text-xs text-brand-primary/65 font-light leading-relaxed">
                      {suite.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[10px] font-semibold text-brand-primary/45">
                      <div className="flex items-center space-x-1">
                        <Expand size={10} />
                        <span>{suite.size}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BedDouble size={10} />
                        <span>Max {suite.maxGuests} Guests</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onBookSuite(property, suite)}
                    className="w-full bg-brand-primary hover:bg-brand-secondary text-brand-gold-light hover:text-white text-[10px] font-bold tracking-widest py-3 rounded-xl transition-all duration-300 cursor-pointer uppercase"
                  >
                    Book Suite
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Assurance */}
          <div className="p-4 bg-brand-primary/5 rounded-2xl flex items-start space-x-3">
            <ShieldCheck className="text-brand-secondary shrink-0 mt-0.5" size={15} />
            <p className="text-[10px] text-brand-primary/70 font-light leading-relaxed">
              <span className="font-bold text-brand-primary block mb-0.5">THE LUXE ASSURANCE</span>
              All reservations include priority transfers, dedicated butler services, custom culinary profiles, and flexible cancellation terms.
            </p>
          </div>
        </div>
      </div>

      <div className="h-12" />
    </div>
  );
}
