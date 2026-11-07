"use client";

import * as React from "react";
import Image from "next/image";
import { Briefcase, Calendar, ChevronDown, ChevronUp, Sparkles, ExternalLink, Building2 } from "lucide-react";
import type { Experience } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

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

        {/* Timeline */}
        <div className="relative border-l-2 border-border/80 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-12">
          {experience.map((exp) => {
            const isExpanded = !!expanded[exp.id];
            const hasMultipleRoles = exp.roles.length > 1;

            return (
              <div key={exp.id} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-surface shadow-xs">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>

                {/* Card */}
                <div className="rounded-xl border border-border bg-surface p-5 sm:p-7 shadow-xs hover:border-accent/50 transition-colors">
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
                        {/* Promoted indicator for Associate role at Fountane */}
                        {roleIdx === 0 && hasMultipleRoles && (
                          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-3 py-0.5 text-xs font-semibold mb-2">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span>Promoted to Associate Full Stack Developer</span>
                          </div>
                        )}

                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h4 className="text-base font-semibold text-text">
                            {role.title}
                          </h4>
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
