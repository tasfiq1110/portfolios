"use client";

import * as React from "react";

/**
 * Subtle pointer-following cursor:
 * - 8px dot that follows the cursor exactly
 * - 36px outline ring that lags behind
 * - When hovering an interactive element (a, button, [data-cursor-hover])
 *   the ring expands and the dot turns green
 *
 * Coarse-pointer devices (phones/tablets) get nothing.
 */
export function Cursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;
    let active = false;

    const onMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      const target = e.target as HTMLElement | null;
      const isInteractive =
        !!target &&
        (target.closest("a, button, [role='button'], [data-cursor-hover]") !== null);
      if (isInteractive !== active) {
        active = isInteractive;
        ringRef.current?.setAttribute("data-active", String(active));
      }
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-2 w-2 rounded-full bg-foreground mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        data-active="false"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[99] h-9 w-9 rounded-full border border-foreground/40 transition-[width,height,border-color,background-color] duration-300 mix-blend-difference data-[active=true]:h-12 data-[active=true]:w-12 data-[active=true]:border-primary data-[active=true]:bg-primary/10"
      />
    </>
  );
}
