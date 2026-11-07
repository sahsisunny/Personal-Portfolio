import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  MapPin,
  Clock,
  Bike,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { getRidesSection, getSocials } from "@/lib/data";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/icons";
import { IndiaRoutesMapClient } from "@/components/rides/india-routes-map-client";
import { RiderCockpitHud } from "@/components/rides/rider-cockpit-hud";
import { SteedLocker } from "@/components/rides/steed-locker";

export const metadata: Metadata = {
  title: "On Two Wheels | Solo Motorcycle Touring across India",
  description:
    "Patna to Ladakh and Patna to Rameshwaram. Solo motorcycle expeditions, route maps, waypoints, telemetry, gear, and field stories by Sunny Sahsi.",
};

export default function RidesLandingPage() {
  const ridesData = getRidesSection();
  const socials = getSocials();

  // Filter out any stat that is null per Section 9.1 rules
  const statsList = [
    ridesData.stats.totalDistanceKm
      ? { label: "Total Distance", value: `${ridesData.stats.totalDistanceKm.toLocaleString()} km` }
      : null,
    ridesData.stats.totalRides
      ? { label: "Solo Expeditions", value: `${ridesData.stats.totalRides}` }
      : null,
    ridesData.stats.statesCrossed
      ? { label: "States Crossed", value: `${ridesData.stats.statesCrossed}` }
      : null,
    ridesData.stats.highestPointMeters
      ? { label: "Highest Altitude", value: `${ridesData.stats.highestPointMeters.toLocaleString()} m` }
      : null,
    ridesData.stats.totalRideDays
      ? { label: "Days on Road", value: `${ridesData.stats.totalRideDays}` }
      : null,
  ].filter((s): s is { label: string; value: string } => s !== null);

  return (
    <div className="space-y-20 pb-24">
      {/* Cinematic Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28 border-b border-border bg-gradient-to-b from-surface via-surface-2/40 to-bg">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-topo-pattern opacity-30 -z-10"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest text-accent">
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{ridesData.page.eyebrow} • SOLO MOTORCYCLE EXPEDITIONS</span>
          </div>

          <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wider uppercase font-bold text-text">
            {ridesData.page.title}
          </h1>

          <p className="text-xl sm:text-2xl font-serif italic text-muted max-w-2xl mx-auto">
            &ldquo;{ridesData.page.tagline}&rdquo;
          </p>

          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            {ridesData.page.intro}
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <a
              href="#cockpit"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-contrast shadow-md hover:opacity-95 transition-all"
            >
              <span>Explore Cockpit & Telemetry</span>
              <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="#map"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3 text-sm font-bold text-text hover:border-accent transition-all"
            >
              <span>Interactive Map</span>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Cockpit HUD (Rider Instruments & Telemetry) */}
      <section id="cockpit" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <RiderCockpitHud />
      </section>

      {/* Stats strip */}
      {statsList.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-6 rounded-2xl border border-border bg-surface shadow-xs">
            {statsList.map((st, idx) => (
              <div key={idx} className="text-center p-3">
                <div className="font-display text-3xl sm:text-4xl text-accent font-bold tracking-wide">
                  {st.value}
                </div>
                <div className="text-xs font-mono text-muted uppercase mt-1">{st.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive India Map */}
      <section id="map" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Expedition Routes
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Fanning Out From Patna
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            Routes stretching North into the Ladakh mountain passes (Khardung La, 17,590 ft) and South all the way across 9 states to Rameshwaram at the Indian Ocean edge.
          </p>
        </div>

        <IndiaRoutesMapClient />
      </section>

      {/* Ride Cards (Stories & Debriefs) */}
      <section id="stories" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Solo Journeys
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            The Expeditions
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            Field journals, day-by-day logs, altitude profiles, and survival lessons.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ridesData.rides.map((ride) => (
            <div
              key={ride.id}
              className="group flex flex-col justify-between rounded-2xl border-2 border-border bg-surface overflow-hidden shadow-xs hover:border-accent hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Visual Cover Banner with Topographic Overlay */}
                <div className="relative aspect-16/10 w-full bg-gradient-to-br from-surface-2 via-surface to-accent/20 border-b border-border flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <Compass className="w-12 h-12 text-accent mx-auto group-hover:rotate-45 transition-transform duration-300" />
                    <div className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-text font-bold">
                      {ride.origin} ➔ {ride.destination}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 rounded-full bg-surface/90 backdrop-blur-xs border border-accent/40 px-3 py-1 text-[11px] font-mono font-bold text-accent">
                    Solo Expedition • {ride.year}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-text group-hover:text-accent transition-colors">
                    <Link href={`/rides/${ride.slug}`}>{ride.title}</Link>
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">{ride.summary}</p>

                  <div className="pt-3 flex flex-wrap gap-4 text-xs font-mono text-muted">
                    {ride.distanceKm && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent" />
                        <span>{ride.distanceKm.toLocaleString()} km</span>
                      </div>
                    )}
                    {ride.durationDays && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>{ride.durationDays} days</span>
                      </div>
                    )}
                    {ride.bike && (
                      <div className="flex items-center gap-1">
                        <Bike className="w-3.5 h-3.5 text-accent" />
                        <span>{ride.bike}</span>
                      </div>
                    )}
                  </div>

                  {/* Highlights Pill list */}
                  {ride.highlights.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border/60 space-y-1.5 text-xs text-muted">
                      {ride.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="text-accent font-mono font-bold">▸</span>
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                <Link
                  href={`/rides/${ride.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold font-mono text-accent uppercase tracking-wider hover:underline"
                >
                  <span>View Expedition Map & Log</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Steed & Gear Locker ("The Garage") */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SteedLocker />
      </section>

      {/* Next Expedition Callout */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-accent/40 bg-gradient-to-r from-accent/10 via-surface to-accent-2/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Next Mission On The Horizon</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text font-bold">
              Spiti Valley & Sach Pass
            </h3>
            <p className="text-xs sm:text-sm text-muted max-w-xl">
              Targeting 3,200 km through the remote Kinnaur corridors, treacherous Sach Pass cliff-hangers, and Kaza monastery plateaus in Autumn 2025.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="rounded-xl border border-border bg-surface px-4 py-2.5 font-mono text-xs text-accent font-bold text-center">
              STATUS: PREPARATION & ROUTE SCOUTING
            </div>
          </div>
        </div>
      </section>

      {/* Follow along (Instagram & YouTube CTA) */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6 pt-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block">
            {ridesData.cta.label}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Field Footage & Dispatches
          </h2>
          <p className="text-sm text-muted max-w-lg mx-auto">
            Helmet-cam footage, route reels, and raw moments from the mountain passes and coastal highways.
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
              <span>Instagram Reels</span>
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
              <span>YouTube Channel</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
