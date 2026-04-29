"use client";

import * as React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile, navItems } from "@/lib/portfolio-data";

const ticker = [
  "Unreal Engine 5",
  "C++ Gameplay",
  "AI Systems",
  "Niagara VFX",
  "Lumen / Nanite",
  "VR · Meta Quest",
  "Multiplayer",
  "Production Optimization",
];

function Marquee() {
  return (
    <div className="flex w-max animate-marquee items-center font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
      {[...ticker, ...ticker].map((t, i) => (
        <span key={i} className="flex items-center px-6">
          {t}
          <span className="ml-12 text-primary/50">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Footer() {
  const scrollTop = () =>
    typeof window !== "undefined" && window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative isolate mt-24 overflow-hidden border-t border-border bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.15), hsl(var(--primary) / 0.05) 40%, transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 grid-bg opacity-40" />

      {/* Marquee */}
      <div className="relative border-b border-border/60 bg-background/40 py-4 backdrop-blur-sm">
        <div className="overflow-hidden">
          <Marquee />
        </div>
      </div>

      <div className="container mx-auto relative px-6 py-16 sm:py-20">
        {/* Headline */}
        <div className="grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Currently — {profile.availability}
            </p>
            <h2
              className="font-display text-balance text-4xl font-bold tracking-[-0.02em] sm:text-5xl md:text-6xl"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, hsl(var(--foreground)) 0%, hsl(var(--foreground) / 0.4) 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Let&apos;s ship something{" "}
              <span className="italic text-primary">unreal</span>.
            </h2>
          </div>
          <div className="md:col-span-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-3 rounded-full border border-border bg-card/40 px-5 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground backdrop-blur transition-all hover:border-primary/50 hover:text-foreground"
            >
              <Mail size={14} />
              {profile.email}
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="mt-16 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Navigate
            </h3>
            <ul className="space-y-2">
              {navItems.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Connect
            </h3>
            <ul className="space-y-2">
              {[
                { label: "GitHub", href: profile.socials.github, icon: Github },
                { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
                { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    <s.icon size={14} className="opacity-60 group-hover:opacity-100" />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Stack
            </h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>Unreal Engine 4 / 5</li>
              <li>C++ · Blueprints</li>
              <li>Niagara · Lumen · Nanite</li>
              <li>VR · Meta Quest</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Based in
            </h3>
            <p className="text-sm text-foreground/80">{profile.location}</p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {profile.coordinates}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">GMT+6</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border/60 pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}. Crafted with Unreal-grade attention.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              v1.0
            </span>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Back to top"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/40 backdrop-blur transition-all hover:border-primary hover:text-primary"
            >
              <ArrowUp
                size={14}
                className="transition-transform group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Massive watermark */}
      <div
        aria-hidden
        className="pointer-events-none relative -mt-8 select-none overflow-hidden"
      >
        <div
          className="whitespace-nowrap text-center font-black leading-[0.75] tracking-[-0.05em]"
          style={{
            fontSize: "min(26vw, 26rem)",
            color: "transparent",
            WebkitTextStroke: "1px hsl(var(--foreground) / 0.06)",
            backgroundImage:
              "linear-gradient(180deg, hsl(var(--foreground) / 0.10) 0%, transparent 60%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {profile.shortName.toUpperCase()}
        </div>
      </div>
    </footer>
  );
}
