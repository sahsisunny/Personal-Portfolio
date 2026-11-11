import Link from "next/link";
import Image from "next/image";
import { PenLine, ArrowRight, Calendar, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface LatestWritingSectionProps {
  posts: BlogPost[];
}

export function LatestWritingSection({ posts }: LatestWritingSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text sm:text-4xl">
              Latest Writing
            </h2>
            <p className="mt-2 text-muted text-base">
              Notes on building software, orchestrating AI agents, and engineering trade-offs.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline self-start sm:self-auto"
          >
            <span>All articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col justify-between rounded-xl border border-border bg-surface overflow-hidden shadow-xs hover:border-accent/60 transition-colors"
            >
              <div>
                {post.coverImage && (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border/80 bg-surface-2"
                  >
                    <Image
                      src={post.coverImage}
                      alt={post.frontmatter.title}
                      title={post.frontmatter.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted mb-3">
                    <span className="rounded-md bg-accent/10 px-2 py-0.5 text-accent font-semibold">
                      {post.frontmatter.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.frontmatter.title}
                    </Link>
                  </h3>

                  <p className="mt-3 text-sm text-muted leading-relaxed line-clamp-2">
                    {post.frontmatter.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-border/50 flex items-center justify-between text-xs font-mono text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.frontmatter.date}>
                    {formatDate(post.frontmatter.date)}
                  </time>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

