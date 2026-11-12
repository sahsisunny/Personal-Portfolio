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
  type FeatureFlags,
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

export function getRidesSection() {
  return portfolioData.rides;
}

export function getRidesSocials(): {
  instagram?: string | null;
  x?: string | null;
  youtube?: string | null;
} {
  const ridesSocials = portfolioData.rides.socials;
  return {
    instagram: ridesSocials?.instagram ?? portfolioData.socials.instagram,
    x: ridesSocials?.x ?? portfolioData.socials.x,
    youtube: ridesSocials?.youtube ?? portfolioData.socials.youtube,
  };
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
  if (!isFeatureEnabled("rides")) return [];
  return (portfolioData.rides.plannedRides ?? []).filter((r) => r.enabled !== false);
}

export function getNow() {
  return portfolioData.now;
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
  };
}

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags();
  return Boolean(flags[feature]);
}

