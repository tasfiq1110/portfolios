"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { strengths, proofPoints, skillGroups } from "@/lib/portfolio-data";

/**
 * What I own on a team, the evidence for it, and the stack underneath.
 * Previously three separate sections (Strengths / proof strip / Skills) plus an
 * interactive orbit widget — collapsed into one scannable block.
 */
export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Expertise"
          title="What I'm hired to own."
          description="The four things a team gets when I join, the work that backs each one up, and the tools I use to do it."
        />

        {/* Strengths */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
          {strengths.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-background p-6 transition-colors hover:bg-card sm:p-8"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:-translate-y-0.5">
                  <Icon size={18} />
                </span>

                <h3 className="mt-5 text-lg font-semibold tracking-tight sm:text-xl">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.25em] text-primary/80">
                  {s.proof}
                </p>

                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-700 group-hover:w-full"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Proof strip — external links a hiring manager can verify in one click */}
        <Reveal delay={0.15}>
          <div className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {proofPoints.map((p) => (
              <a
                key={p.label}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 bg-background p-5 transition-colors hover:bg-card"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {p.label}
                  </span>
                  <span className="mt-1.5 block truncate text-sm font-medium text-foreground">
                    {p.value}
                  </span>
                </span>
                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </a>
            ))}
          </div>
        </Reveal>

        {/* Stack */}
        <div className="mt-16">
          <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Stack
          </h3>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/40"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon size={18} />
                    </span>
                    <h4 className="text-base font-semibold tracking-tight">
                      {g.name}
                    </h4>
                  </div>
                  <ul className="space-y-2">
                    {g.skills.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
