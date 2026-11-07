"use client";

import * as React from "react";
import {
  CodeBlock,
  ExecutiveSummaryCallout,
  ArchitectureDiagram,
  ComparisonTable,
  AlertBox,
} from "./blog-post-content";

interface ModernBlogRendererProps {
  content: string;
  slug: string;
}

export function ModernBlogRenderer({ content, slug }: ModernBlogRendererProps) {
  const isJuniorToAssociate = slug === "junior-to-associate-full-stack";

  // Parse markdown content by splitting code blocks and prose
  const blocks = React.useMemo(() => {
    // Regex matches ```lang\ncode```
    const parts = content.split(/```/g);
    const elements: React.ReactNode[] = [];

    parts.forEach((part, index) => {
      // ODD INDEX = Code Block
      if (index % 2 === 1) {
        const firstLineEnd = part.indexOf("\n");
        const langRaw = firstLineEnd !== -1 ? part.slice(0, firstLineEnd).trim() : "";
        let codeBody = firstLineEnd !== -1 ? part.slice(firstLineEnd + 1) : part;

        // Check if first line of code has a filename comment e.g. // app/actions/payments.ts
        let filename: string | undefined = undefined;
        const codeLines = codeBody.split("\n");
        if (codeLines.length > 0) {
          const firstCodeLine = codeLines[0].trim();
          if (
            firstCodeLine.startsWith("//") ||
            firstCodeLine.startsWith("#") ||
            firstCodeLine.startsWith("--")
          ) {
            filename = firstCodeLine.replace(/^(\/\/|#|--)\s*/, "").trim();
            // Remove the filename comment line from the snippet display
            codeBody = codeLines.slice(1).join("\n");
          }
        }

        const lang = langRaw || "code";

        elements.push(
          <CodeBlock
            key={`code-${index}`}
            language={lang}
            filename={filename}
            code={codeBody}
          />
        );
      } else {
        // EVEN INDEX = Prose Text
        const proseText = part.trim();
        if (!proseText) return;

        // Split prose into paragraphs, headings, blockquotes, lists
        const paragraphs = proseText.split(/\n\n+/);

        paragraphs.forEach((pText, pIdx) => {
          const trimmed = pText.trim();
          if (!trimmed) return;

          // Headings
          if (trimmed.startsWith("### ")) {
            const headingText = trimmed.replace(/^###\s+/, "");
            const id = headingText
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");
            elements.push(
              <h3
                key={`h3-${index}-${pIdx}`}
                id={id}
                className="text-xl font-bold text-text mt-8 mb-3 scroll-mt-24"
              >
                {headingText}
              </h3>
            );
            return;
          }

          if (trimmed.startsWith("## ")) {
            const headingText = trimmed.replace(/^##\s+/, "");
            const id = headingText
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            // If this is junior-to-associate, insert relevant rich media before/after certain headings
            if (isJuniorToAssociate && headingText.includes("3. Developing Disciplined")) {
              elements.push(
                <ArchitectureDiagram key={`arch-diag-${index}-${pIdx}`} />
              );
              elements.push(
                <ComparisonTable key={`comp-table-${index}-${pIdx}`} />
              );
            }

            elements.push(
              <h2
                key={`h2-${index}-${pIdx}`}
                id={id}
                className="text-2xl sm:text-3xl font-bold text-text mt-12 mb-4 scroll-mt-24 border-b border-border/60 pb-2.5"
              >
                {headingText}
              </h2>
            );
            return;
          }

          // Blockquotes
          if (trimmed.startsWith("> ")) {
            const quoteContent = trimmed.replace(/^>\s*/gm, "");
            elements.push(
              <blockquote
                key={`quote-${index}-${pIdx}`}
                className="border-l-4 border-accent pl-4 my-5 italic text-muted bg-surface-2/40 py-2.5 rounded-r text-base"
              >
                {quoteContent}
              </blockquote>
            );
            return;
          }

          // Bullet lists
          if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
            const listItems = trimmed.split("\n");
            elements.push(
              <ul
                key={`list-${index}-${pIdx}`}
                className="my-4 space-y-2 text-muted text-base sm:text-lg leading-relaxed pl-1"
              >
                {listItems.map((item, itemIdx) => {
                  const cleaned = item.replace(/^(-\s+|\d+\.\s+)/, "");
                  return (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="text-accent font-mono select-none mt-1">▸</span>
                      <span
                        dangerouslySetInnerHTML={{
                          __html: formatInline(cleaned),
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            );
            return;
          }

          // Standard Paragraph
          elements.push(
            <p
              key={`p-${index}-${pIdx}`}
              className="text-base sm:text-lg text-muted leading-relaxed font-sans"
              dangerouslySetInnerHTML={{
                __html: formatInline(trimmed),
              }}
            />
          );
        });
      }
    });

    return elements;
  }, [content, isJuniorToAssociate]);

  return (
    <div className="space-y-6">
      {/* Executive Summary callout for junior to associate post */}
      {isJuniorToAssociate && (
        <ExecutiveSummaryCallout
          takeaways={[
            {
              title: "End-to-End Ownership",
              desc: "Moving from completing discrete Jira UI tickets to owning edge cases, DB schemas, and auth bounds.",
            },
            {
              title: "Go Backend Mastery",
              desc: "Writing typed, concurrent microservices with idempotent webhooks and transactional database rollbacks.",
            },
            {
              title: "Adversarial AI Review",
              desc: "Treating Claude/Cursor as talented interns: rigorously testing boundaries before merging.",
            },
          ]}
        />
      )}

      {/* Main Body */}
      <div className="prose dark:prose-invert max-w-none text-muted leading-relaxed space-y-6">
        {blocks}
      </div>

      {/* Pro Tip Callout Box at bottom */}
      {isJuniorToAssociate && (
        <AlertBox
          type="tip"
          title="Engineering Rule of Thumb"
        >
          Seniority is measured by how few surprises you introduce into production. 
          When designing features, design the error and failure paths first. The happy path will take care of itself.
        </AlertBox>
      )}
    </div>
  );
}

// Format basic inline markdown: **bold**, *italic*, `code`, [link](url)
function formatInline(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-text/90">$1</em>')
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs text-accent border border-border/80">$1</code>'
    )
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-accent underline hover:opacity-80 transition-opacity" target="_blank" rel="noreferrer">$1</a>'
    );
}
