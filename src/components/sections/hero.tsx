"use client";

import * as React from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import {
  ArrowDown,
  ArrowUpRight,
  Crosshair,
  FileDown,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, highlights } from "@/lib/portfolio-data";
import { createDroneField, type DroneField } from "@/components/ui/hero-drones";

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  drones: DroneField | null;
  shootingStars: { mesh: THREE.Mesh; velocity: THREE.Vector3; life: number }[];
  animationId: number | null;
  mouseX: number;
  mouseY: number;
  scrollY: number;
  lastFrame: number;
}

export function Hero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const titleRef = React.useRef<HTMLHeadingElement>(null);
  const taglineRef = React.useRef<HTMLParagraphElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);
  const socialsRef = React.useRef<HTMLDivElement>(null);
  const scrollCueRef = React.useRef<HTMLAnchorElement>(null);
  /** Measured periodically so drones fade out behind copy instead of over it. */
  const statsRef = React.useRef<HTMLDListElement>(null);
  const hudRef = React.useRef<HTMLDivElement>(null);
  const contentRects = React.useRef<DOMRect[]>([]);

  const [score, setScore] = React.useState(0);
  const [best, setBest] = React.useState(0);
  const [hasPlayed, setHasPlayed] = React.useState(false);
  const [coarsePointer, setCoarsePointer] = React.useState(false);

  const threeRefs = React.useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    drones: null,
    shootingStars: [],
    animationId: null,
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
    lastFrame: 0,
  });

  // ---- Three.js scene ----
  React.useEffect(() => {
    if (!canvasRef.current) return;
    const refs = threeRefs.current;

    refs.scene = new THREE.Scene();
    refs.scene.fog = new THREE.FogExp2(0x000000, 0.00025);

    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    refs.camera.position.set(0, 20, 100);

    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    refs.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    refs.renderer.toneMappingExposure = 0.6;

    // ---- Star field — 3 layers for depth ----
    const starCount = 3000;
    for (let layer = 0; layer < 3; layer++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      for (let j = 0; j < starCount; j++) {
        const radius = 200 + Math.random() * 800;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const color = new THREE.Color();
        const choice = Math.random();
        if (choice < 0.6) color.setHSL(0, 0, 0.85 + Math.random() * 0.15);
        else if (choice < 0.85) color.setHSL(0.38, 0.6, 0.7);
        else color.setHSL(0.6, 0.5, 0.75);
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
        sizes[j] = Math.random() * 2 + 0.5;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: { time: { value: 0 }, depth: { value: layer } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float a = time * 0.04 * (1.0 - depth * 0.3);
            mat2 r = mat2(cos(a), -sin(a), sin(a), cos(a));
            pos.xy = r * pos.xy;
            vec4 mv = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mv.z);
            gl_Position = projectionMatrix * mv;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float o = 1.0 - smoothstep(0.0, 0.5, d);
            gl_FragColor = vec4(vColor, o);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      refs.scene.add(points);
      refs.stars.push(points);
    }

    // ---- Nebula ----
    const nebulaGeo = new THREE.PlaneGeometry(8000, 4000, 80, 80);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color(0x10b981) }, // emerald
        color2: { value: new THREE.Color(0x6366f1) }, // indigo
        opacity: { value: 0.18 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vEl;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 p = position;
          float el = sin(p.x * 0.01 + time) * cos(p.y * 0.01 + time) * 20.0;
          p.z += el;
          vEl = el;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        uniform float time;
        varying vec2 vUv;
        varying float vEl;
        void main() {
          float m = sin(vUv.x * 10.0 + time) * cos(vUv.y * 10.0 + time);
          vec3 c = mix(color1, color2, m * 0.5 + 0.5);
          float a = opacity * (1.0 - length(vUv - 0.5) * 2.0);
          a *= 1.0 + vEl * 0.01;
          gl_FragColor = vec4(c, a);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebula.position.z = -1050;
    refs.scene.add(nebula);
    refs.nebula = nebula;

    // ---- Drone field (the hero mini-game) ----
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // Fewer targets on phones: less to draw, and less to crowd a small screen.
    const droneCount = window.innerWidth < 640 ? 4 : 6;
    refs.drones = createDroneField(refs.scene, refs.camera, refs.renderer, {
      count: droneCount,
      reducedMotion,
      onHit: () => {
        setScore((n) => n + 1);
        setHasPlayed(true);
      },
    });

    // ---- Shooting star factory ----
    const spawnShootingStar = () => {
      const startSide = Math.random() > 0.5 ? -1 : 1;
      const dir = new THREE.Vector3(
        -startSide * (3 + Math.random() * 2),
        -1 - Math.random(),
        2 + Math.random()
      );
      const trailGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(2 * 3); // line segment
      trailGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const trailMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
      });
      const trail = new THREE.Line(trailGeo, trailMat);
      refs.scene!.add(trail);
      refs.shootingStars.push({
        mesh: trail as unknown as THREE.Mesh,
        velocity: dir,
        life: 0,
      });
    };

    let lastShoot = 0;
    let lastMeasure = 0;

    // Only the boxes that actually carry text or controls, so drones still
    // have the gutters beside the headline to fly through. The nav is in the
    // list because it floats over the hero without a background of its own.
    const measureContent = () =>
      [
        document.querySelector("header"),
        badgeRef.current,
        titleRef.current,
        taglineRef.current,
        ctaRef.current,
        statsRef.current,
        socialsRef.current,
        hudRef.current,
      ]
        .filter(Boolean)
        .map((el) => (el as HTMLElement).getBoundingClientRect());

    // ---- Mouse tracking ----
    const onPointerMove = (e: PointerEvent) => {
      refs.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      refs.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointerMove);

    // ---- Scroll tracking ----
    const onScroll = () => {
      refs.scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Animate loop ----
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const t = Date.now() * 0.001;

      refs.stars.forEach((s) => {
        const m = s.material as THREE.ShaderMaterial;
        if (m.uniforms) m.uniforms.time.value = t;
      });

      if (refs.nebula) {
        const nm = refs.nebula.material as THREE.ShaderMaterial;
        if (nm.uniforms) nm.uniforms.time.value = t * 0.5;
      }

      // Camera parallax — mouse + scroll dolly
      if (refs.camera) {
        const targetX = refs.mouseX * 8 + Math.sin(t * 0.1) * 2;
        const targetY = -refs.mouseY * 5 + Math.cos(t * 0.15) + 20;
        const scrollDolly = Math.min(refs.scrollY * 0.05, 80);
        refs.camera.position.x += (targetX - refs.camera.position.x) * 0.04;
        refs.camera.position.y += (targetY - refs.camera.position.y) * 0.04;
        refs.camera.position.z = 100 - scrollDolly;
        refs.camera.lookAt(refs.mouseX * 8, 10, -600);
      }

      // Drones — drift, dim behind copy, and stay hit-testable
      if (refs.drones) {
        const dt = Math.min(0.05, t - (refs.lastFrame || t));
        refs.lastFrame = t;
        // Re-measuring every frame would mean a layout read per frame; four
        // times a second is plenty to track scrolling and resizes.
        if (t - lastMeasure > 0.25) {
          contentRects.current = measureContent();
          lastMeasure = t;
        }
        refs.drones.update(t, dt, contentRects.current);
      }

      // Shooting stars
      if (t - lastShoot > 2.2 && refs.shootingStars.length < 3) {
        spawnShootingStar();
        lastShoot = t;
      }
      refs.shootingStars.forEach((s, i) => {
        s.life += 1;
        const line = s.mesh as unknown as THREE.Line;
        const pos = (line.geometry as THREE.BufferGeometry).attributes
          .position as THREE.BufferAttribute;
        // head
        const head = new THREE.Vector3(
          (pos.array[0] as number) + s.velocity.x,
          (pos.array[1] as number) + s.velocity.y,
          (pos.array[2] as number) + s.velocity.z
        );
        if (s.life === 1) {
          // initialize from origin to current
          pos.setXYZ(0, head.x, head.y, head.z);
          pos.setXYZ(1, head.x - s.velocity.x * 12, head.y - s.velocity.y * 12, head.z - s.velocity.z * 12);
        } else {
          pos.setXYZ(0, head.x, head.y, head.z);
          pos.setXYZ(1, head.x - s.velocity.x * 12, head.y - s.velocity.y * 12, head.z - s.velocity.z * 12);
        }
        pos.needsUpdate = true;
        const mat = line.material as THREE.LineBasicMaterial;
        mat.opacity = Math.max(0, 1 - s.life / 90);
        if (s.life > 90) {
          refs.scene?.remove(line);
          line.geometry.dispose();
          (line.material as THREE.Material).dispose();
          refs.shootingStars.splice(i, 1);
        }
      });

      refs.renderer?.render(refs.scene!, refs.camera!);
    };
    animate();

    const onResize = () => {
      if (refs.camera && refs.renderer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      refs.stars.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      refs.stars = [];
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
        refs.nebula = null;
      }
      refs.drones?.dispose();
      refs.drones = null;
      refs.shootingStars.forEach((s) => {
        const line = s.mesh as unknown as THREE.Line;
        refs.scene?.remove(line);
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      refs.shootingStars = [];
      refs.renderer?.dispose();
    };
  }, []);

  // ---- Best score, kept per browser ----
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem("hero-drones-best");
      if (stored) setBest(parseInt(stored, 10) || 0);
    } catch {
      /* private mode, blocked storage — the game just won't remember */
    }
    setCoarsePointer(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  React.useEffect(() => {
    if (score <= best) return;
    setBest(score);
    try {
      window.localStorage.setItem("hero-drones-best", String(score));
    } catch {
      /* non-fatal */
    }
  }, [score, best]);

  // ---- Tap / click to shoot ----
  React.useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    let startX = 0;
    let startY = 0;
    let startAt = 0;

    const onDown = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      startAt = e.timeStamp;
    };

    const onUp = (e: PointerEvent) => {
      // Never swallow a real control: links and buttons keep their own job.
      if ((e.target as HTMLElement).closest("a, button, input, textarea")) return;
      // Only a tap counts — a drag is a scroll or a text selection.
      if (Math.hypot(e.clientX - startX, e.clientY - startY) > 10) return;
      if (e.timeStamp - startAt > 500) return;

      if (threeRefs.current.drones?.shoot(e.clientX, e.clientY)) {
        setHasPlayed(true);
      }
    };

    section.addEventListener("pointerdown", onDown);
    section.addEventListener("pointerup", onUp);
    return () => {
      section.removeEventListener("pointerdown", onDown);
      section.removeEventListener("pointerup", onUp);
    };
  }, []);

  // ---- GSAP entrance — use fromTo with explicit end state to survive
  //      React 18 Strict Mode double-mount cleanup ----
  React.useEffect(() => {
    // Capture refs at effect-run time so cleanup uses the same nodes
    const badge = badgeRef.current;
    const title = titleRef.current;
    const tagline = taglineRef.current;
    const cta = ctaRef.current;
    const socials = socialsRef.current;
    const scrollCue = scrollCueRef.current;

    const animatable = [badge, tagline, cta, socials, scrollCue].filter(
      Boolean
    ) as HTMLElement[];

    // make sure nothing starts hidden if a previous tween left bad state
    gsap.set(animatable, { clearProps: "all" });

    const tl = gsap.timeline();

    if (badge) {
      tl.fromTo(
        badge,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }

    if (tagline) {
      tl.fromTo(
        tagline,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    }
    if (cta) {
      tl.fromTo(
        cta,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
    }
    if (socials) {
      tl.fromTo(
        socials,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
    }
    if (scrollCue) {
      tl.fromTo(
        scrollCue,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
      const all = [badge, title, tagline, cta, socials, scrollCue].filter(
        Boolean
      ) as HTMLElement[];
      gsap.set(all, { clearProps: "all" });
    };
  }, []);

  // ---- Mouse-tracked tilt on the title for that 3D dev feel ----
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(container, {
        "--tilt-x": `${y * -6}deg`,
        "--tilt-y": `${x * 6}deg`,
        duration: 0.6,
        ease: "power3.out",
      });
    };
    const onLeave = () => {
      gsap.to(container, {
        "--tilt-x": "0deg",
        "--tilt-y": "0deg",
        duration: 1,
        ease: "elastic.out(1, 0.4)",
      });
    };
    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", onLeave);
    return () => {
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Wrap each word in inline-block + whitespace-nowrap so individual chars
  // never break mid-word — line breaks can only happen between words.
  const splitWords = (text: string) => {
    const words = text.split(" ");
    return words.map((word, wi) => (
      <span key={wi} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <span key={ci} className="title-char inline-block">
            {char}
          </span>
        ))}
        {wi < words.length - 1 && (
          <span className="inline-block w-[0.35em]" />
        )}
      </span>
    ));
  };


  return (
    <section
      id="home"
      ref={containerRef}
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden py-28 text-white sm:py-24"
      style={
        {
          ["--tilt-x" as string]: "0deg",
          ["--tilt-y" as string]: "0deg",
          perspective: "1200px",
          // Ui-ux-pro-max: avoid pure #000 (OLED smear). Use deep gradient.
          background:
            "radial-gradient(ellipse at top, #0a0a0f 0%, #050508 50%, #020203 100%)",
        } as React.CSSProperties
      }
    >
      <canvas ref={canvasRef} className="absolute inset-0 -z-10 h-full w-full" />

      {/* Vignette + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 80%)",
        }}
      />
      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 -z-[5] bg-gradient-to-b from-transparent to-background"
      />

      {/* Coordinate HUD corners */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 z-10 select-none"
      >
        <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-white/20" />
        <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-white/20" />
        <span className="absolute bottom-24 left-0 h-3 w-3 border-b border-l border-white/20" />
        <span className="absolute bottom-24 right-0 h-3 w-3 border-b border-r border-white/20" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.4em] text-white/30 pr-3">
          {profile.location} · {profile.coordinates}
        </span>
      </div>

      {/* Main content with 3D tilt */}
      <div
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
        style={{
          transform:
            "rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) translateZ(0)",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={badgeRef}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-300">
            {profile.role}
          </span>
        </div>

        <h1
          ref={titleRef}
          className="title-rise mb-6 block text-balance text-center font-display text-[clamp(2.25rem,7.2vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.04em]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.55) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {splitWords("TASFIQUR RAHMAN")}
        </h1>

        <p
          ref={taglineRef}
          className="mb-8 max-w-2xl text-balance text-base text-zinc-400 sm:text-lg"
        >
          {profile.tagline} {profile.experienceYears}+ years shipping games,
          multiplayer systems and VR — plus four plugins other developers build on.
        </p>

        <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="xl" className="group">
            <a href="#projects">
              View Projects
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
            <a href="#contact">
              <Mail size={16} className="mr-2" />
              Get in touch
            </a>
          </Button>
        </div>

        {/* Credibility strip — the numbers a hiring manager scans for */}
        <dl
          ref={statsRef}
          className="mt-12 grid w-full max-w-2xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
        >
          {highlights.map((h) => (
            <div key={h.label} className="bg-black/40 px-4 py-4 backdrop-blur-sm">
              <dd className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
                {h.value}
              </dd>
              <dt className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">
                {h.label}
              </dt>
            </div>
          ))}
        </dl>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
          {profile.availability} · {profile.timezone}
        </p>

        <div
          ref={socialsRef}
          className="mt-8 flex items-center gap-5 text-zinc-500"
        >
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
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="transition-colors hover:text-white"
          >
            <Mail size={18} />
          </a>
        </div>

        {/* Mini-game scoreboard — decorative, so it stays out of the tab order */}
        <div
          ref={hudRef}
          aria-hidden
          className="mt-8 flex select-none items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm"
        >
          <Crosshair
            size={12}
            className={score > 0 ? "text-emerald-400" : "text-white/40"}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">
            {hasPlayed ? (
              <>
                {score} <span className="text-white/30">/ best {best}</span>
              </>
            ) : (
              <>{coarsePointer ? "Tap" : "Click"} the drones</>
            )}
          </span>
        </div>
      </div>

      <a
        ref={scrollCueRef}
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono lg:flex text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition-colors hover:text-white"
      >
        <span>Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
