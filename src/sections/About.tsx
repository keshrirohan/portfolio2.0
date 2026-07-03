"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
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

/* ── Types ── */
interface StatItem { value: number; suffix: string; label: string; icon: React.ElementType; }
interface ExperienceItem {
  role: string; company: string; period: string; location: string;
  description: string; tech: string[]; type: "work" | "education";
}

/* ── Data ── */
const STATS: StatItem[] = [
  { value: 2,   suffix: "+", label: "Years Experience", icon: Briefcase },
  { value: 15,  suffix: "+", label: "Projects Built",   icon: Code2 },
  { value: 8,   suffix: "+", label: "Tech Mastered",    icon: Sparkles },
  { value: 100, suffix: "%", label: "Passion for Code", icon: Award },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Full Stack Developer", company: "Freelance / Projects",
    period: "2023 – Present", location: "Remote",
    description: "Architected and shipped production-grade web apps using Next.js, Node.js and MongoDB. Focused on performance, SEO, and pixel-perfect UI.",
    tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"], type: "work",
  },
  {
    role: "MERN Stack Intern", company: "Tech Startup",
    period: "2022 – 2023", location: "India",
    description: "Built REST APIs, integrated third-party services, and contributed to React dashboards. Reduced page load time by 40% via code splitting and lazy loading.",
    tech: ["React", "Express.js", "MongoDB", "REST APIs"], type: "work",
  },
  {
    role: "B.Tech in Computer Science", company: "University",
    period: "2019 – 2023", location: "India",
    description: "Graduated with distinction. Active in coding clubs, hackathons, and open-source contributions. Built 10+ projects during coursework.",
    tech: ["DSA", "OS", "DBMS", "Computer Networks"], type: "education",
  },
];

/* ── Animated Counter ── */
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20, mass: 1 });
  useEffect(() => { if (inView) animate(motionVal, value, { duration: 1.6, ease: "easeOut" }); }, [inView, motionVal, value]);
  useEffect(() => spring.on("change", (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; }), [spring, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ── Stat Card ── */
function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const Icon = stat.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="card text-center"
    >
      <div
        className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 mx-auto"
        style={{ background: "var(--color-accent-muted)", border: "1px solid rgba(237,114,42,0.2)" }}
      >
        <Icon size={17} style={{ color: "var(--color-accent)" }} strokeWidth={1.8} />
      </div>
      <p className="text-3xl font-black tracking-tight mb-1" style={{ color: "var(--color-fg)" }}>
        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="text-xs font-semibold tracking-[0.1em] uppercase" style={{ color: "var(--color-fg-subtle)" }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

/* ── Timeline Entry ── */
function TimelineEntry({ entry, index }: { entry: ExperienceItem; index: number }) {
  const isWork = entry.type === "work";
  const Icon = isWork ? Briefcase : GraduationCap;
  const accent = isWork ? "#ed722a" : "#818cf8";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative pl-12 sm:pl-14"
    >
      {/* Timeline line */}
      {index < EXPERIENCE.length - 1 && (
        <div className="absolute left-[19px] sm:left-[21px] top-11 bottom-0 w-px"
          style={{ background: `linear-gradient(to bottom, ${accent}40, transparent)` }} />
      )}

      {/* Icon node */}
      <div
        className="absolute left-0 top-0.5 w-10 h-10 rounded-full flex items-center justify-center border flex-shrink-0"
        style={{ background: `${accent}14`, borderColor: `${accent}30` }}
      >
        <Icon size={15} style={{ color: accent }} strokeWidth={1.8} />
      </div>

      {/* Card */}
      <motion.div
        whileHover={{ x: 3, transition: { duration: 0.2 } }}
        className="card mb-4"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-sm font-bold leading-tight transition-colors duration-200" style={{ color: "var(--color-fg)" }}>
              {entry.role}
            </h3>
            <p className="text-xs font-semibold mt-0.5" style={{ color: "var(--color-accent)" }}>{entry.company}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: "var(--color-fg-muted)" }}>
              <Calendar size={10} /> {entry.period}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--color-fg-subtle)" }}>
              <MapPin size={10} /> {entry.location}
            </span>
          </div>
        </div>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--color-fg-muted)" }}>{entry.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {entry.tech.map((t) => (
            <span key={t} className="badge badge-neutral">{t}</span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── About Section ── */
export default function About() {
  return (
    <section id="about" aria-label="About section" className="relative overflow-hidden" style={{ background: "var(--color-bg)" }}>
      {/* Subtle top separator */}
      <div className="section-sep absolute top-0 left-0" aria-hidden="true" />

      {/* Background glow */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] -translate-y-1/2 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(237,114,42,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
        aria-hidden="true" />

      <div className="container section">
        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="section-header"
        >
          <span className="section-tag"><Sparkles size={11} strokeWidth={2.5} /> About Me</span>
          <h2 className="section-title">
            Who{" "}
            <span className="gradient-text">I Am</span>
          </h2>
          <p className="section-subtitle mx-auto mt-3">
            A passionate full-stack developer who loves turning complex problems into elegant digital solutions.
          </p>
          <div className="divider mx-auto" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-14 items-start">
          {/* ── Left: Bio + Stats ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Bio card */}
            <div className="card mb-5" style={{ background: "var(--color-surface)" }}>
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center font-black text-base text-white"
                  style={{ background: "linear-gradient(135deg,#ed722a,#c45f1f)", boxShadow: "0 0 20px rgba(237,114,42,0.3)" }}
                >
                  RK
                </div>
                <div>
                  <h3 className="text-base font-bold" style={{ color: "var(--color-fg)" }}>Rohan Keshri</h3>
                  <p className="text-sm font-semibold" style={{ color: "var(--color-accent)" }}>Software Engineer · MERN Stack</p>
                  <span className="inline-flex items-center gap-1 text-xs mt-0.5" style={{ color: "var(--color-fg-subtle)" }}>
                    <MapPin size={11} /> India · Remote
                  </span>
                </div>
              </div>

              <p className="text-sm leading-7 mb-3" style={{ color: "var(--color-fg-muted)" }}>
                I&apos;m a full-stack developer with a deep love for building{" "}
                <span className="font-semibold" style={{ color: "var(--color-fg)" }}>scalable, user-centric web applications</span>.
                My stack of choice is the MERN ecosystem paired with{" "}
                <span style={{ color: "var(--color-accent)" }} className="font-medium">Next.js and TypeScript</span>{" "}
                for type-safe, production-ready products.
              </p>

              <p className="text-sm leading-7 mb-4" style={{ color: "var(--color-fg-muted)" }}>
                Beyond code, I&apos;m obsessed with performance engineering, clean architecture, and crafting interfaces that feel{" "}
                <span className="font-semibold" style={{ color: "var(--color-fg)" }}>alive and delightful</span>. I believe great software is
                the intersection of engineering excellence and thoughtful design.
              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group"
                style={{ color: "var(--color-accent)" }}
              >
                Let&apos;s work together
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
            </div>
          </motion.div>

          {/* ── Right: Timeline ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,var(--color-accent),transparent)" }} />
              <span className="text-xs font-bold tracking-[0.12em] uppercase" style={{ color: "var(--color-accent)" }}>
                Experience &amp; Education
              </span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg,transparent,var(--color-accent))" }} />
            </div>
            {EXPERIENCE.map((entry, i) => <TimelineEntry key={entry.role} entry={entry} index={i} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
