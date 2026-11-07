import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ArrowRight,
  MapPin,
  Clock,
  Bike,
  Shield,
  Video,
  ChevronDown,
} from "lucide-react";
import { getRidesSection, getSocials } from "@/lib/data";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/icons";
import { IndiaRoutesMapClient } from "@/components/rides/india-routes-map-client";

export const metadata: Metadata = {
  title: "On Two Wheels | Solo Motorcycle Touring across India",
  description:
    "Patna to Ladakh and Patna to Rameshwaram. Solo motorcycle expeditions, route maps, waypoints, gear, and stories from the road by Sunny Sahsi.",
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

  const hasGear =
    ridesData.gear.bike ||
    ridesData.gear.riding.length > 0 ||
    ridesData.gear.content.length > 0;

  return (
    <div className="space-y-20 pb-24">
      {/* Cinematic Hero */}
      <section className="relative overflow-hidden py-24 sm:py-32 border-b border-border bg-gradient-to-b from-surface via-surface-2/40 to-bg">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1 text-xs font-mono font-semibold uppercase tracking-widest text-accent">
            <Compass className="w-3.5 h-3.5" />
            <span>{ridesData.page.eyebrow}</span>
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

          <div className="pt-6 flex justify-center gap-4">
            <a
              href="#stories"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-accent-contrast shadow-md hover:opacity-95 transition-all"
            >
              <span>Explore Expeditions</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip (only non-null stats) */}
      {statsList.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-border bg-surface shadow-xs">
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
            Routes stretching North into the Ladakh mountain passes and South all the way to Rameshwaram at the Indian Ocean edge.
          </p>
        </div>

        <IndiaRoutesMapClient />
      </section>

      {/* Ride Cards (Stories) */}
      <section id="stories" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Solo Journeys
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            The Expeditions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ridesData.rides.map((ride) => (
            <div
              key={ride.id}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-surface overflow-hidden shadow-xs hover:border-accent/80 hover:shadow-xl transition-all duration-300"
            >
              <div>
                {/* Visual Cover Banner */}
                <div className="relative aspect-16/10 w-full bg-gradient-to-br from-surface-2 to-accent/15 border-b border-border flex items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <Compass className="w-10 h-10 text-accent mx-auto group-hover:rotate-45 transition-transform duration-300" />
                    <div className="font-display text-2xl sm:text-3xl tracking-wide uppercase text-text font-bold">
                      {ride.origin} ➔ {ride.destination}
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 rounded-full bg-surface/90 backdrop-blur-xs border border-border px-3 py-1 text-[11px] font-mono text-text">
                    Solo Ride
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-text group-hover:text-accent transition-colors">
                    <Link href={`/rides/${ride.slug}`}>
                      {ride.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-muted leading-relaxed">
                    {ride.summary}
                  </p>

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
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                <Link
                  href={`/rides/${ride.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-accent uppercase tracking-wider hover:underline"
                >
                  <span>Read Field Story & Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gear & Hardware (Hide if empty) */}
      {hasGear && (
        <section id="gear" className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
              Loadout
            </span>
            <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
              Touring Gear & Rig
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ridesData.gear.bike && (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold mb-3">
                  <Bike className="w-4 h-4" />
                  <span>The Machine</span>
                </div>
                <p className="text-lg font-bold text-text">{ridesData.gear.bike}</p>
              </div>
            )}

            {ridesData.gear.riding.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold mb-3">
                  <Shield className="w-4 h-4" />
                  <span>Safety Gear</span>
                </div>
                <ul className="space-y-1.5 text-xs text-muted font-mono">
                  {ridesData.gear.riding.map((g, i) => (
                    <li key={i}>• {g}</li>
                  ))}
                </ul>
              </div>
            )}

            {ridesData.gear.content.length > 0 && (
              <div className="rounded-xl border border-border bg-surface p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold mb-3">
                  <Video className="w-4 h-4" />
                  <span>Capturing the Road</span>
                </div>
                <ul className="space-y-1.5 text-xs text-muted font-mono">
                  {ridesData.gear.content.map((c, i) => (
                    <li key={i}>• {c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Follow along strip */}
      {(socials.instagram || socials.youtube) && (
        <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-surface-2 p-8 text-center space-y-4">
            <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text font-bold">
              Follow Along on Future Expeditions
            </h3>
            <p className="text-sm text-muted max-w-md mx-auto">
              Behind-the-scenes clips, camp footage, and highway updates from the road.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              {socials.instagram && (
                <a
                  href={socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface border border-border px-4 py-2.5 text-xs font-mono font-semibold text-text hover:border-accent transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-accent" />
                  <span>Instagram</span>
                </a>
              )}
              {socials.youtube && (
                <a
                  href={socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-surface border border-border px-4 py-2.5 text-xs font-mono font-semibold text-text hover:border-accent transition-colors"
                >
                  <YoutubeIcon className="w-4 h-4 text-accent" />
                  <span>YouTube</span>
                </a>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
