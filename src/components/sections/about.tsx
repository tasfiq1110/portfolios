"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowUpRight, MapPin } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { summary, profile } from "@/lib/portfolio-data";

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

                {/* Name plate */}
                <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-xs font-medium text-white/90">
                    {profile.shortName}
                  </span>
                </div>
              </motion.div>

              {/* "Now" widget */}
              <Reveal delay={0.2}>
                <div className="mt-6 rounded-2xl border border-border bg-card/40 p-4 backdrop-blur-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Currently
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                      Team Lead
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
              eyebrow="About"
              title="Gameplay, tools and the people who ship them."
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
                  <a href="#work">
                    See the work
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
