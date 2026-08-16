"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className }: GridBackgroundProps = {}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<SVGSVGElement>(null);

  React.useEffect(() => {
    const mediaQueryTouch = window.matchMedia("(pointer: coarse)");
    const mediaQueryMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQueryTouch.matches || mediaQueryMotion.matches) {
      return;
    }

    const grid = gridRef.current;
    const container = containerRef.current;
    if (!grid || !container) return;

    // Parallax effect restricted to the Hero section scroll
    const ctx = gsap.context(() => {
      gsap.to(grid, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 pointer-events-none z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Ambient Radial Glow centered in Hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-primary/[0.08] dark:bg-primary/[0.14] rounded-full blur-[130px]" />

      {/* Grid Pattern SVG with Vertical Fade Out Mask */}
      <svg
        ref={gridRef}
        className="absolute inset-0 w-full h-[125%] stroke-foreground/[0.12] dark:stroke-foreground/[0.16] [mask-image:linear-gradient(to_bottom,#000_30%,rgba(0,0,0,0.6)_60%,transparent_100%)]"
        style={{ willChange: "transform" }}
      >
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            x="0"
            y="0"
          >
            <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
      </svg>
    </div>
  );
}
