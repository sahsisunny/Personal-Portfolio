import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjects, isFeatureEnabled } from "@/lib/data";
import { ProjectsView } from "@/components/projects/projects-view";
import { FolderGit2 } from "lucide-react";

const BASE_URL = "https://sunnysahsi.com";

export const metadata: Metadata = {
  title: "Projects & Architecture Case Studies | Sunny Sahsi",
  description:
    "Production case studies, high-performance Go backend microservices, autonomous AI agents, and full-stack web applications built by Sunny Sahsi.",
  keywords: [
    "Software Projects",
    "Go Backend",
    "AI Agents",
    "Next.js Case Studies",
    "TypeScript",
    "Full Stack Developer Portfolio",
    "Sunny Sahsi Projects",
  ],
  alternates: {
    canonical: `${BASE_URL}/projects`,
  },
  openGraph: {
    title: "Projects & Architecture Case Studies | Sunny Sahsi",
    description:
      "A curated collection of web apps, microservice integrations, and AI agent architectures built with Next.js, Go, and TypeScript.",
    url: `${BASE_URL}/projects`,
    type: "website",
    siteName: "Sunny Sahsi Portfolio",
    images: [
      {
        url: `${BASE_URL}/images/og-default.svg`,
        width: 1200,
        height: 630,
        alt: "Sunny Sahsi Projects & Case Studies",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Architecture Case Studies | Sunny Sahsi",
    description:
      "A curated collection of web apps, microservice integrations, and AI agent architectures built with Next.js, Go, and TypeScript.",
    images: [`${BASE_URL}/images/og-default.svg`],
    creator: "@sahsisunny",
  },
};

export default function ProjectsPage() {
  if (!isFeatureEnabled("projects")) {
    notFound();
  }

  const projects = getProjects();

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projects & Case Studies | Sunny Sahsi",
    description:
      "A curated collection of web apps, microservice integrations, and AI agent architectures built with Next.js, Go, and TypeScript.",
    url: `${BASE_URL}/projects`,
    hasPart: projects.map((p) => {
      const imgRaw = p.images && p.images[0] ? (typeof p.images[0] === "string" ? p.images[0] : p.images[0].src) : "/images/og-default.svg";
      const imgUrl = imgRaw.startsWith("http") ? imgRaw : `${BASE_URL}${imgRaw}`;
      return {
        "@type": "SoftwareApplication",
        name: p.title,
        url: `${BASE_URL}/projects/${p.slug}`,
        description: p.summary,
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cloud, Web",
        image: imgUrl,
        author: {
          "@type": "Person",
          name: "Sunny Sahsi",
        },
      };
    }),
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${BASE_URL}/projects`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
              <FolderGit2 className="w-4 h-4" />
              <span>Portfolio of Work</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
              Projects &amp; Case Studies
            </h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted">
              A curated collection of web apps, microservice integrations, and AI agent architectures built with Next.js, Go, and TypeScript.
            </p>
          </div>

          {/* Interactive Filter & List */}
          <ProjectsView initialProjects={projects} />
        </div>
      </div>
    </>
  );
}
