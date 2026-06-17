import {
  Atom,
  Braces,
  Code2,
  Database,
  GitBranch,
  Globe2,
  Layers3,
  Mail,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";

export const profile = {
  name: "Rohan Keshri",
  headline: "Software Engineer",
  summary:
    "Full-stack developer focused on performant, scalable, recruiter-ready web products with clean architecture and polished user experience.",
  location: "India",
  email: "hello@rohankeshri.dev",
  cvUrl: "/rohan-keshri-cv.pdf",
  roles: [
    "Software Engineer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Problem Solver",
  ],
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const metrics = [
  { label: "Core stack", value: "MERN" },
  { label: "Focus", value: "SaaS" },
  { label: "Availability", value: "Open" },
];

export const techOrbit = [
  { label: "React", icon: Atom },
  { label: "Next.js", icon: Layers3 },
  { label: "TypeScript", icon: Braces },
  { label: "Node.js", icon: Server },
  { label: "MongoDB", icon: Database },
  { label: "APIs", icon: Workflow },
];

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Express",
  "MongoDB",
  "REST APIs",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "Cloudinary",
];

export const projects = [
  {
    title: "Recruiter Portfolio OS",
    category: "Full-stack Portfolio",
    description:
      "A premium portfolio platform with animated storytelling, project showcases, contact capture, and admin-ready content architecture.",
    stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind"],
    href: "#contact",
    icon: Rocket,
  },
  {
    title: "MERN Product Dashboard",
    category: "SaaS Interface",
    description:
      "A scalable dashboard concept for managing product data, analytics, and operational workflows with a clean engineering layer.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    href: "#contact",
    icon: Globe2,
  },
  {
    title: "Developer API Console",
    category: "Backend Tooling",
    description:
      "An interactive API-first experience with validation, status checks, and deploy-ready route handlers.",
    stack: ["Next API", "Zod", "MongoDB", "Cloudinary"],
    href: "/api/health",
    icon: Terminal,
  },
];

export const services = [
  {
    title: "Frontend Engineering",
    text: "Modern React and Next.js interfaces with strong UX, animation, and responsive systems.",
    icon: Code2,
  },
  {
    title: "Backend Systems",
    text: "API routes, database models, validation, authentication paths, and deployable server logic.",
    icon: Server,
  },
  {
    title: "Product Polish",
    text: "Recruiter-friendly presentation, performance-minded UI, and thoughtful interaction design.",
    icon: Sparkles,
  },
];

export const contactLinks = [
  { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  { label: "GitHub", href: "https://github.com/", icon: GitBranch },
  { label: "Portfolio", href: "#home", icon: Globe2 },
];

export const codeSnippet = [
  "const candidate = {",
  '  name: "Rohan Keshri",',
  '  role: "Software Engineer",',
  '  stack: ["React", "Next.js", "Node", "MongoDB"],',
  '  mission: "build products people remember",',
  "};",
  "",
  "export default candidate;",
];
