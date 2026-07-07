/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, type ReactNode } from "react";
import {
  ArrowLeft, Star, MapPin, BedDouble, Check,
  Home, Car, Wifi, Zap, Bell, Users, TreePine, Mountain,
  Heart, Train, Waves, Coffee, Dog, Calendar, Sofa, Bath,
  Tv, Plug, Wind, Flame, Phone, Mail, Clock, Key, Sparkles,
  Smile, Sun, Cigarette, ChevronRight, Flower2, Landmark,
  ParkingCircle, ShieldCheck, Bed
} from "lucide-react";
import { motion } from "motion/react";
import { Property, Suite } from "../types";

// ─── Animated section wrapper (motion whileInView) ────────────────────────────
function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-secondary block mb-2">
        {eyebrow}
      </span>
      <h2 className="font-display text-2xl md:text-3xl font-medium text-brand-primary leading-snug">
        {title}
      </h2>
    </div>
  );
}

// ─── Icon map for property highlights / features ──────────────────────────────
function resolveHighlightIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes("parking") || l.includes("car")) return <ParkingCircle size={18} />;
  if (l.includes("wi-fi") || l.includes("wifi") || l.includes("internet")) return <Wifi size={18} />;
  if (l.includes("power") || l.includes("backup") || l.includes("electric")) return <Zap size={18} />;
  if (l.includes("room service") || l.includes("service")) return <Bell size={18} />;
  if (l.includes("housekeeping") || l.includes("cleaning")) return <Sparkles size={18} />;
  if (l.includes("caretaker") || l.includes("staff") || l.includes("assist")) return <Users size={18} />;
  if (l.includes("kids") || l.includes("play") || l.includes("children")) return <Smile size={18} />;
  if (l.includes("bedroom") || l.includes("bed") || l.includes("double bed")) return <BedDouble size={18} />;
  if (l.includes("balcony") || l.includes("terrace") || l.includes("deck")) return <Sun size={18} />;
  if (l.includes("mountain") || l.includes("view") || l.includes("scenic")) return <Mountain size={18} />;
  if (l.includes("nature") || l.includes("garden") || l.includes("green")) return <TreePine size={18} />;
  if (l.includes("couple") || l.includes("family") || l.includes("romantic")) return <Heart size={18} />;
  if (l.includes("homestay") || l.includes("private room") || l.includes("home")) return <Home size={18} />;
  if (l.includes("caretaker") || l.includes("managed")) return <Users size={18} />;
  if (l.includes("weekend") || l.includes("getaway")) return <Calendar size={18} />;
  if (l.includes("hospitality") || l.includes("warm") || l.includes("personalized")) return <Smile size={18} />;
  if (l.includes("sofa") || l.includes("seating") || l.includes("comfort")) return <Sofa size={18} />;
  if (l.includes("fireplace") || l.includes("fire")) return <Flame size={18} />;
  if (l.includes("fan") || l.includes("wind")) return <Wind size={18} />;
  if (l.includes("tv") || l.includes("television")) return <Tv size={18} />;
  if (l.includes("kettle") || l.includes("coffee") || l.includes("tea")) return <Coffee size={18} />;
  if (l.includes("plug") || l.includes("adapter") || l.includes("charging")) return <Plug size={18} />;
  if (l.includes("bath") || l.includes("shower") || l.includes("towel") || l.includes("toilet")) return <Bath size={18} />;
  if (l.includes("blanket") || l.includes("pillow") || l.includes("woollen")) return <Bed size={18} />;
  return <Check size={18} />;
}

function resolveAttractionIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("lake") || n.includes("pykara")) return <Waves size={20} />;
  if (n.includes("garden") || n.includes("botanical") || n.includes("rose")) return <Flower2 size={20} />;
  if (n.includes("peak") || n.includes("mountain") || n.includes("hill")) return <Mountain size={20} />;
  if (n.includes("museum") || n.includes("tea museum")) return <Landmark size={20} />;
  if (n.includes("railway") || n.includes("train")) return <Train size={20} />;
  if (n.includes("coffee") || n.includes("tea")) return <Coffee size={20} />;
  return <MapPin size={20} />;
}

function resolveRuleIcon(rule: string) {
  const r = rule.toLowerCase();
  if (r.includes("smoking") || r.includes("cigarette")) return <Cigarette size={18} />;
  if (r.includes("pet") || r.includes("dog")) return <Dog size={18} />;
  if (r.includes("family") || r.includes("friendly")) return <Heart size={18} />;
  if (r.includes("id") || r.includes("government") || r.includes("valid")) return <Key size={18} />;
  return <ShieldCheck size={18} />;
}

// ─── Main Component ────────────────────────────────────────────────────────────
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

  // Use extended data if available, with sensible fallbacks
  const highlightCards = property.propertyHighlightCards ?? property.highlights;
  const popularAmenities = property.popularAmenities ?? property.amenities.slice(0, 7);
  const roomAmenities = property.roomAmenities ?? property.amenities;
  const whyStayFeatures = property.whyStayFeatures ?? property.highlights;
  const houseRules = property.houseRules ?? {
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    rules: ["No Smoking inside Rooms", "Valid Government ID Required", "Family Friendly"]
  };
  const nearbyAttractions = property.nearbyAttractions ?? [];

  return (
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
        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/85 via-brand-primary/20 to-transparent" />

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
                <img src={img} alt={`Gallery photo ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          PREMIUM CONTENT SECTIONS — everything below the hero
      ════════════════════════════════════════════════════════════════════════ */}

      {/* ── 1. About The Homestay ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeUp>
            <SectionHeading eyebrow="Our Story" title="About The Homestay" />
          </FadeUp>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            <FadeUp delay={80} className="lg:col-span-3">
              <div className="space-y-5">
                {property.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </FadeUp>
            {/* Quick stats card */}
            <FadeUp delay={160} className="lg:col-span-2">
              <div className="bg-brand-background rounded-2xl p-6 md:p-8 border border-brand-primary/8 shadow-sm space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-brand-primary/8">
                  <Star size={16} className="fill-brand-gold-light text-brand-gold-light shrink-0" />
                  <div>
                    <span className="text-sm font-bold text-brand-primary">{property.rating} · Exceptional</span>
                    <span className="text-xs text-brand-primary/50 block">{property.reviewCount} verified reviews</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={15} className="text-brand-secondary shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary/40 uppercase tracking-wider block">Location</span>
                    <span className="text-xs font-semibold text-brand-primary">{property.region}, {property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BedDouble size={15} className="text-brand-secondary shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary/40 uppercase tracking-wider block">Stay Type</span>
                    <span className="text-xs font-semibold text-brand-primary">{property.type} · {property.region}</span>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] text-brand-primary/50">From</span>
                    <span className="font-display text-2xl font-bold text-brand-primary">₹{property.price.toLocaleString()}</span>
                    <span className="text-xs text-brand-primary/50">/night</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 2. Property Highlights ── */}
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeUp>
            <SectionHeading eyebrow="At A Glance" title="Property Highlights" />
          </FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {highlightCards.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 50} className="h-full">
                <div className="h-full bg-white border border-brand-primary/8 rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="w-11 h-11 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                    {resolveHighlightIcon(item)}
                  </span>
                  <p className="text-xs font-semibold text-brand-primary leading-snug">{item}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Popular Amenities ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeUp>
            <SectionHeading eyebrow="Facilities" title="Popular Amenities" />
          </FadeUp>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {popularAmenities.map((amenity, idx) => (
              <FadeUp key={idx} delay={idx * 60}>
                <div className="flex flex-col items-center text-center gap-3 p-5 bg-brand-background border border-brand-primary/8 rounded-2xl hover:border-brand-secondary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-brand-gold-light shrink-0">
                    {resolveHighlightIcon(amenity)}
                  </span>
                  <p className="text-xs font-semibold text-brand-primary leading-snug">{amenity}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Room Amenities ── */}
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeUp>
            <SectionHeading eyebrow="In Your Room" title="Room Amenities" />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {roomAmenities.map((amenity, idx) => (
              <FadeUp key={idx} delay={idx * 30}>
                <div className="flex items-center gap-3 bg-white border border-brand-primary/8 rounded-xl p-4 shadow-sm hover:shadow-md hover:border-brand-secondary/20 transition-all duration-300">
                  <span className="w-9 h-9 rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                    {resolveHighlightIcon(amenity)}
                  </span>
                  <span className="text-xs font-semibold text-brand-primary/80">{amenity}</span>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Why Stay With Us ── */}
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeUp>
            <SectionHeading eyebrow="The Difference" title="Why Stay With Us" />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyStayFeatures.map((feature, idx) => (
              <FadeUp key={idx} delay={idx * 60}>
                <div className="bg-white border border-brand-primary/8 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group h-full">
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shrink-0">
                    {resolveHighlightIcon(feature)}
                  </span>
                  <p className="text-sm font-semibold text-brand-primary leading-snug group-hover:text-brand-secondary transition-colors">
                    {feature}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. House Rules ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeUp>
            <SectionHeading eyebrow="Good To Know" title="House Rules" />
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Check-in */}
            <FadeUp delay={0}>
              <div className="bg-brand-primary rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-gold-light">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Check-in</p>
                  <p className="text-xl font-display font-semibold text-white">{houseRules.checkIn}</p>
                </div>
              </div>
            </FadeUp>
            {/* Check-out */}
            <FadeUp delay={60}>
              <div className="bg-brand-secondary rounded-2xl p-6 flex flex-col gap-3 shadow-sm">
                <span className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <Clock size={18} />
                </span>
                <div>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Check-out</p>
                  <p className="text-xl font-display font-semibold text-white">{houseRules.checkOut}</p>
                </div>
              </div>
            </FadeUp>
            {/* Rules */}
            {houseRules.rules.map((rule, idx) => (
              <FadeUp key={idx} delay={(idx + 2) * 60}>
                <div className="bg-brand-background border border-brand-primary/8 rounded-2xl p-6 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <span className="w-10 h-10 rounded-xl bg-brand-primary/8 flex items-center justify-center text-brand-secondary">
                    {resolveRuleIcon(rule)}
                  </span>
                  <p className="text-sm font-semibold text-brand-primary leading-snug">{rule}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Nearby Attractions ── */}
      {nearbyAttractions.length > 0 && (
        <section className="py-16 md:py-24 bg-brand-background">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <FadeUp>
              <SectionHeading eyebrow="Explore Around" title="Nearby Attractions" />
            </FadeUp>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {nearbyAttractions.map((attraction, idx) => (
                <FadeUp key={idx} delay={idx * 60}>
                  <div className="bg-white border border-brand-primary/8 rounded-2xl p-5 flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-brand-secondary/30 transition-all duration-300 h-full">
                    <span className="w-12 h-12 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                      {resolveAttractionIcon(attraction)}
                    </span>
                    <p className="text-xs font-semibold text-brand-primary leading-snug">{attraction}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 9. Need Assistance CTA ── */}
      <section className="py-16 md:py-24 bg-brand-primary relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/3 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/3 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          <FadeUp>
            <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-brand-gold-light block mb-3">
              We're Here For You
            </span>
            <h2 className="font-display text-2xl md:text-4xl font-medium text-white mb-6 leading-snug">
              Need Help Planning Your Stay?
            </h2>
            <p className="text-sm md:text-base text-white/65 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Our team is always happy to assist you with bookings, room selection, local sightseeing recommendations,
              and special requests to make your stay unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onBookSuite(property, property.suites[0])}
                className="flex items-center gap-2 bg-brand-gold-light hover:bg-white text-brand-primary font-bold text-sm tracking-wider px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer shadow-lg shadow-black/20 hover:shadow-xl"
              >
                <span>Book Now</span>
                <ChevronRight size={16} />
              </button>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm tracking-wider px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <Phone size={15} />
                <span>Contact Us</span>
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Bottom breathing room */}
      <div className="h-16" />
    </div>
  );
}
