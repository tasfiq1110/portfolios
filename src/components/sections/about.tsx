"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal, Counter } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { highlights, summary, profile } from "@/lib/portfolio-data";

function parseHighlight(value: string): { num: number; suffix: string } {
  const match = value.match(/^([0-9.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export function About() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Photo parallax
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const photoScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 sm:py-32"
    >
      <div className="container mx-auto">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left — photo composition */}
          <div className="relative lg:col-span-5">
            <div className="relative">
              {/* Decorative offset frame */}
              <div
                aria-hidden
                className="absolute -bottom-4 -right-4 hidden h-full w-full rounded-2xl border border-primary/40 sm:block"
              />
              <div
                aria-hidden
                className="absolute -bottom-2 -right-2 hidden h-full w-full rounded-2xl border border-border sm:block"
              />

              {/* Main photo card */}
              <motion.div
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted"
                style={{ y: photoY }}
                data-cursor-hover
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ scale: photoScale }}
                >
                  <Image
                    src={profile.photos.cinematic}
                    alt={`${profile.name} — portrait`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                    priority
                  />
                </motion.div>

                {/* Vignette + grain */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, hsl(var(--primary) / 0.4), transparent 60%)",
                  }}
                />

                {/* HUD corners */}
                <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-white/60" />
                <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-white/60" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/60" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/60" />

                {/* Bottom-left label */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/90">
                    {profile.shortName}
                  </span>
                </div>

                {/* Top-right meta */}
                <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-white/80 backdrop-blur-sm">
                  IRL · 23.81° N
                </div>
              </motion.div>

              {/* "Now" widget */}
              <Reveal delay={0.2}>
                <div className="mt-6 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Currently
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-primary">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                      Live
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80">{profile.now}</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right — content */}
          <div className="space-y-8 lg:col-span-7">
            <SectionHeading
              chapter="01"
              eyebrow="About"
              title="Game developer who codes the feel."
            />

            <div className="space-y-5">
              {summary.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
                {highlights.map((h) => {
                  const { num, suffix } = parseHighlight(h.value);
                  return (
                    <div
                      key={h.label}
                      className="group relative bg-background p-5 transition-colors hover:bg-card"
                    >
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {h.label}
                      </dt>
                      <dd className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                        {Number.isFinite(num) && num > 0 ? (
                          <>
                            <Counter value={num} />
                            <span className="text-primary">{suffix}</span>
                          </>
                        ) : (
                          h.value
                        )}
                      </dd>
                      <span
                        aria-hidden
                        className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full"
                      />
                    </div>
                  );
                })}
              </dl>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button asChild size="lg" className="group">
                  <a
                    href={profile.cv}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    <Download
                      size={16}
                      className="mr-2 transition-transform group-hover:translate-y-0.5"
                    />
                    Download CV
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="group">
                  <a href="#projects">
                    See projects
                    <ArrowUpRight
                      size={16}
                      className="ml-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </Button>
                <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  <MapPin size={11} className="text-primary" />
                  {profile.location}
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
