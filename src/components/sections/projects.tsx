"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Gamepad2, Globe, Play } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Tilt } from "@/components/ui/tilt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
          const img = e.currentTarget;
          if (!img.src.includes("hqdefault")) {
            img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
          } else {
            setLoaded(true);
          }
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

/**
 * Poster-first media for the flagship card. The trailer is ~42 MB, so it is only
 * fetched once the visitor actually presses play.
 */
function FlagshipMedia({ project }: { project: Project }) {
  const [playing, setPlaying] = React.useState(false);

  if (playing && project.videoUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          src={project.videoUrl}
          poster={project.image}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const poster = project.image ? (
    <Image
      src={project.image}
      alt={`${project.title} key art`}
      fill
      sizes="(min-width: 1024px) 50vw, 90vw"
      className="object-cover object-left transition-transform duration-700 group-hover:scale-[1.03]"
    />
  ) : null;

  if (project.videoUrl) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        aria-label={`Play the ${project.title} trailer`}
        className="group/play relative block aspect-video w-full overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {poster}
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 group-hover/play:scale-110">
            <Play size={22} className="ml-1 fill-current" />
          </span>
        </span>
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
          Trailer
        </span>
      </button>
    );
  }

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className="relative block aspect-video w-full overflow-hidden rounded-xl bg-muted"
    >
      {poster}
    </a>
  );
}

function FlagshipCard({ project }: { project: Project }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group min-w-0"
    >
      <GlowCard glowColor={project.glow} className="p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="min-w-0">
            <FlagshipMedia project={project} />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                New
              </span>
              {project.status && (
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {project.status}
                </span>
              )}
            </div>

            <h3 className="mt-5 font-display text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
              {project.title}
            </h3>
            <p className="mt-2 text-base text-muted-foreground sm:text-lg">
              {project.subtitle}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
              {project.role}
            </p>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.description}
            </p>

            {project.highlights && (
              <ul className="mt-6 space-y-2.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                  >
                    <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 flex flex-wrap gap-1.5">
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

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveUrl && (
                <Button asChild size="lg" className="group/cta">
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    <Globe size={16} className="mr-2" />
                    {project.liveLabel ?? "Visit site"}
                    <ArrowUpRight
                      size={16}
                      className="ml-2 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                    />
                  </a>
                </Button>
              )}
              {project.youtubeId ? (
                <Button asChild size="lg" variant="outline" className="group/cta">
                  <a
                    href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Play size={14} className="mr-2 fill-current" />
                    Watch trailer
                  </a>
                </Button>
              ) : (
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <Gamepad2 size={13} className="text-primary" />
                  Free playable demo on the site
                </span>
              )}
            </div>
          </div>
        </div>
      </GlowCard>
    </motion.article>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group block h-full min-w-0"
    >
      <Tilt max={featured ? 6 : 5} lift={featured ? 8 : 6} className="h-full">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="block h-full"
        >
          <GlowCard glowColor={project.glow} className="h-full p-5 sm:p-6">
            {project.youtubeId && (
              <YouTubeThumb id={project.youtubeId} alt={project.title} />
            )}
            <div className="mt-5 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="mb-2 flex min-w-0 items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="shrink-0">{project.year}</span>
              <span className="shrink-0">·</span>
              <span className="min-w-0 flex-1 truncate">{project.subtitle}</span>
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
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
              {project.role}
            </p>
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
  const flagship = projects.find((p) => p.flagship);
  const featured = projects.filter((p) => p.featured && !p.flagship);
  const rest = projects.filter((p) => !p.featured && !p.flagship);

  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            chapter="04"
            eyebrow="Selected Work"
            title="Games and gameplay systems."
            description="Shipped games, prototypes and the systems underneath them. Every card links to real footage."
          />
        </div>

        {flagship && (
          <div className="mt-12">
            <FlagshipCard project={flagship} />
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:gap-8">
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
