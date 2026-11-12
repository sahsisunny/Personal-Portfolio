"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, ArrowLeft, Printer, Sun, Moon, FileText } from "lucide-react";
import type { Person, Socials, CoverLetter } from "@/lib/schema";

interface CoverLetterViewProps {
  initialTheme?: "light" | "dark";
  person: Person;
  socials: Socials;
  coverLetter?: CoverLetter;
}

export function CoverLetterView({
  initialTheme = "light",
  person,
  socials,
  coverLetter,
}: CoverLetterViewProps) {
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);

  useEffect(() => {
    document.body.setAttribute("data-print-theme", theme);
    return () => {
      document.body.removeAttribute("data-print-theme");
    };
  }, [theme]);

  const handlePrint = (selectedTheme?: "light" | "dark") => {
    const targetTheme = selectedTheme || theme;
    if (targetTheme !== theme) {
      setTheme(targetTheme);
      document.body.setAttribute("data-print-theme", targetTheme);
      setTimeout(() => {
        window.print();
      }, 50);
    } else {
      window.print();
    }
  };

  const isDark = theme === "dark";

  // Fallbacks if coverLetter not provided in data
  const letter = coverLetter || {
    recipient: {
      name: "Hiring Team / Engineering Leadership",
      company: null,
      location: null,
    },
    date: "2026-11-12",
    subject: "Application for Full Stack & Systems Engineer",
    salutation: "Dear Hiring Team,",
    paragraphs: [
      "I am writing to express my strong interest in joining your engineering organization as a Full Stack & Systems Engineer. With extensive hands-on experience engineering production systems across Next.js and Go microservices—most prominently architecting a zero-trust enterprise AI orchestrator coordinating 600+ microservice endpoints—I specialize in building performant, fault-tolerant architectures that bridge complex distributed backends with intuitive, high-density user interfaces.",
      "At Fountane, I led the core technical architecture of our enterprise AI orchestrator in Go. Rather than relying on fragile prompt engineering, I engineered a high-concurrency tool routing runtime that parses natural-language queries into parallelized API operations across 600+ microservice endpoints with sub-100ms dispatch latency. Security is enforced as a strict architectural invariant: by forwarding caller-scoped session tokens (JWTs) and programmatically injecting tenant IDs in Go, we eliminated prompt-based tenant drift with 99.9% tenant isolation compliance. Additionally, I designed an autonomous routine runtime for scheduled and event-driven business workflows with human-in-the-loop approvals, reducing operational manual inquiry handling by over 60%.",
      "Complementing my systems work, I engineer responsive web applications using Next.js 15, TypeScript, and React, optimizing rendering lifecycles to reduce page load times by 40% on datasets exceeding 10,000+ records. On the backend tier, I design Go microservices backed by PostgreSQL and MySQL, guaranteeing strict transactional consistency (ACID), automated webhook verification for payment gateways, and dynamic role-based authorization (RBAC). I maintain 85%+ Vitest test coverage on critical business workflows and manage automated GitLab CI/CD release pipelines to ensure reliable, zero-downtime deployments.",
      "I approach engineering with high ownership, deep analytical rigor, and a commitment to measurable outcomes—the same discipline that fuels my solo motorcycle endurance expeditions across thousands of kilometers through Ladakh and Rameshwaram. I would welcome the opportunity to discuss how my systems mindset, Go microservice expertise, and full-stack execution can make an immediate and lasting contribution to your team.",
    ],
    signOff: "Sincerely,",
    signatureName: "Sunny Sahsi",
    signatureTitle: "Full Stack & Systems Engineer",
  };

  return (
    <div className="py-6 sm:py-10 md:py-14 print:p-0 print:m-0 print:bg-transparent">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:max-w-none print:w-full">
        {/* Actions bar (hidden in print) */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </Link>
            <span className="text-border">/</span>
            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Theme switcher */}
            <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-2 p-1 text-xs font-mono shadow-2xs">
              <span className="text-[11px] text-muted px-2 select-none">Theme:</span>
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  !isDark
                    ? "bg-surface text-text shadow-xs font-semibold"
                    : "text-muted hover:text-text"
                }`}
                aria-label="Preview in light theme"
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                  isDark
                    ? "bg-surface text-text shadow-xs font-semibold"
                    : "text-muted hover:text-text"
                }`}
                aria-label="Preview in dark theme"
              >
                <Moon className="w-3.5 h-3.5 text-accent" />
                <span>Dark</span>
              </button>
            </div>

            {/* Direct PDF Download */}
            <a
              href={isDark ? "/cover-letter-dark.pdf" : "/cover-letter.pdf"}
              download={
                isDark
                  ? "Sunny_Sahsi_Cover_Letter_Dark.pdf"
                  : "Sunny_Sahsi_Cover_Letter.pdf"
              }
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-mono font-semibold text-accent-contrast shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              aria-label={`Download ${isDark ? "Dark" : "Light"} cover letter PDF`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ({isDark ? "Dark" : "Light"})</span>
            </a>

            {/* Print Button */}
            <button
              type="button"
              onClick={() => handlePrint()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-mono font-semibold text-text hover:border-accent transition-colors shadow-xs cursor-pointer"
              aria-label="Print cover letter"
            >
              <Printer className="w-3.5 h-3.5 text-muted" />
              <span>Print ({isDark ? "Dark" : "Light"})</span>
            </button>
          </div>
        </div>

        {/* Cover Letter Sheet */}
        <div
          style={{ colorScheme: isDark ? "dark" : "light" }}
          className={`resume-sheet rounded-2xl border transition-colors p-6 sm:p-10 shadow-lg space-y-6 sm:space-y-8 print:border-none print:shadow-none print:space-y-8 ${
            isDark
              ? "bg-[#0b0f17] text-[#f8fafc] border-[#1e293b] print-theme-dark"
              : "bg-white text-black border-slate-200 print-theme-light shadow-xl"
          }`}
        >
          {/* Header - Identical text-based header to Resume */}
          <header
            className={`border-b pb-4 print:pb-3.5 space-y-2 print:space-y-2 ${
              isDark ? "border-[#1e293b]" : "border-slate-200"
            }`}
          >
            <h1
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight print:text-[26px] ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {person.name}
            </h1>
            <p
              className={`text-base sm:text-lg font-semibold font-mono print:text-[14px] ${
                isDark ? "text-cyan-400" : "text-black"
              }`}
            >
              {person.headline}
            </p>

            <div
              className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono pt-0.5 print:text-[11px] ${
                isDark ? "text-slate-400" : "text-black"
              }`}
            >
              <span>{person.location}</span>
              <span>•</span>
              <a
                href={`mailto:${person.email}`}
                className={`hover:underline font-medium ${
                  isDark ? "text-cyan-400 hover:text-cyan-300" : "text-black hover:underline"
                }`}
              >
                {person.email}
              </a>
              {person.phone && (
                <>
                  <span>•</span>
                  <a
                    href={`tel:${person.phone.replace(/\s+/g, "")}`}
                    className={`hover:underline font-medium ${
                      isDark ? "text-cyan-400 hover:text-cyan-300" : "text-black hover:underline"
                    }`}
                  >
                    {person.phone}
                  </a>
                </>
              )}
              <span>•</span>
              <a
                href="https://sunnysahsi.com"
                target="_blank"
                rel="noreferrer"
                className={`hover:underline font-medium ${
                  isDark ? "text-cyan-400 hover:text-cyan-300" : "text-black hover:underline"
                }`}
              >
                sunnysahsi.com
              </a>
              {socials.linkedin && (
                <>
                  <span>•</span>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={`hover:underline font-medium ${
                      isDark ? "text-cyan-400 hover:text-cyan-300" : "text-black hover:underline"
                    }`}
                  >
                    LinkedIn
                  </a>
                </>
              )}
              {socials.github && (
                <>
                  <span>•</span>
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`hover:underline font-medium ${
                      isDark ? "text-cyan-400 hover:text-cyan-300" : "text-black hover:underline"
                    }`}
                  >
                    GitHub
                  </a>
                </>
              )}
            </div>
          </header>

          {/* Letter Metadata & Subject */}
          <div className="space-y-2 print:space-y-2.5 text-xs font-mono print:font-sans print:text-[12px]">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className={`font-semibold ${isDark ? "text-slate-200" : "text-black"}`}>
                  To: {letter.recipient.name}
                </p>
                {letter.recipient.company && (
                  <p className={isDark ? "text-slate-400" : "text-black"}>
                    {letter.recipient.company}
                  </p>
                )}
                {letter.recipient.location && (
                  <p className={isDark ? "text-slate-400" : "text-black"}>
                    {letter.recipient.location}
                  </p>
                )}
              </div>
              <p className={`whitespace-nowrap flex-shrink-0 ${isDark ? "text-slate-400" : "text-black"}`}>
                Date: {letter.date || new Date().toISOString().slice(0, 10)}
              </p>
            </div>

            <div
              className={`pt-2.5 border-t ${
                isDark ? "border-[#1e293b] text-cyan-400" : "border-slate-200 text-black"
              }`}
            >
              <p className="font-bold print:text-[13px]">
                Re: {letter.subject}
              </p>
            </div>
          </div>

          {/* Letter Body */}
          <section className="space-y-4 sm:space-y-5 print:space-y-5 text-xs sm:text-base print:text-[13.5px] print:leading-[2.05]">
            <p className={`font-semibold print:text-[14px] ${isDark ? "text-slate-100" : "text-black"}`}>
              {letter.salutation}
            </p>

            {letter.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-left leading-relaxed ${
                  isDark ? "text-slate-300" : "text-black"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </section>

          {/* Sign-off (using div so print CSS does not hide it like footer) */}
          <div className="pt-4 print:pt-10 space-y-2 print:space-y-2.5 text-xs sm:text-sm print:text-[12.5px]">
            <p className={isDark ? "text-slate-300" : "text-black"}>
              {letter.signOff}
            </p>
            <div className="pt-1">
              <p
                className={`font-bold font-mono print:font-sans print:text-[14.5px] ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {letter.signatureName}
              </p>
              <p
                className={`text-[11px] font-mono print:font-sans print:text-[12px] ${
                  isDark ? "text-slate-400" : "text-black"
                }`}
              >
                {letter.signatureTitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

