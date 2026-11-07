"use client";

import * as React from "react";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface BlogListViewProps {
  initialPosts: BlogPost[];
  categories: string[];
  tags: string[];
}

export function BlogListView({ initialPosts, categories, tags }: BlogListViewProps) {
  const [search, setSearch] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const filteredPosts = React.useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        search === "" ||
        post.frontmatter.title.toLowerCase().includes(search.toLowerCase()) ||
        post.frontmatter.summary.toLowerCase().includes(search.toLowerCase()) ||
        post.frontmatter.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || post.frontmatter.category === selectedCategory;

      const matchesTag = !selectedTag || post.frontmatter.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [initialPosts, search, selectedCategory, selectedTag]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Main Post Stream */}
      <div className="lg:col-span-8 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles by title or keyword..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg border border-border bg-surface text-text placeholder:text-muted/60 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
          />
        </div>

        {/* Active Tag filter indicator */}
        {selectedTag && (
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-mono text-accent">
            <span>Filtered by tag: #{selectedTag}</span>
            <button
              type="button"
              onClick={() => setSelectedTag(null)}
              className="hover:underline font-bold"
            >
              ×
            </button>
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-xl">
            <BookOpen className="w-10 h-10 text-muted mx-auto mb-3" />
            <h3 className="text-base font-bold text-text">No articles found</h3>
            <p className="text-xs text-muted mt-1">Try adjusting your search or category filter.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedTag(null);
              }}
              className="mt-4 text-xs font-mono text-accent hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="group rounded-xl border border-border bg-surface p-6 sm:p-7 shadow-xs hover:border-accent/60 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-muted mb-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-accent/10 px-2.5 py-0.5 text-accent font-semibold">
                      {post.frontmatter.category}
                    </span>
                    {post.frontmatter.draft && (
                      <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-amber-600 font-semibold">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={post.frontmatter.date}>
                        {formatDate(post.frontmatter.date)}
                      </time>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-text group-hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.frontmatter.title}
                  </Link>
                </h2>

                <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed line-clamp-3">
                  {post.frontmatter.summary}
                </p>

                <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {post.frontmatter.tags.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTag(t)}
                        className="rounded bg-surface-2 px-2 py-0.5 text-[11px] font-mono text-muted hover:text-accent hover:border-accent border border-border transition-colors"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar: Categories & Tags */}
      <aside className="lg:col-span-4 space-y-6">
        {/* Categories */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
          <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-bold mb-4">
            Categories
          </h3>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-mono transition-colors ${
                selectedCategory === "All"
                  ? "bg-accent text-accent-contrast font-bold"
                  : "text-muted hover:bg-surface-2 hover:text-text"
              }`}
            >
              <span>All Categories</span>
              <span>{initialPosts.length}</span>
            </button>
            {categories.map((cat) => {
              const count = initialPosts.filter((p) => p.frontmatter.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs font-mono transition-colors ${
                    selectedCategory === cat
                      ? "bg-accent text-accent-contrast font-bold"
                      : "text-muted hover:bg-surface-2 hover:text-text"
                  }`}
                >
                  <span>{cat}</span>
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tags cloud */}
        <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
          <h3 className="text-xs font-mono uppercase tracking-wider text-muted font-bold mb-4">
            Popular Tags
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors border ${
                  selectedTag === tag
                    ? "bg-accent text-accent-contrast border-accent font-semibold"
                    : "bg-surface-2/60 text-muted border-border hover:border-accent hover:text-text"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* RSS Feed banner */}
        <div className="rounded-xl border border-border bg-surface-2/60 p-5 text-xs text-muted space-y-2 font-mono">
          <span className="font-bold text-text block">Subscribe via RSS</span>
          <p className="leading-relaxed">
            Stay updated with articles on Go, Next.js, AI agent patterns, and motorcycle tours.
          </p>
          <a
            href="/rss.xml"
            target="_blank"
            className="inline-flex items-center gap-1 text-accent font-semibold hover:underline pt-1"
          >
            <span>Open RSS Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>
    </div>
  );
}
