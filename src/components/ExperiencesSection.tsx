/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sparkles, Compass, Clock, Check, ChevronRight } from "lucide-react";
import { Experience } from "../types";

interface ExperiencesSectionProps {
  experiences: Experience[];
  onBookExperience: (exp: Experience) => void;
}

export default function ExperiencesSection({ experiences, onBookExperience }: ExperiencesSectionProps) {
  const [activeTab, setActiveTab] = useState(experiences[0]?.id || "");

  const activeExp = experiences.find((e) => e.id === activeTab) || experiences[0];

  return (
    <section id="experiences" className="py-24 md:py-32 px-4 bg-brand-background">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] text-brand-secondary uppercase">
            <Sparkles size={14} />
            <span>Bespoke Journeys</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-brand-primary">
            Curated Local Experiences
          </h2>
          <p className="font-sans text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
            Elevate your stay with signature pursuits tailored for the discerning guest. Crafted with absolute precision.
          </p>
        </div>

        {/* Editorial Split-Layout Interactive Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Vertical selectors */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            {experiences.map((exp) => {
              const isActive = exp.id === activeTab;
              return (
                <button
                  key={exp.id}
                  id={`experience-selector-${exp.id}`}
                  onClick={() => setActiveTab(exp.id)}
                  className={`text-left p-6 rounded-2xl border transition-all duration-500 cursor-pointer flex items-center justify-between group ${
                    isActive
                      ? "bg-white border-brand-secondary shadow-xl shadow-brand-primary/4 translate-x-2"
                      : "bg-transparent border-brand-primary/5 hover:border-brand-primary/10 hover:bg-white/40"
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block text-[9px] font-bold tracking-[0.2em] text-brand-secondary uppercase">
                      {exp.category}
                    </span>
                    <h3 className={`font-display text-lg font-medium transition-colors duration-300 ${
                      isActive ? "text-brand-primary" : "text-brand-primary/70 group-hover:text-brand-primary"
                    }`}>
                      {exp.title}
                    </h3>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      isActive ? "text-brand-secondary translate-x-1" : "text-brand-primary/40 group-hover:translate-x-1"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Immersive Detailed View */}
          {activeExp && (
            <div
              id="experience-detail-panel"
              className="lg:col-span-7 bg-white rounded-[32px] overflow-hidden shadow-2xl border border-brand-primary/5 grid grid-cols-1 md:grid-cols-12 animate-scale-up"
              style={{
                boxShadow: "0 40px 80px -20px rgba(24, 40, 30, 0.05)"
              }}
            >
              {/* Cover Image */}
              <div className="md:col-span-5 h-[240px] md:h-full relative overflow-hidden">
                <img
                  src={activeExp.image}
                  alt={activeExp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
                
                {/* Meta details vertical alignment */}
                <div className="absolute bottom-6 left-6 text-white space-y-1">
                  <span className="inline-block text-[8px] font-bold tracking-widest bg-brand-secondary text-white py-1 px-2.5 rounded-full uppercase">
                    {activeExp.category}
                  </span>
                </div>
              </div>

              {/* Description & details */}
              <div className="md:col-span-7 p-8 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-semibold text-brand-primary">
                    {activeExp.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-brand-primary/70 font-light leading-relaxed">
                    {activeExp.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-2 pt-2">
                    <span className="block text-[9px] font-bold text-brand-primary/45 tracking-widest uppercase">
                      INCLUSIONS & SCHEDULE
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {activeExp.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5">
                          <Check size={12} className="text-brand-secondary shrink-0 mt-0.5" />
                          <span className="text-xs text-brand-primary/80 font-medium leading-normal">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing block and select CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-brand-primary/5">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-brand-primary/60">
                      <Clock size={14} />
                      <span className="text-[11px] font-semibold tracking-wider uppercase">{activeExp.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-brand-primary">
                      <span className="font-display text-lg font-bold text-brand-secondary">₹</span>
                      <span className="font-display text-lg font-bold">{activeExp.pricePerPerson}</span>
                      <span className="text-[10px] text-brand-primary/55 font-semibold">/person</span>
                    </div>
                  </div>

                  <button
                    id={`book-exp-${activeExp.id}`}
                    onClick={() => onBookExperience(activeExp)}
                    className="bg-brand-primary hover:bg-brand-secondary text-brand-gold-light hover:text-white font-sans text-[10px] font-bold tracking-widest py-3 px-5 rounded-full transition-all duration-300 shadow-md shadow-brand-primary/10 cursor-pointer"
                  >
                    INQUIRE PACKAGE
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
