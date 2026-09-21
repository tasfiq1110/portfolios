import {
  Gamepad2,
  Cpu,
  Sparkles,
  Box,
  Headset,
  Network,
  Code2,
  Workflow,
  Puzzle,
  BrainCircuit,
  Gauge,
  Users,
  Rocket,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Mohammed Tasfiqur Rahman",
  shortName: "Tasfiqur Rahman",
  initials: "TR",
  role: "Team Lead & Unreal Engine Developer",
  tagline: "I build gameplay, AI systems and developer tools in Unreal Engine.",
  location: "Dhaka, Bangladesh",
  coordinates: "23.8103° N, 90.4125° E",
  email: "tasfiqur1110@gmail.com",
  availability: "Open to full-time, contract and remote roles.",
  experienceYears: 6,
  socials: {
    github: "https://github.com/tasfiq1110",
    linkedin: "https://www.linkedin.com/in/tasfiqur-rahman-2464a8224/",
    facebook: "https://www.facebook.com/tasfiqur.rahman.1110",
    youtube: "https://www.youtube.com/@tasfiq1110",
    fab: "https://www.fab.com/sellers/Tasfiqur%20Rahman",
  },
  cv: "/files/Mohammed_Tasfiqur_Rahman_CV%20.pdf",
  photos: {
    cinematic: "/images/portrait-cinematic.jpg",
  },
  certificate: "/images/cert.jpg",
  now: "Team Lead at Future Studio Bangladesh, and contributing gameplay work to PIXO, an open-world action adventure.",
  openTo: [
    "Senior / Lead Gameplay Programmer",
    "Unreal Engine Generalist (C++ & Blueprint)",
    "Tools & Engine Programmer",
    "VR / Multiplayer Engineer",
  ],
  workModes: ["Full-time", "Contract", "Remote", "Relocation considered"],
  responseTime: "Usually replies within 24 hours",
  timezone: "GMT+6 — overlaps EU mornings and US evenings",
} as const;

export const summary = [
  "I'm an Unreal Engine developer with 6+ years of experience in gameplay programming, AI, multiplayer and VR. I currently lead metaverse and VR development at Future Studio Bangladesh, where I own architecture decisions and mentor the engineers who build on them.",
  "I've shipped single-player narrative games on Steam, built server-authoritative multiplayer systems and delivered Meta Quest experiences that hold frame budget on mobile hardware. I work fluently in C++ and Blueprint, and I'm the person teams bring in to debug the hard bug and get the build back under budget.",
  "Alongside studio work I build and sell Unreal Engine plugins on Fab — killcam replay, on-device LLMs for NPCs, volumetric pathfinding and editor-side sound generation — and I contribute gameplay work to PIXO, an open-world action adventure now in public demo.",
];

export type SkillNode = {
  id: number;
  title: string;
  category: string;
  icon: LucideIcon;
  content: string;
  relatedIds: number[];
};

export const skillNodes: SkillNode[] = [
  {
    id: 1,
    title: "C++ Gameplay",
    category: "Core Engineering",
    icon: Code2,
    content:
      "Gameplay systems in C++, including actor components, replication, custom subsystems and performance optimization.",
    relatedIds: [2, 3, 7, 9],
  },
  {
    id: 2,
    title: "Blueprints",
    category: "Core Engineering",
    icon: Workflow,
    content:
      "Reusable Blueprint systems, function libraries and interfaces that designers can configure through data assets.",
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "AI Systems",
    category: "Gameplay AI",
    icon: Cpu,
    content:
      "AI behaviour using Behaviour Trees, EQS, blackboards and perception, with custom services and decorators.",
    relatedIds: [1, 4, 10],
  },
  {
    id: 4,
    title: "Niagara VFX",
    category: "Graphics",
    icon: Sparkles,
    content:
      "Niagara emitters, GPU particles and ribbons, connected to gameplay events and animation.",
    relatedIds: [3, 5, 6],
  },
  {
    id: 5,
    title: "Lumen / Nanite",
    category: "Graphics",
    icon: Box,
    content:
      "UE5 lighting and geometry workflows using Lumen, Nanite and post-processing, with attention to performance budgets.",
    relatedIds: [4, 6],
  },
  {
    id: 6,
    title: "Optimization",
    category: "Graphics",
    icon: Gamepad2,
    content:
      "CPU and GPU profiling, draw-call reduction, LODs and asynchronous loading to improve frame times on target hardware.",
    relatedIds: [4, 5, 8],
  },
  {
    id: 7,
    title: "Multiplayer",
    category: "Networking",
    icon: Network,
    content:
      "Replication, RPCs and server-authoritative gameplay for multiplayer systems and prototypes.",
    relatedIds: [1, 8],
  },
  {
    id: 8,
    title: "VR / Meta Quest",
    category: "Platforms",
    icon: Headset,
    content:
      "Meta Quest interaction systems, controller input and locomotion, with a focus on comfort and stable performance.",
    relatedIds: [6, 7],
  },
  {
    id: 9,
    title: "Engine Plugins",
    category: "Tools & Plugins",
    icon: Puzzle,
    content:
      "C++ plugins for Unreal Engine, including runtime replay systems, editor tools and Blueprint APIs. Published on Fab.",
    relatedIds: [1, 10, 3],
  },
  {
    id: 10,
    title: "On-Device AI",
    category: "Tools & Plugins",
    icon: BrainCircuit,
    content:
      "Local LLM integration for NPC dialogue, gameplay tool calls and structured JSON output, plus sound generation on Vulkan GPUs.",
    relatedIds: [9, 3],
  },
];

export const skillGroups = [
  {
    name: "Game Development",
    icon: Gamepad2,
    skills: [
      "Unreal Engine 4 / 5",
      "C++ Gameplay & Systems",
      "Blueprint Architecture",
      "AI (BT, EQS, State Machines)",
      "VR (Meta Quest / Oculus)",
      "Single-Player Narrative",
      "Multiplayer & Replication",
      "Level Design & World Building",
    ],
  },
  {
    name: "Graphics & Tech Art",
    icon: Sparkles,
    skills: [
      "Niagara VFX & Particle Systems",
      "Materials, Shaders, Procedural FX",
      "Lighting, Post-Processing, Cinematics",
      "Lumen / Nanite Workflow",
      "Performance Optimization",
      "GPU Profiling & Debugging",
    ],
  },
  {
    name: "Tools & Plugins",
    icon: Puzzle,
    skills: [
      "UE5 Runtime & Editor Plugins",
      "Killcam & Replay Systems",
      "Fab Marketplace Publishing",
      "Offline LLM Integration (GGUF)",
      "3D Pathfinding (Sparse Voxel Octree, A*)",
      "Multithreading & Async Tasks",
      "Vulkan GPU Inference",
    ],
  },
  {
    name: "Leadership & Delivery",
    icon: Code2,
    skills: [
      "Leading cross-discipline engineering teams",
      "Technical direction & code review",
      "Mentoring junior developers",
      "Steam & Meta Quest release pipelines",
      "Git / Perforce / SVN workflows",
      "Working across time zones (KR, EU, US)",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  /** What I personally owned on this project — the first thing a hiring manager looks for. */
  role: string;
  description: string;
  /** Concrete things I built or solved. Shown on the flagship card. */
  highlights?: string[];
  tech: string[];
  youtubeId?: string;
  /** Key art, for projects without a video. */
  image?: string;
  /** Self-hosted trailer, played inline on click. */
  videoUrl?: string;
  link: string;
  /** Live site / store page, when the project has one. */
  liveUrl?: string;
  liveLabel?: string;
  status?: string;
  glow: "blue" | "purple" | "green" | "red" | "orange";
  featured?: boolean;
  /** One project gets the full-width hero treatment. */
  flagship?: boolean;
};

export const projects: Project[] = [
  {
    slug: "pixo",
    title: "PIXO",
    subtitle: "Open-world action adventure",
    year: "2026",
    role: "Gameplay programmer — part of the PIXO development team",
    status: "In development · playable demo out now",
    description:
      "A fast-paced open-world action adventure I'm contributing to as a gameplay programmer. Players jump, dash and fight through forests, floating islands and untamed lands, bending time with a localised Time Bubble to read each enemy's pattern and find the opening.",
    highlights: [
      "Time Bubble — a localised time-dilation field that slows enemies and projectiles inside it while the player moves at full speed",
      "Traversal-first movement: chained jumps, dashes and air control tuned for flow through vertical, open terrain",
      "Enemy roster of machines and creatures, each with readable tells and exploitable weaknesses",
      "An open world spanning lush forests, floating islands and untamed lands, now out as a playable public demo",
    ],
    tech: ["Unreal Engine 5", "C++", "Open World", "Action Combat"],
    image: "/images/pixo/1.png",
    videoUrl: "https://playpixo.gg/video/trailer.mp4",
    link: "https://playpixo.gg",
    liveUrl: "https://playpixo.gg",
    liveLabel: "Visit playpixo.gg",
    glow: "purple",
    featured: true,
    flagship: true,
  },
  {
    slug: "muktijuddho-rajarbag",
    title: "Project Muktijuddho",
    subtitle: "Rajarbag Police Line — Liberation War, 1971",
    year: "2024",
    role: "Lead developer — combat, cinematics and multiplayer",
    description:
      "A third-person action game set during the first night of Bangladesh's Liberation War, with combat, cinematic cameras and multiplayer systems built in UE5.",
    tech: ["Unreal Engine 5", "C++", "Multiplayer", "Cinematics"],
    youtubeId: "IBL3QXyYtl8",
    link: "https://www.youtube.com/watch?v=IBL3QXyYtl8",
    glow: "orange",
    featured: true,
  },
  {
    slug: "muktijuddho-nokhsi-bop",
    title: "Project Muktijuddho",
    subtitle: "Nokhsi BOP — Border Outpost",
    year: "2023",
    role: "Gameplay & AI programmer",
    description:
      "A tactical prototype set at a Liberation War border outpost, with AI squads, multi-stage objectives and replicated combat in UE4.",
    tech: ["Unreal Engine 4", "Blueprints", "Behavior Trees", "Multiplayer"],
    youtubeId: "rKjJ5FUsy2w",
    link: "https://www.youtube.com/watch?v=rKjJ5FUsy2w",
    glow: "red",
    featured: true,
  },
  {
    slug: "ghost-of-arena",
    title: "The Ghost of Arena",
    subtitle: "Outlast-inspired horror",
    year: "2023",
    role: "Gameplay programmer — AI and player systems",
    description:
      "A first-person horror project with stalking AI, audio cues and a handheld camera, built around exploration and pursuit.",
    tech: ["Unreal Engine", "C++", "AI Perception"],
    youtubeId: "KGU6wkyqFvI",
    link: "https://www.youtube.com/watch?v=KGU6wkyqFvI",
    glow: "purple",
    featured: true,
  },
  {
    slug: "combat-system",
    title: "Combat System",
    subtitle: "Character-select arena combat",
    year: "2022",
    role: "Systems programmer",
    description:
      "A modular combat framework with character selection, stamina, hit reactions and damage events, configured through gameplay tags and data assets.",
    tech: ["Unreal Engine", "C++", "Gameplay Tags"],
    youtubeId: "N78YzbRtNkg",
    link: "https://www.youtube.com/watch?v=N78YzbRtNkg",
    glow: "green",
  },
  {
    slug: "archery",
    title: "Archery Mechanic",
    subtitle: "Physics-driven bow & arrow",
    year: "2021",
    role: "Gameplay programmer",
    description:
      "An archery prototype with bow-draw input, projectile trajectories, wind and hit feedback.",
    tech: ["Unreal Engine", "C++", "Physics"],
    youtubeId: "t-1WqyUR5ls",
    link: "https://www.youtube.com/watch?v=t-1WqyUR5ls",
    glow: "blue",
  },
  {
    slug: "traffic-system",
    title: "Traffic System",
    subtitle: "Autonomous AI traffic",
    year: "2021",
    role: "Systems programmer",
    description:
      "Spline-based traffic simulation with intersection logic, lane-changing, and signal-aware AI vehicles. Built as a reusable systems plugin.",
    tech: ["Unreal Engine", "C++", "Splines", "AI"],
    youtubeId: "l32GTdu-mL8",
    link: "https://www.youtube.com/watch?v=l32GTdu-mL8",
    glow: "blue",
  },
];

export type Plugin = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  youtubeId: string;
  link: string;
  glow: "blue" | "purple" | "green" | "red" | "orange";
  featured?: boolean;
};

export const fabStore = "https://www.fab.com/sellers/Tasfiqur%20Rahman";

export const plugins: Plugin[] = [
  {
    slug: "killback-replay",
    title: "KillBack Replay",
    tagline: "Killcams and instant replays for Unreal Engine",
    description:
      "Records recent gameplay in a rolling memory buffer and plays it back with visual replay actors. Built for multiplayer killcams, instant replays and saved highlights.",
    features: [
      "Killer POV transfer with Replay Relay",
      "Animation, audio, Niagara/VFX and HUD replay",
      "Camera modes, seeking, frame stepping and slow motion",
      "Save and load clips through Blueprint or C++",
    ],
    tech: ["UE 5.3–5.8", "C++", "Blueprint", "Multiplayer"],
    youtubeId: "GW_zKS7dztw",
    link: "https://www.fab.com/listings/487a5d15-a0de-4c1f-beba-180dadc86ce7",
    glow: "orange",
    featured: true,
  },
  {
    slug: "local-mind-ai",
    title: "Local Mind AI",
    tagline: "Local language models for NPCs",
    description:
      "Runs language models on the player's machine in a separate process, with automatic recovery. Supports NPC conversations and gameplay actions through Blueprint and C++.",
    features: [
      "Crash-isolated helper process with auto-restart",
      "Streaming dialogue and vision input",
      "Tool calling that triggers gameplay functions",
      "Grammar-constrained JSON and semantic memory",
    ],
    tech: ["UE 5.3–5.7", "C++", "GGUF", "Vulkan"],
    youtubeId: "tMeCGRFmwsU",
    link: "https://www.fab.com/listings/33c5fe47-b9ab-4088-94b7-de9e07d28282",
    glow: "purple",
  },
  {
    slug: "aeronav-3d",
    title: "AeroNav 3D",
    tagline: "Volumetric pathfinding for flying AI",
    description:
      "3D pathfinding for flying, underwater and zero-gravity AI, using an editor-baked Sparse Voxel Octree to navigate around level geometry.",
    features: [
      "One-click Sparse Voxel Octree bake in the editor",
      "A* search with line-of-sight path smoothing",
      "Asynchronous path queries on worker threads",
      "Path-following component with banking and re-pathing",
    ],
    tech: ["UE5", "C++", "SVO", "A*"],
    youtubeId: "UAn1u2DhY78",
    link: "https://www.fab.com/listings/780d4113-034d-456a-8a47-d1adbfb3f19c",
    glow: "blue",
  },
  {
    slug: "infinity-local-sound-ai",
    title: "Infinity Local Sound AI",
    tagline: "Text-to-sound effects in the editor",
    description:
      "Generates sound effects and ambience from text prompts on your machine. Runs in the Unreal Editor without adding a runtime module to packaged games.",
    features: [
      "Vulkan GPU generation with a CPU fallback",
      "Non-destructive waveform editor: trim, fade, pitch",
      "Reproducible seeds, metadata written into the WAV",
      "44.1 kHz, 24-bit stereo export",
    ],
    tech: ["UE 5.3–5.8", "C++", "Vulkan", "Editor Tool"],
    youtubeId: "i8YuWx_HMm4",
    link: "https://www.fab.com/listings/303eb452-ae16-497f-b5bc-4b9466da68e5",
    glow: "green",
  },
];

export const highlights: { label: string; value: string; hint?: string }[] = [
  { label: "Years in Unreal", value: `${profile.experienceYears}+`, hint: "UE4 & UE5, C++ and Blueprint" },
  { label: "Shipped projects", value: `${projects.length}`, hint: "Games, prototypes and systems" },
  { label: "Plugins on Fab", value: String(plugins.length), hint: "Sold to other UE developers" },
  { label: "Platforms", value: "PC · Quest", hint: "Steam releases and Meta Quest VR" },
];

/** Recruiter-facing: what I actually take ownership of on a team. */
export type Strength = {
  title: string;
  icon: LucideIcon;
  description: string;
  proof: string;
};

export const strengths: Strength[] = [
  {
    title: "Ship complete games",
    icon: Rocket,
    description:
      "I take features from a one-line brief to a signed build: prototype, production code, polish, QA notes and release. I've done it for Steam titles, Meta Quest apps and PIXO.",
    proof: "Steam · Meta Quest · PIXO",
  },
  {
    title: "Own the hard systems",
    icon: Wrench,
    description:
      "Replication, AI, replay buffers, volumetric pathfinding, on-device inference. The systems that touch the whole codebase and have to keep working when the team grows.",
    proof: "C++ · Blueprint · Multiplayer",
  },
  {
    title: "Make it run fast",
    icon: Gauge,
    description:
      "Profiling, draw-call and LOD work, async loading and GPU debugging — bringing a build back inside frame budget, including on mobile VR hardware where there's nowhere to hide.",
    proof: "Unreal Insights · RenderDoc",
  },
  {
    title: "Lead and unblock people",
    icon: Users,
    description:
      "I lead engineering at Future Studio, review code, mentor juniors and work with designers, artists and international partners. I'm the person the team brings the blocking bug to.",
    proof: "Team Lead since 2020",
  },
];

/** External, verifiable evidence — the links a hiring manager can click. */
export const proofPoints: { label: string; value: string; href: string }[] = [
  { label: "Shipping now", value: "PIXO — playpixo.gg", href: "https://playpixo.gg" },
  { label: "Fab marketplace", value: "4 published plugins", href: fabStore },
  { label: "GitHub", value: "@tasfiq1110", href: profile.socials.github },
  { label: "Gameplay reels", value: "YouTube channel", href: profile.socials.youtube },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  details: string[];
};

export const experience: Experience[] = [
  {
    company: "Future Studio Bangladesh",
    role: "Team Lead",
    period: "2024 — Present",
    location: "Dhaka, Bangladesh",
    details: [
      "Lead metaverse and VR development in Unreal Engine 5.",
      "Build avatar systems, voice chat, social hubs and virtual economies for multiplayer worlds.",
      "Work with international teams on marketplace integration and gamified learning features.",
    ],
  },
  {
    company: "VincatsBD",
    role: "VR Developer",
    period: "2024",
    location: "Dhaka, BD / Seoul, KR (Remote)",
    details: [
      "Developed Meta Quest environments and interaction systems in Unreal Engine.",
      "Optimized VR applications for stable performance.",
      "Worked with a South Korea-based team to refine VR gameplay and interaction design.",
    ],
  },
  {
    company: "SpinOFF Studio",
    role: "Senior Game Developer & Team Lead",
    period: "2020 — 2024",
    location: "Dhaka, Bangladesh",
    details: [
      "Led development of single-player narrative games in Unreal Engine.",
      "Designed AI systems, quests and gameplay mechanics.",
      "Optimized game performance and led releases on Steam.",
      "Mentored junior developers and coordinated work across disciplines.",
    ],
  },
];

export const education = [
  {
    institution: "East West University",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "2020 — 2024",
    location: "Dhaka, Bangladesh",
  },
];

export const certifications = [
  {
    name: "200 Hours Course Completion",
    issuer: "ICT Division, Government of Bangladesh",
    year: "2022",
    image: "/images/cert.jpg",
  },
];

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Strengths", href: "#capabilities" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Plugins", href: "#plugins" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
