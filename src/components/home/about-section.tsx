"use client";

import Link from "next/link";
import {
  User,
  MapPin,
  Laptop,
  Code2,
  Compass,
  Cpu,
  Bot,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Person, StatItem } from "@/lib/schema";

interface AboutSectionProps {
  person: Person;
  stats: StatItem[];
}

export function AboutSection({ person, stats }: AboutSectionProps) {
  const yearsStat = stats.find((s) => s.label.toLowerCase().includes("years"))?.value ?? "2+";
  const stackStat = stats.find((s) => s.label.toLowerCase().includes("stack"))?.value ?? "Next.js + Go";
  return (
    <section id="about" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Bio text (Left column) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              <User className="w-4 h-4" />
              <span>About Me</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl leading-tight">
              Building reliable web backends, intuitive UIs, and agent workflows.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed font-sans">
              {person.longBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Current Focus Highlight Pill */}
            <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-text font-mono leading-relaxed">
                <strong className="text-accent font-bold">Current Focus:</strong> Orchestrating
                LLM agents over 200+ internal backend APIs at Fountane, with strict verification
                and time-window accuracy.
              </div>
            </div>
          </div>

          {/* Right column: Futuristic Developer Signal HUD Card */}
          <div className="lg:col-span-5 space-y-4">
            <SpotlightCard className="p-6 sm:p-7 rounded-2xl border border-border bg-surface/90 shadow-lg backdrop-blur-sm space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/70 pb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                    Developer Signals
                  </div>
                  <h3 className="text-lg font-bold text-text mt-0.5">
                    {person.name}
                  </h3>
                </div>
                <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] font-mono text-muted border border-border">
                  {person.headline}
                </span>
              </div>

              {/* 2x2 Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Code2 className="w-3.5 h-3.5 text-accent" />
                    <span>Experience</span>
                  </div>
                  <div className="text-2xl font-extrabold text-text">{yearsStat} Yrs</div>
                  <div className="text-[10px] text-muted leading-tight">
                    Full-Stack in Production
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Cpu className="w-3.5 h-3.5 text-accent" />
                    <span>Stack</span>
                  </div>
                  <div className="text-lg font-bold text-text truncate">{stackStat}</div>
                  <div className="text-[10px] text-muted leading-tight">
                    Frontend & REST Services
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Bot className="w-3.5 h-3.5 text-accent" />
                    <span>AI Tooling</span>
                  </div>
                  <div className="text-2xl font-extrabold text-accent">200+</div>
                  <div className="text-[10px] text-muted leading-tight">
                    APIs Agent Orchestration
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-border bg-surface-2/50 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-muted">
                    <Compass className="w-3.5 h-3.5 text-accent" />
                    <span>Expeditions</span>
                  </div>
                  <div className="text-2xl font-extrabold text-text">15,480</div>
                  <div className="text-[10px] text-muted leading-tight">
                    Km Solo Touring
                  </div>
                </div>
              </div>

              {/* Stack Chips */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-muted uppercase tracking-wider">
                  Daily Production Toolkit
                </div>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {["Next.js 16", "Go", "TypeScript", "PostgreSQL", "Claude", "Tailwind"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-surface-2 px-2.5 py-1 text-text border border-border/80 text-[11px]"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Environment, Location & Status */}
              <div className="space-y-2.5 pt-4 border-t border-border/70 text-xs font-mono">
                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    Location
                  </span>
                  <span className="text-text font-semibold">{person.location}</span>
                </div>

                <div className="flex items-center justify-between text-muted">
                  <span className="flex items-center gap-1.5">
                    <Laptop className="w-3.5 h-3.5 text-accent" />
                    Work Setup
                  </span>
                  <span className="text-text font-semibold">{person.workMode}</span>
                </div>

                {/* Clean Availability Badge with live radar ping */}
                <div className="pt-2 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-muted text-[11px]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    Status
                  </span>
                  <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium font-mono text-center">
                    {person.availability.label}
                  </span>
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-2 flex items-center justify-between">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-accent hover:underline"
                >
                  <span>View Full Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/rides"
                  className="inline-flex items-center gap-1 text-xs font-mono text-muted hover:text-accent transition-colors"
                >
                  <span>Explore Rides</span>
                  <Compass className="w-3.5 h-3.5" />
                </Link>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
