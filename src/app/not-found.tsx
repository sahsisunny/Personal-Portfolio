import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md space-y-6">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent font-mono text-3xl font-extrabold border border-accent/20">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-text">
            Off the beaten track
          </h1>
          <p className="text-sm text-muted">
            The page you are looking for doesn&apos;t exist or has moved. Head back home or explore the motorcycle expeditions.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-accent-contrast shadow-sm hover:opacity-95 transition-opacity"
          >
            <Home className="w-4 h-4" />
            <span>Developer Home</span>
          </Link>
          <Link
            href="/rides"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text hover:bg-surface-2 transition-colors"
          >
            <Compass className="w-4 h-4 text-accent" />
            <span>On Two Wheels</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
