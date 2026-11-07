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

  return (
    <>
      {/* Schema.org Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seo.jsonLd),
        }}
      />

      <HeroSection person={person} socials={socials} />
      <NowSection now={now} />
      <AboutSection person={person} stats={stats} />
      <ExperienceSection experience={experience} />
      <SkillsSection skills={skills} />
      <FeaturedProjectsSection projects={featuredProjects} />
      <OpenSourceSection openSource={openSource} />
      <EducationSection education={education} />
      <LatestWritingSection posts={blogPosts} />
      <RidesTeaserSection ridesData={rides} />
      <ContactSection
        email={contact.email}
        heading={contact.heading}
        subheading={contact.subheading}
        socials={socials}
      />
    </>
  );
}

