/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MapPin, Calendar, User, Search, Check, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import TextType from "./TextType";
import BlurText from "./BlurText";

const heroNature = "https://i.postimg.cc/9MBBdTWW/nature.png";

interface HeroProps {
  onSearch: (filters: { destination: string; checkIn: string; checkOut: string; guests: number }) => void;
  onExploreClick: () => void;
  onOpenBooking: () => void;
}

export default function Hero({ onSearch, onExploreClick, onOpenBooking }: HeroProps) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Popover States
  const [showDestPopover, setShowDestPopover] = useState(false);
  const [showDatesPopover, setShowDatesPopover] = useState(false);
  const [showGuestsPopover, setShowGuestsPopover] = useState(false);
  const [expandedDest, setExpandedDest] = useState<string | null>(null);

  const destRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  const destinationsList = [
    { label: "Ooty", region: "Nilgiri Hills, India" },
    { label: "Kothagiri", region: "Nilgiri Hills, India" },
    { label: "Kodaikanal", region: "Palani Hills, India" }
  ];

  const destinationProperties: Record<string, string[]> = {
    Ooty: ["THE ABODE BY BROWN TREE", "The Earthy Nest by Brown Tree", "Tea Leaf Stays by Brown Tree Resorts"],
    Kothagiri: ["Humming Bird by Brown Tree Resorts"],
    Kodaikanal: ["Hotel Vetrivel International by Brown Tree Resorts"]
  };

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setShowDestPopover(false);
      }
      if (datesRef.current && !datesRef.current.contains(event.target as Node)) {
        setShowDatesPopover(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setShowGuestsPopover(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchClick = () => {
    onSearch({
      destination,
      checkIn: checkIn || "Anytime",
      checkOut: checkOut || "Anytime",
      guests: adults + children
    });
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-center items-center text-white px-4 pt-24 md:pt-16 pb-20 md:pb-32 overflow-hidden"
    >
      {/* Background Image with Dark Linear Overlay for contrast */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroNature}
          alt="Luxe Sanctuary Nature View"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[0.75] scale-105 transition-transform duration-[10s] ease-out select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/40 via-brand-primary/10 to-brand-primary/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6 md:space-y-8 animate-fade-in-up mt-8 md:mt-16">
        <div className="flex items-center justify-center space-x-2 text-xs md:text-sm font-semibold tracking-[0.3em] text-brand-gold-light uppercase">
          <Sparkles size={16} />
          <span>Curated Global Sanctuaries</span>
        </div>

        <TextType
          text="Luxury Stay Experience"
          className="font-display text-4xl sm:text-5xl md:text-7xl font-medium tracking-tight text-brand-background leading-[1.1]"
          as="h1"
          typingSpeed={60}
          initialDelay={300}
          loop={false}
          showCursor={true}
          cursorCharacter="|"
          cursorClassName="text-brand-gold-light"
        />

        <BlurText
          text="Discover unparalleled tranquility and bespoke elegance at our curated global properties. Your sanctuary awaits."
          className="font-sans text-sm sm:text-base md:text-lg text-brand-background/85 max-w-2xl mx-auto font-light leading-relaxed px-2"
          delay={40}
          animateBy="words"
          direction="top"
        />

        {/* Hero CTA Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            id="hero-book-now-cta"
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-brand-primary text-brand-gold-light hover:bg-brand-secondary hover:text-white font-sans text-xs font-semibold tracking-[0.2em] py-4 px-8 rounded-full shadow-lg shadow-brand-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            BOOK NOW
          </button>
          <button
            id="hero-explore-cta"
            onClick={onExploreClick}
            className="w-full sm:w-auto glass-panel text-white hover:bg-white hover:text-brand-primary font-sans text-xs font-semibold tracking-[0.2em] py-4 px-8 rounded-full border border-white/20 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            EXPLORE PROPERTIES
          </button>
        </div>
      </div>

      {/* Floating Glassmorphic Search Container */}
      <div className="relative z-20 w-full max-w-5xl mx-auto mt-12 md:mt-20 px-2">
        <div
          id="hero-search-bar"
          className="glass-panel rounded-2xl md:rounded-full p-4 md:py-3 md:pl-8 md:pr-3 flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between shadow-2xl border border-white/40 shadow-brand-primary/10 w-full"
        >
          {/* Destination Field */}
          <div ref={destRef} className="relative flex-1 w-full text-left md:border-r border-brand-primary/10 md:pr-4">
            <button
              id="search-dest-button"
              onClick={() => {
                setShowDestPopover(!showDestPopover);
                setShowDatesPopover(false);
                setShowGuestsPopover(false);
              }}
              className="flex items-center space-x-3 w-full p-2 hover:bg-black/5 rounded-xl transition text-left focus:outline-none cursor-pointer"
            >
              <MapPin className="text-brand-secondary shrink-0" size={18} />
              <div className="overflow-hidden">
                <span className="block text-[10px] font-bold tracking-[0.1em] text-brand-primary/65 uppercase">
                  DESTINATION
                </span>
                <span className="block text-sm font-semibold text-brand-primary truncate">
                  {destination || "Where to?"}
                </span>
              </div>
            </button>

            {showDestPopover && (
              <div className="absolute bottom-[115%] left-0 z-40 w-full sm:w-[320px] bg-white rounded-2xl shadow-2xl border border-stone-200/50 p-4 mb-2 animate-scale-up">
                <p className="text-[10px] font-bold tracking-widest text-stone-400 px-2 pb-2.5 border-b border-stone-100 uppercase">
                  POPULAR SANCTUARIES
                </p>
                <div className="space-y-2 mt-3 max-h-[360px] overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setDestination("");
                      setShowDestPopover(false);
                      setExpandedDest(null);
                    }}
                    className="flex items-center justify-between w-full text-left text-xs font-semibold py-2 px-3 rounded-xl hover:bg-stone-50 text-brand-primary cursor-pointer transition-all"
                  >
                    <span>All Locations</span>
                    {destination === "" && <Check size={14} className="text-brand-secondary" />}
                  </button>

                  {destinationsList.map((dest) => {
                    const isExpanded = expandedDest === dest.label;
                    const props = destinationProperties[dest.label] || [];
                    
                    return (
                      <div key={dest.label} className="border border-stone-100 rounded-xl overflow-hidden bg-white shadow-sm transition-all duration-300">
                        {/* Parent Destination Header Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setExpandedDest(isExpanded ? null : dest.label);
                          }}
                          className={`flex items-center justify-between w-full text-left py-2.5 px-3 transition-all cursor-pointer ${
                            isExpanded ? "bg-stone-50 font-semibold" : "hover:bg-stone-50/50"
                          }`}
                        >
                          <div>
                            <span className="block text-xs font-bold text-brand-primary uppercase tracking-wide">{dest.label}</span>
                            <span className="block text-[10px] text-stone-400 font-medium">{dest.region}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {destination.toLowerCase().includes(dest.label.toLowerCase()) && (
                              <Check size={14} className="text-brand-secondary" />
                            )}
                            {isExpanded ? (
                              <ChevronUp size={14} className="text-stone-400" />
                            ) : (
                              <ChevronDown size={14} className="text-stone-400" />
                            )}
                          </div>
                        </button>

                        {/* Children Properties Accordion Content */}
                        {isExpanded && (
                          <div className="bg-stone-50/40 px-2 py-2 border-t border-stone-100 space-y-1">
                            {/* Option to select all of the destination */}
                            <button
                              type="button"
                              onClick={() => {
                                setDestination(dest.label);
                                setShowDestPopover(false);
                                setExpandedDest(null);
                              }}
                              className="flex items-center justify-between w-full text-left text-[11px] font-semibold py-1.5 px-2.5 rounded-lg hover:bg-stone-100 text-stone-500 transition"
                            >
                              <span>Explore All in {dest.label}</span>
                              {destination === dest.label && <Check size={12} className="text-brand-secondary" />}
                            </button>

                            {/* Specific properties */}
                            {props.map((prop) => (
                              <button
                                key={prop}
                                type="button"
                                onClick={() => {
                                  setDestination(prop);
                                  setShowDestPopover(false);
                                  setExpandedDest(null);
                                }}
                                className="flex items-center justify-between w-full text-left text-[11px] font-medium py-2 px-2.5 rounded-lg bg-white border border-stone-200/50 hover:border-stone-300 text-brand-primary transition shadow-sm hover:shadow-md"
                              >
                                <div className="flex items-center space-x-1.5">
                                  <span className="text-xs">🏡</span>
                                  <span className="truncate">{prop}</span>
                                </div>
                                {destination === prop && <Check size={12} className="text-brand-secondary" />}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Check In / Out Dates Field */}
          <div ref={datesRef} className="relative flex-1 w-full text-left md:border-r border-brand-primary/10 md:px-6">
            <button
              id="search-dates-button"
              onClick={() => {
                setShowDatesPopover(!showDatesPopover);
                setShowDestPopover(false);
                setShowGuestsPopover(false);
              }}
              className="flex items-center space-x-3 w-full p-2 hover:bg-black/5 rounded-xl transition text-left focus:outline-none cursor-pointer"
            >
              <Calendar className="text-brand-secondary shrink-0" size={18} />
              <div>
                <span className="block text-[10px] font-bold tracking-[0.1em] text-brand-primary/65 uppercase">
                  TRAVEL DATES
                </span>
                <span className="block text-sm font-semibold text-brand-primary truncate">
                  {checkIn && checkOut ? `${checkIn} to ${checkOut}` : "Add dates"}
                </span>
              </div>
            </button>

            {showDatesPopover && (
              <div className="absolute top-[110%] left-0 sm:left-1/2 sm:-translate-x-1/2 z-30 w-full sm:w-[320px] bg-white rounded-2xl shadow-xl border border-brand-primary/5 p-4 mt-1 animate-scale-up">
                <p className="text-[10px] font-bold tracking-widest text-brand-primary/50 pb-2 border-b border-brand-primary/5 text-center">
                  SELECT DATES
                </p>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="block text-[9px] font-bold text-brand-primary/50 tracking-wider uppercase mb-1">
                      Check-In
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={todayStr}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCheckIn(val);
                        if (!checkOut || checkOut < val) {
                          setCheckOut(val);
                        }
                      }}
                      className="w-full border border-brand-primary/15 rounded-lg p-2 text-xs text-brand-primary focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-brand-primary/50 tracking-wider uppercase mb-1">
                      Check-Out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || todayStr}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full border border-brand-primary/15 rounded-lg p-2 text-xs text-brand-primary focus:outline-none focus:border-brand-secondary"
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 pt-3 border-t border-brand-primary/5">
                  <button
                    onClick={() => {
                      setCheckIn("");
                      setCheckOut("");
                    }}
                    className="text-[10px] font-bold text-brand-primary/40 hover:text-brand-secondary"
                  >
                    RESET
                  </button>
                  <button
                    onClick={() => setShowDatesPopover(false)}
                    className="bg-brand-primary text-brand-gold-light text-[10px] font-bold px-3 py-1.5 rounded-full"
                  >
                    APPLY
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Guests Field */}
          <div ref={guestsRef} className="relative flex-1 w-full text-left md:px-6">
            <button
              id="search-guests-button"
              onClick={() => {
                setShowGuestsPopover(!showGuestsPopover);
                setShowDestPopover(false);
                setShowDatesPopover(false);
              }}
              className="flex items-center space-x-3 w-full p-2 hover:bg-black/5 rounded-xl transition text-left focus:outline-none cursor-pointer"
            >
              <User className="text-brand-secondary shrink-0" size={18} />
              <div>
                <span className="block text-[10px] font-bold tracking-[0.1em] text-brand-primary/65 uppercase">
                  GUESTS
                </span>
                <span className="block text-sm font-semibold text-brand-primary truncate">
                  {adults} Ad, {children} Ch
                </span>
              </div>
            </button>

            {showGuestsPopover && (
              <div className="absolute top-[110%] right-0 z-30 w-full sm:w-[260px] bg-white rounded-2xl shadow-xl border border-brand-primary/5 p-4 mt-1 animate-scale-up space-y-3">
                <p className="text-[10px] font-bold tracking-widest text-brand-primary/50 pb-2 border-b border-brand-primary/5">
                  SELECT GUESTS
                </p>
                
                {/* Adults row */}
                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="block text-xs font-semibold text-brand-primary">Adults</span>
                    <span className="block text-[9px] text-stone-400">Ages 13 or above</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full border border-brand-primary/10 flex items-center justify-center text-brand-primary hover:border-brand-secondary hover:text-brand-secondary text-sm font-bold focus:outline-none cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-brand-primary w-4 text-center">{adults}</span>
                    <button
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                      className="w-8 h-8 rounded-full border border-brand-primary/10 flex items-center justify-center text-brand-primary hover:border-brand-secondary hover:text-brand-secondary text-sm font-bold focus:outline-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Children row */}
                <div className="flex items-center justify-between py-1">
                  <div>
                    <span className="block text-xs font-semibold text-brand-primary">Children</span>
                    <span className="block text-[9px] text-stone-400">Ages 2–12</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full border border-brand-primary/10 flex items-center justify-center text-brand-primary hover:border-brand-secondary hover:text-brand-secondary text-sm font-bold focus:outline-none cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-sm font-bold text-brand-primary w-4 text-center">{children}</span>
                    <button
                      onClick={() => setChildren(Math.min(10, children + 1))}
                      className="w-8 h-8 rounded-full border border-brand-primary/10 flex items-center justify-center text-brand-primary hover:border-brand-secondary hover:text-brand-secondary text-sm font-bold focus:outline-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowGuestsPopover(false)}
                  className="w-full bg-brand-primary text-brand-gold-light text-[10px] font-bold py-2 rounded-full text-center mt-2 uppercase tracking-wider cursor-pointer"
                >
                  Confirm Guests
                </button>
              </div>
            )}
          </div>

          {/* Search CTA Round Button */}
          <div className="w-full md:w-auto flex justify-end">
            <button
              id="search-submit-cta"
              onClick={handleSearchClick}
              className="bg-brand-primary hover:bg-brand-secondary text-brand-gold-light p-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/10 flex items-center justify-center w-full md:w-12 md:h-12 border border-brand-gold-light/20 cursor-pointer"
              title="Search Sanctuaries"
            >
              <Search size={20} className="shrink-0" />
              <span className="md:hidden ml-2 font-semibold text-xs tracking-widest">SEARCH PROPERTIES</span>
            </button>
          </div>
        </div>
      </div>

      {/* Swoooping Organic Curved Separator */}
      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden line-height-0 pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] sm:h-[80px] md:h-[120px]"
        >
          <path d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z" fill="#fcf9f8" />
        </svg>
      </div>
    </section>
  );
}
