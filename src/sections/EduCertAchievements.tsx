"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle,
  Trophy,
  Award,
  FileText,
  Star,
  BookOpen,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────────────
   Shared Helpers
───────────────────────────────────────────────────── */
const ORANGE = "#ed722a";

const gradientText: React.CSSProperties = {
  background: "linear-gradient(135deg, #ed722a, #f59150)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

function SectionHeader({
  tag,
  tagIcon,
  title,
  highlight,
  subtitle,
}: {
  tag: string;
  tagIcon: React.ReactNode;
  title: string;
  highlight: string;
  subtitle: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-16"
    >
      <span className="section-tag">
        {tagIcon}
        {tag}
      </span>
      <h2 className="section-title mt-4">
        {title}{" "}
        <span style={gradientText}>{highlight}</span>
      </h2>
      <p className="section-subtitle mx-auto mt-4">{subtitle}</p>
      <div className="divider mx-auto mt-6" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   ░░░  EDUCATION  ░░░
───────────────────────────────────────────────────── */
interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  scoreLabel: string;
  location: string;
  board?: string;
  highlights?: string[];
  accentColor: string;
  icon: React.ElementType;
}

const EDUCATION_DATA: EducationEntry[] = [
  {
    id: "btech",
    degree: "B.Tech in Computer Science Engineering",
    institution: "Dr. A.P.J. Abdul Kalam Technical University (AKTU)",
    period: "2021 – 2025",
    score: "7.8 / 10",
    scoreLabel: "CGPA",
    location: "Lucknow, India",
    highlights: [
      "Graduated with distinction",
      "Active in coding clubs & hackathons",
      "Strong foundation in DSA & system design",
    ],
    accentColor: ORANGE,
    icon: GraduationCap,
  },
  {
    id: "twelfth",
    degree: "12th Grade – PCM",
    institution: "DPS (Delhi Public School)",
    period: "2019 – 2021",
    score: "86%",
    scoreLabel: "Percentage",
    location: "India",
    board: "CBSE",
    accentColor: "#818cf8",
    icon: BookOpen,
  },
];

function EducationCard({ entry, index }: { entry: EducationEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = entry.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Top accent stripe */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${entry.accentColor}, ${entry.accentColor}30, transparent)`,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${entry.accentColor}30` }}
      />

      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${entry.accentColor}08 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      <div className="p-7 flex flex-col h-full relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${entry.accentColor}12`,
              border: `1px solid ${entry.accentColor}25`,
              boxShadow: `0 0 16px ${entry.accentColor}10`,
            }}
          >
            <Icon size={22} style={{ color: entry.accentColor }} strokeWidth={1.8} />
          </div>

          {/* Score badge */}
          <div
            className="px-3 py-1.5 rounded-xl text-center flex-shrink-0"
            style={{
              background: `${entry.accentColor}10`,
              border: `1px solid ${entry.accentColor}25`,
            }}
          >
            <div
              className="text-lg font-black leading-tight"
              style={{ color: entry.accentColor }}
            >
              {entry.score}
            </div>
            <div
              className="text-[9px] font-bold tracking-widest uppercase"
              style={{ color: `${entry.accentColor}80` }}
            >
              {entry.scoreLabel}
            </div>
          </div>
        </div>

        {/* Degree & Institution */}
        <h3 className="text-base font-bold text-white leading-tight mb-1.5">
          {entry.degree}
        </h3>
        <p className="text-sm font-semibold mb-4" style={{ color: entry.accentColor }}>
          {entry.institution}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs text-white/40 font-medium">
            <Calendar size={11} />
            {entry.period}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-white/40 font-medium">
            <MapPin size={11} />
            {entry.location}
          </span>
          {entry.board && (
            <span
              className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {entry.board}
            </span>
          )}
        </div>

        {/* Highlights */}
        {entry.highlights && entry.highlights.length > 0 && (
          <div className="mt-auto space-y-2 pt-4 border-t border-white/5">
            {entry.highlights.map((h, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15 + 0.4 + i * 0.08, duration: 0.5 }}
              >
                <Star
                  size={11}
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: entry.accentColor }}
                />
                <span className="text-xs text-white/50 leading-relaxed">{h}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function Education() {
  return (
    <section
      id="education"
      aria-label="Education section"
      className="relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(237,114,42,0.3), transparent)",
        }}
      />

      {/* BG glow */}
      <div
        className="absolute top-1/2 -translate-y-1/2 left-1/4 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(237,114,42,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container section">
        <SectionHeader
          tag="Education"
          tagIcon={<GraduationCap size={12} />}
          title="Academic"
          highlight="Background"
          subtitle="Formal education that shaped my engineering mindset and problem-solving approach."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {EDUCATION_DATA.map((entry, i) => (
            <EducationCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   ░░░  CERTIFICATIONS  ░░░
───────────────────────────────────────────────────── */
interface CertEntry {
  id: string;
  title: string;
  platform: string;
  issuer: string;
  year: string;
  accentColor: string;
  initials: string;
}

const CERTS_DATA: CertEntry[] = [
  {
    id: "meta-fe",
    title: "Meta Front-End Developer Certificate",
    platform: "Coursera",
    issuer: "Meta",
    year: "2024",
    accentColor: "#0080FB",
    initials: "M",
  },
  {
    id: "aws-cp",
    title: "AWS Cloud Practitioner Essentials",
    platform: "AWS",
    issuer: "Amazon Web Services",
    year: "2023",
    accentColor: "#FF9900",
    initials: "AWS",
  },
  {
    id: "mongo-node",
    title: "MongoDB Node.js Developer Path",
    platform: "MongoDB University",
    issuer: "MongoDB",
    year: "2023",
    accentColor: "#00ED64",
    initials: "MDB",
  },
  {
    id: "js-complete",
    title: "The Complete JavaScript Course",
    platform: "Udemy",
    issuer: "Jonas Schmedtmann",
    year: "2022",
    accentColor: "#EC5252",
    initials: "JS",
  },
  {
    id: "react-complete",
    title: "React – The Complete Guide",
    platform: "Udemy",
    issuer: "Maximilian Schwarzmuller",
    year: "2023",
    accentColor: "#61DAFB",
    initials: "React",
  },
];

function CertCard({ cert, index }: { cert: CertEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border overflow-hidden flex-shrink-0"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
        borderColor: "rgba(255,255,255,0.07)",
        width: "260px",
      }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Accent top stripe */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${cert.accentColor}, ${cert.accentColor}20, transparent)`,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hover border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${cert.accentColor}30` }}
      />

      <div className="p-5">
        {/* Logo + Check */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-xs tracking-tight"
            style={{
              background: `${cert.accentColor}15`,
              border: `1px solid ${cert.accentColor}25`,
              color: cert.accentColor,
              boxShadow: `0 0 12px ${cert.accentColor}10`,
            }}
          >
            {cert.initials}
          </div>
          <CheckCircle
            size={16}
            className="flex-shrink-0 mt-0.5"
            style={{ color: cert.accentColor }}
          />
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white leading-tight mb-2 line-clamp-2">
          {cert.title}
        </h3>

        {/* Issuer + Platform */}
        <p className="text-xs font-medium mb-1" style={{ color: cert.accentColor }}>
          {cert.issuer}
        </p>
        <p className="text-[11px] text-white/35 mb-4">{cert.platform}</p>

        {/* Year pill */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span
            className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
            style={{
              background: `${cert.accentColor}10`,
              border: `1px solid ${cert.accentColor}20`,
              color: cert.accentColor,
            }}
          >
            {cert.year}
          </span>
          <ExternalLink
            size={12}
            className="text-white/20 group-hover:text-white/50 transition-colors duration-200"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="certifications"
      aria-label="Certifications section"
      className="relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(237,114,42,0.2), transparent)",
        }}
      />

      {/* BG glow */}
      <div
        className="absolute bottom-0 right-1/4 w-[500px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(237,114,42,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container section">
        <SectionHeader
          tag="Certifications"
          tagIcon={<CheckCircle size={12} />}
          title="Verified"
          highlight="Credentials"
          subtitle="Industry-recognised certifications that validate my skills across the modern tech stack."
        />

        {/* Scrollable row */}
        <div ref={headerRef} className="relative">
          {/* Fade edges */}
          <div
            className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #000000, transparent)" }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #000000, transparent)" }}
          />

          <div
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Spacer */}
            <div className="flex-shrink-0 w-2" />
            {CERTS_DATA.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
            <div className="flex-shrink-0 w-2" />
          </div>

          {/* Scroll hint dot trail */}
          <motion.div
            className="flex justify-center gap-1.5 mt-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {CERTS_DATA.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === 0 ? "20px" : "6px",
                  height: "6px",
                  background: i === 0 ? ORANGE : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          className="grid grid-cols-3 gap-px mt-10 rounded-2xl overflow-hidden border border-white/5"
          style={{ background: "rgba(255,255,255,0.03)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { value: "5", label: "Certifications" },
            { value: "4", label: "Platforms" },
            { value: "2022–24", label: "Period" },
          ].map((item, i) => (
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
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   ░░░  ACHIEVEMENTS  ░░░
───────────────────────────────────────────────────── */
interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  year: string;
  accentColor: string;
  icon: React.ElementType;
}

const ACHIEVEMENTS_DATA: AchievementEntry[] = [
  {
    id: "techathon",
    title: "Techathon Finalist",
    description:
      "Reached the finals of the Techathon national-level hackathon, competing against 500+ teams. Built a real-time collaboration tool in just 36 hours.",
    year: "2024",
    accentColor: "#ed722a",
    icon: Trophy,
  },
  {
    id: "icct4",
    title: "ICCT4-2025 Research Paper Presenter",
    description:
      "Presented a research paper at the International Conference on Computing & Communication Technologies (ICCT4-2025) on AI-driven web optimisation.",
    year: "2025",
    accentColor: "#818cf8",
    icon: FileText,
  },
  {
    id: "sih",
    title: "Smart India Hackathon – Internal Round",
    description:
      "Cleared the internal selection round of Smart India Hackathon 2024, representing the college with a smart water management IoT solution.",
    year: "2024",
    accentColor: "#34d399",
    icon: Award,
  },
];

function AchievementCard({
  entry,
  index,
}: {
  entry: AchievementEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = entry.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative rounded-2xl border overflow-hidden flex flex-col"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 100%)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
    >
      {/* Corner glow */}
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${entry.accentColor}12 0%, transparent 70%)`,
          filter: "blur(24px)",
        }}
      />

      {/* Accent top stripe */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, ${entry.accentColor}, ${entry.accentColor}20, transparent)`,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.15 + 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${entry.accentColor}35` }}
      />

      <div className="p-7 flex flex-col h-full relative z-10">
        {/* Icon */}
        <motion.div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative"
          style={{
            background: `${entry.accentColor}12`,
            border: `1px solid ${entry.accentColor}25`,
            boxShadow: `0 0 24px ${entry.accentColor}10`,
          }}
          whileHover={{ rotate: 6, scale: 1.08, transition: { duration: 0.2 } }}
        >
          {/* Inner shimmer */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `linear-gradient(135deg, transparent 30%, ${entry.accentColor}20 50%, transparent 70%)`,
            }}
          />
          <Icon
            size={26}
            strokeWidth={1.6}
            style={{ color: entry.accentColor }}
            className="relative z-10"
          />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white leading-tight mb-3">
          {entry.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-white/50 leading-relaxed flex-1">
          {entry.description}
        </p>

        {/* Year pill + pulse dot */}
        <div className="flex items-center justify-between pt-5 mt-5 border-t border-white/5">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-black tracking-[0.15em] uppercase px-3 py-1.5 rounded-full"
            style={{
              background: `${entry.accentColor}10`,
              border: `1px solid ${entry.accentColor}25`,
              color: entry.accentColor,
            }}
          >
            <Calendar size={9} />
            {entry.year}
          </span>

          {/* Animated pulse dot */}
          <motion.div
            className="w-2 h-2 rounded-full"
            style={{ background: entry.accentColor }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.4,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Achievements() {
  return (
    <section
      id="achievements"
      aria-label="Achievements section"
      className="relative overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(237,114,42,0.3), transparent)",
        }}
      />

      {/* BG glows */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(129,140,248,0.04) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(52,211,153,0.03) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container section">
        <SectionHeader
          tag="Achievements"
          tagIcon={<Trophy size={12} />}
          title="Milestones &"
          highlight="Recognition"
          subtitle="Highlights from hackathons, conferences, and competitions that pushed my boundaries."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ACHIEVEMENTS_DATA.map((entry, i) => (
            <AchievementCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
