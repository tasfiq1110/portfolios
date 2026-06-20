"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Fixed 2px scroll progress bar at the very top.
 * Reads document scroll, springs the scaleX so it feels smooth with Lenis.
 * Hidden when prefers-reduced-motion (no animation = no progress feel anyway).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="motion-reduce:hidden pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-primary via-primary/70 to-primary/30"
    />
  );
}
