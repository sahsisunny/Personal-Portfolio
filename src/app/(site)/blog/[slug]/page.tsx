import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  BookOpen,
  User,
} from "lucide-react";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";
import { getPerson } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts(true);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.frontmatter.title} | Sunny Sahsi`,
    description: post.frontmatter.summary,
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      publishedTime: post.frontmatter.date,
      authors: ["Sunny Sahsi"],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
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
    .filter((p) => p.slug !== slug && p.frontmatter.tags.some((t) => post.frontmatter.tags.includes(t)))
    .slice(0, 2);

  const person = getPerson();

  // Extract table of contents from markdown headings
  const headingMatches = Array.from(post.content.matchAll(/^(#{2,3})\s+(.*)$/gm));
  const toc = headingMatches.map((match) => {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { level, text, id };
  });

  // Render markdown content to HTML
  const formattedHtml = post.content
    .replace(/^### (.*$)/gim, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h3 id="${id}" class="text-xl font-bold text-text mt-8 mb-3 scroll-mt-24">${text}</h3>`;
    })
    .replace(/^## (.*$)/gim, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h2 id="${id}" class="text-2xl sm:text-3xl font-bold text-text mt-10 mb-4 scroll-mt-24 border-b border-border/60 pb-2">${text}</h2>`;
    })
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-accent pl-4 my-4 italic text-muted bg-surface-2/40 py-2 rounded-r">$1</blockquote>')
    .replace(/```([\s\S]*?)```/g, '<pre class="p-4 rounded-xl bg-surface-2 font-mono text-xs sm:text-sm overflow-x-auto text-text my-6 border border-border">$1</pre>');

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.frontmatter.title,
    description: post.frontmatter.summary,
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: "Sunny Sahsi",
      url: "https://sahsisunny.netlify.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Article Content */}
            <article className="lg:col-span-8">
              <header className="border-b border-border pb-8 mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight text-text sm:text-4xl lg:text-5xl">
                  {post.frontmatter.title}
                </h1>

                <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed">
                  {post.frontmatter.summary}
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-muted">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-accent" />
                    <span>Sunny Sahsi</span>
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
                <div className="mt-4 flex flex-wrap gap-1.5">
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

              {/* Formatted Post Body */}
              <div
                className="prose dark:prose-invert max-w-none text-muted leading-relaxed space-y-5 text-base sm:text-lg"
                dangerouslySetInnerHTML={{ __html: formattedHtml }}
              />

              {/* Prev / Next Article Navigation */}
              <div className="mt-16 pt-8 border-t border-border flex items-center justify-between gap-4">
                {prevPost ? (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col text-left max-w-[45%]"
                  >
                    <span className="text-xs font-mono text-muted flex items-center gap-1 group-hover:text-accent">
                      <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
                    </span>
                    <span className="font-bold text-sm sm:text-base text-text group-hover:text-accent truncate">
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
                    <span className="font-bold text-sm sm:text-base text-text group-hover:text-accent truncate">
                      {nextPost.frontmatter.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>

            {/* Sticky Table of Contents on Desktop */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6">
              {toc.length > 0 && (
                <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted font-bold mb-4">
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                    <span>Table of Contents</span>
                  </div>
                  <nav className="space-y-2 text-xs font-mono">
                    {toc.map((item, idx) => (
                      <a
                        key={idx}
                        href={`#${item.id}`}
                        className={`block hover:text-accent transition-colors ${
                          item.level === 3 ? "pl-3 text-muted/80" : "text-text font-medium"
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Author Card */}
              <div className="rounded-xl border border-border bg-surface-2/40 p-5 space-y-3">
                <span className="text-xs font-mono text-muted uppercase tracking-wider block font-bold">
                  Author
                </span>
                <p className="text-sm font-bold text-text">{person.name}</p>
                <p className="text-xs text-muted leading-relaxed">
                  {person.shortBio}
                </p>
                <Link
                  href="/#about"
                  className="text-xs font-mono text-accent hover:underline inline-flex items-center gap-1 pt-1"
                >
                  <span>More about Sunny</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="rounded-xl border border-border bg-surface p-5 shadow-xs space-y-3">
                  <span className="text-xs font-mono text-muted uppercase tracking-wider block font-bold">
                    Related Articles
                  </span>
                  <div className="space-y-3">
                    {relatedPosts.map((rp) => (
                      <Link
                        key={rp.slug}
                        href={`/blog/${rp.slug}`}
                        className="block group"
                      >
                        <p className="text-xs font-bold text-text group-hover:text-accent transition-colors">
                          {rp.frontmatter.title}
                        </p>
                        <span className="text-[10px] font-mono text-muted">
                          {formatDate(rp.frontmatter.date)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
