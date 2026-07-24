/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { MapPin, Home, Calendar, Search, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import TextType from "./TextType";
import browntreeVideo from "../assets/images/broentree_video.mp4";
import { useToast } from "./useToast";
import { getBookingUrl } from "../bookingUrls";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function MiniCalendar({ value, minDate, onChange, hideDisabled = false }: { value: string; minDate: string; onChange: (v: string) => void; hideDisabled?: boolean }) {
  const today = new Date();
  const init = value ? new Date(value + "T12:00:00") : today;
  const [view, setView] = useState({ year: init.getFullYear(), month: init.getMonth() });

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const minD = minDate ? new Date(minDate + "T00:00:00") : null;

  const prevMonth = () => setView(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { ...v, month: v.month - 1 });
  const nextMonth = () => setView(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { ...v, month: v.month + 1 });

  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
  while (cells.length % 7 !== 0) cells.push(null);

  const toStr = (d: number) => `${view.year}-${String(view.month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const isSelected = (d: number) => toStr(d) === value;
  const isDisabled = (d: number) => !!(minD && new Date(toStr(d) + "T00:00:00") < minD);
  const isToday = (d: number) => new Date(toStr(d)).toDateString() === today.toDateString();

  return (
    <div style={{ width: 248 }}>
      {/* Month/Year nav */}
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="p-1 rounded-lg hover:bg-[#F8F5EF] transition-colors cursor-pointer focus:outline-none">
          <ChevronLeft size={14} style={{ color: "#4A2C1D" }} />
        </button>
        <span className="text-xs font-bold tracking-wide" style={{ color: "#4A2C1D" }}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button type="button" onClick={nextMonth} className="p-1 rounded-lg hover:bg-[#F8F5EF] transition-colors cursor-pointer focus:outline-none">
          <ChevronRight size={14} style={{ color: "#4A2C1D" }} />
        </button>
      </div>
      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[9px] font-bold tracking-wide py-0.5" style={{ color: "#b8a090" }}>{d}</div>
        ))}
      </div>
      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => (
          <div key={i} className="flex items-center justify-center">
            {d && !(hideDisabled && isDisabled(d)) ? (
              <button
                type="button"
                disabled={isDisabled(d)}
                onClick={() => !isDisabled(d) && onChange(toStr(d))}
                className={`w-8 h-8 rounded-full text-xs font-medium transition-all duration-150 focus:outline-none ${
                  isDisabled(d) ? "opacity-30 cursor-not-allowed" :
                  isSelected(d) ? "text-white font-bold cursor-pointer" :
                  isToday(d) ? "font-bold cursor-pointer hover:bg-[#F8F5EF]" :
                  "cursor-pointer hover:bg-[#F8F5EF]"
                }`}
                style={{
                  background: isSelected(d) ? "linear-gradient(135deg,#D4AF37,#b8941f)" : "transparent",
                  color: isSelected(d) ? "#fff" : isToday(d) ? "#D4AF37" : "#18281e",
                  boxShadow: isSelected(d) ? "0 2px 8px rgba(212,175,55,0.4)" : "none",
                }}
              >
                {d}
              </button>
            ) : <div className="w-8 h-8" />}
          </div>
        ))}
      </div>
    </div>
  );
}

interface HeroProps {
  onSearch: (filters: { destination: string; checkIn: string; checkOut: string; guests: number }) => void;
  onExploreClick: () => void;
  onOpenBooking: () => void;
  preFill?: { location: string; property: string } | null;
  onPreFillConsumed?: () => void;
}

const LOCATIONS = [
  { label: "Ooty", region: "Nilgiri Hills, India" },
  { label: "Kothagiri", region: "Nilgiri Hills, India" },
  { label: "Kodaikanal", region: "Palani Hills, India" },
];

const PROPERTIES: Record<string, string[]> = {
  Ooty: [
    "THE ABODE BY BROWN TREE",
    "The Earthy Nest by Brown Tree",
    "Tea Leaf Stays by Brown Tree Resorts",
    "Sholas Residency by Brown Tree",
  ],
  Kothagiri: ["Humming Bird by Brown Tree Resorts"],
  Kodaikanal: ["Hotel Vetrivel International by Brown Tree Resorts"],
};

type ActivePanel = "location" | "property" | "checkin" | "checkout" | null;

export default function Hero({ preFill, onPreFillConsumed }: HeroProps) {
  const { toast } = useToast();

  const [location, setLocation] = useState("");
  const [property, setProperty] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [rippling, setRippling] = useState(false);
  const [checkoutEnabled, setCheckoutEnabled] = useState(false);
  const [titleTyped, setTitleTyped] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const todayStr = new Date().toISOString().split("T")[0];
  const allFilled = !!(location && property && checkIn && checkOut);

  // Once typing completes, sweep each letter from white to brown, last letter first
  useEffect(() => {
    if (!titleTyped || !titleRef.current) return;
    const letters = titleRef.current.querySelectorAll("span");
    gsap.fromTo(
      letters,
      { color: "#fcf9f8" },
      {
        color: "#5D2717",
        duration: 0.6,
        ease: "power2.inOut",
        stagger: { each: 0.055, from: "end" },
      }
    );
  }, [titleTyped]);

  // Seamless video loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (video.duration && video.currentTime >= video.duration - 0.18) video.currentTime = 0;
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, []);

  // Close panel on outside click
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setActivePanel(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // Keyboard: Escape closes
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") setActivePanel(null); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, []);

  const open = (panel: ActivePanel) => setActivePanel(panel);
  const close = useCallback(() => setActivePanel(null), []);

  // Pre-fill from "Book Suite" on property detail page
  useEffect(() => {
    if (!preFill) return;
    setLocation(preFill.location);
    setProperty(preFill.property);
    setCheckIn("");
    setCheckOut("");
    setCheckoutEnabled(false);
    setActivePanel(null);
    // Small delay so the home page has mounted before opening calendar
    const t = setTimeout(() => {
      setActivePanel("checkin");
      onPreFillConsumed?.();
    }, 450);
    return () => clearTimeout(t);
  }, [preFill]);

  // Auto-advance after location selected
  const handleSelectLocation = (loc: string) => {
    setLocation(loc);
    setProperty("");   // changing location always clears any previously selected property
    const props = PROPERTIES[loc] || [];
    if (props.length === 1) {
      // Single property → auto-select, skip to check-in
      setProperty(props[0]);
      close();
      setTimeout(() => open("checkin"), 280);
    } else {
      // Multiple → open property panel
      close();
      setTimeout(() => open("property"), 200);
    }
  };

  // Auto-advance after property selected
  const handleSelectProperty = (prop: string) => {
    setProperty(prop);
    close();
    setTimeout(() => open("checkin"), 280);
  };

  // Selecting a check-in date closes this calendar and opens check-out —
  // clears any stale checkout value and unlocks that field.
  const handleCheckinChange = (val: string) => {
    setCheckIn(val);
    setCheckOut("");           // clear stale checkout on every checkin change
    setCheckoutEnabled(true);  // unlock checkout field
    close();
    setTimeout(() => open("checkout"), 280);
  };

  const handleCheckoutChange = (val: string) => {
    setCheckOut(val);
  };

  // Clicking check-in before its prerequisites are filled redirects to
  // whichever earlier step is still missing, instead of opening its calendar.
  const handleCheckinClick = () => {
    if (!location) {
      toast({ variant: "destructive", title: "Location Required", description: "Please select a location first." });
      open("location");
      return;
    }
    if (!property) {
      toast({ variant: "destructive", title: "Property Required", description: "Please select a property first." });
      open("property");
      return;
    }
    open(isActive("checkin") ? null : "checkin");
  };

  // Disabled checkout click → show toast
  const handleDisabledCheckoutClick = () => {
    toast({
      variant: "destructive",
      title: "Check-in Required",
      description: "Please select your check-in date before choosing a check-out date.",
    });
    setTimeout(() => open("checkin"), 200);
  };

  // ── Validation + Search ──
  const handleSearchClick = () => {
    if (!location) {
      toast({ variant: "destructive", title: "Location Required", description: "Please select a location to continue." });
      setTimeout(() => open("location"), 150);
      return;
    }
    if (!property) {
      toast({ variant: "destructive", title: "Property Required", description: "Please select a destination / property." });
      setTimeout(() => open("property"), 150);
      return;
    }
    if (!checkIn) {
      toast({ variant: "destructive", title: "Check-in Required", description: "Please select your check-in date." });
      setTimeout(() => open("checkin"), 150);
      return;
    }
    if (!checkOut) {
      toast({ variant: "destructive", title: "Check-out Required", description: "Please select your check-out date." });
      setTimeout(() => open("checkout"), 150);
      return;
    }
    if (checkOut <= checkIn) {
      toast({ variant: "destructive", title: "Invalid Dates", description: "Check-out date must be after the check-in date." });
      setCheckOut("");
      setTimeout(() => open("checkout"), 150);
      return;
    }

    // All good — ripple + navigate
    setRippling(true);
    setTimeout(() => setRippling(false), 600);
    const url = getBookingUrl(property, checkIn, checkOut);
    setTimeout(() => window.open(url, "_blank"), 150);
  };


  const availableProperties = location ? PROPERTIES[location] || [] : [];


  const isActive = (panel: ActivePanel) => activePanel === panel;
  const isDone = (panel: ActivePanel) => {
    if (panel === "location") return !!location;
    if (panel === "property") return !!property;
    if (panel === "checkin") return !!checkIn;
    if (panel === "checkout") return !!checkOut;
    return false;
  };

  const fieldLabel = "block text-[9px] font-bold tracking-[0.15em] uppercase mb-0.5 transition-colors duration-200";
  const fieldValue = "block text-sm font-semibold truncate transition-colors duration-200";

  const panelClass = `
    absolute z-50 bg-white rounded-[18px] shadow-2xl
    animate-popup-in
  `;

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes popupIn {
          0%   { opacity: 0; transform: translateY(10px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .animate-popup-in {
          animation: popupIn 0.28s cubic-bezier(0.34,1.3,0.64,1) both;
        }
        @keyframes ripple {
          0%   { transform: scale(0); opacity: 0.45; }
          100% { transform: scale(4); opacity: 0; }
        }
        .btn-ripple::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgba(255,255,255,0.35);
          animation: ripple 0.55s ease-out forwards;
          pointer-events: none;
        }
        .field-active-ring {
          box-shadow: 0 0 0 2px rgba(212,175,55,0.55) inset;
          background: rgba(248,245,239,0.7) !important;
        }
      `}</style>

      <section
        id="home"
        className="relative min-h-[92vh] md:min-h-screen flex flex-col justify-center items-center text-white px-4 pt-24 md:pt-16 pb-20 md:pb-32"
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            src={browntreeVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover brightness-[0.72] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#18281e]/50 via-[#18281e]/10 to-[#18281e]/65" />
        </div>

        {/* Hero Title */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-5 md:space-y-7 animate-fade-in-up mt-8 md:mt-12">
          {/* Real H1 for SEO/screen readers — the animated text below is decorative and empty on first paint */}
          <h1 className="sr-only">
            Brown Tree Resorts – Luxury Resort, Home Stay &amp; Heritage Stays in Ooty, Kothagiri &amp; Kodaikanal
          </h1>
          {!titleTyped ? (
            <TextType
              text="BROWN TREE"
              className="font-brand text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-[#fcf9f8]"
              as="div"
              typingSpeed={60}
              initialDelay={300}
              loop={false}
              showCursor={true}
              cursorCharacter="|"
              cursorClassName="text-brand-gold-light"
              onComplete={() => setTitleTyped(true)}
            />
          ) : (
            <div
              ref={titleRef}
              className="font-brand text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.1]"
            >
              {"BROWN TREE".split("").map((char, i) => (
                <span key={i} style={{ display: "inline-block" }}>
                  {char === " " ? " " : char}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-col items-center justify-center gap-1 mx-auto w-40 sm:w-56">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-gold-light/80 to-transparent" />
            <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-brand-gold-light/40 to-transparent" />
          </div>
          <div className="space-y-1.5">
            <p className="font-sans text-sm sm:text-base md:text-lg font-semibold tracking-[0.18em] text-brand-gold-light uppercase">
              Resort &nbsp;·&nbsp; Home Stay &nbsp;·&nbsp; Hotels
            </p>
            <p className="font-hero text-lg sm:text-xl md:text-2xl text-brand-background/90 font-light tracking-wide">
              Where Every Stay Tells a Story
            </p>
          </div>
        </div>

        {/* ── LUXURY BOOKING WIDGET ── */}
        <div className="relative z-20 w-full max-w-5xl mx-auto mt-10 md:mt-16 px-2">

          {/* Booking Card */}
          <div
            ref={wrapperRef}
            className="w-full rounded-[18px] bg-white/96 backdrop-blur-md shadow-2xl transition-all duration-300"
            style={{
              border: activePanel ? "1.5px solid rgba(212,175,55,0.7)" : "1.5px solid rgba(212,175,55,0.28)",
              boxShadow: "0 8px 40px rgba(24,40,30,0.18)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-stretch divide-y md:divide-y-0 md:divide-x divide-[#E9D9B3]/60">

              {/* ── FIELD 1: Location ── */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => open(isActive("location") ? null : "location")}
                  className={`w-full h-full flex items-center gap-3 px-5 py-4 transition-all duration-200 rounded-tl-[18px] rounded-tr-[18px] md:rounded-tr-none md:rounded-bl-[18px] focus:outline-none cursor-pointer ${isActive("location") ? "field-active-ring" : "hover:bg-[#F8F5EF]/60"}`}
                  aria-expanded={isActive("location")}
                >
                  <div className="relative">
                    <MapPin size={18} style={{ color: isActive("location") ? "#D4AF37" : location ? "#D4AF37" : "#b8a090", flexShrink: 0, transition: "color 0.2s" }} />
                    {isDone("location") && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <Check size={7} color="#fff" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="text-left overflow-hidden flex-1">
                    <span className={fieldLabel} style={{ color: isActive("location") ? "#D4AF37" : "#4A2C1D" }}>Location</span>
                    <span className={fieldValue} style={{ color: location ? "#18281e" : "#9c8170" }}>
                      {location || "Select Location"}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    style={{
                      color: "#D4AF37",
                      flexShrink: 0,
                      transform: isActive("location") ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>

                {isActive("location") && (
                  <div
                    className={`${panelClass} top-[calc(100%+10px)] left-0 w-64 p-3`}
                    style={{ border: "1px solid #E9D9B3" }}
                  >
                    <p className="text-[9px] font-bold tracking-widest px-2 pb-2 mb-1 border-b border-[#E9D9B3]" style={{ color: "#9c8170" }}>
                      SELECT LOCATION
                    </p>
                    {LOCATIONS.map((loc, i) => (
                      <button
                        key={loc.label}
                        type="button"
                        onClick={() => handleSelectLocation(loc.label)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer group/item"
                        style={{
                          background: location === loc.label ? "linear-gradient(90deg,#F8F5EF,#fdf6e8)" : "transparent",
                          animationDelay: `${i * 40}ms`,
                        }}
                        onMouseEnter={e => { if (location !== loc.label) (e.currentTarget as HTMLButtonElement).style.background = "#faf7f3"; }}
                        onMouseLeave={e => { if (location !== loc.label) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                      >
                        <div className="text-left">
                          <span className="block text-xs font-bold" style={{ color: "#4A2C1D" }}>📍 {loc.label}</span>
                          <span className="block text-[10px] mt-0.5" style={{ color: "#9c8170" }}>{loc.region}</span>
                        </div>
                        {location === loc.label
                          ? <Check size={13} style={{ color: "#D4AF37" }} />
                          : <span className="text-[10px] font-medium opacity-0 group-hover/item:opacity-100 transition-opacity" style={{ color: "#D4AF37" }}>
                              {PROPERTIES[loc.label]?.length} {PROPERTIES[loc.label]?.length === 1 ? "property" : "properties"}
                            </span>
                        }
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── FIELD 2: Property ── */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => { if (!location) return; open(isActive("property") ? null : "property"); }}
                  className={`w-full h-full flex items-center gap-3 px-5 py-4 transition-all duration-200 focus:outline-none ${
                    !location ? "opacity-50 cursor-not-allowed" : isActive("property") ? "field-active-ring cursor-pointer" : "hover:bg-[#F8F5EF]/60 cursor-pointer"
                  }`}
                  aria-expanded={isActive("property")}
                  aria-disabled={!location}
                >
                  <div className="relative">
                    <Home size={18} style={{ color: isActive("property") ? "#D4AF37" : property ? "#D4AF37" : "#b8a090", flexShrink: 0, transition: "color 0.2s" }} />
                    {isDone("property") && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <Check size={7} color="#fff" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="text-left overflow-hidden flex-1">
                    <span className={fieldLabel} style={{ color: isActive("property") ? "#D4AF37" : "#4A2C1D" }}>Property</span>
                    <span className={fieldValue} style={{ color: property ? "#18281e" : "#9c8170" }}>
                      {property || (location ? "Select Property" : "Choose location first")}
                    </span>
                  </div>
                  <ChevronDown
                    size={14}
                    style={{
                      color: "#D4AF37",
                      flexShrink: 0,
                      transform: isActive("property") ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>

                {isActive("property") && availableProperties.length > 0 && (
                  <div
                    className={`${panelClass} top-[calc(100%+10px)] left-0 w-72 p-3`}
                    style={{ border: "1px solid #E9D9B3" }}
                  >
                    <p className="text-[9px] font-bold tracking-widest px-2 pb-2 mb-1 border-b border-[#E9D9B3]" style={{ color: "#9c8170" }}>
                      PROPERTIES IN {location.toUpperCase()}
                    </p>
                    {availableProperties.map((prop, i) => (
                      <button
                        key={prop}
                        type="button"
                        onClick={() => handleSelectProperty(prop)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer"
                        style={{
                          background: property === prop ? "linear-gradient(90deg,#F8F5EF,#fdf6e8)" : "transparent",
                          animationDelay: `${i * 40}ms`,
                        }}
                        onMouseEnter={e => { if (property !== prop) (e.currentTarget as HTMLButtonElement).style.background = "#faf7f3"; }}
                        onMouseLeave={e => { if (property !== prop) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                      >
                        <div className="flex items-center gap-2 text-left">
                          <span className="text-base">🏡</span>
                          <span className="text-[11px] font-medium leading-snug" style={{ color: "#18281e" }}>{prop}</span>
                        </div>
                        {property === prop && <Check size={13} style={{ color: "#D4AF37", flexShrink: 0 }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── FIELD 3: Check-in ── */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={handleCheckinClick}
                  className={`w-full h-full flex items-center gap-3 px-5 py-4 transition-all duration-200 focus:outline-none cursor-pointer ${isActive("checkin") ? "field-active-ring" : "hover:bg-[#F8F5EF]/60"}`}
                  aria-expanded={isActive("checkin")}
                >
                  <div className="relative">
                    <Calendar size={18} style={{ color: isActive("checkin") ? "#D4AF37" : checkIn ? "#D4AF37" : "#b8a090", flexShrink: 0, transition: "color 0.2s" }} />
                    {isDone("checkin") && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <Check size={7} color="#fff" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="text-left overflow-hidden flex-1">
                    <span className={fieldLabel} style={{ color: isActive("checkin") ? "#D4AF37" : "#4A2C1D" }}>Check-in</span>
                    <span className={fieldValue} style={{ color: checkIn ? "#18281e" : "#9c8170" }}>
                      {checkIn ? new Date(checkIn + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Select Date"}
                    </span>
                  </div>
                </button>

                {isActive("checkin") && (
                  <div
                    className={`${panelClass} top-[calc(100%+10px)] left-0 p-4`}
                    style={{ border: "1px solid #E9D9B3" }}
                  >
                    <p className="text-[9px] font-bold tracking-widest pb-2 mb-3 border-b border-[#E9D9B3]" style={{ color: "#9c8170" }}>
                      CHECK-IN DATE
                    </p>
                    <MiniCalendar value={checkIn} minDate={todayStr} onChange={handleCheckinChange} />
                  </div>
                )}
              </div>

              {/* ── FIELD 4: Check-out ── */}
              <div className="relative flex-1">
                <button
                  type="button"
                  onClick={() => checkoutEnabled ? open(isActive("checkout") ? null : "checkout") : handleDisabledCheckoutClick()}
                  className={`w-full h-full flex items-center gap-3 px-5 py-4 transition-all duration-200 focus:outline-none ${
                    !checkoutEnabled
                      ? "cursor-not-allowed"
                      : isActive("checkout")
                      ? "field-active-ring cursor-pointer"
                      : "hover:bg-[#F8F5EF]/60 cursor-pointer"
                  }`}
                  style={{
                    opacity: checkoutEnabled ? 1 : 0.5,
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                  aria-expanded={isActive("checkout")}
                  aria-disabled={!checkoutEnabled}
                >
                  <div className="relative">
                    <Calendar size={18} style={{ color: isActive("checkout") ? "#D4AF37" : checkOut ? "#D4AF37" : "#b8a090", flexShrink: 0, transition: "color 0.2s" }} />
                    {isDone("checkout") && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#D4AF37] flex items-center justify-center">
                        <Check size={7} color="#fff" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <div className="text-left overflow-hidden flex-1">
                    <span className={fieldLabel} style={{ color: isActive("checkout") ? "#D4AF37" : "#4A2C1D" }}>Check-out</span>
                    <span className={fieldValue} style={{ color: checkOut ? "#18281e" : "#9c8170" }}>
                      {checkOut ? new Date(checkOut + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "Select Date"}
                    </span>
                  </div>
                </button>

                {isActive("checkout") && (
                  <div
                    className={`${panelClass} top-[calc(100%+10px)] left-0 p-4`}
                    style={{ border: "1px solid #E9D9B3" }}
                  >
                    <p className="text-[9px] font-bold tracking-widest pb-2 mb-3 border-b border-[#E9D9B3]" style={{ color: "#9c8170" }}>
                      CHECK-OUT DATE
                    </p>
                    <MiniCalendar value={checkOut} minDate={checkIn || todayStr} onChange={handleCheckoutChange} hideDisabled />
                  </div>
                )}
              </div>

              {/* ── Search Button ── */}
              <div className="flex items-stretch p-2.5 md:p-3">
                <button
                  type="button"
                  onClick={handleSearchClick}
                  className={`relative overflow-hidden flex items-center justify-center gap-2.5 font-sans font-semibold text-xs tracking-[0.13em] uppercase px-6 py-4 rounded-[14px] transition-all duration-300 w-full md:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] cursor-pointer active:scale-95 ${rippling ? "btn-ripple" : ""}`}
                  style={{
                    background: "linear-gradient(135deg,#D4AF37 0%,#b8941f 60%,#96770f 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 4px 22px rgba(212,175,55,0.48)",
                    minWidth: "160px",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg,#4A2C1D 0%,#5D3A29 100%)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg,#D4AF37 0%,#b8941f 60%,#96770f 100%)"; }}
                >
                  <Search size={15} style={{ flexShrink: 0 }} />
                  <span>Search Availability</span>
                </button>
              </div>

            </div>

            {/* Step progress indicator */}
            <div className="flex items-center justify-center py-2.5 border-t border-[#E9D9B3]/40">
              {(["location", "property", "checkin", "checkout"] as ActivePanel[]).map((step, i) => {
                const done = isDone(step);
                return (
                  <div key={step} className="flex items-center">
                    <div
                      className="flex items-center justify-center rounded-full transition-all duration-400"
                      style={{
                        width: 20,
                        height: 20,
                        background: done ? "linear-gradient(135deg,#D4AF37,#b8941f)" : "transparent",
                        border: `1.5px solid ${done ? "#D4AF37" : "#c8c8c8"}`,
                        boxShadow: done ? "0 1px 6px rgba(212,175,55,0.3)" : "none",
                        transition: "all 0.35s ease",
                      }}
                    >
                      {done ? (
                        <Check size={10} color="#fff" strokeWidth={2.5} />
                      ) : (
                        <span style={{ fontSize: 9, fontWeight: 700, color: "#c8c8c8", lineHeight: 1 }}>
                          {i + 1}
                        </span>
                      )}
                    </div>
                    {i < 3 && (
                      <div
                        style={{
                          width: 28,
                          height: 1.5,
                          background: done ? "#D4AF37" : "#d9d9d9",
                          margin: "0 2px",
                          borderRadius: 2,
                          transition: "background 0.4s ease",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Validation hint */}
          {!allFilled && (
            <p className="text-center text-[10px] font-medium tracking-wide mt-3" style={{ color: "rgba(248,245,239,0.6)" }}>
              {!location ? "Start by selecting your destination" : !property ? "Now choose a property" : !checkIn ? "Pick your check-in date" : "Add your check-out date"}
            </p>
          )}
        </div>

        {/* Bottom Curve */}
        <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden pointer-events-none select-none">
          <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" className="relative block w-full h-[40px] sm:h-[80px] md:h-[120px]">
            <path d="M0,0 Q720,120 1440,0 L1440,120 L0,120 Z" fill="#fcf9f8" />
          </svg>
        </div>
      </section>
    </>
  );
}
