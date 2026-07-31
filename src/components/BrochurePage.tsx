/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import brandLogo from "../assets/images/bT_brand_logo.png";
import { useToast } from "./useToast";

const PDF_URL = "/downloads/brown-tree-property-portfolio.pdf";
const PDF_FILENAME = "Brown Tree - Property Portfolio.pdf";

interface BrochurePageProps {
  onBack: () => void;
}

export default function BrochurePage({ onBack }: BrochurePageProps) {
  const { toast } = useToast();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    const confirmed = window.confirm(`Save "${PDF_FILENAME}" to your device?`);
    if (!confirmed) return;

    setDownloading(true);
    try {
      const filePicker = (window as any).showSaveFilePicker;
      if (typeof filePicker === "function") {
        // Chromium browsers: native OS "Save As" dialog — the real permission/location prompt.
        const handle = await filePicker({
          suggestedName: PDF_FILENAME,
          types: [{ description: "PDF Document", accept: { "application/pdf": [".pdf"] } }],
        });
        const res = await fetch(PDF_URL);
        const blob = await res.blob();
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        toast({ title: "Downloaded", description: "Brochure saved to your device." });
      } else {
        // Safari / Firefox fallback: browser's own download flow.
        const a = document.createElement("a");
        a.href = PDF_URL;
        a.download = PDF_FILENAME;
        document.body.appendChild(a);
        a.click();
        a.remove();
        toast({ title: "Download started", description: "Check your device's downloads folder." });
      }
    } catch (err) {
      if ((err as Error)?.name !== "AbortError") {
        toast({ variant: "destructive", title: "Download failed", description: "Please try again." });
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-background pt-20 md:pt-24">
      <style>{`
        @keyframes brochureLogoIn {
          0%   { opacity: 0; transform: scale(0.5); }
          60%  { opacity: 1; transform: scale(1.12); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes brochureLogoHeartbeat {
          0%   { transform: scale(1);    filter: drop-shadow(0 0 0px rgba(233,193,118,0)); }
          22%  { transform: scale(1.13); filter: drop-shadow(0 0 11px rgba(233,193,118,0.6)); }
          38%  { transform: scale(1.02); filter: drop-shadow(0 0 4px rgba(233,193,118,0.25)); }
          54%  { transform: scale(1.1);  filter: drop-shadow(0 0 9px rgba(233,193,118,0.5)); }
          72%  { transform: scale(1);    filter: drop-shadow(0 0 0px rgba(233,193,118,0)); }
          100% { transform: scale(1);    filter: drop-shadow(0 0 0px rgba(233,193,118,0)); }
        }
        .brochure-logo-heartbeat { animation: brochureLogoHeartbeat 3.6s cubic-bezier(0.45,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) { .brochure-logo-heartbeat { animation: none; } }
      `}</style>

      {/* Back nav bar */}
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

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 text-center">
        <h1 className="font-brand text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] text-brand-primary">
          {"BROWN TREE".split("").map((char, i) =>
            i === 2 ? (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "0.84em",
                  height: "0.84em",
                  verticalAlign: "-0.07em",
                  margin: "0 0.02em",
                  animation: "brochureLogoIn 0.5s cubic-bezier(0.16,1,0.3,1) both",
                }}
              >
                <img
                  src={brandLogo}
                  alt=""
                  aria-hidden="true"
                  className="brochure-logo-heartbeat"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    objectPosition: "center",
                    transformOrigin: "center",
                  }}
                />
              </span>
            ) : (
              <span key={i} style={{ display: "inline-block" }}>
                {char === " " ? " " : char}
              </span>
            )
          )}
        </h1>
        <p className="mt-3 font-script italic text-xl sm:text-2xl text-brand-secondary">
          Property Portfolio Brochure
        </p>
        <p className="mt-3 font-sans text-sm sm:text-base text-brand-primary/70 max-w-xl mx-auto leading-relaxed">
          Explore all 5 Brown Tree properties across Ooty, Kotagiri and Kodaikanal — galleries, amenities and
          pricing, all in one document.
        </p>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-8 inline-flex items-center gap-2 bg-brand-secondary text-white font-sans text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full hover:bg-brand-primary transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <Download size={15} />
          {downloading ? "Preparing…" : "Download PDF"}
        </button>

        <div className="mt-10 rounded-xl overflow-hidden shadow-xl border border-brand-primary/10 bg-white">
          <iframe
            src={PDF_URL}
            title="Brown Tree Property Portfolio"
            className="w-full h-[70vh] md:h-[85vh]"
          />
        </div>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-primary/50">
          <FileText size={13} />
          If the preview doesn't load on your device, use the Download button above.
        </p>
      </section>
    </div>
  );
}
