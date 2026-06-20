"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/lib/portfolio-data";

const BOOT_LINES = [
  "> initializing render core",
  "> mounting world partition",
  "> compiling shaders ............ ok",
  "> loading nanite geometry ...... ok",
  "> spawning lumen GI ............ ok",
  "> booting gameplay systems ..... ok",
];

/**
 * One-shot boot sequence shown on first paint. Types out engine-flavoured log
 * lines, fills a load bar, then lifts away as a curtain to reveal the page.
 * Self-dismisses after ~2.2s (or instantly under reduced-motion).
 */
export function Preloader() {
  const [done, setDone] = React.useState(false);
  const [lines, setLines] = React.useState<number>(0);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setDone(true);
      return;
    }

    // Lock scroll while booting
    document.body.style.overflow = "hidden";

    const lineTimers: number[] = [];
    BOOT_LINES.forEach((_, i) => {
      lineTimers.push(
        window.setTimeout(() => setLines(i + 1), 180 + i * 230)
      );
    });

    const startProgress = window.setTimeout(() => {
      let p = 0;
      const id = window.setInterval(() => {
        p = Math.min(100, p + Math.random() * 18 + 6);
        setProgress(p);
        if (p >= 100) window.clearInterval(id);
      }, 130);
      lineTimers.push(id as unknown as number);
    }, 200);

    const finish = window.setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 2200);

    return () => {
      lineTimers.forEach(clearTimeout);
      clearTimeout(startProgress);
      clearTimeout(finish);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#040406]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-[min(90vw,420px)] px-6">
            {/* Identity mark */}
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 font-mono text-xs font-bold text-black">
                {profile.initials}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500">
                {profile.shortName}
              </span>
            </div>

            {/* Boot log */}
            <div className="min-h-[120px] font-mono text-[11px] leading-relaxed text-emerald-400/80">
              {BOOT_LINES.slice(0, lines).map((l, i) => (
                <motion.div
                  key={l}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {l}
                  {i === lines - 1 && (
                    <span className="ml-1 inline-block h-3 w-1.5 translate-y-0.5 animate-pulse bg-emerald-400" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-600">
                <span>loading world</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-px w-full overflow-hidden bg-white/10">
                <motion.div
                  className="h-full bg-emerald-400"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
