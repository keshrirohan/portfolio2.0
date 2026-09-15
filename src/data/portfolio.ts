export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  techStack: string[];
  features: string[];
  achievements: string[];
  github: string;
  live: string;
  featured: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organizer: string;
  date: string;
  description: string;
  badge: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  duration: string;
  score: string;
  highlights: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export const profile = {
  name: "Rohan Keshri",
  title: "Full Stack Developer",
  role: "Full Stack Developer",
  summary:
    "Full Stack Developer with hands-on internship experience building responsive, production-grade web applications using React.js, Node.js, Express.js, PostgreSQL, and MongoDB. Strong foundation in DSA, OOP, DBMS, Operating Systems, and Computer Networks.",
  location: "Bareilly, Uttar Pradesh, India",
  relocation: "Open to Remote & Relocation",
  email: "keshrirohan214@gmail.com",
  phone: "+91 78590 82214",
  github: "https://github.com/keshrirohan",
  linkedin: "https://linkedin.com/in/rohan-keshri06/",
  leetcode: "https://leetcode.com/u/keshrirohan06/",
  portfolio: "https://rohankeshri.dev/",
  resumeUrl: "#",
  metrics: [
    { label: "LeetCode Solved", value: "140+", icon: "Code2" },
    { label: "GitHub Streak", value: "111 Days", icon: "Flame" },
    { label: "GitHub Contributions", value: "300+", icon: "GitCommit" },
    { label: "Hack LLM — IIIT Delhi", value: "Top 10", icon: "Trophy" },
    { label: "B.Tech CGPA", value: "7.9 / 10", icon: "GraduationCap" },
  ],
};

export const socialLinks = [
  { label: "GitHub", href: profile.github, icon: "Github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "Linkedin" },
  { label: "LeetCode", href: profile.leetcode, icon: "Code2" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "Mail" },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["C++", "Java", "JavaScript", "Python", "TypeScript", "SQL"],
  },
  {
    title: "Frontend",
    skills: [
      "React.js",
      "React Hooks",
      "Context API",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "WebRTC",
    ],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "Prisma ORM", "SQL"],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
      "Postman",
      "Vercel",
      "Jest",
      "GitHub Actions",
    ],
  },
  {
    title: "Core Concepts",
    skills: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Microservices",
      "CI/CD",
      "Agile Methodology",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Bio-Onn Health Care",
    role: "Web Development Intern",
    duration: "Apr 2026 – May 2026",
    location: "Remote / India",
    description:
      "Optimized website content, structure, and performance, improving usability and page load efficiency across product listing pages.",
    achievements: [
      "Enhanced SEO and metadata for product listings, driving 40,000+ weekly impressions.",
      "Diagnosed and resolved product catalog and indexing issues, increasing listing approval rates by 30%.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "SEO", "Web Performance"],
  },
  {
    id: "exp-2",
    company: "Amazing Indian Stories (AIS)",
    role: "Frontend Intern",
    duration: "Oct 2025 – Dec 2025",
    location: "Remote / India",
    description:
      "Developed and maintained responsive React.js web pages for a digital media platform, integrating REST APIs and resolving front-end issues.",
    achievements: [
      "Developed and maintained 10+ responsive React.js web pages, improving page performance by 25%.",
      "Integrated 15+ REST APIs, reducing manual data handling by 40% and streamlining frontend-backend communication.",
      "Identified and resolved 30+ website issues and maintained 99% uptime.",
    ],
    technologies: ["React.js", "REST APIs", "JavaScript", "CSS3", "Git"],
  },
  {
    id: "exp-3",
    company: "Slytherin Edu Pvt. Ltd.",
    role: "MERN Stack Intern",
    duration: "May 2024 – Jul 2024",
    location: "Remote / India",
    description:
      "Built responsive UI components for a job portal using React.js, led a team of 4–5 members, and integrated frontend screens with backend APIs.",
    achievements: [
      "Built responsive UI components for a job portal using React.js, supporting 300+ active users.",
      "Led and coordinated a team of 4–5 members, ensuring on-time delivery of new features.",
      "Conducted code reviews and maintained technical documentation.",
      "Integrated frontend screens with backend APIs, improving application responsiveness by 30%.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Git"],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "CodeSync",
    category: "Developer Tooling / Automation",
    description:
      "Syncs accepted LeetCode submissions into a GitHub repo under their original solve timestamp, so the contribution graph reflects real solve dates.",
    longDescription:
      "A Node.js/React tool with a Manifest V3 Chrome extension that captures accepted LeetCode submissions via 1-click cookie extraction, then commits them to GitHub under their original submission timestamp. Features a full React dashboard, live SSE sync terminal, MongoDB-encrypted persistence, and a comprehensive test suite.",
    techStack: [
      "Node.js",
      "React",
      "GitHub OAuth",
      "Chrome Extension",
      "Manifest V3",
      "MongoDB",
      "Server-Sent Events",
      "Jest",
    ],
    features: [
      "Sync accepted LeetCode submissions to GitHub preserving original timestamps.",
      "1-click LeetCode cookie capture via Manifest V3 Chrome extension.",
      "Live SSE sync terminal and full React dashboard.",
      "Sync history, audit log, and MongoDB encrypted persistence.",
      "Auto-sync on submission acceptance; supports 20+ programming languages.",
      "Health and status API; 55 Jest tests covering core sync logic.",
    ],
    achievements: [
      "300+ GitHub contributions reflected across the contribution graph.",
      "111-day coding streak preserved with correct historical timestamps.",
      "Supports 20+ programming languages with 55 Jest tests.",
    ],
    github: "https://github.com/keshrirohan/Code_Sync",
    live: "",
    featured: true,
  },
  {
    id: "proj-2",
    title: "EchoHire AI",
    category: "AI Mock Interview Platform",
    description:
      "Full-stack, voice-driven AI mock-interview platform running dynamic 10-question sessions powered by Groq's LLaMA 3.3 70B with Stripe subscriptions.",
    longDescription:
      "A full-stack SaaS platform that simulates realistic mock interview sessions using Groq's LLaMA 3.3 70B model. Candidates answer questions by voice (Web Speech API), receive real-time speech-to-text transcription, and get competency analytics and performance reports after each session. Stripe powers Free, Gold, and Platinum subscription tiers with server-side validation.",
    techStack: [
      "React 19",
      "Express.js 5",
      "PostgreSQL",
      "Prisma ORM",
      "Groq LLaMA 3.3 70B",
      "Stripe",
      "Web Speech API",
      "JWT Authentication",
    ],
    features: [
      "Dynamic 10-question AI-powered mock interview sessions.",
      "Voice-driven experience with real-time speech-to-text and text-to-speech.",
      "Competency analytics and detailed performance reports per session.",
      "Stripe subscription system: Free, Gold, and Platinum plans.",
      "Server-side subscription validation and JWT + httpOnly cookie auth.",
      "REST APIs with unit testing throughout.",
    ],
    achievements: [
      "Built real-time voice evaluation pipeline with sub-second inference via Groq.",
      "Implemented full SaaS billing flow with Stripe webhook validation.",
      "Designed dark-mode candidate dashboard with analytical score visualizations.",
    ],
    github: "",
    live: "https://ai-interview-6iv5.onrender.com/",
    featured: true,
  },
  {
    id: "proj-3",
    title: "AthletiQ",
    category: "Sports Event Management",
    description:
      "Full-stack sports event platform with real-time athlete tracking built on the MERN stack and MediaPipe.",
    longDescription:
      "A MERN stack sports event management system with real-time athlete tracking powered by MediaPipe. Supports 50+ concurrent events and users, athlete scheduling, and event tracking workflows. Optimized REST APIs reduced page load time by 30%.",
    techStack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "MediaPipe",
    ],
    features: [
      "Sports event management with athlete scheduling and tracking.",
      "Real-time athlete tracking powered by MediaPipe.",
      "RESTful APIs supporting 50+ concurrent events and users.",
      "Athlete-focused workflows and event tracking dashboards.",
      "Optimized API performance reducing page load time by 30%.",
    ],
    achievements: [
      "Supports 50+ concurrent events and active users.",
      "Reduced page load time by 30% through API and rendering optimizations.",
    ],
    github: "",
    live: "https://athletiqns.vercel.app/",
    featured: true,
  },
];

export const achievements: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Top 10 — Hack LLM Hackathon",
    organizer: "IIIT Delhi",
    date: "Sept 2025",
    description:
      "Ranked in the Top 10 at the Hack LLM Hackathon hosted by IIIT Delhi, building an AI solution under time constraints.",
    badge: "Hackathon Winner",
  },
  {
    id: "ach-2",
    title: "Techathon Finalist",
    organizer: "Invertis University",
    date: "2025",
    description:
      "Selected as a finalist at the Techathon competition at Invertis University, presenting an innovative technical solution.",
    badge: "Finalist",
  },
  {
    id: "ach-3",
    title: "Research Paper — ICCT-2025",
    organizer: "International Conference on Communication & Technology",
    date: "2025",
    description:
      "Presented a research paper on AI's impact on software development at ICCT-2025.",
    badge: "Research Publication",
  },
  {
    id: "ach-4",
    title: "140+ LeetCode Problems Solved",
    organizer: "LeetCode",
    date: "Ongoing",
    description:
      "Solved 140+ algorithmic challenges on LeetCode across arrays, graphs, dynamic programming, and system design topics.",
    badge: "Coding Milestone",
  },
  {
    id: "ach-5",
    title: "300+ GitHub Contributions & 111-Day Streak",
    organizer: "GitHub",
    date: "Ongoing",
    description:
      "Maintained a 111-day GitHub coding streak with 300+ total contributions since May 2023, reflecting consistent daily engineering work.",
    badge: "Open Source",
  },
];

export const education: EducationItem[] = [
  {
    id: "edu-1",
    institution: "Invertis University",
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering",
    duration: "2023 – 2027",
    score: "CGPA: 7.9 / 10",
    highlights: [
      "Core coursework in Data Structures, Algorithms, DBMS, Operating Systems, Computer Networks, and Software Engineering.",
      "Active participant in technical hackathons, coding competitions, and open-source project initiatives.",
      "Currently in Final Year — Expected Graduation 2027.",
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Python Full Stack Developer Virtual Internship",
    issuer: "EduSkills Academy",
    issueDate: "2024",
    description:
      "Completed a comprehensive virtual internship covering Python backend architecture, database integration, and full-stack web application development.",
  },
];
