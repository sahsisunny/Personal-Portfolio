"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, FileText, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import type { FeatureFlags } from "@/lib/schema";

interface SiteNavbarProps {
  name: string;
  features?: FeatureFlags;
}

export function SiteNavbar({ name, features }: SiteNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  // Prevent scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isEnabled = (val: boolean | { enabled?: boolean } | undefined, defaultVal = true) => {
    if (val === undefined) return defaultVal;
    if (typeof val === "boolean") return val;
    return val?.enabled ?? defaultVal;
  };

  const navLinks = [
    { label: "Home", href: "/", show: true },
    { label: "Projects", href: "/#projects", show: isEnabled(features?.projects) },
    { label: "Experience", href: "/#experience", show: isEnabled(features?.experience) },
    { label: "Writing", href: "/#writing", show: isEnabled(features?.blog) },
    { label: "Skills", href: "/#skills", show: isEnabled(features?.skills) },
    { label: "Contact", href: "/#contact", show: isEnabled(features?.contact) },
  ].filter((link) => link.show);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1 flex-shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-contrast font-mono font-bold text-base shadow-sm flex-shrink-0">
            SS
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-bold leading-tight tracking-tight text-text whitespace-nowrap text-sm sm:text-base">
              {name}
            </span>
            <span className="text-[11px] text-muted font-mono leading-tight whitespace-nowrap hidden sm:block">
              Full Stack Developer
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? false
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent flex-shrink-0 whitespace-nowrap",
                  isActive ? "text-accent font-semibold" : "text-muted hover:text-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Highlighted Rides Link with Badge */}
          {isEnabled(features?.rides) && (
            <Link
              href="/rides"
              className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/60 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 flex-shrink-0 whitespace-nowrap"
            >
              <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <span className="font-semibold">Rides</span>
              <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider font-bold text-amber-800 dark:text-amber-200 whitespace-nowrap leading-none">
                Off the clock
              </span>
            </Link>
          )}

          <div className="mx-1.5 h-4 w-px bg-border flex-shrink-0" />

          {/* Resume button */}
          {isEnabled(features?.resume) && (
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted hover:text-text hover:bg-surface-2 transition-colors border border-border flex-shrink-0 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Resume</span>
            </Link>
          )}

          {/* Theme Toggle */}
          <ThemeToggle className="ml-1 flex-shrink-0" />
        </nav>

        {/* Mobile & Tablet controls (below lg): Theme toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          {isEnabled(features?.rides) && (
            <Link
              href="/rides"
              className="hidden sm:inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-300 mr-1"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Rides</span>
            </Link>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted hover:text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer rendered via Portal at document.body level */}
      {mobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] flex flex-col justify-between bg-surface/98 backdrop-blur-2xl px-6 py-6 lg:hidden overflow-y-auto animate-in fade-in duration-200"
            style={{ backgroundColor: "var(--surface)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            {/* Top Bar with Brand & Actions */}
            <div className="flex items-center justify-between pb-5 border-b border-border/60">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-contrast font-mono font-bold text-sm shadow-sm">
                  SS
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-text text-base tracking-tight leading-none">
                    {name}
                  </span>
                  <span className="text-[11px] text-muted font-mono mt-1">
                    Full Stack Developer
                  </span>
                </div>
              </Link>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-surface text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Editorial Nav List */}
            <div className="py-6 flex-1 flex flex-col justify-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted mb-3 font-semibold">
                Index
              </span>
              <nav className="flex flex-col space-y-1">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-baseline justify-between py-2.5 px-3 rounded-xl transition-all hover:bg-surface-2"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-muted/60 group-hover:text-accent transition-colors">
                        0{idx + 1}
                      </span>
                      <span
                        className="text-2xl font-bold text-text group-hover:text-accent group-hover:translate-x-1 transition-all"
                        style={{ fontFamily: "var(--font-barlow-condensed)" }}
                      >
                        {link.label}
                      </span>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                ))}
              </nav>

              {/* Special Expeditions & Resume Highlight Strip */}
              <div className="mt-6 pt-5 border-t border-border/60 space-y-2.5">
                {isEnabled(features?.rides) && (
                  <Link
                    href="/rides"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-accent/30 bg-accent/5 hover:bg-accent/10 hover:border-accent/50 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-accent/15 text-accent">
                        <Compass className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-text group-hover:text-accent transition-colors leading-tight">
                          On Two Wheels
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                          Solo motorcycle expeditions
                        </span>
                      </div>
                    </div>
                    <span className="rounded-full bg-accent/15 border border-accent/25 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider font-bold text-accent">
                      Off the clock
                    </span>
                  </Link>
                )}

                {isEnabled(features?.resume) && (
                  <Link
                    href="/resume"
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-border/80 bg-surface-2/40 hover:bg-surface-2 hover:border-accent/40 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-surface border border-border text-muted group-hover:text-accent transition-colors">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-text group-hover:text-accent transition-colors leading-tight">
                          Curriculum Vitae
                        </span>
                        <span className="text-[10px] font-mono text-muted">
                          Full stack &amp; Go systems resume
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
              <span>Based in India</span>
              <span className="text-accent font-semibold">Open to Opportunities</span>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
