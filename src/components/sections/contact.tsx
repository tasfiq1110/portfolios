"use client";

import * as React from "react";
import { Github, Linkedin, Mail, Send, ArrowUpRight, Copy, Check, Store, Clock, FileDown } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";
import { LocationMap } from "@/components/ui/location-map";
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
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = encodeURIComponent(String(data.get("subject") ?? "").trim() || `Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${String(data.get("message") ?? "").trim()}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const socials = [
    { label: "GitHub", href: profile.socials.github, icon: Github },
    { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
    { label: "Fab", href: profile.socials.fab, icon: Store },
    { label: "Email", href: `mailto:${profile.email}`, icon: Mail },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container mx-auto">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Contact"
            title="Let's talk about the role."
            description="Hiring for a gameplay, tools, VR or ArcViz role? Tell me about the team and the problem — I read every message myself."
          />

          {/* The fastest path first: the address, big, with one-click copy. */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="xl" className="group">
              <a href={`mailto:${profile.email}`}>
                <Mail size={16} className="mr-2" />
                {profile.email}
              </a>
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xl"
              onClick={copyEmail}
              className="group"
            >
              {copied ? (
                <>
                  <Check size={15} className="mr-2 text-primary" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={15} className="mr-2 opacity-70 group-hover:opacity-100" />
                  Copy address
                </>
              )}
            </Button>
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={14} className="text-primary" />
              {profile.responseTime}
            </span>
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
            <h3 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Or draft a message here
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field name="name" label="Name" placeholder="Your name" required />
                <Field name="email" label="Email" type="email" placeholder="you@studio.com" required />
              </div>
              <Field
                name="subject"
                label="Subject"
                placeholder="What would you like to discuss?"
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
                  placeholder="Tell me about your project, the role and your timeline."
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button type="submit" size="lg" className="group">
                  {submitted ? (
                    <>
                      <Check size={16} className="mr-2" />
                      Opening your email draft…
                    </>
                  ) : (
                    <>
                      Open email draft
                      <Send
                        size={14}
                        className="ml-2 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </>
                  )}
                </Button>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Review and send in your email app
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

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col rounded-3xl border border-border bg-card/40 p-6 backdrop-blur-sm">
                <div className="mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Open to
                  </span>
                </div>
                <ul className="space-y-2">
                  {profile.openTo.map((r) => (
                    <li
                      key={r}
                      className="flex items-start gap-2 text-sm leading-relaxed text-foreground/80"
                    >
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {profile.workModes.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-border/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <Button asChild variant="outline" className="group mt-6 w-full">
                  <a href={profile.cv} target="_blank" rel="noreferrer" download>
                    <FileDown size={14} className="mr-2 transition-transform group-hover:translate-y-0.5" />
                    Download résumé
                  </a>
                </Button>
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
