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
// This object controls how the floating dot particles look and behave in the background
const particlesOptions: ISourceOptions = {
  // A unique name so the library knows which particle canvas to target
  id: "hero-particles",

  // Caps the animation at 60 frames per second to avoid wasting CPU/GPU power
  fpsLimit: 60,

  // Defines what happens when the user moves their mouse over the canvas
  interactivity: {
    events: {
      // "grab" means hovering the mouse will draw lines connecting nearby particles
      onHover: { enable: true, mode: "grab" },
    },
    modes: {
      // When grabbing, connect particles within 160px and use 50% opacity lines
      grab: { distance: 160, links: { opacity: 0.5 } },
      // When clicking, add 3 new particles to the canvas
      push: { quantity: 3 },
    },
  },

  particles: {
    // Each particle randomly picks one of these colors (orange tones + white)
    color: { value: ["#ed722a", "#f59150", "#ffffff", "#c45f1f"] },

    // Lines drawn between nearby particles — orange tint, very faint (opacity 0.08)
    links: {
      color: "#ed722a",
      distance: 130,   // only connect particles that are within 130px of each other
      enable: true,
      opacity: 0.08,   // nearly invisible so they don't overpower the page
      width: 1,
    },

    // Controls how particles drift around the canvas
    move: {
      enable: true,
      speed: 0.6,             // very slow drift so it feels calm and ambient
      direction: "none",      // no fixed direction — each particle goes its own way
      random: true,           // randomise starting direction
      straight: false,        // allow curved, organic paths
      outModes: { default: "bounce" }, // bounce off edges instead of disappearing
    },

    // 90 particles total; "density" makes the count scale with canvas size
    number: { density: { enable: true }, value: 90 },

    // Each particle fades between 5% and 35% opacity and that opacity slowly pulses
    opacity: { value: { min: 0.05, max: 0.35 }, animation: { enable: true, speed: 0.8 } },

    // Particle shape is a plain circle
    shape: { type: "circle" },

    // Particle radius between 1px and 2.5px — tiny so they look like dust/stars
    size: { value: { min: 1, max: 2.5 } },
  },

  // Render sharper particles on high-DPI (Retina) screens
  detectRetina: true,

  // Transparent so the page background shows through
  background: { color: "transparent" },
};

/* ─────────────────────────────────────────────────────
   Floating Tech Icons
───────────────────────────────────────────────────── */
// Each entry describes one floating icon that orbits around the hero section
// icon  = the Lucide icon component to render
// label = the short tech name shown beneath the icon
// color = the brand/accent color used for the icon and glow
// delay = how many seconds to wait before the icon animates in (staggers the entrance)
// x / y = position on the screen as a percentage (e.g. "10%" from left, "20%" from top)
const TECH_ICONS = [
  { icon: Code2,    label: "React",      color: "#61DAFB", delay: 0,    x: "10%",  y: "20%" },
  { icon: Globe,    label: "Next.js",    color: "#ffffff", delay: 0.4,  x: "85%",  y: "15%" },
  { icon: Database, label: "MongoDB",    color: "#47A248", delay: 0.8,  x: "8%",   y: "65%" },
  { icon: Layers,   label: "Node.js",    color: "#339933", delay: 0.2,  x: "90%",  y: "60%" },
  { icon: Cpu,      label: "TypeScript", color: "#3178C6", delay: 1.2,  x: "18%",  y: "82%" },
  { icon: Zap,      label: "Tailwind",   color: "#38BDF8", delay: 0.6,  x: "80%",  y: "80%" },
  { icon: GitBranch,label: "Git",        color: "#F05032", delay: 1.0,  x: "50%",  y: "8%"  },
  { icon: Box,      label: "Docker",     color: "#2496ED", delay: 1.4,  x: "50%",  y: "90%" },
];

// TypeScript interface — describes the shape of props that FloatingIcon expects
interface FloatingIconProps {
  icon: React.ElementType;
  label: string;
  color: string;
  delay: number;
  x: string;
  y: string;
}

// Renders a single floating tech icon at an absolute position on the hero canvas.
// It fades in, springs to full size, then bobs up and down forever so it feels alive.
// Only shown on large screens (hidden on mobile to avoid clutter).
function FloatingIcon({ icon: Icon, label, color, delay, x, y }: FloatingIconProps) {
  return (
    <motion.div
      // Position the icon absolutely at the x/y coordinates passed in
      className="absolute hidden lg:flex flex-col items-center gap-1 select-none pointer-events-none"
      style={{ left: x, top: y }}
      // Start hidden, tiny, and slightly below its final position
      initial={{ opacity: 0, scale: 0, y: 20 }}
      // Fade in, grow to full size, and then bob between 0 and -10px on the y axis infinitely
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        // Fade in after `delay` seconds, taking 0.6s
        opacity: { delay, duration: 0.6 },
        // Spring into size — stiffness 200 makes the pop feel snappy
        scale: { delay, duration: 0.6, type: "spring", stiffness: 200 },
        // The bobbing loop; icons with a longer delay also bob more slowly for variety
        y: { delay, duration: 3.5 + delay * 0.5, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {/* Glass card that holds the icon, coloured with a faint brand tint */}
      <div
        className="relative p-2.5 rounded-xl glass border"
        style={{
          borderColor: `${color}22`,            // very faint border using the brand color
          boxShadow: `0 0 20px ${color}15`,     // soft glow halo behind the card
          background: `${color}08`,             // barely-visible brand-coloured background
        }}
      >
        {/* The Lucide icon itself, sized 20px and with thin strokes */}
        <Icon size={20} style={{ color }} strokeWidth={1.5} />

        {/* Subtle radial glow overlaid on the card for extra depth */}
        <div
          className="absolute inset-0 rounded-xl opacity-20"
          style={{ background: `radial-gradient(circle, ${color}40 0%, transparent 70%)` }}
        />
      </div>

      {/* Tech name label shown below the icon card */}
      <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: `${color}99` }}>
        {label}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Typing Animation Hook
───────────────────────────────────────────────────── */
// The list of job titles that will be typed out one by one in the hero subtitle
const TITLES = [
  "Software Engineer",
  "MERN Stack Developer",
  "Full Stack Developer",
  "Next.js Specialist",
  "React Developer",
];

// used for typing effect in the hero section
// This hook manages the "typewriter" animation — it types a word, waits, then deletes it and moves on.
// words        = the array of strings to cycle through
// typingSpeed  = milliseconds between each character being added (lower = faster)
// deletingSpeed= milliseconds between each character being removed
// pauseMs      = how long (ms) to wait after a word is fully typed before starting to delete it
function useTypingEffect(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseMs = 1800) {
  // The portion of the current word that is currently visible on screen
  const [displayed, setDisplayed] = useState("");

  // Which word in the array we are currently animating (loops around)
  const [wordIndex, setWordIndex] = useState(0);

  // True while we are removing characters, false while we are adding them
  const [isDeleting, setIsDeleting] = useState(false);

  // True during the pause between finishing typing and starting to delete
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // Get the word we are currently working on (% wraps back to the start when we run out)
    const current = words[wordIndex % words.length];

    // If we are in the pause phase, just wait `pauseMs` milliseconds then resume
    if (isPaused) {
      const t = setTimeout(() => setIsPaused(false), pauseMs);
      return () => clearTimeout(t); // cleanup avoids memory leaks when the component unmounts
    }

    // The whole word has been typed — enter the pause phase and flip to deleting mode
    if (!isDeleting && displayed === current) {
      setIsPaused(true);
      setIsDeleting(true);
      return;
    }

    // The word has been fully deleted — move to the next word and switch back to typing mode
    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setWordIndex((i) => (i + 1) % words.length); // advance index, wrap at end of array
      return;
    }

    // Choose the right speed depending on whether we are typing or deleting
    const speed = isDeleting ? deletingSpeed : typingSpeed;

    // Build the next displayed string — remove one char when deleting, add one when typing
    const next = isDeleting
      ? current.slice(0, displayed.length - 1)   // chop off the last character
      : current.slice(0, displayed.length + 1);  // reveal the next character

    // Schedule the state update after the appropriate delay
    const t = setTimeout(() => setDisplayed(next), speed);
    return () => clearTimeout(t); // cleanup so we don't queue stale updates
  }, [displayed, isDeleting, isPaused, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  // Return the current visible text so the component can render it
  return displayed;
}

/* ─────────────────────────────────────────────────────
   Magnetic Button
───────────────────────────────────────────────────── */
// Props the MagneticButton accepts — it can render as either a <button> or an <a> tag
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  href?: string;       // if provided, renders as a link instead of a button
  onClick?: () => void;
  id?: string;
  download?: boolean | string; // triggers a file download when clicking the link
}

// A button or anchor element that reacts to mouse movement, creating a magnetic effect.
// When you hover near it, the button subtly follows the cursor — making it feel interactive.
function MagneticButton({ children, className = "", style, href, onClick, id, download }: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null); // Ref for the button or anchor element

  // useMotionValue stores a number that Framer Motion can animate without re-rendering React
  const x = useMotionValue(0); // Motion value for the x-axis translation
  const y = useMotionValue(0); // Motion value for the y-axis translation

  // useSpring wraps the raw value with a spring physics simulation so movement feels smooth
  // stiffness = how strong the "snap back" force is; damping = how quickly it settles
  const springX = useSpring(x, { stiffness: 200, damping: 15 }); // Spring animation for smooth x-axis movement
  const springY = useSpring(y, { stiffness: 200, damping: 15 }); // Spring animation for smooth y-axis movement

  // Called every time the mouse moves over the button
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();  // ?. used to avoid TypeScript error if ref.current is null
    if (!rect) return;

    // Find the centre point of the button on screen
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    // Push the button toward the cursor — multiply by 0.3 so it only moves 30% of the distance
    // (a smaller multiplier = subtler magnetic pull)
    x.set((e.clientX - cx) * 0.3);
    y.set((e.clientY - cy) * 0.3);
  }, [x, y]);

  // Called when the mouse leaves — snap the button back to its original position (x=0, y=0)
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Merge the spring values with any extra inline styles passed in from the parent
  const baseStyle = { x: springX, y: springY, ...style };

  // Shared props applied to both the <a> and <button> variants
  const motionProps = {
    ref: ref as React.Ref<HTMLAnchorElement & HTMLButtonElement>,
    style: baseStyle,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    // Slightly shrink the element when clicked so it feels like a real button press
    whileTap: { scale: 0.95 },
    className,
  };

  // If an href was provided, render a magnetic <a> link (e.g. for resume download)
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

  // Otherwise render a magnetic <button> (e.g. for the contact action)
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
// Shows a small animated scroll hint at the bottom of the hero section.
// It fades in after 2.2 seconds (after the main content has appeared),
// then bounces a dot inside a pill shape to hint that the user should scroll down.
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      // Start slightly above and invisible, then slide down and fade in
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6 }}
    >
      {/* "SCROLL" text label above the pill */}
      <span className="text-xs font-medium tracking-[0.2em] uppercase text-white/30">Scroll</span>

      {/* The outer pill shape whose border pulses between white and orange */}
      <motion.div
        className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
        animate={{ borderColor: ["rgba(255,255,255,0.15)", "rgba(237,114,42,0.5)", "rgba(255,255,255,0.15)"] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {/* The small dot inside the pill that slides down then resets — like a scroll wheel */}
        <motion.div
          className="w-1 h-2 rounded-full bg-[#ed722a]"
          animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Arrow icon that bounces using Tailwind's built-in animate-bounce class */}
      <ArrowDown size={14} className="text-white/30 animate-bounce" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   Glow Orbs
───────────────────────────────────────────────────── */
// Renders three large, blurred, coloured circles behind everything else.
// They create a warm ambient glow effect without any real shapes being visible.
// aria-hidden="true" hides them from screen readers because they are purely decorative.
function GlowOrbs() {
  return (
    <>
      {/* Top-left orange orb — the brightest, most noticeable glow */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(237,114,42,0.12) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      {/* Bottom-right subtle orb — dimmer, provides balance on the opposite corner */}
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(237,114,42,0.07) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Center glow — a very faint ellipse behind the hero text to lift it off the background */}
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
// Wraps the tsParticles library in a React component.
// loadSlim loads only the features we need (keeps bundle size small).
// This component is only mounted after hydration (see `mounted` flag in Hero)
// because tsParticles needs a real browser DOM — it won't work during server-side rendering.
function ParticlesBg() {
  // initParticles is called once by the library; we load the "slim" preset into the engine
  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    // ParticlesProvider sets up the engine; Particles renders the actual canvas
    <ParticlesProvider init={initParticles}>
      <Particles
        id="hero-particles"
        options={particlesOptions}  // use the config object defined at the top of this file
        className="absolute inset-0 w-full h-full"
      />
    </ParticlesProvider>
  );
}

/* ─────────────────────────────────────────────────────
   Stats Row
───────────────────────────────────────────────────── */
// Quick summary numbers shown beneath the CTA buttons.
// value = the highlighted number/text  |  label = what it counts
const STATS = [
  { value: "2+",  label: "Years Exp." },
  { value: "15+", label: "Projects" },
  { value: "5+",  label: "Tech Stack" },
];

// Renders the three stat numbers in a horizontal row with dividers between them.
// The whole row slides up and fades in after a 1.6 second delay (after other content settles).
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
          {/* Show a thin vertical divider before every stat except the first one */}
          {i > 0 && <div className="w-px h-8 bg-white/10 hidden sm:block" />}
          <div className="text-center">
            {/* Large bold number in accent orange */}
            <p className="text-2xl font-black tracking-tight" style={{ color: "#ed722a" }}>{stat.value}</p>
            {/* Small uppercase label below the number */}
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
  // Get the currently displayed portion of the typed title string from the hook
  const typedTitle = useTypingEffect(TITLES);

  // `mounted` is false on the server and flips to true after the first browser render.
  // We use it to delay rendering ParticlesBg until the DOM is ready (avoids SSR errors).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Entrance animation variants — these tell Framer Motion how child elements should appear */

  // The transition timing shared by each child item (cubic-bezier ease for a polished feel)
  const itemTransition: Transition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

  // `container` variant: the parent wrapper — it staggers its children 0.08s apart
  // so they don't all animate in at the same time, giving a cascading effect
  const container = {
    hidden: {},  // the parent itself has no animation — only its children do
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  // `item` variant: each child starts invisible and 16px lower, then slides up and fades in
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: itemTransition },
  };

  return (
    <section
      id="home"
      aria-label="Hero section"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Particle background — client only to avoid SSR issues */}
      {mounted && <ParticlesBg />}

      {/* Glow orbs */}
      <GlowOrbs />

      {/* Floating tech icons — one for each technology in TECH_ICONS */}
      {TECH_ICONS.map((t) => (
        <FloatingIcon key={t.label} {...t} />
      ))}

      {/* ── Main Content ── */}
      {/* The motion.div is the stagger container; children animate in one after another */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-5 sm:px-6 max-w-3xl mx-auto w-full py-16 sm:py-20"
        variants={container}   // attach the stagger container variant
        initial="hidden"       // start all children in the "hidden" state
        animate="show"         // animate to the "show" state when mounted
      >
        {/* Available badge — a small pill that shows the user is open to work */}
        <motion.div variants={item}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ed722a]/20 bg-[#ed722a]/8 mb-6">
            {/* Pulsing dot — the outer span pings outward while the inner one stays solid */}
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ed722a] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ed722a]" />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#ed722a]">
              Available for opportunities
            </span>
          </div>
        </motion.div>

        {/* Name — "Rohan" in default foreground colour, "Keshri" with animated shimmer gradient */}
        <motion.h1
          variants={item}
          className="text-[2.75rem] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-3"
          style={{ color: "var(--color-fg)" }}
        >
          <span className="block">Rohan</span>
          {/* The shimmer CSS animation continuously moves the gradient background position,
              making the text appear to glow and shift colour from left to right */}
          <span
            className="block"
            style={{
              background: "linear-gradient(135deg, #ed722a 0%, #f59150 50%, #ed722a 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            Keshri
          </span>
        </motion.h1>

        {/* Typing subtitle — displays the current animated job title from useTypingEffect */}
        <motion.div
          variants={item}
          className="h-9 sm:h-11 flex items-center justify-center mb-5"
          aria-label="Animated job title"
          aria-live="polite"   // tells screen readers to announce changes to this text
        >
          <span className="text-base sm:text-xl font-medium font-mono tracking-wide" style={{ color: "var(--color-fg-muted)" }}>
            {`< `}
            {/* The typed text rendered in orange */}
            <span className="text-[#ed722a] font-semibold">{typedTitle}</span>
            {/* Blinking cursor bar — animate-pulse makes it fade in and out */}
            <span className="inline-block w-0.5 h-4 sm:h-5 ml-0.5 bg-[#ed722a] align-middle animate-pulse" aria-hidden="true" />
            {` />`}
          </span>
        </motion.div>

        {/* Bio — a short paragraph describing the developer's focus and passion */}
        <motion.p
          variants={item}
          className="text-sm sm:text-base max-w-[48ch] leading-[1.8] mb-8 px-0"
          style={{ color: "var(--color-fg-muted)" }}
        >
          Crafting{" "}
          <span className="text-white/80 font-medium">scalable, performant</span> web experiences
          with modern technologies. Passionate about clean code, great UX, and{" "}
          <span className="text-[#ed722a] font-medium">shipping products</span> people love.
        </motion.p>

        {/* CTA Buttons — two magnetic buttons side by side */}
        <motion.div
          variants={item}
          className="flex flex-wrap gap-4 items-center justify-center"
        >
          {/* Primary — Download Resume: solid orange gradient button with a shimmer hover effect */}
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
            {/* Shimmer overlay — a white diagonal stripe that sweeps across on hover */}
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

          {/* Secondary — Contact Me: ghost/outline style button that scrolls to the contact section */}
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

        {/* Stats — years of experience, project count, and tech stack size */}
        <StatsRow />
      </motion.div>

      {/* Scroll indicator — appears last, nudging the user to scroll down */}
      <ScrollIndicator />

      {/* Bottom gradient fade — blends the section into the next one so there's no hard edge */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--color-bg) 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
