"use client";

import * as React from "react";
import Link from "next/link";
import { FileText, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import type { Person, Socials, FeatureFlags } from "@/lib/schema";

interface HeroSectionProps {
  person: Person;
  socials: Socials;
  features?: FeatureFlags;
}

export function HeroSection({ person, socials, features }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-36 border-b border-border">
      {/* Subtle background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(46,124,134,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Availability */}
        <div className="flex items-center gap-2 mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-medium text-muted shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>{person.availability.label}</span>
          </div>
        </div>

        {/* Name + Role */}
        <div className="space-y-3 mb-8">
          <h1
            className="font-display text-6xl sm:text-8xl lg:text-[9rem] text-text leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-barlow-condensed)" }}
          >
            {person.name}
          </h1>
          <p className="text-xl sm:text-2xl text-muted font-medium max-w-xl">
            {person.headline}
          </p>
        </div>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-muted max-w-lg leading-relaxed mb-10">
          {person.tagline}
        </p>

        {/* Location & Work Mode */}
        <div className="flex items-center gap-1.5 text-sm text-muted mb-10">
          <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
          <span>
            Based in {person.location}. Open to remote, hybrid &amp; on-site opportunities.
          </span>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          {(features?.projects ?? true) && (
            <Link
              href="#projects"
              className="inline-flex items-center justify-center rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast shadow-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              View projects
            </Link>
          )}
          {(features?.resume ?? true) && (
            <a
              href="/resume.pdf"
              download="Sunny_Sahsi_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-6 py-3 text-sm font-semibold text-text hover:bg-surface-2 hover:border-accent/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer"
            >
              <FileText className="w-4 h-4 text-muted" />
              Download resume
            </a>
          )}
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-2">
          {socials.github && (
            <a
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-text hover:border-accent/60 transition-colors"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {socials.linkedin && (
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-text hover:border-accent/60 transition-colors"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
          )}
          {socials.x && (
            <a
              href={socials.x}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-text hover:border-accent/60 transition-colors"
              aria-label="X (Twitter) profile"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
