"use client";

import * as React from "react";
import Link from "next/link";
import {
  FolderGit2,
  ExternalLink,
  ArrowRight,
  Bot,
  MapPin,
  Heart,
  ShieldAlert,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import type { Project } from "@/lib/schema";

interface FeaturedProjectsSectionProps {
  projects: Project[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
  const [filter, setFilter] = React.useState<string>("all");

  const categories = [
    { id: "all", label: "All Featured" },
    { id: "ai", label: "AI & Agents" },
    { id: "fullstack", label: "Full Stack" },
    { id: "mobile", label: "Location & Cloud" },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "ai") return p.slug.includes("ai-chatbot") || p.tech.some((t) => t.includes("LLM") || t.includes("Claude"));
    if (filter === "fullstack") return p.tech.includes("Next.js") || p.tech.includes("Go");
    if (filter === "mobile") return p.slug.includes("family-tracker") || p.tech.includes("Firebase");
    return true;
  });

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-mono font-medium">
            Completed
          </span>
        );
      case "in-progress":
        return (
          <span className="rounded-full bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 text-xs font-mono font-medium">
            In Progress
          </span>
        );
      case "work-in-progress":
        return (
          <span className="rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 py-0.5 text-xs font-mono font-medium">
            WIP
          </span>
        );
    }
  };

  const getProjectIcon = (slug: string) => {
    if (slug.includes("ai-chatbot")) return <Bot className="w-8 h-8 text-accent" />;
    if (slug.includes("family-tracker")) return <MapPin className="w-8 h-8 text-accent" />;
    if (slug.includes("shadi")) return <Heart className="w-8 h-8 text-accent" />;
    return <FolderGit2 className="w-8 h-8 text-accent" />;
  };

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Featured Projects
            </h2>
            <p className="mt-2 text-muted text-base max-w-xl">
              Production systems, AI chatbot agents, and software built with rigor.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline self-start sm:self-auto"
          >
            <span>View all projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-mono transition-all ${
                filter === cat.id
                  ? "bg-accent text-accent-contrast font-medium shadow-xs"
                  : "bg-surface border border-border text-muted hover:text-text hover:border-accent/50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Featured Grid with Spotlight glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isConfidential = project.visibility === "public-after-review";

            return (
              <SpotlightCard
                key={project.id}
                className="group flex flex-col justify-between overflow-hidden shadow-xs hover:border-accent/60 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Visual Header */}
                    <div className="relative aspect-video w-full bg-gradient-to-br from-surface-2 via-surface to-accent/10 border-b border-border flex items-center justify-center p-6">
                      <div className="p-3 rounded-2xl bg-surface border border-border/80 shadow-xs group-hover:scale-105 transition-transform">
                        {getProjectIcon(project.slug)}
                      </div>

                      {/* Status badge in top right */}
                      <div className="absolute top-3 right-3 flex items-center gap-2">
                        {getStatusBadge(project.status)}
                      </div>

                      {/* Work project notice if confidential */}
                      {isConfidential && (
                        <div className="absolute bottom-2 left-2 rounded-md bg-surface/90 backdrop-blur-xs border border-border px-2 py-1 text-[10px] font-mono text-muted flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-amber-500" />
                          <span>Sanitized for confidentiality</span>
                        </div>
                      )}
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors leading-snug">
                        <Link href={`/projects/${project.slug}`}>
                          {project.title}
                        </Link>
                      </h3>

                      <p className="text-sm text-muted leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>

                      {/* Highlights bullet list */}
                      <ul className="pt-2 space-y-1.5 text-xs text-muted">
                        {project.highlights.slice(0, 2).map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-accent font-mono">▸</span>
                            <span className="line-clamp-1">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer with tech chips and actions */}
                  <div className="p-6 pt-0 border-t border-border/40 mt-4 space-y-4">
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded bg-surface-2 px-2 py-0.5 text-xs font-mono text-muted border border-border/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                      >
                        <span>Read Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {project.links.repo && (
                          <a
                            href={project.links.repo}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-md text-muted hover:text-text hover:bg-surface-2 transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-md text-muted hover:text-text hover:bg-surface-2 transition-colors"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}