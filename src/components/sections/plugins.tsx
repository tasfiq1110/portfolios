"use client";

import * as React from "react";
import { ArrowUpRight, Play, Store } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { GlowCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { plugins, fabStore, type Plugin } from "@/lib/portfolio-data";

function PreviewThumb({ plugin }: { plugin: Plugin }) {
  const [loaded, setLoaded] = React.useState(false);
  return (
    <a
      href={`https://www.youtube.com/watch?v=${plugin.youtubeId}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Watch the ${plugin.title} preview video`}
      className="group/thumb relative block aspect-video w-full overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {!loaded && <div className="absolute inset-0 skeleton" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${plugin.youtubeId}/maxresdefault.jpg`}
        alt=""
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (!img.src.includes("hqdefault")) {
            img.src = `https://i.ytimg.com/vi/${plugin.youtubeId}/hqdefault.jpg`;
          }
        }}
        className="h-full w-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
        <Play size={11} className="fill-current" />
        Preview
      </span>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Play size={20} className="ml-1 fill-current" />
        </span>
      </div>
    </a>
  );
}

function PluginCard({ plugin, index }: { plugin: Plugin; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="h-full min-w-0"
    >
      <GlowCard glowColor={plugin.glow} className="flex h-full flex-col p-5 sm:p-6">
        <PreviewThumb plugin={plugin} />

        <div className="mt-5">
          <p className="text-sm font-medium text-primary">{plugin.tagline}</p>
          <h3 className="mt-1 text-xl font-bold tracking-tight">{plugin.title}</h3>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {plugin.description}
        </p>

        <ul className="mt-4 space-y-2">
          {plugin.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary/60" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {plugin.tech.map((t) => (
            <Badge
              key={t}
              variant="outline"
              className="border-border/60 font-mono text-[10px] font-normal uppercase tracking-wider text-muted-foreground"
            >
              {t}
            </Badge>
          ))}
        </div>

        {/* Pushes the action to the bottom so buttons line up across cards */}
        <div className="mt-auto pt-6">
          <Button asChild variant="outline" className="group w-full">
            <a href={plugin.link} target="_blank" rel="noreferrer">
              View on Fab
              <ArrowUpRight
                size={16}
                className="ml-2 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </Button>
        </div>
      </GlowCard>
    </motion.article>
  );
}

export function Plugins() {
  return (
    <section id="plugins" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            chapter="04"
            eyebrow="Fab Marketplace"
            title="Plugins other developers build with."
            description="Unreal Engine 5 C++ plugins I design, build, document and support, published on Epic's Fab marketplace."
          />
          <Button asChild size="lg" className="group shrink-0 self-start md:self-auto">
            <a href={fabStore} target="_blank" rel="noreferrer">
              <Store size={16} className="mr-2" />
              Visit my Fab store
            </a>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plugins.map((p, i) => (
            <PluginCard key={p.slug} plugin={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
