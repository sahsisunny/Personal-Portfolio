"use client";

import * as React from "react";
import { Gauge, Mountain, Flame, Shield, Navigation } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function RiderCockpitHud() {
  const [rpm, setRpm] = React.useState(1400); // Idle RPM
  const [speed, setSpeed] = React.useState(0);
  const [gear, setGear] = React.useState("N");
  const [isThrottling, setIsThrottling] = React.useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Handle throttle revving loop
  React.useEffect(() => {
    if (prefersReducedMotion) return;

    if (isThrottling) {
      const interval = setInterval(() => {
        setRpm((prev) => {
          const next = prev + Math.floor(Math.random() * 600) + 400;
          if (next >= 8800) return 8600 + Math.floor(Math.random() * 300); // rev limiter bounce
          return next;
        });

        setSpeed((prev) => Math.min(118, prev + 3));

        setGear((prev) => {
          if (prev === "N") return "1";
          if (prev === "1") return "2";
          if (prev === "2") return "3";
          if (prev === "3") return "4";
          return "5";
        });
      }, 80);

      return () => clearInterval(interval);
    } else {
      // Return to idle
      const interval = setInterval(() => {
        setRpm((prev) => {
          if (prev <= 1450) return 1400;
          return Math.max(1400, prev - 450);
        });

        setSpeed((prev) => Math.max(0, prev - 4));

        setGear((prev) => {
          if (prev !== "N") return "N";
          return "N";
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isThrottling, prefersReducedMotion]);

  // Calculate needle angle (-120deg at 0 to +120deg at 10,000 RPM)
  const needleAngle = -120 + (rpm / 10000) * 240;

  // Shift LED indicators
  const isShiftLight1 = rpm > 4500;
  const isShiftLight2 = rpm > 6500;
  const isShiftLight3 = rpm > 7800;
  const isRevLimiter = rpm >= 8500;

  return (
    <div className="relative rounded-2xl border-2 border-border/80 bg-surface/95 p-6 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Background Topo & Carbon texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-topo-pattern opacity-40 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-accent/10 blur-[80px] -z-10"
      />

      {/* Cockpit HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent border border-accent/30 font-bold">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-mono font-bold tracking-widest text-accent uppercase">
              Rider Telemetry Instrument Cluster
            </div>
            <div className="text-sm font-bold text-text font-display tracking-wider">
              YAMAHA FZ-S FI V3 • 149CC EXPEDITION RIG
            </div>
          </div>
        </div>

        {/* Live GPS Coordinates */}
        <div className="flex items-center gap-3 font-mono text-xs text-muted bg-surface-2 px-3 py-1.5 rounded-lg border border-border">
          <Navigation className="w-3.5 h-3.5 text-accent animate-spin-slow" />
          <span>34° 16&apos; N • 77° 34&apos; E</span>
          <span className="text-accent font-bold">17,590 FT</span>
        </div>
      </div>

      {/* Main Gauges Cluster */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Gauge 1: Tachometer & Rev Limiter */}
        <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-surface-2/40 relative">
          {/* Shift Light LEDs */}
          <div className="flex items-center gap-1.5 mb-3">
            <span
              className={cn(
                "h-2 w-5 rounded-full transition-colors",
                isShiftLight1 ? "bg-emerald-500 shadow-[0_0_8px_#10B981]" : "bg-border"
              )}
            />
            <span
              className={cn(
                "h-2 w-5 rounded-full transition-colors",
                isShiftLight2 ? "bg-amber-500 shadow-[0_0_8px_#F59E0B]" : "bg-border"
              )}
            />
            <span
              className={cn(
                "h-2 w-5 rounded-full transition-colors",
                isShiftLight3
                  ? isRevLimiter
                    ? "bg-rose-500 animate-ping shadow-[0_0_12px_#F43F5E]"
                    : "bg-rose-500 shadow-[0_0_8px_#F43F5E]"
                  : "bg-border"
              )}
            />
          </div>

          {/* Analog Arc Dial */}
          <div className="relative h-44 w-44 flex items-center justify-center">
            {/* Dial Ring */}
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-border"
                strokeDasharray="188 251"
                strokeLinecap="round"
              />
              {/* Active RPM Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-accent transition-all duration-75"
                strokeDasharray={`${(rpm / 10000) * 188} 251`}
                strokeLinecap="round"
              />
            </svg>

            {/* Needle */}
            <div
              style={{
                transform: `rotate(${needleAngle}deg)`,
              }}
              className="absolute h-20 w-1 bg-gradient-to-t from-transparent via-accent to-rose-500 origin-bottom rounded-full transition-transform duration-75 shadow-[0_0_8px_var(--color-accent)]"
            />

            {/* Dial Center */}
            <div className="absolute h-10 w-10 rounded-full bg-surface border-2 border-accent flex flex-col items-center justify-center shadow-md">
              <span className="font-mono text-[9px] font-bold text-accent">RPM</span>
              <span className="font-mono text-[8px] text-muted">x1000</span>
            </div>
          </div>

          <div className="mt-2 text-center font-mono">
            <span className="text-xl font-bold text-text">{rpm.toLocaleString()}</span>
            <span className="text-xs text-muted ml-1">RPM</span>
          </div>

          {/* Interactive Twist Throttle Button */}
          <button
            type="button"
            onPointerDown={() => setIsThrottling(true)}
            onPointerUp={() => setIsThrottling(false)}
            onPointerLeave={() => setIsThrottling(false)}
            className={cn(
              "mt-3 flex items-center justify-center gap-2 w-full py-2 px-4 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-sm active:scale-95",
              isThrottling
                ? "bg-rose-500 text-white shadow-[0_0_16px_rgba(244,63,94,0.5)] scale-102"
                : "bg-accent text-accent-contrast hover:opacity-95"
            )}
          >
            <Flame className={cn("w-4 h-4", isThrottling && "animate-bounce")} />
            <span>{isThrottling ? "REV LIMITER ACTIVE!" : "HOLD TO TWIST THROTTLE"}</span>
          </button>
        </div>

        {/* Gauge 2: Digital Speedometer & Gear Indicator */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-border bg-surface-2/40 text-center">
          <div className="text-xs font-mono text-muted uppercase tracking-widest mb-1">
            Digital Telemetry Speed
          </div>
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-display text-7xl font-bold tracking-tight text-text">
              {speed}
            </span>
            <span className="font-mono text-sm font-semibold text-accent">KM/H</span>
          </div>

          {/* Gear Indicator */}
          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-surface px-3 py-1 rounded-md border border-border font-mono text-xs">
              <span className="text-muted">GEAR:</span>
              <span
                className={cn(
                  "font-bold text-sm px-1.5 py-0.5 rounded",
                  gear === "N" ? "bg-emerald-500/20 text-emerald-500" : "bg-accent/20 text-accent"
                )}
              >
                {gear}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface px-3 py-1 rounded-md border border-border font-mono text-xs">
              <span className="text-muted">MODE:</span>
              <span className="font-bold text-text">TOURING</span>
            </div>
          </div>

          {/* Odometer Bar */}
          <div className="mt-5 w-full bg-surface p-3 rounded-lg border border-border font-mono text-xs space-y-1 text-left">
            <div className="flex justify-between">
              <span className="text-muted">TOTAL ODOMETER:</span>
              <span className="font-bold text-text">15,480 KM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">TRIP 1 (LADAKH):</span>
              <span className="text-accent font-semibold">3,850 KM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">TRIP 2 (RAMESHWARAM):</span>
              <span className="text-accent-2 font-semibold">5,420 KM</span>
            </div>
          </div>
        </div>

        {/* Gauge 3: Altimeter & Expedition Telemetry */}
        <div className="flex flex-col justify-between p-4 rounded-xl border border-border bg-surface-2/40 h-full space-y-3 font-mono">
          <div className="flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-wider">
            <Mountain className="w-4 h-4" />
            <span>Elevation & Pass Telemetry</span>
          </div>

          <div className="space-y-2">
            <div className="p-2.5 rounded-lg bg-surface border border-border/80">
              <div className="text-[10px] text-muted uppercase">Highest Conquered Summit</div>
              <div className="text-lg font-bold text-text flex items-baseline justify-between">
                <span>Khardung La Pass</span>
                <span className="text-accent font-mono text-sm">17,590 ft (5,359 m)</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface border border-border/80">
              <div className="text-[10px] text-muted uppercase">High-Altitude Camping</div>
              <div className="text-lg font-bold text-text flex items-baseline justify-between">
                <span>Pangong Tso</span>
                <span className="text-accent-2 font-mono text-sm">14,270 ft (-2°C)</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-surface border border-border/80">
              <div className="text-[10px] text-muted uppercase">Ocean Sea Crossing</div>
              <div className="text-lg font-bold text-text flex items-baseline justify-between">
                <span>Pamban Sea Bridge</span>
                <span className="text-emerald-500 font-mono text-sm">Sea Level (Crosswinds)</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted">
            <span>Machine Reliability:</span>
            <span className="text-emerald-500 font-bold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> 100% Zero Breakdowns
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
