"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowDown, FileText, Mail, MapPin, Sparkles, Laptop } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import type { Person, Socials } from "@/lib/schema";

interface HeroSectionProps {
  person: Person;
  socials: Socials;
}

export function HeroSection({ person, socials }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 border-b border-border">
      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(79,70,229,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(129,140,248,0.12),rgba(11,15,23,0))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse items-center justify-between gap-12 lg:flex-row lg:items-start">
          {/* Main Info */}
          <div className="flex-1 text-center lg:text-left">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted shadow-xs mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>{person.availability.label}</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-text">
              Hey, I&apos;m <span className="text-accent">{person.name}</span>
            </h1>

            <div className="mt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="text-xl sm:text-2xl font-semibold text-text">
                {person.headline}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 text-xs font-semibold text-accent">
                <Sparkles className="w-3 h-3" />
                Promoted at Fountane
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted leading-relaxed">
              {person.tagline}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-muted font-mono">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-accent" />
                {person.location}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-accent" />
                {person.workMode} (Next.js + Go)
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast shadow-sm hover:opacity-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-text shadow-xs hover:bg-surface-2 hover:border-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <FileText className="w-4 h-4 text-muted" />
                <span>Resume</span>
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-muted hover:text-text hover:bg-surface-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-text hover:border-accent hover:bg-surface-2 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-text hover:border-accent hover:bg-surface-2 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {socials.x && (
                <a
                  href={socials.x}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-text hover:border-accent hover:bg-surface-2 transition-colors"
                  aria-label="X (Twitter) Profile"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${person.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted hover:text-text hover:border-accent hover:bg-surface-2 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Avatar / Portrait Card */}
          <div className="relative flex-shrink-0">
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60 rounded-2xl border-2 border-border/80 bg-gradient-to-br from-surface to-surface-2 p-1.5 shadow-xl">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-xl bg-surface-2 text-center overflow-hidden border border-border/40">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/15 text-accent font-mono text-3xl font-extrabold mb-2">
                  SS
                </div>
                <div className="px-3">
                  <div className="text-sm font-bold text-text">{person.name}</div>
                  <div className="text-xs text-muted font-mono mt-0.5">Patna, India</div>
                </div>
              </div>
            </div>

            {/* Floating Tag */}
            <div className="absolute -bottom-3 -right-2 rounded-lg border border-border bg-surface px-3 py-1.5 shadow-md flex items-center gap-2 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-text font-semibold">Next.js + Go</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
