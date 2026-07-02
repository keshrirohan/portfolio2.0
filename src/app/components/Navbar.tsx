"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/components/ThemeProvider";

const NAV_LINKS = [
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Education",  href: "#education" },
  { label: "Contact",    href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId,   setActiveId]   = useState("");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* ── Scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section via IntersectionObserver ── */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-30% 0px -65% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── Body scroll lock ── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* ── Close on resize ── */
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ── Theme-aware colours ── */
  const bg = isDark
    ? scrolled ? "rgba(0,0,0,0.90)" : "transparent"
    : scrolled ? "rgba(246,246,247,0.92)" : "transparent";
  const border = scrolled
    ? isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"
    : "transparent";
  const textMuted = isDark ? "rgba(255,255,255,0.5)"  : "rgba(0,0,0,0.5)";
  const textFg    = isDark ? "#ffffff" : "#09090b";
  const hamBorder = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";

  return (
    <>
      <motion.header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8"
        style={{
          height: scrolled ? "54px" : "68px",
          background: bg,
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: `1px solid ${border}`,
          transition: "height 0.25s ease, background 0.25s ease, border-color 0.25s ease",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          id="nav-logo"
          aria-label="Rohan Keshri — back to top"
          className="flex items-center gap-2.5 group flex-shrink-0"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs text-white flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,#ed722a,#c45f1f)",
              boxShadow: "0 0 14px rgba(237,114,42,0.35)",
            }}
          >
            RK
          </div>
          <span
            className="hidden sm:block text-sm font-semibold tracking-tight transition-colors duration-200"
            style={{ color: textFg }}
          >
            Rohan Keshri
          </span>
        </a>

        {/* ── Desktop nav ── */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <motion.a
                key={link.href}
                href={link.href}
                id={`nav-${link.label.toLowerCase()}`}
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="relative px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
                style={{ color: isActive ? "#ed722a" : textMuted }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = textFg;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = textMuted;
                }}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.05, duration: 0.3 }}
              >
                {link.label}
                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                    style={{ background: "#ed722a" }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <motion.a
            href="#contact"
            id="nav-hire-btn"
            aria-label="Hire Rohan Keshri"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
            style={{
              background: "linear-gradient(135deg,#ed722a,#c45f1f)",
              boxShadow: "0 0 14px rgba(237,114,42,0.3)",
              transition: "box-shadow 0.2s ease, transform 0.2s ease",
            }}
            whileHover={{ scale: 1.03, boxShadow: "0 0 22px rgba(237,114,42,0.5)" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Hire Me
          </motion.a>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            id="nav-mobile-toggle"
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200"
            style={{
              border: `1px solid ${hamBorder}`,
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
              color: isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.7)",
            }}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={15} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={15} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.3)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-[280px] flex flex-col pt-[72px] pb-8 px-5"
              style={{
                background: isDark ? "#0d0d0d" : "#ffffff",
                borderLeft: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)"}`,
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
            >
              <nav aria-label="Mobile navigation links" className="flex flex-col gap-1 flex-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeId === link.href.slice(1);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors duration-200"
                      style={{
                        color: isActive ? "#ed722a" : isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)",
                        background: isActive
                          ? "rgba(237,114,42,0.08)"
                          : "transparent",
                      }}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: isActive ? "#ed722a" : isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                        aria-hidden="true"
                      />
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="mt-4">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white"
                  style={{ background: "linear-gradient(135deg,#ed722a,#c45f1f)" }}
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
