"use client";

import * as React from "react";
import { Headset, Play } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { vrVideos, type VrVideo } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/**
 * Poster-first VR media. The YouTube iframe is only mounted once the visitor
 * presses play, so the section stays light on load.
 */
function VrMedia({ video }: { video: VrVideo }) {
  const [playing, setPlaying] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  if (playing) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
          title={video.title}
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
      aria-label={`Play ${video.title}`}
      className="group/play relative block aspect-video w-full overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {!loaded && !failed && <span className="absolute inset-0 skeleton" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {!failed && (
        <img
          src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt=""
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            const img = e.currentTarget as HTMLImageElement;
            if (!img.src.includes("hqdefault")) {
              img.src = `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`;
            } else {
              setFailed(true);
            }
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover/play:scale-105"
        />
      )}
      {failed && (
        <span className="absolute inset-0 flex items-center justify-center p-6 text-center text-lg font-semibold">
          {video.title}
        </span>
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
        <Headset size={11} />
        VR · Samsung
      </span>
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 group-hover/play:scale-110">
          <Play size={22} className="ml-1 fill-current" />
        </span>
      </span>
    </button>
  );
}

function VrCard({ video, index }: { video: VrVideo; index: number }) {
  return (
    <motion.article
      id={video.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "h-full min-w-0 scroll-mt-24",
        video.featured && "md:col-span-2 lg:col-span-3"
      )}
    >
      <GlowCard
        glowColor={video.glow}
        className={cn(
          "flex h-full flex-col p-5 sm:p-6",
          video.featured && "lg:grid lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-8"
        )}
      >
        <div className="min-w-0">
          <VrMedia video={video} />
        </div>

        <div className={cn("flex flex-1 flex-col", video.featured && "lg:py-2")}>
          <div className={cn("mt-5", video.featured && "lg:mt-0")}>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary/80">
              {video.subtitle}
            </p>
            <h3
              className={cn(
                "mt-1.5 text-xl font-bold tracking-tight",
                video.featured && "sm:text-3xl"
              )}
            >
              {video.title}
            </h3>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {video.description}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {video.tech.map((t) => (
              <Badge
                key={t}
                variant="outline"
                className="border-border/60 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.article>
  );
}

export function VR() {
  return (
    <section id="vr" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <SectionHeading
          chapter="05"
          eyebrow="Immersive / Meta Quest"
          title="VR experiences, built for headsets."
          description="Demo VR work produced for Samsung — interaction, locomotion and immersive environments built in Unreal Engine and tuned to hold frame budget on standalone VR hardware. Press play to watch inline."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {vrVideos.map((v, i) => (
            <VrCard key={v.slug} video={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
