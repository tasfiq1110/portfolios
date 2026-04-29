"use client";

import * as React from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SkillNode } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

export function OrbitalSkills({ data }: { data: SkillNode[] }) {
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});
  const [activeId, setActiveId] = React.useState<number | null>(null);
  const [pulse, setPulse] = React.useState<Record<number, boolean>>({});
  const [angle, setAngle] = React.useState(0);
  const [auto, setAuto] = React.useState(true);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const orbitRef = React.useRef<HTMLDivElement>(null);

  // Responsive radius: scale down on narrow screens so nodes don't get clipped
  const [radius, setRadius] = React.useState(200);
  React.useEffect(() => {
    const update = () => {
      const w = containerRef.current?.clientWidth ?? 800;
      // Reserve room for the expanded card popping above each node + label.
      // 0.32 of width keeps nodes inside, capped at 200 on desktop.
      setRadius(Math.max(110, Math.min(200, w * 0.32)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  React.useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setAngle((a) => (a + 0.25) % 360), 50);
    return () => clearInterval(t);
  }, [auto]);

  const onContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpanded({});
      setActiveId(null);
      setPulse({});
      setAuto(true);
    }
  };

  const toggleNode = (id: number) => {
    setExpanded((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((k) => {
        if (parseInt(k) !== id) next[parseInt(k)] = false;
      });
      next[id] = !prev[id];
      if (!prev[id]) {
        setActiveId(id);
        setAuto(false);
        const related = data.find((d) => d.id === id)?.relatedIds ?? [];
        const p: Record<number, boolean> = {};
        related.forEach((r) => (p[r] = true));
        setPulse(p);
        const idx = data.findIndex((d) => d.id === id);
        const target = (idx / data.length) * 360;
        setAngle(270 - target);
      } else {
        setActiveId(null);
        setAuto(true);
        setPulse({});
      }
      return next;
    });
  };

  const positionFor = (i: number, n: number) => {
    const a = ((i / n) * 360 + angle) % 360;
    const rad = (a * Math.PI) / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);
    const z = Math.round(100 + 50 * Math.cos(rad));
    const opacity = Math.max(0.45, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(rad)) / 2)));
    return { x, y, z, opacity };
  };

  const isRelatedToActive = (id: number) => {
    if (!activeId) return false;
    return data.find((d) => d.id === activeId)?.relatedIds.includes(id) ?? false;
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-card/50 to-background sm:h-[640px]"
      onClick={onContainerClick}
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, hsl(var(--primary) / 0.12), transparent 70%)",
        }}
      />

      <div className="relative flex h-full w-full items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute flex h-full w-full items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Center */}
          <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary via-primary/70 to-primary/40">
            <span className="absolute h-20 w-20 animate-ping rounded-full border border-primary/30 opacity-70" />
            <span
              className="absolute h-24 w-24 animate-ping rounded-full border border-primary/20 opacity-50"
              style={{ animationDelay: "0.5s" }}
            />
            <span className="font-mono text-xs font-bold text-primary-foreground">UE</span>
          </div>

          {/* Orbit ring (scales with computed radius) */}
          <div
            className="absolute rounded-full border border-border/40"
            style={{ width: radius * 2, height: radius * 2 }}
          />

          {data.map((item, i) => {
            const pos = positionFor(i, data.length);
            const isExp = expanded[item.id];
            const isRel = isRelatedToActive(item.id);
            const isPulsing = pulse[item.id];
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute cursor-pointer transition-all duration-700"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExp ? 200 : pos.z,
                  opacity: isExp ? 1 : pos.opacity,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(item.id);
                }}
              >
                {isPulsing && (
                  <span
                    aria-hidden
                    className="absolute -inset-2 animate-pulse rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)",
                      width: `${item.energy * 0.5 + 40}px`,
                      height: `${item.energy * 0.5 + 40}px`,
                      left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                      top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    }}
                  />
                )}

                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isExp
                      ? "scale-150 border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : isRel
                        ? "animate-pulse border-primary/70 bg-primary/30 text-foreground"
                        : "border-border bg-card text-foreground"
                  )}
                >
                  <Icon size={18} />
                </div>

                <div
                  className={cn(
                    "absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-widest transition-all duration-300",
                    isExp ? "scale-110 text-foreground" : "text-muted-foreground"
                  )}
                >
                  {item.title}
                </div>

                {isExp && (
                  <Card className="absolute left-1/2 top-24 w-[min(17rem,80vw)] -translate-x-1/2 overflow-visible border-border/70 bg-popover/95 shadow-xl backdrop-blur-md">
                    <span className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-border" />
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className={cn(
                            "border-border text-[10px]",
                            item.status === "completed" && "bg-primary/10 text-primary border-primary/30",
                            item.status === "in-progress" && "bg-amber-500/10 text-amber-500 border-amber-500/30"
                          )}
                        >
                          {item.status === "completed"
                            ? "PRODUCTION"
                            : item.status === "in-progress"
                              ? "ACTIVE"
                              : "EXPLORING"}
                        </Badge>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-1">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                      <p className="leading-relaxed">{item.content}</p>

                      <div className="mt-4 border-t border-border/60 pt-3">
                        <div className="mb-1 flex items-center justify-between text-[11px] text-foreground/80">
                          <span className="flex items-center gap-1">
                            <Zap size={10} />
                            Proficiency
                          </span>
                          <span className="font-mono">{item.energy}%</span>
                        </div>
                        <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-gradient-to-r from-primary/60 to-primary"
                            style={{ width: `${item.energy}%` }}
                          />
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 border-t border-border/60 pt-3">
                          <div className="mb-2 flex items-center text-[10px] uppercase tracking-wider text-muted-foreground">
                            <LinkIcon size={10} className="mr-1" />
                            <span>Connected</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((rid) => {
                              const r = data.find((d) => d.id === rid);
                              if (!r) return null;
                              return (
                                <Button
                                  key={rid}
                                  variant="outline"
                                  size="sm"
                                  className="h-6 px-2 py-0 text-[10px]"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleNode(rid);
                                  }}
                                >
                                  {r.title}
                                  <ArrowRight size={8} className="ml-1 opacity-60" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Click a node to inspect
      </p>
    </div>
  );
}
