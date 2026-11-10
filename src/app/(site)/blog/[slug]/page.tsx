import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Sparkles,
  BookmarkCheck,
} from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { getPerson, isFeatureEnabled } from "@/lib/data";
import { ReadingProgressBar } from "@/components/blog/blog-post-content";
import { ModernBlogRenderer } from "@/components/blog/modern-blog-renderer";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/icons";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BASE_URL = "https://sahsisunny.netlify.app";

export async function generateStaticParams() {
  const posts = getAllBlogPosts(true);
  const slugs = new Set<string>();
  posts.forEach((post) => {
    slugs.add(post.slug);
    if (post.slug === "hotel-pms-ai-orchestrator") {
      slugs.add("asi-genie-architecture");
    }
    if (post.slug === "hotel-pms-mcp-tool-server") {
      slugs.add("asi-genie-mcp-architecture");
    }
    post.frontmatter.aliases.forEach((alias) => slugs.add(alias));
  });
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!isFeatureEnabled("blog")) {
    return {
      title: "Post Not Found",
    };
  }

  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${BASE_URL}${post.coverImage}`;

  return {
    title: `${post.frontmatter.title} | Sunny Sahsi`,
    description: post.frontmatter.summary,
    keywords: [
      ...post.frontmatter.tags,
      post.frontmatter.category,
      "Sunny Sahsi",
      "Software Engineering",
      "Architecture",
      "AEO",
      "AI Systems",
    ],
    authors: [{ name: "Sunny Sahsi", url: BASE_URL }],
    creator: "Sunny Sahsi",
    publisher: "Sunny Sahsi",
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      siteName: "Sunny Sahsi Portfolio",
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.updated || post.frontmatter.date,
      authors: ["https://sahsisunny.netlify.app"],
      tags: post.frontmatter.tags,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: post.frontmatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: [imageUrl],
      creator: "@sahsisunny",
      site: "@sahsisunny",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  if (!isFeatureEnabled("blog")) {
    notFound();
  }

  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts(false);
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Find related posts by shared tags
  const relatedPosts = allPosts
    .filter(
      (p) =>
        p.slug !== slug &&
        p.frontmatter.tags.some((t) => post.frontmatter.tags.includes(t))
    )
    .slice(0, 2);

  const person = getPerson();

  const postUrl = `${BASE_URL}/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${BASE_URL}${post.coverImage}`;

  // Structured Data (JSON-LD) for SEO and AEO
  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.summary,
    image: [imageUrl],
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.updated || post.frontmatter.date,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: {
      "@type": "Person",
      name: "Sunny Sahsi",
      jobTitle: "Associate Full Stack Developer",
      url: BASE_URL,
      sameAs: [
        "https://www.linkedin.com/in/sahsisunny/",
        "https://github.com/sahsisunny",
        "https://twitter.com/sahsisunny",
      ],
    },
    publisher: {
      "@type": "Person",
      name: "Sunny Sahsi",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logos/logo.png`,
      },
    },
    keywords: post.frontmatter.tags.join(", "),
    articleSection: post.frontmatter.category,
    wordCount: post.content.split(/\s+/).length,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["article h1", ".aeo-summary-text", ".aeo-key-takeaway"],
    },
  };

  const breadcrumbJsonLd = {
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
      {
        "@type": "ListItem",
        position: 3,
        name: post.frontmatter.title,
        item: postUrl,
      },
    ],
  };

  // Specific Answer Engine Optimization (AEO) FAQs per article
  const isMcpArticle =
    post.slug.includes("mcp") || post.frontmatter.tags.includes("mcp");

  const faqJsonLd = isMcpArticle
    ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the Hotel PMS MCP tool server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is a Model Context Protocol remote tool server that enables external AI environments like Claude Code and Cursor to query hotel PMS data with zero client prompts, strict OAuth token exchange, and enforced server-side RBAC.",
          },
        },
        {
          "@type": "Question",
          name: "How does the MCP tool server prevent cross-property data leaks?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The tool server injects the verified tenantId directly from the caller's 120-second delegated JWT, preventing external models from specifying or altering tenant scopes in tool arguments.",
          },
        },
        {
          "@type": "Question",
          name: "Why is the enterprise MCP server read-only?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "External models run under their own prompts and reasoning loops. Limiting MCP tools to read-only queries guarantees that third-party AI agents cannot execute unintended mutations against production database or entity states.",
          },
        },
      ],
    }
    : {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the enterprise AI orchestrator's core architectural role?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It acts as a Go-based orchestration layer connecting users with hundreds of microservice endpoints while strictly confining queries to a single tenant scope and caller RBAC permissions.",
          },
        },
        {
          "@type": "Question",
          name: "How does the AI orchestrator enforce zero-trust security without trusting the LLM?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Security invariants are verified on the server: session tokens lock the tenantId, OpenAPI endpoints are filtered by verified permissions, and numbers are returned via raw JSON passthrough rather than model generation.",
          },
        },
        {
          "@type": "Question",
          name: "How do scheduled background automations run in the orchestrator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Automations execute using revocable delegated grants with short-lived tokens, running daily briefings and reconciliation checks without requiring users to maintain active browser sessions.",
          },
        },
      ],
    };

  return (
    <>
      {/* Scroll-driven reading progress bar */}
      <ReadingProgressBar />

      {/* JSON-LD Schemas for Search & Answer Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Top Breadcrumb */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Writing</span>
            </Link>

            <span className="rounded-full bg-accent/10 text-accent border border-accent/20 px-2.5 py-0.5 text-xs font-mono font-medium">
              {post.frontmatter.category}
            </span>
          </div>

          {/* Main Article Body */}
          <article className="blog-content prose-editorial">
              <header className="border-b border-border/70 pb-6 mb-8 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl leading-tight">
                  {post.frontmatter.title}
                </h1>

                <p className="text-base sm:text-lg text-muted leading-relaxed font-sans aeo-summary-text text-justify hyphens-auto">
                  {post.frontmatter.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted pt-2">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span className="font-semibold text-text">Sunny Sahsi</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <time dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.readingTime}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.frontmatter.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-surface-2 px-2 py-0.5 text-xs font-mono text-muted border border-border"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </header>

              {/* Cover Image (LCP Candidate: priority + fetchpriority="high") */}
              {post.coverImage && (
                <div className="relative mb-10 overflow-hidden rounded-2xl border border-border/80 bg-surface shadow-md">
                  <Image
                    src={post.coverImage}
                    alt={post.frontmatter.title}
                    width={1200}
                    height={675}
                    priority
                    fetchPriority="high"
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-[1.01]"
                  />
                  <div className="absolute top-3 right-3 rounded-md bg-surface/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-mono text-accent border border-border/80 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Architecture Blueprint</span>
                  </div>
                </div>
              )}

              {/* AEO / AI Summary & Key Architecture Invariants Callout */}
              <div className="mb-10 rounded-xl border border-accent/30 bg-accent/5 p-5 sm:p-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase tracking-wider mb-2">
                  <BookmarkCheck className="w-4 h-4" />
                  <span>Key Architecture Takeaways (AEO &amp; Quick Facts)</span>
                </div>
                <ul className="space-y-2 text-sm text-text leading-relaxed pt-1">
                  <li className="flex items-start gap-2 aeo-key-takeaway">
                    <span className="text-accent font-mono font-bold select-none">•</span>
                    <span>
                      <strong>Zero-Trust Invariant:</strong> Security lives strictly in server-side authorization gates and session token validation—never in LLM prompt instructions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 aeo-key-takeaway">
                    <span className="text-accent font-mono font-bold select-none">•</span>
                    <span>
                      <strong>Deterministic Tool Execution:</strong> 600+ OpenAPI endpoints are dynamically pruned to domain-specific candidates, eliminating tool hallucinations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 aeo-key-takeaway">
                    <span className="text-accent font-mono font-bold select-none">•</span>
                    <span>
                      <strong>Delegated Grants:</strong> Scheduled automations run using revocable, scoped grants with tight TTLs without exposing root database credentials.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Syntax-colored Markdown Renderer */}
              <ModernBlogRenderer content={post.content} slug={slug} />

              {/* Author Bio Card */}
              <div className="mt-14 rounded-xl border border-border bg-surface-2/40 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-muted uppercase tracking-wider block font-bold">
                    Written by {person.name}
                  </span>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans max-w-lg">
                    Associate Full Stack Developer building AI chatbot agents, Go microservices, and modern Next.js web applications.
                  </p>
                </div>
                <div className="flex items-center gap-3 text-muted">
                  <a
                    href="https://github.com/sahsisunny"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors p-2 rounded-lg bg-surface border border-border"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/sahsisunny"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors p-2 rounded-lg bg-surface border border-border"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="https://twitter.com/sahsisunny"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors p-2 rounded-lg bg-surface border border-border"
                    aria-label="X (Twitter)"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12 pt-8 border-t border-border space-y-4">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider block font-bold">
                    Related Writing
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="rounded-xl border border-border bg-surface p-5 shadow-xs hover:border-accent transition-colors group block"
                      >
                        <p className="text-sm font-bold text-text group-hover:text-accent transition-colors line-clamp-1">
                          {rp.frontmatter.title}
                        </p>
                        <p className="text-xs text-muted mt-1.5 line-clamp-2">
                          {rp.frontmatter.summary}
                        </p>
                        <span className="text-[10px] font-mono text-muted mt-3 block">
                          {formatDate(rp.frontmatter.date)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Prev / Next Article Navigation */}
              <div className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col text-left max-w-[45%]"
                  >
                    <span className="text-xs font-mono text-muted flex items-center gap-1 group-hover:text-accent">
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
                    </span>
                    <span className="font-bold text-sm text-text group-hover:text-accent truncate">
                      {prevPost.frontmatter.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col text-right max-w-[45%]"
                  >
                    <span className="text-xs font-mono text-muted flex items-center justify-end gap-1 group-hover:text-accent">
                      Next Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="font-bold text-sm text-text group-hover:text-accent truncate">
                      {nextPost.frontmatter.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>
        </div>
      </div>
    </>
  );
}
