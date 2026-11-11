import * as React from "react";
import type { Skills } from "@/lib/schema";
import { Cpu } from "lucide-react";

interface SkillsSectionProps {
  skills: Skills;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-border bg-surface-2/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Skills &amp; Technologies
          </h2>

          <p className="max-w-2xl text-muted text-base leading-relaxed">
            Languages, frameworks, databases, and tooling I use daily and comfortably in production.
          </p>
        </div>

        {/* Simple Multi-Column List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {skills.groups.map((group) => (
            <div
              key={group.id}
              className="rounded-2xl border border-border/80 bg-surface p-6 shadow-xs space-y-4"
            >
              <div className="border-b border-border/60 pb-3">
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-accent">
                  {group.label}
                </h3>
              </div>

              <ul className="space-y-2.5">
                {group.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm text-text">
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-accent/60 flex-shrink-0"
                    />
                    <span className="font-medium text-text leading-tight">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}