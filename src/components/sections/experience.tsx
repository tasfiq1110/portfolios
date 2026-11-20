"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, Award, ExternalLink } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { Reveal } from "@/components/ui/reveal";
import { experience, education, certifications } from "@/lib/portfolio-data";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Experience"
          title="Teams I've worked with."
          description="My roles in game development, Meta Quest VR and multiplayer worlds."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          {/* Experience timeline */}
          <div className="lg:col-span-8">
            <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <Briefcase size={12} />
              <span>Experience</span>
            </div>

            <ol className="relative ml-3 space-y-10 border-l border-border">
              {experience.map((job, i) => (
                <motion.li
                  key={job.company + job.period}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-8"
                >
                  <span className="absolute -left-[7px] top-1.5 flex h-3 w-3 items-center justify-center">
                    <span className="absolute h-3 w-3 rounded-full bg-primary/30" />
                    <span className="relative h-2 w-2 rounded-full bg-primary" />
                  </span>

                  <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/40">
                    <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                        {job.role}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {job.period}
                      </span>
                    </div>

                    <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground/80">{job.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} />
                        {job.location}
                      </span>
                    </div>

                    <ul className="space-y-1.5">
                      {job.details.map((d, j) => (
                        <li
                          key={j}
                          className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Sidebar — Education + Certs */}
          <div className="space-y-8 lg:col-span-4">
            <Reveal>
              <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <GraduationCap size={12} />
                <span>Education</span>
              </div>
              <div className="space-y-4">
                {education.map((e) => (
                  <div
                    key={e.institution}
                    className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-sm transition-colors hover:border-primary/40"
                  >
                    <h3 className="text-base font-semibold tracking-tight">
                      {e.institution}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{e.degree}</p>
                    <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      <span>{e.period}</span>
                      <span>{e.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mb-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                <Award size={12} />
                <span>Certifications</span>
              </div>
              <div className="space-y-3">
                {certifications.map((c) => (
                  <div
                    key={c.name}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 backdrop-blur-sm transition-colors hover:border-primary/40"
                    data-cursor-hover
                  >
                    <a href={c.image} className="block p-3" aria-label={`Open full-size certificate from ${c.issuer}`}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-white">
                        <Image src={c.image} alt={c.name + " — " + c.issuer} fill
                          sizes="(min-width: 1024px) 28vw, 90vw" className="object-contain" />
                      </div>
                      <h4 className="mt-4 flex items-center justify-between gap-2 text-base font-semibold">
                        {c.name}<ExternalLink size={16} aria-hidden="true" />
                      </h4>
                    </a>
                    <div className="flex items-center justify-between gap-3 px-3 pb-4 text-sm text-muted-foreground">
                      <span>{c.issuer}</span>
                      <span className="text-primary">{c.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  );
}
