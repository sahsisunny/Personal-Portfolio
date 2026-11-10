"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Check, Copy, Code, Eye, Workflow, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MermaidBlockProps {
  code: string;
}

export function MermaidBlock({ code }: MermaidBlockProps) {
  const { resolvedTheme } = useTheme();
  const [svgHtml, setSvgHtml] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<"diagram" | "code">("diagram");
  const [copied, setCopied] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const cleanCode = React.useMemo(() => {
    let text = code.trim();
    // Preprocess sequence diagrams: semicolons and markdown asterisks inside message labels break Mermaid parsing
    if (text.startsWith("sequenceDiagram")) {
      text = text
        .split("\n")
        .map((line) => {
          if (line.includes("->") || line.includes("-->")) {
            const colonIdx = line.indexOf(":");
            if (colonIdx !== -1) {
              const arrowPart = line.slice(0, colonIdx);
              const msgPart = line.slice(colonIdx + 1);
              const sanitizedMsg = msgPart
                .replace(/;/g, " - ")
                .replace(/\*\*(.*?)\*\*/g, "$1");
              return `${arrowPart}:${sanitizedMsg}`;
            }
          }
          return line;
        })
        .join("\n");
    }
    return text;
  }, [code]);

  React.useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      setIsLoading(true);
      setError(null);
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = resolvedTheme === "dark";

        mermaid.initialize({
          startOnLoad: false,
          suppressErrorRendering: true,
          theme: isDark ? "dark" : "default",
          securityLevel: "loose",
          fontFamily: "var(--font-sans), system-ui, sans-serif",
          themeVariables: isDark
            ? {
                darkMode: true,
                background: "#0d1117",
                primaryColor: "#1e293b",
                primaryTextColor: "#f1f5f9",
                primaryBorderColor: "#475569",
                lineColor: "#94a3b8",
                secondaryColor: "#0f172a",
                tertiaryColor: "#1e293b",
                edgeLabelBackground: "#0d1117",
                nodeTextColor: "#f1f5f9",
              }
            : {
                darkMode: false,
                background: "#ffffff",
                primaryColor: "#f1f5f9",
                primaryTextColor: "#0f172a",
                primaryBorderColor: "#cbd5e1",
                lineColor: "#64748b",
                secondaryColor: "#f8fafc",
                tertiaryColor: "#f1f5f9",
                edgeLabelBackground: "#ffffff",
                nodeTextColor: "#0f172a",
              },
        });

        const { svg } = await mermaid.render(id, cleanCode);

        if (isMounted) {
          setSvgHtml(svg);
          setIsLoading(false);
        }
      } catch (err: unknown) {
        // Clean up any error element Mermaid may have inserted into the DOM
        if (typeof document !== "undefined") {
          const errEl = document.getElementById(`d${id}`);
          if (errEl) errEl.remove();
        }

        if (isMounted) {
          console.warn("Failed to render Mermaid diagram:", err);
          setError(err instanceof Error ? err.message : "Failed to render diagram");
          setIsLoading(false);
          setActiveTab("code");
        }
      }
    }

    renderDiagram();

    return () => {
      isMounted = false;
    };
  }, [cleanCode, resolvedTheme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 rounded-xl border border-border/80 bg-surface shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/70 px-3.5 py-2">
        <div className="flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-mono font-medium text-text">Architecture Diagram</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Tab selector */}
          <div className="flex items-center rounded-lg bg-surface border border-border/60 p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("diagram")}
              disabled={Boolean(error)}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-0.5 text-[11px] transition-colors",
                activeTab === "diagram" && !error
                  ? "bg-accent/15 text-accent font-semibold"
                  : "text-muted hover:text-text disabled:opacity-50"
              )}
            >
              <Eye className="w-3 h-3" />
              <span>Diagram</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "flex items-center gap-1 rounded px-2 py-0.5 text-[11px] transition-colors",
                activeTab === "code"
                  ? "bg-accent/15 text-accent font-semibold"
                  : "text-muted hover:text-text"
              )}
            >
              <Code className="w-3 h-3" />
              <span>Source</span>
            </button>
          </div>

          {/* Copy Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs font-mono text-muted hover:text-text transition-colors"
            aria-label="Copy diagram source"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400 font-medium">Copied</span>
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

      {/* Body */}
      {activeTab === "diagram" && !error ? (
        <div className="p-4 sm:p-6 overflow-x-auto flex items-center justify-center min-h-[180px] bg-surface/50">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2 text-muted text-xs font-mono py-8">
              <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              <span>Rendering diagram...</span>
            </div>
          ) : (
            <div
              ref={containerRef}
              className="mermaid-svg-container w-full max-w-full flex justify-center [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:rounded-lg"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          )}
        </div>
      ) : (
        <div className="relative">
          {error && (
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 border-b border-border/60 text-xs font-mono">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Preview unavailable for this syntax. Showing diagram source.</span>
            </div>
          )}
          <pre className="p-4 sm:p-5 overflow-x-auto leading-relaxed font-mono text-xs sm:text-[13px] bg-[#0d1117] text-[#e2e8f0]">
            <code>{cleanCode}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
