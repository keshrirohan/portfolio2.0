import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: "button" | "a";
  href?: string;
  download?: boolean | string;
  icon?: React.ReactNode;
  iconRight?: boolean;
  children: React.ReactNode;
}

const sizeMap: Record<ButtonSize, string> = {
  sm: "px-3.5 py-2 text-xs gap-1.5",
  md: "px-5 py-2.5 text-sm gap-2",
  lg: "px-7 py-3.5 text-sm gap-2.5",
};

const variantMap: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  ghost:   "btn btn-ghost",
};

export default function Button({
  variant = "primary",
  size = "md",
  as: Tag = "button",
  href,
  download,
  icon,
  iconRight = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const cls = `${variantMap[variant]} ${sizeMap[size]} ${className}`;

  if (Tag === "a" || href) {
    return (
      <a
        href={href}
        download={download}
        className={cls}
      >
        {!iconRight && icon}
        {children}
        {iconRight && icon}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {!iconRight && icon}
      {children}
      {iconRight && icon}
    </button>
  );
}
