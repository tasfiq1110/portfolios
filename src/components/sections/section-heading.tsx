"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Two-digit chapter marker, e.g. "01" — adds storytelling thread */
  chapter?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  chapter,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const words = title.split(" ");

  return (
    <div
      ref={ref}
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {(chapter || eyebrow) && (
        <div
          className={cn(
            "mb-5 flex items-center gap-3",
            align === "center" && "justify-center"
          )}
        >
          {chapter && (
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
              {chapter}
            </span>
          )}
          {chapter && eyebrow && (
            <span className="h-px w-8 bg-border" />
          )}
          {eyebrow && (
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              {eyebrow}
            </span>
          )}
        </div>
      )}

      <h2 className="font-display text-balance text-3xl font-bold leading-[1.05] tracking-[-0.025em] sm:text-4xl md:text-5xl">
        {words.map((word, i) => (
          <span
            key={i}
            className="mr-[0.25em] inline-block overflow-hidden pb-[0.05em] last:mr-0"
          >
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.06,
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: words.length * 0.06 + 0.1 }}
          className="mt-4 text-balance text-base text-muted-foreground sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
