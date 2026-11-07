import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ArrowRight, PackageCheck, Layers } from "lucide-react";
import { getGearItems } from "@/lib/data";
import { GearShowcase } from "@/components/rides/gear-showcase";

export const metadata: Metadata = {
  title: "Touring Gear & Loadout | Solo Motorcycle Expeditions",
  description:
    "Armour, helmets, waterproof luggage, electronics and survival tools tested across 15,480 km of solo motorcycle touring by Sunny Sahsi.",
};

export default function GearPage() {
  const gearItems = getGearItems();

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
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>EXPEDITION ARSENAL • 15,480 KM TESTED</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-text">
            Touring Gear & Field Loadout
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-accent max-w-3xl">
            &ldquo;There is no bad weather, only bad gear.&rdquo;
          </p>

          <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
            Every piece of gear in this inventory has survived freezing Himalayan blizzards at 17,590 ft, torrential coastal sea spray, and 42°C highway marathons across India.
          </p>

          {/* Quick Stats Pill */}
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-muted">
            <div className="rounded-lg border border-border bg-surface px-3 py-1.5 flex items-center gap-2">
              <span className="text-accent font-bold">ARMOUR:</span>
              <span>CE Level 2 Knox & TPU</span>
            </div>
            <div className="rounded-lg border border-border bg-surface px-3 py-1.5 flex items-center gap-2">
              <span className="text-accent font-bold">LUGGAGE:</span>
              <span>55L Radio-Welded Dry Bags</span>
            </div>
            <div className="rounded-lg border border-border bg-surface px-3 py-1.5 flex items-center gap-2">
              <span className="text-accent font-bold">HELMET:</span>
              <span>ECE 22.06 / Pinlock 70</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Gear Filter & Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <GearShowcase initialItems={gearItems} />
      </section>

      {/* Packing Strategy & Weight Distribution Section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Loadout Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Packing Strategy & Weight Balance
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            How 35 kg of survival tools, spares, and cameras are balanced on the Royal Enfield Meteor 350 for neutral high-speed handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <PackageCheck className="w-4 h-4" />
              <span>Low-Center Saddlebags (18 kg)</span>
            </div>
            <h3 className="text-base font-bold text-text">Heavy Tools & Spares</h3>
            <p className="text-xs text-muted leading-relaxed">
              Tire inflator, chain lube, torque wrenches, engine oil top-up, spare inner tubes, and thermal liners mounted low and tight alongside the rear swingarm.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <Layers className="w-4 h-4" />
              <span>Tail Rack Dry Bag (10 kg)</span>
            </div>
            <h3 className="text-base font-bold text-text">Camp & Sleep System</h3>
            <p className="text-xs text-muted leading-relaxed">
              Alpine dome tent, -10°C sleeping bag, insulated ground mat, and camp stove. Secured with heavy-duty ROK straps directly over the pillion subframe.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Magnetic Tank Bag (7 kg)</span>
            </div>
            <h3 className="text-base font-bold text-text">Quick-Access Tech & First-Aid</h3>
            <p className="text-xs text-muted leading-relaxed">
              Passport, state road permits, 4K action camera batteries, SD cards, Diamox (altitude sickness meds), powerbanks, and hydration tablets.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Footer CTA */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-2 border-border bg-surface p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-display text-2xl uppercase tracking-wide text-text font-bold">
              Ready to See The Machine?
            </h3>
            <p className="text-xs sm:text-sm text-muted">
              Inspect the Royal Enfield Meteor 350 engine specs, chassis, and touring modifications that carry this gear.
            </p>
          </div>
          <Link
            href="/rides/bike"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-bold font-mono text-accent-contrast uppercase tracking-wider hover:opacity-90 transition-all shadow-xs"
          >
            <span>Explore The Bike</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}