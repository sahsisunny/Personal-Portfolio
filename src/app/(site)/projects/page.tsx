import type { Metadata } from "next";
import { getProjects } from "@/lib/data";
import { ProjectsView } from "@/components/projects/projects-view";
import { FolderGit2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Projects | Sunny Sahsi",
  description:
    "Engineering case studies, Go backend services, AI chatbot agents, and full-stack web applications by Sunny Sahsi.",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
            <FolderGit2 className="w-4 h-4" />
            <span>Portfolio of Work</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Projects & Case Studies
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted">
            A curated collection of web apps, microservice integrations, and AI agent architectures built with Next.js, Go, and TypeScript.
          </p>
        </div>

        {/* Interactive Filter & List */}
        <ProjectsView initialProjects={projects} />
      </div>
    </div>
  );
}
