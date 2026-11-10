# Sunny Sahsi — Portfolio & Rides

Personal portfolio website for **Sunny Sahsi**, Associate Full Stack Developer at Fountane (Next.js, Go, AI Agents) and solo motorcycle adventurer.

This project implements a dual-personality architecture in a single Next.js App Router codebase:
1. **The Professional Developer Site** (`/`, `/projects`, `/blog`, `/resume`): recruiter-friendly, fast, clean, and technical.
2. **The Rides Microsite** (`/rides`, `/rides/[slug]`): an adventure journal with its own warm cinematic palette, Bebas Neue display typography, interactive route maps, timeline, and photo galleries for solo trips from Patna to Ladakh and Rameshwaram.

All site data is centrally governed and validated by **Zod** against `portfolio-data.json`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router) + React 19 + TypeScript (strict)
- **Styling:** Tailwind CSS (v4) with CSS variable token sets
- **Theme:** `next-themes` (Light / Dark / System with zero FOUC)
- **Data Validation:** Zod schema validation at build time (`src/lib/data.ts`)
- **Blog & Content:** MDX with `gray-matter` & `reading-time`
- **Maps:** Leaflet & OpenStreetMap (dynamic client-only load, zero API keys required, dual dark/light tiles)
- **Icons:** Lucide Icons & Custom SVG brand icons
- **Search & Navigation:** Command Palette (⌘K / Ctrl+K)
- **Print:** Clean `@media print` stylesheet for `/resume`

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm (v8+)

### Installation

```bash
# Clone the repository
git clone https://github.com/sahsisunny/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Validate data schema
pnpm validate:data

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ✍️ How Do I Add Content?

Adding content **never requires modifying UI components**. All content lives in data files and MDX documents.

### 1. Adding a Project
1. Open `src/data/portfolio.json`.
2. Add a new object to the `projects` array:
   ```json
   {
     "id": "my-new-project",
     "slug": "my-new-project",
     "title": "Project Title",
     "status": "completed",
     "featured": true,
     "visibility": "public",
     "summary": "One-line summary for cards",
     "description": "Full problem description",
     "role": "Lead Developer",
     "tech": ["Next.js", "Go", "PostgreSQL"],
     "highlights": [
       "Key achievement or metric",
       "Architectural decision"
     ],
     "links": {
       "repo": "https://github.com/sahsisunny/...",
       "live": "https://...",
       "caseStudy": null
     },
     "images": [],
     "period": { "start": "2026-01", "end": null }
   }
   ```
3. *(Optional)* For an extended case study, create `content/projects/<slug>.mdx`.

### 2. Adding a Blog Post
1. Create a new markdown file at `content/blog/<slug>.mdx`:
   ```mdx
   ---
   title: "Your Post Title"
   slug: "your-post-title"
   date: "2026-11-07"
   summary: "Under 160 characters summary"
   tags: ["Go", "Next.js", "Architecture"]
   category: "Engineering"
   draft: false
   ---

   Your content written in standard Markdown/MDX...
   ```
2. The post will automatically appear on `/blog`, in search, in the RSS feed (`/rss.xml`), and in `sitemap.xml`.

### 3. Adding an Experience Entry
1. Open `src/data/portfolio.json`.
2. Add or update items in `experience[]`. Dates are automatically formatted with `Intl.DateTimeFormat` and sorted descending.

### 4. Adding a Motorcycle Ride
1. Open `src/data/portfolio.json`.
2. Add to `rides.rides[]`:
   ```json
   {
     "id": "patna-to-new-place",
     "slug": "patna-to-new-place",
     "title": "Patna to New Destination",
     "type": "solo",
     "origin": "Patna, Bihar",
     "destination": "New Destination",
     "year": 2026,
     "distanceKm": 1800,
     "durationDays": 7,
     "bike": "Royal Enfield Himalayan",
     "coverImage": "/images/rides/new-place/cover.jpg",
     "summary": "Summary of the route and terrain",
     "story": "Field story text...",
     "route": { "geojsonFile": null, "gpxFile": null, "waypoints": [] },
     "highlights": [],
     "dayByDay": [],
     "gallery": [],
     "videos": [],
     "lessons": [],
     "gearUsed": []
   }
   ```
3. *(Optional)* Add long-form story at `content/rides/<slug>.mdx`.

---

## 🔒 Confidentiality & Privacy Rules

1. **Employer Work:** Employer projects (like the Property Management AI Chatbot Agent) default to `visibility: "public-after-review"`. Proprietary client names, real user data, internal hostnames, and secrets are omitted.
2. **Location Privacy:** Ride photo galleries strip EXIF GPS location data before publishing. Never expose exact residential home addresses.

---

## 🚢 Deployment

The application is pre-configured for static generation and serverless API execution on **Netlify** or **Vercel**:

### Build Command:
```bash
pnpm build
```

### Output Directory:
Default Next.js output (`.next` or standalone).
