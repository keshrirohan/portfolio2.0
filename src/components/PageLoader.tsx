"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate incremental progress
    const intervals = [
      setTimeout(() => setProgress(30), 80),
      setTimeout(() => setProgress(60), 300),
      setTimeout(() => setProgress(85), 600),
      setTimeout(() => setProgress(100), 900),
      setTimeout(() => setLoading(false), 1200),
    ];
    return () => intervals.forEach(clearTimeout);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          aria-live="polite"
          aria-label="Loading portfolio"
          role="status"
        >
          {/* Logo / initials */}
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

          {/* Progress bar track */}
          <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg,#ed722a,#f59150)" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-3 text-xs font-mono font-bold tabular-nums"
            style={{ color: "rgba(237,114,42,0.8)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
