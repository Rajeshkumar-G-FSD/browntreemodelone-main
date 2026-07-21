/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { AngledSlider } from "./lightswind/angled-slider";
import { REVIEW_IMAGE_ROWS } from "../reviewImages";

const ROW_DIRECTION: ("left" | "right")[] = ["left", "right", "left", "right"];
const ROW_SPEED = [30, 36, 26, 32];

function useResponsiveSliderSize() {
  const [size, setSize] = useState({ cardWidth: 420, containerHeight: 240, gap: 28 });

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setSize({ cardWidth: 240, containerHeight: 150, gap: 16 });
      } else if (w < 1024) {
        setSize({ cardWidth: 340, containerHeight: 200, gap: 24 });
      } else if (w < 1536) {
        setSize({ cardWidth: 420, containerHeight: 240, gap: 28 });
      } else {
        setSize({ cardWidth: 460, containerHeight: 260, gap: 32 });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

function ReviewSliderRow({
  property,
  images,
  direction,
  speed,
  cardWidth,
  containerHeight,
  gap,
}: {
  property: string;
  images: string[];
  direction: "left" | "right";
  speed: number;
  cardWidth: number;
  containerHeight: number;
  gap: number;
}) {
  const items = images.map((url, i) => ({
    id: `${property}-${i}`,
    url,
    alt: `${property} guest review ${i + 1}`,
    title: property,
  }));

  return (
    <div>
      <p
        className="mb-2 px-4 text-center text-xs font-bold uppercase tracking-[0.25em] md:px-6"
        style={{ color: "rgba(212,175,55,0.85)" }}
      >
        {property}
      </p>
      <AngledSlider
        items={items}
        direction={direction}
        speed={speed}
        cardWidth={`${cardWidth}px`}
        containerHeight={`${containerHeight}px`}
        gap={`${gap}px`}
        angle={12}
        hoverScale={1.03}
        imageFit="contain"
        className="bg-transparent"
      />
    </div>
  );
}

export default function ReviewsSection() {
  const { cardWidth, containerHeight, gap } = useResponsiveSliderSize();

  return (
    <section
      id="reviews"
      className="py-24 md:py-32 overflow-hidden"
      style={{ background: "linear-gradient(160deg,#18281e 0%,#1e3224 50%,#18281e 100%)" }}
    >
      {/* Section Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto px-4 mb-14">
        <div
          className="inline-flex items-center space-x-2 text-xs font-bold tracking-[0.25em] uppercase"
          style={{ color: "#D4AF37" }}
        >
          <MessageSquare size={14} />
          <span>GUEST REVIEWS</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight" style={{ color: "#F8F5EF" }}>
          Reflections of Luxury
        </h2>
        <p className="font-sans text-sm md:text-base font-light leading-relaxed" style={{ color: "rgba(248,245,239,0.6)" }}>
          Read notes of admiration from members of our elite travel circles.
        </p>
      </div>

      {/* Angled 3D Auto-Scroll Sliders */}
      <div className="space-y-10">
        {REVIEW_IMAGE_ROWS.map((row, i) => (
          <ReviewSliderRow
            key={row.property}
            property={row.property}
            images={row.images}
            direction={ROW_DIRECTION[i % ROW_DIRECTION.length]}
            speed={ROW_SPEED[i % ROW_SPEED.length]}
            cardWidth={cardWidth}
            containerHeight={containerHeight}
            gap={gap}
          />
        ))}
      </div>

      {/* Subtle bottom gold rule */}
      <div className="max-w-xs mx-auto mt-10 px-4">
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
      </div>
    </section>
  );
}
