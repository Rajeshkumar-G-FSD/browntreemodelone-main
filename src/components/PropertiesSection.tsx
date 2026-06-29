/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Star, ArrowRight, Compass, Filter } from "lucide-react";
import { motion } from "motion/react";
import { Property } from "../types";
import SplitText from "./SplitText";
import BlurText from "./BlurText";

interface PropertiesSectionProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onBookProperty: (property: Property) => void;
  filteredDestination: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Ultra-smooth easeOutExpo
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.215, 0.61, 0.355, 1], // easeOutCubic
    },
  },
};

export default function PropertiesSection({
  properties,
  onSelectProperty,
  onBookProperty,
  filteredDestination,
}: PropertiesSectionProps) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }
    setIsRefreshing(true);
    const timer = setTimeout(() => {
      setIsRefreshing(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [selectedType, filteredDestination]);

  const propertyTypes = ["All", "Ooty", "Kothagiri", "Kodaikanal"];

  // Filter properties based on both selected type AND searched destination
  const filteredProperties = properties.filter((prop) => {
    const matchesType = selectedType === "All" || prop.type === selectedType;
    const matchesDest =
      !filteredDestination ||
      prop.location.toLowerCase().includes(filteredDestination.toLowerCase()) ||
      prop.name.toLowerCase().includes(filteredDestination.toLowerCase()) ||
      prop.region.toLowerCase().includes(filteredDestination.toLowerCase());
    return matchesType && matchesDest;
  });

  return (
    <section id="properties" className="py-24 md:py-32 px-4 bg-brand-background">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header with Staggered Scroll Animation */}
        <motion.div 
          className="text-center space-y-4 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] text-brand-secondary uppercase"
          >
            <Compass size={14} />
            <span>Curated Collection</span>
          </motion.div>
          <div className="w-full">
            <SplitText
              text="Explore Our Properties"
              className="font-display text-4xl md:text-5xl font-medium tracking-tight text-brand-primary block"
              tag="h2"
              delay={40}
              duration={1.25}
              ease="power3.out"
              splitType="chars"
            />
          </div>
          <div className="w-full">
            <BlurText
              text="Handpicked sanctuaries designed for the discerning traveler, blending local heritage with modern luxury."
              className="font-sans text-sm md:text-base text-brand-primary/70 font-light leading-relaxed max-w-2xl mx-auto flex flex-wrap justify-center"
              delay={30}
              animateBy="words"
              direction="top"
            />
          </div>
        </motion.div>

        {/* Filters and search info bar with Scroll Animation */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-b border-brand-primary/5 pb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
        >
          {/* Filter Chips */}
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
            <div className="flex items-center space-x-2 shrink-0">
              <Filter size={14} className="text-brand-primary/50 mr-1" />
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  id={`filter-chip-${type.toLowerCase().replace(/\s+/g, "-")}`}
                  onClick={() => setSelectedType(type)}
                  className={`font-sans text-[11px] font-bold tracking-widest py-2 px-5 rounded-full border transition-all duration-300 cursor-pointer ${
                    selectedType === type
                      ? "bg-brand-primary text-brand-gold-light border-brand-primary"
                      : "bg-white/50 text-brand-primary/70 border-brand-primary/10 hover:border-brand-secondary hover:text-brand-secondary"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Searched Status */}
          {filteredDestination && (
            <div className="text-xs font-semibold text-brand-secondary tracking-wider bg-brand-secondary/10 py-1.5 px-4 rounded-full border border-brand-secondary/25">
              Filtered by: "{filteredDestination}"
            </div>
          )}
        </motion.div>

        {/* Properties Cards Grid */}
        {isRefreshing ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border border-brand-primary/10 flex items-center justify-center">
                <Compass className="text-brand-secondary animate-spin text-brand-secondary/80" size={28} style={{ animationDuration: "3s" }} />
              </div>
              <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-brand-secondary border-t-transparent animate-spin"></div>
            </div>
            <div className="text-center space-y-1.5 animate-pulse">
              <p className="font-display text-sm tracking-widest text-brand-primary/80 uppercase font-medium">
                Refreshing Sanctuary Collection
              </p>
              <p className="text-[10px] tracking-wider text-brand-secondary uppercase font-bold">
                Optimizing Mist-Mountain Images
              </p>
            </div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <motion.div 
            className="text-center py-20 bg-white/40 rounded-3xl border border-brand-primary/5 space-y-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-display text-lg text-brand-primary/50">No Sanctuaries Match Your Criteria</p>
            <p className="text-xs text-brand-primary/40">Try resetting your filters or destination search.</p>
            <button
              onClick={() => setSelectedType("All")}
              className="text-xs font-bold text-brand-secondary tracking-widest underline cursor-pointer"
            >
              RESET FILTERS
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {filteredProperties.map((property) => {
              // We can highlight Heritage Palace (or second item) with a slightly different visual size or badge
              const isHighlighted = property.id === "heritage-palace";
              
              return (
                <motion.div
                  key={property.id}
                  id={`property-card-${property.id}`}
                  onClick={() => onSelectProperty(property)}
                  variants={cardVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
                  className={`group relative rounded-[28px] overflow-hidden bg-white shadow-2xl cursor-pointer select-none ${
                    isHighlighted 
                      ? "shadow-brand-primary/10 ring-1 ring-brand-secondary/35 lg:scale-105 z-10" 
                      : "shadow-brand-primary/4 hover:shadow-brand-primary/8"
                  }`}
                  style={{
                    boxShadow: "0 40px 60px -15px rgba(24, 40, 30, 0.04)"
                  }}
                >
                  {/* Card Image Cover */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    
                    {/* Linear Gradient Shader over image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-brand-primary/5 to-transparent opacity-80" />

                    {/* Star Rating Overlay top-right */}
                    <div className="absolute top-5 right-5 z-10 flex items-center space-x-1 py-1 px-3 bg-brand-primary/85 backdrop-blur-md rounded-full text-brand-gold-light border border-white/10">
                      <Star size={12} className="fill-brand-gold-light" />
                      <span className="text-[10px] font-bold tracking-wider">{property.rating}</span>
                    </div>

                    {/* Premium Highlight Badge if applicable */}
                    {isHighlighted && (
                      <div className="absolute top-5 left-5 z-10 py-1.5 px-3.5 bg-brand-secondary text-white text-[9px] font-bold tracking-[0.2em] rounded-full uppercase">
                        Featured Stay
                      </div>
                    )}
                  </div>

                  {/* Glassmorphic Info Pane Anchored at Bottom */}
                  <div className="p-6 space-y-4 bg-white/95 border-t border-brand-primary/5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="block text-[10px] font-bold tracking-[0.15em] text-brand-secondary uppercase">
                          {property.type}
                        </span>
                        <h3 className="font-display text-xl font-medium text-brand-primary mt-1 group-hover:text-brand-secondary transition-colors duration-300">
                          {property.name}
                        </h3>
                        <span className="text-xs text-brand-primary/55 font-light block mt-0.5">
                          {property.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-brand-primary/5">
                      <div>
                        <span className="block text-[8px] font-bold text-brand-primary/40 tracking-[0.2em] uppercase">
                          STARTING AT
                        </span>
                        <div className="flex items-baseline space-x-1">
                          <span className="font-display text-2xl font-semibold text-brand-primary">₹{property.price}</span>
                          <span className="text-[11px] text-brand-primary/50">/nt</span>
                        </div>
                      </div>

                      {/* Direct Book Now Button */}
                      <button
                        id={`book-now-btn-${property.id}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent opening property details modal
                          onBookProperty(property);
                        }}
                        className="font-sans text-[11px] font-bold tracking-[0.15em] uppercase bg-brand-primary hover:bg-brand-secondary text-brand-gold-light hover:text-white py-2 px-5 rounded-full transition-all duration-300 shadow-md cursor-pointer shrink-0 hover:scale-105 active:scale-95"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
