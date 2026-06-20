"use client";

/**
 * Ambient aurora blobs — two soft gradient ellipses that drift slowly.
 * Sits behind body sections (not the hero) to add atmospheric depth.
 * Respects prefers-reduced-motion.
 */
export function Aurora() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="aurora-blob aurora-blob--a" />
      <div className="aurora-blob aurora-blob--b" />
      <style jsx>{`
        .aurora-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(120px);
          opacity: 0.35;
          will-change: transform;
        }
        .aurora-blob--a {
          width: 60vw;
          height: 60vw;
          left: -20vw;
          top: 20vh;
          background: radial-gradient(
            circle,
            hsl(var(--primary) / 0.4) 0%,
            transparent 60%
          );
          animation: aurora-drift-a 22s ease-in-out infinite alternate;
        }
        .aurora-blob--b {
          width: 50vw;
          height: 50vw;
          right: -15vw;
          top: 60vh;
          background: radial-gradient(
            circle,
            hsl(232 60% 60% / 0.3) 0%,
            transparent 60%
          );
          animation: aurora-drift-b 28s ease-in-out infinite alternate;
        }
        @keyframes aurora-drift-a {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(8vw, -10vh, 0) scale(1.15); }
        }
        @keyframes aurora-drift-b {
          from { transform: translate3d(0, 0, 0) scale(1); }
          to { transform: translate3d(-10vw, 6vh, 0) scale(0.9); }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-blob {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
