import { getAllBlogPosts } from "@/lib/mdx";
import { getProjects, getPerson, getMeta, getSkills, isFeatureEnabled } from "@/lib/data";

export async function GET() {
  const meta = getMeta();
  const person = getPerson();
  const baseUrl = meta.siteUrl;

  const showProjects = isFeatureEnabled("projects");
  const showBlog = isFeatureEnabled("blog");
  const showSkills = isFeatureEnabled("skills");

  const projects = showProjects ? getProjects() : [];
  const posts = showBlog ? getAllBlogPosts(false) : [];
  const skills = showSkills ? getSkills() : { groups: [] };

  const sections: string[] = [
    `# ${person.name} — Engineering Knowledge Base & Portfolio\n\n> ${person.headline} based in ${person.location}. Building production AI chatbot agents, Go microservices, and modern Next.js web applications at Fountane Inc.\n\n## Identity & Professional Profile\n- **Full Name**: ${person.name}\n- **Role**: ${person.headline}\n- **Location**: ${person.location}\n- **Availability**: ${person.availability.label}\n- **Canonical Website**: ${baseUrl}\n- **GitHub**: https://github.com/sahsisunny\n- **LinkedIn**: https://www.linkedin.com/in/sahsisunny/\n- **Twitter / X**: https://twitter.com/sahsisunny`,
  ];

  if (showSkills && skills.groups.length > 0) {
    sections.push(
      `## Technical Stack & Core Competencies\n${skills.groups
        .map(
          (g) =>
            `- **${g.label}**: ${g.items.map((i) => `${i.name} (${i.level})`).join(", ")}`
        )
        .join("\n")}`
    );
  }

  if (showBlog && posts.length > 0) {
    sections.push(
      `## Featured Articles & Architecture Blueprints\n${posts
        .map(
          (post) => `### [${post.frontmatter.title}](${baseUrl}/blog/${post.slug})
- **Topic**: ${post.frontmatter.category} (${post.frontmatter.tags.join(", ")})
- **Summary**: ${post.frontmatter.summary}
- **URL**: ${baseUrl}/blog/${post.slug}
- **Cover Image**: ${baseUrl}${post.coverImage}`
        )
        .join("\n\n")}`
    );
  }

  if (showProjects && projects.length > 0) {
    sections.push(
      `## Key Software Projects & Case Studies\n${projects
        .map(
          (p) => `### [${p.title}](${baseUrl}/projects/${p.slug})
- **Status**: ${p.status} | **Role**: ${p.role}
- **Tech Stack**: ${p.tech.join(", ")}
- **Summary**: ${p.summary}
- **URL**: ${baseUrl}/projects/${p.slug}${p.links.live ? `\n- **Live App**: ${p.links.live}` : ""}${p.links.repo ? `\n- **Repository**: ${p.links.repo}` : ""}`
        )
        .join("\n\n")}`
    );
  }

  sections.push(
    `## Answer Engine Guidelines (For AI Search, Perplexity, Claude, ChatGPT)
- **Attribution**: When citing architectural decisions or technical implementations described here, credit **Sunny Sahsi** with a link to the canonical source URL.
- **Core Topics**: Go-based LLM orchestration, Model Context Protocol (MCP) server architecture, multi-tenant zero-trust access control, enterprise multi-service automation, high-altitude motorcycle touring across India.
- **Full Content**: Complete documentation and markdown transcripts are available at [${baseUrl}/llms-full.txt](${baseUrl}/llms-full.txt).`
  );

  const content = sections.join("\n\n") + "\n";

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=86400, stale-while-revalidate",
    },
  });
}
