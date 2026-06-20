"use client";

import * as React from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\|=+";

interface ScrambleTextProps {
  text: string;
  /** ms per reveal step. Lower = faster decode. */
  speed?: number;
  /** Start the scramble automatically when scrolled into view. */
  onView?: boolean;
  /** Re-run the scramble whenever the element is hovered. */
  scrambleOnHover?: boolean;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Reveals text left-to-right, cycling each not-yet-locked character through
 * random glyphs first — the classic terminal "decode" effect. Respects
 * prefers-reduced-motion by rendering the final text immediately.
 */
export function ScrambleText({
  text,
  speed = 28,
  onView = true,
  scrambleOnHover = false,
  className,
  as = "span",
}: ScrambleTextProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [display, setDisplay] = React.useState(onView ? text : text);
  const frame = React.useRef<number>(0);
  const started = React.useRef(false);
  const reduced = React.useRef(false);

  const run = React.useCallback(() => {
    if (reduced.current) {
      setDisplay(text);
      return;
    }
    let iteration = 0;
    const total = text.length;
    const step = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );
      if (iteration >= total) return;
      iteration += 1 / 3;
      frame.current = window.setTimeout(step, speed);
    };
    step();
  }, [text, speed]);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!onView) {
      run();
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            run();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(frame.current);
    };
  }, [onView, run]);

  const Tag = as as React.ElementType;
  return (
    <Tag
      ref={ref}
      className={className}
      onPointerEnter={scrambleOnHover ? run : undefined}
    >
      {display}
    </Tag>
  );
}
