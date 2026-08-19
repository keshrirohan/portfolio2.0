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
  role: "Software Engineer",
  summary:
    "Full Stack Developer focused on building performant, scalable, and recruiter-ready web applications using React, Next.js, Node.js, Express, PostgreSQL, and MongoDB. Demonstrated expertise in creating automated developer tooling, AI-assisted voice platforms, and computer vision software.",
  location: "India",
  relocation: "Open to Remote & Relocation",
  email: "keshrirohan214@gmail.com",
  github: "https://github.com/keshrirohan",
  linkedin: "https://linkedin.com/in/keshrirohan",
  resumeUrl: "#",
  metrics: [
    { label: "LeetCode Solved", value: "140+", icon: "Code2" },
    { label: "GitHub Streak", value: "100+ Days", icon: "Flame" },
    { label: "GitHub Commits", value: "300+", icon: "GitCommit" },
    { label: "Hack LLM Honor", value: "Top 10", icon: "Trophy" },
    { label: "B.Tech CGPA", value: "7.9 / 10", icon: "GraduationCap" },
  ],
};

export const socialLinks = [
  { label: "GitHub", href: profile.github, icon: "Github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "Linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "Mail" },
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["TypeScript", "JavaScript (ES6+)", "Python", "C++", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js (App Router)",
      "Tailwind CSS",
      "Redux Toolkit",
      "GSAP",
      "HTML5/CSS3",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "RESTful APIs",
      "WebSockets",
      "JWT Authentication",
    ],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "Mongoose", "Redis", "SQL"],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Vercel",
      "Render",
      "VS Code",
      "Linux",
    ],
  },
  {
    title: "Core Concepts",
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (OOP)",
      "Operating Systems",
      "Computer Networks",
      "Database Management Systems (DBMS)",
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Bio-Onn Health Care",
    role: "Full Stack Developer Intern",
    duration: "Nov 2024 – Present",
    location: "Remote / India",
    description:
      "Engineered full-stack web applications prioritizing modularity, security, and response latency across core healthcare modules.",
    achievements: [
      "Built scalable web interfaces and backend endpoints using React, Node.js, Express, and MongoDB.",
      "Optimized data querying pipelines and component rendering, boosting overall application performance by 25%.",
      "Maintained 99% server uptime through structured error logging and environment health monitoring.",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "exp-2",
    company: "Amazing Indian Stories",
    role: "Frontend Developer Intern",
    duration: "Jun 2024 – Oct 2024",
    location: "Remote / India",
    description:
      "Architected interactive frontend views and story presentation modules for a digital media production ecosystem.",
    achievements: [
      "Developed responsive React and Next.js user interfaces focused on clean design tokens and rapid load speeds.",
      "Integrated dynamic REST APIs, reliably serving content to over 300+ active users daily.",
      "Refactored legacy UI components to improve accessibility and responsive cross-device consistency.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
  },
  {
    id: "exp-3",
    company: "Slytherin Edu Pvt. Ltd.",
    role: "Web Development Intern",
    duration: "Jan 2024 – May 2024",
    location: "Remote / India",
    description:
      "Created educational landing portals, student progress interfaces, and responsive learning components.",
    achievements: [
      "Built responsive landing pages and interactive educational modules utilizing HTML, CSS, JavaScript, and React.",
      "Collaborated with design and content teams to deliver intuitive student dashboard elements.",
      "Enhanced user retention and course engagement through smooth micro-interactions and mobile layout optimization.",
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "Git"],
  },
];

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "CodeSync",
    category: "Developer Tooling / Chrome Extension",
    description:
      "Automated LeetCode submission synchronizer that instantly pushes solved problems directly to GitHub repositories with structured commit logs.",
    longDescription:
      "CodeSync is a Chrome Extension (Manifest V3) backed by a Node.js sync server. It captures accepted LeetCode submissions in real time, formats problem statements with runtime/memory metrics, and commits them automatically to a designated GitHub repository without requiring manual copy-pasting.",
    techStack: [
      "TypeScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Manifest V3",
      "GitHub REST API",
    ],
    features: [
      "Automated submission interception on LeetCode execution completion.",
      "Direct GitHub REST API integration for repository file creation and updates.",
      "Real-time session status monitoring and persistent submission history tracking.",
      "Incremental sync option to skip duplicate or previously pushed solutions.",
    ],
    achievements: [
      "Eliminated manual solution archiving for competitive programmers.",
      "Secured cookie authentication and zero-credential leak session management.",
    ],
    github: "https://github.com/keshrirohan",
    live: "",
    featured: true,
  },
  {
    id: "proj-2",
    title: "EchoHire AI",
    category: "AI & Voice Platform",
    description:
      "Voice-driven mock interview application providing candidate response evaluation, technical scoring, and structured AI feedback in real time.",
    longDescription:
      "EchoHire AI simulates technical interview environments using Web Audio API for voice capture and LLM capabilities for real-time answer assessment. The system analyzes clarity, technical depth, and key concepts, producing instant scoring reports for job seekers.",
    techStack: [
      "Next.js (App Router)",
      "React",
      "Node.js",
      "Web Audio API",
      "OpenAI API",
      "Tailwind CSS",
      "PostgreSQL",
    ],
    features: [
      "Interactive audio recording and live speech-to-text transcript generation.",
      "Context-aware technical question generation tailored to role and experience level.",
      "Automated feedback reports with score metrics, strengths, and areas for improvement.",
      "Historical interview attempt tracking and breakdown graphics.",
    ],
    achievements: [
      "Built real-time audio evaluation workflow with minimal inference latency.",
      "Designed full dark-mode candidate dashboard with analytical score visualizations.",
    ],
    github: "https://github.com/keshrirohan",
    live: "",
    featured: true,
  },
  {
    id: "proj-3",
    title: "AthletiQ",
    category: "Computer Vision / Health & Sports",
    description:
      "AI-powered sports performance analytics platform utilizing MediaPipe pose estimation to track athlete movement, count reps, and flag injury risks.",
    longDescription:
      "AthletiQ leverages computer vision models to perform real-time human pose tracking directly from video streams. By tracking 33 skeletal keypoints, the application calculates joint angles, evaluates exercise posture accuracy, and delivers real-time visual feedback.",
    techStack: [
      "Python",
      "MediaPipe",
      "OpenCV",
      "React",
      "Flask",
      "Tailwind CSS",
    ],
    features: [
      "Real-time 33-point skeletal landmark detection and joint angle computation.",
      "Automatic repetition counter and form accuracy scoring for core athletic exercises.",
      "Visual pose feedback overlays and biomechanical alignment alerts.",
      "Session telemetry storage and performance trend analytics.",
    ],
    achievements: [
      "Achieved sub-50ms landmark processing latency on standard video feeds.",
      "Engineered flexible posture calibration engine for customizable exercise types.",
    ],
    github: "https://github.com/keshrirohan",
    live: "",
    featured: true,
  },
];

export const achievements: AchievementItem[] = [
  {
    id: "ach-1",
    title: "Top 10 Finish — Hack LLM Hackathon",
    organizer: "IIIT Delhi",
    date: "2024",
    description:
      "Ranked among the Top 10 teams out of numerous competing teams by developing an AI solution utilizing large language models under time constraints.",
    badge: "Hackathon Winner",
  },
  {
    id: "ach-2",
    title: "Finalist — Techathon Competition",
    organizer: "Techathon",
    date: "2024",
    description:
      "Shortlisted as a finalist for designing and presenting an innovative full-stack technical solution before an expert industry judging panel.",
    badge: "Finalist",
  },
  {
    id: "ach-3",
    title: "Research Paper Presentation — ICCT-2025",
    organizer: "International Conference on Communication & Technology",
    date: "2025",
    description:
      "Authored and presented a technical research paper on modern computing frameworks at ICCT-2025.",
    badge: "Research Publication",
  },
  {
    id: "ach-4",
    title: "140+ LeetCode Solved & 100+ Day GitHub Streak",
    organizer: "Competitive Coding & Open Source",
    date: "Ongoing",
    description:
      "Maintained a continuous 100+ day coding streak on GitHub with 300+ total contributions and solved 140+ algorithmic challenges on LeetCode.",
    badge: "Coding Milestone",
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
    ],
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "cert-1",
    title: "Python Full Stack Virtual Internship",
    issuer: "EduSkills Foundation & AICTE",
    issueDate: "2024",
    description:
      "Completed comprehensive virtual internship covering Python backend architecture, database integration, and modern web application development.",
  },
  {
    id: "cert-2",
    title: "Bharatiya Antariksh Hackathon 2025 Certification",
    issuer: "ISRO (Indian Space Research Organisation)",
    issueDate: "2025",
    description:
      "Recognized for participation and prototype development during the space technology hackathon organized by ISRO.",
  },
];
