/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Facebook, Instagram, Youtube } from "lucide-react";
import btLogo from "../assets/images/brown_tree_transparents.png";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer id="main-footer" className="bg-brand-primary text-brand-background relative z-20">
      {/* Swoooping Organic Curved Header - transitioning sand background into green */}
      <div className="relative overflow-hidden line-height-0 pointer-events-none select-none -mt-1 bg-brand-background">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
          className="relative block w-full h-[40px] sm:h-[80px] md:h-[120px]"
        >
          <path d="M0,120 Q720,0 1440,120 Z" fill="#18281e" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand & Description Block */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center">
              <img
                src={btLogo}
                alt="Brown Tree Resorts brand logo – curated hill station accommodations across the Nilgiri and Palani Hills"
                loading="lazy"
                decoding="async"
                className="h-14 md:h-18 w-auto object-contain"
              />
            </div>
            <p className="font-sans text-xs sm:text-sm text-brand-background/70 font-light leading-relaxed max-w-sm">
              Curating extraordinary sanctuaries for the modern traveler. Experience luxury redefined.
            </p>
            {/* Social media icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="https://www.facebook.com/browntreeofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-gold-light/35 flex items-center justify-center text-brand-gold-light hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                title="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://www.instagram.com/browntreeofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-gold-light/35 flex items-center justify-center text-brand-gold-light hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.youtube.com/@BrownTreeResortss"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-brand-gold-light/35 flex items-center justify-center text-brand-gold-light hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                title="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-6">
            {/* Column 1: Explore */}
            <div className="space-y-5">
              <h4 className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold-light uppercase">
                Explore
              </h4>
              <ul className="space-y-3 text-xs font-medium text-brand-background/75">
                <li>
                  <button onClick={() => handleLinkClick("properties")} className="hover:text-brand-gold-light transition duration-300 cursor-pointer text-left">
                    Properties
                  </button>
                </li>
                <li>
                  <button onClick={() => handleLinkClick("destinations")} className="hover:text-brand-gold-light transition duration-300 cursor-pointer text-left">
                    Destinations
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-gold-light transition duration-300">
                    Offers
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div className="space-y-5 sm:border-l sm:border-brand-background/10 sm:pl-6">
              <h4 className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold-light uppercase">
                Company
              </h4>
              <ul className="space-y-3 text-xs font-medium text-brand-background/75">
                <li>
                  <a href="#" className="hover:text-brand-gold-light transition duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <button onClick={() => handleLinkClick("contact")} className="hover:text-brand-gold-light transition duration-300 cursor-pointer text-left">
                    Contact
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-gold-light transition duration-300">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="space-y-5 col-span-2 sm:col-span-1 sm:border-l sm:border-brand-background/10 sm:pl-6">
              <h4 className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold-light uppercase">
                Legal
              </h4>
              <ul className="space-y-3 text-xs font-medium text-brand-background/75">
                <li>
                  <a href="#" className="hover:text-brand-gold-light transition duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-brand-gold-light transition duration-300">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-background/10 pt-8 flex items-center justify-center text-xs font-medium text-brand-background/55">
          <p>
            © {currentYear} Luxe Sanctuary. All rights reserved. · developed by{" "}
            <a
              href="https://www.datazync.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold-light hover:text-white transition-colors duration-200 underline underline-offset-2"
            >
              datazync
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
