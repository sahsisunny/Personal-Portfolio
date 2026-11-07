import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  Workflow,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { getProjects, getProjectBySlug } from "@/lib/data";
import { getProjectCaseStudyMdx } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { ModernBlogRenderer } from "@/components/blog/modern-blog-renderer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Sunny Sahsi`,
      description: project.summary,
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const mdxContent = getProjectCaseStudyMdx(slug);
  const isConfidential = project.visibility === "public-after-review";

  return (
    <article className="py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-2">
            {project.featured && (
              <span className="rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 px-2.5 py-0.5 text-xs font-mono font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured Project
              </span>
            )}
            <span className="rounded-full bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 text-xs font-mono font-medium">
              {project.status.replace("-", " ")}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <header className="border-b border-border pb-10 mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>

          <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed">
            {project.summary}
          </p>

          {/* Confidentiality notice */}
          {isConfidential && (
            <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs font-mono text-amber-800 dark:text-amber-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block mb-0.5">Proprietary / Work Project Policy</span>
                <span>
                  Client names, confidential production endpoints, and private database credentials are sanitized. Architecture and engineering solutions are discussed generically.
                </span>
              </div>
            </div>
          )}

          {/* Meta Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-border bg-surface p-5 text-xs font-mono shadow-xs">
            <div>
              <span className="text-muted block mb-1">Timeline</span>
              <span className="text-text font-semibold">
                {project.period.start ? formatDate(project.period.start) : "Ongoing"}
                {project.period.end ? ` — ${formatDate(project.period.end)}` : ""}
              </span>
            </div>
            <div>
              <span className="text-muted block mb-1">Visibility</span>
              <span className="text-text font-semibold capitalize">
                {project.visibility.replace(/-/g, " ")}
              </span>
            </div>
            <div>
              <span className="text-muted block mb-1">Artifacts</span>
              <div className="flex items-center gap-2">
                {project.links.repo ? (
                  <a
                    href={project.links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline flex items-center gap-1"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Repo</span>
                  </a>
                ) : (
                  <span className="text-muted">Private</span>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent hover:underline flex items-center gap-1 ml-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg bg-surface-2 px-3 py-1 text-xs font-mono text-text border border-border"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        {/* Project Preview Image */}
        {project.images && project.images[0] && (
          <div className="relative aspect-video w-full mb-12 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-md">
            <Image
              src={typeof project.images[0] === "string" ? project.images[0] : project.images[0].src}
              alt={typeof project.images[0] === "string" ? `${project.title} screenshot` : project.images[0].alt || `${project.title} screenshot`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
              className="object-cover object-top"
            />
          </div>
        )}

        {/* Case Study Content Blocks */}
        <div className="space-y-12">
          {/* Problem */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <Workflow className="w-4 h-4" />
              <span>1. The Problem & Context</span>
            </div>
            <h2 className="text-2xl font-bold text-text">Why this project was initiated</h2>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {project.description}
            </p>
          </section>

          {/* Architecture / Highlights */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              <Layers className="w-4 h-4" />
              <span>2. Technical Implementation & Highlights</span>
            </div>
            <h2 className="text-2xl font-bold text-text">Engineering Deliverables</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {project.highlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border bg-surface p-5 shadow-xs flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Deep Dive Case Study Content with Syntax Highlighted Code Blocks */}
          {mdxContent && (
            <section className="rounded-xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
              <ModernBlogRenderer content={mdxContent} slug={project.slug} />
            </section>
          )}

          {/* Outcome & What I'd Do Next */}
          <section className="rounded-xl border border-border bg-surface-2/40 p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-text">Engineering Outcome & Takeaways</h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Shipping this project reinforced the value of clean architectural boundaries, automated verification loops, and clear error telemetry. In subsequent iterations, I focus on system observability, end-to-end integration test suites, and strict performance profiling under load.
            </p>
          </section>
        </div>

        {/* Prev / Next Navigation */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col text-left max-w-[45%]"
            >
              <span className="text-xs font-mono text-muted flex items-center gap-1 group-hover:text-accent">
                <ArrowLeft className="w-3.5 h-3.5" /> Previous Project
              </span>
              <span className="font-bold text-sm sm:text-base text-text group-hover:text-accent truncate">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col text-right max-w-[45%]"
            >
              <span className="text-xs font-mono text-muted flex items-center justify-end gap-1 group-hover:text-accent">
                Next Project <ArrowRight className="w-3.5 h-3.5" />
              </span>
              <span className="font-bold text-sm sm:text-base text-text group-hover:text-accent truncate">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </article>
  );
}
