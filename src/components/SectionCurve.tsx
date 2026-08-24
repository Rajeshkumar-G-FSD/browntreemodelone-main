/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface SectionCurveProps {
  fromColor: string;
  toColor: string;
}

/** Organic wave divider bridging two adjacent sections' background colors. */
export default function SectionCurve({ fromColor, toColor }: SectionCurveProps) {
  return (
    <div
      className="relative overflow-hidden pointer-events-none select-none"
      style={{ background: fromColor }}
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        className="relative block w-full h-[40px] sm:h-[80px] md:h-[120px]"
      >
        <path d="M0,120 Q720,0 1440,120 Z" fill={toColor} />
      </svg>
    </div>
  );
}
