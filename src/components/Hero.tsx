"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Download, Mail, Terminal as TerminalIcon, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

const TOTAL_FRAMES = 120;

function getFrameUrl(index: number) {
  const frameNumber = String(index + 1).padStart(3, "0");
  return `/ezgif-3ac0533ccbf2f23b-jpg/ezgif-frame-${frameNumber}.jpg`;
}

export function Hero() {
  const containerRef = React.useRef<HTMLElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);
  const descRef = React.useRef<HTMLParagraphElement>(null);
  const badgesRef = React.useRef<HTMLDivElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);
  const terminalRef = React.useRef<HTMLDivElement>(null);

  const imagesRef = React.useRef<HTMLImageElement[]>([]);
  const currentFrameRef = React.useRef<number>(0);

  const coreTech = [
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "TypeScript",
  ];

  const drawFrame = React.useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
    currentFrameRef.current = clampedIndex;

    let img = imagesRef.current[clampedIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Fallback search for nearest loaded frame
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const prev = clampedIndex - offset;
        if (prev >= 0 && imagesRef.current[prev]?.complete && imagesRef.current[prev].naturalWidth > 0) {
          img = imagesRef.current[prev];
          break;
        }
        const next = clampedIndex + offset;
        if (next < TOTAL_FRAMES && imagesRef.current[next]?.complete && imagesRef.current[next].naturalWidth > 0) {
          img = imagesRef.current[next];
          break;
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const imgRatio = imgWidth / imgHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    // Apply ~10% zoom to crop right-bottom watermark completely
    const zoom = 1.10;
    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;

    if (canvasRatio > imgRatio) {
      drawHeight = (canvasWidth / imgRatio) * zoom;
      drawWidth = canvasWidth * zoom;
    } else {
      drawWidth = (canvasHeight * imgRatio) * zoom;
      drawHeight = canvasHeight * zoom;
    }

    // Shift image right so the portrait sits on the right half of the hero
    // and push the bottom-right corner (watermark) outside the canvas bounds
    let offsetX = (canvasWidth - drawWidth) / 2 + canvasWidth * 0.15;
    let offsetY = (canvasHeight - drawHeight) / 2 - canvasHeight * 0.05;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  const updateCanvasSize = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const width = canvas.offsetWidth;
    const height = canvas.offsetHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Frame preloading and GSAP ScrollTrigger scroll scrubbing
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;

    const onFirstLoad = () => {
      updateCanvasSize();
      drawFrame(0);
    };

    if (firstImg.complete) {
      onFirstLoad();
    } else {
      firstImg.onload = onFirstLoad;
    }

    // Preload remaining frames asynchronously
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (Math.round(currentFrameRef.current) === i) {
          drawFrame(i);
        }
      };
      images[i] = img;
    }

    window.addEventListener("resize", updateCanvasSize);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return () => {
        window.removeEventListener("resize", updateCanvasSize);
      };
    }

    let ctx: gsap.Context | null = null;

    ctx = gsap.context(() => {
      const frameTarget = { frame: 0 };

      gsap.to(frameTarget, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const targetFrame = self.progress * (TOTAL_FRAMES - 1);
            requestAnimationFrame(() => drawFrame(targetFrame));
          },
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (ctx) ctx.revert();
    };
  }, [drawFrame, updateCanvasSize]);

  // Entrance animations for Hero content
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
      {/* Background Frame Sequence Canvas - z-0 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 motion-reduce:hidden"
        aria-hidden="true"
      />

      {/* Layered Gradient Overlay - z-10 */}
      {/* Horizontal: Darker on left (behind content), clear on right (showing face) */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      {/* Vertical: Subtle vignette top & smooth fade to solid background at bottom */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Hero Content - z-20 */}
      <div className="container relative z-20 max-w-6xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center lg:items-start lg:text-left">
        {/* Availability status badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-medium mb-6 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Available for Full Stack Opportunities</span>
        </div>

        {/* Main Heading */}
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-2xl leading-[1.1] mb-5"
        >
          <span className="text-foreground">Full Stack Developer</span>
        </h1>

        {/* Professional Summary */}
        <p
          ref={descRef}
          className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-lg font-normal leading-relaxed mb-6"
        >
          {profile.summary}
        </p>

        {/* Core Stack Badges */}
        <div
          ref={badgesRef}
          className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8 max-w-lg"
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
          className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 w-full sm:w-auto mb-10"
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
          className="w-full max-w-md rounded-lg border border-border/60 bg-card/40 backdrop-blur-md p-3.5 text-left shadow-lg overflow-hidden font-mono text-[11px] text-muted-foreground/90 opacity-90 hover:opacity-100 transition-opacity"
        >
          <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-border/30">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/70" />
              <div className="w-2 h-2 rounded-full bg-amber-500/70" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/60 ml-2">
              <TerminalIcon className="w-3 h-3" />
              <span>rohan-keshri.config.ts</span>
            </div>
          </div>
          <div className="space-y-0.5 leading-snug">
            <p className="text-primary font-medium">
              const developer = &#123;
            </p>
            <p className="pl-3">
              name: <span className="text-emerald-400/90">&quot;Rohan Keshri&quot;</span>,
            </p>
            <p className="pl-3">
              role: <span className="text-amber-300/90">&quot;Full Stack Engineer&quot;</span>,
            </p>
            <p className="pl-3">
              leetcodeSolved: <span className="text-sky-300/90">140</span>,
            </p>
            <p className="pl-3">
              githubStreak: <span className="text-purple-300/90">&quot;100+ Days&quot;</span>,
            </p>
            <p className="pl-3">
              status: <span className="text-emerald-400/90">&quot;Building scalable products&quot;</span>
            </p>
            <p className="text-primary font-medium">&#125;;</p>
          </div>
        </div>
      </div>
    </section>
  );
}
