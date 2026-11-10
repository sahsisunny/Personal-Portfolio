"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, FolderGit2, PenLine, Compass, FileText, Home, User } from "lucide-react";

interface PaletteItem {
  id: string;
  label: string;
  category: "Navigation" | "Projects" | "Articles" | "Rides";
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const ITEMS: PaletteItem[] = [
  { id: "home", label: "Home", category: "Navigation", href: "/", icon: Home },
  { id: "exp", label: "Work Experience", category: "Navigation", href: "/#experience", icon: User },
  {
    id: "proj-all",
    label: "All Projects",
    category: "Navigation",
    href: "/projects",
    icon: FolderGit2,
  },
  {
    id: "blog-all",
    label: "Writing & Notes",
    category: "Navigation",
    href: "/blog",
    icon: PenLine,
  },
  {
    id: "rides-home",
    label: "On Two Wheels (Rides)",
    category: "Navigation",
    href: "/rides",
    icon: Compass,
  },
  {
    id: "resume",
    label: "Printable Resume",
    category: "Navigation",
    href: "/resume",
    icon: FileText,
  },

  // Projects
  {
    id: "p-agent",
    label: "AI Chatbot Agent (Property Management)",
    category: "Projects",
    href: "/projects/ai-chatbot-agent",
    icon: FolderGit2,
  },
  {
    id: "p-care-ring",
    label: "CareRing (Family Location & Safety)",
    category: "Projects",
    href: "/projects/care-ring",
    icon: FolderGit2,
  },
  {
    id: "p-home-assets",
    label: "Home Asset Manager (AI Invoice OCR)",
    category: "Projects",
    href: "/projects/home-assets",
    icon: FolderGit2,
  },
  {
    id: "p-gitrackr",
    label: "GitTrackr (GitHub Triage Dashboard)",
    category: "Projects",
    href: "/projects/gittrackr",
    icon: FolderGit2,
  },
  {
    id: "p-linktree",
    label: "LinkHub (Link-in-Bio Platform)",
    category: "Projects",
    href: "/projects/linktree",
    icon: FolderGit2,
  },
  {
    id: "p-sweetcart",
    label: "SweetCart (E-Commerce Storefront)",
    category: "Projects",
    href: "/projects/sweetcart",
    icon: FolderGit2,
  },
  {
    id: "p-shadi",
    label: "Shadi Wedding Invitations",
    category: "Projects",
    href: "/projects/shadi-invitations",
    icon: FolderGit2,
  },

  // Articles
  {
    id: "a-pms-orchestrator",
    label: "Inside a Hotel PMS AI Orchestrator: Multi-Service LLMs & Zero-Trust",
    category: "Articles",
    href: "/blog/hotel-pms-ai-orchestrator",
    icon: PenLine,
  },
  {
    id: "a-pms-mcp",
    label: "Building a Read-Only MCP Tool Server for Enterprise Hotel PMS Data",
    category: "Articles",
    href: "/blog/hotel-pms-mcp-tool-server",
    icon: PenLine,
  },

  // Rides
  {
    id: "r-ladakh",
    label: "Patna to Ladakh (Himalayan passes)",
    category: "Rides",
    href: "/rides/patna-to-ladakh",
    icon: Compass,
  },
  {
    id: "r-rameshwaram",
    label: "Patna to Rameshwaram (Southern tip)",
    category: "Rides",
    href: "/rides/patna-to-rameshwaram",
    icon: Compass,
  },
];

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();

  // Listen for ⌘K or Ctrl+K
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!query.trim()) return ITEMS;
    return ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const selectItem = (item: PaletteItem) => {
    setOpen(false);
    setQuery("");
    router.push(item.href);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      selectItem(filteredItems[selectedIndex]);
    }
  };

  return (
    <>
      {/* Trigger pill */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-muted hover:text-text hover:bg-surface-2 transition-colors cursor-pointer flex-shrink-0 whitespace-nowrap"
        aria-label="Open Command Palette (⌘K)"
      >
        <Search className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="hidden xl:inline">Search...</span>
        <kbd className="hidden sm:inline-flex items-center rounded border border-border bg-surface-2 px-1 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>

      {/* Palette Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-surface shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Input Header */}
            <div className="flex items-center border-b border-border px-4 py-3">
              <Search className="w-4 h-4 text-muted mr-3 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-sm text-text placeholder:text-muted/60 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-md text-muted hover:text-text cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredItems.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted font-mono">
                  No matching destinations found.
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-accent text-accent-contrast font-semibold"
                          : "text-text hover:bg-surface-2"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-accent-contrast" : "text-muted"}`}
                        />
                        <span className="truncate">{item.label}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase tracking-wider ml-2 flex-shrink-0 ${isSelected ? "text-accent-contrast/80" : "text-muted"}`}
                      >
                        {item.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-4 py-2 bg-surface-2/60 text-[10px] font-mono text-muted flex items-center justify-between">
              <span>Use ↑ ↓ to navigate</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
