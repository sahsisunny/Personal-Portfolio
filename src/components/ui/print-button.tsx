"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-mono font-semibold text-accent-contrast shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
      aria-label="Print resume"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>Print Resume</span>
    </button>
  );
}
