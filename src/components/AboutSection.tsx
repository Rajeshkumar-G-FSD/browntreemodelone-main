/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Building2, MapPin, BedDouble, Award, Users, Phone } from "lucide-react";
import { ScrollTimeline, type TimelineEvent } from "./lightswind/scroll-timeline";
import BlurText from "./BlurText";
import hillgroveMain from "../assets/images/browntree_resorts_hillgrove.png";
import theAbodeMain from "../assets/images/theabodebybrowntree.png";
import teaLeafMain from "../assets/images/Tealeaf.png";
import vetrivelMain from "../assets/images/vetrivel_inn.png";
import hummingBirdBrowntree from "../assets/images/hummingbird_browntre_resorts_kothagiri.png";
import solarMain from "../assets/images/solar.png";
import earthyNestFront from "../assets/images/earthynest_frontviiew.png";

const GROWTH_JOURNEY: TimelineEvent[] = [
  {
    year: "2021",
    title: "Hillgrove",
    subtitle: "Ooty · 7 Keys",
    description: "Where it all began — a 7-key villa that marked the start of the Brown Tree story.",
    image: hillgroveMain,
  },
  {
    year: "2022",
    title: "The Abode",
    subtitle: "Ooty · 7 Keys",
    description: "A second hillside home, built on the same promise of warm, personal hospitality.",
    image: theAbodeMain,
  },
  {
    year: "2023",
    title: "Tea Leaf Stays",
    subtitle: "Ooty · 5 Keys",
    description: "A cozy retreat surrounded by tea gardens, expanding our presence across Ooty.",
    image: teaLeafMain,
  },
  {
    year: "2025",
    title: "Vetrivel International",
    subtitle: "Kodaikanal · 20 Keys",
    description: "Our largest property yet, bringing Brown Tree hospitality to Kodaikanal.",
    image: vetrivelMain,
  },
  {
    year: "2025",
    title: "Humming Bird",
    subtitle: "Ooty · 10 Keys",
    description: "A family-favourite stay nestled in the hills, known for its scenic views.",
    image: hummingBirdBrowntree,
  },
  {
    year: "2026",
    title: "Shola's Presidency",
    subtitle: "Ooty · 15 Keys",
    description: "A striking new landmark property, reflecting Brown Tree's growing ambition.",
    image: solarMain,
  },
  {
    year: "2026",
    title: "Earthy Nest",
    subtitle: "Kotagiri · 3 Keys",
    description: "An intimate hillside homestay rounding out our 60-key hospitality brand.",
    image: earthyNestFront,
  },
];

const STATS = [
  { icon: Building2, value: "5", label: "Properties" },
  { icon: MapPin, value: "3", label: "Destinations", sub: "Ooty · Kotagiri · Kodaikanal" },
  { icon: BedDouble, value: "60", label: "Keys Under Management" },
  { icon: Award, value: "60", label: "Keys · 5★ Hospitality" },
];

const ABOUT_PARAGRAPHS = [
  "Welcome to Brown Tree, where comfort, hospitality, and memorable travel experiences come together. Since 2021, Brown Tree has been offering quality accommodations across Ooty, Kotagiri, and Kodaikanal, catering to families, couples, business travellers, and groups.",
  "Our portfolio includes hotels, resorts, homestays, cottages, villas, and service apartments, designed to suit every travel style and budget. With over 60 well-appointed rooms and accommodations, we are committed to providing clean, comfortable stays with warm hospitality and personalized service.",
  "Whether you're planning a peaceful hill station getaway, a family vacation, a romantic escape, or a workcation, Brown Tree offers thoughtfully located properties with modern amenities and easy access to popular attractions.",
  "At Brown Tree, our mission is simple: to make every guest feel at home while delivering exceptional value, comfort, and unforgettable experiences. We continuously strive to exceed expectations through friendly service, well-maintained properties, and attention to every detail.",
];

const CAREERS_PARAGRAPHS = [
  "At Brown Tree, we believe that exceptional hospitality begins with exceptional people. We are always looking for passionate, dedicated, and service-oriented individuals to join our growing team across our properties in Ooty, Kotagiri, and Kodaikanal.",
  "Whether you're an experienced hospitality professional or just starting your career, Brown Tree offers a supportive work environment with opportunities to learn, grow, and build a rewarding career.",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-brand-background py-20 md:py-28 px-4 md:px-12 overflow-hidden">
      <div className="max-w-3xl mx-auto mb-14 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-secondary block mb-3"
        >
          Our Story
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-3xl md:text-5xl font-medium text-brand-primary mb-8"
        >
          About Us
        </motion.h2>

        <div className="space-y-5 text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
          {ABOUT_PARAGRAPHS.map((paragraph, idx) => (
            <BlurText
              key={idx}
              text={paragraph}
              tag="p"
              className="!justify-start !text-left"
              animateBy="words"
              direction="top"
              delay={22}
              stepDuration={0.45}
              threshold={0.15}
            />
          ))}
          <BlurText
            text="Brown Tree – Your Trusted Stay in the Hills."
            tag="p"
            className="!justify-start !text-left font-display italic text-brand-secondary text-base md:text-lg"
            animateBy="words"
            direction="top"
            delay={40}
            stepDuration={0.5}
            threshold={0.2}
          />
        </div>
      </div>

      {/* Stats strip */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28">
        {STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="bg-white border border-brand-primary/8 rounded-2xl p-5 md:p-6 flex flex-col items-center text-center gap-2 shadow-sm"
          >
            <span className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-brand-gold-light">
              <stat.icon size={18} />
            </span>
            <span className="font-display text-2xl md:text-3xl font-semibold text-brand-primary">{stat.value}</span>
            <span className="text-[11px] font-bold tracking-widest uppercase text-brand-primary/50">{stat.label}</span>
            {stat.sub && <span className="text-[10px] text-brand-primary/40">{stat.sub}</span>}
          </motion.div>
        ))}
      </div>

      {/* Growth journey timeline */}
      <ScrollTimeline
        events={GROWTH_JOURNEY}
        title="Brown Tree Growth Journey"
        subtitle="From a 7-key villa to a 60-key hospitality brand across the Nilgiris (2021 – 2026)"
        cardAlignment="alternating"
        revealAnimation="fade"
        cardEffect="shadow"
        dateFormat="badge"
      />

      {/* Join Our Team */}
      <div id="careers" className="max-w-3xl mx-auto mt-20 md:mt-28">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-bold tracking-[0.25em] uppercase text-brand-secondary block mb-3"
        >
          Careers
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="font-display text-3xl md:text-5xl font-medium text-brand-primary mb-8"
        >
          Join Our Team
        </motion.h2>

        <div className="space-y-5 text-sm md:text-base text-brand-primary/70 font-light leading-relaxed">
          {CAREERS_PARAGRAPHS.map((paragraph, idx) => (
            <BlurText
              key={idx}
              text={paragraph}
              tag="p"
              className="!justify-start !text-left"
              animateBy="words"
              direction="top"
              delay={22}
              stepDuration={0.45}
              threshold={0.15}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 flex flex-col items-start gap-4 bg-white border border-brand-primary/8 rounded-2xl px-6 py-6 md:px-8 shadow-sm"
        >
          <span className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-brand-gold-light">
            <Users size={18} />
          </span>
          <p className="text-[11px] font-bold tracking-widest uppercase text-brand-primary/50">Contact</p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
            <a href="tel:+919363036766" className="flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
              <Phone size={14} className="text-brand-secondary" />
              +91 93630 36766
            </a>
            <a href="tel:+919363036866" className="flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
              <Phone size={14} className="text-brand-secondary" />
              +91 93630 36866
            </a>
            <a href="tel:+918925266866" className="flex items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors">
              <Phone size={14} className="text-brand-secondary" />
              +91 89252 66866
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
