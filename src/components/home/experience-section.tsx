"use client";

import * as React from "react";
import Image from "next/image";
import { Briefcase, Calendar, ChevronDown, ChevronUp, ExternalLink, Building2 } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
} from "motion/react";
import type { Experience } from "@/lib/schema";
import { formatDate, cn } from "@/lib/utils";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  // Keep track of which companies are expanded
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    fountane: true, // open by default
  });

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const timelineRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  // Track scroll progress along the timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 65%"],
  });

  const prefersReducedMotion = useReducedMotion();

  // Smooth the scroll progress with a gentle spring for natural momentum
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 28,
    restDelta: 0.001,
  });

  const scaleY = useTransform(smoothProgress, [0, 1], [0, 1], { clamp: true });
  const thumbTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"], { clamp: true });
  const thumbOpacity = useTransform(smoothProgress, [0, 0.02], [0, 1], { clamp: true });

  // Store normalized threshold (0..1) for each timeline node
  const [thresholds, setThresholds] = React.useState<number[]>([]);
  const [activeItems, setActiveItems] = React.useState<boolean[]>(() =>
    experience.map((_, i) => i === 0)
  );

  const updateThresholds = React.useCallback(() => {
    if (!timelineRef.current) return;
    const containerHeight = timelineRef.current.offsetHeight;
    if (containerHeight <= 0) return;

    const newThresholds = itemRefs.current.map((item, idx) => {
      if (!item) return idx / Math.max(1, experience.length - 1);
      // Node is positioned at top-4 (16px) with 24px diameter -> center is at 28px from item top
      const nodeCenterY = item.offsetTop + 28;
      return Math.max(0, Math.min(1, nodeCenterY / containerHeight));
    });

    setThresholds(newThresholds);
  }, [experience.length]);

  React.useEffect(() => {
    updateThresholds();

    const resizeObserver = new ResizeObserver(() => {
      updateThresholds();
    });

    if (timelineRef.current) {
      resizeObserver.observe(timelineRef.current);
    }

    window.addEventListener("resize", updateThresholds);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateThresholds);
    };
  }, [updateThresholds]);

  // Re-calculate thresholds if a card expands/collapses
  React.useEffect(() => {
    const id = requestAnimationFrame(updateThresholds);
    return () => cancelAnimationFrame(id);
  }, [expanded, updateThresholds]);

  // Update active state of nodes as the slider descends/ascends
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (thresholds.length === 0) return;

    setActiveItems((prev) => {
      const next = thresholds.map((t, idx) => {
        // Node 0 activates as soon as scroll enters section
        if (idx === 0) return latest >= 0.01;
        // Other nodes activate when slider reaches their threshold (with a small margin)
        return latest >= t - 0.01;
      });

      const hasChanged = next.some((val, i) => val !== prev[i]);
      return hasChanged ? next : prev;
    });
  });

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
          <Briefcase className="w-4 h-4" />
          <span>Career Journey</span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-4">
          Work Experience
        </h2>
        <p className="max-w-2xl text-muted text-base mb-12">
          From open-source foundations to owning end-to-end features and backend services at Fountane.
        </p>

        {/* Timeline Container */}
        <div
          ref={timelineRef}
          className="relative pl-6 sm:pl-10 ml-1 sm:ml-4 space-y-8 sm:space-y-12"
        >
          {/* Timeline Slider Track */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-3 bottom-6 w-0.5 -translate-x-1/2 pointer-events-none"
          >
            {/* Static background track */}
            <div className="w-full h-full bg-border/70 rounded-full" />

            {/* Reactive active progress fill */}
            <motion.div
              style={{
                scaleY: prefersReducedMotion ? 1 : scaleY,
                transformOrigin: "top",
              }}
              className="absolute inset-0 w-full bg-gradient-to-b from-accent via-accent to-accent-2 rounded-full shadow-[0_0_10px_var(--color-accent)] origin-top z-10"
            />

            {/* Reactive Slider Thumb / Glowing Head */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  top: thumbTop,
                  opacity: thumbOpacity,
                }}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none"
              >
                <div className="relative flex items-center justify-center">
                  <div className="h-3.5 w-3.5 rounded-full bg-accent border-2 border-surface shadow-[0_0_12px_var(--color-accent)]" />
                  <div className="absolute h-5 w-5 rounded-full bg-accent/35 animate-ping" />
                </div>
              </motion.div>
            )}
          </div>

          {experience.map((exp, idx) => {
            const isExpanded = !!expanded[exp.id];
            const hasMultipleRoles = exp.roles.length > 1;
            const isActive = prefersReducedMotion ? true : !!activeItems[idx];

            return (
              <div
                key={exp.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                className="relative group"
              >
                {/* Timeline node */}
                <button
                  type="button"
                  onClick={() => {
                    itemRefs.current[idx]?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }}
                  aria-label={`Jump to ${exp.company}`}
                  className="absolute -left-6 sm:-left-10 top-4 -translate-x-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-surface transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer group/node"
                >
                  <div
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isActive
                        ? "border-accent bg-surface shadow-[0_0_12px_rgba(79,70,229,0.35)] ring-4 ring-accent/20 scale-105"
                        : "border-border/80 bg-surface-2 group-hover/node:border-accent/50 scale-100"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-full transition-all duration-300",
                        isActive
                          ? "h-2 w-2 bg-accent shadow-[0_0_6px_var(--color-accent)] scale-110"
                          : "h-1.5 w-1.5 bg-muted/40 group-hover/node:bg-muted/70 scale-90"
                      )}
                    />
                  </div>
                </button>

                {/* Card */}
                <div
                  className={cn(
                    "rounded-xl border bg-surface p-4 sm:p-7 shadow-xs transition-all duration-300",
                    isActive
                      ? "border-accent/60 shadow-[0_4px_24px_-6px_rgba(79,70,229,0.18)]"
                      : "border-border hover:border-accent/40"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                      {/* Company Logo */}
                      <div className="relative flex h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 overflow-hidden shadow-xs p-1.5">
                        {exp.logo ? (
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={56}
                            height={56}
                            className="h-full w-full object-contain rounded-lg"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-muted" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-bold text-text">
                            {exp.company}
                          </h3>
                          {exp.companyUrl && (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted hover:text-accent transition-colors"
                              aria-label={`Visit ${exp.company} website`}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-mono text-muted border border-border">
                            {exp.employmentType}
                          </span>
                          {exp.current && (
                            <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-medium font-mono">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted font-mono mt-1">
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-muted bg-surface-2 px-3 py-1.5 rounded-md border border-border inline-flex items-center gap-1.5 self-start flex-shrink-0">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {formatDate(exp.start)} — {exp.end ? formatDate(exp.end) : "Present"}
                      </span>
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="space-y-6 mt-6">
                    {exp.roles.map((role, roleIdx) => (
                      <div
                        key={roleIdx}
                        className={
                          hasMultipleRoles && roleIdx > 0
                            ? "pt-6 border-t border-border/60 relative"
                            : "relative"
                        }
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-semibold text-text">
                              {role.title}
                            </h4>
                            {roleIdx === 0 && hasMultipleRoles && (
                              <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold">
                                Promoted
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-mono text-muted">
                            {formatDate(role.start)} — {role.end ? formatDate(role.end) : "Present"}
                          </span>
                        </div>

                        {/* Highlights list */}
                        <ul className="mt-3 space-y-2 text-sm text-muted">
                          {(isExpanded ? role.highlights : role.highlights.slice(0, 2)).map(
                            (hl, hlIdx) => (
                              <li key={hlIdx} className="flex items-start gap-2.5">
                                <span className="text-accent mt-1 select-none font-mono">▸</span>
                                <span className="leading-relaxed">{hl}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Toggle expand button if many highlights */}
                  <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-surface-2 px-2 py-0.5 text-xs font-mono text-muted border border-border/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleExpand(exp.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline focus-visible:outline-none"
                    >
                      <span>{isExpanded ? "Show fewer details" : "Show all achievements"}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
