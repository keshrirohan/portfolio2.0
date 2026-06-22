import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rohan Keshri | Software Engineer",
    template: "%s | Rohan Keshri",
  },
  description:
    "Premium full-stack portfolio for Rohan Keshri — Software Engineer, Full Stack Developer, MERN Stack Developer, React & Next.js Developer.",
  keywords: [
    "Rohan Keshri",
    "Software Engineer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Portfolio",
  ],
  authors: [{ name: "Rohan Keshri" }],
  creator: "Rohan Keshri",
  openGraph: {
    title: "Rohan Keshri | Software Engineer",
    description:
      "A futuristic portfolio built for recruiters, hiring managers, startups, and software engineering opportunities.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rohan Keshri | Software Engineer",
    description:
      "Full-stack developer focused on React, Next.js, TypeScript, Node.js, and MongoDB.",
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
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-black text-white antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
