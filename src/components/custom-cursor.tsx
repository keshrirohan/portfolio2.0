"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const enter = (event: Event) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, [data-cursor='magnetic']")));
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", enter);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", enter);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 ${
          active
            ? "size-20 border border-cyan-300/50 bg-cyan-300/10 shadow-[0_0_60px_rgba(34,211,238,0.45)]"
            : "size-9 border border-white/25 bg-white/5 shadow-[0_0_35px_rgba(124,58,237,0.35)]"
        }`}
      />
    </div>
  );
}
