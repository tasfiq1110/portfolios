import {
  ArrowDown,
  ArrowUpRight,
  FileDown,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, highlights } from "@/lib/portfolio-data";

/**
 * Hero. Deliberately a server component with no JS and no WebGL: a hiring
 * manager should get the name, the role, the proof and a way to contact me
 * in the first screen, on any device, immediately. Entrances are pure CSS.
 */
export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate flex min-h-[92vh] w-full items-center overflow-hidden py-32 text-white"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 20% 0%, #101017 0%, #09090c 55%, #050507 100%)",
      }}
    >
      {/* Background: grid + two soft colour washes. Cheap, static, no canvas. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40"
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 30% 40%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 30% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[15vw] top-[10vh] -z-10 h-[55vw] w-[55vw] rounded-full opacity-50 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.30) 0%, transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[10vw] bottom-[5vh] -z-10 h-[45vw] w-[45vw] rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, hsl(232 60% 60% / 0.28) 0%, transparent 65%)",
        }}
      />
      {/* Fade into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-32 bg-gradient-to-b from-transparent to-background"
      />

      <div className="container mx-auto">
        <div className="max-w-3xl">
          {/* Availability — readable, not decorative micro-type */}
          <div
            className="rise-in mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[13px] font-medium text-emerald-300">
              {profile.availability}
            </span>
          </div>

          <h1
            className="rise-in font-display text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em] text-white"
            style={{ animationDelay: "0.12s" }}
          >
            {profile.shortName}
          </h1>

          <p
            className="rise-in mt-4 font-display text-[clamp(1.125rem,2.6vw,1.75rem)] font-medium leading-tight text-zinc-300"
            style={{ animationDelay: "0.2s" }}
          >
            Team Lead &amp; Unreal Engine Developer
          </p>

          <p
            className="rise-in mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
            style={{ animationDelay: "0.28s" }}
          >
            {profile.experienceYears}+ years building gameplay, AI, multiplayer
            and VR in C++ and Blueprint. Steam releases, Meta Quest apps,
            real-time architectural visualization, and four plugins other
            developers ship with.
          </p>

          <div
            className="rise-in mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "0.36s" }}
          >
            <Button asChild size="xl" className="group">
              <a href="#work">
                View my work
                <ArrowUpRight
                  size={18}
                  className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </Button>
            <Button
              asChild
              size="xl"
              variant="outline"
              className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
            >
              <a href={profile.cv} target="_blank" rel="noreferrer" download>
                <FileDown size={16} className="mr-2" />
                Download résumé
              </a>
            </Button>
            <Button
              asChild
              size="xl"
              variant="ghost"
              className="text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail size={16} className="mr-2" />
                Email me
              </a>
            </Button>
          </div>

          {/* Context a recruiter screens on: location, timezone, links */}
          <div
            className="rise-in mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500"
            style={{ animationDelay: "0.44s" }}
          >
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-emerald-400/80" />
              {profile.location} · {profile.timezone}
            </span>
            <span className="flex items-center gap-4">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition-colors hover:text-white"
              >
                <Github size={18} />
              </a>
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition-colors hover:text-white"
              >
                <Linkedin size={18} />
              </a>
            </span>
          </div>
        </div>

        {/* Credibility numbers */}
        <dl
          className="rise-in mt-14 grid w-full grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
          style={{ animationDelay: "0.52s" }}
        >
          {highlights.map((h) => (
            <div key={h.label} className="bg-black/40 px-5 py-5 backdrop-blur-sm">
              <dd className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {h.value}
              </dd>
              <dt className="mt-1.5 text-[13px] font-medium text-zinc-300">
                {h.label}
              </dt>
              {h.hint && (
                <p className="mt-1 text-[11px] leading-snug text-zinc-500">
                  {h.hint}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>

      <a
        href="#work"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs text-zinc-500 transition-colors hover:text-white lg:flex"
      >
        <span>See the work</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
