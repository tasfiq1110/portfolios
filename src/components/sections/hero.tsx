"use client";

import * as React from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/lib/portfolio-data";

interface ThreeRefs {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  stars: THREE.Points[];
  nebula: THREE.Mesh | null;
  icosa: THREE.LineSegments | null;
  torus: THREE.LineSegments | null;
  shootingStars: { mesh: THREE.Mesh; velocity: THREE.Vector3; life: number }[];
  animationId: number | null;
  mouseX: number;
  mouseY: number;
  scrollY: number;
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

  const threeRefs = React.useRef<ThreeRefs>({
    scene: null,
    camera: null,
    renderer: null,
    stars: [],
    nebula: null,
    icosa: null,
    torus: null,
    shootingStars: [],
    animationId: null,
    mouseX: 0,
    mouseY: 0,
    scrollY: 0,
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

    // ---- Wireframe icosahedron (foreground hero geo) ----
    const icoGeo = new THREE.IcosahedronGeometry(18, 1);
    const icoEdges = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.55,
      linewidth: 1,
    });
    const icosa = new THREE.LineSegments(icoEdges, icoMat);
    icosa.position.set(-55, 12, -40);
    refs.scene.add(icosa);
    refs.icosa = icosa;

    // ---- Wireframe torus knot (right-side accent) ----
    const torusGeo = new THREE.TorusKnotGeometry(10, 2.6, 96, 16);
    const torusEdges = new THREE.EdgesGeometry(torusGeo);
    const torusMat = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.5,
    });
    const torus = new THREE.LineSegments(torusEdges, torusMat);
    torus.position.set(60, 18, -45);
    refs.scene.add(torus);
    refs.torus = torus;

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

      // Icosahedron — rotate + drift toward mouse
      if (refs.icosa) {
        refs.icosa.rotation.x += 0.003;
        refs.icosa.rotation.y += 0.005;
        // float + parallax with cursor
        refs.icosa.position.x += (-55 + refs.mouseX * 6 - refs.icosa.position.x) * 0.04;
        refs.icosa.position.y =
          12 + Math.sin(t * 0.6) * 2 + -refs.mouseY * 4;
      }

      // Torus knot
      if (refs.torus) {
        refs.torus.rotation.x += 0.004;
        refs.torus.rotation.y -= 0.006;
        refs.torus.position.x += (60 - refs.mouseX * 6 - refs.torus.position.x) * 0.04;
        refs.torus.position.y =
          18 + Math.cos(t * 0.7) * 2 + -refs.mouseY * 4;
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
      if (refs.icosa) {
        refs.icosa.geometry.dispose();
        (refs.icosa.material as THREE.Material).dispose();
        refs.icosa = null;
      }
      if (refs.torus) {
        refs.torus.geometry.dispose();
        (refs.torus.material as THREE.Material).dispose();
        refs.torus = null;
      }
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
      className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden text-white"
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

      {/* Floating data ticker (top) */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-20 z-10 -translate-x-1/2 select-none font-mono text-[10px] uppercase tracking-[0.4em] text-white/30"
      >
        UE5 ▸ C++ ▸ NIAGARA ▸ LUMEN ▸ NANITE ▸ VR
      </div>

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
          className="mb-10 max-w-2xl text-balance text-base text-zinc-400 sm:text-lg"
        >
          {profile.tagline} {profile.experienceYears}+ years shipping AAA-quality
          gameplay, AI, and immersive worlds.
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
            <a href="#contact">
              <Mail size={16} className="mr-2" />
              Get in touch
            </a>
          </Button>
        </div>

        <div
          ref={socialsRef}
          className="mt-12 flex items-center gap-5 text-zinc-500"
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
      </div>

      <a
        ref={scrollCueRef}
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 transition-colors hover:text-white"
      >
        <span>Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
