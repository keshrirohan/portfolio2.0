"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  mounted: boolean;
}

// React Context is a way to share data (here: the current theme) with any component in the tree
// without having to pass it as a prop through every level. Any component can just call useTheme()
// to read or change the theme — no prop drilling needed.
const ThemeContext = createContext<ThemeContextValue>({
  theme: "dark",     // default theme before the real value is loaded
  toggle: () => {},  // placeholder function — replaced by the real one inside ThemeProvider
  mounted: false,    // false until the component has run on the browser (not during server render)
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // theme: the currently active theme ("dark" or "light"), starts as "dark" as a safe default
  const [theme, setTheme] = useState<Theme>("dark");
  // mounted: becomes true once the component has loaded in the browser.
  // We use this to avoid showing the wrong icon/theme before the saved preference is read.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read stored or system preference
    // First, check if the user has previously picked a theme and saved it in localStorage.
    const stored = localStorage.getItem("theme") as Theme | null;
    // If no saved theme, fall back to the OS/browser's preferred color scheme.
    const preferred =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(preferred);
    // Apply immediately to avoid flash — set the data-theme attribute on <html> right away
    // so CSS variables switch before the page paints, preventing a white/dark flicker.
    document.documentElement.setAttribute("data-theme", preferred);
    setMounted(true);
  }, []);

  // toggle switches between dark and light, saves the choice to localStorage so it persists
  // across page reloads, and updates the <html> data-theme attribute so CSS variables change.
  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);       // save so the choice survives a page refresh
      document.documentElement.setAttribute("data-theme", next); // apply to CSS immediately
      return next;
    });
  };

  return (
    // Always render children — use visibility trick to avoid hydration mismatch
    // ThemeContext.Provider makes theme, toggle, and mounted available to all child components
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// useTheme is a shortcut hook — any component can call `const { theme, toggle } = useTheme()`
// to read the current theme or call toggle() to switch it, without touching ThemeContext directly.
export function useTheme() {
  return useContext(ThemeContext);
}
