/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { Mail, Phone, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    // Simulate premium API call
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      // Reset
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-4 bg-brand-background border-t border-brand-primary/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Brand Statement & Details */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] text-brand-secondary uppercase">
              <Mail size={14} />
              <span>BESPOKE CONCIERGE</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-brand-primary leading-[1.2]">
              Inquire About Our Sanctuaries
            </h2>
            <p className="font-sans text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
              Whether arranging a private celebration, securing exclusive heli-skiing charters, or booking customized overwater suites, our private concierge is at your service.
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
                <span className="text-sm font-semibold text-brand-primary">+1 (800) LUXE-SANC</span>
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
                <span className="text-sm font-semibold text-brand-primary">concierge@luxesanctuary.com</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-secondary border border-brand-primary/5 shadow-md">
                <Clock size={16} />
              </div>
              <div>
                <span className="block text-[8px] font-bold tracking-widest text-brand-primary/40 uppercase">
                  RESPONSE TIME
                </span>
                <span className="text-sm font-semibold text-brand-primary">Typically within 2 Hours</span>
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
                <h3 className="font-display text-2xl font-semibold text-brand-primary">Inquiry Safely Received</h3>
                <p className="font-sans text-sm text-brand-primary/70 max-w-md mx-auto font-light leading-relaxed">
                  Thank you for contacting Luxe Sanctuary. Our bespoke concierge team has received your details and will reach out to you within the next two hours with a customized proposal.
                </p>
              </div>
              <div className="pt-4 flex items-center justify-center space-x-2 text-xs font-semibold text-brand-secondary">
                <Sparkles size={14} className="animate-pulse" />
                <span>EXPERIENCE EXTRAORDINARY WELLNESS</span>
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
                  digital inquiry dossier
                </p>
                <p className="text-xs text-brand-primary/55 font-light">
                  Please furnish your details below. Fields marked with an asterisk are required.
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
                    placeholder="e.g. Lady Eleanor Sterling"
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
                    placeholder="e.g. eleanor@sterlingestate.com"
                    className="py-3 border-b border-brand-primary/15 focus:border-brand-secondary focus:outline-none text-sm text-brand-primary font-medium transition-colors bg-transparent placeholder-brand-primary/25"
                  />
                </div>
              </div>

              {/* Telephone Input */}
              <div className="flex flex-col relative group">
                <label className="text-[10px] font-bold text-brand-primary/60 tracking-wider uppercase mb-1">
                  Telephone (Optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +1 (555) 019-2834"
                  className="py-3 border-b border-brand-primary/15 focus:border-brand-secondary focus:outline-none text-sm text-brand-primary font-medium transition-colors bg-transparent placeholder-brand-primary/25"
                />
              </div>

              {/* Special Request Text Area */}
              <div className="flex flex-col relative group">
                <label className="text-[10px] font-bold text-brand-primary/60 tracking-wider uppercase mb-1">
                  Special Inquiry & Requests *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your desired stay, suite preferences, yacht charters, or sound therapy requirements..."
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
                  <span>TRANSMITTING INQUIRY DOSSIER...</span>
                ) : (
                  <>
                    <span>TRANSMIT CONCIERGE INQUIRY</span>
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
