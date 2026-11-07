import { GitPullRequest, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { OpenSource } from "@/lib/schema";

interface OpenSourceSectionProps {
  openSource: OpenSource[];
}

export function OpenSourceSection({ openSource }: OpenSourceSectionProps) {
  return (
    <section className="py-16 border-b border-border bg-surface-2/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
          <GitPullRequest className="w-4 h-4" />
          <span>Community Impact</span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-3">
          Open Source Contributions
        </h2>
        <p className="max-w-2xl text-muted text-base mb-8">
          Giving back through code, participating in distributed peer reviews, and shipping production features with open community teams.
        </p>

        <div className="space-y-6">
          {openSource.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-border bg-surface p-6 shadow-xs hover:border-accent/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-border/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent font-mono font-bold">
                    RDS
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-text">{item.org}</h3>
                    <p className="text-xs text-muted font-mono">{item.summary}</p>
                  </div>
                </div>

                {item.links.github && (
                  <a
                    href={item.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-accent hover:underline self-start sm:self-auto"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>View Organization</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {item.contributions.map((contribution, cIdx) => (
                  <div
                    key={cIdx}
                    className="flex items-center gap-2.5 rounded-lg bg-surface-2/60 px-3.5 py-2.5 text-xs text-text border border-border/50"
                  >
                    <GitPullRequest className="w-3.5 h-3.5 text-accent flex-shrink-0" />
                    <span>{contribution}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
