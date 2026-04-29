import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { Aurora } from "@/components/ui/aurora";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <div className="relative isolate overflow-hidden">
          {/* Atmospheric aurora blobs */}
          <Aurora />
          {/* Subtle grid background for the body */}
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
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
