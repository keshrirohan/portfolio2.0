// This component hides the default mouse cursor and replaces it with a custom animated one.
// It consists of two parts: a larger outer ring that follows the mouse with a slight lag,
// and a small inner dot that snaps to the cursor position immediately.
"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

export default function CustomCursor() {
  // cursorRef points to the outer ring element — the large circle that lags behind the mouse
  const cursorRef = useRef<HTMLDivElement>(null);
  // dotRef points to the inner dot — the tiny circle that sits exactly at the mouse position
  const dotRef    = useRef<HTMLDivElement>(null);

  // visible: whether to show the cursor at all (hidden when the mouse leaves the window)
  const [visible,  setVisible]  = useState(false);
  // clicking: true while the mouse button is held down — shrinks both ring and dot
  const [clicking, setClicking] = useState(false);
  // hovering: true when the cursor is over a clickable element — changes color and enlarges the ring
  const [hovering, setHovering] = useState(false);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    // Touch screens (phones/tablets) use a finger, not a mouse — skip custom cursor on those devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    // rafId holds the ID of the current animation frame so we can cancel it on cleanup
    let rafId: number;
    // mouseX/Y track the real mouse position, updated instantly on every mouse move
    let mouseX = 0, mouseY = 0;
    // dotX/Y track where the inner dot currently is — snaps directly to mouseX/Y (no lag)
    let dotX   = 0, dotY   = 0;
    // cursorX/Y track where the outer ring currently is — moves toward mouseX/Y slowly (laggy)
    let cursorX = 0, cursorY = 0;

    const onMove  = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; setVisible(true); };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown  = () => setClicking(true);
    const onUp    = () => setClicking(false);

    // INTERACTIVE lists the types of elements that should trigger the "hovering" state
    // (links, buttons, inputs, etc.) — cursor turns orange and ring grows on these elements
    const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, [tabindex]";
    const onOver = (e: MouseEvent) => { if ((e.target as Element)?.closest(INTERACTIVE)) setHovering(true);  };
    const onOut  = (e: MouseEvent) => { if ((e.target as Element)?.closest(INTERACTIVE)) setHovering(false); };

    // animate runs every frame (~60 times per second) to move the cursor elements smoothly.
    // The dot moves at factor 1 (instant), while the ring moves at 0.12 — only 12% of the
    // remaining distance each frame — creating the smooth "lagging behind" follow effect.
    const animate = () => {
      dotX    += (mouseX - dotX)    * 1;    // dot snaps instantly to the mouse
      dotY    += (mouseY - dotY)    * 1;
      cursorX += (mouseX - cursorX) * 0.12; // ring eases slowly toward the mouse (laggy feel)
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

    // Clean up all listeners and stop the animation loop when the component unmounts
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

  // ringColor: orange when over an interactive element, otherwise a semi-transparent
  // white (dark mode) or black (light mode) so it always contrasts with the background
  const ringColor = hovering
    ? "#ed722a"
    : isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)";

  // dotColor: same logic — orange when hovering, otherwise a solid contrast color
  const dotColor = hovering
    ? "#ed722a"
    : isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.75)";

  return (
    <>
      {/* Outer ring — the large circle that lazily follows the mouse.
          It grows bigger on hover and shrinks when clicking. */}
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
            // scale changes based on state: smaller when clicking, bigger when hovering
            transform: clicking ? "scale(0.75)" : hovering ? "scale(1.5)" : "scale(1)",
            transition: "transform 0.2s, border-color 0.2s",
            background: hovering ? "rgba(237,114,42,0.06)" : "transparent",
          }}
        />
      </div>
      {/* Inner dot — the tiny circle that sits precisely at the mouse pointer.
          It shrinks slightly when the mouse button is held down. */}
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
