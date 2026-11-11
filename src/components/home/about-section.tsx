import type { Person, StatItem } from "@/lib/schema";
import { User, Sparkles } from "lucide-react";

interface AboutSectionProps {
  person: Person;
  stats?: StatItem[];
}

export function AboutSection({ person }: AboutSectionProps) {
  return (
    <section id="about" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold">
            <User className="w-4 h-4" />
            <span>About Me</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl leading-tight">
            Building reliable web backends, intuitive UIs, and agent workflows.
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-muted leading-relaxed font-sans">
            {person.longBio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Current Focus Highlight Pill */}
          <div className="p-4 rounded-xl border border-accent/30 bg-accent/5 flex items-start gap-3 mt-6">
            <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-text font-mono leading-relaxed">
              <strong className="text-accent font-bold">Current Focus:</strong> Architecting
              zero-trust AI agent orchestration layers across 600+ microservice endpoints with
              strict caller-scoped RBAC, tenant isolation, and session token exchange.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
