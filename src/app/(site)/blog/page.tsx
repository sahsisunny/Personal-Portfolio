import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isFeatureEnabled } from "@/lib/data";
import { getAllBlogPosts, getAllCategories, getAllTags } from "@/lib/mdx";
import { BlogListView } from "@/components/blog/blog-list-view";
import { PenLine } from "lucide-react";

const BASE_URL = "https://sahsisunny.netlify.app";

export const metadata: Metadata = {
  title: "Writing & Engineering Notes | Sunny Sahsi",
  description:
    "Engineering reflections on Go backend architectures, AI agent orchestration across 600+ APIs, Model Context Protocol (MCP), and solo motorcycle touring.",
  keywords: [
    "Software Architecture",
    "Go Backend",
    "AI Agent Architecture",
    "Model Context Protocol",
    "MCP Server",
    "Zero-Trust Access",
    "Next.js",
    "TypeScript",
    "Sunny Sahsi Writing",
  ],
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: "Writing & Engineering Notes | Sunny Sahsi",
    description:
      "Deep dives into multi-service AI orchestration, zero-trust RBAC in hotel PMS, and building MCP tool servers for Claude & Cursor.",
    url: `${BASE_URL}/blog`,
    type: "website",
    siteName: "Sunny Sahsi Portfolio",
    images: [
      {
        url: `${BASE_URL}/images/og-default.svg`,
        width: 1200,
        height: 630,
        alt: "Sunny Sahsi Writing & Engineering Notes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Writing & Engineering Notes | Sunny Sahsi",
    description:
      "Deep dives into multi-service AI orchestration, zero-trust RBAC in hotel PMS, and building MCP tool servers for Claude & Cursor.",
    images: [`${BASE_URL}/images/og-default.svg`],
    creator: "@sahsisunny",
  },
};

export default function BlogPage() {
  if (!isFeatureEnabled("blog")) {
    notFound();
  }

  const posts = getAllBlogPosts(true);
  const categories = getAllCategories();
  const tags = getAllTags();

  const blogCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Writing & Engineering Notes | Sunny Sahsi",
    description:
      "Reflections on system architecture, orchestrating AI chatbot agents, building with Next.js & Go, and high-altitude motorcycle journeys across India.",
    url: `${BASE_URL}/blog`,
    author: {
      "@type": "Person",
      name: "Sunny Sahsi",
      jobTitle: "Associate Full Stack Developer",
      url: BASE_URL,
    },
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.frontmatter.title,
      url: `${BASE_URL}/blog/${p.slug}`,
      datePublished: p.frontmatter.date,
      description: p.frontmatter.summary,
      image: p.coverImage.startsWith("http") ? p.coverImage : `${BASE_URL}${p.coverImage}`,
    })),
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
        name: "Writing",
        item: `${BASE_URL}/blog`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd) }}
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
              <PenLine className="w-4 h-4" />
              <span>Articles &amp; Architecture Notes</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
              Writing &amp; Engineering Notes
            </h1>
            <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted">
              Reflections on system architecture, orchestrating AI chatbot agents, building with Next.js &amp; Go, and the road.
            </p>
          </div>

          {/* Blog Stream + Sidebar */}
          <BlogListView initialPosts={posts} categories={categories} tags={tags} />
        </div>
      </div>
    </>
  );
}
