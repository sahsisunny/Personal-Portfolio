"use client";

import * as React from "react";
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
    { label: "Experience", href: "/#experience", show: isEnabled(features?.experience) },
    { label: "Projects", href: "/projects", show: isEnabled(features?.projects) },
    { label: "Blog", href: "/blog", show: isEnabled(features?.blog) },
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

        {/* Medium Screen Navigation (between md and lg) */}
        <div className="hidden md:flex lg:hidden items-center gap-2">
          {isEnabled(features?.projects) && (
            <Link
              href="/projects"
              className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:text-text"
            >
              Projects
            </Link>
          )}
          {isEnabled(features?.blog) && (
            <Link
              href="/blog"
              className="rounded-md px-2 py-1 text-xs font-medium text-muted hover:text-text"
            >
              Blog
            </Link>
          )}
          {isEnabled(features?.rides) && (
            <Link
              href="/rides"
              className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-300"
            >
              <Compass className="w-3 h-3" />
              <span>Rides</span>
            </Link>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted hover:text-text hover:bg-surface-2 transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Mobile controls: Theme toggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted hover:text-text hover:bg-surface-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col justify-between border-t border-border bg-surface/98 p-6 backdrop-blur-xl lg:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-text hover:bg-surface-2 hover:text-accent transition-colors"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-4 w-4 text-muted" />
              </Link>
            ))}

            {isEnabled(features?.rides) && (
              <div className="my-2 border-t border-border pt-2">
                <Link
                  href="/rides"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3.5 text-base font-semibold text-amber-800 dark:text-amber-200"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <span>On Two Wheels (Rides)</span>
                  </div>
                  <span className="rounded-full bg-amber-500/20 px-2 py-0.5 font-mono text-xs uppercase">
                    Off the clock
                  </span>
                </Link>
              </div>
            )}

            {isEnabled(features?.resume) && (
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg border border-border px-4 py-3 text-base font-medium text-text hover:bg-surface-2"
              >
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted" />
                  <span>Resume</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted" />
              </Link>
            )}
          </div>

          <div className="pt-6 text-center text-xs text-muted border-t border-border">
            Patna, India • Remote Full Stack Developer
          </div>
        </div>
      )}
    </header>
  );
}
