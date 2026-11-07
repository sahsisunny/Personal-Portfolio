import Link from "next/link";
import { Compass, ArrowRight, MapPin, Bike, Mountain } from "lucide-react";
import type { RidesSection } from "@/lib/schema";

interface RidesTeaserSectionProps {
  ridesData: RidesSection;
}

export function RidesTeaserSection({ ridesData }: RidesTeaserSectionProps) {
  if (!ridesData.enabled) return null;

  return (
    <section className="relative overflow-hidden bg-stone-900 text-stone-100 py-20 border-y border-stone-800">
      {/* Background road texture / gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(#c2410c_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{ridesData.page.eyebrow}</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide text-stone-50 font-bold uppercase">
              {ridesData.page.title}
            </h2>

            <p className="text-xl font-medium text-amber-200/90 font-serif italic">
              &ldquo;{ridesData.page.tagline}&rdquo;
            </p>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed max-w-xl">
              {ridesData.page.intro}
            </p>

            {/* Routes teaser pills */}
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="inline-flex items-center gap-2 rounded-lg bg-stone-800/80 border border-stone-700 px-3.5 py-2 text-xs font-mono text-stone-200">
                <Mountain className="w-4 h-4 text-amber-400" />
                <span>Patna ➔ Ladakh (Himalayan passes)</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg bg-stone-800/80 border border-stone-700 px-3.5 py-2 text-xs font-mono text-stone-200">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>Patna ➔ Rameshwaram (Southern tip)</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/rides"
                className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-amber-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>Explore the Rides Microsite</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Card / Visual */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-stone-700 bg-stone-800/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-stone-700 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-400">
                  <Bike className="w-4 h-4 text-amber-400" />
                  <span>Solo Expeditions</span>
                </div>
                <span className="text-xs font-mono text-amber-400 font-semibold">
                  2 Major Solo Rides
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-stone-900/80 border border-stone-700/80 p-4">
                  <div className="text-xs font-mono text-amber-400 uppercase">Expedition I</div>
                  <div className="text-lg font-bold text-stone-100">Patna to Ladakh</div>
                  <div className="text-xs text-stone-400 mt-1">High altitude passes, cold starts & river crossings</div>
                </div>

                <div className="rounded-xl bg-stone-900/80 border border-stone-700/80 p-4">
                  <div className="text-xs font-mono text-cyan-400 uppercase">Expedition II</div>
                  <div className="text-lg font-bold text-stone-100">Patna to Rameshwaram</div>
                  <div className="text-xs text-stone-400 mt-1">Central plateau, coastal rain & the Pamban crossing</div>
                </div>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-stone-400 font-mono">
                  Interactive routes, waypoints, gear lists, and field stories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
