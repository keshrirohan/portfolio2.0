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
  const currentFrameRef = React.useRef<number>(TOTAL_FRAMES - 1);

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

    // Use CSS pixel dimensions for layout calculations
    const canvasWidth = canvas.offsetWidth || canvas.width;
    const canvasHeight = canvas.offsetHeight || canvas.height;
    if (canvasWidth === 0 || canvasHeight === 0) return;

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const isDesktopLarge = canvasWidth >= 1200;
    const isLaptop = canvasWidth >= 1024 && canvasWidth < 1200;
    const isTablet = canvasWidth >= 768 && canvasWidth < 1024;
    const isMobile = canvasWidth < 768;

    // Full-Screen COVER Scale
    const scaleX = canvasWidth / imgWidth;
    const scaleY = canvasHeight / imgHeight;
    const scale = Math.max(scaleX, scaleY);

    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    // Face center in source frame is located at ~45% of image width
    const faceImageX = imgWidth * 0.45;
    const faceScaledX = faceImageX * scale;

    // Target face center X coordinate per breakpoint to guarantee zero overlap
    let targetRatio = 0.68;
    if (isDesktopLarge) {
      targetRatio = 0.68;
    } else if (isLaptop) {
      targetRatio = 0.75;
    } else if (isTablet) {
      targetRatio = 0.78;
    } else if (isMobile) {
      targetRatio = 0.85;
    }

    const targetFaceCanvasX = canvasWidth * targetRatio;
    const offsetX = targetFaceCanvasX - faceScaledX;

    // Vertical positioning: center vertically with top bias to preserve top of head
    let offsetY = (canvasHeight - drawHeight) * 0.25;
    if (offsetY + drawHeight < canvasHeight) offsetY = canvasHeight - drawHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Frame preloading and GSAP ScrollTrigger scroll scrubbing
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    imagesRef.current = images;

    // Load initial frame (TOTAL_FRAMES - 1) immediately for reversed playback
    const initialIndex = TOTAL_FRAMES - 1;
    const firstImg = new Image();
    firstImg.src = getFrameUrl(initialIndex);
    images[initialIndex] = firstImg;

    const onFirstLoad = () => {
      updateCanvasSize();
      drawFrame(initialIndex);
    };

    if (firstImg.complete) {
      onFirstLoad();
    } else {
      firstImg.onload = onFirstLoad;
    }

    // Preload remaining frames asynchronously
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      if (i === initialIndex) continue;
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
      const frameTarget = { frame: TOTAL_FRAMES - 1 };

      gsap.to(frameTarget, {
        frame: 0,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const targetFrame = (1 - self.progress) * (TOTAL_FRAMES - 1);
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
      className="relative min-h-[92vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden bg-background"
    >
      {/* Background Frame Sequence Canvas (Full-Screen Cover) - z-0 */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 motion-reduce:hidden"
        aria-hidden="true"
      />

      {/* Dark Gradient Overlay - z-10 */}
      {/* Horizontal split gradient for text contrast across all screen sizes */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/95 via-50% md:via-48% to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />
      {/* Top & bottom vignettes */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* Hero Content Container - z-20 */}
      <div className="container relative z-20 max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-14 xl:px-20 flex items-center min-h-[80vh]">
        {/* Content Zone: Strictly bounded per breakpoint to guarantee zero portrait overlap */}
        <div className="w-full md:w-[46%] lg:w-[42%] xl:w-[40%] max-w-[340px] xs:max-w-[400px] sm:max-w-[440px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[620px] flex flex-col items-start text-left py-6 sm:py-8">
          {/* Availability status badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] sm:text-xs font-medium mb-3 sm:mb-5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Available for Full Stack Opportunities</span>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.1] mb-3 sm:mb-5 text-foreground max-w-[580px]"
          >
            Full Stack Developer
          </h1>

          {/* Professional Summary */}
          <p
            ref={descRef}
            className="text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg max-w-[560px] font-normal leading-relaxed mb-4 sm:mb-6"
          >
            {profile.summary}
          </p>

          {/* Core Stack Badges */}
          <div
            ref={badgesRef}
            className="flex flex-wrap items-center justify-start gap-1 sm:gap-2 mb-5 sm:mb-8 max-w-[560px]"
          >
            {coreTech.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono font-medium rounded-md border border-border/60 bg-secondary/60 hover:bg-secondary transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-start gap-2.5 sm:gap-3 w-full sm:w-auto mb-5 sm:mb-8 max-w-[560px]"
          >
            <Link
              href="#projects"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto rounded-full gap-2 px-5 sm:px-6 font-semibold shadow-sm text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              <span>View Projects</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            <Link
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full sm:w-auto rounded-full gap-2 px-5 sm:px-6 font-semibold text-xs sm:text-sm focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Contact Me</span>
            </Link>

            <a
              href="#contact"
              className={cn(
                buttonVariants({ size: "lg", variant: "ghost" }),
                "w-full sm:w-auto rounded-full gap-2 px-5 sm:px-6 font-medium text-xs sm:text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary"
              )}
            >
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Resume</span>
            </a>
          </div>

          {/* Developer Terminal Code Snippet Preview */}
          <div
            ref={terminalRef}
            className="hidden md:block w-full max-w-[440px] lg:max-w-[500px] rounded-lg border border-border/60 bg-card/50 backdrop-blur-md p-3 sm:p-3.5 text-left shadow-lg overflow-hidden font-mono text-[10px] sm:text-[11px] text-muted-foreground/90 opacity-90 hover:opacity-100 transition-opacity"
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
      </div>
    </section>
  );
}
