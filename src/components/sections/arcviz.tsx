"use client";

import * as React from "react";
import { Building2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { arcviz } from "@/lib/portfolio-data";

/**
 * Poster-first video. The YouTube iframe only mounts once the visitor presses
 * play, so the section costs nothing on load.
 */
function ArcvizPlayer() {
  const [playing, setPlaying] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${arcviz.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={arcviz.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label={`Play ${arcviz.title} walkthrough`}
      className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {!loaded && !failed && <span className="absolute inset-0 skeleton" />}
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://i.ytimg.com/vi/${arcviz.youtubeId}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.src.includes("hqdefault")) {
              img.src = `https://i.ytimg.com/vi/${arcviz.youtubeId}/hqdefault.jpg`;
            } else {
              setFailed(true);
            }
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}
      {failed && (
        <span className="absolute inset-0 flex items-center justify-center p-8 text-center text-xl font-semibold">
          {arcviz.title}
        </span>
      )}
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"
      />
      <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
        <Play size={12} className="fill-current" />
        Watch the walkthrough
      </span>
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Play size={22} className="ml-1 fill-current" />
        </span>
      </span>
    </button>
  );
}

export function Arcviz() {
  return (
    <section id="arcviz" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Architectural Visualization"
          title="Real-time ArcViz in Unreal Engine."
          description="Architectural work built at Future Studio — the same engine skills applied outside games, for clients who need to walk a space before it exists."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-7">
            <ArcvizPlayer />
          </div>

          <div className="flex flex-col lg:col-span-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2 size={20} />
            </span>

            <h3 className="mt-5 text-xl font-bold tracking-tight sm:text-2xl">
              {arcviz.title}
            </h3>
            <p className="mt-1.5 text-sm font-medium text-primary">
              {arcviz.subtitle}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {arcviz.description}
            </p>

            <ul className="mt-6 space-y-2.5">
              {arcviz.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/80"
                >
                  <span className="mt-[0.5rem] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {arcviz.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-border/60 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
                >
                  {t}
                </Badge>
              ))}
            </div>

            <div className="mt-auto pt-7">
              <Button asChild variant="outline" className="group">
                <a href={arcviz.link} target="_blank" rel="noreferrer">
                  <Play size={14} className="mr-2 fill-current" />
                  Watch on YouTube
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
