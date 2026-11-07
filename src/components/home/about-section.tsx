import type { Person, StatItem } from "@/lib/schema";
import { User } from "lucide-react";

interface AboutSectionProps {
  person: Person;
  stats: StatItem[];
}

export function AboutSection({ person, stats }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Bio text */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              <User className="w-4 h-4" />
              <span>About Me</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-text">
              Building reliable web backends, intuitive UIs, and agent workflows.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed">
              {person.longBio.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Stat row / Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl border border-border bg-surface p-6 shadow-xs">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-bold mb-4">
                Key Metrics
              </h3>
              <div className="space-y-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="border-b border-border/60 pb-4 last:border-none last:pb-0">
                    <div className="text-2xl sm:text-3xl font-extrabold text-text font-mono">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface-2/60 p-5 text-xs text-muted font-mono space-y-2">
              <div className="flex justify-between">
                <span>Location:</span>
                <span className="text-text font-semibold">{person.location}</span>
              </div>
              <div className="flex justify-between">
                <span>Work setup:</span>
                <span className="text-text font-semibold">{person.workMode}</span>
              </div>
              <div className="flex justify-between">
                <span>Availability:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {person.availability.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
