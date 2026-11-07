import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "@/components/ui/icons";

interface RidesFooterProps {
  socials: {
    instagram?: string | null;
    youtube?: string | null;
  };
}

export function RidesFooter({ socials }: RidesFooterProps) {
  return (
    <footer className="border-t border-border bg-surface-2/40 py-12 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="font-display text-2xl tracking-wide text-text">ON TWO WHEELS</p>
            <p className="text-xs text-muted font-mono">
              Solo motorcycle touring across India • Patna to Ladakh • Patna to Rameshwaram
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
            )}
            {socials.youtube && (
              <a
                href={socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-accent hover:border-accent transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-4 w-4" />
              </a>
            )}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text hover:text-accent hover:border-accent transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Developer Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
