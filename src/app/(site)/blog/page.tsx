import type { Metadata } from "next";
import { getAllBlogPosts, getAllCategories, getAllTags } from "@/lib/mdx";
import { BlogListView } from "@/components/blog/blog-list-view";
import { PenLine } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing & Notes | Sunny Sahsi",
  description:
    "Engineering thoughts, Go backend patterns, AI chatbot architectures, and lessons from solo motorcycle journeys across India.",
};

export default function BlogPage() {
  const posts = getAllBlogPosts(true);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-2">
            <PenLine className="w-4 h-4" />
            <span>Articles & Notes</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-text sm:text-5xl">
            Writing & Engineering Notes
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-muted">
            Reflections on system architecture, orchestrating AI chatbot agents, building with Next.js & Go, and the road.
          </p>
        </div>

        {/* Blog Stream + Sidebar */}
        <BlogListView initialPosts={posts} categories={categories} tags={tags} />
      </div>
    </div>
  );
}
