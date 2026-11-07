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

export const metadata: Metadata = {
  metadataBase: new URL("https://sahsisunny.netlify.app"),
  title: {
    default: "Sunny Sahsi | Associate Full Stack Developer",
    template: "%s | Sunny Sahsi",
  },
  description:
    "Portfolio of Sunny Sahsi: Associate Full Stack Developer from Patna, India building web apps, backend services in Go and AI chatbot agents. Also a solo motorcycle rider.",
  keywords: [
    "Sunny Sahsi",
    "Associate Full Stack Developer",
    "Next.js",
    "Golang",
    "TypeScript",
    "AI chatbot agent",
    "Patna",
    "motorcycle touring",
  ],
  authors: [{ name: "Sunny Sahsi", url: "https://sahsisunny.netlify.app" }],
  creator: "Sunny Sahsi",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sahsisunny.netlify.app",
    title: "Sunny Sahsi | Associate Full Stack Developer",
    description:
      "Associate Full Stack Developer who builds web apps, Go backends and AI agents, and rides solo across India.",
    siteName: "Sunny Sahsi Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunny Sahsi | Associate Full Stack Developer",
    description:
      "Associate Full Stack Developer who builds web apps, Go backends and AI agents, and rides solo across India.",
    creator: "@sahsisunny",
  },
  robots: {
    index: true,
    follow: true,
  },
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
