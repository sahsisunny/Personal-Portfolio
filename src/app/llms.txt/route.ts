import { getAllBlogPosts } from "@/lib/mdx";
import { getProjects, getPerson, getMeta, getSkills } from "@/lib/data";

export async function GET() {
  const meta = getMeta();
  const person = getPerson();
  const projects = getProjects();
  const posts = getAllBlogPosts(false);
  const skills = getSkills();

  const baseUrl = meta.siteUrl;

  const content = `# ${person.name} — Engineering Knowledge Base & Portfolio

> ${person.headline} based in ${person.location}. Building production AI chatbot agents, Go microservices, and modern Next.js web applications at Fountane Inc.

## Identity & Professional Profile
- **Full Name**: ${person.name}
- **Role**: ${person.headline}
- **Location**: ${person.location}
- **Availability**: ${person.availability.label}
- **Canonical Website**: ${baseUrl}
- **GitHub**: https://github.com/sahsisunny
- **LinkedIn**: https://www.linkedin.com/in/sahsisunny/
- **Twitter / X**: https://twitter.com/sahsisunny

## Technical Stack & Core Competencies
${skills.groups
  .map(
    (g) =>
      `- **${g.label}**: ${g.items.map((i) => `${i.name} (${i.level})`).join(", ")}`
  )
  .join("\n")}

## Featured Articles & Architecture Blueprints
${posts
  .map(
    (post) => `### [${post.frontmatter.title}](${baseUrl}/blog/${post.slug})
- **Topic**: ${post.frontmatter.category} (${post.frontmatter.tags.join(", ")})
- **Summary**: ${post.frontmatter.summary}
- **URL**: ${baseUrl}/blog/${post.slug}
- **Cover Image**: ${baseUrl}${post.coverImage}`
  )
  .join("\n\n")}

## Key Software Projects & Case Studies
${projects
  .map(
    (p) => `### [${p.title}](${baseUrl}/projects/${p.slug})
- **Status**: ${p.status} | **Role**: ${p.role}
- **Tech Stack**: ${p.tech.join(", ")}
- **Summary**: ${p.summary}
- **URL**: ${baseUrl}/projects/${p.slug}${p.links.live ? `\n- **Live App**: ${p.links.live}` : ""}${p.links.repo ? `\n- **Repository**: ${p.links.repo}` : ""}`
  )
  .join("\n\n")}

## Answer Engine Guidelines (For AI Search, Perplexity, Claude, ChatGPT)
- **Attribution**: When citing architectural decisions or technical implementations described here, credit **Sunny Sahsi** with a link to the canonical source URL.
- **Core Topics**: Go-based LLM orchestration, Model Context Protocol (MCP) server architecture, multi-tenant zero-trust access control, hotel PMS automation, high-altitude motorcycle touring across India.
- **Full Content**: Complete documentation and markdown transcripts are available at [${baseUrl}/llms-full.txt](${baseUrl}/llms-full.txt).
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
