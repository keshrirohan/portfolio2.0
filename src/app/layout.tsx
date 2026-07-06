// "Metadata" controls info like the browser tab title and search-engine description.
// "Viewport" controls how the page scales on different screen sizes.
import type { Metadata, Viewport } from "next";

// We import two Google Fonts to use across the entire site.
import { Inter, JetBrains_Mono } from "next/font/google";

// Global CSS styles that apply to every page of the app.
import "./globals.css";

// ThemeProvider keeps track of whether the user prefers dark or light mode.
import { ThemeProvider } from "@/components/ThemeProvider";

// Navbar is the top navigation bar shown on every page.
import Navbar from "@/app/components/Navbar";

// CustomCursor replaces the default mouse cursor with a styled one.
import CustomCursor from "@/components/CustomCursor";

// PageLoader shows a loading animation while the page is first loading.
import PageLoader from "@/components/PageLoader";

// ScrollProgressBar shows a thin bar at the top that fills as the user scrolls.
import ScrollProgressBar from "@/components/ScrollProgressBar";

/* ─────────────────────────────────────────────────────
   Fonts
───────────────────────────────────────────────────── */

// Inter is a clean, modern sans-serif font — used for most of the text on the site.
// The "variable" property lets us reference this font in CSS using --font-sans.
// "subsets: latin" only loads the characters we need (avoids a huge download).
// "display: swap" shows a fallback font instantly, then swaps in Inter once loaded.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

// JetBrains Mono is a monospace font designed for code — used for code snippets.
// "preload: false" means we don't fetch it until it's actually needed.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

/* ─────────────────────────────────────────────────────
   Viewport
───────────────────────────────────────────────────── */

// The viewport setting controls how the site looks on phones and tablets.
// "width: device-width" makes the page fit the screen instead of zooming out.
// "initialScale: 1" starts at normal zoom — not zoomed in or out.
// "maximumScale: 5" lets the user zoom in up to 5× for accessibility.
// "themeColor" sets the browser chrome color on mobile (the bar at the very top of the phone screen).
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)",  color: "#000000" }, // Dark mode → black chrome bar
    { media: "(prefers-color-scheme: light)", color: "#fafafa" }, // Light mode → off-white chrome bar
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ─────────────────────────────────────────────────────
   Metadata / SEO
───────────────────────────────────────────────────── */

// The live URL of the portfolio — used as a base for all absolute links below.
const BASE_URL = "https://keshrirohan.vercel.app";

// "metadata" is a Next.js feature that automatically inserts <meta> tags in the <head>.
// These tags tell search engines (Google, Bing) and social platforms (LinkedIn, Twitter)
// what this page is about, helping people find the site and making link previews look good.
export const metadata: Metadata = {
  // "metadataBase" is the root URL — relative image paths are resolved against this.
  metadataBase: new URL(BASE_URL),

  // "title.default" is the browser tab name when no page-specific title is set.
  // "title.template" adds " | Rohan Keshri" to the end of any sub-page title.
  title: {
    default: "Rohan Keshri | Full Stack Developer & Software Engineer",
    template: "%s | Rohan Keshri",
  },

  // The description that appears under the link in Google search results.
  description:
    "Rohan Keshri is a Full Stack Developer & Software Engineer specialising in React, Next.js, TypeScript, Node.js, and MongoDB. View my portfolio, projects, and experience.",

  // Keywords help search engines understand the main topics of the page.
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

  // Author info — tells Google who wrote the content.
  authors: [{ name: "Rohan Keshri", url: BASE_URL }],
  creator: "Rohan Keshri",
  publisher: "Rohan Keshri",
  category: "Technology",
  applicationName: "Rohan Keshri Portfolio",
  generator: "Next.js",

  /* Open Graph */
  // Open Graph tags control how the page looks when shared on social media
  // (e.g. the card that appears when you paste the link into LinkedIn or WhatsApp).
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
        // The preview image shown in the social media card.
        url: `${BASE_URL}/og-image.png`,
        width: 1200,  // Standard recommended width for OG images
        height: 630,  // Standard recommended height for OG images
        alt: "Rohan Keshri — Full Stack Developer Portfolio",
      },
    ],
  },

  /* Twitter / X */
  // Twitter-specific card settings — controls the preview when the link is shared on X/Twitter.
  twitter: {
    card: "summary_large_image", // Shows a big image preview instead of a small thumbnail
    site: "@keshrirohan",
    creator: "@keshrirohan",
    title: "Rohan Keshri | Full Stack Developer",
    description:
      "Full Stack Developer specialising in React, Next.js, TypeScript, and Node.js.",
    images: [`${BASE_URL}/og-image.png`],
  },

  /* Robots */
  // Tells search engine crawlers whether they are allowed to index this page
  // and follow the links on it. Setting these to "true" means "yes, please index me".
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,   // -1 means "no limit" on video preview length
      "max-image-preview": "large", // Show full-size image previews in results
      "max-snippet": -1,         // -1 means "no limit" on text snippet length
    },
  },

  /* Canonical */
  // The canonical URL tells Google: "this is the official URL for this page".
  // It prevents duplicate-content penalties if the page is accessible via multiple URLs.
  alternates: {
    canonical: BASE_URL,
  },

  /* Verification (add your Search Console token here) */
  // This token proves to Google Search Console that you own this website.
  verification: {
    google: "your-google-site-verification-token",
  },

  /* Icons */
  // The small icon shown in the browser tab and when the site is saved to a home screen.
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Used when someone adds the site to their iPhone home screen
  },
};

/* ─────────────────────────────────────────────────────
   Root Layout
───────────────────────────────────────────────────── */

// RootLayout is a special Next.js component that wraps EVERY page in the app.
// Whatever you put here (Navbar, fonts, providers) will appear on all pages.
// "children" is a placeholder — Next.js fills it in with whichever page is being visited.
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // lang="en" tells browsers and screen readers the page is in English.
    // data-theme="dark" sets dark mode as the default before JavaScript runs.
    // The font class names attach our chosen fonts to the whole document.
    // suppressHydrationWarning stops a noisy warning caused by the theme script below.
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent theme flash — runs before React hydrates */}
        {/* This tiny inline script runs IMMEDIATELY when the page loads (before any CSS or React).
            It reads the user's saved theme from localStorage and applies it right away,
            so there's no flicker between dark and light mode on page load. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />

        {/* Structured data — Person schema */}
        {/* This JSON-LD block gives Google structured information about who owns this site.
            Google uses it to show a "Knowledge Panel" in search results (the info box on the right).
            It's invisible to visitors but very useful for SEO. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",  // Tells Google we're using the Schema.org vocabulary
              "@type": "Person",                 // We're describing a person (not a company or product)
              name: "Rohan Keshri",
              url: BASE_URL,
              jobTitle: "Full Stack Developer",
              description:
                "Full Stack Developer specialising in React, Next.js, TypeScript, and Node.js.",
              // "sameAs" links to other profiles so Google knows they all belong to the same person.
              sameAs: [
                "https://github.com/keshrirohan",
                "https://linkedin.com/in/keshrirohan",
              ],
              // Topics this person is knowledgeable about — helps Google categorise the profile.
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

      {/* "antialiased" makes text edges smoother on most screens.
          "min-h-screen" ensures the body is at least as tall as the viewport.
          "overflow-x-hidden" hides any accidental horizontal scrollbar. */}
      <body
        className="antialiased min-h-screen overflow-x-hidden"
        style={{
          backgroundColor: "var(--color-bg)", // Background color comes from our CSS theme variables
          color: "var(--color-fg)",           // Text color also comes from CSS theme variables
        }}
      >
        {/* ThemeProvider watches for theme changes (dark ↔ light) and updates the page accordingly. */}
        <ThemeProvider>
          {/* Accessibility: skip to main content */}
          {/* A hidden link that lets keyboard users jump past the Navbar straight to the content. */}
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          {/* Global UI layer */}

          {/* Shows a custom animated cursor that follows the mouse pointer. */}
          <CustomCursor />

          {/* Shows a full-screen loading animation when the site first opens. */}
          <PageLoader />

          {/* A thin progress bar at the top of the screen that fills as you scroll down. */}
          <ScrollProgressBar />

          {/* The navigation bar fixed at the top of every page. */}
          <Navbar />

          {/* Page content — pt-16 offsets the 54-68px fixed navbar */}
          {/* "pt-[68px]" adds top padding so content isn't hidden behind the fixed Navbar. */}
          {/* "tabIndex={-1}" lets the skip-link focus this element without showing an outline. */}
          <main
            id="main-content"
            tabIndex={-1}
            className="outline-none pt-[68px]"
          >
            {/* The actual page content (e.g. Home, About) is injected here by Next.js */}
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
