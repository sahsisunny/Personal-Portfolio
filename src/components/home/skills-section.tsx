"use client";

import * as React from "react";
import type { Skills } from "@/lib/schema";
import { Cpu, Search } from "lucide-react";
import { SkillIcon } from "./skill-icons";
import { SpotlightCard } from "@/components/ui/spotlight-card";

interface SkillsSectionProps {
  skills: Skills;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const categories = [
    { id: "all", label: "All Skills" },
    ...skills.groups.map((g) => ({ id: g.id, label: g.label })),
  ];

  // Filter groups and items
  const filteredGroups = skills.groups
    .filter((group) => {
      if (selectedCategory === "all") return true;
      return group.id === selectedCategory;
    })
    .map((group) => {
      if (!searchQuery.trim()) return group;
      const q = searchQuery.toLowerCase();
      const filteredItems = group.items.filter((item) =>
        item.name.toLowerCase().includes(q)
      );
      return {
        ...group,
        items: filteredItems,
      };
    })
    .filter((group) => group.items.length > 0);

  const totalMatchingItems = filteredGroups.reduce(
    (acc, g) => acc + g.items.length,
    0
  );

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-border bg-surface-2/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
          <Cpu className="w-4 h-4" />
          <span>Technical Toolkit</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl mb-3">
              Skills & Technologies
            </h2>
            <p className="max-w-2xl text-muted text-base">
              Languages, frameworks, databases, and AI tooling I use to design and ship production software.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies..."
              className="w-full rounded-lg border border-border bg-surface pl-9 pr-4 py-2 text-xs font-mono text-text placeholder:text-muted focus:border-accent focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-text font-mono"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-mono transition-all ${
                selectedCategory === cat.id
                  ? "bg-accent text-accent-contrast font-medium shadow-xs"
                  : "bg-surface border border-border text-muted hover:text-text hover:border-accent/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
          <span className="text-xs font-mono text-muted ml-auto hidden sm:inline">
            Showing {totalMatchingItems} technologies
          </span>
        </div>

        {/* Skill Groups Grid with Spotlight Glow */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map((group) => (
              <SpotlightCard
                key={group.id}
                className="p-5 sm:p-6 flex flex-col justify-between hover:border-accent/40"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/70 pb-3 mb-4">
                    <h3 className="font-bold text-base text-text">{group.label}</h3>
                    <span className="text-xs font-mono text-muted">
                      {group.items.length} items
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {group.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 rounded-lg bg-surface-2/50 px-3.5 py-2.5 text-sm text-text border border-border/50 hover:border-accent/40 hover:bg-surface-2 transition-colors group"
                      >
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-surface border border-border p-1 shadow-xs group-hover:scale-110 transition-transform">
                          <SkillIcon name={item.name} className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-xs sm:text-sm text-text leading-tight">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-xl border border-border bg-surface text-muted font-mono text-sm">
            No technologies found matching &ldquo;{searchQuery}&rdquo;.
          </div>
        )}
      </div>
    </section>
  );
}
