import Link from "next/link";
import Image from "next/image";
import { Compass, ArrowRight } from "lucide-react";
import type { RidesSection } from "@/lib/schema";

interface RidesTeaserSectionProps {
  ridesData: RidesSection;
}

export function RidesTeaserSection({ ridesData }: RidesTeaserSectionProps) {
  if (!ridesData.enabled) return null;

  return (
    <section className="border-t border-b border-border">
      {/* Full-bleed photo slot with real cinematic road photography */}
      <div className="relative w-full overflow-hidden h-[380px] sm:h-[440px] md:h-auto md:aspect-[21/9]">
        <Image
          src="/images/rides/ladakh-hero.jpg"
          alt="Solo motorcycle journey across the high Himalayan passes of Ladakh"
          title="Solo motorcycle expedition in Ladakh"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] sm:object-[center_45%]"
        />

        {/* Cinematic gradient overlay for contrast & readability */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(16,27,36,0.92) 0%, rgba(16,27,36,0.55) 45%, rgba(16,27,36,0.15) 80%, rgba(16,27,36,0.2) 100%)",
          }}
        />

        {/* Caption and CTA pinned to bottom */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-8 sm:pb-12 z-10">
          <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-6">
            <div className="space-y-1.5 sm:space-y-1">
              <p
                className="text-xs font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5"
                style={{ color: "var(--dust, #C2AE8F)" }}
              >
                <Compass className="w-3.5 h-3.5 flex-shrink-0" />
                <span>On two wheels • Solo expedition</span>
              </p>
              <h2
                className="font-display text-3xl sm:text-5xl lg:text-6xl text-white leading-tight font-bold drop-shadow-sm"
                style={{ fontFamily: "var(--font-barlow-condensed)" }}
              >
                {ridesData.page.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/85 max-w-md font-serif italic line-clamp-2 sm:line-clamp-none">
                &ldquo;{ridesData.page.tagline}&rdquo;
              </p>
            </div>

            <Link
              href="/rides"
              className="group flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-black/50 hover:bg-black/70 active:scale-[0.98] backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shadow-lg w-full sm:w-auto"
            >
              <span>Read the rides</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
