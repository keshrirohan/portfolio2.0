/**
 * Portfolio data — personal info, skills, projects, experience, etc.
 * Update this file to personalise the portfolio content.
 */

export const personalInfo = {
  name: "Rohan Keshri",
  title: "Software Engineer",
  tagline: "Building scalable full-stack products with React, Next.js & Node.js",
  email: "keshrirohan@example.com",
  github: "https://github.com/keshrirohan",
  linkedin: "https://linkedin.com/in/keshrirohan",
  twitter: "https://twitter.com/keshrirohan",
  location: "India",
  available: true,
} as const;

export const skills = {
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Three.js",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "GraphQL",
  ],
  database: [
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Mongoose",
  ],
  tools: [
    "Git",
    "Docker",
    "Vercel",
    "Cloudinary",
    "Figma",
    "VS Code",
  ],
} as const;

export const projects = [
  {
    id: "1",
    title: "Portfolio 2.0",
    description:
      "A futuristic, animated developer portfolio built with Next.js 15, Framer Motion, and GSAP.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion"],
    github: "https://github.com/keshrirohan/portfolio2.0",
    live: "#",
    featured: true,
  },
] as const;

export const experience = [
  {
    id: "1",
    role: "Software Engineer",
    company: "Your Company",
    duration: "2024 – Present",
    description:
      "Working on full-stack web applications using React, Next.js, and Node.js.",
    skills: ["React", "Next.js", "Node.js", "MongoDB"],
  },
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
] as const;
