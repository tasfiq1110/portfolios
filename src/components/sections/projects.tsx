"use client";

import * as React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";
import { projects, type Project } from "@/lib/portfolio-data";

function YouTubeThumb({ id, alt }: { id: string; alt: string }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
      {!loaded && <div className="absolute inset-0 skeleton" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        }}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Play size={20} className="ml-1 fill-current" />
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group block h-full"
    >
      <Tilt max={featured ? 6 : 5} lift={featured ? 8 : 6} className="h-full">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="block h-full"
        >
          <GlowCard glowColor={project.glow} className="h-full p-5 sm:p-6">
            <YouTubeThumb id={project.youtubeId} alt={project.title} />
            <div className="mt-5 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{project.year}</span>
                  <span>·</span>
                  <span className="truncate">{project.subtitle}</span>
                </div>
                <h3
                  className={`truncate font-bold tracking-tight ${
                    featured ? "text-xl sm:text-2xl" : "text-lg"
                  }`}
                >
                  {project.title}
                </h3>
              </div>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-all group-hover:border-primary group-hover:text-primary group-hover:rotate-[-12deg]">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-border/60 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </GlowCard>
        </a>
      </Tilt>
    </motion.div>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            chapter="03"
            eyebrow="Selected Work"
            title="Things I've shipped & shaped."
            description="From Liberation War narrative pieces to combat sandboxes, traffic systems, and physics demos. Click any card to watch the gameplay."
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} featured />
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
