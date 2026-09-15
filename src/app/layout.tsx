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
  title: "Rohan Keshri — Full Stack Developer",
  description:
    "Full Stack Developer building practical web applications, AI products, and developer tools. Experienced with React.js, Node.js, Express.js, PostgreSQL, MongoDB, and TypeScript. Based in Bareilly, India.",
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
    "AI Developer",
    "Developer Tools",
    "Chrome Extension",
    "Bareilly",
    "India",
  ],
  authors: [{ name: "Rohan Keshri", url: "https://rohankeshri.dev/" }],
  creator: "Rohan Keshri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rohankeshri.dev/",
    title: "Rohan Keshri — Full Stack Developer",
    description:
      "Full Stack Developer building practical web applications, AI products, and developer tools using React, Node.js, Express, PostgreSQL, and MongoDB.",
    siteName: "Rohan Keshri Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Keshri — Full Stack Developer",
    description:
      "Full Stack Developer building practical web applications, AI products, and developer tools.",
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
      <body className="min-h-screen bg-background text-foreground antialiased font-sans overflow-x-hidden selection:bg-primary/20 selection:text-primary relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="dark"
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
