import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
  ],
  width: "device-width",
  initialScale: 1,
};

const BASE_URL = "https://sahsisunny.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Sunny Sahsi | Associate Full Stack Developer",
    template: "%s | Sunny Sahsi",
  },
  description:
    "Portfolio of Sunny Sahsi: Associate Full Stack Developer from Patna, India building high-performance web apps, Go microservices, and AI chatbot agents. Solo motorcycle explorer across India.",
  keywords: [
    "Sunny Sahsi",
    "Associate Full Stack Developer",
    "Go Developer",
    "Golang Microservices",
    "Next.js",
    "TypeScript",
    "AI Chatbot Agent",
    "Model Context Protocol",
    "MCP",
    "Zero-Trust Architecture",
    "Patna Bihar",
    "Solo Motorcycle Touring",
  ],
  authors: [{ name: "Sunny Sahsi", url: BASE_URL }],
  creator: "Sunny Sahsi",
  publisher: "Sunny Sahsi",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    title: "Sunny Sahsi | Associate Full Stack Developer",
    description:
      "Associate Full Stack Developer building production web apps, Go microservices, and AI chatbot agents. Also a solo motorcyclist exploring India.",
    siteName: "Sunny Sahsi Portfolio",
    images: [
      {
        url: "/images/og-default.svg",
        width: 1200,
        height: 630,
        alt: "Sunny Sahsi - Associate Full Stack Developer & Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunny Sahsi | Associate Full Stack Developer",
    description:
      "Associate Full Stack Developer building production web apps, Go microservices, and AI chatbot agents. Also a solo motorcyclist exploring India.",
    creator: "@sahsisunny",
    site: "@sahsisunny",
    images: ["/images/og-default.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Global WebSite & Person JSON-LD Schemas (AEO / Knowledge Graph)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Sunny Sahsi Portfolio",
  url: BASE_URL,
  description:
    "Engineering portfolio and technical writing of Sunny Sahsi, Associate Full Stack Developer.",
  author: {
    "@type": "Person",
    name: "Sunny Sahsi",
  },
  inLanguage: "en-US",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Sunny Sahsi",
  givenName: "Sunny",
  familyName: "Sahsi",
  jobTitle: "Associate Full Stack Developer",
  worksFor: {
    "@type": "Organization",
    name: "Fountane Inc.",
    url: "https://fountane.com",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Patna University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Patna",
    addressRegion: "Bihar",
    addressCountry: "IN",
  },
  url: BASE_URL,
  image: `${BASE_URL}/images/og-default.svg`,
  sameAs: [
    "https://www.linkedin.com/in/sahsisunny/",
    "https://github.com/sahsisunny",
    "https://twitter.com/sahsisunny",
    "https://peerlist.io/sahsisunny",
  ],
  knowsAbout: [
    "Go (Golang)",
    "Next.js",
    "React",
    "TypeScript",
    "AI Chatbot Agents",
    "Model Context Protocol (MCP)",
    "Zero-Trust Architecture",
    "PostgreSQL",
    "Fastify",
    "Tailwind CSS",
    "Motorcycle Touring across India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${bebasNeue.variable}`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Sunny Sahsi Articles & Notes"
          href="/rss.xml"
        />
        <link rel="author" href="/llms.txt" type="text/plain" />
        {/* Global Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased selection:bg-accent selection:text-accent-contrast">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-contrast focus:rounded-md focus:shadow-lg"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
