"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  innerSize?: string;
  outerSize?: string;
}

/**
 * Modern interactive spotlight card based on CSS masks and pointer tracking.
 * Adheres to Modern Web Guidance: non-essential enhancement, pointer-events: none,
 * and maintains full keyboard accessibility.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "rgba(129, 140, 248, 0.15)", // Indigo accent glow
  outerSize = "280px",
  ...props
}: SpotlightCardProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    containerRef.current.style.setProperty("--mouse-x", `${x}px`);
    containerRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      className={cn(
        "relative rounded-xl border border-border bg-surface transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Spotlight highlight layer (purely decorative, pointer-events-none) */}
      <div
        aria-hidden="true"
        style={{
          background: `radial-gradient(${outerSize} circle at var(--mouse-x, -100px) var(--mouse-y, -100px), ${spotlightColor}, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
        className="pointer-events-none absolute -inset-px rounded-xl transition-opacity duration-300 z-0"
      />

      {/* Card Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
