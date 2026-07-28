/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft } from "lucide-react";
import AboutSection from "./AboutSection";

interface AboutUsPageProps {
  onBack: () => void;
}

export default function AboutUsPage({ onBack }: AboutUsPageProps) {
  return (
    <div className="min-h-screen bg-brand-background pt-20 md:pt-24">
      {/* ── Back nav bar ── */}
      <div className="bg-white border-b border-brand-primary/8 shadow-sm px-4 md:px-8">
        <div className="max-w-7xl mx-auto h-12 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer group"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[11px] font-bold tracking-widest uppercase">Back to Home</span>
          </button>
        </div>
      </div>

      <AboutSection />
    </div>
  );
}
