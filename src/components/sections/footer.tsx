"use client";

import * as React from "react";
import { ArrowUp, Github, Linkedin, Mail, Store } from "lucide-react";
import { profile, navItems } from "@/lib/portfolio-data";

/**
 * Deliberately slim. Contact sits directly above this, so the footer is
 * navigation and nothing else — no second call to action, no marquee, no
 * full-viewport watermark.
 */
export function Footer() {
  const scrollTop = () =>
    typeof window !== "undefined" &&
    window.scrollTo({ top: 0, behavior: "smooth" });

  const socials = [
    { label: "GitHub", href: profile.socials.github, icon: Github },
    { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
    { label: "Fab", href: profile.socials.fab, icon: Store },
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          {/* Identity */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-mono text-xs font-bold text-primary-foreground">
                {profile.initials}
              </span>
              <span className="font-display text-sm font-semibold tracking-tight">
                {profile.shortName}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {profile.role} · {profile.location}
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block text-sm font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary"
            >
              {profile.email}
            </a>
          </div>

          {/* Links */}
          <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
            <div>
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Navigate
              </h3>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-1">
                {navItems.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Elsewhere
              </h3>
              <ul className="space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-primary"
                    >
                      <s.icon
                        size={14}
                        className="opacity-60 group-hover:opacity-100"
                      />
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <button
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowUp
              size={14}
              className="transition-transform group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
