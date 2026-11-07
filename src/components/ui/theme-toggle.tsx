"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  // Safe hydration check without cascading render
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const cycleTheme = () => {
    if (theme === "system") {
      setTheme("light");
    } else if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("system");
    }
  };

  const getLabel = () => {
    if (!mounted) return "Toggle theme";
    if (theme === "light") return "Theme: Light (click to switch to Dark)";
    if (theme === "dark") return "Theme: Dark (click to switch to System)";
    return "Theme: System (click to switch to Light)";
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-border bg-surface text-text hover:bg-surface-2 hover:border-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      aria-label={getLabel()}
      title={getLabel()}
    >
      <span className="sr-only">{getLabel()}</span>
      {!mounted ? (
        <span className="w-4 h-4" />
      ) : theme === "light" ? (
        <Sun className="w-4 h-4 text-amber-500 transition-transform duration-200" />
      ) : theme === "dark" ? (
        <Moon className="w-4 h-4 text-accent transition-transform duration-200" />
      ) : (
        <Monitor className="w-4 h-4 text-muted transition-transform duration-200" />
      )}
    </button>
  );
}
