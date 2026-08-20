import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CustomCursor } from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rohan Keshri — Full Stack Developer & Software Engineer",
  description:
    "Full Stack Developer focused on building performant, scalable web applications with React, Next.js, Node.js, Express, PostgreSQL, and MongoDB. 140+ LeetCode solved & 100+ day GitHub streak.",
  keywords: [
    "Rohan Keshri",
    "Full Stack Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Portfolio",
    "TypeScript",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
  ],
  authors: [{ name: "Rohan Keshri", url: "https://github.com/keshrirohan" }],
  creator: "Rohan Keshri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/keshrirohan",
    title: "Rohan Keshri — Full Stack Developer",
    description:
      "Full Stack Developer building performant web applications with React, Next.js, Node.js, and modern databases.",
    siteName: "Rohan Keshri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Keshri — Full Stack Developer",
    description:
      "Full Stack Developer building performant web applications with React, Next.js, Node.js, and modern databases.",
    creator: "@keshrirohan",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <CustomCursor />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
