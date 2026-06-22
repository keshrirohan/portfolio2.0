"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      id="theme-toggle-btn"
      className="relative w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 transition-colors duration-200 hover:border-[#ed722a]/40 focus-visible:ring-2 focus-visible:ring-[#ed722a]"
      style={{ background: "rgba(255,255,255,0.04)" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
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
