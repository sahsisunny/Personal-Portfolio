import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-go";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function highlightCode(code: string, language: string): string {
  const normLang = (language || "").toLowerCase().trim();
  let langKey = normLang;
  if (normLang === "ts" || normLang === "tsx") langKey = "typescript";
  if (normLang === "js" || normLang === "jsx") langKey = "javascript";
  if (normLang === "golang") langKey = "go";
  if (normLang === "sh" || normLang === "shell") langKey = "bash";

  const grammar = Prism.languages[langKey] || Prism.languages.javascript || Prism.languages.clike;
  if (!grammar) {
    return escapeHtml(code);
  }

  try {
    return Prism.highlight(code, grammar, langKey);
  } catch {
    return escapeHtml(code);
  }
}
