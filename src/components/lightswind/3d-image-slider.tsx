"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";

// Local reduced-motion check — motion/react (unlike framer-motion) doesn't
// export useReducedMotion, so this mirrors it without adding an undeclared
// dependency on the transitive framer-motion package.
function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(query.matches);
    const onChange = () => setPrefersReduced(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return prefersReduced;
}

interface Slider3DProps {
  /** Array of image URLs to display */
  images: string[];
  /** Duration of one full 360-degree rotation (in seconds) */
  duration?: number;
  /** Width of each card. Can be px, rem, em, etc. */
  cardWidth?: string;
  /** CSS aspect ratio of the cards. Omit to let each card size to its own
   *  image's natural aspect ratio instead — guarantees no cropping when the
   *  source images vary widely in shape (e.g. review screenshots). */
  cardAspectRatio?: string;
  /** CSS perspective value for the 3D container */
  perspective?: string;
  /** Additional classes for the outermost container */
  containerClassName?: string;
  /** Additional classes for the individual image elements */
  imageClassName?: string;
  /** Direction of the rotation */
  rotationDirection?: "left" | "right";
  /** Whether to apply a gradient fade mask on the edges */
  withMask?: boolean;
  /** Additional inline styles for the outermost container (merged with perspective/mask) */
  style?: CSSProperties;
  /** How the image fills its card — "cover" crops to fill, "contain" always shows the full image (letterboxed) */
  objectFit?: "cover" | "contain";
  /** Background behind each card — matters most with objectFit="contain", where it fills the letterbox space */
  cardBackground?: string;
}

export default function ImageSlider3D({
  images,
  duration = 32,
  cardWidth = "17.5em",
  cardAspectRatio,
  perspective = "35em",
  containerClassName = "",
  imageClassName = "",
  rotationDirection = "left",
  withMask = true,
  style,
  objectFit = "cover",
  cardBackground = "transparent",
}: Slider3DProps) {
  const n = images.length;
  const prefersReducedMotion = usePrefersReducedMotion();
  const animationDuration = prefersReducedMotion ? duration * 4 : duration;

  const rotationValues = rotationDirection === "left" ? [0, 360] : [360, 0];

  const maskStyles = withMask
    ? {
        WebkitMask: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
        mask: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
      }
    : {};

  if (n === 0) return null;

  return (
    <div
      className={`grid w-full h-full overflow-hidden place-items-center ${containerClassName}`}
      style={{
        minHeight: 500,
        perspective,
        ...maskStyles,
        ...style,
      }}
    >
      <motion.div
        className="grid place-self-center pointer-events-auto"
        style={{
          transformStyle: "preserve-3d",
        }}
        animate={{
          rotateY: rotationValues,
        }}
        transition={{
          duration: animationDuration,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            className="col-start-1 row-start-1 rounded-[1.5em] overflow-hidden flex items-center justify-center shadow-2xl"
            style={{
              width: cardWidth,
              aspectRatio: cardAspectRatio,
              background: cardBackground,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: `rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.5em) / tan(0.5 * (1turn / ${n}))))`,
            }}
          >
            <img
              src={src}
              alt={`Guest reflection ${i + 1}`}
              loading="lazy"
              className={`${cardAspectRatio ? "w-full h-full" : "w-full h-auto"} ${imageClassName}`}
              style={cardAspectRatio ? { objectFit } : undefined}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
