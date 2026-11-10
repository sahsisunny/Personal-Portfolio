import rawPortfolioData from "../../portfolio-data.json";
import {
  PortfolioSchema,
  type PortfolioData,
  type Project,
  type Experience,
  type Education,
  type Ride,
  type BikeDetails,
  type GearItem,
  type PlannedRide,
  type OpenSource,
} from "./schema";

const parsed = PortfolioSchema.safeParse(rawPortfolioData);

if (!parsed.success) {
  console.error("❌ CRITICAL: portfolio-data.json validation failed!");
  console.error(
    parsed.error.issues
      .map((issue) => `  - [${issue.path.join(".")}] ${issue.message}`)
      .join("\n")
  );
  throw new Error("Invalid portfolio-data.json data structure. Build stopped.");
}

export const portfolioData: PortfolioData = parsed.data;

export function getPortfolioData(): PortfolioData {
  return portfolioData;
}

export function getPerson() {
  return portfolioData.person;
}

export function getSocials() {
  return portfolioData.socials;
}

export function getNavigation() {
  return portfolioData.navigation;
}

export function getStats() {
  return portfolioData.stats.items;
}

export function getExperiences(): Experience[] {
  if (!isFeatureEnabled("experience")) return [];
  // Sort by start descending
  return [...portfolioData.experience]
    .filter((e) => e.enabled !== false)
    .sort((a, b) => b.start.localeCompare(a.start));
}

export function getEducation(): Education[] {
  if (!isFeatureEnabled("education")) return [];
  return portfolioData.education.filter((e) => e.enabled !== false);
}

export function getSkills() {
  if (!isFeatureEnabled("skills")) return { groups: [], currentlyLearning: [] };
  return {
    groups: portfolioData.skills.groups.filter((g) => g.enabled !== false),
    currentlyLearning: portfolioData.skills.currentlyLearning,
  };
}

export function getProjects(): Project[] {
  if (!isFeatureEnabled("projects")) return [];
  return portfolioData.projects.filter((p) => p.enabled !== false);
}

export function getFeaturedProjects(): Project[] {
  if (!isFeatureEnabled("projects")) return [];
  return portfolioData.projects.filter((p) => p.featured && p.enabled !== false);
}

export function getProjectBySlug(slug: string): Project | undefined {
  if (!isFeatureEnabled("projects")) return undefined;
  return portfolioData.projects.find((p) => p.slug === slug && p.enabled !== false);
}

export function getOpenSource(): OpenSource[] {
  if (!isFeatureEnabled("openSource")) return [];
  return portfolioData.openSource.filter((o) => o.enabled !== false);
}

export function getRidesSection() {
  return portfolioData.rides;
}

export function getRides(): Ride[] {
  if (!isFeatureEnabled("rides")) return [];
  return portfolioData.rides.rides.filter((r) => r.enabled !== false);
}

export function getRideBySlug(slug: string): Ride | undefined {
  if (!isFeatureEnabled("rides")) return undefined;
  return portfolioData.rides.rides.find((r) => r.slug === slug && r.enabled !== false);
}

export function getBikeDetails(): BikeDetails {
  return portfolioData.rides.bikeDetails;
}

export function getGearItems(): GearItem[] {
  return portfolioData.rides.gearItems;
}

export function getPlannedRides(): PlannedRide[] {
  if (!isFeatureEnabled("rides") || !isChildFeatureEnabled("rides", "upcoming")) return [];
  return (portfolioData.rides.plannedRides ?? []).filter((r) => r.enabled !== false);
}

export function getNow() {
  return portfolioData.now;
}

export function getTools() {
  return portfolioData.tools;
}

export function getContact() {
  return portfolioData.contact;
}

export function getSeo() {
  return portfolioData.seo;
}

export function getMeta() {
  return portfolioData.meta;
}

export interface NormalizedFeatureFlags {
  blog: {
    enabled: boolean;
    search: boolean;
    categories: boolean;
    tags: boolean;
    toc: boolean;
    diagrams: boolean;
    readingTime: boolean;
    relatedPosts: boolean;
    shareButtons: boolean;
  };
  projects: {
    enabled: boolean;
    search: boolean;
    filter: boolean;
    metrics: boolean;
    caseStudy: boolean;
    liveLinks: boolean;
    githubLinks: boolean;
  };
  experience: {
    enabled: boolean;
    currentRoleHighlight: boolean;
    techStackPills: boolean;
  };
  rides: {
    enabled: boolean;
    routesMap: boolean;
    stats: boolean;
    bike: boolean;
    gear: boolean;
    upcoming: boolean;
    gallery: boolean;
    timeline: boolean;
    videos: boolean;
    lessons: boolean;
  };
  skills: {
    enabled: boolean;
    proficiencyBadges: boolean;
  };
  education: boolean;
  openSource: boolean;
  contact: {
    enabled: boolean;
    form: boolean;
    socials: boolean;
  };
  hero: {
    enabled: boolean;
    statusPill: boolean;
    highlightsStrip: boolean;
    projectsCta: boolean;
    resumeCta: boolean;
    contactCta: boolean;
  };
  testimonials: boolean;
  stats: boolean;
  now: boolean;
  resume: boolean;
  commandPalette: boolean;
}

export function getFeatureFlags(): NormalizedFeatureFlags {
  const flags = portfolioData.features;

  const normalizeFlag = <T extends Record<string, boolean>>(
    val: unknown,
    defaults: T
  ): T & { enabled: boolean } => {
    if (typeof val === "boolean") {
      const res = { ...defaults, enabled: val };
      if (!val) {
        Object.keys(defaults).forEach((k) => {
          (res as Record<string, boolean>)[k] = false;
        });
      }
      return res;
    }
    const obj = (typeof val === "object" && val !== null ? val : {}) as Record<string, boolean>;
    const enabled = obj.enabled ?? true;
    const res = { ...defaults, ...obj, enabled };
    if (!enabled) {
      Object.keys(defaults).forEach((k) => {
        (res as Record<string, boolean>)[k] = false;
      });
    }
    return res;
  };

  const blog = normalizeFlag(
    flags?.blog ?? (portfolioData.blog?.enabled ?? true),
    {
      search: true,
      categories: true,
      tags: true,
      toc: true,
      diagrams: true,
      readingTime: true,
      relatedPosts: true,
      shareButtons: true,
    }
  );

  const projects = normalizeFlag(flags?.projects ?? true, {
    search: true,
    filter: true,
    metrics: true,
    caseStudy: true,
    liveLinks: true,
    githubLinks: true,
  });

  const experience = normalizeFlag(flags?.experience ?? true, {
    currentRoleHighlight: true,
    techStackPills: true,
  });

  const rides = normalizeFlag(
    flags?.rides ?? (portfolioData.rides?.enabled ?? true),
    {
      routesMap: true,
      stats: true,
      bike: true,
      gear: true,
      upcoming: true,
      gallery: true,
      timeline: true,
      videos: true,
      lessons: true,
    }
  );

  const skills = normalizeFlag(flags?.skills ?? true, {
    proficiencyBadges: true,
  });

  const contact = normalizeFlag(flags?.contact ?? true, {
    form: true,
    socials: true,
  });

  const hero = normalizeFlag(flags?.hero ?? true, {
    statusPill: true,
    highlightsStrip: true,
    projectsCta: true,
    resumeCta: true,
    contactCta: true,
  });

  return {
    blog,
    projects,
    experience,
    rides,
    skills,
    education: typeof flags?.education === "boolean" ? flags.education : true,
    openSource: typeof flags?.openSource === "boolean" ? flags.openSource : true,
    contact,
    hero,
    testimonials: typeof flags?.testimonials === "boolean" ? flags.testimonials : false,
    stats: typeof flags?.stats === "boolean" ? flags.stats : true,
    now: typeof flags?.now === "boolean" ? flags.now : true,
    resume: typeof flags?.resume === "boolean" ? flags.resume : true,
    commandPalette: typeof flags?.commandPalette === "boolean" ? flags.commandPalette : true,
  };
}

export function isFeatureEnabled(feature: keyof NormalizedFeatureFlags): boolean {
  const flags = getFeatureFlags();
  const val = flags[feature];
  if (typeof val === "boolean") return val;
  return Boolean(val?.enabled);
}

export function isChildFeatureEnabled<
  P extends "blog" | "projects" | "experience" | "rides" | "skills" | "contact" | "hero",
  C extends keyof NormalizedFeatureFlags[P]
>(parent: P, child: C): boolean {
  const flags = getFeatureFlags();
  const parentObj = flags[parent];
  if (!parentObj || !parentObj.enabled) return false;
  return Boolean(parentObj[child]);
}

