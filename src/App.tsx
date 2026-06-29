/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import PropertiesSection from "./components/PropertiesSection";
import DestinationsSection from "./components/DestinationsSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import PropertyDetailPage from "./components/PropertyDetailPage";
import BookingDrawer from "./components/BookingDrawer";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

import { PROPERTIES, REVIEWS, DESTINATIONS } from "./data";
import { Property, Suite } from "./types";

// Converts a property to a URL slug: /ooty-the-earthy-nest-by-brown-tree
function toPropertySlug(property: Property): string {
  const location = property.location.split(",")[0].trim().toLowerCase().replace(/\s+/g, "-");
  const name = property.name.toLowerCase().replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, "-");
  return `/${location}-${name}`;
}

function findPropertyBySlug(slug: string): Property | null {
  return PROPERTIES.find((p) => toPropertySlug(p) === slug) ?? null;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeSection, setActiveSection] = useState("home");
  const [filteredDestination, setFilteredDestination] = useState("");
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedSuite, setPreselectedSuite] = useState<Suite | null>(null);

  // Property shown as full page (null = show home)
  const propertyOnPage = findPropertyBySlug(currentPath);

  // Browser back/forward support
  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Scroll to top when entering a property page
  useEffect(() => {
    if (propertyOnPage) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  // Track active section while scrolling on home page
  useEffect(() => {
    if (propertyOnPage) return;
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
  }, [propertyOnPage]);

  // Navigate to a section — works from both home and property pages
  const handleNavigate = (sectionId: string) => {
    if (propertyOnPage) {
      window.history.pushState({}, "", "/");
      setCurrentPath("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }, 80);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }
  };

  // Navigate to property detail page
  const handleOpenPropertyDetail = (property: Property) => {
    const slug = toPropertySlug(property);
    window.history.pushState({}, "", slug);
    setCurrentPath(slug);
  };

  // Navigate back to home
  const handleBackToHome = () => {
    window.history.pushState({}, "", "/");
    setCurrentPath("/");
  };

  // Hero search
  const handleHeroSearch = (filters: { destination: string; checkIn: string; checkOut: string; guests: number }) => {
    setFilteredDestination(filters.destination);
    const el = document.getElementById("properties");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Destination card click
  const handleSelectDestination = (destName: string) => {
    setFilteredDestination(destName);
    const el = document.getElementById("properties");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Book suite from property detail page
  const handleBookSuiteFromPage = (property: Property, suite: Suite) => {
    setBookingProperty(property);
    setPreselectedSuite(suite);
    setBookingOpen(true);
  };

  // Open booking drawer
  const handleOpenBooking = () => {
    setBookingProperty(propertyOnPage);
    setPreselectedSuite(null);
    setBookingOpen(true);
  };

  // Direct Book Now on property card
  const handleBookPropertyDirect = (property: Property) => {
    setBookingProperty(property);
    setPreselectedSuite(null);
    setBookingOpen(true);
  };

  return (
    <div id="luxe-sanctuary-app" className="min-h-screen bg-brand-background text-brand-charcoal overflow-x-hidden selection:bg-brand-secondary selection:text-white">
      {/* Floating Header – always visible */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
      />

      {propertyOnPage ? (
        /* ── Property detail full page ── */
        <PropertyDetailPage
          property={propertyOnPage}
          onBack={handleBackToHome}
          onBookSuite={handleBookSuiteFromPage}
        />
      ) : (
        /* ── Home page ── */
        <>
          <Hero
            onSearch={handleHeroSearch}
            onExploreClick={() => handleNavigate("properties")}
            onOpenBooking={handleOpenBooking}
          />

          <main id="main-content">
            <PropertiesSection
              properties={PROPERTIES}
              onSelectProperty={handleOpenPropertyDetail}
              onBookProperty={handleBookPropertyDirect}
              filteredDestination={filteredDestination}
            />

            <DestinationsSection
              destinations={DESTINATIONS}
              onSelectDestination={handleSelectDestination}
            />

<ReviewsSection reviews={REVIEWS} />

            <ContactSection />
          </main>

          <Footer onNavigate={handleNavigate} />
        </>
      )}

      {/* Booking drawer – available on all pages */}
      <BookingDrawer
        properties={PROPERTIES}
        selectedProperty={bookingProperty}
        selectedSuite={preselectedSuite}
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <ChatBot />
    </div>
  );
}
