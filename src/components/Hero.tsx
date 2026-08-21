"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GridBackground } from "@/components/GridBackground";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const containerRef = React.useRef<HTMLElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const descRef = React.useRef<HTMLParagraphElement>(null);
  const badgesRef = React.useRef<HTMLDivElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);
  const terminalRef = React.useRef<HTMLDivElement>(null);

  const coreTech = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "TypeScript",
  ];

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          headingRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          badgesRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          terminalRef.current,
          { opacity: 0, y: 30, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "expo.out" },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Hero-Scoped Grid & Ambient Glow */}
      <GridBackground />

      <div className="container max-w-5xl mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        {/* Badge status */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Available for Full Stack Opportunities</span>
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6"
        >
          <span className="text-foreground">Full Stack Developer</span>
        </h1>

        {/* Professional Summary */}
        <p
          ref={descRef}
          className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed mb-8"
        >
          {profile.summary}
        </p>

        {/* Core Stack Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-xl"
        >
          {coreTech.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="px-3 py-1 text-xs font-mono font-medium rounded-md border border-border/60 bg-secondary/60 hover:bg-secondary transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-16"
        >
          <Link
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full sm:w-auto rounded-full gap-2 px-6 font-semibold shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "w-full sm:w-auto rounded-full gap-2 px-6 font-semibold focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </Link>

          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg", variant: "ghost" }),
              "w-full sm:w-auto rounded-full gap-2 px-6 font-medium text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            <Download className="w-4 h-4" />
            <span>Resume</span>
          </a>
        </div>

        {/* Developer Terminal Code Snippet Preview */}
        <div
          ref={terminalRef}
          className="w-full max-w-xl rounded-xl border border-border/80 bg-card/60 backdrop-blur-md p-4 text-left shadow-2xl overflow-hidden font-mono text-xs text-muted-foreground"
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border/40">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/70 ml-2">
              <TerminalIcon className="w-3 h-3" />
              <span>rohan-keshri.config.ts</span>
            </div>
          </div>
          <div className="space-y-1 leading-relaxed">
            <p className="text-primary font-semibold">
              const developer = &#123;
            </p>
            <p className="pl-4">
              name: <span className="text-emerald-400">&quot;Rohan Keshri&quot;</span>,
            </p>
            <p className="pl-4">
              role: <span className="text-amber-300">&quot;Full Stack Engineer&quot;</span>,
            </p>
            <p className="pl-4">
              leetcodeSolved: <span className="text-sky-300">140</span>,
            </p>
            <p className="pl-4">
              githubStreak: <span className="text-purple-300">&quot;100+ Days&quot;</span>,
            </p>
            <p className="pl-4">
              status: <span className="text-emerald-400">&quot;Building scalable products&quot;</span>
            </p>
            <p className="text-primary font-semibold">&#125;;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
