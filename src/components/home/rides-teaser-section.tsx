import Link from "next/link";
import Image from "next/image";
import type { RidesSection } from "@/lib/schema";

interface RidesTeaserSectionProps {
  ridesData: RidesSection;
}

export function RidesTeaserSection({ ridesData }: RidesTeaserSectionProps) {
  if (!ridesData.enabled) return null;

  return (
    <section className="border-t border-b border-border">
      {/* Full-bleed photo slot with real cinematic road photography */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "21/9" }}>
        <Image
          src="/images/rides/ladakh-hero.jpg"
          alt="Solo motorcycle journey across the high Himalayan passes of Ladakh"
          title="Solo motorcycle expedition in Ladakh"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_45%]"
        />

        {/* Cinematic gradient overlay for contrast & readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(16,27,36,0.85) 0%, rgba(16,27,36,0.2) 50%, rgba(16,27,36,0.1) 100%)",
          }}
        />

        {/* Caption and CTA pinned to bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 z-10">
          <div className="max-w-5xl mx-auto flex items-end justify-between gap-6">
            <div className="space-y-1">
              <p
                className="text-xs font-mono uppercase tracking-widest font-semibold"
                style={{ color: "var(--dust, #C2AE8F)" }}
              >
                On two wheels • Solo expedition
              </p>
              <h2
                className="font-display text-3xl sm:text-5xl lg:text-6xl text-white leading-tight font-bold drop-shadow-sm"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                {ridesData.page.title}
              </h2>
              <p className="text-sm text-white/80 max-w-md hidden sm:block font-serif italic">
                &ldquo;{ridesData.page.tagline}&rdquo;
              </p>
            </div>

            <Link
              href="/rides"
              className="flex-shrink-0 inline-flex items-center rounded-lg border border-white/30 bg-black/40 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-white hover:bg-black/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg"
            >
              Read the rides
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
