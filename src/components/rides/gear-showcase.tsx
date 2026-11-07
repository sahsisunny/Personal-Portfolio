"use client";

import * as React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  HardHat,
  Luggage,
  Footprints,
  Cpu,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import type { GearItem } from "@/lib/schema";
import { cn } from "@/lib/utils";

interface GearShowcaseProps {
  initialItems: GearItem[];
}

const CATEGORIES = [
  { id: "all", label: "All Loadout", icon: Sparkles },
  { id: "armour", label: "Armour & Body", icon: ShieldCheck },
  { id: "helmets", label: "Helmets & Vision", icon: HardHat },
  { id: "luggage", label: "Luggage & Packs", icon: Luggage },
  { id: "footwear", label: "Boots & Gloves", icon: Footprints },
  { id: "tech", label: "Cockpit & Tech", icon: Cpu },
  { id: "emergency", label: "Rescue & Tools", icon: AlertTriangle },
];

export function GearShowcase({ initialItems }: GearShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const filteredItems = React.useMemo(() => {
    if (selectedCategory === "all") return initialItems;
    if (selectedCategory === "footwear") {
      // Group footwear and handwear together for intuitive category filtering
      return initialItems.filter(
        (item) => item.category === "footwear" || item.id.includes("gloves")
      );
    }
    return initialItems.filter((item) => item.category === selectedCategory);
  }, [initialItems, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border/80 pb-4">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer",
                isActive
                  ? "bg-accent text-accent-contrast font-bold shadow-md scale-102"
                  : "border border-border bg-surface text-muted hover:text-text hover:border-accent/40"
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
              <span className="text-[10px] opacity-75">
                (
                {cat.id === "all"
                  ? initialItems.length
                  : cat.id === "footwear"
                  ? initialItems.filter(
                      (i) => i.category === "footwear" || i.id.includes("gloves")
                    ).length
                  : initialItems.filter((i) => i.category === cat.id).length}
                )
              </span>
            </button>
          );
        })}
      </div>

      {/* Gear Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((gear) => (
          <div
            key={gear.id}
            className="group flex flex-col justify-between rounded-2xl border-2 border-border bg-surface overflow-hidden shadow-xs hover:border-accent hover:shadow-xl transition-all duration-300"
          >
            <div>
              {/* Product Visual SVG Illustration */}
              <div className="relative aspect-16/10 w-full bg-slate-950/70 border-b border-border flex items-center justify-center p-4 overflow-hidden">
                <Image
                  src={gear.image}
                  alt={gear.name}
                  width={600}
                  height={450}
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-103"
                />

                {/* Brand Badge */}
                <div className="absolute top-3 left-3 rounded-full bg-surface/90 backdrop-blur-xs border border-border px-3 py-1 text-[11px] font-mono font-bold text-accent">
                  {gear.brand}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 rounded-full bg-surface/90 backdrop-blur-xs border border-border px-3 py-1 text-[10px] font-mono text-muted uppercase">
                  {gear.categoryLabel}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-text font-bold group-hover:text-accent transition-colors">
                    {gear.name}
                  </h3>
                  <div className="mt-1.5 inline-block text-xs font-mono font-semibold text-accent/90 bg-accent/10 px-2.5 py-1 rounded-md">
                    {gear.spec}
                  </div>
                </div>

                <p className="text-sm text-muted leading-relaxed">
                  {gear.description}
                </p>

                {/* Field Experience Note */}
                {gear.fieldNotes && (
                  <div className="rounded-xl border border-border/80 bg-surface-2 p-3 text-xs text-muted font-sans flex items-start gap-2.5">
                    <span className="text-accent font-mono font-bold">FIELD LOG:</span>
                    <span>{gear.fieldNotes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Rating Footer */}
            <div className="p-6 pt-0 border-t border-border/50 mt-4 flex items-center justify-between text-xs font-mono text-muted">
              <span className="text-emerald-400 font-bold">
                {gear.rating || "Expedition Tested"}
              </span>
              <span className="text-muted/70">15,480 KM Road Proof</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
