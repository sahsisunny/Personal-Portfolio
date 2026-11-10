import { getAllBlogPosts } from "@/lib/mdx";
import { getMeta, getPerson } from "@/lib/data";

export async function GET() {
  const meta = getMeta();
  const person = getPerson();
  const posts = getAllBlogPosts(false);

  const siteUrl = meta.siteUrl;

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(meta.siteTitle)}</title>
    <link>${siteUrl}</link>
    <description>${escapeXml(meta.siteDescription)}</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map((post) => {
        const coverRaw = post.coverImage.startsWith("http")
          ? post.coverImage
          : `${siteUrl}${post.coverImage}`;
        return `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.frontmatter.summary)}</description>
      <category>${escapeXml(post.frontmatter.category)}</category>
      <author>${escapeXml(person.email)} (${escapeXml(person.name)})</author>
      <media:content url="${escapeXml(coverRaw)}" medium="image" />
      <enclosure url="${escapeXml(coverRaw)}" type="image/svg+xml" length="0" />
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  });
}
