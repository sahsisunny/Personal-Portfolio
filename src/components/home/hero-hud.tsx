"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Terminal, Cpu, Activity, Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Tab = "terminal" | "stack" | "telemetry";

const COMMANDS: Record<string, string> = {
  whoami: "Sunny Sahsi • Associate Full Stack Developer @ Fountane • Next.js, Go & AI Agents • Solo Long-Distance Rider",
  "cat stack.json": JSON.stringify(
    {
      frontend: "Next.js 16 + React 19 + TypeScript + Tailwind v4",
      backend: "Go (REST services, auth, concurrency, microservices)",
      ai_agents: "LLM Orchestration, Claude, Cursor, Antigravity",
      databases: "PostgreSQL, MySQL, MongoDB",
    },
    null,
    2
  ),
  status: "🟢 In Production at Fountane • Shipping AI Chatbot Agent Backend (200+ APIs) • Planning Next Himalayan Expedition",
  "npm run rides": "🏍️ Firing up Royal Enfield Meteor 350... Preparing expedition routes from Patna!",
};

export function HeroHud() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<Tab>("terminal");
  const [history, setHistory] = React.useState<{ cmd: string; out: string }[]>([
    {
      cmd: "whoami",
      out: COMMANDS.whoami,
    },
  ]);
  const [inputCmd, setInputCmd] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (trimmed === "clear") {
      setHistory([]);
      setInputCmd("");
      return;
    }

    if (trimmed === "npm run rides" || trimmed === "rides") {
      setHistory((prev) => [
        ...prev,
        { cmd, out: "🏍️ Launching On Two Wheels... Navigating to /rides!" },
      ]);
      setTimeout(() => {
        router.push("/rides");
      }, 700);
      setInputCmd("");
      return;
    }

    const out =
      COMMANDS[trimmed] ||
      `command not found: ${trimmed}. Try 'whoami', 'cat stack.json', 'status', or 'npm run rides'.`;

    setHistory((prev) => [...prev, { cmd, out }]);
    setInputCmd("");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("sahsisunny@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-surface/90 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* HUD Header & Window Controls */}
      <div className="flex items-center justify-between border-b border-border/70 bg-surface-2/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-muted">sunny@fountane:~</span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 rounded-lg bg-surface p-0.5 border border-border/80">
          <button
            type="button"
            onClick={() => setActiveTab("terminal")}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-md transition-all",
              activeTab === "terminal"
                ? "bg-accent text-accent-contrast font-medium shadow-xs"
                : "text-muted hover:text-text"
            )}
          >
            <Terminal className="w-3 h-3" />
            <span>Terminal</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("stack")}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-md transition-all",
              activeTab === "stack"
                ? "bg-accent text-accent-contrast font-medium shadow-xs"
                : "text-muted hover:text-text"
            )}
          >
            <Cpu className="w-3 h-3" />
            <span>Stack</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("telemetry")}
            className={cn(
              "flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded-md transition-all",
              activeTab === "telemetry"
                ? "bg-accent text-accent-contrast font-medium shadow-xs"
                : "text-muted hover:text-text"
            )}
          >
            <Activity className="w-3 h-3" />
            <span>Telemetry</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Terminal */}
      {activeTab === "terminal" && (
        <div className="p-4 sm:p-5 font-mono text-xs text-text space-y-3">
          {/* Quick Command Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-border/50 text-[11px]">
            <span className="text-muted mr-1">Quick:</span>
            {["whoami", "cat stack.json", "status", "npm run rides"].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => runCommand(cmd)}
                className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-muted hover:text-accent hover:border-accent transition-colors"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* History Scroll Area */}
          <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-1.5 text-accent font-semibold">
                  <span>❯</span>
                  <span>{item.cmd}</span>
                </div>
                <pre className="text-muted whitespace-pre-wrap leading-relaxed text-[11px] bg-surface-2/40 p-2 rounded-lg border border-border/40 font-mono">
                  {item.out}
                </pre>
              </div>
            ))}
          </div>

          {/* Interactive Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (inputCmd.trim()) runCommand(inputCmd);
            }}
            className="flex items-center gap-2 pt-2 border-t border-border/60"
          >
            <span className="text-accent font-bold">❯</span>
            <input
              type="text"
              value={inputCmd}
              onChange={(e) => setInputCmd(e.target.value)}
              placeholder="type a command or click above..."
              className="flex-1 bg-transparent text-xs text-text placeholder:text-muted/60 focus:outline-none font-mono"
            />
            <button
              type="submit"
              className="rounded-md bg-accent/15 px-2.5 py-1 text-[11px] font-semibold text-accent hover:bg-accent hover:text-accent-contrast transition-colors"
            >
              Run
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Tech Matrix */}
      {activeTab === "stack" && (
        <div className="p-4 sm:p-5 space-y-3.5">
          <div className="text-xs font-mono text-muted uppercase tracking-wider mb-2">
            Active Core Specializations
          </div>
          {[
            { name: "Next.js 16 & React 19 Frontend", level: 96, tag: "Daily Production" },
            { name: "Go Backend & Microservices", level: 92, tag: "REST & Concurrency" },
            { name: "AI Chatbot Agents & LLM Tooling", level: 90, tag: "200+ Internal APIs" },
            { name: "PostgreSQL & Database Design", level: 86, tag: "Schema & Migrations" },
            { name: "Linux & GitLab CI/CD Workflows", level: 84, tag: "DevOps & Tests" },
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="font-semibold text-text">{item.name}</span>
                <span className="text-muted">{item.tag}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden border border-border/60">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2 transition-all duration-700"
                  style={{ width: `${item.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Telemetry */}
      {activeTab === "telemetry" && (
        <div className="p-4 sm:p-5 space-y-4">
          <div className="text-xs font-mono text-muted uppercase tracking-wider">
            Live Engineering & Expedition Metrics
          </div>
          <div className="grid grid-cols-2 gap-3 font-mono">
            <div className="p-3 rounded-xl border border-border bg-surface-2/60">
              <div className="text-2xl font-bold text-accent">200+</div>
              <div className="text-[11px] text-muted mt-0.5">Internal APIs Orchestrated</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-surface-2/60">
              <div className="text-2xl font-bold text-accent">15,000+</div>
              <div className="text-[11px] text-muted mt-0.5">Km Solo Motorcycle Touring</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-surface-2/60">
              <div className="text-2xl font-bold text-accent">17,590 ft</div>
              <div className="text-[11px] text-muted mt-0.5">Highest Pass (Khardung La)</div>
            </div>
            <div className="p-3 rounded-xl border border-border bg-surface-2/60">
              <div className="text-2xl font-bold text-accent">100%</div>
              <div className="text-[11px] text-muted mt-0.5">Type-Safe & Production-Tested</div>
            </div>
          </div>
        </div>
      )}

      {/* HUD Footer Status */}
      <div className="flex items-center justify-between border-t border-border/70 bg-surface-2/40 px-4 py-2 text-[11px] font-mono text-muted">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Fountane • Remote (Patna, IN)</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="hover:text-accent flex items-center gap-1 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy Email</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
