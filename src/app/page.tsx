import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Arcviz } from "@/components/sections/arcviz";
import { VR } from "@/components/sections/vr";
import { Plugins } from "@/components/sections/plugins";
import { Expertise } from "@/components/sections/expertise";
import { Experience } from "@/components/sections/experience";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Aurora } from "@/components/ui/aurora";

/**
 * Section order is recruiter-first: who I am and the proof numbers, then the
 * work itself, then how I work, then the bio, then how to reach me. Evidence
 * comes before claims, and nothing is gated behind an interaction.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <div className="relative isolate overflow-hidden">
          <Aurora />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-30"
            style={{
              maskImage:
                "radial-gradient(ellipse 80% 50% at 50% 30%, black 40%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 50% at 50% 30%, black 40%, transparent 70%)",
            }}
          />
          <Projects />
          <Arcviz />
          <VR />
          <Plugins />
          <Expertise />
          <Experience />
          <About />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
