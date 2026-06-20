"use client";

import * as React from "react";
import { SectionHeading } from "./section-heading";
import { OrbitalSkills } from "@/components/ui/orbital-skills";
import { skillNodes, skillGroups } from "@/lib/portfolio-data";

export function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <SectionHeading
          chapter="02"
          eyebrow="Stack"
          title="The toolkit I ship with."
          description="An interactive map of the systems I work in every day. Click a node to dig into how I use it."
        />

        <div className="mt-12">
          <OrbitalSkills data={skillNodes} />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {skillGroups.map((g) => {
            const Icon = g.icon;
            return (
              <div
                key={g.name}
                className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <h3 className="text-base font-semibold tracking-tight">
                    {g.name}
                  </h3>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
