"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        aria-hidden
        className={cn(
          "h-9 w-16 rounded-full border border-border bg-muted/40",
          className
        )}
      />
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileTap={{ scale: 0.96 }}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn(
        "relative flex h-9 w-16 items-center rounded-full border border-border bg-secondary/50 p-[3px] backdrop-blur transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <span className="absolute inset-0 flex items-center justify-between px-2 text-muted-foreground">
        <Sun size={14} className={isDark ? "" : "text-amber-500"} />
        <Moon size={14} className={isDark ? "text-primary" : ""} />
      </span>
      <motion.span
        layout
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-sm border border-border"
        animate={{ x: isDark ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        {isDark ? (
          <Moon size={14} className="text-primary" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
      </motion.span>
    </motion.button>
  );
}
