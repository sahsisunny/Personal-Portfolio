import type { Skills } from "@/lib/schema";
import { Cpu, BookOpen } from "lucide-react";
import { SkillIcon } from "./skill-icons";

interface SkillsSectionProps {
  skills: Skills;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-border bg-surface-2/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
          <Cpu className="w-4 h-4" />
          <span>Technical Toolkit</span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-3">
          Skills & Technologies
        </h2>
        <p className="max-w-2xl text-muted text-base mb-10">
          Languages, frameworks, databases, and AI tooling I use to design and ship production software.
        </p>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.groups.map((group) => (
            <div
              key={group.id}
              className="rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-xs hover:border-accent/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border/70 pb-3 mb-4">
                  <h3 className="font-bold text-base text-text">{group.label}</h3>
                  <span className="text-xs font-mono text-muted">{group.items.length} items</span>
                </div>

                <div className="space-y-2.5">
                  {group.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-lg bg-surface-2/50 px-3.5 py-2.5 text-sm text-text border border-border/50 hover:border-accent/40 hover:bg-surface-2 transition-colors group"
                    >
                      <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-surface border border-border p-1 shadow-xs group-hover:scale-105 transition-transform">
                        <SkillIcon name={item.name} className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-xs sm:text-sm text-text leading-tight">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Currently Learning Row */}
        <div className="mt-8 rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm uppercase font-mono tracking-wider text-text">
                Currently Learning & Exploring
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.currentlyLearning.map((topic, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-3 py-1 text-xs font-mono"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
