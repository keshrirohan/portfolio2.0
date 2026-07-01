"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef    = useRef<HTMLDivElement>(null);
  const [visible,  setVisible]  = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let mouseX = 0, mouseY = 0;
    let dotX   = 0, dotY   = 0;
    let cursorX = 0, cursorY = 0;

    const onMove  = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; setVisible(true); };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [tabindex]";
    const onOver = (e: MouseEvent) => { if ((e.target as Element)?.closest(INTERACTIVE)) setHovering(true);  };
    const onOut  = (e: MouseEvent) => { if ((e.target as Element)?.closest(INTERACTIVE)) setHovering(false); };

    const animate = () => {
      dotX    += (mouseX - dotX)    * 1;
      dotY    += (mouseY - dotY)    * 1;
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      if (dotRef.current)    dotRef.current.style.transform    = `translate(${dotX - 3}px, ${dotY - 3}px)`;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);
    window.addEventListener("mouseover",  onOver);
    window.addEventListener("mouseout",   onOut);
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown",  onDown);
      window.removeEventListener("mouseup",    onUp);
      window.removeEventListener("mouseover",  onOver);
      window.removeEventListener("mouseout",   onOut);
    };
  }, []);

  /* Ring colour — orange when hovering, otherwise contrasts with background */
  const ringColor = hovering
    ? "#ed722a"
    : isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)";

  const dotColor = hovering
    ? "#ed722a"
    : isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.75)";

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[999] pointer-events-none will-change-transform"
        style={{ width: 40, height: 40, opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: `1.5px solid ${ringColor}`,
            transform: clicking ? "scale(0.75)" : hovering ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.2s, border-color 0.2s",
            background: hovering ? "rgba(237,114,42,0.06)" : "transparent",
          }}
        />
      </div>
      {/* Inner dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[999] pointer-events-none will-change-transform"
        style={{
          width: 6, height: 6,
          borderRadius: "50%",
          background: dotColor,
          opacity: visible ? 1 : 0,
          transform: clicking ? "scale(0.6)" : "scale(1)",
          transition: "opacity 0.2s, background 0.2s, transform 0.1s",
        }}
      />
    </>
  );
}
