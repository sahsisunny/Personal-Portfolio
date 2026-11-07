"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, FolderGit2, ArrowRight, ExternalLink, ShieldAlert, Bot, MapPin, Heart, Sparkles, Layers, Globe } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import type { Project } from "@/lib/schema";

interface ProjectsViewProps {
  initialProjects: Project[];
}

export function ProjectsView({ initialProjects }: ProjectsViewProps) {
  const [search, setSearch] = React.useState("");
  const [selectedTech, setSelectedTech] = React.useState<string>("All");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("All");

  // Extract all unique technologies
  const allTechs = React.useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, [initialProjects]);

  const statuses = ["All", "completed", "in-progress", "work-in-progress"];

  const filteredProjects = initialProjects
    .filter((project) => {
      const matchesSearch =
        search === "" ||
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.summary.toLowerCase().includes(search.toLowerCase()) ||
        project.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesTech =
        selectedTech === "All" || project.tech.includes(selectedTech);

      const matchesStatus =
        selectedStatus === "All" || project.status === selectedStatus;

      return matchesSearch && matchesTech && matchesStatus;
    })
    .sort((a, b) => {
      // Featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
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
    if (slug.includes("care-ring")) return <MapPin className="w-8 h-8 text-accent" />;
    if (slug.includes("home-assets")) return <Layers className="w-8 h-8 text-accent" />;
    if (slug.includes("linktree")) return <Globe className="w-8 h-8 text-accent" />;
    if (slug.includes("shadi")) return <Heart className="w-8 h-8 text-accent" />;
    return <FolderGit2 className="w-8 h-8 text-accent" />;
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search bar */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, technology, or keywords..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border bg-surface text-text placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-mono text-muted mr-1">Status:</span>
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setSelectedStatus(status)}
              className={`px-2.5 py-1 text-xs font-mono rounded-full border transition-colors ${
                selectedStatus === status
                  ? "bg-accent text-accent-contrast border-accent font-semibold"
                  : "bg-surface text-muted border-border hover:border-accent/40"
              }`}
            >
              {status === "All" ? "All" : status.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Tech tags row */}
      <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-border">
        <span className="text-xs font-mono text-muted mr-1">Tech:</span>
        {allTechs.slice(0, 12).map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => setSelectedTech(tech)}
            className={`px-2 py-0.5 text-xs font-mono rounded-md border transition-colors ${
              selectedTech === tech
                ? "bg-text text-bg border-text font-semibold"
                : "bg-surface-2/60 text-muted border-border hover:text-text hover:border-border/80"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-xl">
          <FolderGit2 className="w-10 h-10 text-muted mx-auto mb-3" />
          <h3 className="text-base font-bold text-text">No projects match your filter</h3>
          <p className="text-xs text-muted mt-1">Try resetting the search keyword or filter chips.</p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedTech("All");
              setSelectedStatus("All");
            }}
            className="mt-4 inline-flex text-xs font-mono text-accent hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isConfidential = project.visibility === "public-after-review";

            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between rounded-xl border border-border bg-surface overflow-hidden shadow-xs hover:border-accent/60 hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Visual Header with Real Project Screenshots */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface-2 flex items-center justify-center">
                    {project.images && project.images[0] ? (
                      <>
                        <Image
                          src={typeof project.images[0] === "string" ? project.images[0] : project.images[0].src}
                          alt={typeof project.images[0] === "string" ? `${project.title} screenshot` : project.images[0].alt || `${project.title} screenshot`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-black/20 pointer-events-none" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-surface-2 via-surface to-accent/10 flex items-center justify-center p-6">
                        <div className="p-3 rounded-2xl bg-surface border border-border/80 shadow-xs group-hover:scale-105 transition-transform">
                          {getProjectIcon(project.slug)}
                        </div>
                      </div>
                    )}

                    {/* Status badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {project.featured && (
                        <span className="rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          Featured
                        </span>
                      )}
                      {getStatusBadge(project.status)}
                    </div>

                    {/* Work project notice if confidential */}
                    {isConfidential && (
                      <div className="absolute bottom-2 left-2 rounded-md bg-surface/90 backdrop-blur-xs border border-border px-2 py-1 text-[10px] font-mono text-muted flex items-center gap-1 z-10">
                        <ShieldAlert className="w-3 h-3 text-amber-500" />
                        <span>Work project: details sanitized</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-text group-hover:text-accent transition-colors">
                      <Link href={`/projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>

                    {/* Highlights bullet list */}
                    <ul className="mt-4 space-y-1.5 text-xs text-muted">
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
                <div className="p-6 pt-0 border-t border-border/40 mt-4">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-surface-2 px-2 py-0.5 text-xs font-mono text-muted border border-border/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                    >
                      <span>Case Study</span>
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
            );
          })}
        </div>
      )}
    </div>
  );
}
