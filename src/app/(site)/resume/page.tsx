import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Download,
  ArrowLeft,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Cpu,
} from "lucide-react";
import { PrintButton } from "@/components/ui/print-button";
import {
  getPerson,
  getExperiences,
  getEducation,
  getSkills,
  getSocials,
  isFeatureEnabled,
} from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume | Sunny Sahsi | Associate Full Stack Developer",
  description:
    "Curriculum Vitae and professional resume of Sunny Sahsi: Associate Full Stack Developer specializing in Next.js, Go, and AI chatbot agents.",
};

export default function ResumePage() {
  if (!isFeatureEnabled("resume")) {
    notFound();
  }

  const person = getPerson();
  const experience = getExperiences();
  const education = getEducation();
  const skills = getSkills();
  const socials = getSocials();

  return (
    <div className="py-12 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Actions bar (hidden in print) */}
        <div className="no-print mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            {person.resumeUrl && (
              <a
                href={person.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-surface border border-border px-4 py-2 text-xs font-mono font-semibold text-text hover:border-accent transition-colors shadow-xs"
              >
                <Download className="w-3.5 h-3.5 text-accent" />
                <span>Download Drive PDF</span>
              </a>
            )}
            <PrintButton />
          </div>
        </div>

        {/* Resume Sheet */}
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12 shadow-md space-y-10 print:border-none print:shadow-none print:p-0 print:bg-white print:text-black">
          {/* Header */}
          <header className="border-b border-border/80 pb-8 space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight print:text-black">
              {person.name}
            </h1>
            <p className="text-lg font-semibold text-accent font-mono print:text-neutral-800">
              {person.headline}
            </p>

            <div className="flex flex-wrap gap-4 text-xs font-mono text-muted print:text-neutral-600 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-accent print:text-neutral-800" />
                {person.location} ({person.workMode})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-accent print:text-neutral-800" />
                {person.email}
              </span>
              {socials.linkedin && (
                <>
                  <span>•</span>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
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
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </>
              )}
            </div>

            <p className="text-sm text-muted print:text-neutral-700 leading-relaxed pt-2">
              {person.shortBio}
            </p>
          </header>

          {/* Experience */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Briefcase className="w-4 h-4 text-accent print:text-neutral-800" />
              <h2 className="text-base font-bold uppercase font-mono tracking-wider text-text print:text-black">
                Work Experience
              </h2>
            </div>

            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {exp.logo && (
                        <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 p-1 overflow-hidden print:hidden">
                          <Image
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            width={32}
                            height={32}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-text print:text-black">
                          {exp.company}
                        </h3>
                        <span className="text-xs font-mono text-muted print:text-neutral-600">
                          {exp.location} • {exp.employmentType}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-muted print:text-neutral-600">
                      {formatDate(exp.start)} — {exp.end ? formatDate(exp.end) : "Present"}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {exp.roles.map((role, idx) => (
                      <div key={idx} className="space-y-1.5 pl-3 border-l-2 border-border/80">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-semibold text-text print:text-black">
                            {role.title}
                          </h4>
                          <span className="text-xs font-mono text-muted print:text-neutral-600">
                            {formatDate(role.start)} — {role.end ? formatDate(role.end) : "Present"}
                          </span>
                        </div>
                        <ul className="space-y-1 text-xs text-muted print:text-neutral-700">
                          {role.highlights.map((hl, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2">
                              <span className="text-accent font-mono">▸</span>
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded bg-surface-2 px-2 py-0.5 text-[10px] font-mono text-muted print:text-neutral-800 border border-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <Cpu className="w-4 h-4 text-accent print:text-neutral-800" />
              <h2 className="text-base font-bold uppercase font-mono tracking-wider text-text print:text-black">
                Technical Skills
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {skills.groups.map((group) => (
                <div key={group.id} className="space-y-1">
                  <span className="font-bold text-text print:text-black font-mono">
                    {group.label}:
                  </span>
                  <p className="text-muted print:text-neutral-700">
                    {group.items.map((i) => i.name).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 border-b border-border/60 pb-2">
              <GraduationCap className="w-4 h-4 text-accent print:text-neutral-800" />
              <h2 className="text-base font-bold uppercase font-mono tracking-wider text-text print:text-black">
                Education
              </h2>
            </div>

            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start gap-4 text-xs">
                <div className="flex items-center gap-3">
                  {edu.logo && (
                    <div className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 p-1 overflow-hidden print:hidden">
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-text print:text-black text-sm">
                      {edu.degree}
                    </h3>
                    <p className="text-muted print:text-neutral-600 font-mono">
                      {edu.institution} • Score: {edu.score}
                    </p>
                  </div>
                </div>
                <span className="font-mono text-muted print:text-neutral-600">
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
