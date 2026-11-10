"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { useScroll, motion, useSpring } from "motion/react";
import { highlightCode } from "@/lib/highlight";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  language: string;
  filename?: string;
  code: string;
}

export function CodeBlock({ language, filename, code }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightedHtml = React.useMemo(() => {
    return highlightCode(code.trim(), language);
  }, [code, language]);

  return (
    <div className="relative my-6 rounded-xl border border-border/70 bg-[#0d1117] text-[#e2e8f0] shadow-xs overflow-hidden font-mono text-xs sm:text-[13px]">
      {/* Code Header Bar: Minimal, quiet, developer-focused */}
      <div className="flex items-center justify-between border-b border-border/50 bg-[#161b22] px-4 py-2">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="text-xs text-muted/90 font-mono font-medium">
              {filename}
            </span>
          ) : (
            <span className="text-[11px] uppercase tracking-wider text-muted font-bold">
              {language}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-muted hover:text-white transition-colors focus:outline-none"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-muted" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body with syntax-colored tokens */}
      <pre className="p-4 sm:p-5 overflow-x-auto leading-relaxed font-mono text-xs sm:text-[13px] code-highlight">
        <code dangerouslySetInnerHTML={{ __html: highlightedHtml }} />
      </pre>
    </div>
  );
}

/**
 * Minimal top reading progress indicator
 */
export function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-50 pointer-events-none"
    />
  );
}

/**
 * Clean, modern Table of Contents with scrollspy and full heading readability
 */
export function TableOfContents({
  headings,
}: {
  headings: { id: string; text: string; level: number }[];
}) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -65% 0%", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl border border-border/80 bg-surface p-5 shadow-xs space-y-3.5"
    >
      <div className="flex items-center justify-between border-b border-border/50 pb-2.5">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          On This Page
        </span>
        <span className="text-[10px] font-mono text-muted/80">
          {headings.length} sections
        </span>
      </div>

      <div className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-1 space-y-1 scrollbar-thin">
        <ul className="space-y-1 border-l border-border/60 ml-1">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li
                key={h.id}
                className={cn(
                  "relative transition-all",
                  h.level === 3 ? "pl-5" : "pl-3.5"
                )}
              >
                {/* Active indicator bar on the left track */}
                {isActive && (
                  <span className="absolute -left-[1.5px] top-1.5 bottom-1.5 w-[2px] bg-accent rounded-full" />
                )}

                <a
                  href={`#${h.id}`}
                  onClick={(e) => handleClick(e, h.id)}
                  title={h.text}
                  className={cn(
                    "block py-1 text-left text-xs font-sans leading-snug transition-colors rounded-sm break-words",
                    h.level === 3 ? "text-[11.5px]" : "font-medium",
                    isActive
                      ? "text-accent font-semibold"
                      : "text-muted hover:text-text"
                  )}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
