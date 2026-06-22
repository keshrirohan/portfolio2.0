import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/app/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import ScrollProgressBar from "@/components/ScrollProgressBar";

/* ─────────────────────────────────────────────────────
   Fonts
───────────────────────────────────────────────────── */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

/* ─────────────────────────────────────────────────────
   Viewport
───────────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ─────────────────────────────────────────────────────
   Metadata / SEO
───────────────────────────────────────────────────── */
const BASE_URL = "https://keshrirohan.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Rohan Keshri | Full Stack Developer & Software Engineer",
    template: "%s | Rohan Keshri",
  },
  description:
    "Rohan Keshri is a Full Stack Developer & Software Engineer specialising in React, Next.js, TypeScript, Node.js, and MongoDB. View my portfolio, projects, and experience.",
  keywords: [
    "Rohan Keshri",
    "Full Stack Developer",
    "Software Engineer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Node.js Developer",
    "MongoDB Developer",
    "Portfolio",
    "Web Developer India",
  ],
  authors: [{ name: "Rohan Keshri", url: BASE_URL }],
  creator: "Rohan Keshri",
  publisher: "Rohan Keshri",
  category: "Technology",
  applicationName: "Rohan Keshri Portfolio",
  generator: "Next.js",

  /* Open Graph */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Rohan Keshri Portfolio",
    title: "Rohan Keshri | Full Stack Developer & Software Engineer",
    description:
      "Premium portfolio of Rohan Keshri — Full Stack Developer crafting scalable web apps with React, Next.js, and Node.js.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Rohan Keshri — Full Stack Developer Portfolio",
      },
    ],
  },

  /* Twitter / X */
  twitter: {
    card: "summary_large_image",
    site: "@keshrirohan",
    creator: "@keshrirohan",
    title: "Rohan Keshri | Full Stack Developer",
    description:
      "Full Stack Developer specialising in React, Next.js, TypeScript, and Node.js.",
    images: [`${BASE_URL}/og-image.png`],
  },

  /* Robots */
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

  /* Canonical */
  alternates: {
    canonical: BASE_URL,
  },

  /* Verification (add your Search Console token here) */
  verification: {
    google: "your-google-site-verification-token",
  },

  /* Icons */
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

/* ─────────────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Structured data — Person schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rohan Keshri",
              url: BASE_URL,
              jobTitle: "Full Stack Developer",
              description:
                "Full Stack Developer specialising in React, Next.js, TypeScript, and Node.js.",
              sameAs: [
                "https://github.com/keshrirohan",
                "https://linkedin.com/in/keshrirohan",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "Full Stack Development",
              ],
            }),
          }}
        />
      </head>
      <body className="bg-black text-white antialiased min-h-screen overflow-x-hidden">
        <ThemeProvider>
          {/* Accessibility: skip to main content */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Global UI layer */}
          <CustomCursor />
          <PageLoader />
          <ScrollProgressBar />
          <Navbar />

          {/* Page content */}
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
