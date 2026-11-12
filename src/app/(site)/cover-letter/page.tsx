import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CoverLetterView } from "@/components/cover-letter/cover-letter-view";
import {
  getPerson,
  getSocials,
  getCoverLetter,
  isFeatureEnabled,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cover Letter",
  description:
    "Professional engineering cover letter of Sunny Sahsi: Full Stack & Systems Engineer specializing in Next.js, Go, and enterprise AI agent orchestration.",
  alternates: {
    canonical: "https://sunnysahsi.com/cover-letter",
  },
  openGraph: {
    title: "Cover Letter | Sunny Sahsi",
    description:
      "Professional engineering cover letter of Sunny Sahsi: Full Stack & Systems Engineer.",
    images: ["/og/default.png"],
  },
};

export default async function CoverLetterPage({
  searchParams,
}: {
  searchParams?: Promise<{ theme?: string }>;
}) {
  if (!isFeatureEnabled("coverLetter")) {
    notFound();
  }

  const resolvedParams = searchParams ? await searchParams : undefined;
  const initialTheme = resolvedParams?.theme === "dark" ? "dark" : "light";

  const person = getPerson();
  const socials = getSocials();
  const coverLetter = getCoverLetter();

  return (
    <CoverLetterView
      key={initialTheme}
      initialTheme={initialTheme}
      person={person}
      socials={socials}
      coverLetter={coverLetter}
    />
  );
}

