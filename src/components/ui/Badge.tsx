import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "neutral" | "custom";
  color?: string; // custom hex for custom variant
  className?: string;
  dot?: boolean;
}

export default function Badge({
  children,
  variant = "neutral",
  color,
  className = "",
  dot = false,
}: BadgeProps) {
  const cls =
    variant === "accent"
      ? "badge badge-accent"
      : variant === "custom" && color
      ? "badge"
      : "badge badge-neutral";

  const customStyle =
    variant === "custom" && color
      ? {
          background: `${color}12`,
          border: `1px solid ${color}25`,
          color: color,
        }
      : undefined;

  return (
    <span className={`${cls} ${className}`} style={customStyle}>
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={color ? { backgroundColor: color } : undefined}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
