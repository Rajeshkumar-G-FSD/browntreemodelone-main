/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CheckCircle2, Phone, MessageCircle, ChevronRight, ArrowLeft } from "lucide-react";
import { Property } from "../types";
import { buildPropertyInquiryMessage, buildWhatsAppUrl } from "../lib/whatsapp";

interface ThankYouPageProps {
  property: Property;
  onBack: () => void;
  onViewProperty: () => void;
}

export default function ThankYouPage({ property, onBack, onViewProperty }: ThankYouPageProps) {
  const whatsappUrl = buildWhatsAppUrl(buildPropertyInquiryMessage(property));

  return (
    <div id="thank-you-page" className="min-h-screen flex items-center justify-center px-4 py-32 bg-brand-background">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
            <CheckCircle2 size={44} />
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-bold tracking-[0.25em] text-brand-secondary uppercase block">
            Inquiry Received
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-medium text-brand-primary leading-[1.2]">
            Thank You for Your Interest in {property.name}
          </h1>
          <p className="font-sans text-sm md:text-base text-brand-primary/70 font-light leading-relaxed max-w-md mx-auto">
            We've received your inquiry and sent it to our team on WhatsApp. We'll get back to you shortly
            with availability and pricing for your stay at {property.location}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-primary hover:bg-brand-secondary text-brand-gold-light hover:text-white font-sans text-xs font-semibold tracking-widest px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
          >
            <MessageCircle size={15} />
            <span>MESSAGE US ON WHATSAPP</span>
          </a>
          <a
            href="tel:+919095487848"
            className="flex items-center gap-2 bg-white hover:bg-brand-primary/5 text-brand-primary border border-brand-primary/15 font-sans text-xs font-semibold tracking-widest px-8 py-4 rounded-full transition-all duration-300 cursor-pointer"
          >
            <Phone size={15} />
            <span>CALL US</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 pt-6 text-xs font-semibold">
          <button
            onClick={onViewProperty}
            className="flex items-center gap-1 text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer"
          >
            <span>Back to {property.name}</span>
            <ChevronRight size={14} />
          </button>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-brand-primary/60 hover:text-brand-secondary transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Explore All Properties</span>
          </button>
        </div>
      </div>
    </div>
  );
}
