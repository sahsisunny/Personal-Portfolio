"use client";

import * as React from "react";
import { Copy, Check, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";
import type { Socials } from "@/lib/schema";

interface ContactSectionProps {
  email: string;
  heading: string;
  subheading: string;
  socials: Socials;
}

export function ContactSection({ email, heading, subheading, socials }: ContactSectionProps) {
  const [copied, setCopied] = React.useState(false);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // anti-spam
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) {
      // Bot detected via honeypot
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          honeypot: formData.honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err: unknown) {
      setStatus("error");
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(message);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Info */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              {heading}
            </h2>

            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {subheading}
            </p>

            {/* Direct Email with Copy Button */}
            <div className="rounded-xl border border-border bg-surface p-5 shadow-xs space-y-3">
              <span className="text-xs font-mono text-muted uppercase">Direct Email</span>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-sm sm:text-base font-semibold text-text hover:text-accent transition-colors truncate"
                >
                  {email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-3 py-1.5 text-xs font-medium text-text hover:bg-border transition-colors flex-shrink-0"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        Copied!
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Connects */}
            <div>
              <span className="text-xs font-mono text-muted uppercase block mb-3">
                Online Profiles
              </span>
              <div className="flex items-center gap-3">
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {socials.x && (
                  <a
                    href={socials.x}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs font-mono text-muted hover:text-text hover:border-accent transition-colors"
                  >
                    <TwitterIcon className="w-4 h-4" />
                    <span>Twitter/X</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg font-bold text-text mb-1">Send a message</h3>
              <p className="text-xs text-muted font-mono mb-6">
                Typically responds within 24-48 hours.
              </p>

              {status === "success" ? (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center space-y-2">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-1">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-text">Message received!</h4>
                  <p className="text-sm text-muted">
                    Thanks for reaching out, Sunny will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-4 inline-flex text-xs font-mono text-accent hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot field (hidden from real users) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website-trap">Leave this field empty</label>
                    <input
                      id="website-trap"
                      type="text"
                      name="website-trap"
                      value={formData.honeypot}
                      onChange={(e) =>
                        setFormData({ ...formData, honeypot: e.target.value })
                      }
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-muted uppercase mb-1.5"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-muted uppercase mb-1.5"
                    >
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-muted uppercase mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="What would you like to discuss or collaborate on?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-text placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors resize-y"
                    />
                  </div>

                  {status === "error" && (
                    <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-xs text-red-600 dark:text-red-400">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast shadow-sm hover:opacity-95 transition-opacity disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
