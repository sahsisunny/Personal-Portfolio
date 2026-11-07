import type { Metadata } from "next";
import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Clock,
  Mountain,
  CheckCircle2,
  CircleDashed,
  Compass,
} from "lucide-react";
import { getPlannedRides, getSocials } from "@/lib/data";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Upcoming Expeditions | On Two Wheels",
  description:
    "Future solo motorcycle expeditions in active planning: Spiti Valley, Sach Pass cliff-hangers, and Bhutan circuits by Sunny Sahsi.",
};

export default function UpcomingRidesPage() {
  const plannedRides = getPlannedRides();
  const socials = getSocials();

  return (
    <div className="space-y-16 sm:space-y-20 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-surface-2/40 to-bg py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-topo-pattern opacity-25 -z-10"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-accent">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ROUTE RECONNAISSANCE & SCOUTING</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-text">
            Upcoming Solo Expeditions
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-accent max-w-3xl">
            &ldquo;The map is not the territory until your tires touch the gravel.&rdquo;
          </p>

          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            Planning, satellite waypoint tracking, high-altitude acclimatization schedules, and mechanical preparation for future solo missions on the Royal Enfield Meteor 350.
          </p>
        </div>
      </section>

      {/* Planned Expeditions Detailed Cards */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {plannedRides.map((expedition, idx) => (
          <div
            key={expedition.id}
            className="rounded-3xl border-2 border-border bg-surface overflow-hidden shadow-xl space-y-8"
          >
            {/* Visual Cover Banner with Topographic Overlay */}
            <div className="relative aspect-16/8 sm:aspect-21/9 w-full bg-slate-950 border-b border-border overflow-hidden">
              <Image
                src={expedition.image}
                alt={expedition.title}
                width={1200}
                height={500}
                priority={idx === 0}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 rounded-full bg-surface/90 backdrop-blur-md border border-accent/40 px-3 py-1 text-xs font-mono font-bold text-accent">
                {expedition.targetDate} • {expedition.status}
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-4 bg-surface/85 backdrop-blur-md border border-border p-4 rounded-2xl">
                <div>
                  <div className="text-xs font-mono text-accent uppercase font-bold">
                    ROUTE CORRIDOR
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold uppercase text-text">
                    {expedition.origin} ➔ {expedition.destination}
                  </div>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono text-muted">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span className="font-bold text-text text-sm">
                      {expedition.targetKm.toLocaleString()} KM
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="font-bold text-text text-sm">
                      {expedition.durationDays} DAYS
                    </span>
                  </div>
                  {expedition.targetElevationMeters && (
                    <div className="flex items-center gap-1.5">
                      <Mountain className="w-4 h-4 text-accent" />
                      <span className="font-bold text-text text-sm">
                        {expedition.targetElevationMeters.toLocaleString()} M
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 space-y-8 pt-0">
              {/* Mission Summary & Readiness Meter */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
                    {expedition.title}
                  </h2>
                  <p className="text-base text-muted leading-relaxed">
                    {expedition.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-mono uppercase font-bold text-accent">
                      EXPEDITION OBJECTIVES
                    </div>
                    {expedition.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-text">
                        <span className="text-accent font-mono font-bold">▸</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Readiness Meter Card */}
                <div className="rounded-2xl border border-border bg-surface-2 p-6 space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono uppercase">
                      <span className="text-muted font-bold">Mission Readiness</span>
                      <span className="text-accent font-bold text-sm">
                        {expedition.readinessPercent}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2.5 w-full bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-accent-2 rounded-full transition-all duration-500"
                        style={{ width: `${expedition.readinessPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Preparation Checklist */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono text-muted uppercase font-bold">
                      Pre-Ride Checklist
                    </div>
                    {expedition.preparationList.map((task, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        {task.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        ) : (
                          <CircleDashed className="w-3.5 h-3.5 text-muted/60 flex-shrink-0" />
                        )}
                        <span
                          className={
                            task.done ? "text-text font-medium" : "text-muted"
                          }
                        >
                          {task.task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elevation & Checkpoints Blueprint */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-bold">
                  <Compass className="w-4 h-4" />
                  <span>Key Route Waypoints & Elevation Profile</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {expedition.checkpoints.map((cp, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-border/80 bg-surface-2 p-3 space-y-1"
                    >
                      <div className="text-[10px] font-mono text-muted uppercase">
                        STEP 0{i + 1}
                      </div>
                      <div className="text-xs font-bold text-text truncate">
                        {cp.point}
                      </div>
                      <div className="text-xs font-mono font-bold text-accent">
                        {cp.altitude}
                      </div>
                      <div className="text-[11px] text-muted line-clamp-2">
                        {cp.note}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Dispatches & Updates CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-4">
        <div className="space-y-2">
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block">
            LIVE RECONNAISSANCE DISPATCHES
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Follow The Journey Real-Time
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            Live satellite check-ins, route videos, and photography when wheels roll onto the Spiti gravel.
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-2">
          {socials.instagram && (
            <a
              href={socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-text hover:border-accent hover:text-accent transition-colors shadow-xs"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram Live</span>
            </a>
          )}
          {socials.youtube && (
            <a
              href={socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-text hover:border-accent hover:text-accent transition-colors shadow-xs"
            >
              <YoutubeIcon className="w-4 h-4" />
              <span>YouTube Logs</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}