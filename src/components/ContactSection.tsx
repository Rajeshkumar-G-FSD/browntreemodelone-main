/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Mail, Phone, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";
import { WHATSAPP_NUMBER } from "../lib/whatsapp";

// nsnLength = exact National Significant Number length for that country's
// numbering plan, when known. Omit it for countries with variable-length
// numbers — those are only checked against the overall E.164 15-digit cap.
const COUNTRY_CODES: { code: string; label: string; flag: string; nsnLength?: number }[] = [
  { code: "+91", label: "India", flag: "🇮🇳", nsnLength: 10 },
  { code: "+1", label: "USA/Canada", flag: "🇺🇸", nsnLength: 10 },
  { code: "+44", label: "UK", flag: "🇬🇧" },
  { code: "+971", label: "UAE", flag: "🇦🇪" },
  { code: "+65", label: "Singapore", flag: "🇸🇬" },
  { code: "+61", label: "Australia", flag: "🇦🇺", nsnLength: 9 },
  { code: "+49", label: "Germany", flag: "🇩🇪" },
  { code: "+33", label: "France", flag: "🇫🇷" },
  { code: "+81", label: "Japan", flag: "🇯🇵" },
  { code: "+86", label: "China", flag: "🇨🇳", nsnLength: 11 },
  { code: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", label: "Qatar", flag: "🇶🇦" },
  { code: "+60", label: "Malaysia", flag: "🇲🇾" },
  { code: "+94", label: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", label: "Nepal", flag: "🇳🇵" },
];

const E164_MAX_DIGITS = 15;

function findCountryPlan(countryCode: string) {
  return COUNTRY_CODES.find((c) => c.code === countryCode);
}

// Max digits allowed in the national number field for the given country —
// its known exact length, or whatever room is left under the E.164 cap.
function maxNsnLength(countryCode: string): number {
  const plan = findCountryPlan(countryCode);
  if (plan?.nsnLength) return plan.nsnLength;
  const countryDigits = countryCode.replace(/\D/g, "").length;
  return Math.max(1, E164_MAX_DIGITS - countryDigits);
}

interface PhoneValidationResult {
  valid: boolean;
  normalized?: string;
  error?: string;
}

// Validates a national number against E.164 + the selected country's
// numbering plan (rules: E.164 format, 1-15 total digits, per-country
// numbering plan when known, never reject solely for not being 10 digits).
function validatePhoneNumber(countryCode: string, rawNumber: string): PhoneValidationResult {
  const cleaned = rawNumber.replace(/[\s\-()]/g, "");

  if (!cleaned) {
    return { valid: false, error: "Please enter a mobile number." };
  }
  if (!/^\d+$/.test(cleaned)) {
    return { valid: false, error: "Phone number must contain only digits." };
  }

  const countryDigits = countryCode.replace(/\D/g, "");
  const totalDigits = countryDigits.length + cleaned.length;

  if (totalDigits > E164_MAX_DIGITS || totalDigits < 1) {
    return {
      valid: false,
      error: `Phone number must be 1–${E164_MAX_DIGITS} digits total (including country code) per the E.164 standard — you entered ${totalDigits}.`,
    };
  }

  const plan = findCountryPlan(countryCode);
  if (plan?.nsnLength && cleaned.length !== plan.nsnLength) {
    return {
      valid: false,
      error: `${plan.label} (${plan.code}) numbers must be exactly ${plan.nsnLength} digits — you entered ${cleaned.length}.`,
    };
  }

  return { valid: true, normalized: `${countryCode}${cleaned}` };
}

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const messageRef = useRef<HTMLTextAreaElement>(null);

  const selectedPlan = findCountryPlan(countryCode);
  const phonePlaceholder = selectedPlan?.nsnLength
    ? `${selectedPlan.nsnLength}-digit mobile number`
    : "Mobile number";

  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setCountryCode(newCode);
    setPhone((prev) => prev.slice(0, maxNsnLength(newCode)));
    setPhoneError(null);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, maxNsnLength(countryCode));
    setPhone(digits);
    setPhoneError(null);
    // Only auto-advance when this country's exact length is known and reached —
    // never assume every country uses a 10-digit national number.
    if (selectedPlan?.nsnLength && digits.length === selectedPlan.nsnLength) {
      messageRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    let normalizedPhone = "Not provided";
    if (phone.trim()) {
      const result = validatePhoneNumber(countryCode, phone);
      if (!result.valid) {
        setPhoneError(result.error ?? "Invalid phone number.");
        return;
      }
      normalizedPhone = result.normalized!;
    }
    setPhoneError(null);

    const waMessage = `New Inquiry — Brown Tree Resorts\n\n*Full Name:* ${name}\n*Email:* ${email}\n*Telephone:* ${normalizedPhone}\n\n*Message:*\n${message}`;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

    // Open synchronously (same user gesture) so browsers don't block the popup
    window.open(waUrl, "_blank", "noopener,noreferrer");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      // Reset
      setName("");
      setEmail("");
      setCountryCode("+91");
      setPhone("");
      setMessage("");
    }, 900);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 bg-brand-background border-t border-brand-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Brand Statement & Details */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] text-brand-secondary uppercase">
              <Mail size={14} />
              <span>Get In Touch</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-brand-primary leading-[1.2]">
              Plan Your Hill Station Getaway
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
              Whether you're choosing between our properties in Ooty, Kothagiri, or Kodaikanal, planning a family trip, or have a special request for your stay, our team is here to help you plan every detail.
            </p>
          </div>

          <div className="space-y-6 pt-4 border-t border-brand-primary/10">
            {/* Contact details */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-secondary border border-brand-primary/5 shadow-md">
                <Phone size={16} />
              </div>
              <div>
                <span className="block text-[8px] font-bold tracking-widest text-brand-primary/40 uppercase">
                  DIRECT LINE
                </span>
                <a href="tel:+919363036766" className="block text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">+91 93630 36766</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-secondary border border-brand-primary/5 shadow-md">
                <Mail size={16} />
              </div>
              <div>
                <span className="block text-[8px] font-bold tracking-widest text-brand-primary/40 uppercase">
                  GENERAL INQUIRY EMAIL
                </span>
                <a href="mailto:browntreeresort@gmail.com" className="text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">browntreeresort@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-secondary border border-brand-primary/5 shadow-md">
                <Clock size={16} />
              </div>
              <div>
                <span className="block text-[8px] font-bold tracking-widest text-brand-primary/40 uppercase">
                  AVAILABILITY
                </span>
                <span className="text-sm font-semibold text-brand-primary">24 × 7</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form Panel */}
        <div
          id="contact-form-panel"
          className="lg:col-span-7 bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-brand-primary/5 relative"
          style={{
            boxShadow: "0 45px 90px -25px rgba(24, 40, 30, 0.04)"
          }}
        >
          {isSubmitted ? (
            <div className="text-center py-16 space-y-6 animate-scale-up">
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                  <CheckCircle2 size={36} />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-2xl font-semibold text-brand-primary">Inquiry Sent via WhatsApp</h3>
                <p className="font-sans text-sm text-brand-primary/70 max-w-md mx-auto font-light leading-relaxed">
                  Thank you for contacting Brown Tree Resorts. Your inquiry details have been shared with our team on WhatsApp, and we'll get back to you shortly to help plan your stay.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-center space-x-2 text-xs font-semibold text-brand-secondary">
                <Sparkles size={14} className="animate-pulse" />
                <span>WE LOOK FORWARD TO WELCOMING YOU</span>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="font-sans text-[10px] font-bold tracking-widest bg-brand-primary hover:bg-brand-secondary text-brand-gold-light py-3 px-6 rounded-full mt-4 cursor-pointer"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-brand-secondary tracking-widest uppercase">
                  Send Us a Message
                </p>
                <p className="text-xs text-brand-primary/55 font-light">
                  Fill in your details below. Fields marked with an asterisk are required.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name Input */}
                <div className="flex flex-col relative group">
                  <label className="text-[10px] font-bold text-brand-primary/60 tracking-wider uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="py-3 border-b border-brand-primary/15 focus:border-brand-secondary focus:outline-none text-sm text-brand-primary font-medium transition-colors bg-transparent placeholder-brand-primary/25"
                  />
                </div>

                {/* Email Address Input */}
                <div className="flex flex-col relative group">
                  <label className="text-[10px] font-bold text-brand-primary/60 tracking-wider uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. priya.sharma@gmail.com"
                    className="py-3 border-b border-brand-primary/15 focus:border-brand-secondary focus:outline-none text-sm text-brand-primary font-medium transition-colors bg-transparent placeholder-brand-primary/25"
                  />
                </div>
              </div>

              {/* Telephone Input */}
              <div className="flex flex-col relative group">
                <label className="text-[10px] font-bold text-brand-primary/60 tracking-wider uppercase mb-1">
                  Telephone (Optional)
                </label>
                <div className="flex items-stretch gap-3">
                  <select
                    value={countryCode}
                    onChange={handleCountryChange}
                    aria-label="Country code"
                    className="py-3 border-b border-brand-primary/15 focus:border-brand-secondary focus:outline-none text-sm text-brand-primary font-medium transition-colors bg-transparent cursor-pointer shrink-0"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code} {c.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel-national"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={maxNsnLength(countryCode)}
                    placeholder={phonePlaceholder}
                    aria-invalid={!!phoneError}
                    className={`flex-1 py-3 border-b focus:outline-none text-sm text-brand-primary font-medium transition-colors bg-transparent placeholder-brand-primary/25 ${
                      phoneError ? "border-red-400 focus:border-red-500" : "border-brand-primary/15 focus:border-brand-secondary"
                    }`}
                  />
                </div>
                {phoneError && (
                  <p className="text-[11px] text-red-600 font-medium mt-1.5">{phoneError}</p>
                )}
              </div>

              {/* Special Request Text Area */}
              <div className="flex flex-col relative group">
                <label className="text-[10px] font-bold text-brand-primary/60 tracking-wider uppercase mb-1">
                  Your Message *
                </label>
                <textarea
                  ref={messageRef}
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us your preferred property, travel dates, number of guests, or any special requests..."
                  className="py-3 border-b border-brand-primary/15 focus:border-brand-secondary focus:outline-none text-sm text-brand-primary font-light transition-colors bg-transparent resize-none placeholder-brand-primary/25"
                />
              </div>

              {/* Submit CTA */}
              <button
                id="submit-inquiry-btn"
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-brand-secondary disabled:bg-brand-primary/50 text-brand-gold-light hover:text-white font-sans text-xs font-semibold tracking-widest py-4 rounded-full flex items-center justify-center space-x-3 shadow-lg shadow-brand-primary/15 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {loading ? (
                  <span>SENDING YOUR MESSAGE...</span>
                ) : (
                  <>
                    <span>SEND INQUIRY</span>
                    <Send size={14} className="shrink-0" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
