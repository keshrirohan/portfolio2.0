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
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="group"
    >
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: skill.color }}
          />
          <span className="text-sm font-semibold transition-colors duration-200" style={{ color: "var(--color-fg)" }}>
            {skill.name}
          </span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color: accent }}>
          {skill.level}%
        </span>
      </div>

      {/* Track */}
      <div
        className="relative h-1.5 rounded-full overflow-hidden"
        style={{ background: "var(--color-border)" }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: `linear-gradient(90deg, ${skill.color}bb, ${skill.color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ delay: index * 0.05 + 0.1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
      className="relative flex flex-col sm:flex-row items-center sm:items-start gap-2 p-3 sm:p-4 rounded-xl transition-all duration-300 text-left flex-shrink-0 sm:w-full group"
      style={{
        background: active
          ? `linear-gradient(135deg, ${cat.accent}15, ${cat.accent}05)`
          : "rgba(128,128,128,0.06)",
        border: `1px solid ${active ? cat.accent + "30" : "rgba(128,128,128,0.1)"}`,
        boxShadow: active ? `0 0 20px ${cat.accent}10` : "none",
        minWidth: "80px",
      }}
      aria-pressed={active}
    >
      {/* Active indicator pill — left bar on lg, bottom bar on mobile */}
      {active && (
        <motion.div
          layoutId="tab-indicator"
          className="absolute left-0 top-1/4 bottom-1/4 w-0.5 rounded-full hidden sm:block"
          style={{ background: cat.accent }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      <div
        className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
        style={{
          background: active ? `${cat.accent}20` : "rgba(128,128,128,0.08)",
          border: `1px solid ${active ? cat.accent + "30" : "rgba(128,128,128,0.1)"}`,
        }}
      >
        <Icon size={15} style={{ color: active ? cat.accent : "var(--color-foreground-subtle)" }} strokeWidth={2} />
      </div>

      <div className="hidden sm:block min-w-0">
        <p
          className="text-sm font-bold transition-colors duration-200 truncate"
          style={{ color: active ? "var(--color-foreground)" : "var(--color-foreground-muted)" }}
        >
          {cat.label}
        </p>
        <p className="text-[10px] mt-0.5 font-medium leading-tight" style={{ color: "var(--color-foreground-subtle)" }}>
          {cat.skills.length} skills
        </p>
      </div>

      {/* Mobile label below icon */}
      <p className="sm:hidden text-[9px] font-bold text-center leading-tight mt-0.5"
        style={{ color: active ? cat.accent : "var(--color-foreground-subtle)", maxWidth: "60px" }}>
        {cat.label}
      </p>
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="card h-full"
      style={{ background: "var(--color-surface)", borderColor: `${cat.accent}20` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${cat.accent}14`, border: `1px solid ${cat.accent}25` }}
        >
          <Icon size={17} style={{ color: cat.accent }} strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-sm font-bold" style={{ color: "var(--color-fg)" }}>{cat.label}</h3>
          <p className="text-xs" style={{ color: "var(--color-fg-muted)" }}>{cat.description}</p>
        </div>
      </div>

      {/* Progress bars */}
      <div className="space-y-4">
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="mt-14"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,var(--color-accent),transparent)` }} />
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] uppercase" style={{ color: "var(--color-accent)" }}>
          <Layers size={12} /> Full Tech Arsenal
        </span>
        <div className="h-px flex-1" style={{ background: `linear-gradient(90deg,transparent,var(--color-accent))` }} />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="section-header"
    >
      <span className="section-tag">Technical Skills</span>
      <h2 className="section-title">My <span className="gradient-text">Tech Stack</span></h2>
      <p className="section-subtitle mx-auto mt-3">Tools and technologies I use to bring ideas to life — from pixel to production.</p>
      <div className="divider mx-auto" />
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
    <section id="skills" aria-label="Skills section" className="relative overflow-hidden section-alt">
      <div className="section-sep absolute top-0 left-0" aria-hidden="true" />

      <div className="container section">
        <SectionHeader />

        {/* Main interactive layout */}
        <div className="grid lg:grid-cols-[190px_1fr] gap-5 items-start">
          {/* ── Tabs ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="flex lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 lg:overflow-x-visible snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="snap-start flex-shrink-0">
                <CategoryTab cat={cat} active={activeId === cat.id} onClick={() => setActiveId(cat.id)} />
              </div>
            ))}

            {/* Summary card — desktop only */}
            <div
              className="hidden lg:block mt-3 p-4 rounded-xl border text-center"
              style={{ background: "var(--color-surface-2)", borderColor: "var(--color-border)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "var(--color-fg-subtle)" }}>Overall</p>
              <p className="text-2xl font-black" style={{ color: "var(--color-fg)" }}>
                <span style={{ color: "var(--color-accent)" }}>17</span>
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: "var(--color-fg-subtle)" }}>Technologies</p>
              <div className="w-full h-1 rounded-full mt-3 overflow-hidden" style={{ background: "var(--color-border)" }}>
                <motion.div className="h-full rounded-full" style={{ background: "linear-gradient(90deg,#ed722a,#f59150)" }}
                  initial={{ width: 0 }} whileInView={{ width: "82%" }} viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }} />
              </div>
              <p className="text-xs font-bold mt-1" style={{ color: "var(--color-accent)" }}>82% avg</p>
            </div>
          </motion.div>

          {/* ── Detail panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.3, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
          >
            <AnimatePresence mode="wait">
              <CategoryPanel key={activeCategory.id} cat={activeCategory} />
            </AnimatePresence>
          </motion.div>
        </div>

        <AllSkillsMosaic />
      </div>
    </section>
  );
}
