import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "filled" | "glass";
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const paddingMap = {
  sm: "p-4",
  md: "p-5 sm:p-6",
  lg: "p-6 sm:p-8",
};

export default function Card({
  variant = "default",
  hover = true,
  padding = "md",
  className = "",
  children,
  ...props
}: CardProps) {
  const base =
    variant === "filled"
      ? "card-filled"
      : variant === "glass"
      ? "glass"
      : "card";

  return (
    <div
      className={`${base} ${paddingMap[padding]} ${hover ? "" : "hover:transform-none hover:shadow-none"} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
