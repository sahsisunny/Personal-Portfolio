"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Check,
  Copy,
  Code,
  Eye,
  Workflow,
  AlertCircle,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
} from "lucide-react";
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
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [zoomLevel, setZoomLevel] = React.useState(1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const isDark = resolvedTheme ? resolvedTheme === "dark" : true;

  const cleanCode = React.useMemo(() => {
    let text = code.trim();

    // Preprocess sequence diagrams:
    // 1. Unescaped semicolons and markdown asterisks break Mermaid parsing
    // 2. Light hardcoded rect backgrounds (e.g. rect rgb(240,248,255)) become unreadable in dark mode
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

      if (isDark) {
        text = text
          .replace(/rect\s+rgb\(\s*24[0-9]\s*,\s*24[0-9]\s*,\s*25[0-9]\s*\)/gi, "rect rgba(30, 41, 59, 0.45)")
          .replace(/rect\s+rgb\(\s*25[0-9]\s*,\s*24[0-9]\s*,\s*24[0-9]\s*\)/gi, "rect rgba(55, 48, 163, 0.25)")
          .replace(/rect\s+rgb\(\s*25[0-5]\s*,\s*25[0-5]\s*,\s*25[0-5]\s*\)/gi, "rect rgba(30, 41, 59, 0.45)");
      }
    }

    return text;
  }, [code, isDark]);

  React.useEffect(() => {
    let isMounted = true;

    async function renderDiagram() {
      setIsLoading(true);
      setError(null);
      const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

      try {
        const mermaid = (await import("mermaid")).default;

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
                mainBkg: "#0d1117",
                primaryColor: "#1e293b",
                primaryTextColor: "#f8fafc",
                primaryBorderColor: "#475569",
                lineColor: "#94a3b8",
                secondaryColor: "#0f172a",
                secondaryTextColor: "#f8fafc",
                tertiaryColor: "#1e293b",
                tertiaryTextColor: "#f8fafc",
                edgeLabelBackground: "#0d1117",
                nodeTextColor: "#f8fafc",
                titleColor: "#f8fafc",
                textColor: "#e2e8f0",
                // Sequence diagram variables
                actorTextColor: "#f8fafc",
                actorBorder: "#475569",
                actorBkg: "#1e293b",
                actorLineColor: "#475569",
                signalColor: "#cbd5e1",
                signalTextColor: "#f8fafc",
                labelBoxBkgColor: "#1e293b",
                labelBoxBorderColor: "#475569",
                labelTextColor: "#f8fafc",
                loopTextColor: "#f8fafc",
                noteBkgColor: "#1e293b",
                noteBorderColor: "#475569",
                noteTextColor: "#f8fafc",
                activationBorderColor: "#3b82f6",
                activationBkgColor: "#1e3a8a",
                sequenceNumberColor: "#ffffff",
                rectBkgColor: "rgba(30, 41, 59, 0.45)",
                // Mindmap root & branch node variables
                git0: "#2563eb",
                gitBranchLabel0: "#ffffff",
                gitBranchLabel1: "#ffffff",
                gitBranchLabel2: "#ffffff",
                gitBranchLabel3: "#ffffff",
                scaleLabelColor: "#ffffff",
                cScale0: "#1e3a5f",
                cScale1: "#0f766e",
                cScale2: "#831843",
                cScale3: "#1e3a8a",
                cScale4: "#701a75",
                cScale5: "#854d0e",
                cScale6: "#3730a3",
                cScale7: "#155e75",
                cScaleLabel0: "#ffffff",
                cScaleLabel1: "#ffffff",
                cScaleLabel2: "#ffffff",
                cScaleLabel3: "#ffffff",
                cScaleLabel4: "#ffffff",
                cScaleLabel5: "#ffffff",
                cScaleLabel6: "#ffffff",
                cScaleLabel7: "#ffffff",
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
                scaleLabelColor: "#0f172a",
                gitBranchLabel0: "#0f172a",
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
  }, [cleanCode, isDark]);

  // Lock body scroll and listen for Escape key when fullscreen
  React.useEffect(() => {
    if (!isFullscreen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-8 rounded-xl border border-border/80 bg-surface shadow-xs overflow-hidden">
      {/* Scoped CSS for high-contrast, beautiful diagrams in dark & light themes */}
      <style>{`
        /* Dark mode overrides */
        .dark .mermaid-svg-container text,
        .dark .mermaid-svg-container tspan,
        .dark .mermaid-svg-container span {
          fill: #f8fafc !important;
          color: #f8fafc !important;
        }

        /* Mindmap nodes and labels */
        .dark .mermaid-svg-container .mindmap-node text,
        .dark .mermaid-svg-container .mindmap-node span,
        .dark .mermaid-svg-container .mindmap-node tspan,
        .dark .mermaid-svg-container .section-root text,
        .dark .mermaid-svg-container .section-root span,
        .dark .mermaid-svg-container [class*="section-"] text,
        .dark .mermaid-svg-container [class*="section-"] span {
          fill: #ffffff !important;
          color: #ffffff !important;
          font-weight: 500 !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.7);
        }
        .dark .mermaid-svg-container .section-root circle,
        .dark .mermaid-svg-container .section-root rect {
          fill: #2563eb !important;
          stroke: #3b82f6 !important;
        }
        .dark .mermaid-svg-container .section-0 circle,
        .dark .mermaid-svg-container .section-0 rect,
        .dark .mermaid-svg-container .section-0 path,
        .dark .mermaid-svg-container .section-0 polygon {
          fill: #0f766e !important;
          stroke: #14b8a6 !important;
        }
        .dark .mermaid-svg-container .section-1 circle,
        .dark .mermaid-svg-container .section-1 rect,
        .dark .mermaid-svg-container .section-1 path,
        .dark .mermaid-svg-container .section-1 polygon {
          fill: #831843 !important;
          stroke: #f43f5e !important;
        }
        .dark .mermaid-svg-container .section-2 circle,
        .dark .mermaid-svg-container .section-2 rect,
        .dark .mermaid-svg-container .section-2 path,
        .dark .mermaid-svg-container .section-2 polygon {
          fill: #1e3a8a !important;
          stroke: #3b82f6 !important;
        }
        .dark .mermaid-svg-container .section-3 circle,
        .dark .mermaid-svg-container .section-3 rect,
        .dark .mermaid-svg-container .section-3 path,
        .dark .mermaid-svg-container .section-3 polygon {
          fill: #701a75 !important;
          stroke: #c026d3 !important;
        }
        .dark .mermaid-svg-container .edge,
        .dark .mermaid-svg-container .mindmap-edge {
          stroke: #64748b !important;
          stroke-width: 2px !important;
        }

        /* Sequence diagram overrides */
        .dark .mermaid-svg-container rect[fill*="240"],
        .dark .mermaid-svg-container rect[fill*="255"],
        .dark .mermaid-svg-container rect[fill*="rgb(240"],
        .dark .mermaid-svg-container rect[fill*="rgb(255"],
        .dark .mermaid-svg-container .rect {
          fill: rgba(30, 41, 59, 0.45) !important;
          stroke: rgba(148, 163, 184, 0.3) !important;
        }
        .dark .mermaid-svg-container .messageText {
          fill: #f8fafc !important;
          stroke: none !important;
          font-weight: 500 !important;
        }
        .dark .mermaid-svg-container .messageLine0,
        .dark .mermaid-svg-container .messageLine1 {
          stroke: #94a3b8 !important;
        }
        .dark .mermaid-svg-container .note {
          fill: #1e293b !important;
          stroke: #475569 !important;
        }
        .dark .mermaid-svg-container .noteText,
        .dark .mermaid-svg-container .noteText > tspan {
          fill: #f8fafc !important;
          color: #f8fafc !important;
          font-weight: 600 !important;
        }
        .dark .mermaid-svg-container .actor {
          fill: #1e293b !important;
          stroke: #475569 !important;
        }
        .dark .mermaid-svg-container text.actor > tspan,
        .dark .mermaid-svg-container .actor text,
        .dark .mermaid-svg-container .actor span {
          fill: #f8fafc !important;
          color: #f8fafc !important;
          font-weight: 600 !important;
        }
        .dark .mermaid-svg-container .actor-line {
          stroke: #334155 !important;
        }

        /* Flowchart nodes and clusters */
        .dark .mermaid-svg-container .node rect,
        .dark .mermaid-svg-container .node circle,
        .dark .mermaid-svg-container .node polygon,
        .dark .mermaid-svg-container .node path {
          fill: #1e293b !important;
          stroke: #475569 !important;
        }
        .dark .mermaid-svg-container .node text,
        .dark .mermaid-svg-container .node span,
        .dark .mermaid-svg-container .label text,
        .dark .mermaid-svg-container .label span {
          fill: #f8fafc !important;
          color: #f8fafc !important;
          font-weight: 500 !important;
        }
        .dark .mermaid-svg-container .cluster rect {
          fill: rgba(15, 23, 42, 0.6) !important;
          stroke: #334155 !important;
        }
        .dark .mermaid-svg-container .cluster-label span,
        .dark .mermaid-svg-container .cluster-label text {
          fill: #94a3b8 !important;
          color: #94a3b8 !important;
          font-weight: 600 !important;
        }
        .dark .mermaid-svg-container .edgePath path {
          stroke: #64748b !important;
        }
        .dark .mermaid-svg-container .edgeLabel {
          background-color: #0b0f17 !important;
          color: #cbd5e1 !important;
          fill: #cbd5e1 !important;
        }
      `}</style>

      {/* Header Bar */}
      <div className="flex items-center justify-between border-b border-border/60 bg-surface-2/70 px-3.5 py-2">
        <div className="flex items-center gap-2">
          <Workflow className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs font-mono font-medium text-text">Architecture Diagram</span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
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

          {/* Enlarge Modal Button */}
          {activeTab === "diagram" && !error && svgHtml && (
            <button
              type="button"
              onClick={() => {
                setIsFullscreen(true);
                setZoomLevel(1);
              }}
              className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-mono text-muted hover:text-accent hover:bg-surface border border-transparent hover:border-border transition-colors"
              title="View in large modal window"
              aria-label="View diagram in large modal"
            >
              <Maximize2 className="w-3 h-3 text-accent" />
              <span className="hidden sm:inline text-[11px]">Enlarge</span>
            </button>
          )}

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
        <div className="relative p-4 sm:p-6 overflow-x-auto flex items-center justify-center min-h-[180px] bg-surface/50">
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

      {/* Centered Large-View Modal with Dark Backdrop */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Expanded diagram modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsFullscreen(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          {/* Centered Modal Container */}
          <div className="relative w-full max-w-6xl h-[85vh] max-h-[850px] flex flex-col rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 sm:px-6 shadow-xs flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20">
                  <Workflow className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <span className="font-mono text-xs sm:text-sm font-bold text-text block">
                    Architecture Diagram
                  </span>
                  <span className="text-[10px] font-mono text-muted">
                    Expanded Modal View
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                {/* Zoom Controls */}
                <div className="flex items-center rounded-lg border border-border bg-surface-2/60 p-0.5 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.4, Number((z - 0.2).toFixed(2))))}
                    className="p-1.5 rounded hover:bg-surface text-muted hover:text-text transition-colors"
                    title="Zoom Out"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="px-2 font-mono text-xs text-text font-semibold select-none min-w-[50px] text-center">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(3, Number((z + 0.2).toFixed(2))))}
                    className="p-1.5 rounded hover:bg-surface text-muted hover:text-text transition-colors"
                    title="Zoom In"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1)}
                    className="p-1.5 rounded hover:bg-surface text-muted hover:text-text transition-colors border-l border-border/60 ml-0.5"
                    title="Reset Zoom to 100%"
                    aria-label="Reset zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Copy Diagram Source */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="hidden sm:flex items-center gap-1.5 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-mono text-muted hover:text-text hover:border-accent/40 transition-colors"
                  title="Copy diagram code"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className="flex items-center gap-1.5 rounded-lg bg-surface border border-border px-3 py-1.5 text-xs font-mono text-muted hover:text-accent hover:border-accent transition-colors"
                  title="Close modal view (Esc)"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                  <span className="hidden sm:inline">Close</span>
                  <kbd className="hidden md:inline text-[10px] px-1 py-0.5 rounded bg-surface-2 border border-border ml-1">
                    ESC
                  </kbd>
                </button>
              </div>
            </div>

            {/* Modal Canvas Body */}
            <div
              className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center cursor-default bg-surface-2/30"
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsFullscreen(false);
                }
              }}
            >
              <div
                className="mermaid-svg-container transition-transform duration-150 ease-out flex justify-center [&_svg]:max-w-none [&_svg]:h-auto [&_svg]:rounded-xl [&_svg]:drop-shadow-lg"
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center center",
                }}
                dangerouslySetInnerHTML={{ __html: svgHtml }}
              />
            </div>

            {/* Modal Footer Bar */}
            <div className="flex items-center justify-between border-t border-border bg-surface/90 px-4 py-2.5 text-[11px] font-mono text-muted flex-shrink-0">
              <span>Use +/- buttons to zoom up to 300%. Scroll to pan freely.</span>
              <span>Click outside or press <kbd className="px-1 py-0.5 rounded bg-surface-2 border border-border">ESC</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
