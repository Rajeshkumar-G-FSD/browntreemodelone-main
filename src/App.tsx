/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutUsPage from "./components/AboutUsPage";
import BrochurePage from "./components/BrochurePage";
import PropertiesSection from "./components/PropertiesSection";
import DestinationsSection from "./components/DestinationsSection";
import ReviewsSection from "./components/ReviewsSection";
import ContactSection from "./components/ContactSection";
import SectionCurve from "./components/SectionCurve";
import PropertyDetailPage from "./components/PropertyDetailPage";
import ThankYouPage from "./components/ThankYouPage";
import BookingDrawer from "./components/BookingDrawer";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Toaster from "./components/Toaster";

import { PROPERTIES, DESTINATIONS } from "./data";
import { Property, Suite } from "./types";
import { toPropertySlug, findPropertyBySlug, toThankYouSlug, findPropertyByThankYouSlug, ABOUT_US_PATH, BROCHURE_PATH } from "./slug";
import { useSEO } from "./hooks/useSEO";
import { buildPropertySEO, buildThankYouSEO, DEFAULT_SEO, ABOUT_US_SEO, BROCHURE_SEO } from "./seo";
import { buildPropertyInquiryMessage, buildWhatsAppUrl } from "./lib/whatsapp";

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeSection, setActiveSection] = useState("home");
  const [filteredDestination, setFilteredDestination] = useState("");
  const [bookingProperty, setBookingProperty] = useState<Property | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedSuite, setPreselectedSuite] = useState<Suite | null>(null);
  const [heroPreFill, setHeroPreFill] = useState<{ location: string; property: string } | null>(null);

  // Property shown as full page (null = show home)
  const propertyOnPage = findPropertyBySlug(PROPERTIES, currentPath);
  // Per-property Google Ads conversion landing page (/<slug>/thank-you)
  const thankYouProperty = findPropertyByThankYouSlug(PROPERTIES, currentPath);
  // Standalone, shareable About Us page (/aboutus)
  const aboutUsOnPage = currentPath === ABOUT_US_PATH;
  // Standalone, shareable property portfolio brochure page (/brochure)
  const brochureOnPage = currentPath === BROCHURE_PATH;
  const onSubPage = !!(propertyOnPage || thankYouProperty || aboutUsOnPage || brochureOnPage);

  // Keep <title>, meta tags, canonical URL and JSON-LD in sync with the active route
  const seo = useMemo(() => {
    if (thankYouProperty) return buildThankYouSEO(thankYouProperty);
    if (propertyOnPage) return buildPropertySEO(propertyOnPage);
    if (aboutUsOnPage) return ABOUT_US_SEO;
    if (brochureOnPage) return BROCHURE_SEO;
    return DEFAULT_SEO;
  }, [propertyOnPage, thankYouProperty, aboutUsOnPage, brochureOnPage]);
  useSEO(seo);

  // Browser back/forward support
  useEffect(() => {
    const onPopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Scroll to top when entering a property, thank-you, or about-us page
  useEffect(() => {
    if (onSubPage) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPath]);

  // Highlight the ABOUT nav item while on its dedicated page
  useEffect(() => {
    if (aboutUsOnPage) setActiveSection("about");
  }, [aboutUsOnPage]);

  // Track active section while scrolling on home page
  useEffect(() => {
    if (onSubPage) return;
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
    if (onSubPage) {
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

  // Navigate to the standalone About Us page — works from home or any sub-page.
  // Pass focusId (e.g. "careers") to scroll to a section within the page after it mounts.
  const handleOpenAboutUs = (focusId?: string) => {
    window.history.pushState({}, "", ABOUT_US_PATH);
    setCurrentPath(ABOUT_US_PATH);
    if (focusId) {
      setTimeout(() => {
        const el = document.getElementById(focusId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  // Navigate to the standalone Brochure page — works from home or any sub-page.
  const handleOpenBrochure = () => {
    window.history.pushState({}, "", BROCHURE_PATH);
    setCurrentPath(BROCHURE_PATH);
  };

  // Send a property-specific WhatsApp inquiry, then land on that property's
  // Google Ads conversion page (/<slug>/thank-you).
  const handleInquireProperty = (property: Property) => {
    window.open(buildWhatsAppUrl(buildPropertyInquiryMessage(property)), "_blank", "noopener,noreferrer");
    const slug = toThankYouSlug(property);
    window.history.pushState({}, "", slug);
    setCurrentPath(slug);
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

  // Book suite from property detail page — navigate home, prefill hero widget
  const handleBookSuiteFromPage = (property: Property, _suite: Suite) => {
    // Extract city from "Ooty, India" → "Ooty"
    const city = property.location.split(",")[0].trim();
    setHeroPreFill({ location: city, property: property.name });
    window.history.pushState({}, "", "/");
    setCurrentPath("/");
    // Scroll to hero after home page mounts
    setTimeout(() => {
      const el = document.getElementById("home");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  // Open booking drawer
  const handleOpenBooking = () => {
    setBookingProperty(propertyOnPage);
    setPreselectedSuite(null);
    setBookingOpen(true);
  };

  // Direct Book Now on property card — navigate home, prefill hero widget
  const handleBookPropertyDirect = (property: Property) => {
    const city = property.location.split(",")[0].trim();
    setHeroPreFill({ location: city, property: property.name });
    setTimeout(() => {
      const el = document.getElementById("home");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  return (
    <div id="luxe-sanctuary-app" className="min-h-screen bg-brand-background text-brand-charcoal overflow-x-hidden selection:bg-brand-secondary selection:text-white">
      {/* Floating Header – always visible */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenAboutUs={handleOpenAboutUs}
      />

      {thankYouProperty ? (
        /* ── Per-property Google Ads conversion page ── */
        <ThankYouPage
          property={thankYouProperty}
          onBack={handleBackToHome}
          onViewProperty={() => handleOpenPropertyDetail(thankYouProperty)}
        />
      ) : propertyOnPage ? (
        /* ── Property detail full page ── */
        <PropertyDetailPage
          property={propertyOnPage}
          onBack={handleBackToHome}
          onBookSuite={handleBookSuiteFromPage}
          onInquire={handleInquireProperty}
        />
      ) : aboutUsOnPage ? (
        /* ── Standalone, shareable About Us page (/aboutus) ── */
        <>
          <AboutUsPage onBack={handleBackToHome} />
          <Footer onNavigate={handleNavigate} onOpenAboutUs={handleOpenAboutUs} onOpenBrochure={handleOpenBrochure} />
        </>
      ) : brochureOnPage ? (
        /* ── Standalone, shareable property portfolio brochure page (/brochure) ── */
        <>
          <BrochurePage onBack={handleBackToHome} />
          <Footer onNavigate={handleNavigate} onOpenAboutUs={handleOpenAboutUs} onOpenBrochure={handleOpenBrochure} />
        </>
      ) : (
        /* ── Home page ── */
        <>
          <Hero
            onSearch={handleHeroSearch}
            onExploreClick={() => handleNavigate("properties")}
            onOpenBooking={handleOpenBooking}
            preFill={heroPreFill}
            onPreFillConsumed={() => setHeroPreFill(null)}
          />

          <main id="main-content">
            <PropertiesSection
              properties={PROPERTIES}
              onSelectProperty={handleOpenPropertyDetail}
              onBookProperty={handleBookPropertyDirect}
              filteredDestination={filteredDestination}
            />

            <SectionCurve fromColor="#fcf9f8" toColor="#ffffff" />

            <DestinationsSection
              destinations={DESTINATIONS}
              onSelectDestination={handleSelectDestination}
            />

            <SectionCurve fromColor="#ffffff" toColor="#18281e" />

            <ReviewsSection />

            <SectionCurve fromColor="#18281e" toColor="#fcf9f8" />

            <ContactSection />
          </main>

          <Footer onNavigate={handleNavigate} onOpenAboutUs={handleOpenAboutUs} onOpenBrochure={handleOpenBrochure} />
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
      <Toaster />
    </div>
  );
}
