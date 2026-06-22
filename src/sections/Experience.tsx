"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Users,
  Code2,
  Zap,
  Star,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────── */
interface Achievement {
  icon: React.ElementType;
  text: string;
}

interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  achievements: Achievement[];
  tech: string[];
  accentColor: string;
  logo: string; // emoji / initials fallback
}

/* ─────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────── */
const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "amazing-indian-stories",
    role: "Full Stack Developer",
    company: "Amazing Indian Stories",
    period: "Jun 2024 – Present",
    duration: "1+ yr",
    location: "Remote, India",
    type: "Full-time",
    description:
      "Leading development of a content-rich storytelling platform, building scalable Next.js applications with dynamic CMS integration, SEO optimisation, and interactive reader experiences.",
    achievements: [
      { icon: TrendingUp, text: "Boosted page load speed by 55% via SSR & image optimisation" },
      { icon: Users,      text: "Scaled platform to serve 10K+ monthly active readers" },
      { icon: Code2,      text: "Architected reusable component library cutting dev time by 30%" },
    ],
    tech: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Node.js", "Cloudinary"],
    accentColor: "#ed722a",
    logo: "AIS",
  },
  {
    id: "bio-onn",
    role: "MERN Stack Developer",
    company: "BIO-ONN HEALTH CARE",
    period: "Jan 2024 – May 2024",
    duration: "5 mos",
    location: "Hybrid, India",
    type: "Contract",
    description:
      "Built patient-facing and admin dashboards for a healthcare SaaS product. Implemented secure REST APIs, role-based access control, and real-time appointment scheduling features.",
    achievements: [
      { icon: Zap,        text: "Reduced API response time by 40% through indexing & caching" },
      { icon: TrendingUp, text: "Integrated payment gateway handling ₹5L+ monthly transactions" },
      { icon: Star,       text: "Delivered HIPAA-compliant data encryption across all endpoints" },
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Redis", "JWT", "Razorpay"],
    accentColor: "#34d399",
    logo: "BOH",
  },
  {
    id: "slytherin-edu",
    role: "Frontend Developer Intern",
    company: "Slytherin Edu Pvt Ltd",
    period: "Jun 2023 – Dec 2023",
    duration: "7 mos",
    location: "Remote, India",
    type: "Internship",
    description:
      "Developed interactive e-learning modules, quiz engines, and student progress dashboards. Collaborated closely with designers to translate Figma prototypes into pixel-perfect React components.",
    achievements: [
      { icon: Users,      text: "Built quiz engine serving 2K+ concurrent students" },
      { icon: Code2,      text: "Reduced component re-renders by 45% with React.memo & hooks" },
      { icon: TrendingUp, text: "Increased student engagement metrics by 28% via UX improvements" },
    ],
    tech: ["React.js", "JavaScript", "Tailwind CSS", "REST APIs", "Figma", "Git"],
    accentColor: "#818cf8",
    logo: "SEL",
  },
];

/* ─────────────────────────────────────────────────────
   GSAP Line Reveal
───────────────────────────────────────────────────── */
function useGsapReveal(selector: string, containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        selector,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [selector, containerRef]);
}

/* ─────────────────────────────────────────────────────
   Timeline Connector
───────────────────────────────────────────────────── */
function TimelineConnector({ accent, last }: { accent: string; last: boolean }) {
  if (last) return null;
  return (
    <motion.div
      className="absolute left-[27px] top-20 bottom-0 w-px z-0"
      style={{
        background: `linear-gradient(to bottom, ${accent}60 0%, ${accent}10 60%, transparent 100%)`,
      }}
      initial={{ scaleY: 0, originY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    />
  );
}

/* ─────────────────────────────────────────────────────
   Experience Card
───────────────────────────────────────────────────── */
function ExperienceCard({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="experience-card relative flex gap-6"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Timeline node ── */}
      <div className="relative z-10 flex-shrink-0 flex flex-col items-center pt-1">
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm tracking-tight border relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${entry.accentColor}20, ${entry.accentColor}08)`,
            borderColor: `${entry.accentColor}30`,
            color: entry.accentColor,
            boxShadow: `0 0 20px ${entry.accentColor}15`,
          }}
          whileHover={{ scale: 1.08, rotate: 2, transition: { duration: 0.2 } }}
        >
          {/* Shimmer on hover */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${entry.accentColor}20 50%, transparent 70%)`,
            }}
          />
          <span className="relative z-10 text-xs">{entry.logo}</span>
        </motion.div>
      </div>

      {/* ── Main card ── */}
      <motion.div
        className="group flex-1 mb-10 rounded-2xl border overflow-hidden relative"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.01) 100%)",
          borderColor: "rgba(255,255,255,0.06)",
        }}
        whileHover={{ y: -3, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      >
        {/* Hover glow border */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ boxShadow: `inset 0 0 0 1px ${entry.accentColor}30` }}
        />
        {/* Top accent stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: `linear-gradient(90deg, ${entry.accentColor}, ${entry.accentColor}40, transparent)`,
            opacity: 0,
            transition: "opacity 0.3s",
          }}
        />
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, ${entry.accentColor}, transparent)` }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.12 + 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="p-6 lg:p-7">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: `${entry.accentColor}12`,
                    border: `1px solid ${entry.accentColor}25`,
                    color: entry.accentColor,
                  }}
                >
                  {entry.type}
                </span>
                <span className="text-[10px] text-white/30 font-medium">{entry.duration}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-tight group-hover:text-white transition-colors">
                {entry.role}
              </h3>
              <div className="flex items-center gap-1.5 mt-1">
                <Briefcase size={12} style={{ color: entry.accentColor }} strokeWidth={2} />
                <span className="text-sm font-semibold" style={{ color: entry.accentColor }}>
                  {entry.company}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1.5 flex-shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs text-white/40 font-medium">
                <Calendar size={11} /> {entry.period}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/30">
                <MapPin size={11} /> {entry.location}
              </span>
            </div>
          </div>

          <p className="text-sm text-white/50 leading-relaxed mb-5">{entry.description}</p>

          {/* Achievements */}
          <div className="space-y-2.5 mb-5">
            {entry.achievements.map((ach, i) => {
              const Icon = ach.icon;
              return (
                <motion.div
                  key={i}
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.12 + 0.3 + i * 0.08, duration: 0.5 }}
                >
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center mt-0.5"
                    style={{ background: `${entry.accentColor}15` }}
                  >
                    <Icon size={10} style={{ color: entry.accentColor }} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs text-white/55 leading-relaxed">{ach.text}</span>
                </motion.div>
              );
            })}
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
            {entry.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full transition-colors duration-200 hover:border-white/20"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
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
        <Briefcase size={12} /> Work Experience
      </span>
      <h2 className="section-title mt-4">
        Where I&apos;ve{" "}
        <span
          style={{
            background: "linear-gradient(135deg,#ed722a,#f59150)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Worked
        </span>
      </h2>
      <p className="section-subtitle mx-auto mt-4">
        Real-world experience building scalable products across healthcare, media, and education.
      </p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Summary strip
───────────────────────────────────────────────────── */
function SummaryStrip() {
  const items = [
    { value: "3", label: "Companies" },
    { value: "2+", label: "Years Total" },
    { value: "15+", label: "Features Shipped" },
    { value: "3", label: "Domains" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-4 mb-16 overflow-hidden rounded-2xl border border-white/5"
      style={{ background: "rgba(255,255,255,0.04)" }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center py-5 px-4 text-center"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <span className="text-2xl font-black text-white">{item.value}</span>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30 mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Main Export
───────────────────────────────────────────────────── */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGsapReveal(".experience-card", containerRef);

  return (
    <section id="experience" aria-label="Experience section" className="relative bg-black overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(237,114,42,0.3),transparent)" }} />

      {/* BG glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse,rgba(237,114,42,0.05) 0%,transparent 70%)",
          filter: "blur(60px)",
        }} />

      <div className="container section">
        <SectionHeader />
        <SummaryStrip />

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          {EXPERIENCES.map((entry, i) => (
            <div key={entry.id} className="relative">
              <TimelineConnector accent={entry.accentColor} last={i === EXPERIENCES.length - 1} />
              <ExperienceCard entry={entry} index={i} />
            </div>
          ))}

          {/* Timeline end node */}
          <motion.div
            className="flex items-center gap-3 pl-6 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <div className="w-5 h-5 rounded-full border-2 border-white/10 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#ed722a]" />
            </div>
            <span className="text-xs text-white/30 font-medium tracking-wide">The journey continues…</span>
            <Sparkles size={12} className="text-[#ed722a]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
