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
 * Clean, quiet Table of Contents
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
      { rootMargin: "0% 0% -60% 0%" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="rounded-xl border border-border bg-surface p-5 shadow-xs space-y-3 sticky top-24">
      <div className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
        On This Page
      </div>
      <ul className="space-y-1.5 text-xs font-mono">
        {headings.map((h) => (
          <li
            key={h.id}
            className={cn(h.level === 3 && "pl-3 text-[11px]")}
          >
            <a
              href={`#${h.id}`}
              className={cn(
                "block py-0.5 transition-colors truncate",
                activeId === h.id
                  ? "text-accent font-semibold"
                  : "text-muted hover:text-text"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
