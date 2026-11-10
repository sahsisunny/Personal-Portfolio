import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bike,
  Gauge,
  Shield,
  Wrench,
  Fuel,
  Compass,
  ArrowRight,
  Zap,
} from "lucide-react";
import { getBikeDetails, getRides, isFeatureEnabled } from "@/lib/data";

export const metadata: Metadata = {
  title: "The Machine | Royal Enfield Meteor 350 Touring Rig",
  description:
    "Technical specifications, touring modifications, and endurance telemetry of the Royal Enfield Meteor 350 solo expedition steed.",
};

export default function BikePage() {
  if (!isFeatureEnabled("rides")) {
    notFound();
  }

  const bike = getBikeDetails();
  const rides = getRides();

  return (
    <div className="space-y-16 sm:space-y-24 pb-24">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-surface via-surface-2/40 to-bg py-16 sm:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-topo-pattern opacity-25 -z-10"
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider text-accent">
              <Bike className="w-3.5 h-3.5" />
              <span>THE EXPEDITION STEED</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-muted">
              <span>{bike.displacement} SOHC J-SERIES</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-muted">
              <span>DUAL-CHANNEL ABS</span>
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-text">
              {bike.name}
            </h1>
            <p className="font-serif italic text-xl sm:text-2xl text-accent max-w-3xl">
              &ldquo;{bike.tagline}&rdquo;
            </p>
            <p className="text-base sm:text-lg text-muted max-w-3xl leading-relaxed">
              {bike.description}
            </p>
          </div>

          {/* Large Visual Illustration of Royal Enfield Meteor 350 */}
          <div className="relative rounded-2xl border-2 border-border/80 bg-surface shadow-2xl overflow-hidden group">
            <div className="relative aspect-16/9 w-full bg-slate-950 flex items-center justify-center">
              <Image
                src={bike.image}
                alt={bike.name}
                width={1200}
                height={675}
                priority
                className="w-full h-full object-contain"
              />
            </div>
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 bg-surface/90 backdrop-blur-md border border-border/80 p-3 sm:p-4 rounded-xl">
              <div className="text-xs sm:text-sm font-mono text-text">
                <span className="text-accent font-bold">RIG CONFIGURATION: </span>
                <span>Solo Long-Distance Cruiser & Alpine Pass Setup</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE SERVICE STATUS: EXPEDITION READY</span>
              </div>
            </div>
          </div>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bike.telemetryStats.map((stat, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border bg-surface p-4 sm:p-5 space-y-1 shadow-xs"
              >
                <div className="text-[11px] font-mono text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="font-display text-2xl sm:text-3xl font-bold text-accent">
                  {stat.value}
                </div>
                {stat.subtext && (
                  <div className="text-xs text-muted/80">{stat.subtext}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Grid */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Factory Architecture
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Technical Specifications
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            Pure counterbalanced single-cylinder cruiser engineering tuned for low-end thumper torque.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="rounded-xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <Wrench className="w-4 h-4" />
              <span>Engine & Valvetrain</span>
            </div>
            <div className="text-sm font-semibold text-text">{bike.engine}</div>
            <p className="text-xs text-muted">
              Counterbalanced SOHC single cylinder with reduced reciprocating mass for zero handlebar tingling at highway velocities.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <Zap className="w-4 h-4" />
              <span>Power & Torque Band</span>
            </div>
            <div className="text-sm font-semibold text-text">
              {bike.power} • {bike.torque}
            </div>
            <p className="text-xs text-muted">
              90% of maximum torque available as early as 2,400 RPM, allowing heavy uphill climbing without brutal downshifting.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <Fuel className="w-4 h-4" />
              <span>Fuel & Range</span>
            </div>
            <div className="text-sm font-semibold text-text">
              {bike.fuelCapacity} • {bike.rangeKm}
            </div>
            <p className="text-xs text-muted">
              Teardrop tank with electronic EFI calibration providing reliable 32–35 km/L under heavy touring loadout.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <Gauge className="w-4 h-4" />
              <span>Weight & Chassis</span>
            </div>
            <div className="text-sm font-semibold text-text">{bike.weight}</div>
            <p className="text-xs text-muted">
              Twin downtube spine frame with 765mm low seat height for low-speed gravel stability and confident footing.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <Shield className="w-4 h-4" />
              <span>Braking & Safety</span>
            </div>
            <div className="text-sm font-semibold text-text">{bike.brakes}</div>
            <p className="text-xs text-muted">
              ByBre floating calipers with Bosch dual-channel anti-lock braking ensuring zero front-wheel tuck on wet blacktop.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase font-bold">
              <Compass className="w-4 h-4" />
              <span>Wheels & Rubber</span>
            </div>
            <div className="text-sm font-semibold text-text">{bike.tires}</div>
            <p className="text-xs text-muted">
              19-inch front alloy wheel glides over pothole dips with tubeless compound resisting sudden high-speed blowouts.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Machine for Touring */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Touring Philosophy
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Why The Meteor 350
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            Solo expeditions are 90% endurance and reliability. Here is why this cruiser has conquered Ladakh and Rameshwaram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {bike.whyThisBike.map((reason, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 shadow-xs"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 text-accent font-mono font-bold text-sm">
                0{idx + 1}
              </div>
              <p className="text-sm text-muted leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Touring Custom Modifications */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            Custom Rigging
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Touring Modifications
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            Equipment and structural upgrades installed to endure mountain riverbeds, night fog, and 600 km endurance days.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bike.modifications.map((mod, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between rounded-xl border border-border bg-surface p-6 shadow-xs hover:border-accent transition-colors"
            >
              <div className="space-y-3">
                <span className="inline-block text-[10px] font-mono uppercase tracking-wider font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full">
                  {mod.category}
                </span>
                <h3 className="text-base font-bold text-text">{mod.title}</h3>
                <p className="text-xs text-muted leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expeditions Powered */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-accent/30 bg-surface flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-mono text-accent uppercase tracking-widest font-bold">
              PROVEN ON THE ROAD
            </span>
            <h3 className="font-display text-2xl sm:text-3xl uppercase font-bold text-text">
              15,480 KM Powered On This Machine
            </h3>
            <p className="text-sm text-muted max-w-xl">
              Explore the field journals and GPS route maps from the expeditions where this Royal Enfield Meteor 350 led the way.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {rides.map((r) => (
              <Link
                key={r.id}
                href={`/rides/${r.slug}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-xs font-mono uppercase font-bold text-text hover:border-accent hover:text-accent transition-colors"
              >
                <span>{r.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}