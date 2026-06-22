"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const NAV_LINKS = [
  { label: "About",       href: "#about" },
  { label: "Skills",      href: "#skills" },
  { label: "Experience",  href: "#experience" },
  { label: "Projects",    href: "#projects" },
  { label: "Education",   href: "#education" },
  { label: "Contact",     href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile nav on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        role="banner"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300"
        style={{
          height: scrolled ? "56px" : "72px",
          background: scrolled
            ? "rgba(0,0,0,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo */}
        <a
          href="#home"
          aria-label="Rohan Keshri — home"
          id="nav-logo"
          className="flex items-center gap-2.5 group"
          onClick={(e) => { e.preventDefault(); handleNavClick("#home"); }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white transition-all duration-300 group-hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg,#ed722a,#c45f1f)",
              boxShadow: "0 0 16px rgba(237,114,42,0.3)",
            }}
          >
            RK
          </div>
          <span className="hidden sm:block text-sm font-bold text-white/80 group-hover:text-white transition-colors duration-200">
            Rohan Keshri
          </span>
        </a>

        {/* Desktop nav */}
        <nav role="navigation" aria-label="Main navigation" className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <motion.a
            href="#contact"
            id="nav-hire-btn"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all duration-200 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg,#ed722a,#c45f1f)",
              boxShadow: "0 0 16px rgba(237,114,42,0.2)",
            }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 24px rgba(237,114,42,0.4)" }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Hire Me
          </motion.a>

          {/* Mobile hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            id="nav-mobile-toggle"
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:border-white/25 transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span key="x"
                  initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={16} />
                </motion.span>
              ) : (
                <motion.span key="menu"
                  initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70"
              style={{ backdropFilter: "blur(8px)" }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-72 border-l border-white/5 flex flex-col pt-20 pb-8 px-6"
              style={{ background: "rgba(5,5,5,0.98)" }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ed722a]" />
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto">
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
