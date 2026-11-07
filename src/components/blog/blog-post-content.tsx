"use client";

import * as React from "react";
import {
  Check,
  Copy,
  Terminal,
  FileCode,
  Lightbulb,
  AlertTriangle,
  Layers,
  Sparkles,
} from "lucide-react";
import { useScroll, motion, useSpring } from "motion/react";
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

  return (
    <div className="relative my-6 rounded-2xl border border-border bg-surface-2/90 shadow-md overflow-hidden font-mono text-xs sm:text-sm">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-border/80 bg-surface px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          {filename ? (
            <span className="flex items-center gap-1.5 text-xs text-text font-semibold">
              <FileCode className="w-3.5 h-3.5 text-accent" />
              {filename}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-muted">
              <Terminal className="w-3 h-3 text-accent" />
              {language}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-surface-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted border border-border">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted hover:text-text hover:bg-surface-2 transition-colors focus:outline-none"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[11px] text-emerald-500 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span className="text-[11px]">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <pre className="p-4 sm:p-5 overflow-x-auto text-text leading-relaxed font-mono text-xs sm:text-[13px]">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

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
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent to-accent-2 z-50 pointer-events-none"
    />
  );
}

export function ExecutiveSummaryCallout({
  takeaways,
}: {
  takeaways: { icon?: string; title: string; desc: string }[];
}) {
  return (
    <div className="my-8 rounded-2xl border-2 border-accent/40 bg-accent/5 p-6 sm:p-7 shadow-xs space-y-4">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-bold">
        <Sparkles className="w-4 h-4" />
        <span>Executive Summary & Key Shifts</span>
      </div>
      <p className="text-sm sm:text-base text-text leading-relaxed font-sans">
        Moving from Junior to Associate Full Stack Developer is not about typing speed or mastering syntax.
        It is fundamentally a mindset shift from completing isolated tickets to owning production feature
        lifecycles end-to-end.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
        {takeaways.map((item, i) => (
          <div key={i} className="p-3.5 rounded-xl border border-accent/20 bg-surface/80 space-y-1">
            <div className="font-bold text-accent">{item.title}</div>
            <div className="text-[11px] text-muted leading-tight font-sans">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <div className="my-8 rounded-2xl border border-border bg-surface p-6 shadow-md space-y-4">
      <div className="flex items-center justify-between border-b border-border/70 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-accent" />
          <h4 className="font-mono text-xs uppercase font-bold text-text">
            System Architecture: End-to-End Feature Ownership
          </h4>
        </div>
        <span className="text-[10px] font-mono text-muted uppercase">Production Flow</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
        <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1.5 text-center">
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent font-bold">
            01 • INTENT
          </span>
          <div className="font-bold text-text mt-1">User & Business Spec</div>
          <p className="text-[11px] text-muted font-sans">
            Edge-case scoping & RBAC permission bounds before coding.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1.5 text-center">
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent font-bold">
            02 • GO BACKEND
          </span>
          <div className="font-bold text-text mt-1">Concurrency & Transactions</div>
          <p className="text-[11px] text-muted font-sans">
            Idempotent webhooks, database locks, and strict error propagation.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1.5 text-center">
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent font-bold">
            03 • FRONTEND
          </span>
          <div className="font-bold text-text mt-1">Next.js & Resilient UI</div>
          <p className="text-[11px] text-muted font-sans">
            Optimistic state, error boundaries, and accessible state feedback.
          </p>
        </div>

        <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1.5 text-center">
          <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] text-accent font-bold">
            04 • TELEMETRY
          </span>
          <div className="font-bold text-text mt-1">Audit & Observability</div>
          <p className="text-[11px] text-muted font-sans">
            Structured logs, metrics, and adversarial AI code verification.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ComparisonTable() {
  const rows = [
    {
      dimension: "Feature Scope",
      junior: "Completes discrete Jira checklist items (UI component, API call).",
      associate: "Owns feature lifecycle from customer intent to production observability.",
      outcome: "Zero unhandled edge cases or out-of-order race conditions.",
    },
    {
      dimension: "Backend Architecture",
      junior: "Basic CRUD endpoints relying on ORM defaults and framework magic.",
      associate: "Go microservices, goroutine concurrency, connection pooling, and atomic DB transactions.",
      outcome: "High throughput, sub-50ms latency, and crash resilience.",
    },
    {
      dimension: "AI Tooling (Claude/Cursor)",
      junior: "Blind copy-pasting generated code without boundary verification.",
      associate: "Treats AI as an intern: rigorously audits SQL, types, and invariants before merge.",
      outcome: "Faster delivery without shipping hallucinations or security flaws.",
    },
    {
      dimension: "Security & RBAC",
      junior: "Hides UI elements using frontend conditional rendering.",
      associate: "Enforces strict RBAC and token validation at the API gateway and DB query layer.",
      outcome: "Guaranteed tenant isolation and zero unauthorized access.",
    },
  ];

  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-border bg-surface shadow-xs">
      <table className="w-full text-left text-xs sm:text-sm font-sans">
        <thead className="border-b border-border bg-surface-2/70 font-mono text-[11px] uppercase tracking-wider text-muted">
          <tr>
            <th className="p-4">Dimension</th>
            <th className="p-4 text-muted">Junior Mindset</th>
            <th className="p-4 text-accent font-bold">Associate Engineer Shift</th>
            <th className="p-4 hidden sm:table-cell">Production Impact</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {rows.map((row, idx) => (
            <tr key={idx} className="hover:bg-surface-2/30 transition-colors">
              <td className="p-4 font-mono font-bold text-text text-xs whitespace-nowrap">
                {row.dimension}
              </td>
              <td className="p-4 text-muted text-xs leading-relaxed">{row.junior}</td>
              <td className="p-4 text-text font-medium text-xs leading-relaxed bg-accent/5">
                {row.associate}
              </td>
              <td className="p-4 text-muted text-xs leading-relaxed hidden sm:table-cell">
                {row.outcome}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AlertBox({
  type = "tip",
  title,
  children,
}: {
  type?: "tip" | "warning" | "note";
  title: string;
  children: React.ReactNode;
}) {
  const isTip = type === "tip";
  const isWarning = type === "warning";

  return (
    <div
      className={cn(
        "my-6 rounded-xl border p-5 text-sm leading-relaxed space-y-1.5",
        isTip && "border-emerald-500/30 bg-emerald-500/5 text-emerald-950 dark:text-emerald-100",
        isWarning && "border-amber-500/30 bg-amber-500/5 text-amber-950 dark:text-amber-100",
        type === "note" && "border-accent/30 bg-accent/5 text-text"
      )}
    >
      <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide">
        {isTip && <Lightbulb className="w-4 h-4 text-emerald-500" />}
        {isWarning && <AlertTriangle className="w-4 h-4 text-amber-500" />}
        {!isTip && !isWarning && <Sparkles className="w-4 h-4 text-accent" />}
        <span>{title}</span>
      </div>
      <div className="text-muted text-xs sm:text-sm font-sans">{children}</div>
    </div>
  );
}

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
    <nav className="rounded-2xl border border-border bg-surface p-5 shadow-xs space-y-3 sticky top-24">
      <div className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
        Table of Contents
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
                  ? "text-accent font-bold"
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
