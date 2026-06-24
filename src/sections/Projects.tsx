"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  GitBranch,
  X,
  ArrowUpRight,
  Zap,
  Brain,
  Dumbbell,
  Star,
  GitFork,
  Eye,
  ChevronRight,
  Layers,
  Terminal,
  Globe,
  Database,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────── */
interface ProjectFeature {
  icon: React.ElementType;
  text: string;
}

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string;
  status: "Live" | "In Development" | "Open Source";
  statusColor: string;
  icon: React.ElementType;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  tech: { name: string; color: string }[];
  features: ProjectFeature[];
  metrics: { label: string; value: string }[];
  github: string;
  live: string;
  featured: boolean;
}

/* ─────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────── */
const PROJECTS: Project[] = [
  {
    id: "echohire-ai",
    title: "EchoHire AI",
    tagline: "AI-Powered Interview Preparation Platform",
    description:
      "An intelligent interview coaching platform that leverages AI to generate role-specific questions, analyse answers in real time, and provide structured feedback — helping candidates crack top-tier tech interviews.",
    longDescription:
      "EchoHire AI is a full-stack interview preparation platform built for software engineers and aspiring developers. It uses large language models to generate domain-specific technical questions, evaluates spoken and written answers via NLP, and delivers a comprehensive score card with actionable improvement tips. Features include a real-time mock interview simulator, personalised question banks, performance analytics dashboard, and shareable interview reports.",
    category: "AI / Full Stack",
    status: "Live",
    statusColor: "#34d399",
    icon: Brain,
    accentColor: "#ed722a",
    gradientFrom: "#ed722a",
    gradientTo: "#c45f1f",
    tech: [
      { name: "Next.js",       color: "#ffffff" },
      { name: "TypeScript",    color: "#3178C6" },
      { name: "OpenAI API",    color: "#74AA9C" },
      { name: "MongoDB",       color: "#47A248" },
      { name: "Node.js",       color: "#339933" },
      { name: "Tailwind CSS",  color: "#38BDF8" },
      { name: "Framer Motion", color: "#ff4e88" },
    ],
    features: [
      { icon: Brain,    text: "AI-generated role-specific interview questions" },
      { icon: Zap,      text: "Real-time answer analysis with NLP scoring" },
      { icon: Terminal, text: "Live code editor with syntax highlighting" },
      { icon: Layers,   text: "Performance analytics & improvement roadmap" },
      { icon: Globe,    text: "Shareable report cards & interview history" },
      { icon: Database, text: "Personalised question bank with difficulty levels" },
    ],
    metrics: [
      { label: "Interview Simulations", value: "500+" },
      { label: "Avg Score Improvement",  value: "38%" },
      { label: "Questions Generated",    value: "10K+" },
    ],
    github: "https://github.com/keshrirohan/echohire-ai",
    live: "https://echohire-ai.vercel.app",
    featured: true,
  },
  {
    id: "athletiq",
    title: "AthletiQ",
    tagline: "Smart Fitness Tracking & Coaching App",
    description:
      "A comprehensive fitness platform with AI-driven workout plans, nutrition tracking, and real-time progress analytics — designed to help athletes and enthusiasts reach peak performance.",
    longDescription:
      "AthletiQ is a performance-first fitness application built for serious athletes and hobbyists alike. It combines personalised AI workout generation with detailed nutrition macros tracking, wearable device integrations, community challenges, and a gamified streak system to keep users motivated. The platform delivers an end-to-end health stack — from goal setting and programme design to recovery tracking and milestone celebrations.",
    category: "Health & Fitness",
    status: "In Development",
    statusColor: "#f59150",
    icon: Dumbbell,
    accentColor: "#818cf8",
    gradientFrom: "#818cf8",
    gradientTo: "#6366f1",
    tech: [
      { name: "React.js",      color: "#61DAFB" },
      { name: "Node.js",       color: "#339933" },
      { name: "Express.js",    color: "#ffffff" },
      { name: "MongoDB",       color: "#47A248" },
      { name: "TypeScript",    color: "#3178C6" },
      { name: "Chart.js",      color: "#FF6384" },
      { name: "OpenAI API",    color: "#74AA9C" },
    ],
    features: [
      { icon: Brain,    text: "AI-personalised workout & nutrition plans" },
      { icon: Zap,      text: "Real-time performance analytics dashboard" },
      { icon: Database, text: "Macro & calorie tracker with food search" },
      { icon: Globe,    text: "Community challenges & leaderboards" },
      { icon: Terminal, text: "Wearable device data integration" },
      { icon: Layers,   text: "Gamified streaks & milestone system" },
    ],
    metrics: [
      { label: "Workouts Logged", value: "2K+" },
      { label: "Active Beta Users", value: "150+" },
      { label: "Avg Session Time",  value: "18 min" },
    ],
    github: "https://github.com/keshrirohan/athletiq",
    live: "https://athletiq.vercel.app",
    featured: true,
  },
];

/* ─────────────────────────────────────────────────────
   Project Modal
───────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const Icon = project.icon;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80"
          style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal panel */}
        <motion.div
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 z-10 scrollbar-hide"
          style={{
            background: "linear-gradient(135deg, #0d0d0d 0%, #111111 100%)",
            boxShadow: `0 0 80px ${project.accentColor}20, 0 40px 80px rgba(0,0,0,0.8)`,
          }}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Modal header gradient */}
          <div
            className="relative h-40 flex items-end p-6 overflow-hidden rounded-t-3xl"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}20 0%, ${project.gradientTo}10 60%, transparent 100%)`,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            {/* Corner glow */}
            <div
              className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
              style={{
                background: `radial-gradient(circle at top right, ${project.accentColor}20, transparent 70%)`,
              }}
            />
            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 hover:border-white/30 transition-colors duration-200"
              style={{ background: "rgba(255,255,255,0.05)" }}
              aria-label="Close modal"
            >
              <X size={14} className="text-white/60" />
            </button>

            <div className="relative flex items-end gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom}30, ${project.gradientTo}15)`,
                  borderColor: `${project.accentColor}30`,
                  boxShadow: `0 0 24px ${project.accentColor}20`,
                }}
              >
                <Icon size={22} style={{ color: project.accentColor }} strokeWidth={1.8} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${project.statusColor}18`, color: project.statusColor, border: `1px solid ${project.statusColor}30` }}
                  >
                    ● {project.status}
                  </span>
                  <span className="text-[10px] text-white/30 font-medium">{project.category}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{project.title}</h3>
                <p className="text-sm font-medium" style={{ color: project.accentColor }}>{project.tagline}</p>
              </div>
            </div>
          </div>

          {/* Modal body */}
          <div className="p-6 space-y-6">
            {/* Long description */}
            <p className="text-sm text-white/55 leading-relaxed">{project.longDescription}</p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="text-center p-3 rounded-xl border border-white/5"
                  style={{ background: `${project.accentColor}06` }}
                >
                  <p className="text-xl font-black" style={{ color: project.accentColor }}>{m.value}</p>
                  <p className="text-[10px] text-white/35 font-medium mt-0.5 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/30 mb-3">Key Features</p>
              <div className="grid sm:grid-cols-2 gap-2">
                {project.features.map((f, i) => {
                  const FIcon = f.icon;
                  return (
                    <div key={i} className="flex items-start gap-2.5">
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5"
                        style={{ background: `${project.accentColor}15` }}
                      >
                        <FIcon size={10} style={{ color: project.accentColor }} strokeWidth={2.5} />
                      </div>
                      <span className="text-xs text-white/55 leading-relaxed">{f.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-white/30 mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t.name}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: `${t.color}10`,
                      border: `1px solid ${t.color}25`,
                      color: t.color,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: t.color }} />
                    {t.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-sm font-semibold text-white/70 hover:text-white hover:border-white/25 transition-all duration-200"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <GitBranch size={15} /> View on GitHub
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${project.gradientFrom}, ${project.gradientTo})`,
                  boxShadow: `0 0 20px ${project.accentColor}30`,
                }}
              >
                <Globe size={15} /> Live Demo <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────────────
   Project Card
───────────────────────────────────────────────────── */
function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = project.icon;

  return (
    <motion.div
      ref={ref}
      className="project-card group relative rounded-3xl border border-white/5 overflow-hidden cursor-pointer h-full flex flex-col"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      onClick={onOpen}
    >
      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accentColor}30` }}
      />

      {/* Card header with gradient backdrop */}
      <div
        className="relative p-6 pb-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${project.gradientFrom}12 0%, ${project.gradientTo}05 100%)`,
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(${project.accentColor} 1px, transparent 1px), linear-gradient(90deg, ${project.accentColor} 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Corner radial */}
        <div
          className="absolute top-0 right-0 w-36 h-36 pointer-events-none transition-opacity duration-500 group-hover:opacity-150"
          style={{
            background: `radial-gradient(circle at top right, ${project.accentColor}18, transparent 70%)`,
          }}
        />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span
              className="inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
              style={{ background: `${project.accentColor}18`, color: project.accentColor, border: `1px solid ${project.accentColor}25` }}
            >
              <Star size={8} strokeWidth={2.5} /> Featured
            </span>
          </div>
        )}

        <div className="flex items-start gap-4 relative">
          {/* Icon */}
          <motion.div
            className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center border"
            style={{
              background: `linear-gradient(135deg, ${project.gradientFrom}25, ${project.gradientTo}10)`,
              borderColor: `${project.accentColor}30`,
              boxShadow: `0 0 20px ${project.accentColor}15`,
            }}
            whileHover={{ rotate: 5, scale: 1.08, transition: { duration: 0.2 } }}
          >
            <Icon size={20} style={{ color: project.accentColor }} strokeWidth={1.8} />
          </motion.div>

          <div className="flex-1 min-w-0">
            {/* Status + category */}
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full"
                style={{ background: `${project.statusColor}15`, color: project.statusColor, border: `1px solid ${project.statusColor}25` }}
              >
                ● {project.status}
              </span>
              <span className="text-[10px] text-white/30 font-medium truncate">{project.category}</span>
            </div>
            <h3 className="text-lg font-black text-white leading-tight group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <p className="text-xs font-medium mt-0.5" style={{ color: `${project.accentColor}cc` }}>
              {project.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 pt-4 flex flex-col flex-1">
        <p className="text-sm text-white/45 leading-relaxed mb-5 flex-1">{project.description}</p>

        {/* Metrics row */}
        <div className="flex gap-4 mb-5 pb-4 border-b border-white/5">
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <p className="text-base font-black" style={{ color: project.accentColor }}>{m.value}</p>
              <p className="text-[10px] text-white/30 font-medium">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t.name}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: `${t.color}10`,
                border: `1px solid ${t.color}20`,
                color: `${t.color}cc`,
              }}
            >
              {t.name}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full text-white/30"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-white px-3 py-1.5 rounded-lg border border-white/8 hover:border-white/20 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)" }}
              aria-label={`${project.title} GitHub repository`}
            >
              <GitBranch size={13} /> GitHub
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200"
              style={{
                background: `${project.accentColor}10`,
                borderColor: `${project.accentColor}25`,
                color: project.accentColor,
              }}
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={13} /> Demo
            </a>
          </div>
          <button
            className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group/btn"
            style={{ color: `${project.accentColor}80` }}
            aria-label={`View ${project.title} details`}
          >
            View details
            <ChevronRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Section Header
───────────────────────────────────────────────────── */
function SectionHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-16"
    >
      <span className="section-tag">
        <Layers size={12} /> Selected Work
      </span>
      <h2 className="section-title mt-4">
        Featured{" "}
        <span
          style={{
            background: "linear-gradient(135deg,#ed722a,#f59150)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Projects
        </span>
      </h2>
      <p className="section-subtitle mx-auto mt-4">
        Products I&apos;ve designed, built, and shipped — from concept to production.
      </p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   GSAP Reveal Hook
───────────────────────────────────────────────────── */
function useGsapReveal(selector: string, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 50, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [selector, containerRef]);
}

/* ─────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────── */
export default function Projects() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGsapReveal(".project-card", containerRef);

  const openModal = useCallback((id: string) => setActiveModal(id), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

  const activeProject = PROJECTS.find((p) => p.id === activeModal);

  return (
    <section id="projects" aria-label="Projects section" className="relative overflow-hidden" style={{ background: "var(--color-background)" }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(237,114,42,0.3),transparent)" }} />

      {/* Background glow */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(237,114,42,0.05) 0%,transparent 70%)",
          filter: "blur(80px)",
        }} />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(129,140,248,0.04) 0%,transparent 70%)",
          filter: "blur(60px)",
        }} />

      <div className="container section">
        <SectionHeader />

        {/* Cards grid */}
        <div ref={containerRef} className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => openModal(project.id)}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <div className="inline-flex items-center gap-4 flex-wrap justify-center">
            <span className="text-sm text-white/35 font-medium">More projects on GitHub</span>
            <a
              href="https://github.com/keshrirohan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-sm font-semibold text-white/70 hover:text-white hover:border-white/25 transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.03)" }}
              id="projects-github-link"
            >
              <GitBranch size={15} />
              github.com/keshrirohan
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Project modal */}
      {activeProject && (
        <ProjectModal project={activeProject} onClose={closeModal} />
      )}
    </section>
  );
}
