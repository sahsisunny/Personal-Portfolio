import { Clock } from "lucide-react";

interface NowSectionProps {
  now: {
    updated: string;
    items: string[];
  };
}

export function NowSection({ now }: NowSectionProps) {
  return (
    <section className="border-b border-border bg-surface-2/30 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-surface p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <h2 className="text-sm font-mono uppercase tracking-wider font-bold text-text">
                What I&apos;m focused on right now
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Updated {now.updated}</span>
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted">
            {now.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-accent mt-0.5 select-none font-mono">▸</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
