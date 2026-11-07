interface DayItem {
  day: number;
  from: string;
  to: string;
  km?: number;
  note?: string;
}

interface DayByDayTimelineProps {
  days: DayItem[];
}

export function DayByDayTimeline({ days }: DayByDayTimelineProps) {
  if (days.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {days.map((d) => (
          <div
            key={d.day}
            className="rounded-xl border border-border bg-surface p-5 shadow-xs flex items-start gap-3"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent/10 font-mono text-xs font-bold text-accent">
              D{d.day}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-sm text-text truncate">
                  {d.from} ➔ {d.to}
                </span>
                {d.km && (
                  <span className="text-[11px] font-mono text-muted flex-shrink-0">
                    {d.km} km
                  </span>
                )}
              </div>

              {d.note && (
                <p className="mt-1 text-xs text-muted leading-relaxed">{d.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
