/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Globe, Camera, Heart } from "lucide-react";

const btLogo = "https://i.postimg.cc/7ZFbxYFr/browntree-logo.png";

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
                alt="BT Logo" 
                className="h-14 md:h-18 w-auto object-contain" 
              />
            </div>
            <p className="font-sans text-xs sm:text-sm text-brand-background/70 font-light leading-relaxed max-w-sm">
              Curating extraordinary sanctuaries for the modern traveler. Experience luxury redefined.
            </p>
            {/* Social media icons with gold circular frames */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-brand-gold-light/35 flex items-center justify-center text-brand-gold-light hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                title="Global Website"
              >
                <Globe size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-brand-gold-light/35 flex items-center justify-center text-brand-gold-light hover:bg-brand-secondary hover:text-white hover:border-brand-secondary transition-all duration-300"
                title="Instagram Profile"
              >
                <Camera size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Explore */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold-light uppercase">
                Explore
              </h4>
              <ul className="space-y-2 text-xs font-medium text-brand-background/75">
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
                  <button onClick={() => handleLinkClick("experiences")} className="hover:text-brand-gold-light transition duration-300 cursor-pointer text-left">
                    Experiences
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
            <div className="space-y-4">
              <h4 className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold-light uppercase">
                Company
              </h4>
              <ul className="space-y-2 text-xs font-medium text-brand-background/75">
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
                <li>
                  <a href="#" className="hover:text-brand-gold-light transition duration-300">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h4 className="font-sans text-xs font-bold tracking-[0.25em] text-brand-gold-light uppercase">
                Legal
              </h4>
              <ul className="space-y-2 text-xs font-medium text-brand-background/75">
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
                <li>
                  <a href="#" className="hover:text-brand-gold-light transition duration-300">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-background/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-brand-background/55">
          <p>© {currentYear} Luxe Sanctuary. All rights reserved.</p>
          <div className="flex items-center space-x-1.5">
            <span>Designed with</span>
            <Heart size={12} className="text-brand-gold-light fill-brand-gold-light animate-pulse" />
            <span>for the discerning traveler.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
