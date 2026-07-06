"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle, mounted } = useTheme();
  const isDark = theme === "dark";

  return (
    // motion.button gives the button Framer Motion animation powers.
    // whileHover: slightly enlarges the button when you hover over it.
    // whileTap: slightly shrinks it when you click — gives a satisfying "press" feel.
    <motion.button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      id="theme-toggle-btn"
      className="relative w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200"
      style={{
        background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
      }}
      whileHover={{ scale: 1.08 }} // grow slightly on hover
      whileTap={{ scale: 0.92 }}   // shrink slightly on click
    >
      {/* AnimatePresence lets Framer Motion animate an element OUT before removing it.
          mode="wait" means the old icon fully exits before the new one enters —
          this creates a smooth swap animation instead of both icons appearing at once. */}
      <AnimatePresence mode="wait" initial={false}>
        {/* mounted check: on the server, we don't know the theme yet, so we render an empty
            placeholder. This prevents a "hydration mismatch" — where the server and browser
            render different things and React throws a warning. */}
        {!mounted ? (
          <span key="placeholder" className="w-4 h-4" />
        ) : isDark ? (
          // Moon icon — shown in dark mode. Rotates and fades in when switching to dark.
          // exit plays the reverse when switching away from dark mode.
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={16} className="text-white/70" strokeWidth={1.8} />
          </motion.span>
        ) : (
          // Sun icon — shown in light mode. Rotates and fades in when switching to light.
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: 30, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -30, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={16} className="text-[#ed722a]" strokeWidth={1.8} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
