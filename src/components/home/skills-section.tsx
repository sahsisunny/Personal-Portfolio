import type { Skills } from "@/lib/schema";
import { Cpu, BookOpen } from "lucide-react";

interface SkillsSectionProps {
  skills: Skills;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const getLevelBadge = (level: "daily" | "comfortable" | "learning") => {
    switch (level) {
      case "daily":
        return (
          <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-mono font-medium text-accent border border-accent/20">
            Daily
          </span>
        );
      case "comfortable":
        return (
          <span className="rounded bg-surface-2 px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted border border-border">
            Comfortable
          </span>
        );
      case "learning":
        return (
          <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-mono font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
            Learning
          </span>
        );
    }
  };

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
          Honest self-assessment: daily production tools, comfortable frameworks, and active learning areas.
        </p>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono mb-8 text-muted">
          <span>Proficiency:</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span>Daily production</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-muted" />
            <span>Comfortable</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Currently learning</span>
          </div>
        </div>

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
                      className="flex items-center justify-between rounded-lg bg-surface-2/50 px-3 py-2 text-sm text-text"
                    >
                      <span className="font-medium text-xs sm:text-sm">{item.name}</span>
                      {getLevelBadge(item.level)}
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
