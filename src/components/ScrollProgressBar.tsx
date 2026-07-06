"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  // useScroll gives us scrollYProgress — a value that goes from 0 (page top) to 1 (page bottom).
  // As the user scrolls down, scrollYProgress increases toward 1.
  const { scrollYProgress } = useScroll();

  // useSpring wraps scrollYProgress so the bar doesn't jump instantly when you scroll.
  // Instead it "springs" smoothly toward the new value, making the movement feel natural.
  // stiffness/damping control how snappy vs. floaty the spring feels.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    // A thin fixed bar pinned to the very top of the screen.
    // `scaleX` scales it horizontally from 0 (not scrolled) to 1 (fully scrolled).
    // `origin-left` makes it grow from the left edge — like a progress bar filling right.
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "linear-gradient(90deg,#ed722a,#f59150,#ed722a)",
        backgroundSize: "200% 100%",
      }}
      aria-hidden="true"
    />
  );
}
