"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  // loading: true means the loader screen is visible; once set to false the loader fades out
  const [loading, setLoading] = useState(true);
  // progress: a number from 0 to 100 representing how full the progress bar is
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate incremental progress
    // Instead of a real loading check, we use timed steps to fake the bar filling up.
    // Each setTimeout fires at a different delay, bumping progress to the next value.
    // The last timeout sets loading=false which makes AnimatePresence animate the loader out.
    const intervals = [
      setTimeout(() => setProgress(30),  80),   // jump to 30% after 80ms
      setTimeout(() => setProgress(60),  300),  // jump to 60% after 300ms
      setTimeout(() => setProgress(85),  600),  // jump to 85% after 600ms
      setTimeout(() => setProgress(100), 900),  // fill to 100% after 900ms
      setTimeout(() => setLoading(false), 1200), // hide the loader after 1200ms
    ];
    // If the component unmounts early, clear all pending timers to avoid memory leaks
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    // AnimatePresence watches its children — when `loading` becomes false the child is removed,
    // and AnimatePresence plays its `exit` animation before actually removing it from the DOM.
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          // exit runs when loading becomes false — fades the whole screen out smoothly
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          aria-live="polite"
          aria-label="Loading portfolio"
          role="status"
        >
          {/* Logo / initials — the branded "RK" square shown while loading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white"
              style={{
                background: "linear-gradient(135deg,#ed722a,#c45f1f)",
                boxShadow: "0 0 40px rgba(237,114,42,0.4)",
              }}
            >
              RK
            </div>
          </motion.div>

          {/* Progress bar track — the grey background rail that the orange bar grows inside */}
          <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            {/* The orange fill that animates its width from 0% to 100% as progress increases */}
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#ed722a,#f59150)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Percentage number — pulses repeatedly so it feels alive while loading */}
          <motion.p
            className="mt-3 text-xs font-mono font-bold tabular-nums"
            style={{ color: "rgba(237,114,42,0.8)" }}
            animate={{ opacity: [0.5, 1, 0.5] }} // fades in and out on a loop
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
