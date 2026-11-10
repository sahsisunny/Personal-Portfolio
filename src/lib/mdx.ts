import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { z } from "zod";
import portfolioData from "../../portfolio-data.json";

export const BlogPostFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  updated: z.string().optional(),
  summary: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string(),
  cover: z.string().optional(),
  image: z.string().optional(),
  authors: z.array(z.string()).default(["Sunny Sahsi"]),
  series: z.string().optional(),
  series_order: z.number().optional(),
  aliases: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  enabled: z.boolean().default(true),
  published: z.boolean().default(true),
});

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>;

export interface BlogPost {
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: string;
  slug: string;
  coverImage: string;
}

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const RIDES_DIR = path.join(process.cwd(), "content/rides");
const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

function ensureDirectory(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function getAllBlogPosts(includeDrafts = process.env.NODE_ENV !== "production"): BlogPost[] {
  ensureDirectory(BLOG_DIR);
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts = files
    .map((file) => {
      const fullPath = path.join(BLOG_DIR, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      const slug = data.slug || file.replace(/\.mdx?$/, "");

      const parsedFrontmatter = BlogPostFrontmatterSchema.safeParse({
        ...data,
        slug,
      });

      if (!parsedFrontmatter.success) {
        console.warn(`Warning: Invalid frontmatter in ${file}:`, parsedFrontmatter.error.issues);
        return null;
      }

      // Check if disabled in portfolio-data.json (blog.posts array)
      const configuredPost = (portfolioData.blog?.posts ?? []).find(
        (p: { slug?: string }) => p?.slug === slug
      );
      if (configuredPost && configuredPost.enabled === false) {
        return null;
      }

      // Check frontmatter flags
      if (parsedFrontmatter.data.enabled === false || parsedFrontmatter.data.published === false) {
        return null;
      }

      if (!includeDrafts && parsedFrontmatter.data.draft) {
        return null;
      }

      const readStats = readingTime(content);
      const coverImage =
        parsedFrontmatter.data.cover ||
        parsedFrontmatter.data.image ||
        `/images/blog/${slug}.svg`;

      return {
        frontmatter: parsedFrontmatter.data,
        content,
        readingTime: readStats.text,
        slug,
        coverImage,
      };
    })
    .filter((post): post is BlogPost => post !== null);

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts(true);
  return (
    posts.find(
      (p) => p.slug === slug || p.frontmatter.aliases.includes(slug)
    ) || null
  );
}

export function getAllCategories(): string[] {
  const posts = getAllBlogPosts(false);
  const categories = new Set(posts.map((p) => p.frontmatter.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts(false);
  const tags = new Set(posts.flatMap((p) => p.frontmatter.tags));
  return Array.from(tags);
}

export function getRideStoryMdx(slug: string): string | null {
  ensureDirectory(RIDES_DIR);
  const filePath = path.join(RIDES_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContents);
    return content;
  }
  return null;
}

export function getProjectCaseStudyMdx(slug: string): string | null {
  ensureDirectory(PROJECTS_DIR);
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (fs.existsSync(filePath)) {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content } = matter(fileContents);
    return content;
  }
  return null;
}

