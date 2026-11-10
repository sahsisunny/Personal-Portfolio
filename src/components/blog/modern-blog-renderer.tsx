"use client";

import * as React from "react";
import { CodeBlock } from "./blog-post-content";
import { MermaidBlock } from "./mermaid-block";

interface ModernBlogRendererProps {
  content: string;
  slug?: string;
}

export function ModernBlogRenderer({ content }: ModernBlogRendererProps) {
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

        // If language is mermaid, render dedicated interactive Mermaid component
        const normLang = langRaw.toLowerCase().trim();
        if (
          normLang === "mermaid" ||
          (!normLang &&
            (codeBody.trim().startsWith("flowchart") ||
              codeBody.trim().startsWith("sequenceDiagram") ||
              codeBody.trim().startsWith("classDiagram") ||
              codeBody.trim().startsWith("stateDiagram") ||
              codeBody.trim().startsWith("erDiagram") ||
              codeBody.trim().startsWith("graph ")))
        ) {
          elements.push(<MermaidBlock key={`mermaid-${index}`} code={codeBody} />);
          return;
        }

        // Auto-detect architecture diagram if language isn't specified
        let lang = langRaw;
        if (!lang) {
          if (
            codeBody.includes("+---") ||
            codeBody.includes("|    ") ||
            codeBody.includes("↓") ||
            codeBody.includes("▼")
          ) {
            lang = "diagram";
          } else {
            lang = "code";
          }
        }

        elements.push(
          <CodeBlock key={`code-${index}`} language={lang} filename={filename} code={codeBody} />
        );
      } else {
        // EVEN INDEX = Prose Text
        const proseText = part.trim();
        if (!proseText) return;

        // Split prose into paragraphs, headings, blockquotes, lists, tables
        const paragraphs = proseText.split(/\n\n+/);

        paragraphs.forEach((pText, pIdx) => {
          const trimmed = pText.trim();
          if (!trimmed) return;

          // Headings
          if (trimmed.startsWith("### ")) {
            const newlineIdx = trimmed.indexOf("\n");
            const headingLine = newlineIdx !== -1 ? trimmed.slice(0, newlineIdx).trim() : trimmed;
            const remainingText = newlineIdx !== -1 ? trimmed.slice(newlineIdx + 1).trim() : "";
            const headingText = headingLine.replace(/^###\s+/, "");
            const id = headingText
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            elements.push(
              <h3
                key={`h3-${index}-${pIdx}`}
                id={id}
                className="text-lg sm:text-xl font-bold text-text mt-8 mb-3 scroll-mt-24"
              >
                {headingText}
              </h3>
            );

            if (remainingText) {
              elements.push(
                <p
                  key={`p-after-h3-${index}-${pIdx}`}
                  className="text-base sm:text-[17px] text-muted leading-relaxed font-sans text-justify hyphens-auto"
                  dangerouslySetInnerHTML={{
                    __html: formatInline(remainingText),
                  }}
                />
              );
            }
            return;
          }

          if (trimmed.startsWith("## ")) {
            const newlineIdx = trimmed.indexOf("\n");
            const headingLine = newlineIdx !== -1 ? trimmed.slice(0, newlineIdx).trim() : trimmed;
            const remainingText = newlineIdx !== -1 ? trimmed.slice(newlineIdx + 1).trim() : "";
            const headingText = headingLine.replace(/^##\s+/, "");
            const id = headingText
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            elements.push(
              <h2
                key={`h2-${index}-${pIdx}`}
                id={id}
                className="text-xl sm:text-2xl font-bold text-text mt-12 mb-4 scroll-mt-24 border-b border-border/60 pb-2"
              >
                {headingText}
              </h2>
            );

            if (remainingText) {
              elements.push(
                <p
                  key={`p-after-h2-${index}-${pIdx}`}
                  className="text-base sm:text-[17px] text-muted leading-relaxed font-sans text-justify hyphens-auto"
                  dangerouslySetInnerHTML={{
                    __html: formatInline(remainingText),
                  }}
                />
              );
            }
            return;
          }

          // Markdown Table
          if (trimmed.includes("|") && trimmed.includes("---")) {
            const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
            if (lines.length >= 2) {
              const headers = lines[0]
                .split("|")
                .map((c) => c.trim())
                .filter((c) => c.length > 0);
              const rows = lines.slice(2).map((rowLine) =>
                rowLine
                  .split("|")
                  .map((c) => c.trim())
                  .filter((c) => c.length > 0)
              );

              elements.push(
                <div
                  key={`table-${index}-${pIdx}`}
                  className="my-6 overflow-x-auto rounded-lg border border-border bg-surface"
                >
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="border-b border-border bg-surface-2/60 font-mono text-xs uppercase text-muted">
                      <tr>
                        {headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/60">
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-surface-2/30">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3 text-muted text-xs leading-relaxed">
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: formatInline(cell),
                                }}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
              return;
            }
          }

          // Horizontal rule
          if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
            elements.push(<hr key={`hr-${index}-${pIdx}`} className="my-10 border-border/70" />);
            return;
          }

          // Markdown Image: ![alt](url)
          const standaloneImgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (standaloneImgMatch) {
            const alt = standaloneImgMatch[1];
            const src = standaloneImgMatch[2];
            elements.push(
              <figure
                key={`img-${index}-${pIdx}`}
                className="my-8 overflow-hidden rounded-xl border border-border/80 bg-surface-2/40 shadow-xs"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt || "Article illustration"}
                  loading="lazy"
                  className="w-full h-auto object-cover max-h-[520px]"
                />
                {alt && (
                  <figcaption className="p-3 text-center text-xs font-mono text-muted border-t border-border/50 bg-surface-2/60">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
            return;
          }

          // Blockquotes and Callouts
          if (trimmed.startsWith("> ")) {
            const quoteContent = trimmed.replace(/^>\s*/gm, "");
            const isNote = quoteContent.startsWith("[!NOTE]");
            const isImportant = quoteContent.startsWith("[!IMPORTANT]");
            const isWarning = quoteContent.startsWith("[!WARNING]");

            let cleanQuote = quoteContent;
            let calloutClass = "border-l-2 border-accent pl-4 my-5 italic text-muted text-base leading-relaxed";

            if (isNote || isImportant || isWarning) {
              cleanQuote = quoteContent.replace(/^\[!(NOTE|IMPORTANT|WARNING)\]\s*/, "");
              calloutClass = isWarning
                ? "border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-lg my-6 not-italic text-text"
                : isImportant
                ? "border-l-4 border-accent bg-accent/10 p-4 rounded-r-lg my-6 not-italic text-text"
                : "border-l-4 border-blue-500 bg-blue-500/10 p-4 rounded-r-lg my-6 not-italic text-text";
            }

            elements.push(
              <blockquote
                key={`quote-${index}-${pIdx}`}
                className={calloutClass}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatInline(cleanQuote),
                  }}
                />
              </blockquote>
            );
            return;
          }

          // Bullet lists / Numbered lists
          if (trimmed.startsWith("- ") || trimmed.startsWith("1. ")) {
            const listItems = trimmed.split("\n");
            elements.push(
              <ul
                key={`list-${index}-${pIdx}`}
                className="my-4 space-y-2 text-muted text-base leading-relaxed pl-1"
              >
                {listItems.map((item, itemIdx) => {
                  const cleaned = item.replace(/^(-\s+|\d+\.\s+)/, "");
                  return (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="text-accent/80 select-none mt-1 font-mono text-xs">•</span>
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

          // Standard Paragraph: clean, calm, comfortable reading format
          elements.push(
            <p
              key={`p-${index}-${pIdx}`}
              className="text-base sm:text-[17px] text-muted leading-relaxed font-sans text-justify hyphens-auto"
              dangerouslySetInnerHTML={{
                __html: formatInline(trimmed),
              }}
            />
          );
        });
      }
    });

    return elements;
  }, [content]);

  return (
    <div className="space-y-6 blog-content prose-editorial">
      <div className="prose dark:prose-invert max-w-none text-muted leading-relaxed space-y-5">
        {blocks}
      </div>
    </div>
  );
}

// Format basic inline markdown: **bold**, *italic*, `code`, ![img](url), [link](url)
function formatInline(text: string): string {
  return text
    .replace(
      /!\[(.*?)\]\((.*?)\)/g,
      '<img src="$2" alt="$1" class="rounded-lg my-2 max-w-full h-auto border border-border inline-block" loading="lazy" />'
    )
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
