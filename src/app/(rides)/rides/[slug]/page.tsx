import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Bike,
  Shield,
  Lightbulb,
} from "lucide-react";
import { getRides, getRideBySlug, isChildFeatureEnabled } from "@/lib/data";
import { getRideStoryMdx } from "@/lib/mdx";
import { RideGallery } from "@/components/rides/ride-gallery";
import { DayByDayTimeline } from "@/components/rides/day-by-day-timeline";
import { YoutubeFacade } from "@/components/rides/youtube-facade";
import { RideDetailMapClient } from "@/components/rides/ride-detail-map-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const rides = getRides();
  return rides.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ride = getRideBySlug(slug);

  if (!ride) {
    return { title: "Ride Not Found" };
  }

  return {
    title: `${ride.title} | On Two Wheels | Sunny Sahsi`,
    description: ride.summary,
    openGraph: {
      title: `${ride.title} | On Two Wheels`,
      description: ride.summary,
    },
  };
}

export default async function RideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ride = getRideBySlug(slug);

  if (!ride) {
    notFound();
  }

  const allRides = getRides();
  const currentIndex = allRides.findIndex((r) => r.slug === slug);
  const prevRide = currentIndex > 0 ? allRides[currentIndex - 1] : null;
  const nextRide = currentIndex < allRides.length - 1 ? allRides[currentIndex + 1] : null;

  const mdxStory = getRideStoryMdx(slug);
  const storyContent = mdxStory || ride.story;

  const BASE_URL = "https://sahsisunny.netlify.app";
  const rideUrl = `${BASE_URL}/rides/${ride.slug}`;

  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: ride.title,
    description: ride.summary,
    url: rideUrl,
    touristType: "Solo Motorcycle Touring",
    subTrip: (ride.dayByDay ?? []).map((d) => ({
      "@type": "TouristTrip",
      name: `Day ${d.day}: ${d.from} to ${d.to}`,
      description: d.note || `${d.from} to ${d.to}`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: ride.title,
        item: rideUrl,
      },
    ],
  };

  return (
    <article className="py-12 md:py-20 space-y-16 ride-content prose-editorial">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Navigation back */}
        <div className="mb-8">
          <Link
            href="/rides"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Rides</span>
          </Link>
        </div>

        {/* Hero Header */}
        <header className="border-b border-border pb-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-accent">
            <Compass className="w-3.5 h-3.5" />
            <span>Solo Expedition</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-wide uppercase text-text font-bold">
            {ride.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted font-serif italic max-w-2xl text-justify hyphens-auto">
            {ride.summary}
          </p>

          {/* Quick facts strip */}
          <div className="flex flex-wrap gap-4 text-xs font-mono text-muted pt-2">
            <div className="rounded-lg bg-surface border border-border px-3.5 py-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-text font-semibold">Route:</span>
              <span>{ride.origin} ➔ {ride.destination}</span>
            </div>

            {ride.distanceKm && (
              <div className="rounded-lg bg-surface border border-border px-3.5 py-2 flex items-center gap-2">
                <Compass className="w-4 h-4 text-accent" />
                <span className="text-text font-semibold">Distance:</span>
                <span>{ride.distanceKm.toLocaleString()} km</span>
              </div>
            )}

            {ride.durationDays && (
              <div className="rounded-lg bg-surface border border-border px-3.5 py-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-text font-semibold">Duration:</span>
                <span>{ride.durationDays} days</span>
              </div>
            )}

            {ride.bike && (
              <div className="rounded-lg bg-surface border border-border px-3.5 py-2 flex items-center gap-2">
                <Bike className="w-4 h-4 text-accent" />
                <span className="text-text font-semibold">Machine:</span>
                <span>{ride.bike}</span>
              </div>
            )}
          </div>

          {/* Cover Landscape Illustration */}
          <div className="relative aspect-16/9 sm:aspect-21/9 w-full rounded-2xl border-2 border-border bg-slate-950 overflow-hidden shadow-xl mt-6">
            <Image
              src={ride.coverImage}
              alt={ride.title}
              width={1200}
              height={550}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        {/* Interactive Route Map */}
        <section className="pt-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-accent font-semibold block mb-0.5">
                Route Track
              </span>
              <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text font-bold">
                Interactive Waypoints
              </h2>
            </div>
            <span className="text-xs font-mono text-muted hidden sm:inline">
              Pan & zoom freely
            </span>
          </div>

          <RideDetailMapClient slug={slug} title={ride.title} />
        </section>

        {/* The Field Story */}
        <section className="pt-12 space-y-4">
          <span className="text-xs font-mono uppercase text-accent font-semibold block mb-0.5">
            Field Journal
          </span>
          <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text font-bold">
            The Story From The Road
          </h2>

          {storyContent ? (
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-xs prose dark:prose-invert max-w-none text-muted leading-relaxed space-y-4 text-base sm:text-lg text-justify hyphens-auto">
              <div
                dangerouslySetInnerHTML={{
                  __html: storyContent
                    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-text mt-6 mb-2">$1</h3>')
                    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-text mt-8 mb-3">$1</h2>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text font-semibold">$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
                    .replace(/\n\n/g, '<p class="mt-4"></p>'),
                }}
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface-2/40 p-8 text-center text-muted text-sm font-mono">
              Story coming soon. Route notes and media are being compiled from the trip logs.
            </div>
          )}
        </section>

        {/* Day-by-Day Timeline */}
        {ride.dayByDay.length > 0 && isChildFeatureEnabled("rides", "timeline") && (
          <section className="pt-12 space-y-4">
            <span className="text-xs font-mono uppercase text-accent font-semibold block mb-0.5">
              Itinerary
            </span>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text font-bold">
              Day-by-Day Milestones
            </h2>
            <DayByDayTimeline days={ride.dayByDay} />
          </section>
        )}

        {/* Gallery */}
        {isChildFeatureEnabled("rides", "gallery") && (
          <section className="pt-12 space-y-4">
            <span className="text-xs font-mono uppercase text-accent font-semibold block mb-0.5">
              Photo Dispatch
            </span>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text font-bold">
              Gallery & Moments
            </h2>
            <RideGallery items={ride.gallery} />
          </section>
        )}

        {/* YouTube Video if available */}
        {ride.videos && ride.videos.length > 0 && isChildFeatureEnabled("rides", "videos") && (
          <section className="pt-12 space-y-4">
            <span className="text-xs font-mono uppercase text-accent font-semibold block mb-0.5">
              Motion
            </span>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text font-bold">
              Expedition Video
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ride.videos.map((vid, idx) => (
                <YoutubeFacade key={idx} id={vid.id} title={vid.title} />
              ))}
            </div>
          </section>
        )}

        {/* Lessons & Gear */}
        {(ride.lessons.length > 0 || ride.gearUsed.length > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12">
            {ride.lessons.length > 0 && isChildFeatureEnabled("rides", "lessons") && (
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-500 font-bold">
                  <Lightbulb className="w-4 h-4" />
                  <span>Lessons Learned</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-muted">
                  {ride.lessons.map((l, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-mono">▸</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {ride.gearUsed.length > 0 && (
              <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-accent font-bold">
                  <Shield className="w-4 h-4" />
                  <span>Key Gear Used</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-muted">
                  {ride.gearUsed.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-accent font-mono">▸</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Next / Previous Ride */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
          {prevRide ? (
            <Link
              href={`/rides/${prevRide.slug}`}
              className="group flex flex-col text-left max-w-[45%]"
            >
              <span className="text-xs font-mono text-muted flex items-center gap-1 group-hover:text-accent">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Expedition
              </span>
              <span className="font-display text-xl sm:text-2xl uppercase tracking-wide text-text group-hover:text-accent truncate font-bold">
                {prevRide.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextRide ? (
            <Link
              href={`/rides/${nextRide.slug}`}
              className="group flex flex-col text-right max-w-[45%]"
            >
              <span className="text-xs font-mono text-muted flex items-center justify-end gap-1 group-hover:text-accent">
                Next Expedition <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="font-display text-xl sm:text-2xl uppercase tracking-wide text-text group-hover:text-accent truncate font-bold">
                {nextRide.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
