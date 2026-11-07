"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Compass, Gauge, Bike, ShieldCheck, Sparkles, Map } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CommandPalette } from "@/components/ui/command-palette";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/rides", label: "Expeditions", icon: Map, exact: true },
  { href: "/rides/bike", label: "The Bike", icon: Bike },
  { href: "/rides/gear", label: "Gear & Loadout", icon: ShieldCheck },
  { href: "/rides/upcoming", label: "Upcoming", icon: Sparkles },
];

export function RidesNavbar() {
  const pathname = usePathname();

  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Back to dev site link + Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted hover:text-accent hover:border-accent transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span className="hidden sm:inline">Back to developer site</span>
            <span className="sm:hidden">Dev site</span>
          </Link>

          <div className="h-4 w-px bg-border" />

          <Link href="/rides" className="flex items-center gap-2 group">
            <Compass className="h-5 w-5 text-accent transition-transform group-hover:rotate-45" />
            <span className="font-display text-xl sm:text-2xl tracking-wider text-text font-bold">
              ON TWO WHEELS
            </span>
          </Link>

          {/* Odometer Live Badge */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent">
            <Gauge className="w-3 h-3" />
            <span>15,480 KM LOGGED</span>
          </div>
        </div>

        {/* Desktop Navigation items */}
        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1 text-xs font-mono uppercase tracking-wider">
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href, link.exact);
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all",
                    active
                      ? "bg-accent/15 text-accent font-bold border border-accent/30 shadow-xs"
                      : "text-muted hover:text-text hover:bg-surface-2"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="h-4 w-px bg-border hidden md:block" />

          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Horizontal Sub-Navigation Scroll Strip */}
      <div className="md:hidden border-t border-border/60 bg-surface/95 px-4 py-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {NAV_LINKS.map((link) => {
            const active = isLinkActive(link.href, link.exact);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-all",
                  active
                    ? "bg-accent text-accent-contrast font-bold shadow-xs"
                    : "border border-border/80 bg-surface text-muted hover:text-text"
                )}
              >
                <Icon className="w-3 h-3" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}