/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquare } from "lucide-react";
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from "./lightswind/ThreeDScrollTrigger";
import { ALL_REVIEW_IMAGES } from "../reviewImages";

// Rows scroll continuously and speed up/reverse with page scroll velocity
// (see ThreeDScrollTrigger.tsx). Cards use a fixed height with natural
// width (no forced aspect ratio) so these wide review screenshots
// (~3.6:1 to ~10.2:1) never get cropped — width just varies per image.
function ReviewCard({ src }: { src: string }) {
  return (
    <div className="inline-block shrink-0 mx-2 sm:mx-3 rounded-xl overflow-hidden bg-white shadow-xl h-[110px] sm:h-[150px] md:h-[190px] lg:h-[220px]">
      <img
        src={src}
        alt="Guest reflection"
        loading="lazy"
        className="h-full w-auto block"
      />
    </div>
  );
}

// Split the pool into three rows (round-robin) so each row has its own mix
// rather than every row showing the same sequence.
function splitRows(images: string[], rowCount: number): string[][] {
  const rows: string[][] = Array.from({ length: rowCount }, () => []);
  images.forEach((src, i) => rows[i % rowCount].push(src));
  return rows;
}

const ROWS = splitRows(ALL_REVIEW_IMAGES, 3);
const ROW_DIRECTION: (1 | -1)[] = [1, -1, 1];

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#18281e 0%,#1e3224 50%,#18281e 100%)" }}
    >
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4 mb-14">
        <div
          className="inline-flex items-center space-x-2 text-base md:text-lg font-bold tracking-[0.1em] uppercase"
          style={{ color: "#D4AF37" }}
        >
          <MessageSquare size={14} />
          <span>GUEST REVIEWS</span>
        </div>
        <h2 className="font-display text-base md:text-lg font-medium tracking-tight" style={{ color: "#F8F5EF" }}>
          Reflections of Luxury
        </h2>
        <p className="font-sans text-base md:text-lg font-light leading-relaxed" style={{ color: "rgba(248,245,239,0.6)" }}>
          Read notes of admiration from members of our elite travel circles.
        </p>
      </div>

      {/* Scroll-velocity-reactive marquee rows — no per-property grouping or labels */}
      <ThreeDScrollTriggerContainer className="space-y-4 sm:space-y-5 md:space-y-6">
        {ROWS.map((row, i) => (
          <ThreeDScrollTriggerRow key={i} direction={ROW_DIRECTION[i % ROW_DIRECTION.length]} baseVelocity={3}>
            {row.map((src, j) => (
              <ReviewCard key={j} src={src} />
            ))}
          </ThreeDScrollTriggerRow>
        ))}
      </ThreeDScrollTriggerContainer>

      {/* Subtle bottom gold rule */}
      <div className="max-w-xs mx-auto mt-10 px-4">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}
