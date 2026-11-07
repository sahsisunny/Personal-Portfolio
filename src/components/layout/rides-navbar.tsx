"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Gauge } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CommandPalette } from "@/components/ui/command-palette";

export function RidesNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/85 backdrop-blur-md transition-colors">
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
            <span className="font-display text-2xl tracking-wider text-text font-bold">
              ON TWO WHEELS
            </span>
          </Link>

          {/* Odometer Live Badge */}
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-accent">
            <Gauge className="w-3 h-3" />
            <span>15,480 KM LOGGED</span>
          </div>
        </div>

        {/* Navigation items & Theme toggle */}
        <div className="flex items-center gap-3">
          <nav className="hidden md:flex items-center gap-4 text-xs font-mono uppercase tracking-wider text-muted">
            <Link href="/rides#cockpit" className="hover:text-accent transition-colors">
              Cockpit
            </Link>
            <Link href="/rides#map" className="hover:text-accent transition-colors">
              Routes
            </Link>
            <Link href="/rides#stories" className="hover:text-accent transition-colors">
              Expeditions
            </Link>
            <Link href="/rides#gear" className="hover:text-accent transition-colors">
              The Garage
            </Link>
          </nav>

          <div className="h-4 w-px bg-border hidden md:block" />

          <CommandPalette />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
