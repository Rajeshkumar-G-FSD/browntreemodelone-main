import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, animate, type Variants } from "motion/react";
import { cn } from "../lib/utils";

interface AngledSliderProps {
  /**
   * Array of image objects or URLs
   */
  items: {
    id: string | number;
    url: string;
    alt?: string;
    title?: string;
  }[];
  /**
   * Speed of auto-scroll (seconds for full loop). Higher is slower.
   * @default 20
   */
  speed?: number;
  /**
   * Direction of scroll
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * Height of the slider container
   * @default "400px"
   */
  containerHeight?: string;
  /**
   * Width of each card
   * @default "300px"
   */
  cardWidth?: string;
  /**
   * Gap between cards
   * @default "40px"
   */
  gap?: string;
  /**
   * Angle of the 3D skew/rotation
   * @default 20
   */
  angle?: number;
  /**
   * Scale on hover
   * @default 1.05
   */
  hoverScale?: number;
  /**
   * How the image fills its card
   * @default "cover"
   */
  imageFit?: "cover" | "contain";
  className?: string;
}

const cardVariants: Variants = {
  offHover: (angle: number) => ({
    rotateY: angle,
    z: 60, // Ensure card is in front of container plane (which blocks -Z events)
    opacity: 0.9,
    scale: 1,
    zIndex: 30, // Higher than potential overlays
    transition: {
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  }),
  onHover: (hoverScale: number) => ({
    rotateY: 0,
    z: 120, // Pop out further
    opacity: 1,
    scale: hoverScale,
    zIndex: 50,
    transition: {
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  }),
};

const AngledCard = ({
  item,
  angle,
  hoverScale,
  cardWidth,
  imageFit,
}: {
  item: AngledSliderProps["items"][number];
  angle: number;
  hoverScale: number;
  cardWidth: string;
  imageFit: "cover" | "contain";
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 group overflow-visible cursor-pointer"
      style={{
        width: cardWidth,
        height: "100%",
        transformStyle: "preserve-3d",
      }}
      custom={isHovered ? hoverScale : angle}
      variants={cardVariants}
      initial="offHover"
      animate={isHovered ? "onHover" : "offHover"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* The Image Card */}
      <div
        className="relative h-full w-full overflow-hidden border border-white/10 shadow-2xl"
        style={{ background: imageFit === "contain" ? "#f8f5ef" : undefined }}
      >
        <img
          src={item.url}
          alt={item.alt || "Slider Image"}
          className={cn(
            "absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110",
            imageFit === "cover" ? "object-cover" : "object-contain p-4"
          )}
        />
        {/* Optional Overlay/Title */}
        {item.title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="text-lg font-bold">{item.title}</h3>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const AngledSlider = ({
  items,
  speed = 40,
  direction = "left",
  containerHeight = "400px",
  cardWidth = "300px",
  gap = "40px",
  angle = 20,
  hoverScale = 1.05,
  imageFit = "cover",
  className,
}: AngledSliderProps) => {
  const [width, setWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate items for infinite loop effect
  // We need enough duplicates to fill the screen + buffer
  const duplicatedItems = [...items, ...items, ...items];

  useEffect(() => {
    const calculateWidth = () => {
      // Fallback to prop-based calculation if ref is not quite ready or layout is shifting
      // This is generally safer for known fixed-width items
      const numWidth = parseInt(cardWidth?.toString().replace("px", "") || "300");
      const numGap = parseInt(gap?.toString().replace("px", "") || "40");

      if (!isNaN(numWidth) && !isNaN(numGap)) {
        const calculatedWidth = (numWidth + numGap) * items.length;
        setWidth(calculatedWidth);
      } else if (containerRef.current) {
        const scrollWidth = containerRef.current.scrollWidth;
        setWidth(scrollWidth / 3);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, [items, cardWidth, gap]);

  useEffect(() => {
    if (width <= 0) return;

    const startX = direction === "left" ? 0 : -width;
    const endX = direction === "left" ? -width : 0;

    if (isHovered) return;

    const runAnimation = () => {
      const currentX = x.get();
      const totalDist = width;
      const dist = Math.abs(endX - currentX);
      const duration = speed * (dist / totalDist);

      const controls = animate(x, endX, {
        duration: duration,
        ease: "linear",
        onComplete: () => {
          x.set(startX);
          runAnimation();
        },
      });
      return controls;
    };

    const animation = runAnimation();

    return () => {
      animation.stop();
    };
  }, [width, speed, direction, isHovered, x]);

  return (
    <div
      className={cn("relative w-full overflow-hidden py-10", className)}
      style={{
        height: containerHeight,
        perspective: "1000px", // Essential for 3D effect
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex h-full items-center"
        style={{ x, gap, transformStyle: "preserve-3d" }}
      >
        {duplicatedItems.map((item, index) => (
          <AngledCard
            key={`${item.id}-${index}`}
            item={item}
            angle={angle}
            hoverScale={hoverScale}
            cardWidth={cardWidth}
            imageFit={imageFit}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default AngledSlider;
