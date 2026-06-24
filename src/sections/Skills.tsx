"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Code2,
  Server,
  Database,
  Wrench,
  Layers,
} from "lucide-react";

/* ─────────────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────────────── */
interface Skill {
  name: string;
  level: number; // 0–100
  color: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  accent: string;
  description: string;
  skills: Skill[];
}

const CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    accent: "#ed722a",
    description: "Crafting pixel-perfect, interactive UIs",
    skills: [
      { name: "React.js",      level: 92, color: "#61DAFB" },
      { name: "Next.js",       level: 90, color: "#ffffff" },
      { name: "TypeScript",    level: 88, color: "#3178C6" },
      { name: "Tailwind CSS",  level: 93, color: "#38BDF8" },
      { name: "GSAP",          level: 72, color: "#88CE02" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    accent: "#818cf8",
    description: "Building robust, scalable server-side logic",
    skills: [
      { name: "Node.js",    level: 88, color: "#339933" },
      { name: "Express.js", level: 85, color: "#ffffff" },
      { name: "REST APIs",  level: 92, color: "#ed722a" },
      { name: "GraphQL",    level: 70, color: "#E535AB" },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    accent: "#34d399",
    description: "Designing efficient data layers",
    skills: [
      { name: "MongoDB",    level: 87, color: "#47A248" },
      { name: "PostgreSQL", level: 75, color: "#336791" },
      { name: "MySQL",      level: 72, color: "#4479A1" },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    icon: Wrench,
    accent: "#fb923c",
    description: "Streamlining development & delivery",
    skills: [
      { name: "Docker",   level: 70, color: "#2496ED" },
      { name: "AWS",      level: 60, color: "#FF9900" },
      { name: "Git",      level: 94, color: "#F05032" },
      { name: "GitHub",   level: 94, color: "#ffffff" },
      { name: "Postman",  level: 88, color: "#FF6C37" },
    ],
  },
];

/* ─────────────────────────────────────────────────────
   Skill Progress Bar
───────────────────────────────────────────────────── */
function SkillBar({ skill, index, accent }: { skill: Skill; index: number; accent: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07 + 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-125"
            style={{ backgroundColor: skill.color, boxShadow: `0 0 6px ${skill.color}80` }}
          />
          <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors duration-200">
            {skill.name}
          </span>
        </div>
        <motion.span
          className="text-xs font-bold tabular-nums"
          style={{ color: accent }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.07 + 0.4 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Track */}
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        {/* Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}cc, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}60`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.07 + 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-y-0 w-8 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
          initial={{ left: "-2rem" }}
          animate={inView ? { left: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.07 + 1.1, duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Skill Pill (for category overview)
───────────────────────────────────────────────────── */
function SkillPill({ name, color, index }: { name: string; color: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.08, transition: { duration: 0.15 } }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-default select-none"
      style={{
        background: `${color}12`,
        border: `1px solid ${color}25`,
        color: color,
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
      />
      {name}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────────────
   Category Tab Button
───────────────────────────────────────────────────── */
function CategoryTab({
  cat,
  active,
  onClick,
}: {
  cat: SkillCategory;
  active: boolean;
  onClick: () => void;
}) {
  const Icon = cat.icon;
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col sm:flex-row items-center sm:items-start gap-2 p-3 sm:p-4 rounded-xl transition-all duration-300 text-left w-full group"
      style={{
        background: active
          ? `linear-gradient(135deg, ${cat.accent}15, ${cat.accent}05)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${active ? cat.accent + "30" : "rgba(255,255,255,0.05)"}`,
        boxShadow: active ? `0 0 20px ${cat.accent}10` : "none",
      }}
      aria-pressed={active}
    >
      {/* Active indicator pill */}
      {active && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full"
          style={{ background: cat.accent }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
        style={{
          background: active ? `${cat.accent}20` : "rgba(255,255,255,0.04)",
          border: `1px solid ${active ? cat.accent + "30" : "rgba(255,255,255,0.06)"}`,
        }}
      >
        <Icon size={15} style={{ color: active ? cat.accent : "#52525b" }} strokeWidth={2} />
      </div>

      <div className="hidden sm:block">
        <p
          className="text-sm font-bold transition-colors duration-200"
          style={{ color: active ? "#ffffff" : "#71717a" }}
        >
          {cat.label}
        </p>
        <p className="text-[10px] text-white/30 mt-0.5 font-medium leading-tight">
          {cat.skills.length} skills
        </p>
      </div>
    </button>
  );
}

/* ─────────────────────────────────────────────────────
   Category Detail Panel
───────────────────────────────────────────────────── */
function CategoryPanel({ cat }: { cat: SkillCategory }) {
  const Icon = cat.icon;

  return (
    <motion.div
      key={cat.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-6 sm:p-8 rounded-2xl border overflow-hidden h-full"
      style={{
        border: `1px solid ${cat.accent}15`,
        background: `linear-gradient(135deg, rgba(255,255,255,0.025) 0%, ${cat.accent}05 100%)`,
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${cat.accent}12, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `${cat.accent}18`,
            border: `1px solid ${cat.accent}30`,
            boxShadow: `0 0 16px ${cat.accent}15`,
          }}
        >
          <Icon size={18} style={{ color: cat.accent }} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">{cat.label}</h3>
          <p className="text-xs text-white/40 font-medium">{cat.description}</p>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-5">
        {cat.skills.map((skill, i) => (
          <SkillBar key={skill.name} skill={skill} index={i} accent={cat.accent} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   All Skills Mosaic (bottom grid)
───────────────────────────────────────────────────── */
function AllSkillsMosaic() {
  const allSkills = CATEGORIES.flatMap((c) =>
    c.skills.map((s) => ({ ...s, catAccent: c.accent }))
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20"
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1"
          style={{ background: "linear-gradient(90deg,rgba(237,114,42,0.4),transparent)" }} />
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-[#ed722a]">
          <Layers size={13} /> Full Tech Arsenal
        </span>
        <div className="h-px flex-1"
          style={{ background: "linear-gradient(90deg,transparent,rgba(237,114,42,0.4))" }} />
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center">
        {allSkills.map((s, i) => (
          <SkillPill key={s.name} name={s.name} color={s.color} index={i} />
        ))}
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
      <span className="section-tag">⚡ Technical Skills</span>
      <h2 className="section-title mt-4">
        My{" "}
        <span
          style={{
            background: "linear-gradient(135deg,#ed722a,#f59150)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Tech Stack
        </span>
      </h2>
      <p className="section-subtitle mx-auto mt-4">
        Tools and technologies I use to bring ideas to life — from pixel to production.
      </p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Skills Section — main export
───────────────────────────────────────────────────── */
export default function Skills() {
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id);
  const activeCategory = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];

  return (
    <section id="skills" aria-label="Skills section" className="relative overflow-hidden" style={{ background: "var(--color-background)" }}>
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(237,114,42,0.3),transparent)" }} />

      {/* Background glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(237,114,42,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }} />

      <div className="container section">
        <SectionHeader />

        {/* Main interactive layout */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-6 items-start">
          {/* ── Tabs sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex lg:flex-col gap-2"
          >
            {CATEGORIES.map((cat) => (
              <CategoryTab
                key={cat.id}
                cat={cat}
                active={activeId === cat.id}
                onClick={() => setActiveId(cat.id)}
              />
            ))}

            {/* Overall proficiency summary card */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="hidden lg:block mt-4 p-4 rounded-xl border border-white/5 text-center"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <p className="text-xs text-white/30 font-medium uppercase tracking-widest mb-3">
                Overall
              </p>
              <p className="text-3xl font-black text-white">
                <span style={{ color: "#ed722a" }}>17</span>
              </p>
              <p className="text-xs text-white/40 mt-1">Technologies</p>
              <div className="w-full h-1 rounded-full mt-3 overflow-hidden"
                style={{ background: "rgba(255,255,255,0.06)" }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg,#ed722a,#f59150)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "82%" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <p className="text-xs text-[#ed722a] font-bold mt-1.5">82% avg</p>
            </motion.div>
          </motion.div>

          {/* ── Detail panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              <CategoryPanel key={activeCategory.id} cat={activeCategory} />
            </AnimatePresence>
          </motion.div>
        </div>

        {/* All skills mosaic */}
        <AllSkillsMosaic />
      </div>
    </section>
  );
}
