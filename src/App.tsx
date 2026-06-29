/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PropertiesSection from "./components/PropertiesSection";
import DestinationsSection from "./components/DestinationsSection";
import ExperiencesSection from "./components/ExperiencesSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import PropertyDetailModal from "./components/PropertyDetailModal";
import BookingDrawer from "./components/BookingDrawer";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

import { PROPERTIES, EXPERIENCES, REVIEWS, DESTINATIONS } from "./data";
import { Property, Suite, Experience } from "./types";

export default function App() {
  // Navigation & Active Section Tracking
  const [activeSection, setActiveSection] = useState("home");

  // Interaction States
  const [filteredDestination, setFilteredDestination] = useState("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedSuite, setPreselectedSuite] = useState<Suite | null>(null);

  // Monitor scrolling to highlight correct nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "properties", "destinations", "experiences", "reviews", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigate smoothly to a section
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  // When search button in Hero is clicked
  const handleHeroSearch = (filters: { destination: string; checkIn: string; checkOut: string; guests: number }) => {
    setFilteredDestination(filters.destination);
    
    // Smoothly scroll down to properties
    const el = document.getElementById("properties");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Selecting a destination card
  const handleSelectDestination = (destName: string) => {
    setFilteredDestination(destName);
    
    // Smoothly scroll to properties
    const el = document.getElementById("properties");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Launch detail modal for property
  const handleOpenPropertyDetail = (property: Property) => {
    setSelectedProperty(property);
  };

  // Close property modal
  const handleClosePropertyDetail = () => {
    setSelectedProperty(null);
  };

  // Inquire/Book Suite inside detail modal
  const handleBookSuiteFromModal = (property: Property, suite: Suite) => {
    setSelectedProperty(null); // Close modal
    setPreselectedSuite(suite); // Pass preselected suite
    setBookingOpen(true); // Open drawer
  };

  // Open booking drawer generically
  const handleOpenBooking = () => {
    setPreselectedSuite(null);
    setBookingOpen(true);
  };

  // Experience package click -> opens general booking
  const handleBookExperience = (exp: Experience) => {
    // Find matching property if any, or open booking
    if (exp.id === "exp-heli") {
      const swiss = PROPERTIES.find((p) => p.id === "misty-peaks");
      setSelectedProperty(swiss || null);
    } else if (exp.id === "exp-healing") {
      const jaipur = PROPERTIES.find((p) => p.id === "heritage-pine");
      setSelectedProperty(jaipur || null);
    } else {
      const coastal = PROPERTIES.find((p) => p.id === "azure-orchid");
      setSelectedProperty(coastal || null);
    }
    setPreselectedSuite(null);
    setBookingOpen(true);
  };

  // Direct book-now clicked on properties section cards
  const handleBookPropertyDirect = (property: Property) => {
    setSelectedProperty(property);
    setPreselectedSuite(null);
    setBookingOpen(true);
  };

  return (
    <div id="luxe-sanctuary-app" className="min-h-screen bg-brand-background text-brand-charcoal overflow-x-hidden selection:bg-brand-secondary selection:text-white">
      {/* Floating Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {/* Hero Section */}
      <Hero
        onSearch={handleHeroSearch}
        onExploreClick={() => handleNavigate("properties")}
        onOpenBooking={handleOpenBooking}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* Curated Properties List Section */}
        <PropertiesSection
          properties={PROPERTIES}
          onSelectProperty={handleOpenPropertyDetail}
          onBookProperty={handleBookPropertyDirect}
          filteredDestination={filteredDestination}
        />

        {/* Global Destinations Grid */}
        <DestinationsSection
          destinations={DESTINATIONS}
          onSelectDestination={handleSelectDestination}
        />

        {/* Curated Experiences Showcase */}
        <ExperiencesSection
          experiences={EXPERIENCES}
          onBookExperience={handleBookExperience}
        />

        {/* Guest Reviews Testimonial Slider */}
        <ReviewsSection reviews={REVIEWS} />

        {/* Bespoke Inquiry Contact Form */}
        <ContactSection />
      </main>

      {/* Footer block */}
      <Footer onNavigate={handleNavigate} />

      {/* Immersive Property Detail Modal Overlay */}
      {selectedProperty && (
        <PropertyDetailModal
          property={selectedProperty}
          onClose={handleClosePropertyDetail}
          onBookSuite={handleBookSuiteFromModal}
        />
      )}

      {/* Slide-out Booking Drawer */}
      <BookingDrawer
        properties={PROPERTIES}
        selectedProperty={selectedProperty || (bookingOpen ? selectedProperty : null)}
        selectedSuite={preselectedSuite}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* Luxury Concierge Chatbot "Brown tree" */}
      <ChatBot />
    </div>
  );
}
