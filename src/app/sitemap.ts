import type { MetadataRoute } from "next";
import { getProjects, getRides, isFeatureEnabled } from "@/lib/data";
import { getAllBlogPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sunnysahsi.com";
  const projects = isFeatureEnabled("projects") ? getProjects() : [];
  const rides = isFeatureEnabled("rides") ? getRides() : [];
  const blogPosts = isFeatureEnabled("blog") ? getAllBlogPosts(false) : [];

  const rawStatic = [
    { route: "", priority: 1.0, freq: "weekly" as const, enabled: true },
    { route: "/blog", priority: 0.9, freq: "weekly" as const, enabled: isFeatureEnabled("blog") },
    { route: "/projects", priority: 0.9, freq: "monthly" as const, enabled: isFeatureEnabled("projects") },
    { route: "/rides", priority: 0.8, freq: "monthly" as const, enabled: isFeatureEnabled("rides") },
    { route: "/rides/bike", priority: 0.7, freq: "monthly" as const, enabled: isFeatureEnabled("rides") },
    { route: "/rides/gear", priority: 0.7, freq: "monthly" as const, enabled: isFeatureEnabled("rides") },
    { route: "/rides/upcoming", priority: 0.7, freq: "monthly" as const, enabled: isFeatureEnabled("rides") },
    { route: "/resume", priority: 0.8, freq: "monthly" as const, enabled: isFeatureEnabled("resume") },
  ];

  const staticRoutes = rawStatic
    .filter((item) => item.enabled)
    .map((item) => ({
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
