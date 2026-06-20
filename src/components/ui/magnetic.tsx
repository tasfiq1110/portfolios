"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  /** How far the element is pulled toward the cursor (0–1 of the offset). */
  strength?: number;
  /** Spring stiffness — higher = snappier. */
  stiffness?: number;
  damping?: number;
  className?: string;
  /** Render as an inline element instead of block. */
  as?: "div" | "span";
}

/**
 * Wraps any element so it leans toward the pointer while hovered, then springs
 * back on leave. Disabled on coarse-pointer (touch) devices, where it just
 * renders the children statically. The signature Awwwards button feel.
 */
export function Magnetic({
  children,
  strength = 0.4,
  stiffness = 200,
  damping = 15,
  className,
  as = "div",
}: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness, damping, mass: 0.4 });
  const sy = useSpring(y, { stiffness, damping, mass: 0.4 });

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy, display: as === "span" ? "inline-block" : undefined }}
      className={className}
    >
      {children}
    </Comp>
  );
}
