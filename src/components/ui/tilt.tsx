"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max rotation in degrees */
  max?: number;
  /** Inner perspective (px) */
  perspective?: number;
  /** Lift on hover (px) */
  lift?: number;
  glare?: boolean;
}

export const Tilt = React.forwardRef<HTMLDivElement, TiltProps>(
  (
    { children, className, max = 8, perspective = 1000, lift = 6, glare = true, ...props },
    forwardedRef
  ) => {
    const localRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => localRef.current!);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 20, mass: 0.5 });
    const sy = useSpring(y, { stiffness: 200, damping: 20, mass: 0.5 });
    const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
    const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
    const liftZ = useMotionValue(0);
    const sLift = useSpring(liftZ, { stiffness: 250, damping: 22 });

    const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = localRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(px);
      y.set(py);
    };
    const onEnter = () => liftZ.set(lift);
    const onLeave = () => {
      x.set(0);
      y.set(0);
      liftZ.set(0);
    };

    const glareX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
    const glareY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);
    const glareBg = useMotionTemplate`radial-gradient(180px 180px at ${glareX} ${glareY}, hsl(0 0% 100% / 0.15), transparent 60%)`;

    return (
      <motion.div
        ref={localRef}
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        style={{ perspective }}
        className={cn("relative", className)}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            translateZ: sLift,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full w-full"
        >
          {children}
          {glare && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: glareBg,
                mixBlendMode: "overlay",
              }}
            />
          )}
        </motion.div>
      </motion.div>
    );
  }
);
Tilt.displayName = "Tilt";
