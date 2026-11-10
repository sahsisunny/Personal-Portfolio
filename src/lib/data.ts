import rawPortfolioData from "@/data/portfolio.json";
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
  type FeatureFlags,
} from "./schema";

const parsed = PortfolioSchema.safeParse(rawPortfolioData);

if (!parsed.success) {
  console.error("❌ CRITICAL: src/data/portfolio.json validation failed!");
  console.error(
    parsed.error.issues
      .map((issue) => `  - [${issue.path.join(".")}] ${issue.message}`)
      .join("\n")
  );
  throw new Error("Invalid portfolio.json data structure. Build stopped.");
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
  // Sort by start descending
  return [...portfolioData.experience].sort((a, b) => {
    return b.start.localeCompare(a.start);
  });
}

export function getEducation(): Education[] {
  return portfolioData.education;
}

export function getSkills() {
  return portfolioData.skills;
}

export function getProjects(): Project[] {
  return portfolioData.projects;
}

export function getFeaturedProjects(): Project[] {
  return portfolioData.projects.filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return portfolioData.projects.find((p) => p.slug === slug);
}

export function getOpenSource(): OpenSource[] {
  return portfolioData.openSource;
}

export function getRidesSection() {
  return portfolioData.rides;
}

export function getRides(): Ride[] {
  return portfolioData.rides.rides;
}

export function getRideBySlug(slug: string): Ride | undefined {
  return portfolioData.rides.rides.find((r) => r.slug === slug);
}

export function getBikeDetails(): BikeDetails {
  return portfolioData.rides.bikeDetails;
}

export function getGearItems(): GearItem[] {
  return portfolioData.rides.gearItems;
}

export function getPlannedRides(): PlannedRide[] {
  return portfolioData.rides.plannedRides;
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

export function getFeatureFlags(): FeatureFlags {
  const flags = portfolioData.features;
  return {
    blog: flags?.blog ?? (portfolioData.blog?.enabled ?? true),
    projects: flags?.projects ?? true,
    experience: flags?.experience ?? true,
    rides: flags?.rides ?? (portfolioData.rides?.enabled ?? true),
    skills: flags?.skills ?? true,
    education: flags?.education ?? true,
    openSource: flags?.openSource ?? true,
    contact: flags?.contact ?? true,
    testimonials: flags?.testimonials ?? false,
    stats: flags?.stats ?? true,
    now: flags?.now ?? true,
    resume: flags?.resume ?? true,
    commandPalette: flags?.commandPalette ?? true,
  };
}

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return Boolean(flags[feature]);
}

