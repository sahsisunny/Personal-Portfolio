import { z } from "zod";

export const AvailabilitySchema = z.object({
  status: z.string(),
  label: z.string(),
});

export const PersonSchema = z.object({
  name: z.string(),
  firstName: z.string(),
  handle: z.string(),
  headline: z.string(),
  tagline: z.string(),
  location: z.string(),
  workMode: z.string(),
  availability: AvailabilitySchema,
  shortBio: z.string(),
  longBio: z.array(z.string()),
  avatar: z.string(),
  avatarAlt: z.string(),
  email: z.string().email(),
  resumeUrl: z.string().nullable().optional(),
  resumeLocalPath: z.string().nullable().optional(),
});

export const SocialsSchema = z.object({
  linkedin: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  x: z.string().nullable().optional(),
  instagram: z.string().nullable().optional(),
  youtube: z.string().nullable().optional(),
  peerlist: z.string().nullable().optional(),
});

export const NavItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const NavigationSchema = z.object({
  main: z.array(NavItemSchema),
  rides: z.object({
    label: z.string(),
    href: z.string(),
    badge: z.string().optional(),
    style: z.string().optional(),
  }),
});

export const StatItemSchema = z.object({
  label: z.string(),
  value: z.string(),
  computedFrom: z.string().optional(),
});

export const RoleSchema = z.object({
  title: z.string(),
  start: z.string(),
  end: z.string().nullable().optional(),
  highlights: z.array(z.string()),
});

export const ExperienceSchema = z.object({
  id: z.string(),
  enabled: z.boolean().optional().default(true),
  company: z.string(),
  companyUrl: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
  location: z.string(),
  employmentType: z.string(),
  start: z.string(),
  end: z.string().nullable().optional(),
  current: z.boolean(),
  roles: z.array(RoleSchema),
  tech: z.array(z.string()),
  confidentialityNote: z.string().optional(),
});

export const EducationSchema = z.object({
  id: z.string(),
  enabled: z.boolean().optional().default(true),
  institution: z.string(),
  degree: z.string(),
  score: z.string(),
  start: z.string(),
  end: z.string().nullable().optional(),
  logo: z.string().nullable().optional(),
  topics: z.array(z.string()),
});

export const SkillItemSchema = z.object({
  name: z.string(),
  level: z.enum(["daily", "comfortable", "learning"]),
});

export const SkillGroupSchema = z.object({
  id: z.string(),
  enabled: z.boolean().optional().default(true),
  label: z.string(),
  items: z.array(SkillItemSchema),
});

export const SkillsSchema = z.object({
  groups: z.array(SkillGroupSchema),
  currentlyLearning: z.array(z.string()),
});

export const ProjectImageSchema = z.union([
  z.string().transform((src) => ({ src, alt: "Project screenshot" })),
  z.object({
    src: z.string(),
    alt: z.string(),
    width: z.number().optional(),
    height: z.number().optional(),
  }),
]);

export const ProjectSchema = z.object({
  id: z.string(),
  enabled: z.boolean().optional().default(true),
  slug: z.string(),
  title: z.string(),
  status: z.enum(["completed", "in-progress", "work-in-progress"]),
  featured: z.boolean(),
  visibility: z.enum(["public", "public-after-review", "private"]),
  visibilityNote: z.string().optional(),
  summary: z.string(),
  description: z.string(),
  role: z.string(),
  tech: z.array(z.string()),
  highlights: z.array(z.string()),
  metrics: z
    .object({
      toolsCount: z.number().nullable().optional(),
      avgLatencyMs: z.number().nullable().optional(),
    })
    .optional(),
  links: z.object({
    repo: z.string().nullable().optional(),
    live: z.string().nullable().optional(),
    caseStudy: z.string().nullable().optional(),
  }),
  images: z.array(ProjectImageSchema),
  period: z.object({
    start: z.string().nullable().optional(),
    end: z.string().nullable().optional(),
  }),
});

export const OpenSourceSchema = z.object({
  id: z.string().optional(),
  enabled: z.boolean().optional().default(true),
  org: z.string(),
  summary: z.string(),
  links: z.object({
    github: z.string().optional(),
  }),
  contributions: z.array(z.string()),
});

export const WaypointSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  day: z.number().optional(),
  note: z.string().optional(),
});

export const DayByDaySchema = z.object({
  day: z.number(),
  from: z.string(),
  to: z.string(),
  km: z.number().optional(),
  note: z.string().optional(),
  photo: z.string().optional(),
});

export const GalleryItemSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const VideoItemSchema = z.object({
  provider: z.string().optional(),
  id: z.string(),
  title: z.string(),
});

export const RideSchema = z.object({
  id: z.string(),
  enabled: z.boolean().optional().default(true),
  slug: z.string(),
  title: z.string(),
  type: z.enum(["solo", "group"]),
  origin: z.string(),
  destination: z.string(),
  year: z.number().nullable().optional(),
  startDate: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  durationDays: z.number().nullable().optional(),
  distanceKm: z.number().nullable().optional(),
  bike: z.string().nullable().optional(),
  coverImage: z.string(),
  summary: z.string(),
  story: z.string(),
  route: z.object({
    geojsonFile: z.string().nullable().optional(),
    gpxFile: z.string().nullable().optional(),
    waypoints: z.array(WaypointSchema).default([]),
  }),
  highlights: z.array(z.string()).default([]),
  dayByDay: z.array(DayByDaySchema).default([]),
  gallery: z.array(GalleryItemSchema).default([]),
  videos: z.array(VideoItemSchema).default([]),
  lessons: z.array(z.string()).default([]),
  gearUsed: z.array(z.string()).default([]),
});

export const BikeModSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
});

export const BikeTelemetryStatSchema = z.object({
  label: z.string(),
  value: z.string(),
  subtext: z.string().optional(),
});

export const BikeDetailsSchema = z.object({
  name: z.string(),
  model: z.string(),
  engine: z.string(),
  displacement: z.string(),
  power: z.string(),
  torque: z.string(),
  weight: z.string(),
  fuelCapacity: z.string(),
  rangeKm: z.string(),
  brakes: z.string(),
  tires: z.string(),
  image: z.string(),
  tagline: z.string(),
  description: z.string(),
  seatHeight: z.string().optional(),
  groundClearance: z.string().optional(),
  transmission: z.string().optional(),
  suspension: z.string().optional(),
  color: z.string().optional(),
  cooling: z.string().optional(),
  fuelSystem: z.string().optional(),
  chassis: z.string().optional(),
  whyThisBike: z.array(z.string()),
  modifications: z.array(BikeModSchema),
  telemetryStats: z.array(BikeTelemetryStatSchema),
});

export const GearItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(["armour", "helmets", "luggage", "footwear", "tech", "emergency"]),
  categoryLabel: z.string(),
  brand: z.string(),
  spec: z.string(),
  description: z.string(),
  image: z.string(),
  fieldNotes: z.string().optional(),
  rating: z.string().optional(),
});

export const PlannedRideCheckpointSchema = z.object({
  point: z.string(),
  altitude: z.string(),
  note: z.string(),
});

export const PlannedRideTaskSchema = z.object({
  task: z.string(),
  done: z.boolean(),
});

export const PlannedRideSchema = z.object({
  id: z.string(),
  enabled: z.boolean().optional().default(true),
  slug: z.string(),
  title: z.string(),
  status: z.string(),
  origin: z.string(),
  destination: z.string(),
  targetDate: z.string(),
  targetKm: z.number(),
  durationDays: z.number(),
  targetElevationMeters: z.number().optional(),
  summary: z.string(),
  description: z.string(),
  image: z.string(),
  readinessPercent: z.number(),
  highlights: z.array(z.string()),
  checkpoints: z.array(PlannedRideCheckpointSchema),
  preparationList: z.array(PlannedRideTaskSchema),
});

export const RidesSectionSchema = z.object({
  enabled: z.boolean(),
  page: z.object({
    title: z.string(),
    eyebrow: z.string(),
    tagline: z.string(),
    intro: z.string(),
  }),
  stats: z.object({
    totalDistanceKm: z.number().nullable().optional(),
    totalRides: z.number().nullable().optional(),
    statesCrossed: z.number().nullable().optional(),
    highestPointMeters: z.number().nullable().optional(),
    totalRideDays: z.number().nullable().optional(),
  }),
  rides: z.array(RideSchema),
  bikeDetails: BikeDetailsSchema,
  gearItems: z.array(GearItemSchema),
  plannedRides: z.array(PlannedRideSchema),
  gear: z
    .object({
      bike: z.string().nullable().optional(),
      riding: z.array(z.string()).default([]),
      content: z.array(z.string()).default([]),
    })
    .optional(),
  socials: z
    .object({
      instagram: z.string().nullable().optional(),
      x: z.string().nullable().optional(),
      youtube: z.string().nullable().optional(),
    })
    .optional(),
  cta: z.object({
    label: z.string(),
    links: z.array(z.string()),
  }),
});

export const BlogPostConfigSchema = z.object({
  slug: z.string(),
  title: z.string().optional(),
  enabled: z.boolean().default(true),
});

export const FeatureFlagsSchema = z.object({
  blog: z.boolean().default(true),
  projects: z.boolean().default(true),
  experience: z.boolean().default(true),
  rides: z.boolean().default(true),
  skills: z.boolean().default(true),
  education: z.boolean().default(true),
  openSource: z.boolean().default(true),
  contact: z.boolean().default(true),
  testimonials: z.boolean().default(false),
  stats: z.boolean().default(true),
  now: z.boolean().default(true),
  resume: z.boolean().default(true),
}).default({
  blog: true,
  projects: true,
  experience: true,
  rides: true,
  skills: true,
  education: true,
  openSource: true,
  contact: true,
  testimonials: false,
  stats: true,
  now: true,
  resume: true,
});

export const PortfolioSchema = z.object({
  meta: z.object({
    siteTitle: z.string(),
    siteDescription: z.string(),
    siteUrl: z.string(),
    locale: z.string(),
    defaultThemeMode: z.string(),
    ogImage: z.string(),
    favicon: z.string(),
    keywords: z.array(z.string()),
  }),
  features: FeatureFlagsSchema.optional(),
  person: PersonSchema,
  socials: SocialsSchema,
  navigation: NavigationSchema,
  stats: z.object({
    items: z.array(StatItemSchema),
  }),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  skills: SkillsSchema,
  projects: z.array(ProjectSchema),
  openSource: z.array(OpenSourceSchema),
  blog: z.object({
    enabled: z.boolean(),
    title: z.string(),
    subtitle: z.string(),
    source: z.string(),
    contentDir: z.string(),
    categories: z.array(z.string()),
    posts: z.array(BlogPostConfigSchema).default([]),
    postIdeas: z.array(z.object({
      title: z.string(),
      category: z.string(),
      why: z.string(),
    })).default([]),
  }),
  rides: RidesSectionSchema,
  contact: z.object({
    heading: z.string(),
    subheading: z.string(),
    email: z.string().email(),
    form: z.object({
      enabled: z.boolean(),
      provider: z.string(),
      spamProtection: z.string(),
    }),
    responseTime: z.string().nullable().optional(),
  }),
  now: z.object({
    updated: z.string(),
    items: z.array(z.string()),
  }),
  tools: z.object({
    ai: z.array(z.string()).default([]),
    dev: z.array(z.string()).default([]),
    hardware: z.array(z.string()).default([]),
    riding: z.array(z.string()).default([]),
  }),
  testimonials: z.array(z.any()).default([]),
  seo: z.object({
    jsonLd: z.record(z.string(), z.any()),
  }),
}).passthrough();

export type PortfolioData = z.infer<typeof PortfolioSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type Socials = z.infer<typeof SocialsSchema>;
export type StatItem = z.infer<typeof StatItemSchema>;
export type Skills = z.infer<typeof SkillsSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Ride = z.infer<typeof RideSchema>;
export type RidesSection = z.infer<typeof RidesSectionSchema>;
export type RidesSocials = NonNullable<RidesSection["socials"]>;
export type BikeDetails = z.infer<typeof BikeDetailsSchema>;
export type GearItem = z.infer<typeof GearItemSchema>;
export type PlannedRide = z.infer<typeof PlannedRideSchema>;
export type OpenSource = z.infer<typeof OpenSourceSchema>;
export type FeatureFlags = z.infer<typeof FeatureFlagsSchema>;
