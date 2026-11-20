import Image from "next/image";
import { Download, Github, Linkedin, MapPin, Play, Terminal } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  arcviz, certifications, education, experience, plugins, profile, projects,
  skillGroups, vrVideos, type Project,
} from "@/lib/portfolio-data";
import "./portfolio.css";

function GameCard({ project }: { project: Project }) {
  return (
    <article className="game-card">
      {project.image ? (
        <video controls poster={project.image} preload="none" aria-label={project.title + " trailer"} src={project.videoUrl} />
      ) : (
        <a href={project.link} className="deliver-cover" aria-label={"View " + project.title + " on itch.io"}>
          <span aria-hidden="true">THE LAST<br />DELIVER</span>
        </a>
      )}
      <div className="card-copy">
        <p className="caption">{project.tech[0]} <span>/</span> {project.role.split(" — ")[0]}</p>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <a className="text-link" href={project.link}>{project.liveLabel}</a>
      </div>
    </article>
  );
}

export default function Home() {
  const [pixo, deliver, ...archive] = projects;
  return (
    <div className="folio" id="home">
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-head">
        <div className="frame head-inner">
          <a className="identity" href="#home"><Terminal aria-hidden="true" />{profile.shortName}</a>
          <nav aria-label="Main navigation">
            <a href="#work">Work</a><a href="#plugins">Plugins</a><a href="#experience">Experience</a><a href="#contact">Contact</a>
          </nav>
          <ThemeToggle />
        </div>
      </header>
      <main id="main" className="frame">
        <section className="intro" aria-labelledby="name">
          <div>
            <p className="caption accent">Gameplay programmer / Team lead</p>
            <h1 id="name">Tasfiqur<br />Rahman<span>.</span></h1>
            <p className="lead">I build gameplay, AI systems and developer tools in Unreal Engine. I lead the engineering team at Future Studio Bangladesh.</p>
            <div className="actions"><a className="solid" href="#work">Explore my work</a><a className="outline" href={profile.cv} download><Download size={16} />Download CV</a></div>
            <p className="location"><MapPin size={15} />{profile.location}</p>
          </div>
          <figure className="portrait"><Image src={profile.photos.cinematic} alt={profile.name} fill priority sizes="(max-width: 760px) 94vw, 40vw" /></figure>
        </section>
        <section id="work" className="section">
          <h2>Selected games<span>.</span></h2>
          <div className="games"><GameCard project={pixo} /><GameCard project={deliver} /></div>
          <details className="archive"><summary>More games &amp; prototypes <small>({archive.length})</small></summary>
            <div className="catalog">{archive.map(p => <article key={p.slug}><p className="caption">{p.year} / {p.role}</p><h3><a href={p.link}>{p.title}</a></h3><strong>{p.subtitle}</strong><p>{p.description}</p><a className="text-link" href={p.link}>Watch gameplay</a></article>)}</div>
          </details>
        </section>
        <section id="plugins" className="section"><h2>Developer tools<span>.</span></h2>
          <div className="catalog">{plugins.map(p => <article key={p.slug}><p className="caption">{p.tech[0]}</p><h3>{p.title}</h3><p>{p.description}</p><div className="links"><a className="text-link" href={p.link}>View on Fab</a><a href={'https://youtu.be/' + p.youtubeId}>Watch demo</a></div></article>)}</div>
        </section>
        <section id="vr" className="section"><h2>VR &amp; visualization<span>.</span></h2><div className="reels">
          <a id="arcviz" href={arcviz.link}><span><small>Future Studio</small>{arcviz.title}</span><Play size={18}/></a>
          {vrVideos.map(v => <a key={v.slug} href={'https://youtu.be/' + v.youtubeId}><span><small>Samsung demo</small>{v.title}</span><Play size={18}/></a>)}
        </div></section>
        <section id="experience" className="section split"><h2>Experience<span>.</span></h2><div>{experience.map(e => <article className="job" key={e.company}><p className="caption">{e.period}</p><h3>{e.role}</h3><strong>{e.company}</strong><ul>{e.details.map(d => <li key={d}>{d}</li>)}</ul></article>)}</div></section>
        <section id="expertise" className="section split"><h2>Skills &amp;<br />education<span>.</span></h2><div>{skillGroups.map(g => <details className="skill" key={g.name}><summary>{g.name}</summary><p>{g.skills.join(" · ")}</p></details>)}{education.map(e => <div className="qualification" key={e.degree}><p className="caption">{e.period}</p><h3>{e.degree}</h3><p>{e.institution}</p></div>)}{certifications.map(c => <a className="text-link" key={c.name} href={c.image}>{c.issuer} certificate ({c.year})</a>)}</div></section>
        <section id="contact" className="section contact"><h2>Get in touch<span>.</span></h2><p>{profile.availability}.</p><a className="mail" href={'mailto:' + profile.email}>{profile.email}</a><div className="links"><a href={profile.socials.github}><Github size={17}/>GitHub</a><a href={profile.socials.linkedin}><Linkedin size={17}/>LinkedIn</a><a href={profile.socials.youtube}>YouTube</a><a href={profile.socials.facebook}>Facebook</a></div></section>
      </main>
      <footer className="frame"><span>{profile.name}</span><a href="#home">Back to top</a></footer>
    </div>
  );
}
