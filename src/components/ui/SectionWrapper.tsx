import React from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  tag: string;
  title: React.ReactNode;
  subtitle?: string;
  icon?: React.ElementType;
  alt?: boolean; // alternating background
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({
  id,
  tag,
  title,
  subtitle,
  icon: Icon,
  alt = false,
  children,
  className = "",
}: SectionWrapperProps) {
  const ref = React.useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      aria-label={`${tag} section`}
      className={`relative overflow-hidden ${alt ? "section-alt" : ""} ${className}`}
      style={{ background: alt ? "var(--color-surface)" : "var(--color-bg)" }}
    >
      {/* Top separator line */}
      <div className="section-sep absolute top-0 left-0" aria-hidden="true" />

      <div className="container section">
        {/* ── Section header ── */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="section-tag">
            {Icon && <Icon size={11} strokeWidth={2.5} />}
            {tag}
          </span>

          <h2 className="section-title">{title}</h2>

          {subtitle && (
            <p className="section-subtitle mx-auto mt-3">{subtitle}</p>
          )}

          <div className="divider mx-auto" />
        </motion.div>

        {/* ── Section content ── */}
        {children}
      </div>
    </section>
  );
}
