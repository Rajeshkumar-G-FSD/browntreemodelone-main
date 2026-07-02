/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { X, Calendar, User, CreditCard, Sparkles, AlertCircle, Share2 } from "lucide-react";
import { Property, Suite } from "../types";

// Single source of truth for hotel booking base URLs
const HOTEL_BOOKING_URLS: Record<string, string> = {
  "azure-orchid":  "https://bookings.asiatech.in/?page=11117&type=googlehotelads&bookingSource=GoogleCPC",
  "heritage-pine": "https://bookings.asiatech.in/?page=4160&type=googlehotelads&bookingSource=GoogleCPC",
  "tea-leaf-stays":"https://bookings.asiatech.in/?page=5303&type=googlehotelads&bookingSource=GoogleCPC",
  "solar-residency":"https://bookings.asiatech.in/?page=10425&type=googlehotelads&bookingSource=GoogleCPC",
  "misty-peaks":   "https://bookings.asiatech.in/?page=9542&type=googlehotelads&bookingSource=GoogleCPC",
  "mirage-ridge":  "https://bookings.asiatech.in/?page=6541&type=googlehotelads&bookingSource=GoogleCPC",
};

function generateBookingUrl(propertyId: string, checkIn: string, checkOut: string): string | null {
  const base = HOTEL_BOOKING_URLS[propertyId];
  if (!base || !checkIn || !checkOut) return null;
  return `${base}&checkin=${checkIn}&checkout=${checkOut}`;
}

interface BookingDrawerProps {
  properties: Property[];
  selectedProperty: Property | null;
  selectedSuite: Suite | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingDrawer({
  properties,
  selectedProperty,
  selectedSuite,
  isOpen,
  onClose,
}: BookingDrawerProps) {
  const [property, setProperty] = useState<Property | null>(null);
  const [suite, setSuite] = useState<Suite | null>(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);
  const [addYacht, setAddYacht] = useState(false);
  const [addSoma, setAddSoma] = useState(false);
  const [dateError, setDateError] = useState("");
  const [nights, setNights] = useState(1);

  // Sync state with selected props
  useEffect(() => {
    if (selectedProperty) {
      setProperty(selectedProperty);
      if (selectedSuite) {
        setSuite(selectedSuite);
      } else if (selectedProperty.suites.length > 0) {
        setSuite(selectedProperty.suites[0]);
      }
    } else if (properties.length > 0) {
      setProperty(properties[0]);
      setSuite(properties[0].suites[0] || null);
    }
  }, [selectedProperty, selectedSuite, properties, isOpen]);

  // Update suite selections when selected property changes
  useEffect(() => {
    if (property && (!suite || !property.suites.some((s) => s.id === suite.id))) {
      setSuite(property.suites[0] || null);
    }
  }, [property]);

  // Calculate nights
  useEffect(() => {
    if (checkIn && checkOut) {
      const d1 = new Date(checkIn);
      const d2 = new Date(checkOut);
      const diffTime = Math.abs(d2.getTime() - d1.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays || 1);
    } else {
      setNights(1);
    }
  }, [checkIn, checkOut]);

  // Clear date error whenever dates change
  useEffect(() => {
    if (checkIn && checkOut) setDateError("");
  }, [checkIn, checkOut]);

  if (!isOpen) return null;

  // Pricing calculations
  const pricePerNight = suite ? suite.pricePerNight : 0;
  const staySubtotal = pricePerNight * nights;
  const yachtCost = addYacht ? 18000 : 0;
  const somaCost = addSoma ? 3500 : 0;
  const totalCost = staySubtotal + yachtCost + somaCost;

  const validateDates = (): boolean => {
    if (!checkIn || !checkOut) {
      setDateError("Please select both check-in and check-out dates before proceeding.");
      return false;
    }
    setDateError("");
    return true;
  };

  const handleConfirmReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!validateDates() || !property) return;

    const url = generateBookingUrl(property.id, checkIn, checkOut);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleWhatsAppShare = () => {
    if (!validateDates() || !property) return;

    const url = generateBookingUrl(property.id, checkIn, checkOut);
    if (url) {
      const text = encodeURIComponent(`Book your stay here: ${url}`);
      window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      id="booking-drawer-overlay"
      className="fixed inset-0 z-50 bg-brand-primary/60 backdrop-blur-md flex justify-end"
    >
      {/* Click outside backdrop to close */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div
        id="booking-drawer-panel"
        className="relative z-10 w-full max-w-lg bg-brand-background h-screen overflow-y-auto shadow-2xl border-l border-brand-primary/10 flex flex-col animate-scale-up"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-brand-primary/5 flex items-center justify-between bg-white/70 backdrop-blur-md">
          <div className="space-y-1">
            <span className="text-[10px] font-bold tracking-[0.25em] text-brand-secondary uppercase block">
              Reservation Engine
            </span>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-brand-primary">
              Secure Your Sanctuary
            </h2>
          </div>
          <button
            id="close-booking-drawer"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-brand-primary/10 bg-white hover:border-brand-secondary hover:text-brand-secondary flex items-center justify-center text-brand-primary transition-all duration-300 cursor-pointer"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Entry Screen */}
        <form onSubmit={handleConfirmReservation} className="flex-1 p-6 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Selector: Property */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-brand-primary/50 tracking-wider uppercase mb-1">
                Select Sanctuary *
              </label>
              <select
                required
                value={property?.id || ""}
                onChange={(e) => {
                  const found = properties.find((p) => p.id === e.target.value);
                  if (found) setProperty(found);
                }}
                className="py-3 px-4 rounded-xl border border-brand-primary/10 bg-white text-sm text-brand-primary font-medium focus:outline-none focus:border-brand-secondary"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.location}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector: Suite */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-brand-primary/50 tracking-wider uppercase mb-1">
                Select Suite *
              </label>
              <select
                required
                value={suite?.id || ""}
                onChange={(e) => {
                  if (property) {
                    const found = property.suites.find((s) => s.id === e.target.value);
                    if (found) setSuite(found);
                  }
                }}
                className="py-3 px-4 rounded-xl border border-brand-primary/10 bg-white text-sm text-brand-primary font-medium focus:outline-none focus:border-brand-secondary"
              >
                {property?.suites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} — ₹{s.pricePerNight}/nt
                  </option>
                ))}
              </select>
            </div>

            {/* Dates input block */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-primary/50 tracking-wider uppercase mb-1">
                    Check-In *
                  </label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary" />
                    <input
                      type="date"
                      required
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className={`py-3 pl-10 pr-3 rounded-xl border bg-white text-xs font-semibold text-brand-primary w-full focus:outline-none focus:border-brand-secondary ${
                        dateError ? "border-red-400" : "border-brand-primary/10"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-[10px] font-bold text-brand-primary/50 tracking-wider uppercase mb-1">
                    Check-Out *
                  </label>
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-secondary" />
                    <input
                      type="date"
                      required
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className={`py-3 pl-10 pr-3 rounded-xl border bg-white text-xs font-semibold text-brand-primary w-full focus:outline-none focus:border-brand-secondary ${
                        dateError ? "border-red-400" : "border-brand-primary/10"
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Date validation error */}
              {dateError && (
                <div className="flex items-center space-x-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle size={14} className="text-red-500 shrink-0" />
                  <span className="text-xs text-red-600 font-medium">{dateError}</span>
                </div>
              )}
            </div>

            {/* Guests Selector */}
            <div className="flex flex-col">
              <label className="text-[10px] font-bold text-brand-primary/50 tracking-wider uppercase mb-1">
                Number of Guests *
              </label>
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-brand-primary/10 bg-white">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-primary">
                  <User size={14} className="text-brand-secondary" />
                  <span>{guests} {guests === 1 ? "Guest" : "Guests"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-brand-primary/5 bg-brand-background flex items-center justify-center font-bold text-sm text-brand-primary focus:outline-none"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={() => setGuests(Math.min(suite?.maxGuests || 4, guests + 1))}
                    className="w-8 h-8 rounded-full border border-brand-primary/5 bg-brand-background flex items-center justify-center font-bold text-sm text-brand-primary focus:outline-none"
                  >
                    +
                  </button>
                </div>
              </div>
              {suite && guests > suite.maxGuests && (
                <div className="flex items-center space-x-1 mt-1 text-brand-secondary text-[10px] font-semibold">
                  <AlertCircle size={10} />
                  <span>This suite capacity limit is {suite.maxGuests} guests.</span>
                </div>
              )}
            </div>

            {/* Bespoke upgrades checkboxes */}
            <div className="space-y-3 pt-4 border-t border-brand-primary/5">
              <h4 className="font-sans text-[10px] font-bold text-brand-primary/50 tracking-widest uppercase mb-1">
                CURATED UPGRADES
              </h4>

              <label className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-brand-primary/5 hover:border-brand-secondary/35 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={addYacht}
                  onChange={(e) => setAddYacht(e.target.checked)}
                  className="mt-1 accent-brand-primary cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-bold text-brand-primary">Horizon Private Yacht Charter</span>
                  <span className="block text-[10px] text-brand-primary/55 font-light">Full-day luxury oceanic cruise under professional navigation (+₹18,000)</span>
                </div>
              </label>

              <label className="flex items-start space-x-3 p-3 bg-white rounded-xl border border-brand-primary/5 hover:border-brand-secondary/35 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={addSoma}
                  onChange={(e) => setAddSoma(e.target.checked)}
                  className="mt-1 accent-brand-primary cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-bold text-brand-primary">Soma Ayurvedic Healing Journey</span>
                  <span className="block text-[10px] text-brand-primary/55 font-light">Traditional diagnostics, sound bowl vibrational, four-hand herbal massage (+₹3,500)</span>
                </div>
              </label>
            </div>

            {/* Pricing breakdown summary */}
            <div className="p-5 rounded-2xl bg-brand-primary/5 space-y-3">
              <h4 className="font-sans text-[9px] font-bold tracking-widest text-brand-primary/45 uppercase">
                Invoice Estimation
              </h4>

              <div className="space-y-1.5 text-xs text-brand-primary">
                <div className="flex justify-between">
                  <span className="font-light text-brand-primary/65">Stay Subtotal ({nights} nights):</span>
                  <span className="font-semibold">₹{staySubtotal}</span>
                </div>
                {addYacht && (
                  <div className="flex justify-between text-brand-secondary">
                    <span>Bespoke Yacht Package:</span>
                    <span className="font-semibold">+₹18,000</span>
                  </div>
                )}
                {addSoma && (
                  <div className="flex justify-between text-brand-secondary">
                    <span>Soma Ayurvedic Healing:</span>
                    <span className="font-semibold">+₹3,500</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center border-t border-brand-primary/10 pt-3 mt-1 font-bold text-brand-primary">
                <div className="flex items-center space-x-1.5">
                  <Sparkles size={12} className="text-brand-secondary" />
                  <span className="text-[10px] tracking-wider uppercase mt-0.5">ESTIMATED TOTAL</span>
                </div>
                <span className="font-display text-lg md:text-xl">₹{totalCost}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-3">
            <button
              id="submit-booking-cta"
              type="submit"
              disabled={suite ? guests > suite.maxGuests : false}
              className="w-full bg-brand-primary hover:bg-brand-secondary disabled:bg-brand-primary/50 text-brand-gold-light hover:text-white font-sans text-xs font-semibold tracking-widest py-4 rounded-full flex items-center justify-center space-x-2 shadow-lg cursor-pointer uppercase transition-all duration-300"
            >
              <CreditCard size={14} />
              <span>Confirm Booking</span>
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}
