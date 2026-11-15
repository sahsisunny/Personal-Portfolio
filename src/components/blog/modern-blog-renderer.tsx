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
              codeBody.trim().startsWith("xychart") ||
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

        const lines = proseText.split("\n");
        type Block =
          | { type: "heading"; level: number; text: string }
          | { type: "hr" }
          | { type: "table"; lines: string[] }
          | { type: "quote"; lines: string[] }
          | { type: "list"; items: string[] }
          | { type: "html"; content: string }
          | { type: "image"; alt: string; src: string }
          | { type: "paragraph"; text: string };

        const parsedBlocks: Block[] = [];
        let currentBlock:
          | { type: "table"; lines: string[] }
          | { type: "quote"; lines: string[] }
          | { type: "list"; lines: string[] }
          | { type: "html"; lines: string[] }
          | { type: "paragraph"; lines: string[] }
          | null = null;

        const flushCurrentBlock = () => {
          if (!currentBlock) return;
          if (currentBlock.type === "table") {
            parsedBlocks.push({ type: "table", lines: currentBlock.lines });
          } else if (currentBlock.type === "quote") {
            parsedBlocks.push({ type: "quote", lines: currentBlock.lines });
          } else if (currentBlock.type === "list") {
            parsedBlocks.push({ type: "list", items: currentBlock.lines });
          } else if (currentBlock.type === "html") {
            parsedBlocks.push({ type: "html", content: currentBlock.lines.join("\n") });
          } else if (currentBlock.type === "paragraph") {
            const pText = currentBlock.lines.join(" ").trim();
            if (pText) {
              parsedBlocks.push({ type: "paragraph", text: pText });
            }
          }
          currentBlock = null;
        };

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const trimmed = line.trim();

          // Empty line terminates current open block
          if (!trimmed) {
            flushCurrentBlock();
            continue;
          }

          // 1. Horizontal Rule (---, ***, ___)
          if (/^(---|\*\*\*|___)$/.test(trimmed)) {
            flushCurrentBlock();
            parsedBlocks.push({ type: "hr" });
            continue;
          }

          // 2. Heading (#, ##, ###, ####)
          const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
          if (headingMatch) {
            flushCurrentBlock();
            parsedBlocks.push({
              type: "heading",
              level: headingMatch[1].length,
              text: headingMatch[2].trim(),
            });
            continue;
          }

          // 3. Standalone Image: ![alt](url)
          const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
          if (imgMatch) {
            flushCurrentBlock();
            parsedBlocks.push({
              type: "image",
              alt: imgMatch[1],
              src: imgMatch[2],
            });
            continue;
          }

          // 4. HTML block e.g. <div ...> ... </div>
          if (
            trimmed.startsWith("<div") ||
            trimmed.startsWith("<section") ||
            trimmed.startsWith("<figure") ||
            trimmed.startsWith("<center")
          ) {
            flushCurrentBlock();
            currentBlock = { type: "html", lines: [line] };
            if (
              trimmed.includes("</div>") ||
              trimmed.includes("</section>") ||
              trimmed.includes("</figure>") ||
              trimmed.includes("</center>")
            ) {
              flushCurrentBlock();
            }
            continue;
          }
          if (currentBlock && currentBlock.type === "html") {
            currentBlock.lines.push(line);
            if (
              trimmed.includes("</div>") ||
              trimmed.includes("</section>") ||
              trimmed.includes("</figure>") ||
              trimmed.includes("</center>")
            ) {
              flushCurrentBlock();
            }
            continue;
          }

          // 5. Table (starts and contains |)
          if (trimmed.includes("|") && (trimmed.startsWith("|") || trimmed.endsWith("|") || trimmed.includes("---"))) {
            if (currentBlock && currentBlock.type === "table") {
              currentBlock.lines.push(trimmed);
            } else {
              flushCurrentBlock();
              currentBlock = { type: "table", lines: [trimmed] };
            }
            continue;
          }

          // 6. Blockquote (starts with >)
          if (trimmed.startsWith(">")) {
            if (currentBlock && currentBlock.type === "quote") {
              currentBlock.lines.push(trimmed.replace(/^>\s*/, ""));
            } else {
              flushCurrentBlock();
              currentBlock = { type: "quote", lines: [trimmed.replace(/^>\s*/, "")] };
            }
            continue;
          }

          // 7. List Item (- item, * item, • item, 1. item) or Indented List Item
          const isListItem = /^[ \t]*([-\*•]|\d+\.)\s+/.test(line);
          const isListIndented = currentBlock && currentBlock.type === "list" && /^[ \t]{2,}\S/.test(line);

          if (isListItem || isListIndented) {
            if (currentBlock && currentBlock.type === "list") {
              currentBlock.lines.push(line);
            } else {
              flushCurrentBlock();
              currentBlock = { type: "list", lines: [line] };
            }
            continue;
          }

          // 8. Normal Paragraph text
          if (currentBlock && currentBlock.type === "paragraph") {
            currentBlock.lines.push(trimmed);
          } else {
            flushCurrentBlock();
            currentBlock = { type: "paragraph", lines: [trimmed] };
          }
        }
        flushCurrentBlock();

        // Render parsed blocks deterministically
        parsedBlocks.forEach((b, bIdx) => {
          const key = `block-${index}-${bIdx}`;

          if (b.type === "heading") {
            const id = b.text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "");

            if (b.level === 1) {
              elements.push(
                <h2
                  key={key}
                  id={id}
                  className="text-2xl sm:text-3xl font-extrabold text-text mt-10 mb-4 scroll-mt-24 border-b border-border/80 pb-3"
                  dangerouslySetInnerHTML={{ __html: formatInline(b.text) }}
                />
              );
            } else if (b.level === 2) {
              elements.push(
                <h2
                  key={key}
                  id={id}
                  className="text-xl sm:text-2xl font-bold text-text mt-12 mb-4 scroll-mt-24 border-b border-border/60 pb-2"
                  dangerouslySetInnerHTML={{ __html: formatInline(b.text) }}
                />
              );
            } else if (b.level === 3) {
              elements.push(
                <h3
                  key={key}
                  id={id}
                  className="text-lg sm:text-xl font-bold text-text mt-8 mb-3 scroll-mt-24"
                  dangerouslySetInnerHTML={{ __html: formatInline(b.text) }}
                />
              );
            } else {
              elements.push(
                <h4
                  key={key}
                  id={id}
                  className="text-base sm:text-lg font-semibold text-text mt-6 mb-2 scroll-mt-24"
                  dangerouslySetInnerHTML={{ __html: formatInline(b.text) }}
                />
              );
            }
            return;
          }

          if (b.type === "hr") {
            elements.push(<hr key={key} className="my-10 border-border/70" />);
            return;
          }

          if (b.type === "image") {
            const isLogo = b.alt.startsWith("logo:");
            const displayAlt = isLogo ? b.alt.replace(/^logo:\s*/, "") : b.alt;

            if (isLogo) {
              elements.push(
                <div key={key} className="my-6 flex justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.src}
                    alt={displayAlt}
                    loading="lazy"
                    className="w-24 h-24 object-contain rounded-2xl shadow-md"
                  />
                </div>
              );
            } else {
              elements.push(
                <figure
                  key={key}
                  className="my-8 overflow-hidden rounded-xl border border-border/80 bg-surface-2/40 shadow-xs"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={b.src}
                    alt={displayAlt || "Article illustration"}
                    loading="lazy"
                    className="w-full h-auto object-cover max-h-[520px]"
                  />
                  {displayAlt && (
                    <figcaption className="p-3 text-center text-xs font-mono text-muted border-t border-border/50 bg-surface-2/60">
                      {displayAlt}
                    </figcaption>
                  )}
                </figure>
              );
            }
            return;
          }

          if (b.type === "quote") {
            const quoteContent = b.lines.join(" ");
            const isNote = quoteContent.startsWith("[!NOTE]");
            const isImportant = quoteContent.startsWith("[!IMPORTANT]");
            const isWarning = quoteContent.startsWith("[!WARNING]");

            let cleanQuote = quoteContent;
            let calloutClass =
              "border-l-2 border-accent pl-4 my-5 italic text-muted text-base leading-relaxed";

            if (isNote || isImportant || isWarning) {
              cleanQuote = quoteContent.replace(
                /^\[!(NOTE|IMPORTANT|WARNING)\]\s*/,
                ""
              );
              calloutClass = isWarning
                ? "border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-lg my-6 not-italic text-text"
                : isImportant
                ? "border-l-4 border-accent bg-accent/10 p-4 rounded-r-lg my-6 not-italic text-text"
                : "border-l-4 border-blue-500 bg-blue-500/10 p-4 rounded-r-lg my-6 not-italic text-text";
            }

            elements.push(
              <blockquote key={key} className={calloutClass}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatInline(cleanQuote),
                  }}
                />
              </blockquote>
            );
            return;
          }

          if (b.type === "table") {
            const lines = b.lines.filter((l) => l.trim().length > 0);
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
                  key={key}
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
                            <td
                              key={cIdx}
                              className="p-3 text-muted text-xs leading-relaxed"
                            >
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
            }
            return;
          }

          if (b.type === "list") {
            elements.push(
              <ul
                key={key}
                className="my-4 space-y-2.5 text-muted text-base leading-relaxed pl-1"
              >
                {b.items.map((item, itemIdx) => {
                  const isSubItem = /^\s{2,}/.test(item);
                  const trimmedItem = item.trim();

                  let isChecked: boolean | null = null;
                  let itemText = trimmedItem.replace(
                    /^([-\*•]\s+|\d+\.\s+)/,
                    ""
                  );
                  if (
                    itemText.startsWith("[x] ") ||
                    itemText.startsWith("[X] ")
                  ) {
                    isChecked = true;
                    itemText = itemText.replace(/^\[[xX]\]\s*/, "");
                  } else if (itemText.startsWith("[ ] ")) {
                    isChecked = false;
                    itemText = itemText.replace(/^\[ \]\s*/, "");
                  }

                  return (
                    <li
                      key={itemIdx}
                      className={`flex items-start gap-2.5 ${
                        isSubItem ? "ml-6 text-sm text-muted/90" : ""
                      }`}
                    >
                      {isChecked === true ? (
                        <span className="text-emerald-500 font-mono text-sm leading-none mt-1 flex-shrink-0">
                          ✓
                        </span>
                      ) : isChecked === false ? (
                        <span className="text-muted/60 font-mono text-sm leading-none mt-1 flex-shrink-0">
                          ○
                        </span>
                      ) : isSubItem ? (
                        <span className="text-accent/60 select-none mt-1 font-mono text-xs flex-shrink-0">
                          –
                        </span>
                      ) : (
                        <span className="text-accent/80 select-none mt-1 font-mono text-xs flex-shrink-0">
                          •
                        </span>
                      )}
                      <span
                        className="flex-1"
                        dangerouslySetInnerHTML={{
                          __html: formatInline(itemText),
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            );
            return;
          }

          if (b.type === "html") {
            elements.push(
              <div
                key={key}
                className="my-6 w-full overflow-hidden"
                dangerouslySetInnerHTML={{
                  __html: formatInline(b.content),
                }}
              />
            );
            return;
          }

          if (b.type === "paragraph") {
            elements.push(
              <p
                key={key}
                className="text-base sm:text-[17px] text-muted leading-relaxed font-sans text-justify hyphens-auto"
                dangerouslySetInnerHTML={{
                  __html: formatInline(b.text),
                }}
              />
            );
            return;
          }
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
    .replace(/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/g, "&amp;")
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
