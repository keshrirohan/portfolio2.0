"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { ParticlesProvider, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion, useMotionValue, useSpring, type Transition } from "framer-motion";
import { Download, Mail, ArrowDown, Code2, Database, Globe, Layers, Cpu, Zap, GitBranch, Box } from "lucide-react";
import type { Engine } from "@tsparticles/engine";
import type { ISourceOptions } from "@tsparticles/engine";

/* ─────────────────────────────────────────────────────
   Particle Config
───────────────────────────────────────────────────── */
const particlesOptions: ISourceOptions = {
  id: "hero-particles",
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" },
    },
    modes: {
      grab: { distance: 160, links: { opacity: 0.5 } },
      push: { quantity: 3 },
    },
  },
  particles: {
    color: { value: ["#ed722a", "#f59150", "#ffffff", "#c45f1f"] },
    links: {
      color: "#ed722a",
      distance: 130,
      enable: true,
      opacity: 0.08,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
    number: { density: { enable: true }, value: 90 },
    opacity: { value: { min: 0.05, max: 0.35 }, animation: { enable: true, speed: 0.8 } },
    shape: { type: "circle" },
    size: { value: { min: 1, max: 2.5 } },
  },
  detectRetina: true,
  background: { color: "transparent" },
};

/* ─────────────────────────────────────────────────────
   Floating Tech Icons
───────────────────────────────────────────────────── */
const TECH_ICONS = [
  { icon: Code2,    label: "React",    color: "#61DAFB", delay: 0,    x: "10%",  y: "20%" },
  { icon: Globe,    label: "Next.js",  color: "#ffffff", delay: 0.4,  x: "85%",  y: "15%" },
  { icon: Database, label: "MongoDB",  color: "#47A248", delay: 0.8,  x: "8%",   y: "65%" },
  { icon: Layers,   label: "Node.js",  color: "#339933", delay: 0.2,  x: "90%",  y: "60%" },
  { icon: Cpu,      label: "TypeScript", color: "#3178C6", delay: 1.2, x: "18%", y: "82%" },
  { icon: Zap,      label: "Tailwind", color: "#38BDF8", delay: 0.6,  x: "80%",  y: "80%" },
  { icon: GitBranch,label: "Git",      color: "#F05032", delay: 1.0,  x: "50%",  y: "8%"  },
  { icon: Box,      label: "Docker",   color: "#2496ED", delay: 1.4,  x: "50%",  y: "90%" },
];

interface FloatingIconProps {
  icon: React.ElementType;
  label: string;
  color: string;
  delay: number;
  x: string;
  y: string;
}

function FloatingIcon({ icon: Icon, label, color, delay, x, y }: FloatingIconProps) {
  return (
    <motion.div
      className="absolute hidden lg:flex flex-col items-center gap-1 select-none pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6, type: "spring", stiffness: 200 },
        y: { delay, duration: 3.5 + delay * 0.5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div
        className="relative p-2.5 rounded-xl glass border"
        style={{
          borderColor: `${color}22`,
          boxShadow: `0 0 20px ${color}15`,
          background: `${color}08`,
        }}
      >
        <Icon size={20} style={{ color }} strokeWidth={1.5} />
        <div
          className="absolute inset-0 rounded-xl opacity-20"
          style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)` }}
        />
      </div>
      <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: `${color}99` }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Typing Animation Hook
───────────────────────────────────────────────────── */
const TITLES = [
  "Software Engineer",
  "MERN Stack Developer",
  "Full Stack Developer",
  "Next.js Specialist",
  "React Developer",
];

function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];

    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), pauseMs);
      return () => clearTimeout(t);
    }

    if (!isDeleting && displayed === current) {
      setIsPaused(true);
      setIsDeleting(true);
      return;
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const next = isDeleting
      ? current.slice(0, displayed.length - 1)
      : current.slice(0, displayed.length + 1);

    const t = setTimeout(() => setDisplayed(next), speed);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
}

/* ─────────────────────────────────────────────────────
   Magnetic Button
───────────────────────────────────────────────────── */
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  href?: string;
  onClick?: () => void;
  id?: string;
  download?: boolean | string;
}

function MagneticButton({ children, className = "", style, href, onClick, id, download }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const baseStyle = { x: springX, y: springY, ...style };

  const motionProps = {
    ref: ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>,
    style: baseStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.95 },
    className,
  };

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        id={id}
        download={download}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      onClick={onClick}
      id={id}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────────
   Scroll Indicator
───────────────────────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6 }}
    >
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/30">Scroll</span>
      <motion.div
        className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
        animate={{ borderColor: ["rgba(255,255,255,0.15)", "rgba(237,114,42,0.5)", "rgba(255,255,255,0.15)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1 h-2 rounded-full bg-[#ed722a]"
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <ArrowDown size={14} className="text-white/30 animate-bounce" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Glow Orbs
───────────────────────────────────────────────────── */
function GlowOrbs() {
  return (
    <>
      {/* Top-left orange orb */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(237,114,42,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Bottom-right subtle orb */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(237,114,42,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Center glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(237,114,42,0.04) 0%, transparent 60%)",
          filter: "blur(20px)",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────
   Particles Background Wrapper (client-only)
───────────────────────────────────────────────────── */
function ParticlesBg() {
  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        id="hero-particles"
        options={particlesOptions}
        className="absolute inset-0 w-full h-full"
      />
    </ParticlesProvider>
  );
}

/* ─────────────────────────────────────────────────────
   Stats Row
───────────────────────────────────────────────────── */
const STATS = [
  { value: "2+",  label: "Years Exp." },
  { value: "15+", label: "Projects" },
  { value: "5+",  label: "Tech Stack" },
];

function StatsRow() {
  return (
    <motion.div
      className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.6 }}
    >
      {STATS.map((stat, i) => (
        <div key={i} className="flex items-center gap-2">
          {i > 0 && <div className="w-px h-8 bg-white/10 hidden sm:block" />}
          <div className="text-center">
            <p className="text-2xl font-black tracking-tight" style={{ color: "#ed722a" }}>{stat.value}</p>
            <p className="text-xs font-medium tracking-widest uppercase text-white/40">{stat.label}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Main Hero Section
───────────────────────────────────────────────────── */
export default function Hero() {
  const typedTitle = useTypingEffect(TITLES);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /* Entrance animation variants */
  const itemTransition: Transition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: itemTransition },
  };

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-background)" }}
    >
      {/* Particle background — client only to avoid SSR issues */}
      {mounted && <ParticlesBg />}

      {/* Glow orbs */}
      <GlowOrbs />

      {/* Floating tech icons */}
      {TECH_ICONS.map((t) => (
        <FloatingIcon key={t.label} {...t} />
      ))}

      {/* ── Main Content ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-4xl mx-auto w-full py-10 sm:py-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Available badge */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#ed722a]/20 bg-[#ed722a]/8 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ed722a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ed722a]" />
            </span>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-[#ed722a]">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={item}
          className="text-4xl sm:text-6xl lg:text-8xl font-black tracking-tight leading-none mb-3 sm:mb-4"
        >
          <span className="block text-white">Rohan</span>
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #ed722a 0%, #f59150 50%, #ed722a 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s linear infinite",
            }}
          >
            Keshri
          </span>
        </motion.h1>

        {/* Typing subtitle */}
        <motion.div
          variants={item}
          className="h-10 sm:h-12 flex items-center justify-center mb-6"
          aria-label="Animated job title"
        >
          <span className="text-lg sm:text-2xl font-semibold text-white/60 font-mono tracking-wide">
            {`< `}
            <span className="text-[#ed722a]">{typedTitle}</span>
            <span className="inline-block w-0.5 h-5 sm:h-6 ml-0.5 bg-[#ed722a] align-middle animate-pulse" />
            {` />`}
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={item}
          className="text-sm sm:text-base md:text-lg text-white/50 max-w-xl leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0"
        >
          Crafting{" "}
          <span className="text-white/80 font-medium">scalable, performant</span> web experiences
          with modern technologies. Passionate about clean code, great UX, and{" "}
          <span className="text-[#ed722a] font-medium">shipping products</span> people love.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-4 items-center justify-center"
        >
          {/* Primary — Download Resume */}
          <MagneticButton
            id="hero-download-resume"
            href="/resume.pdf"
            download="Rohan_Keshri_Resume.pdf"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #ed722a 0%, #c45f1f 100%)",
              boxShadow: "0 0 30px rgba(237,114,42,0.35)",
            } as React.CSSProperties}
          >
            {/* Shimmer overlay */}
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1.5s infinite",
              }}
            />
            <Download size={16} strokeWidth={2.5} className="relative z-10" />
            <span className="relative z-10">Download Resume</span>
          </MagneticButton>

          {/* Secondary — Contact Me */}
          <MagneticButton
            id="hero-contact-me"
            href="#contact"
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 border"
            style={{
              borderColor: "rgba(237,114,42,0.4)",
              color: "#ed722a",
              background: "rgba(237,114,42,0.05)",
            } as React.CSSProperties}
          >
            <Mail size={16} strokeWidth={2.5} />
            <span>Contact Me</span>
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <StatsRow />
      </motion.div>

      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-background) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
