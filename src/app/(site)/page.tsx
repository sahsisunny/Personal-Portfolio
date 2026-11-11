import type { Metadata } from "next";
import {
  getPerson,
  getSocials,
  getStats,
  getNow,
  getExperiences,
  getSkills,
  getFeaturedProjects,
  getOpenSource,
  getEducation,
  getRidesSection,
  getContact,
  getSeo,
  getFeatureFlags,
} from "@/lib/data";
import { getAllBlogPosts } from "@/lib/mdx";
import { HeroSection } from "@/components/home/hero-section";
import { NowSection } from "@/components/home/now-section";
import { AboutSection } from "@/components/home/about-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { SkillsSection } from "@/components/home/skills-section";
import { FeaturedProjectsSection } from "@/components/home/featured-projects-section";
import { OpenSourceSection } from "@/components/home/open-source-section";
import { EducationSection } from "@/components/home/education-section";
import { LatestWritingSection } from "@/components/home/latest-writing-section";
import { RidesTeaserSection } from "@/components/home/rides-teaser-section";
import { ContactSection } from "@/components/home/contact-section";

export const metadata: Metadata = {
  title: {
    absolute: "Sunny Sahsi | Full Stack & Systems Engineer",
  },
  description:
    "Sunny Sahsi is a Full Stack & Systems Engineer building scalable web apps with Next.js, high-performance Go backends, and enterprise AI agent orchestration platforms.",
  openGraph: {
    title: "Sunny Sahsi | Full Stack & Systems Engineer",
    description:
      "Sunny Sahsi is a Full Stack & Systems Engineer building scalable web apps with Next.js, high-performance Go backends, and enterprise AI agent orchestration platforms.",
    images: ["/og/default.png"],
  },
};

export default function HomePage() {
  const person = getPerson();
  const socials = getSocials();
  const stats = getStats();
  const now = getNow();
  const experience = getExperiences();
  const skills = getSkills();
  const featuredProjects = getFeaturedProjects();
  const openSource = getOpenSource();
  const education = getEducation();
  const blogPosts = getAllBlogPosts(false);
  const rides = getRidesSection();
  const contact = getContact();
  const seo = getSeo();
  const features = getFeatureFlags();

  return (
    <>
      {/* Schema.org Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seo.jsonLd),
        }}
      />

      <HeroSection person={person} socials={socials} features={features} />
      {features.now && <NowSection now={now} />}
      <AboutSection person={person} stats={features.stats ? stats : []} />
      {features.experience && <ExperienceSection experience={experience} />}
      {features.skills && <SkillsSection skills={skills} />}
      {features.projects && <FeaturedProjectsSection projects={featuredProjects} />}
      {features.openSource && <OpenSourceSection openSource={openSource} />}
      {features.education && <EducationSection education={education} />}
      {features.blog && <LatestWritingSection posts={blogPosts} />}
      {features.rides && <RidesTeaserSection ridesData={rides} />}
      {features.contact && (
        <ContactSection
          email={contact.email}
          heading={contact.heading}
          subheading={contact.subheading}
          socials={socials}
        />
      )}
    </>
  );
}

