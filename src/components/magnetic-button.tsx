"use client";

import Link from "next/link";
import { type ComponentPropsWithoutRef, type MouseEvent, useState } from "react";

type MagneticButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function MagneticButton({
  className = "",
  variant = "primary",
  children,
  ...props
}: MagneticButtonProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({
      x: (event.clientX - rect.left - rect.width / 2) * 0.18,
      y: (event.clientY - rect.top - rect.height / 2) * 0.18,
    });
  };

  const variants = {
    primary:
      "border-cyan-300/60 bg-cyan-300 text-slate-950 shadow-[0_0_36px_rgba(34,211,238,0.35)] hover:bg-white",
    secondary:
      "border-purple-300/50 bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] hover:bg-white/15",
    ghost:
      "border-white/15 bg-transparent text-white/85 hover:border-cyan-300/50 hover:text-white",
  };

  return (
    <Link
      {...props}
      data-cursor="magnetic"
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-md border px-5 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {children}
    </Link>
  );
}
