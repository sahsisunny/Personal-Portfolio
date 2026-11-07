"use client";

import * as React from "react";
import { useReducedMotion } from "motion/react";

/**
 * Atmospheric background animations for the Rides site:
 * - Rotating wireframe motorcycle spoked wheel & brake rotor
 * - Mechanical single-cylinder J-series engine piston stroke rhythm
 * - Road centerline dashes drifting downwards
 *
 * Built strictly with lightweight CSS transforms on the compositor thread.
 * Non-interactive (pointer-events-none) and respects prefers-reduced-motion.
 */
export function RiderBackgroundEffects() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-0 select-none"
    >
      {/* 1. Top-Right: Rotating Wireframe Motorcycle Spoked Wheel */}
      <div
        className={`absolute -top-24 -right-24 sm:-top-32 sm:-right-32 w-96 h-96 sm:w-[520px] sm:h-[520px] text-accent/15 dark:text-accent/20 transition-opacity duration-1000 ${
          prefersReducedMotion ? "" : "animate-[spin_40s_linear_infinite]"
        }`}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          {/* Outer Tire & Knobby Tread */}
          <circle cx="100" cy="100" r="94" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Alloy Rim */}
          <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="76" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" />

          {/* Disc Brake Rotor with Perforations */}
          <circle cx="100" cy="100" r="46" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="38" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />

          {/* Wheel Hub */}
          <circle cx="100" cy="100" r="22" stroke="currentColor" strokeWidth="3" />
          <circle cx="100" cy="100" r="10" fill="currentColor" fillOpacity="0.4" />
          <circle cx="100" cy="100" r="4" fill="currentColor" />

          {/* 36 Radial Spokes */}
          {Array.from({ length: 36 }).map((_, i) => {
            const angle = (i * 360) / 36;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 22 * Math.cos(rad);
            const y1 = 100 + 22 * Math.sin(rad);
            const x2 = 100 + 78 * Math.cos(rad + 0.15);
            const y2 = 100 + 78 * Math.sin(rad + 0.15);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.7"
              />
            );
          })}
        </svg>
      </div>

      {/* 2. Bottom-Left: Second Rotating Wheel for balanced symmetry */}
      <div
        className={`absolute -bottom-40 -left-40 sm:-bottom-52 sm:-left-52 w-96 h-96 sm:w-[500px] sm:h-[500px] text-accent/10 dark:text-accent/15 transition-opacity duration-1000 ${
          prefersReducedMotion ? "" : "animate-[spin_55s_linear_infinite_reverse]"
        }`}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
          <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="82" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="48" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="100" cy="100" r="6" fill="currentColor" fillOpacity="0.5" />

          {/* 24 Radial Spokes */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x1 = 100 + 20 * Math.cos(rad);
            const y1 = 100 + 20 * Math.sin(rad);
            const x2 = 100 + 80 * Math.cos(rad - 0.2);
            const y2 = 100 + 80 * Math.sin(rad - 0.2);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
            );
          })}
        </svg>
      </div>

      {/* 3. Center Drift: Highway Road Dashes Rolling Downwards */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 flex flex-col items-center justify-around opacity-15 dark:opacity-20 overflow-hidden">
        <div
          className={`h-[200%] w-0.5 bg-[repeating-linear-gradient(to_bottom,transparent,transparent_30px,currentColor_30px,currentColor_60px)] text-accent ${
            prefersReducedMotion ? "" : "animate-[road-drift_4s_linear_infinite]"
          }`}
        />
      </div>

      {/* 4. Ambient Radial Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] rounded-full bg-accent/5 blur-[120px]" />
    </div>
  );
}
