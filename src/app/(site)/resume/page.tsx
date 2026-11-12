import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResumeView } from "@/components/resume/resume-view";
import {
  getPerson,
  getExperiences,
  getEducation,
  getSkills,
  getSocials,
  isFeatureEnabled,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resume & Experience",
  description:
    "Curriculum Vitae and professional engineering resume of Sunny Sahsi: Full Stack & Systems Engineer specializing in Next.js, Go, and AI agent orchestration.",
  alternates: {
    canonical: "https://sunnysahsi.com/resume",
  },
  openGraph: {
    title: "Resume & Experience | Sunny Sahsi",
    description:
      "Curriculum Vitae and professional engineering resume of Sunny Sahsi: Full Stack & Systems Engineer.",
    images: ["/og/default.png"],
  },
};

export default async function ResumePage({
  searchParams,
}: {
  searchParams?: Promise<{ theme?: string }>;
}) {
  if (!isFeatureEnabled("resume")) {
    notFound();
  }

  const resolvedParams = searchParams ? await searchParams : undefined;
  const initialTheme = resolvedParams?.theme === "dark" ? "dark" : "light";

  const person = getPerson();
  const experience = getExperiences();
  const education = getEducation();
  const skills = getSkills();
  const socials = getSocials();

  return (
    <ResumeView
      key={initialTheme}
      initialTheme={initialTheme}
      person={person}
      experience={experience}
      education={education}
      skills={skills}
      socials={socials}
    />
  );
}
