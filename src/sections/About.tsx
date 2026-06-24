"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { useEffect } from "react";
import {
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  ArrowUpRight,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────── */
interface StatItem {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  tech: string[];
  type: "work" | "education";
}

/* ─────────────────────────────────────────────────────
   Data
───────────────────────────────────────────────────── */
const STATS: StatItem[] = [
  { value: 2,   suffix: "+", label: "Years Experience", icon: Briefcase },
  { value: 15,  suffix: "+", label: "Projects Built",   icon: Code2 },
  { value: 8,   suffix: "+", label: "Tech Mastered",    icon: Sparkles },
  { value: 100, suffix: "%", label: "Passion for Code", icon: Award },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance / Projects",
    period: "2023 – Present",
    location: "Remote",
    description:
      "Architected and shipped production-grade web apps using Next.js, Node.js and MongoDB. Focused on performance, SEO, and pixel-perfect UI.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"],
    type: "work",
  },
  {
    role: "MERN Stack Intern",
    company: "Tech Startup",
    period: "2022 – 2023",
    location: "India",
    description:
      "Built REST APIs, integrated third-party services, and contributed to React dashboards. Reduced page load time by 40% via code splitting and lazy loading.",
    tech: ["React", "Express.js", "MongoDB", "REST APIs"],
    type: "work",
  },
  {
    role: "B.Tech in Computer Science",
    company: "University",
    period: "2019 – 2023",
    location: "India",
    description:
      "Graduated with distinction. Active in coding clubs, hackathons, and open-source contributions. Built 10+ projects during coursework.",
    tech: ["DSA", "OS", "DBMS", "Computer Networks"],
    type: "education",
  },
];

/* ─────────────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────────────── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 1 });

  useEffect(() => {
    if (inView) {
      animate(motionVal, value, { duration: 1.8, ease: "easeOut" });
    }
  }, [inView, motionVal, value]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ─────────────────────────────────────────────────────
   Stat Card
───────────────────────────────────────────────────── */
function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative p-6 rounded-2xl border border-white/5 overflow-hidden text-center"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(237,114,42,0.03) 100%)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Glow hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: "radial-gradient(circle at center, rgba(237,114,42,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1px rgba(237,114,42,0.2)" }}
      />

      {/* Icon */}
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 mx-auto"
        style={{ background: "rgba(237,114,42,0.1)", border: "1px solid rgba(237,114,42,0.15)" }}>
        <Icon size={18} className="text-[#ed722a]" strokeWidth={1.8} />
      </div>

      {/* Number */}
      <p className="text-4xl font-black tracking-tight text-white mb-1">
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="text-xs font-semibold tracking-[0.12em] uppercase text-white/40">{stat.label}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Timeline Entry
───────────────────────────────────────────────────── */
function TimelineEntry({ entry, index }: { entry: ExperienceItem; index: number }) {
  const isWork = entry.type === "work";
  const Icon = isWork ? Briefcase : GraduationCap;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative pl-14"
    >
      {/* Timeline line */}
      {index < EXPERIENCE.length - 1 && (
        <div className="absolute left-[22px] top-12 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(237,114,42,0.3), rgba(237,114,42,0.03))" }} />
      )}

      {/* Icon node */}
      <div
        className="absolute left-0 top-1 w-11 h-11 rounded-full flex items-center justify-center border"
        style={{
          background: isWork ? "rgba(237,114,42,0.12)" : "rgba(99,102,241,0.12)",
          borderColor: isWork ? "rgba(237,114,42,0.3)" : "rgba(99,102,241,0.3)",
          boxShadow: isWork
            ? "0 0 16px rgba(237,114,42,0.12)"
            : "0 0 16px rgba(99,102,241,0.12)",
        }}
      >
        <Icon size={16} style={{ color: isWork ? "#ed722a" : "#818cf8" }} strokeWidth={1.8} />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ x: 4, transition: { duration: 0.2 } }}
        className="group relative p-5 rounded-2xl border border-white/5 mb-6 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.025)" }}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(237,114,42,0.04) 0%, transparent 60%)" }}
        />

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-base font-bold text-white leading-tight group-hover:text-[#ed722a] transition-colors duration-300">
              {entry.role}
            </h3>
            <p className="text-sm font-semibold text-[#ed722a]/80 mt-0.5">{entry.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/40 font-medium">
              <Calendar size={11} /> {entry.period}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-white/30">
              <MapPin size={11} /> {entry.location}
            </span>
          </div>
        </div>

        <p className="text-sm text-white/50 leading-relaxed mb-3">{entry.description}</p>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5">
          {entry.tech.map((t) => (
            <span key={t}
              className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full"
              style={{
                background: "rgba(237,114,42,0.07)",
                border: "1px solid rgba(237,114,42,0.15)",
                color: "#ed722a",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Section Header helper
───────────────────────────────────────────────────── */
function SectionHeader({ tag, title, subtitle }: { tag: string; title: React.ReactNode; subtitle: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-16"
    >
      <span className="section-tag">{tag}</span>
      <h2 className="section-title mt-4">{title}</h2>
      <p className="section-subtitle mx-auto mt-4">{subtitle}</p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   About Section — main export
───────────────────────────────────────────────────── */
export default function About() {
  return (
    <section id="about" aria-label="About section" className="relative overflow-hidden" style={{ background: "var(--color-background)" }}>
      {/* Subtle top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(237,114,42,0.3), transparent)" }} />

      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] -translate-y-1/2 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(237,114,42,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />

      <div className="container section">
        <SectionHeader
          tag="👤 About Me"
          title={<>Who <span style={{
            background: "linear-gradient(135deg,#ed722a,#f59150)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>I Am</span></>}
          subtitle="A passionate full-stack developer who loves turning complex problems into elegant digital solutions."
        />

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* ── Left: Bio ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Avatar / Intro card */}
            <div
              className="relative p-7 rounded-2xl border border-white/5 mb-8 overflow-hidden"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.025), rgba(237,114,42,0.03))" }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top right, rgba(237,114,42,0.12), transparent 70%)",
                }} />

              <div className="flex items-start gap-4 mb-5">
                {/* Avatar initials */}
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white"
                  style={{
                    background: "linear-gradient(135deg,#ed722a,#c45f1f)",
                    boxShadow: "0 0 24px rgba(237,114,42,0.3)",
                  }}>
                  RK
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Rohan Keshri</h3>
                  <p className="text-sm text-[#ed722a] font-semibold">Software Engineer · MERN Stack</p>
                  <span className="inline-flex items-center gap-1.5 text-xs text-white/40 mt-1">
                    <MapPin size={11} /> India · Remote
                  </span>
                </div>
              </div>

              <p className="text-sm text-white/55 leading-7 mb-4">
                I&apos;m a full-stack developer with a deep love for building{" "}
                <span className="text-white/80 font-medium">scalable, user-centric web applications</span>. My
                stack of choice is the MERN ecosystem paired with{" "}
                <span className="text-[#ed722a] font-medium">Next.js and TypeScript</span> for type-safe,
                production-ready products.
              </p>

              <p className="text-sm text-white/55 leading-7 mb-5">
                Beyond code, I&apos;m obsessed with performance engineering, clean architecture, and
                crafting interfaces that feel{" "}
                <span className="text-white/80 font-medium">alive and delightful</span>. I believe great
                software is the intersection of engineering excellence and thoughtful design.
              </p>

              {/* CTA link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#ed722a] hover:gap-3 transition-all duration-200 group"
              >
                Let&apos;s work together
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>

          {/* ── Right: Timeline ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1"
                style={{ background: "linear-gradient(90deg,rgba(237,114,42,0.4),transparent)" }} />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-[#ed722a]">
                Experience &amp; Education
              </span>
              <div className="h-px flex-1"
                style={{ background: "linear-gradient(90deg,transparent,rgba(237,114,42,0.4))" }} />
            </div>

            {EXPERIENCE.map((entry, i) => (
              <TimelineEntry key={entry.role} entry={entry} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
