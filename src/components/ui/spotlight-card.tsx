"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type GlowColor = "blue" | "purple" | "green" | "red" | "orange";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: GlowColor;
}

const glowColorMap: Record<GlowColor, { base: number; spread: number }> = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 142, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
};

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ children, className, glowColor = "green", ...props }, ref) => {
    const localRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => localRef.current!);

    React.useEffect(() => {
      const el = localRef.current;
      if (!el) return;
      const sync = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--x", x.toFixed(2));
        el.style.setProperty("--y", y.toFixed(2));
        el.style.setProperty("--xp", (x / rect.width).toFixed(2));
        el.style.setProperty("--yp", (y / rect.height).toFixed(2));
      };
      el.addEventListener("pointermove", sync);
      return () => el.removeEventListener("pointermove", sync);
    }, []);

    const { base, spread } = glowColorMap[glowColor];

    return (
      <div
        ref={localRef}
        data-glow
        style={
          {
            "--base": base,
            "--spread": spread,
            "--radius": "16",
            "--border": "1.5",
            "--size": "180",
            backgroundImage: `radial-gradient(
            calc(var(--size) * 1px) calc(var(--size) * 1px) at
            calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
            hsl(calc(var(--base) + (var(--xp, 0) * var(--spread))) 80% 60% / 0.15),
            transparent 70%
          )`,
          } as React.CSSProperties
        }
        className={cn(
          "relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm transition-colors hover:border-border",
          className
        )}
        {...props}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{
            background: `radial-gradient(
              calc(var(--size) * 1.2px) calc(var(--size) * 1.2px) at
              calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
              hsl(calc(var(--base) + (var(--xp, 0) * var(--spread))) 90% 70% / 0.4),
              transparent 60%
            )`,
            mixBlendMode: "overlay",
          }}
        />
        {children}
      </div>
    );
  }
);
GlowCard.displayName = "GlowCard";
