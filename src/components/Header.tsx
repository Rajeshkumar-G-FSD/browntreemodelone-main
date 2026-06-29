/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

const btLogo = "https://i.postimg.cc/7ZFbxYFr/browntree-logo.png";

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  activeSection: string;
}

export default function Header({ onNavigate, onOpenBooking, activeSection }: HeaderProps) {
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
    { label: "PROPERTIES", id: "properties" },
    { label: "DESTINATIONS", id: "destinations" },
    { label: "EXPERIENCES", id: "experiences" },
    { label: "REVIEWS", id: "reviews" }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "py-3 px-4 md:px-12 bg-white/80 backdrop-blur-xl shadow-lg shadow-brand-primary/5 border-b border-brand-primary/5"
          : "py-6 px-4 md:px-16 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="logo-button"
          onClick={() => handleItemClick("home")}
          className="flex items-center focus:outline-none group cursor-pointer"
        >
          <img 
            src={btLogo} 
            alt="BT Logo" 
            className="h-12 md:h-16 w-auto object-contain transition-all duration-300 group-hover:scale-105" 
          />
        </button>

        {/* Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`font-sans text-xs font-semibold tracking-widest transition-all duration-300 cursor-pointer ${
                activeSection === item.id
                  ? "text-brand-secondary border-b-2 border-brand-secondary pb-1"
                  : "text-brand-primary/70 hover:text-brand-primary"
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <button
            id="nav-contact-button"
            onClick={() => handleItemClick("contact")}
            className={`font-sans text-xs font-semibold tracking-widest py-2 px-5 rounded-full border transition-all duration-300 cursor-pointer ${
              activeSection === "contact"
                ? "border-brand-secondary text-brand-secondary bg-brand-secondary/5"
                : "border-brand-primary/30 text-brand-primary hover:border-brand-secondary hover:text-brand-secondary"
            }`}
          >
            CONTACT
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            id="book-now-header-cta"
            onClick={onOpenBooking}
            className="bg-brand-primary text-brand-gold-light font-sans text-xs font-semibold tracking-widest py-3 px-6 rounded-full hover:bg-brand-secondary hover:text-white transition-all duration-300 shadow-md shadow-brand-primary/20 hover:scale-105 active:scale-95 cursor-pointer"
          >
            BOOK NOW
          </button>
        </div>

        {/* Mobile Menu Action Toggle */}
        <div className="flex lg:hidden items-center space-x-3">
          <button
            id="book-now-mobile-cta"
            onClick={onOpenBooking}
            className="bg-brand-primary text-brand-gold-light font-sans text-[10px] font-bold tracking-wider py-2 px-4 rounded-full active:scale-95 cursor-pointer"
          >
            BOOK
          </button>
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-brand-primary focus:outline-none p-1 cursor-pointer"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            <div className="pt-6">
              <button
                id="mobile-nav-book-cta"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-brand-primary text-brand-gold-light font-sans text-sm font-semibold tracking-widest py-4 rounded-full text-center hover:bg-brand-secondary hover:text-white transition-all shadow-md cursor-pointer"
              >
                BOOK NOW
              </button>
            </div>
            
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
