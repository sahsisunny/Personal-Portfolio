import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import type { FeatureFlags } from "@/lib/schema";

interface SiteFooterProps {
  name: string;
  socials: {
    github?: string | null;
    linkedin?: string | null;
    x?: string | null;
  };
  email: string;
  features?: FeatureFlags;
}

export function SiteFooter({ name, socials, email, features }: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-surface-2/40 py-12 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-text">{name}</p>
            <p className="text-xs text-muted">
              Full Stack & Systems Engineer • Next.js, TypeScript & Go
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center space-x-3">
            {socials.github && (
              <a
                href={socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent transition-colors"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            )}
            {socials.linkedin && (
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent transition-colors"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            )}
            {socials.x && (
              <a
                href={socials.x}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent transition-colors"
                aria-label="X Profile"
              >
                <TwitterIcon className="h-4 w-4" />
              </a>
            )}
            <a
              href={`mailto:${email}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted hover:text-text hover:border-accent transition-colors"
              aria-label="Send Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted">
            <span>Built with Next.js &amp; Tailwind CSS</span>
            {(features?.rides ?? true) && (
              <>
                <span>•</span>
                <Link href="/rides" className="hover:text-accent underline underline-offset-4">
                  Explore Rides →
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
