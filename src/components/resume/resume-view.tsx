"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Download,
  ArrowLeft,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Cpu,
  Phone,
  Printer,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import type { Person, Experience, Education, Skills, Socials } from "@/lib/schema";
import { formatDate } from "@/lib/utils";

interface ResumeViewProps {
  initialTheme?: "light" | "dark";
  person: Person;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  socials: Socials;
}

export function ResumeView({
  initialTheme = "light",
  person,
  experience,
  education,
  skills,
  socials,
}: ResumeViewProps) {
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

  return (
    <div className="py-6 sm:py-10 md:py-14 print:p-0 print:m-0 print:bg-transparent">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:max-w-none print:w-full">
        {/* Actions bar (hidden in print) */}
        <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

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
              href={isDark ? "/resume-dark.pdf" : "/resume.pdf"}
              download={isDark ? "Sunny_Sahsi_Resume_Dark.pdf" : "Sunny_Sahsi_Resume.pdf"}
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-mono font-semibold text-accent-contrast shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
              aria-label={`Download ${isDark ? "Dark" : "Light"} resume PDF`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF ({isDark ? "Dark" : "Light"})</span>
            </a>

            {/* Print Button */}
            <button
              type="button"
              onClick={() => handlePrint()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-xs font-mono font-semibold text-text hover:border-accent transition-colors shadow-xs cursor-pointer"
              aria-label="Print resume"
            >
              <Printer className="w-3.5 h-3.5 text-muted" />
              <span>Print ({isDark ? "Dark" : "Light"})</span>
            </button>
          </div>
        </div>

        {/* Resume Sheet */}
        <div
          style={{ colorScheme: isDark ? "dark" : "light" }}
          className={`resume-sheet rounded-2xl border transition-colors p-6 sm:p-10 shadow-lg space-y-6 print:border-none print:shadow-none print:space-y-2.5 ${
            isDark
              ? "bg-[#0b0f17] text-[#f8fafc] border-[#1e293b] print-theme-dark"
              : "bg-white text-black border-slate-200 print-theme-light shadow-xl"
          }`}
        >
          {/* Header */}
          <header
            className={`border-b pb-5 print:pb-2.5 space-y-2 print:space-y-1 ${
              isDark ? "border-[#1e293b]" : "border-slate-200"
            }`}
          >
            <h1
              className={`text-3xl sm:text-4xl font-extrabold tracking-tight print:text-2xl ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {person.name}
            </h1>
            <p
              className={`text-base sm:text-lg font-semibold font-mono print:text-sm ${
                isDark ? "text-cyan-400" : "text-black"
              }`}
            >
              {person.headline}
            </p>

            <div
              className={`flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono pt-0.5 print:text-[10px] ${
                isDark ? "text-slate-400" : "text-black"
              }`}
            >
              <span className="flex items-center gap-1">
                <MapPin
                  className={`w-3.5 h-3.5 ${
                    isDark ? "text-cyan-400" : "text-black"
                  }`}
                />
                {person.location} ({person.workMode})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail
                  className={`w-3.5 h-3.5 ${
                    isDark ? "text-cyan-400" : "text-black"
                  }`}
                />
                {person.email}
              </span>
              {person.phone && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone
                      className={`w-3.5 h-3.5 ${
                        isDark ? "text-cyan-400" : "text-black"
                      }`}
                    />
                    {person.phone}
                  </span>
                </>
              )}
              <span>•</span>
              <a
                href="https://sunnysahsi.com"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1 hover:underline font-medium ${
                  isDark
                    ? "text-cyan-400 hover:text-cyan-300"
                    : "text-black hover:text-black/80"
                }`}
              >
                <Globe
                  className={`w-3.5 h-3.5 flex-shrink-0 ${
                    isDark ? "text-cyan-400" : "text-black"
                  }`}
                />
                <span>sunnysahsi.com</span>
              </a>
              {socials.linkedin && (
                <>
                  <span>•</span>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-1 hover:underline font-medium ${
                      isDark
                        ? "text-cyan-400 hover:text-cyan-300"
                        : "text-black hover:text-black/80"
                    }`}
                  >
                    <LinkedinIcon
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isDark ? "text-cyan-400" : "text-black"
                      }`}
                    />
                    <span>LinkedIn</span>
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
                    className={`inline-flex items-center gap-1 hover:underline font-medium ${
                      isDark
                        ? "text-cyan-400 hover:text-cyan-300"
                        : "text-black hover:text-black/80"
                    }`}
                  >
                    <GithubIcon
                      className={`w-3.5 h-3.5 flex-shrink-0 ${
                        isDark ? "text-cyan-400" : "text-black"
                      }`}
                    />
                    <span>GitHub</span>
                  </a>
                </>
              )}
            </div>

            <p
              className={`text-xs sm:text-sm leading-relaxed pt-1 print:text-[11px] print:leading-normal font-normal ${
                isDark ? "text-slate-300" : "text-black"
              }`}
            >
              {person.shortBio}
            </p>
          </header>

          {/* Work Experience */}
          <section className="space-y-4 print:space-y-2">
            <div
              className={`flex items-center gap-2 border-b pb-1.5 print:pb-1 ${
                isDark ? "border-[#1e293b]" : "border-slate-200"
              }`}
            >
              <Briefcase
                className={`w-4 h-4 ${
                  isDark ? "text-cyan-400" : "text-black"
                }`}
              />
              <h2
                className={`text-sm sm:text-base font-bold uppercase font-mono tracking-wider print:text-xs ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Work Experience
              </h2>
            </div>

            <div className="space-y-5 print:space-y-2.5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2.5 print:space-y-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                    <div className="flex items-center gap-2.5">
                      {exp.logo && (
                        <div
                          className={`relative flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg border p-1 overflow-hidden print:h-6 print:w-6 ${
                            isDark
                              ? "border-[#334155] bg-white"
                              : "border-slate-200 bg-white"
                          }`}
                        >
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            title={`${exp.company} logo`}
                            width={32}
                            height={32}
                            className="h-full w-full object-contain bg-white"
                          />
                        </div>
                      )}
                      <div>
                        <h3
                          className={`text-base sm:text-lg font-bold leading-tight print:text-xs ${
                            isDark ? "text-white" : "text-black"
                          }`}
                        >
                          {exp.company}
                        </h3>
                        <span
                          className={`text-[11px] font-mono print:text-[10px] ${
                            isDark ? "text-slate-400" : "text-black"
                          }`}
                        >
                          {exp.location} • {exp.employmentType}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-mono print:text-[10px] ${
                        isDark ? "text-slate-400" : "text-black"
                      }`}
                    >
                      {formatDate(exp.start)} —{" "}
                      {exp.end ? formatDate(exp.end) : "Present"}
                    </span>
                  </div>

                  <div className="space-y-2.5 print:space-y-1.5">
                    {exp.roles.map((role, idx) => (
                      <div
                        key={idx}
                        className={`space-y-1 pl-3 border-l-2 ${
                          isDark ? "border-[#334155]" : "border-slate-300"
                        }`}
                      >
                        <div className="flex justify-between items-baseline gap-2">
                          <h4
                            className={`text-xs sm:text-sm font-semibold print:text-[11px] ${
                              isDark ? "text-slate-100" : "text-black"
                            }`}
                          >
                            {role.title}
                          </h4>
                          <span
                            className={`text-[11px] font-mono flex-shrink-0 print:text-[9.5px] ${
                              isDark ? "text-slate-400" : "text-black"
                            }`}
                          >
                            {formatDate(role.start)} —{" "}
                            {role.end ? formatDate(role.end) : "Present"}
                          </span>
                        </div>
                        <ul
                          className={`space-y-0.5 text-xs print:text-[10.5px] print:leading-snug ${
                            isDark ? "text-slate-300" : "text-black"
                          }`}
                        >
                          {role.highlights.map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-1.5">
                              <span
                                className={`font-mono flex-shrink-0 font-bold ${
                                  isDark ? "text-cyan-400" : "text-black"
                                }`}
                              >
                                ▸
                              </span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1 pt-0.5 print:hidden">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className={`rounded px-1.5 py-0.5 text-[10px] font-mono border ${
                          isDark
                            ? "bg-[#161f2e] text-slate-300 border-[#334155]"
                            : "bg-slate-100 text-slate-800 border-slate-200 font-medium"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="space-y-2.5 print:space-y-1.5">
            <div
              className={`flex items-center gap-2 border-b pb-1.5 print:pb-1 ${
                isDark ? "border-[#1e293b]" : "border-slate-200"
              }`}
            >
              <Cpu
                className={`w-4 h-4 ${
                  isDark ? "text-cyan-400" : "text-black"
                }`}
              />
              <h2
                className={`text-sm sm:text-base font-bold uppercase font-mono tracking-wider print:text-xs ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Technical Skills
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 print:gap-1.5 text-xs print:text-[10.5px]">
              {skills.groups.map((group) => (
                <div key={group.id} className="space-y-0.5">
                  <span
                    className={`font-bold font-mono text-[11px] print:text-[10px] ${
                      isDark ? "text-slate-100" : "text-black"
                    }`}
                  >
                    {group.label}:
                  </span>
                  <p
                    className={`print:leading-tight ${
                      isDark ? "text-slate-300" : "text-black"
                    }`}
                  >
                    {group.items.map((i) => i.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-2.5 print:space-y-1.5">
            <div
              className={`flex items-center gap-2 border-b pb-1.5 print:pb-1 ${
                isDark ? "border-[#1e293b]" : "border-slate-200"
              }`}
            >
              <GraduationCap
                className={`w-4 h-4 ${
                  isDark ? "text-cyan-400" : "text-black"
                }`}
              />
              <h2
                className={`text-sm sm:text-base font-bold uppercase font-mono tracking-wider print:text-xs ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Education
              </h2>
            </div>

            {education.map((edu) => (
              <div
                key={edu.id}
                className="flex justify-between items-start gap-4 text-xs print:text-[10.5px]"
              >
                <div className="flex items-center gap-2.5">
                  {edu.logo && (
                    <div
                      className={`relative flex h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0 items-center justify-center rounded-lg border p-1 overflow-hidden print:h-6 print:w-6 ${
                        isDark
                          ? "border-[#334155] bg-white"
                          : "border-slate-200 bg-white"
                      }`}
                    >
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        title={`${edu.institution} logo`}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain bg-white"
                      />
                    </div>
                  )}
                  <div>
                    <h3
                      className={`font-bold text-xs sm:text-sm print:text-xs ${
                        isDark ? "text-white" : "text-black"
                      }`}
                    >
                      {edu.degree}
                    </h3>
                    <p
                      className={`font-mono text-[11px] print:text-[10px] ${
                        isDark ? "text-slate-400" : "text-black"
                      }`}
                    >
                      {edu.institution} • Score: {edu.score}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-mono text-xs print:text-[10px] flex-shrink-0 ${
                    isDark ? "text-slate-400" : "text-black"
                  }`}
                >
                  {edu.start} — {edu.end || "Present"}
                </span>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
