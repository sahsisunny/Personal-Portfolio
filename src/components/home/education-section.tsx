"use client";

import * as React from "react";
import Image from "next/image";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import type { Education } from "@/lib/schema";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Education
          </h2>
          <p className="mt-2 text-muted text-base max-w-xl">
            Academic foundation in core computer science, database systems, and software engineering.
          </p>
        </div>

        {/* Education List */}
        <div className="grid grid-cols-1 gap-6">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs hover:border-accent/40 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex items-start gap-4 sm:gap-5 min-w-0">
                  {/* University Logo */}
                  <div className="relative flex h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-2 overflow-hidden shadow-xs p-1.5">
                    {edu.logo ? (
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        width={64}
                        height={64}
                        className="h-full w-full object-contain rounded-xl"
                      />
                    ) : (
                      <GraduationCap className="w-8 h-8 text-accent" />
                    )}
                  </div>

                  {/* Institution & Degree */}
                  <div className="min-w-0 space-y-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-text">
                      {edu.institution}
                    </h3>
                    <p className="text-base text-accent font-semibold">
                      {edu.degree}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{edu.start} — {edu.end || "Present"}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                        <Award className="w-3.5 h-3.5" />
                        <span>Score: {edu.score}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topics / Learnings */}
              {edu.topics && edu.topics.length > 0 && (
                <div className="mt-6 pt-6 border-t border-border/60">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted mb-3 font-semibold uppercase tracking-wider">
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                    <span>Curriculum &amp; Technical Foundation:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {edu.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="rounded-lg bg-surface-2 px-3 py-1 text-xs font-mono text-muted border border-border/80"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

