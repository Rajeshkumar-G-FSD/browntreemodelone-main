/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenAboutUs: () => void;
  activeSection: string;
}

export default function Header({ onNavigate, onOpenBooking, onOpenAboutUs, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "HOME", id: "home" },
    { label: "ABOUT", id: "about" },
    { label: "PROPERTIES", id: "properties" },
    { label: "DESTINATIONS", id: "destinations" },
    { label: "REVIEWS", id: "reviews" }
  ];

  const handleItemClick = (id: string) => {
    if (id === "about") {
      onOpenAboutUs();
    } else {
      onNavigate(id);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "py-3 px-4 md:px-12 bg-white/95 backdrop-blur-xl shadow-md shadow-brand-primary/8 border-b border-brand-primary/8"
          : "py-5 px-4 md:px-16 bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Left spacer — balances the right-side controls so nav stays centered */}
        <div className="flex-1 flex justify-start" />

        {/* Desktop Navigation — centered */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`font-sans text-xs font-semibold tracking-widest transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? activeSection === item.id
                    ? "text-brand-secondary border-b-2 border-brand-secondary pb-1"
                    : "text-brand-primary/80 hover:text-brand-primary"
                  : activeSection === item.id
                    ? "text-brand-gold-light border-b-2 border-brand-gold-light pb-1"
                    : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            id="nav-contact-button"
            onClick={() => handleItemClick("contact")}
            className={`font-sans text-xs font-semibold tracking-widest py-2 px-5 rounded-full border transition-all duration-300 cursor-pointer ${
              isScrolled
                ? activeSection === "contact"
                  ? "border-brand-secondary text-brand-secondary bg-brand-secondary/8"
                  : "border-brand-primary/30 text-brand-primary hover:border-brand-secondary hover:text-brand-secondary"
                : activeSection === "contact"
                  ? "border-white bg-white text-brand-primary"
                  : "border-white/40 text-white/90 hover:bg-white hover:border-white hover:text-brand-primary"
            }`}
          >
            CONTACT
          </button>
        </nav>

        {/* Right side — balances logo width; mobile menu button lives here */}
        <div className="flex-1 flex justify-end">
          <div className="flex lg:hidden items-center space-x-3">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`focus:outline-none p-1 cursor-pointer transition-colors duration-300 ${
                isScrolled ? "text-brand-primary" : "text-white"
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Glass Drawer Overlay */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden fixed inset-0 top-[60px] z-40 bg-brand-background/95 backdrop-blur-2xl border-t border-brand-primary/10 animate-fade-in-up"
        >
          <div className="flex flex-col space-y-6 px-6 py-12 h-full">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`text-left font-sans text-lg font-medium tracking-widest py-2 border-b border-brand-primary/5 transition-all ${
                  activeSection === item.id ? "text-brand-secondary font-semibold" : "text-brand-primary/80"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="mobile-nav-item-contact"
              onClick={() => handleItemClick("contact")}
              className={`text-left font-sans text-lg font-medium tracking-widest py-2 border-b border-brand-primary/5 transition-all ${
                activeSection === "contact" ? "text-brand-secondary font-semibold" : "text-brand-primary/80"
              }`}
            >
              CONTACT
            </button>
            <div className="flex items-center justify-center space-x-2 text-xs text-brand-primary/45 pt-12">
              <Sparkles size={14} className="text-brand-gold-light" />
              <span>An exquisite digital sanctuary experience.</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
