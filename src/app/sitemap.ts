import type { MetadataRoute } from "next";
import { getProjects, getRides } from "@/lib/data";
import { getAllBlogPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sahsisunny.netlify.app";
  const projects = getProjects();
  const rides = getRides();
  const blogPosts = getAllBlogPosts(false);

  const staticRoutes = [
    { route: "", priority: 1.0, freq: "weekly" as const },
    { route: "/blog", priority: 0.9, freq: "weekly" as const },
    { route: "/projects", priority: 0.9, freq: "monthly" as const },
    { route: "/rides", priority: 0.8, freq: "monthly" as const },
    { route: "/rides/bike", priority: 0.7, freq: "monthly" as const },
    { route: "/rides/gear", priority: 0.7, freq: "monthly" as const },
    { route: "/rides/upcoming", priority: 0.7, freq: "monthly" as const },
    { route: "/resume", priority: 0.8, freq: "monthly" as const },
  ].map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified: new Date(),
    changeFrequency: item.freq,
    priority: item.priority,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p.featured ? 0.85 : 0.75,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.frontmatter.updated || b.frontmatter.date),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const rideRoutes = rides.map((r) => ({
    url: `${baseUrl}/rides/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes, ...projectRoutes, ...rideRoutes];
}
