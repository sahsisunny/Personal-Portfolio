"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Compass, FileText, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CommandPalette } from "@/components/ui/command-palette";
import { cn } from "@/lib/utils";

interface SiteNavbarProps {
  name: string;
  headline: string;
}

export function SiteNavbar({ name, headline }: SiteNavbarProps) {
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

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Experience", href: "/#experience" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-surface/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo / Identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-contrast font-mono font-bold text-base shadow-sm">
            SS
          </div>
          <div>
            <span className="block font-bold leading-tight tracking-tight text-text">
              {name}
            </span>
            <span className="block text-xs text-muted font-mono leading-none">
              {headline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
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
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  isActive ? "text-accent font-semibold" : "text-muted hover:text-text"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Highlighted Rides Link with Badge */}
          <Link
            href="/rides"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-amber-600/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 hover:border-amber-500 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span>Rides</span>
            <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[10px] font-mono uppercase tracking-wide">
              Off the clock
            </span>
          </Link>

          <div className="mx-2 h-4 w-px bg-border" />

          {/* Resume button */}
          <Link
            href="/resume"
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-muted hover:text-text hover:bg-surface-2 transition-colors border border-border"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </Link>

          {/* Command Palette */}
          <CommandPalette />

          {/* Theme Toggle */}
          <ThemeToggle className="ml-1" />
        </nav>

        {/* Mobile controls: Search + Theme toggle + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <CommandPalette />
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
          className="fixed inset-x-0 top-16 bottom-0 z-50 flex flex-col justify-between border-t border-border bg-surface/98 p-6 backdrop-blur-xl md:hidden overflow-y-auto"
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
          </div>

          <div className="pt-6 text-center text-xs text-muted border-t border-border">
            Patna, India • Remote Full Stack Developer
          </div>
        </div>
      )}
    </header>
  );
}
