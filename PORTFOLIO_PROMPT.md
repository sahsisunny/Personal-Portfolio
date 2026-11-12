# Portfolio Build Prompt: Sunny Sahsi

> **How to use:** Put `portfolio-data.json` at `src/data/portfolio.json` in an empty folder, open it in Cursor / Antigravity / Claude Code, and paste this whole file as the first message. Then work through the phase prompts in section 16 one at a time. Review each phase before moving on.

---

## 1. Goal

Build a personal portfolio website for **Sunny Sahsi**, an **Associate Full Stack Developer** (recently promoted from Junior) based in India, working remotely at Fountane with **Next.js and Go**. He is also building an **AI chatbot agent** and uses **Claude, Cursor and Antigravity** in his workflow.

The site has two personalities in one codebase:

1. **The professional site** (`/`, `/projects`, `/blog`): recruiter-friendly, fast, clean, and technical.
2. **The Rides site** (`/rides`): a *totally separate page* with its own layout, palette and mood, about his solo motorcycle trips from **Patna to Ladakh** and **Patna to Rameshwaram**.

All content comes from `src/data/portfolio.json` (projects, experience, rides) and MDX files (blog). Adding content must never require editing components.

**Success looks like:** a recruiter understands who Sunny is and what he has built within 10 seconds, and a visitor on the Rides page feels the road.

---

## 2. Audience and positioning

| Audience | What they need | Where they get it |
|---|---|---|
| Recruiters / hiring managers | Role, stack, proof of impact, resume, contact | Hero, Experience, Featured Projects, Resume |
| Engineers / collaborators | Depth: case studies, writing, open source | Project pages, Blog, GitHub links |
| Riders / travel audience | Routes, stories, photos, video | `/rides` |

**Positioning line:** "Associate Full Stack Developer who builds web apps, Go backends and AI agents, and rides solo across India."

Tone: confident, plain-spoken, specific. No buzzword soup, no "passionate about leveraging synergies". Show, don't claim.

---

## 3. Tech stack (use these unless there is a strong reason not to)

- **Next.js (latest stable, App Router) + TypeScript (strict)**: matches Sunny's daily stack.
- **Tailwind CSS** with CSS variables for design tokens.
- **next-themes** for dark/light/system mode.
- **motion (Framer Motion)** for animation, with `prefers-reduced-motion` respected everywhere.
- **MDX** for blog posts (`next-mdx-remote` or native Next MDX), **rehype-pretty-code / Shiki** for code blocks, `gray-matter` for frontmatter.
- **zod** to validate `portfolio.json` at build time (fail the build with a readable error if data is invalid).
- **lucide-react** for icons.
- **React-Leaflet + OpenStreetMap** for the ride route map (free, no API key). Switch tile style in dark mode.
- **yet-another-react-lightbox** (or similar) for ride galleries.
- `next/image` for every image; `next/font` for fonts (self-hosted, no layout shift).
- Deploy target: **Netlify or Vercel**. Keep the site statically generated wherever possible.
- Package manager: `pnpm`. Add ESLint, Prettier, and a pre-commit hook.

---

## 4. Information architecture

| Route | Purpose | Notes |
|---|---|---|
| `/` | Home (single scroll): Hero, About, Experience, Skills, Featured Projects, Latest Writing, Rides teaser, Contact | Sections are anchor-linked |
| `/projects` | All projects with filters | Filter by tech and status |
| `/projects/[slug]` | Case study | Template in section 8.3 |
| `/blog` | Post list | Tags, search, pagination |
| `/blog/[slug]` | Post | TOC, reading time, code highlighting |
| `/rides` | **Separate rides microsite landing** | Own layout and theme |
| `/rides/[slug]` | One ride's full story | Map, timeline, gallery, video |
| `/resume` | Print-friendly resume page + PDF download | Reads the same JSON |
| `/uses` *(optional)* | Tools and setup | Reads `tools` in JSON |
| `/now` *(optional)* | What he's doing now | Reads `now` in JSON |
| `/404` | Themed not-found page | Link home and to Rides |

**Navigation:** top bar with logo/name, Home sections, Projects, Blog, a **highlighted "Rides" link** (with a small "Off the clock" badge), a theme toggle, and a "Resume" button. On mobile: a full-screen menu opened by a hamburger, large tap targets.

**Rides is a route group** (`app/(rides)/rides/...`) with its **own root layout** so it can have a different navbar, footer, fonts and palette. It should have a small "← Back to developer site" link and the main site should link into it prominently.

---

## 5. Design direction (global)

**Personality:** modern, calm, slightly technical. Think "clean engineering notebook" rather than "flashy template". Generous whitespace, strong typography, subtle motion.

### 5.1 Design tokens (CSS variables)

Professional site:

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#FAFAF9` | `#0B0F17` |
| `--surface` | `#FFFFFF` | `#111827` |
| `--surface-2` | `#F1F5F9` | `#172033` |
| `--text` | `#0F172A` | `#E5E7EB` |
| `--muted` | `#475569` | `#94A3B8` |
| `--border` | `#E2E8F0` | `#1F2937` |
| `--accent` | `#4F46E5` | `#818CF8` |
| `--accent-contrast` | `#FFFFFF` | `#0B0F17` |
| `--success` | `#15803D` | `#4ADE80` |

Rides site (different mood):

| Token | Light ("sand") | Dark ("asphalt") |
|---|---|---|
| `--bg` | `#FBF7F0` | `#0A0A0B` |
| `--surface` | `#FFFFFF` | `#151517` |
| `--text` | `#1C1917` | `#F5F5F4` |
| `--muted` | `#57534E` | `#A8A29E` |
| `--accent` | `#C2410C` (burnt orange) | `#FB923C` |
| `--accent-2` | `#0E7490` (glacier blue) | `#22D3EE` |

All text/background pairs must meet **WCAG AA** (4.5:1 for body text). Verify with a contrast checker, don't assume.

### 5.2 Typography

- Professional site: **Inter** (body/headings) + **JetBrains Mono** (code, labels, small caps tags).
- Rides site: a bold condensed display font (**Bebas Neue** or **Anton**) for hero text and big numbers, **Inter** for body.
- Fluid type scale using `clamp()`. Body 16-18px, line-height 1.6, max line length ~70 characters.

### 5.3 Shape, spacing, depth

- 8px spacing grid. Container max width 1120px (blog text 720px).
- Radius: 12px cards, 999px pills.
- Borders over heavy shadows; one soft shadow level for hover.

### 5.4 Motion

- Section reveals: fade + 12px rise, 300-450ms, staggered children.
- Hover: cards lift 2px with border-color change.
- Page transitions: subtle (View Transitions API if supported).
- **Everything respects `prefers-reduced-motion`**: no parallax, no autoplay, instant transitions.

### 5.5 Imagery

- All images via `next/image` with explicit `width`/`height` or `fill` + `sizes`, blur placeholders, and meaningful `alt` text.
- Project cards use a 16:9 cover. Provide a gradient + icon fallback when `images` is empty so the site never looks broken.

---

## 6. Dark / light mode spec

- Three states: **Light, Dark, System** (default System). The toggle cycles or opens a small menu; announce the state to screen readers.
- Use `next-themes` with `attribute="class"` and `suppressHydrationWarning` on `<html>` so there is **no flash of wrong theme**.
- Tailwind `darkMode: "class"`; all colors come from CSS variables, never hard-coded hex in components.
- Persist choice in `localStorage` (inside try/catch).
- The Rides site shares the same toggle and preference but uses its own token set.
- Images: provide `dark:` variants only where needed (logos). Make sure transparent logos remain visible in both modes (use `invert` or separate files).
- Code blocks: dual Shiki themes (light + dark) switched by CSS.
- Map tiles: light tiles in light mode, dark tiles in dark mode.
- `color-scheme` meta and CSS property set per theme so form controls and scrollbars match.

---

## 7. Responsive spec

Mobile-first. Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`.

| Area | Mobile (<640) | Tablet (768) | Desktop (1024+) |
|---|---|---|---|
| Nav | Hamburger, full-screen menu | Hamburger or compact bar | Full bar, sticky, blur backdrop |
| Hero | Stacked, avatar above text, CTAs full width | Two columns | Two columns, large type |
| Experience | Vertical timeline, one column | Same | Timeline with company logo column |
| Projects grid | 1 column | 2 columns | 3 columns (featured: 2-up large) |
| Blog list | 1 column cards | 1-2 columns | List with sidebar (tags) |
| Rides gallery | 2-column masonry | 3 columns | 4 columns masonry |
| Ride map | Full width, 60vh, scroll-safe | 70vh | Split view: map left, timeline right |

Rules: tap targets at least 44x44px, no horizontal scroll at 320px width, test at 320, 375, 768, 1024, 1440. Respect device safe areas (`env(safe-area-inset-*)`). Tables and code scroll inside their own container.

---

## 8. Page specs (professional site)

### 8.1 Home sections (in order)

1. **Hero**: name, headline from `person.headline`, tagline, availability pill, CTAs (View projects, Download resume, Contact), social icons, avatar. Subtle animated background (grid or gradient), static when reduced motion is on.
2. **About**: `person.longBio` (3 short paragraphs), small stat row from `stats.items`, location and work mode.
3. **Experience**: timeline from `experience[]`. Fountane shows both roles (Associate, then Junior) with a visible **"Promoted"** marker. Expand/collapse highlights. Tech chips per entry.
4. **Skills**: grouped from `skills.groups` with level indicators (daily / comfortable / learning shown as subtle chips, not fake percentage bars). A "Currently learning" row from `skills.currentlyLearning`.
5. **Featured projects**: projects where `featured: true`, large cards: cover, title, summary, tech chips, status badge (In progress / Completed), links.
6. **Latest writing**: 3 newest posts. Hide the section if there are no posts yet.
7. **Rides teaser**: a visually *different* full-bleed band (rides palette, big photo, 2-3 stats, "Explore the rides" CTA). This signals the separate world behind `/rides`.
8. **Contact**: email (with copy button), social links, optional form from `contact.form`.
9. **Footer**: socials, "Built with Next.js", last updated date.

### 8.2 Projects list

Filter chips (tech, status), search, sort (featured first, then newest). Cards show cover, title, one-line summary, tech chips, status badge. Projects with `visibility: "public-after-review"` render a small "Work project: details limited" label and **no screenshots** until `visibility` is changed to `public`.

### 8.3 Case-study template (`/projects/[slug]`)

Hero (title, summary, role, period, tech, links) then: **Problem, Approach, Architecture (diagram or bullet flow), Key decisions and trade-offs, Challenges, Outcome / what I'd do next**. Pull from `description` and `highlights`; allow an optional MDX file at `content/projects/<slug>.mdx` to extend it. Prev/next project navigation.

### 8.4 Blog

See section 11.

### 8.5 Resume

`/resume` renders experience, skills, education, projects from JSON in a clean one-column layout with a print stylesheet (A4, no nav, black text). "Download PDF" links to `person.resumeLocalPath` or `person.resumeUrl`.

### 8.6 Contact

Copy-email button with toast feedback. If the form is enabled: name, email, message, honeypot field, rate limiting, server-side validation (zod), sends via Resend or Formspree. Clear success and error states. Never expose API keys to the client.

---

## 9. The Rides site (`/rides`): separate page, separate feel

**Concept:** an adventure journal. Warm, cinematic, photo-first. It should feel like a different website that happens to share the same author.

### 9.1 Landing (`/rides`)

- **Hero:** full-viewport cover image or muted looping video (poster fallback, no autoplay on reduced-motion or data-saver), large display headline (`rides.page.title`), eyebrow, tagline, scroll cue.
- **Stats strip:** animated counters from `rides.stats` (total km, rides, states crossed, highest point). **Hide any stat that is `null`** rather than showing 0.
- **Ride cards:** one large card per ride (cover, route "Patna → Ladakh", year, distance, duration, "Read the story").
- **India route map:** a map showing all routes from Patna fanning out (Ladakh in the north, Rameshwaram in the south) drawn from route GeoJSON. Fallback: straight lines between origin and destination if no GPX yet.
- **Gear and bike:** from `rides.gear` (bike, riding gear, camera, mic). Hide if empty.
- **Follow along:** Instagram and YouTube buttons from `socials` (hide if null).
- **Back link** to the developer site and a theme toggle.

### 9.2 Ride detail (`/rides/[slug]`)

1. Cover hero with title, route, year, key facts (distance, days, bike).
2. **Story:** long-form MDX at `content/rides/<slug>.mdx`, falling back to `story` in JSON.
3. **Interactive route map:** polyline from GeoJSON, waypoint markers with popups (name, day, note), fit-to-bounds, dark/light tiles. Optional elevation profile if GPX has elevation.
4. **Day-by-day timeline** from `dayByDay` (day number, start to end, distance, one-line note, photo).
5. **Gallery:** masonry grid, lazy loaded, lightbox with captions and keyboard navigation.
6. **Videos:** YouTube embeds loaded **on click** (use a thumbnail facade, no iframe until clicked).
7. **Lessons learned** and **gear used** lists.
8. Next/previous ride navigation.

### 9.3 Rides content rules

- Do not invent distances, dates or places. Render only what is filled in; hide empty sections gracefully.
- Show a friendly "Story coming soon" state for rides whose `story` is empty.
- Safety tone: ride stories may mention precautions, but never encourage risky riding.

---

## 10. Data layer and content workflow

### 10.1 Rules

- `src/data/portfolio.json` is the single source of truth. Ignore keys starting with `_`.
- Validate with **zod** in `src/lib/data.ts`; export typed getters (`getProjects()`, `getFeaturedProjects()`, `getRides()`, etc.).
- Components receive typed props, they never import the JSON directly.
- Sort experience by `start` descending. Format dates with `Intl.DateTimeFormat`; render "Present" when `end` is `null`.

### 10.2 Core types (starting point)

```ts
type Status = "completed" | "in-progress" | "work-in-progress";
type Visibility = "public" | "public-after-review" | "private";

interface Project {
  id: string; slug: string; title: string; status: Status; featured: boolean;
  visibility: Visibility; summary: string; description: string; role: string;
  tech: string[]; highlights: string[];
  links: { repo: string | null; live: string | null; caseStudy: string | null };
  images: { src: string; alt: string; width: number; height: number }[];
  period: { start: string | null; end: string | null };
}

interface Ride {
  id: string; slug: string; title: string; type: "solo" | "group";
  origin: string; destination: string; year: number | null;
  durationDays: number | null; distanceKm: number | null; bike: string | null;
  coverImage: string; summary: string; story: string;
  route: { geojsonFile: string | null; gpxFile: string | null;
           waypoints: { name: string; lat: number; lng: number; day?: number; note?: string }[] };
  dayByDay: { day: number; from: string; to: string; km?: number; note?: string; photo?: string }[];
  gallery: { src: string; alt: string; caption?: string; width: number; height: number }[];
  videos: { provider: "youtube"; id: string; title: string }[];
  highlights: string[]; lessons: string[]; gearUsed: string[];
}
```

### 10.3 "How do I add...?" (put this in `README.md`)

- **A project:** add an object to `projects[]`, drop images in `public/images/projects/<slug>/`.
- **An experience entry:** add to `experience[]`.
- **A blog post:** create `content/blog/<slug>.mdx` with frontmatter.
- **A ride:** add to `rides.rides[]`, put photos in `public/images/rides/<slug>/`, route file in `public/routes/<slug>.geojson`, optional story in `content/rides/<slug>.mdx`.

---

## 11. Blog system

- MDX in `content/blog/*.mdx` with frontmatter: `title, slug, date, updated?, summary, tags[], category, cover?, draft`.
- Drafts hidden in production, visible in dev with a "Draft" badge.
- Features: reading time, table of contents (sticky on desktop), heading anchor links, syntax highlighting with copy button, callout components (`<Note>`, `<Warning>`), image captions, previous/next post, related posts by tag, tag pages, simple client-side search.
- **RSS feed** (`/rss.xml`), sitemap entries, per-post OG image (generated with `next/og`).
- Include 1 sample post so the template can be tested. Seed ideas live in `blog.postIdeas` in the JSON.
- Optional: comments via Giscus (GitHub Discussions), off by default.

---

## 12. SEO, performance, accessibility, security

**SEO:** `generateMetadata` per page, canonical URLs, OpenGraph + Twitter cards, `sitemap.xml`, `robots.txt`, **JSON-LD** `Person` schema from `seo.jsonLd` and `Article` schema on posts. Meaningful titles like "Patna to Ladakh | Rides | Sunny Sahsi".

**Performance targets:** Lighthouse 95+ on all four categories on mobile; LCP under 2.5s, CLS under 0.05, INP under 200ms. Techniques: static generation, `next/image`, font preloading, lazy-load maps/lightbox/video, dynamic import for Leaflet (client only), no layout shift from images, minimal client JS on content pages.

**Accessibility:** semantic landmarks, skip-to-content link, visible focus rings, keyboard-operable menu/lightbox/map controls, `aria-current` on active nav, alt text on every image, no information conveyed by color alone, reduced-motion support, form labels and error messages tied to inputs.

**Security / privacy:** security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`), no secrets in client bundles, contact form rate limited, strip EXIF GPS data from public ride photos, do not publish exact live location or home address. Cookie-free privacy-friendly analytics only (Plausible or Umami), optional.

---

## 13. Extra features (my recommendations)

**Must have**
- Update the title everywhere to **Associate Full Stack Developer**, with a visible promotion marker on Fountane.
- Featured **AI chatbot agent** case study (generic, no client data).
- Real **PR links** under Open Source: they are proof.
- Printable resume page generated from the same JSON.

**Should have**
- **Command palette (⌘K / Ctrl+K)** to jump to any page, project, post or ride.
- **"Now" block** on Home (from `now`): what he's working on this month.
- **GitHub activity** widget (recent repos or contribution graph), reusing his Gitrackr experience.
- **Copy-email** and "Add to contacts" (vCard) buttons.
- **Scroll progress bar** and "back to top".
- **Ride route animation**: the polyline draws itself on scroll (disabled on reduced-motion).
- **Testimonials** section (hidden until `testimonials[]` has items). Ask teammates for 2-3 short LinkedIn recommendations.

**Stretch**
- **"Ask Sunny's AI" chat widget** answering questions about his work using only `portfolio.json` (a natural showcase of his agent work; guard against prompt injection and keep it rate limited).
- Hindi/English toggle for the rides story.
- Ride "live tracker" for future trips (opt-in, delayed by several hours for safety).
- Newsletter signup (Buttondown) for rides and engineering notes.

---

## 14. Content and confidentiality rules

1. **Never invent facts or metrics.** Missing data stays hidden or shows a tasteful placeholder, never fake numbers.
2. **Employer work is confidential by default.** Use generic names ("a property management system"), no customer names, no real data in screenshots, no internal endpoints or secrets. Items with `visibility: "public-after-review"` need Sunny's explicit confirmation before going public.
3. Credit tools honestly: AI-assisted work is described as AI-assisted, with Sunny as the engineer who reviews and owns the result.
4. Photos: use only photos Sunny owns or has rights to. Remove location EXIF before publishing.
5. Write case studies in first person, short sentences, specific outcomes.

---

## 15. Suggested folder structure

```
src/
  app/
    (site)/            # professional site layout
      page.tsx
      projects/[slug]/page.tsx
      blog/[slug]/page.tsx
      resume/page.tsx
    (rides)/           # separate rides layout + theme
      rides/page.tsx
      rides/[slug]/page.tsx
    api/contact/route.ts
    sitemap.ts  robots.ts  rss.xml/route.ts
  components/
    ui/  layout/  home/  projects/  blog/  rides/
  data/portfolio.json
  lib/ data.ts  schema.ts  mdx.ts  utils.ts
  styles/ globals.css  tokens-site.css  tokens-rides.css
content/ blog/  rides/  projects/
public/ images/  routes/  og/  resume.pdf
```

---

## 16. Phased build plan (paste one phase at a time)

**Phase 1: Foundation**
> Scaffold Next.js + TypeScript + Tailwind with pnpm. Add next-themes, fonts, the two token sets from section 5.1 as CSS variables, the `(site)` and `(rides)` route groups with separate layouts, ESLint/Prettier. Build the theme toggle (light/dark/system, no flash). Acceptance: both layouts render, theme persists, no hydration warnings.

**Phase 2: Data layer**
> Add `src/data/portfolio.json`, a zod schema, typed getters, and a build-time validation that prints readable errors. Add `content/` loaders for MDX. Acceptance: invalid JSON fails the build with a clear message; getters are fully typed.

**Phase 3: Home page**
> Build the Home sections in section 8.1 using the data getters: sticky nav, hero, about, experience timeline, skills, featured projects, rides teaser band, contact, footer. Mobile first. Acceptance: matches section 7 at 320/768/1440, passes axe checks, no layout shift.

**Phase 4: Projects**
> Build `/projects` (filters, search) and `/projects/[slug]` using the case-study template. Include the visibility rules. Acceptance: a project with no images still looks good; `public-after-review` projects show no screenshots.

**Phase 5: Blog**
> Implement the MDX blog from section 11 with one sample post, tags, TOC, RSS and OG images. Acceptance: drafts hidden in production; RSS validates.

**Phase 6: Rides**
> Build `/rides` and `/rides/[slug]` per section 9: hero, stats (hide nulls), ride cards, India route map, detail page with map, timeline, masonry gallery with lightbox, click-to-load YouTube. Use sample placeholder data so every component can be seen. Acceptance: distinct look from the main site, works in both themes, map loads client-only, empty sections hidden.

**Phase 7: Polish**
> Add command palette, "Now" block, resume page with print CSS, SEO (metadata, sitemap, JSON-LD), security headers, 404 page, animations with reduced-motion support. Acceptance: Lighthouse 95+ on mobile for Home, a project, a post and a ride.

**Phase 8: Ship**
> Write `README.md` (including the "How do I add...?" guide), set up deployment (Netlify or Vercel), configure the domain and OG images, run a final accessibility and link check. Acceptance: production build passes, all links resolve.

---

## 17. Definition of done

- [ ] Works and looks right at 320px, 768px and 1440px, in light and dark mode
- [ ] No layout shift, no flash of wrong theme, no console errors
- [ ] Lighthouse 95+ (mobile) on Home, Project, Post, Ride
- [ ] Keyboard-only navigation works everywhere, including the menu, command palette, lightbox and map
- [ ] All images have alt text; reduced-motion is respected
- [ ] Adding a project, post or ride requires only data/content changes
- [ ] No confidential employer details, no EXIF location data, no secrets in the repo
- [ ] README explains setup and content workflows

---

## 18. What Sunny still needs to provide

1. A good portrait photo (square, high resolution) and an OG image
2. Exact promotion month for the Associate role
3. Project screenshots or short screen recordings, plus final names and stacks for the family tracker app
4. Written permission or guidance from Fountane on what can be shown about the AI chatbot agent
5. For each ride: year, dates, total km, days, bike model, route file (GPX) or a list of main stops, 15-30 best photos, and any YouTube video links
6. Instagram and YouTube handles
7. Updated resume PDF with the new title
8. PR links for Real Dev Squad contributions
9. 2-3 testimonials (optional but valuable)
10. Your LinkedIn About text, so the bio matches your public profile

---

## 19. Research notes (what was found online)

- **Current portfolio** (`sunnysahsi.com`): still says *Junior Full Stack Developer*, lists skills like HTML, JS, TS, Node, Express, MongoDB, React, Tailwind, Next.js and React Query. It does **not** yet mention Go, AI work, the promotion, the newer projects or the Rides content. The new data file fixes these gaps.
- **Existing sections:** Experience (Fountane, Real Dev Squad, SmartInternz), Projects (Linktree clone, Gitrackr, Personal Portfolio), Education (BCA, Patna University, 8.36 CGPA), Open Source page.
- **Links used:** LinkedIn `sahsisunny`, GitHub `sahsisunny`, X `@sahsisunny`, a resume link on Google Drive, email on the portfolio.
- **Not accessible:** LinkedIn page content and X posts could not be read from outside. A Peerlist resume page shows an outdated title and should be updated or ignored.
- **Other "Sunny" profiles** that appear in search results (Sharma, Gupta, Kumar, etc.) belong to different people and were **not** used.
