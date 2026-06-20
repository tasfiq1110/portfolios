"use client";

import * as React from "react";
import { Github, Linkedin, Mail, Send, ArrowUpRight, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { LocationMap } from "@/components/ui/location-map";
import { QRCode } from "@/components/ui/qr-code";
import { profile } from "@/lib/portfolio-data";

export function Contact() {
  const [copied, setCopied] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = encodeURIComponent(String(data.get("name") ?? ""));
    const subject = encodeURIComponent(`Portfolio inquiry from ${decodeURIComponent(name)}`);
    const body = encodeURIComponent(String(data.get("message") ?? ""));
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socials = [
    { label: "GitHub", href: profile.socials.github, icon: Github },
    { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ];

  const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TITLE:${profile.role}
EMAIL:${profile.email}
URL:${profile.socials.github}
URL:${profile.socials.linkedin}
ADR:;;${profile.location};;;
END:VCARD`;

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="mb-16 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionHeading
              chapter="05"
              eyebrow="Contact"
              title="Got a build that needs feel?"
              description="Hiring, collaborating, or just want to talk Unreal — drop a line. I read everything."
            />
          </div>
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <button
                type="button"
                onClick={copyEmail}
                className="group flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <span>{profile.email}</span>
                {copied ? (
                  <Check size={12} className="text-primary" />
                ) : (
                  <Copy size={12} className="opacity-60 group-hover:opacity-100" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-sm sm:p-8 lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field name="name" label="Name" placeholder="Your name" required />
                <Field name="email" label="Email" type="email" placeholder="you@studio.com" required />
              </div>
              <Field
                name="subject"
                label="Subject"
                placeholder="UE5 contractor for narrative title"
              />
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project, timeline, and tech stack."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button type="submit" size="lg" className="group">
                  {submitted ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Opening your mail client…
                    </>
                  ) : (
                    <>
                      Send message
                      <Send
                        size={14}
                        className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </Button>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Replies usually within 24h
                </p>
              </div>
            </form>
          </motion.div>

          {/* Side: map, QR, socials */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Based in
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  GMT+6
                </span>
              </div>
              <div className="flex justify-center py-4">
                <LocationMap
                  location={profile.location}
                  coordinates={profile.coordinates}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-sm">
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  vCard
                </span>
                <div className="flex justify-center">
                  <QRCode value={vcard} size={160} className="text-foreground" />
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Scan to save my contact
                </p>
              </div>

              <div className="flex flex-col gap-3 rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-sm">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Find me
                </span>
                <ul className="space-y-2">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-xl border border-border bg-background px-3 py-2 text-sm transition-colors hover:border-primary/50"
                      >
                        <span className="flex items-center gap-2 text-foreground">
                          <s.icon size={14} className="text-muted-foreground" />
                          {s.label}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className="text-muted-foreground transition-all group-hover:rotate-[-12deg] group-hover:text-primary"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      />
    </div>
  );
}
