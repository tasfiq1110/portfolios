"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { strengths, proofPoints } from "@/lib/portfolio-data";

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <SectionHeading
          chapter="02"
          eyebrow="What I bring"
          title="What I'm hired to own."
          description="The four things a team gets when I join — and the work that backs each one up."
        />

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
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:-translate-y-0.5">
                    <Icon size={18} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    0{i + 1}
                  </span>
                </div>

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
      </div>
    </section>
  );
}
