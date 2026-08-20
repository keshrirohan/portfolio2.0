"use client";

import * as React from "react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const cursorDotRef = React.useRef<HTMLDivElement>(null);
  const cursorRingRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Disable on touch devices or reduced motion
    const mediaQueryTouch = window.matchMedia("(pointer: coarse)");
    const mediaQueryMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQueryTouch.matches || mediaQueryMotion.matches) {
      return;
    }

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    const xDotSetter = gsap.quickSetter(dot, "x", "px");
    const yDotSetter = gsap.quickSetter(dot, "y", "px");

    let mouseX = -100;
    let mouseY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      xDotSetter(mouseX);
      yDotSetter(mouseY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Smooth lerp animation for the outer ring using GSAP ticker
    const tickerCallback = () => {
      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    gsap.ticker.add(tickerCallback);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-primary rounded-full pointer-events-none z-50 hidden md:block opacity-75"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-primary/40 rounded-full pointer-events-none z-50 hidden md:block transition-transform duration-75"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
