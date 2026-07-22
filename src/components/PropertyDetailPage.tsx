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
  Smile, Sun, Cigarette, ChevronRight, ChevronDown, Flower2, Landmark,
  ParkingCircle, ShieldCheck, Bed, Leaf, Utensils, Bus,
  ThumbsUp, Camera, MapPinned, ShoppingBag
} from "lucide-react";
import { motion } from "motion/react";
import { Property, Suite } from "../types";
import SplitText from "./SplitText";
import BlurText from "./BlurText";

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

// ─── Left-to-right wave text reveal — each character rises into place in
//     sequence, giving a wave motion sweeping from the first letter to the
//     last. Used for the Quick Stats card values so every property page
//     (Location / Stay Type) animates in the same consistent way.
const waveContainer = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.032, delayChildren: delay },
  }),
};
const waveChar = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

function WaveText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={waveContainer}
      custom={delay / 1000}
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          variants={waveChar}
          className="inline-block"
          style={char === " " ? { whiteSpace: "pre" } : undefined}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
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

// ─── Mobile "show all" collapse — long lists (room amenities, highlights, etc.)
//     render every item at md+, but only the first `limit` on phones until the
//     guest taps to expand, so a single grid section can't blow up scroll length.
function useExpandable(total: number, limit: number) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = total > limit;
  const itemHiddenClass = (idx: number) => (hasMore && idx >= limit && !expanded ? "hidden md:block" : "");
  return { expanded, setExpanded, hasMore, itemHiddenClass };
}

function ShowMoreButton({
  expanded,
  setExpanded,
  hasMore,
  total,
  label,
}: {
  expanded: boolean;
  setExpanded: (fn: (v: boolean) => boolean) => void;
  hasMore: boolean;
  total: number;
  label: string;
}) {
  if (!hasMore) return null;
  return (
    <div className="md:hidden flex justify-center mt-6">
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-brand-secondary bg-brand-secondary/8 hover:bg-brand-secondary/14 border border-brand-secondary/20 rounded-full px-5 py-2.5 transition-all duration-200 cursor-pointer"
      >
        <span>{expanded ? "Show Less" : `Show All ${total} ${label}`}</span>
        <ChevronDown size={13} className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
      </button>
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
  if (l.includes("mountain") || l.includes("climate")) return <Mountain size={18} />;
  if (l.includes("view") || l.includes("scenic") || l.includes("panoramic")) return <Mountain size={18} />;
  if (l.includes("plantation") || l.includes("nature") || l.includes("garden") || l.includes("green")) return <TreePine size={18} />;
  if (l.includes("couple") || l.includes("family") || l.includes("romantic")) return <Heart size={18} />;
  if (l.includes("homestay") || l.includes("private room") || l.includes("home")) return <Home size={18} />;
  if (l.includes("managed")) return <Users size={18} />;
  if (l.includes("weekend") || l.includes("getaway")) return <Calendar size={18} />;
  if (l.includes("hospitality") || l.includes("warm") || l.includes("personalized") || l.includes("friendly")) return <Smile size={18} />;
  if (l.includes("sofa") || l.includes("seating") || l.includes("comfort") || l.includes("wooden") || l.includes("interior")) return <Sofa size={18} />;
  if (l.includes("fireplace") || l.includes("fire") || l.includes("bonfire")) return <Flame size={18} />;
  if (l.includes("fan") || l.includes("wind")) return <Wind size={18} />;
  if (l.includes("tv") || l.includes("television")) return <Tv size={18} />;
  if (l.includes("kettle") || l.includes("coffee") || l.includes("tea")) return <Leaf size={18} />;
  if (l.includes("cuisine") || l.includes("dining") || l.includes("restaurant") || l.includes("food") || l.includes("barbecue")) return <Utensils size={18} />;
  if (l.includes("photograph") || l.includes("camera")) return <Camera size={18} />;
  if (l.includes("plug") || l.includes("adapter") || l.includes("charging")) return <Plug size={18} />;
  if (l.includes("bath") || l.includes("shower") || l.includes("towel") || l.includes("toilet")) return <Bath size={18} />;
  if (l.includes("blanket") || l.includes("pillow") || l.includes("woollen") || l.includes("bedding")) return <Bed size={18} />;
  if (l.includes("doctor") || l.includes("first aid") || l.includes("health")) return <ShieldCheck size={18} />;
  if (l.includes("shuttle") || l.includes("airport") || l.includes("transfer") || l.includes("taxi")) return <Car size={18} />;
  if (l.includes("luggage")) return <Users size={18} />;
  if (l.includes("cctv") || l.includes("safety") || l.includes("security") || l.includes("surveillance")) return <ShieldCheck size={18} />;
  if (l.includes("umbrella")) return <Wind size={18} />;
  if (l.includes("multilingual") || l.includes("staff")) return <Users size={18} />;
  if (l.includes("open air") || l.includes("outdoor")) return <Sun size={18} />;
  if (l.includes("reception")) return <Home size={18} />;
  if (l.includes("photocopying") || l.includes("business")) return <Sparkles size={18} />;
  if (l.includes("living area")) return <Sofa size={18} />;
  if (l.includes("hair") || l.includes("dryer")) return <Wind size={18} />;
  if (l.includes("dental") || l.includes("toiletries")) return <Sparkles size={18} />;
  return <Check size={18} />;
}

function resolveExperienceIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("tea") || t.includes("garden") || t.includes("plantation")) return <Leaf size={22} />;
  if (t.includes("nature") || t.includes("trail") || t.includes("walk") || t.includes("trek")) return <TreePine size={22} />;
  if (t.includes("sunrise") || t.includes("sunset")) return <Sun size={22} />;
  if (t.includes("bonfire") || t.includes("campfire") || t.includes("fire")) return <Flame size={22} />;
  if (t.includes("cuisine") || t.includes("food") || t.includes("dining")) return <Utensils size={22} />;
  if (t.includes("bird") || t.includes("wildlife")) return <TreePine size={22} />;
  if (t.includes("photo") || t.includes("camera")) return <Camera size={22} />;
  return <Star size={22} />;
}

function resolveAttractionIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("lake") || n.includes("pykara")) return <Waves size={20} />;
  if (n.includes("garden") || n.includes("botanical") || n.includes("rose")) return <Flower2 size={20} />;
  if (n.includes("peak") || n.includes("mountain") || n.includes("hill")) return <Mountain size={20} />;
  if (n.includes("museum") || n.includes("tea museum")) return <Landmark size={20} />;
  if (n.includes("railway") || n.includes("train")) return <Train size={20} />;
  if (n.includes("coffee") || n.includes("tea")) return <Coffee size={20} />;
  if (n.includes("market") || n.includes("bazaar") || n.includes("shopping") || n.includes("tibetan")) return <ShoppingBag size={20} />;
  if (n.includes("dam") || n.includes("falls") || n.includes("waterfall")) return <Waves size={20} />;
  if (n.includes("valley") || n.includes("boat")) return <Mountain size={20} />;
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
  onInquire: (property: Property) => void;
}

export default function PropertyDetailPage({ property, onBack, onBookSuite, onInquire }: PropertyDetailPageProps) {
  const gallery = property.gallery.length > 0 ? property.gallery : [property.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [nearbyTab, setNearbyTab] = useState<"landmarks" | "food-shopping" | "transport">("landmarks");
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
  const whyStayItems = property.whyStayCards ?? whyStayFeatures;

  // Mobile "show all" collapse state — one per long-list section (see useExpandable above)
  const highlightsExpand = useExpandable(highlightCards.length, 6);
  const roomAmenitiesExpand = useExpandable(roomAmenities.length, 8);
  const whyStayExpand = useExpandable(whyStayItems.length, 4);
  const nearbyFallbackExpand = useExpandable(nearbyAttractions.length, 6);
  const nearbyLandmarksExpand = useExpandable(property.nearbyLandmarks?.length ?? 0, 6);
  const amenityCategoriesExpand = useExpandable(property.amenityCategories?.length ?? 0, 6);

  // ── Stay-details tabs — At A Glance / Facilities / Room / Why Stay / Rules /
  //    Nearby used to be six stacked scroll sections; guests only ever look at
  //    one or two, so they now live behind tabs and only the active one mounts.
  const hasAmenityCategories = !!(property.amenityCategories && property.amenityCategories.length > 0);
  const hasRules = !property.hideHouseRules;
  const hasNearby = nearbyAttractions.length > 0 || !!(property.nearbyLandmarks && property.nearbyLandmarks.length > 0);
  const hasExperiences = !!(property.signatureExperiences && property.signatureExperiences.length > 0);
  const hasGuestStories = !!(property.guestHighlights && property.guestHighlights.length > 0);

  const tabDefs = [
    { id: "highlights", label: "At A Glance", icon: <Sparkles size={13} /> },
    ...(hasExperiences ? [{ id: "experiences", label: "Signature Experiences", icon: <Star size={13} /> }] : []),
    { id: "facilities", label: "Facilities", icon: <Wifi size={13} /> },
    ...(!hasAmenityCategories ? [{ id: "room", label: "In Your Room", icon: <BedDouble size={13} /> }] : []),
    { id: "whystay", label: "Why Stay", icon: <Heart size={13} /> },
    ...(hasRules ? [{ id: "rules", label: "House Rules", icon: <Clock size={13} /> }] : []),
    ...(hasNearby ? [{ id: "nearby", label: "Nearby", icon: <MapPinned size={13} /> }] : []),
    ...(hasGuestStories ? [{ id: "guestStories", label: "Guest Stories", icon: <ThumbsUp size={13} /> }] : []),
  ];
  const [activeTab, setActiveTab] = useState(tabDefs[0].id);

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
              <SplitText
                key={`${property.id}-badge`}
                text={`${property.type} · ${property.region}`}
                tag="span"
                delay={20}
                duration={0.5}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 8 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="left"
              />
            </span>
            <h1 className="font-display text-xl sm:text-2xl md:text-4xl font-medium text-white tracking-tight leading-tight mb-2">
              <BlurText
                key={`${property.id}-name`}
                text={property.name}
                tag="span"
                className="!justify-start !text-left"
                delay={30}
                animateBy="words"
                direction="top"
                threshold={0.1}
                rootMargin="0px"
              />
            </h1>
            {property.heroSubtitle && (
              <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed max-w-2xl mb-3">
                {property.heroSubtitle}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-1.5 text-white/70">
                <MapPin size={12} />
                <span className="text-xs font-light">{property.location}</span>
              </div>
              <div className="flex items-baseline gap-1.5 text-white">
                <span className="text-[10px] text-white/60 font-light">Rates vary by date —</span>
                <span className="font-display text-sm md:text-base font-semibold text-brand-gold-light">
                  Check Price
                </span>
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

      {/* ── 1. About The Property ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <FadeUp>
            <SectionHeading eyebrow="Our Story" title={property.aboutSectionTitle ?? "About The Property"} />
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
                <div className="flex items-center gap-3">
                  <MapPin size={15} className="text-brand-secondary shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary/40 uppercase tracking-wider block">Location</span>
                    <WaveText
                      className="text-xs font-semibold text-brand-primary"
                      text={property.locationDisplay ?? `${property.region}, ${property.location}`}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BedDouble size={15} className="text-brand-secondary shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-brand-primary/40 uppercase tracking-wider block">Stay Type</span>
                    <WaveText
                      className="text-xs font-semibold text-brand-primary"
                      text={property.stayTypeDisplay ?? `${property.type} · ${property.region}`}
                      delay={150}
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => onBookSuite(property, property.suites[0])}
                    className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-secondary rounded-xl px-4 py-3.5 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <span className="flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-brand-gold-light">
                      Book Now
                      <ChevronRight size={14} />
                    </span>
                  </button>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 2. Stay Details — At A Glance / Signature Experiences / Facilities / Room /
             Why Stay / Rules / Nearby / Guest Stories, all behind one tab bar so only
             the section a guest actually wants renders ── */}
      <section className="py-16 md:py-24 bg-brand-background">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Sticky tab bar */}
          <div className="sticky top-20 md:top-24 z-20 -mx-4 md:-mx-8 px-4 md:px-8 bg-brand-background/95 backdrop-blur-md border-b border-brand-primary/8 mb-8 md:mb-10">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
              {tabDefs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 shrink-0 px-4 py-2.5 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-brand-primary text-white shadow-md"
                      : "bg-white text-brand-primary/55 border border-brand-primary/8 hover:text-brand-primary hover:border-brand-secondary/30"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ── At A Glance ── */}
            {activeTab === "highlights" && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                  {highlightCards.map((item, idx) => (
                    <FadeUp key={idx} delay={Math.min(idx, 8) * 50} className={`h-full ${highlightsExpand.itemHiddenClass(idx)}`}>
                      <div className="h-full bg-white border border-brand-primary/8 rounded-2xl p-3.5 md:p-5 flex flex-col items-center text-center gap-2.5 md:gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                        <span className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                          {resolveHighlightIcon(item)}
                        </span>
                        <p className="text-[11px] md:text-xs font-semibold text-brand-primary leading-snug">{item}</p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
                <ShowMoreButton {...highlightsExpand} total={highlightCards.length} label="Highlights" />
              </div>
            )}

            {/* ── Signature Experiences ── */}
            {activeTab === "experiences" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                {property.signatureExperiences!.map((exp, idx) => (
                  <FadeUp key={idx} delay={idx * 70} className="h-full">
                    <div className="h-full group relative bg-white border border-brand-primary/10 rounded-2xl p-6 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none" />
                      <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-brand-gold-light shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                        {resolveExperienceIcon(exp.title)}
                      </span>
                      <div className="relative z-10">
                        <h3 className="text-sm font-bold text-brand-primary mb-2 group-hover:text-brand-secondary transition-colors leading-snug">
                          {exp.title}
                        </h3>
                        <p className="text-xs text-brand-primary/60 font-light leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </FadeUp>
                ))}
              </div>
            )}

            {/* ── Facilities — categorized grid when available, else popular amenities ── */}
            {activeTab === "facilities" && (
              hasAmenityCategories ? (
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                    {property.amenityCategories!.map((cat, idx) => (
                      <FadeUp key={idx} delay={Math.min(idx, 6) * 50} className={`h-full ${amenityCategoriesExpand.itemHiddenClass(idx)}`}>
                        <div className="h-full bg-white border border-brand-primary/8 rounded-xl md:rounded-2xl p-3 md:p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-center gap-2 md:gap-2.5 mb-2.5 md:mb-4 pb-2 md:pb-3 border-b border-brand-primary/8">
                            <span className="w-6 h-6 md:w-8 md:h-8 rounded-md md:rounded-lg bg-brand-primary/8 flex items-center justify-center text-brand-secondary shrink-0">
                              {resolveHighlightIcon(cat.category)}
                            </span>
                            <h3 className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-wider leading-snug">{cat.category}</h3>
                          </div>
                          <ul className="space-y-1.5 md:space-y-2">
                            {cat.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 md:gap-2.5">
                                <span className="w-4 h-4 md:w-5 md:h-5 rounded-md bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0 mt-0.5">
                                  <Check size={10} strokeWidth={3} />
                                </span>
                                <span className="text-[11px] md:text-xs text-brand-primary/70 font-light leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                  <ShowMoreButton {...amenityCategoriesExpand} total={property.amenityCategories!.length} label="Categories" />
                </div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 md:gap-4">
                  {popularAmenities.map((amenity, idx) => (
                    <FadeUp key={idx} delay={idx * 60}>
                      <div className="flex flex-col items-center text-center gap-2 md:gap-3 p-3 md:p-5 bg-white border border-brand-primary/8 rounded-2xl hover:border-brand-secondary/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                        <span className="w-9 h-9 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-brand-primary flex items-center justify-center text-brand-gold-light shrink-0">
                          {resolveHighlightIcon(amenity)}
                        </span>
                        <p className="text-[10px] md:text-xs font-semibold text-brand-primary leading-snug">{amenity}</p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              )
            )}

            {/* ── In Your Room (only when facilities aren't already categorized) ── */}
            {activeTab === "room" && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
                  {roomAmenities.map((amenity, idx) => (
                    <FadeUp key={idx} delay={Math.min(idx, 10) * 30} className={roomAmenitiesExpand.itemHiddenClass(idx)}>
                      <div className="flex items-center gap-2 md:gap-2.5 bg-white border border-brand-primary/8 rounded-lg md:rounded-xl px-2.5 py-2 md:p-4 shadow-sm hover:shadow-md hover:border-brand-secondary/20 transition-all duration-300 h-full">
                        <span className="w-7 h-7 md:w-9 md:h-9 rounded-md md:rounded-lg bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                          {resolveHighlightIcon(amenity)}
                        </span>
                        <span className="text-[11px] md:text-xs font-semibold text-brand-primary/80 leading-snug">{amenity}</span>
                      </div>
                    </FadeUp>
                  ))}
                </div>
                <ShowMoreButton {...roomAmenitiesExpand} total={roomAmenities.length} label="Room Amenities" />
              </div>
            )}

            {/* ── Why Stay — rich cards if whyStayCards, else simple list ── */}
            {activeTab === "whystay" && (
              property.whyStayCards && property.whyStayCards.length > 0 ? (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                    {property.whyStayCards.map((card, idx) => (
                      <FadeUp key={idx} delay={Math.min(idx, 4) * 60} className={`h-full ${whyStayExpand.itemHiddenClass(idx)}`}>
                        <div className="h-full bg-white border border-brand-primary/8 rounded-2xl p-4 md:p-6 flex flex-col gap-2.5 md:gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group">
                          <span className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shrink-0">
                            {resolveHighlightIcon(card.title)}
                          </span>
                          <h3 className="text-xs md:text-sm font-bold text-brand-primary leading-snug group-hover:text-brand-secondary transition-colors">
                            {card.title}
                          </h3>
                          <p className="text-[11px] md:text-xs text-brand-primary/55 font-light leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                  <ShowMoreButton {...whyStayExpand} total={property.whyStayCards.length} label="Reasons" />
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                    {whyStayFeatures.map((feature, idx) => (
                      <FadeUp key={idx} delay={Math.min(idx, 4) * 60} className={whyStayExpand.itemHiddenClass(idx)}>
                        <div className="bg-white border border-brand-primary/8 rounded-2xl p-3.5 md:p-6 flex flex-col gap-2.5 md:gap-4 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group h-full">
                          <span className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center text-white shrink-0">
                            {resolveHighlightIcon(feature)}
                          </span>
                          <p className="text-xs md:text-sm font-semibold text-brand-primary leading-snug group-hover:text-brand-secondary transition-colors">
                            {feature}
                          </p>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                  <ShowMoreButton {...whyStayExpand} total={whyStayFeatures.length} label="Reasons" />
                </div>
              )
            )}

            {/* ── House Rules ── */}
            {activeTab === "rules" && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                {/* Check-in */}
                <FadeUp delay={0}>
                  <div className="h-full bg-brand-primary rounded-2xl p-4 md:p-6 flex flex-col gap-2.5 md:gap-3 shadow-sm">
                    <span className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center text-brand-gold-light">
                      <Clock size={16} className="md:hidden" />
                      <Clock size={18} className="hidden md:block" />
                    </span>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Check-in</p>
                      <p className="text-base md:text-xl font-display font-semibold text-white">{houseRules.checkIn}</p>
                    </div>
                  </div>
                </FadeUp>
                {/* Check-out */}
                <FadeUp delay={60}>
                  <div className="h-full bg-brand-secondary rounded-2xl p-4 md:p-6 flex flex-col gap-2.5 md:gap-3 shadow-sm">
                    <span className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white/10 flex items-center justify-center text-white">
                      <Clock size={16} className="md:hidden" />
                      <Clock size={18} className="hidden md:block" />
                    </span>
                    <div>
                      <p className="text-[9px] md:text-[10px] font-bold text-white/50 uppercase tracking-widest mb-1">Check-out</p>
                      <p className="text-base md:text-xl font-display font-semibold text-white">{houseRules.checkOut}</p>
                    </div>
                  </div>
                </FadeUp>
                {/* Rules */}
                {houseRules.rules.map((rule, idx) => (
                  <FadeUp key={idx} delay={(idx + 2) * 60}>
                    <div className="h-full bg-white border border-brand-primary/8 rounded-2xl p-4 md:p-6 flex flex-col gap-2.5 md:gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                      <span className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-brand-primary/8 flex items-center justify-center text-brand-secondary">
                        {resolveRuleIcon(rule)}
                      </span>
                      <p className="text-xs md:text-sm font-semibold text-brand-primary leading-snug">{rule}</p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            )}

            {/* ── Nearby Attractions — tabbed when structured data available ── */}
            {activeTab === "nearby" && (
            property.nearbyLandmarks && property.nearbyTransport ? (
              /* ── Tabbed view for structured landmark + transport data ── */
              <div>
                <FadeUp delay={60}>
                  <div className="flex items-center gap-2 mb-8 bg-white border border-brand-primary/8 rounded-xl p-1.5 w-fit shadow-sm flex-wrap">
                    <button
                      onClick={() => setNearbyTab("landmarks")}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer
                        ${nearbyTab === "landmarks"
                          ? "bg-brand-primary text-white shadow-md"
                          : "text-brand-primary/50 hover:text-brand-primary"
                        }`}
                    >
                      <MapPinned size={13} />
                      <span>Key Landmarks</span>
                    </button>
                    {property.nearbyFoodShopping && property.nearbyFoodShopping.length > 0 && (
                      <button
                        onClick={() => setNearbyTab("food-shopping")}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer
                          ${nearbyTab === "food-shopping"
                            ? "bg-brand-primary text-white shadow-md"
                            : "text-brand-primary/50 hover:text-brand-primary"
                          }`}
                      >
                        <ShoppingBag size={13} />
                        <span>Food &amp; Shopping</span>
                      </button>
                    )}
                    <button
                      onClick={() => setNearbyTab("transport")}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer
                        ${nearbyTab === "transport"
                          ? "bg-brand-primary text-white shadow-md"
                          : "text-brand-primary/50 hover:text-brand-primary"
                        }`}
                    >
                      <Bus size={13} />
                      <span>Transport</span>
                    </button>
                  </div>
                </FadeUp>

                {nearbyTab === "landmarks" && (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
                      {property.nearbyLandmarks.map((place, idx) => (
                        <FadeUp key={idx} delay={Math.min(idx, 6) * 60} className={nearbyLandmarksExpand.itemHiddenClass(idx)}>
                          <div className="h-full bg-white border border-brand-primary/8 rounded-xl md:rounded-2xl p-3 md:p-5 flex items-center gap-2.5 md:gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-brand-secondary/30 transition-all duration-300">
                            <span className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                              {resolveAttractionIcon(place.name)}
                            </span>
                            <div>
                              <p className="text-[11px] md:text-xs font-bold text-brand-primary leading-snug">{place.name}</p>
                              <p className="text-[9px] md:text-[10px] text-brand-secondary font-semibold mt-0.5">{place.distance}</p>
                            </div>
                          </div>
                        </FadeUp>
                      ))}
                    </div>
                    <ShowMoreButton {...nearbyLandmarksExpand} total={property.nearbyLandmarks.length} label="Landmarks" />
                  </>
                )}

                {nearbyTab === "food-shopping" && property.nearbyFoodShopping && (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
                    {property.nearbyFoodShopping.map((place, idx) => (
                      <FadeUp key={idx} delay={idx * 60}>
                        <div className="h-full bg-white border border-brand-primary/8 rounded-xl md:rounded-2xl p-3 md:p-5 flex items-center gap-2.5 md:gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-brand-secondary/30 transition-all duration-300">
                          <span className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                            {resolveAttractionIcon(place.name)}
                          </span>
                          <div>
                            <p className="text-[11px] md:text-xs font-bold text-brand-primary leading-snug">{place.name}</p>
                            <p className="text-[9px] md:text-[10px] text-brand-secondary font-semibold mt-0.5">{place.distance}</p>
                          </div>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                )}

                {nearbyTab === "transport" && (
                  <div className="space-y-5 md:space-y-6">
                    {property.nearbyTransport.map((group, gIdx) => (
                      <FadeUp key={gIdx} delay={gIdx * 80}>
                        <div>
                          <h3 className="text-[10px] font-bold text-brand-primary/40 uppercase tracking-[0.18em] mb-2.5 md:mb-3">
                            {group.type}
                          </h3>
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
                            {group.items.map((item, iIdx) => (
                              <div key={iIdx} className="h-full bg-white border border-brand-primary/8 rounded-xl md:rounded-2xl p-3 md:p-5 flex items-center gap-2.5 md:gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-brand-secondary/30 transition-all duration-300">
                                <span className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                                  {group.type.toLowerCase().includes("railway") || group.type.toLowerCase().includes("train")
                                    ? <Train size={18} />
                                    : item.name.toLowerCase().includes("taxi") || item.name.toLowerCase().includes("stand")
                                      ? <Car size={18} />
                                      : <Bus size={18} />
                                  }
                                </span>
                                <div>
                                  <p className="text-[11px] md:text-xs font-bold text-brand-primary leading-snug">{item.name}</p>
                                  <p className="text-[9px] md:text-[10px] text-brand-secondary font-semibold mt-0.5">{item.distance}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </FadeUp>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* ── Simple grid fallback for string array data ── */
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3 md:gap-4">
                  {nearbyAttractions.map((attraction, idx) => (
                    <FadeUp key={idx} delay={Math.min(idx, 6) * 60} className={nearbyFallbackExpand.itemHiddenClass(idx)}>
                      <div className="bg-white border border-brand-primary/8 rounded-xl md:rounded-2xl p-3.5 md:p-5 flex flex-col items-center text-center gap-2 md:gap-3 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-brand-secondary/30 transition-all duration-300 h-full">
                        <span className="w-9 h-9 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-secondary shrink-0">
                          {resolveAttractionIcon(attraction)}
                        </span>
                        <p className="text-[11px] md:text-xs font-semibold text-brand-primary leading-snug">{attraction}</p>
                      </div>
                    </FadeUp>
                  ))}
                </div>
                <ShowMoreButton {...nearbyFallbackExpand} total={nearbyAttractions.length} label="Attractions" />
              </>
            )
            )}

            {/* ── Guest Stories ── */}
            {activeTab === "guestStories" && (
              <div className="bg-white border border-brand-primary/8 rounded-2xl p-7 md:p-10 shadow-sm">
                <ul className="space-y-4">
                  {property.guestHighlights!.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <span className="w-8 h-8 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                        <ThumbsUp size={15} />
                      </span>
                      <span className="text-sm font-semibold text-brand-primary/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── 3. Need Assistance CTA ── */}
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
              <button
                id="inquire-now-btn"
                onClick={() => onInquire(property)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-sm tracking-wider px-8 py-4 rounded-xl transition-all duration-300 cursor-pointer"
              >
                <Phone size={15} />
                <span>Inquire Now</span>
              </button>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm tracking-wider px-4 py-4 transition-all duration-300 cursor-pointer"
              >
                <span>or call +91 98765 43210</span>
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
