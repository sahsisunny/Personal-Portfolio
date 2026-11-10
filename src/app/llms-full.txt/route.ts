import { getAllBlogPosts } from "@/lib/mdx";
import { getProjects, getPerson, getMeta, getSkills } from "@/lib/data";

export async function GET() {
  const meta = getMeta();
  const person = getPerson();
  const projects = getProjects();
  const posts = getAllBlogPosts(false);
  const skills = getSkills();

  const baseUrl = meta.siteUrl;

  const content = `# Full Knowledge Base: ${person.name} (${person.headline})

Website: ${baseUrl}
Contact: ${person.email}
GitHub: https://github.com/sahsisunny
LinkedIn: https://www.linkedin.com/in/sahsisunny/

================================================================================
PART 1: PROFILE & SKILLS
================================================================================
${person.longBio.join("\n\n")}

Core Skills:
${skills.groups
  .map(
    (g) =>
      `• ${g.label}: ${g.items.map((i) => `${i.name} [${i.level}]`).join(", ")}`
  )
  .join("\n")}

================================================================================
PART 2: ARCHITECTURE & TECHNICAL ARTICLES
================================================================================
${posts
  .map(
    (post) => `
--------------------------------------------------------------------------------
ARTICLE: ${post.frontmatter.title}
URL: ${baseUrl}/blog/${post.slug}
Date: ${post.frontmatter.date}
Tags: ${post.frontmatter.tags.join(", ")}
Summary: ${post.frontmatter.summary}
Cover Image: ${baseUrl}${post.coverImage}
--------------------------------------------------------------------------------

${post.content}
`
  )
  .join("\n\n")}

================================================================================
PART 3: KEY PROJECTS & CASE STUDIES
================================================================================
${projects
  .map(
    (p) => `
--------------------------------------------------------------------------------
PROJECT: ${p.title}
Slug: ${p.slug}
Role: ${p.role}
Status: ${p.status}
Tech Stack: ${p.tech.join(", ")}
Live: ${p.links.live || "N/A"}
Repo: ${p.links.repo || "Private"}
Summary: ${p.summary}
--------------------------------------------------------------------------------

Description:
${p.description}

Highlights:
${p.highlights.map((h) => `- ${h}`).join("\n")}
`
  )
  .join("\n\n")}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
