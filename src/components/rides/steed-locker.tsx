"use client";

import * as React from "react";
import { Bike, Shield, Package, Wrench, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type GarageTab = "bike" | "armour" | "luggage" | "toolkit";

export function SteedLocker() {
  const [activeTab, setActiveTab] = React.useState<GarageTab>("bike");

  return (
    <section id="gear" className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-widest font-semibold block mb-1">
            The Garage & Steed Locker
          </span>
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide text-text font-bold">
            Rigged for 15,000+ Kilometers
          </h2>
          <p className="text-sm text-muted max-w-xl mt-1">
            Everything carried on two wheels: the mechanical steed, safety armour, luggage rig, and survival essentials.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface border border-border">
          <button
            type="button"
            onClick={() => setActiveTab("bike")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all",
              activeTab === "bike"
                ? "bg-accent text-accent-contrast font-bold shadow-xs"
                : "text-muted hover:text-text"
            )}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>The Steed</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("armour")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all",
              activeTab === "armour"
                ? "bg-accent text-accent-contrast font-bold shadow-xs"
                : "text-muted hover:text-text"
            )}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Armour</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("luggage")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all",
              activeTab === "luggage"
                ? "bg-accent text-accent-contrast font-bold shadow-xs"
                : "text-muted hover:text-text"
            )}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Luggage</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("toolkit")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg transition-all",
              activeTab === "toolkit"
                ? "bg-accent text-accent-contrast font-bold shadow-xs"
                : "text-muted hover:text-text"
            )}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>Survival Kit</span>
          </button>
        </div>
      </div>

      {/* Tab 1: The Steed */}
      {activeTab === "bike" && (
        <div className="rounded-2xl border-2 border-border bg-surface p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/70 pb-6">
            <div>
              <div className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                Solo Touring Cruiser
              </div>
              <h3 className="font-display text-3xl sm:text-4xl text-text font-bold mt-1">
                Royal Enfield Meteor 350
              </h3>
              <p className="text-sm text-muted font-mono mt-1">
                349cc J-Series Engine • Air-Oil Cooled • Dual-Channel ABS • 191 kg Kerb Weight
              </p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 font-mono text-xs text-accent">
              <span className="font-bold">Total Ridden:</span> 15,480 km across 14 states
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1">
              <div className="text-muted">ENGINE OUTPUT</div>
              <div className="text-lg font-bold text-text">20.2 BHP @ 6,100 RPM</div>
              <div className="text-[11px] text-muted">27 Nm Torque @ 4,000 RPM</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1">
              <div className="text-muted">FUEL CAPACITY</div>
              <div className="text-lg font-bold text-text">15 Liters</div>
              <div className="text-[11px] text-muted">~480 km touring range per tank</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1">
              <div className="text-muted">BRAKING & SAFETY</div>
              <div className="text-lg font-bold text-text">Dual-Channel ABS</div>
              <div className="text-[11px] text-muted">Front 300mm disc, Rear 270mm disc</div>
            </div>
            <div className="p-4 rounded-xl border border-border bg-surface-2/60 space-y-1">
              <div className="text-muted">WHEELS & TIRES</div>
              <div className="text-lg font-bold text-text">19&quot; Front / 17&quot; Rear</div>
              <div className="text-[11px] text-muted">Alloy wheels with tubeless touring rubber</div>
            </div>
          </div>

          {/* Rider Philosophy Callout */}
          <div className="p-5 rounded-xl border border-border/80 bg-surface-2/40 text-sm leading-relaxed text-muted">
            <strong className="text-text block mb-1 font-mono text-xs uppercase tracking-wide">
              The Royal Enfield Meteor 350 Touring Experience
            </strong>
            &ldquo;Long-distance solo touring across India is about rhythm and physical endurance. The Meteor 350&apos;s cruiser ergonomics—relaxed upright seating, wide handlebars, and cushioned saddle—prevent fatigue during 700 km highway sprints. The 349cc J-series engine produces steady, accessible low-end torque that pulls effortlessly up steep Himalayan switchbacks and high passes like Khardung La without breaking a sweat.&rdquo;
          </div>
        </div>
      )}

      {/* Tab 2: Armour */}
      {activeTab === "armour" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: "Rynox All-Weather Touring Jacket",
              spec: "CE Level 2 Armour (Shoulders, Elbows, Back)",
              note: "Thermal inner liner for sub-zero Himalayan nights; rain liner for heavy monsoon showers.",
            },
            {
              title: "MT Dual-Visor DOT/ECE Helmet",
              spec: "Pinlock 30 Anti-Fog Lens & Internal Sun Visor",
              note: "Crucial for avoiding visor fogging when crossing freezing mountain passes at 17,000 ft.",
            },
            {
              title: "Viaterra All-Weather Touring Gloves",
              spec: "Knuckle Protectors + Waterproof Hipora Membrane",
              note: "Keeps fingers warm and responsive in freezing rain and hail on Baralacha La.",
            },
            {
              title: "CE Level 2 Knee & Shin Protectors",
              spec: "Bionic Ergonomic Articulated Guards",
              note: "Impact absorption from flying gravel on unpaved Spiti and Ladakh trails.",
            },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl border border-border bg-surface space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle2 className="w-4 h-4" />
                <h4 className="font-bold text-base text-text">{item.title}</h4>
              </div>
              <div className="text-xs font-mono text-accent-2 font-semibold">{item.spec}</div>
              <p className="text-xs text-muted leading-relaxed">{item.note}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Luggage Rig */}
      {activeTab === "luggage" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "55L Waterproof Saddlebags",
              brand: "Viaterra Condor Drypack",
              details: "100% welded seams. Carries clothing, thermals, sleeping bag, and spares safely above exhaust heat.",
            },
            {
              title: "Magnetic Tank Bag",
              brand: "Quick-Access Map Window",
              details: "Holds power banks, camera batteries, physical route map, snacks, and electrolyte tablets.",
            },
            {
              title: "Heavy-Duty Cargo Bungees",
              brand: "High-Tensile Tie-Downs",
              details: "Keeps the center of gravity low and tight on the rear subframe over bone-jarring corrugations.",
            },
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-xl border border-border bg-surface space-y-2">
              <div className="flex items-center gap-2 text-accent">
                <Package className="w-4 h-4" />
                <h4 className="font-bold text-base text-text">{item.title}</h4>
              </div>
              <div className="text-xs font-mono text-muted">{item.brand}</div>
              <p className="text-xs text-muted leading-relaxed">{item.details}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Survival & Toolkit */}
      {activeTab === "toolkit" && (
        <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
          <div className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Solo Survival Protocol
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-lg border border-border bg-surface-2/60">
              <strong className="text-text block mb-1">Tire Inflation:</strong>
              12V portable electric pump + tubeless plug strips + reamer.
            </div>
            <div className="p-3.5 rounded-lg border border-border bg-surface-2/60">
              <strong className="text-text block mb-1">Cables & Fuses:</strong>
              Pre-routed spare clutch cable, throttle wire, 10A/15A blade fuses.
            </div>
            <div className="p-3.5 rounded-lg border border-border bg-surface-2/60">
              <strong className="text-text block mb-1">Lubrication:</strong>
              Motul chain cleaner, O-ring chain lube (applied every 500 km).
            </div>
            <div className="p-3.5 rounded-lg border border-border bg-surface-2/60">
              <strong className="text-text block mb-1">Medical & AMS:</strong>
              Diamox for altitude sickness, ORS electrolyte packs, emergency splint.
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
