"use client";

import * as React from "react";
import { Navigation, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayItem {
  day: number;
  from: string;
  to: string;
  km?: number;
  note?: string;
  photo?: string;
}

interface DayByDayTimelineProps {
  days: DayItem[];
}

export function DayByDayTimeline({ days }: DayByDayTimelineProps) {
  const [activeDay, setActiveDay] = React.useState<number | null>(null);

  if (days.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {days.map((d) => {
          const isSelected = activeDay === d.day;

          return (
            <div
              key={d.day}
              onMouseEnter={() => setActiveDay(d.day)}
              onMouseLeave={() => setActiveDay(null)}
              className={cn(
                "rounded-xl border bg-surface p-5 shadow-xs flex items-start gap-3.5 transition-all duration-300",
                isSelected
                  ? "border-accent ring-2 ring-accent/20 shadow-md scale-101"
                  : "border-border hover:border-accent/40"
              )}
            >
              {/* Day Badge */}
              <div
                className={cn(
                  "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors",
                  isSelected
                    ? "bg-accent text-accent-contrast shadow-sm"
                    : "bg-accent/10 text-accent border border-accent/20"
                )}
              >
                DAY {d.day}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold text-sm text-text truncate">
                    <span>{d.from}</span>
                    <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
                    <span>{d.to}</span>
                  </div>
                  {d.km && (
                    <span className="text-xs font-mono font-semibold text-accent flex-shrink-0 bg-surface-2 px-2 py-0.5 rounded border border-border">
                      {d.km} km
                    </span>
                  )}
                </div>

                {d.note && (
                  <p className="mt-1.5 text-xs text-muted leading-relaxed font-sans text-justify hyphens-auto">
                    {d.note}
                  </p>
                )}

                <div className="mt-2 flex items-center gap-2 text-[10px] font-mono text-muted">
                  <Navigation className="w-3 h-3 text-accent" />
                  <span>Expedition Stage {d.day} of {days.length}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
