// clsx lets you combine multiple CSS class names together, including conditionally.
// Example: clsx("text-red", isActive && "font-bold") → "text-red font-bold" (or just "text-red")
import { clsx, type ClassValue } from "clsx";

// twMerge is a Tailwind-specific helper that removes CONFLICTING class names.
// Without it, clsx("p-4", "p-8") would give "p-4 p-8" — two conflicting paddings.
// twMerge resolves conflicts by keeping only the LAST one: "p-8".
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely, resolving conflicts.
 */

// cn() is the utility function used all across this codebase to build class strings.
// It combines clsx (for conditional classes) + twMerge (for conflict resolution).
// Usage examples:
//   cn("px-4 py-2", "px-8")              → "py-2 px-8"  (conflict resolved)
//   cn("text-sm", isLarge && "text-lg")  → "text-sm" or "text-lg" depending on isLarge
//   cn(styles.base, variant === "primary" && styles.primary)  → picks the right styles
export function cn(...inputs: ClassValue[]) {
  // First, clsx merges all the inputs into a single class string (handling conditionals).
  // Then, twMerge removes any Tailwind conflicts from that merged string.
  return twMerge(clsx(inputs));
}
