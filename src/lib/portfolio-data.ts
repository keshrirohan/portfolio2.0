/**
 * Portfolio data — personal info, skills, projects, experience, etc.
 * Update this file to personalise the portfolio content.
 */

// ============================================================
// 🗂️ THIS IS THE MAIN DATA FILE FOR YOUR PORTFOLIO.
// Edit the values below to make the site your own.
// You don't need to touch any other file just to update content.
// ============================================================

// ✏️ EDIT THIS — your basic personal details shown across the site
export const personalInfo = {
  name: "Rohan Keshri",       // Your full name displayed in the hero section
  title: "Software Engineer", // Your job title shown under your name
  tagline: "Building scalable full-stack products with React, Next.js & Node.js", // One-liner about what you do
  email: "keshrirohan@example.com",                   // Used in the contact section
  github: "https://github.com/keshrirohan",           // Link to your GitHub profile
  linkedin: "https://linkedin.com/in/keshrirohan",    // Link to your LinkedIn profile
  twitter: "https://twitter.com/keshrirohan",         // Link to your Twitter/X profile
  location: "India",                                  // Where you're based
  available: true,                                    // Set to false if you're not open to new work
} as const;

// ✏️ EDIT THIS — list your technical skills, grouped by category
// Add or remove items inside each array to match your actual skills.
export const skills = {
  // Technologies you use to build what users see in the browser
  frontend: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "GSAP",
    "Three.js",
  ],
  // Technologies you use to build servers and APIs
  backend: [
    "Node.js",
    "Express.js",
    "REST APIs",
    "GraphQL",
  ],
  // Databases and data storage tools you know
  database: [
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Mongoose",
  ],
  // Other tools and software you use in your workflow
  tools: [
    "Git",
    "Docker",
    "Vercel",
    "Cloudinary",
    "Figma",
    "VS Code",
  ],
} as const;

// ✏️ EDIT THIS — your portfolio projects
// To add a new project, copy one { } block, paste it below, and update the values.
// Each field:
//   id          — a unique number string for this project (just keep incrementing: "2", "3", ...)
//   title       — the project's name
//   description — a short sentence about what the project does
//   tags        — technologies used (shown as small badges)
//   github      — link to the GitHub repo (use "#" if it's private)
//   live        — link to the live site (use "#" if not deployed yet)
//   featured    — set true to highlight this project in the featured section
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

// ✏️ EDIT THIS — your work experience / job history
// To add a new job, copy one { } block, paste it below, and update the values.
// Each field:
//   id          — a unique number string (keep incrementing: "2", "3", ...)
//   role        — your job title at that company
//   company     — the company name
//   duration    — time period you worked there (e.g. "Jan 2023 – Dec 2024")
//   description — one or two sentences about what you did there
//   skills      — technologies you used in that role (shown as badges)
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

// ✏️ EDIT THIS — the links shown in the top navigation bar
// label = the text the user sees, href = the section it scrolls to on the page.
// The "#" before each name is an "anchor link" — it jumps to that section's id on the page.
export const navLinks = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
] as const;
