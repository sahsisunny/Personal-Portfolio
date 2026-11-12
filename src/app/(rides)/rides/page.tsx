import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  Clock,
  Bike,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  getRidesSection,
  getRidesSocials,
  getBikeDetails,
} from "@/lib/data";
import { InstagramIcon, YoutubeIcon, TwitterIcon } from "@/components/ui/icons";
import { IndiaRoutesMapClient } from "@/components/rides/india-routes-map-client";

export const metadata: Metadata = {
  title: "On Two Wheels | Solo Motorcycle Touring across India",
  description:
    "Solo motorcycle expeditions from Patna to Ladakh and Rameshwaram. Route maps, waypoints, telemetry, and stories by Sunny Sahsi on a Royal Enfield Meteor 350.",
};

export default function RidesLandingPage() {
  const ridesData = getRidesSection();
  const socials = getRidesSocials();
  const bike = getBikeDetails();

  // Filter out any stat that is null per Section 9.1 rules
  const statsList = [
    ridesData.stats.totalDistanceKm
      ? {
          label: "Total Distance",
          value: `${ridesData.stats.totalDistanceKm.toLocaleString()} km`,
        }
      : null,
    ridesData.stats.totalRides
      ? { label: "Solo Expeditions", value: `${ridesData.stats.totalRides}` }
      : null,
    ridesData.stats.statesCrossed
      ? { label: "States Crossed", value: `${ridesData.stats.statesCrossed}` }
      : null,
    ridesData.stats.highestPointMeters
      ? {
          label: "Highest Altitude",
          value: `${ridesData.stats.highestPointMeters.toLocaleString()} m`,
        }
      : null,
    ridesData.stats.totalRideDays
      ? { label: "Days on Road", value: `${ridesData.stats.totalRideDays}` }
      : null,
  ].filter((s): s is { label: string; value: string } => s !== null);

  const BASE_URL = "https://sunnysahsi.com";
  const ridesCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "On Two Wheels | Solo Motorcycle Touring across India",
    description: "Solo motorcycle adventures across India by Sunny Sahsi.",
    url: `${BASE_URL}/rides`,
    hasPart: ridesData.rides.map((r) => ({
      "@type": "TouristTrip",
      name: r.title,
      description: r.summary,
      url: `${BASE_URL}/rides/${r.slug}`,
      touristType: "Solo Motorcycle Touring",
    })),
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Rides",
        item: `${BASE_URL}/rides`,
      },
    ],
  };

  return (
    <div className="space-y-20 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ridesCollectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      {/* Cinematic Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28 border-b border-border bg-gradient-to-b from-surface via-surface-2/40 to-bg">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-topo-pattern opacity-30 -z-10"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-wider uppercase font-bold text-text">
            {ridesData.page.title}
          </h1>

          <p className="text-xl sm:text-2xl font-serif italic text-muted max-w-2xl">
            &ldquo;{ridesData.page.tagline}&rdquo;
          </p>

          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            {ridesData.page.intro}
          </p>

          {/* Quick Subpage Navigation Cards / Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="#expeditions"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs font-mono uppercase font-bold text-accent-contrast shadow-md hover:opacity-95 transition-all"
            >
              <span>Completed Expeditions</span>
            </a>
            <Link
              href="/rides/bike"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-xs font-mono uppercase font-bold text-text hover:border-accent hover:text-accent transition-all"
            >
              <Bike className="w-4 h-4 text-accent" />
              <span>The Meteor 350</span>
            </Link>
            <Link
              href="/rides/gear"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-xs font-mono uppercase font-bold text-text hover:border-accent hover:text-accent transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Gear & Loadout</span>
            </Link>
            <Link
              href="/rides/upcoming"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-3 text-xs font-mono uppercase font-bold text-text hover:border-accent hover:text-accent transition-all"
            >
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Upcoming Rides</span>
            </Link>
          </div>
        </div>
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
                <div className="text-xs font-mono text-muted uppercase mt-1">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Explore Portals Grid: The Bike, The Gear, The Horizon */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Expedition Dimensions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            The Rig, Loadout & Horizon
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: The Bike */}
          <Link
            href="/rides/bike"
            className="group flex flex-col justify-between rounded-2xl border-2 border-border bg-surface overflow-hidden shadow-xs hover:border-accent hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative aspect-16/10 w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-border">
                <Image
                  src={bike.image}
                  alt={bike.name}
                  title={bike.name}
                  width={600}
                  height={375}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-surface/90 border border-accent/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent">
                  349CC SOHC J-SERIES
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent font-bold">
                  <Bike className="w-3.5 h-3.5" />
                  <span>THE MACHINE</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-text group-hover:text-accent transition-colors font-bold">
                  Royal Enfield Meteor 350
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-3">
                  {bike.description}
                </p>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider group-hover:underline">
              <span>Inspect Bike Specs & Mods</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 2: Gear & Loadout */}
          <Link
            href="/rides/gear"
            className="group flex flex-col justify-between rounded-2xl border-2 border-border bg-surface overflow-hidden shadow-xs hover:border-accent hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative aspect-16/10 w-full bg-slate-950 flex items-center justify-center p-4 overflow-hidden border-b border-border">
                <Image
                  src="/images/gear/rynox-jacket.svg"
                  alt="Touring Gear"
                  title="Touring Gear and Loadout"
                  width={600}
                  height={375}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-surface/90 border border-accent/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent">
                  CE LEVEL 2 • 8 ARSENAL ITEMS
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent font-bold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ARMOUR & LUGGAGE</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-text group-hover:text-accent transition-colors font-bold">
                  Touring Gear & Loadout
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-3">
                  CE Level 2 armour, ECE helmets, 55L radio-welded dry saddlebags, and survival tools tested across 15,480 km.
                </p>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider group-hover:underline">
              <span>View Gear Loadout</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>

          {/* Card 3: Upcoming Expeditions */}
          <Link
            href="/rides/upcoming"
            className="group flex flex-col justify-between rounded-2xl border-2 border-border bg-surface overflow-hidden shadow-xs hover:border-accent hover:shadow-xl transition-all duration-300"
          >
            <div>
              <div className="relative aspect-16/10 w-full bg-slate-950 flex items-center justify-center overflow-hidden border-b border-border">
                <Image
                  src="/images/rides/spiti-cover.svg"
                  alt="Spiti Valley & Sach Pass"
                  title="Spiti Valley & Sach Pass Expedition"
                  width={600}
                  height={375}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded-full bg-surface/90 border border-accent/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent">
                  AUTUMN 2025 • PLANNING
                </div>
              </div>
              <div className="p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-accent font-bold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>NEXT HORIZON</span>
                </div>
                <h3 className="font-display text-2xl uppercase tracking-wide text-text group-hover:text-accent transition-colors font-bold">
                  Spiti & Sach Pass
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-3">
                  Tackling the most treacherous cliff-carved mountain roads on earth: Hindustan-Tibet Highway and Sach Pass cliff-hangers.
                </p>
              </div>
            </div>
            <div className="p-5 pt-0 flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider group-hover:underline">
              <span>View Route Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        </div>
      </section>

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

      {/* Ride Cards (Completed Expeditions) */}
      <section
        id="expeditions"
        className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8"
      >
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Solo Journeys
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Completed Expeditions
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            Field journals, day-by-day logs, altitude profiles, and survival lessons from the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ridesData.rides.map((ride) => (
            <div
              key={ride.id}
              className="group flex flex-col justify-between rounded-2xl border-2 border-border bg-surface overflow-hidden shadow-xs hover:border-accent hover:shadow-2xl transition-all duration-300"
            >
              <div>
                {/* Visual Cover Banner with Topographic Landscape SVG Illustration */}
                <div className="relative aspect-16/10 w-full bg-slate-950 border-b border-border overflow-hidden">
                  <Image
                    src={ride.coverImage}
                    alt={ride.title}
                    title={ride.title}
                    width={800}
                    height={500}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                  />

                  {/* Route overlay at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 bg-surface/85 backdrop-blur-xs border border-border/80 px-3 py-1.5 rounded-lg flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-text uppercase">
                      {ride.origin} ➔ {ride.destination}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-2xl uppercase tracking-wide text-text group-hover:text-accent transition-colors font-bold">
                    <Link href={`/rides/${ride.slug}`}>{ride.title}</Link>
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
                  <span>View expedition</span>
                </Link>
              </div>
            </div>
          ))}
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

        <div className="flex flex-wrap justify-center gap-4 pt-2">
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
          {socials.x && (
            <a
              href={socials.x}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-text hover:border-accent hover:text-accent transition-colors shadow-xs"
            >
              <TwitterIcon className="w-4 h-4" />
              <span>X (Twitter) Dispatches</span>
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