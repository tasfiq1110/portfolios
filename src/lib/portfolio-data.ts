import {
  Gamepad2,
  Cpu,
  Sparkles,
  Box,
  Headset,
  Network,
  Code2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Mohammed Tasfiqur Rahman",
  shortName: "Tasfiqur Rahman",
  initials: "TR",
  role: "Programmer & Unreal Engine Developer",
  tagline: "I build immersive, real-time experiences powered by Unreal Engine.",
  location: "Dhaka, Bangladesh",
  coordinates: "23.8103° N, 90.4125° E",
  email: "tasfiqur1110@gmail.com",
  availability: "Open to full-time, contract, and remote work.",
  experienceYears: 4,
  socials: {
    github: "https://github.com/tasfiq1110",
    linkedin: "https://www.linkedin.com/in/tasfiqur-rahman-2464a8224/",
    facebook: "https://www.facebook.com/tasfiqur.rahman.1110",
    youtube: "https://www.youtube.com/@tasfiq1110",
  },
  cv: "/files/Mohammed_Tasfiqur_Rahman_CV.pdf",
  photos: {
    cinematic: "/images/portrait-cinematic.jpg",
  },
  certificate: "/images/cert.jpg",
  now: "Building large-scale Metaverse worlds in UE5 at Future Studio.",
} as const;

export const summary = [
  "I'm an Unreal Engine developer with 4+ years of hands-on production experience — shipping AAA-quality, single-player narrative games on Steam, leading teams, and building large-scale Metaverse and VR worlds.",
  "My focus is the moment-to-moment feel of interactive worlds: AI behaviour, gameplay systems, real-time graphics, and the polish that makes a build feel alive.",
];

export const highlights: { label: string; value: string }[] = [
  { label: "Years in Unreal", value: "4+" },
  { label: "Shipped on Steam", value: "1" },
  { label: "VR titles", value: "3+" },
  { label: "Engine", value: "UE4 / UE5" },
];

export type SkillNode = {
  id: number;
  title: string;
  category: string;
  icon: LucideIcon;
  date: string;
  content: string;
  status: "completed" | "in-progress" | "pending";
  energy: number;
  relatedIds: number[];
};

export const skillNodes: SkillNode[] = [
  {
    id: 1,
    title: "C++ Gameplay",
    category: "Core Engineering",
    icon: Code2,
    date: "2020 → now",
    content:
      "Production C++ for gameplay & systems: actor lifecycle, replication, GAS, custom subsystems, optimization pass-throughs.",
    status: "completed",
    energy: 95,
    relatedIds: [2, 3, 7],
  },
  {
    id: 2,
    title: "Blueprints",
    category: "Core Engineering",
    icon: Workflow,
    date: "2020 → now",
    content:
      "Blueprint architecture for designers: nativised graphs, function libraries, data-driven setup, BPI/Interface boundaries.",
    status: "completed",
    energy: 90,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "AI Systems",
    category: "Gameplay AI",
    icon: Cpu,
    date: "2021 → now",
    content:
      "Behaviour Trees, EQS, blackboards, custom services & decorators. Squad logic, perception graphs, scripted set-pieces.",
    status: "completed",
    energy: 92,
    relatedIds: [1, 4],
  },
  {
    id: 4,
    title: "Niagara VFX",
    category: "Graphics",
    icon: Sparkles,
    date: "2022 → now",
    content:
      "Niagara emitters, GPU sims, mesh particles, ribbons. Real-time effects synced to gameplay events and animation.",
    status: "completed",
    energy: 80,
    relatedIds: [3, 5, 6],
  },
  {
    id: 5,
    title: "Lumen / Nanite",
    category: "Graphics",
    icon: Box,
    date: "2023 → now",
    content:
      "UE5 lighting & geometry workflow — virtualised meshes, dynamic GI, cinematic post-processing, performance budgets.",
    status: "completed",
    energy: 78,
    relatedIds: [4, 6],
  },
  {
    id: 6,
    title: "Optimization",
    category: "Graphics",
    icon: Gamepad2,
    date: "2021 → now",
    content:
      "GPU/CPU profiling, draw-call reduction, LOD strategy, async loading. Hitch-free 60+ fps on target hardware.",
    status: "in-progress",
    energy: 85,
    relatedIds: [4, 5, 8],
  },
  {
    id: 7,
    title: "Multiplayer",
    category: "Networking",
    icon: Network,
    date: "2022 → now",
    content:
      "Replication, RPCs, server-authoritative gameplay, lag compensation. Co-op and competitive prototypes.",
    status: "in-progress",
    energy: 75,
    relatedIds: [1, 8],
  },
  {
    id: 8,
    title: "VR / Meta Quest",
    category: "Platforms",
    icon: Headset,
    date: "2024 → now",
    content:
      "VR interaction frameworks for Meta Quest. Hand & controller input, comfort-tuned locomotion, performance-first design.",
    status: "completed",
    energy: 82,
    relatedIds: [6, 7],
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
    name: "Workflow",
    icon: Code2,
    skills: [
      "Git / GitHub / SVN",
      "Cross-Team Collaboration",
      "Project Leadership & Mentoring",
      "Production Pipelines",
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  description: string;
  tech: string[];
  youtubeId: string;
  link: string;
  glow: "blue" | "purple" | "green" | "red" | "orange";
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "muktijuddho-rajarbag",
    title: "Project Muktijuddho",
    subtitle: "Rajarbag Police Line — Liberation War, 1971",
    year: "2024",
    description:
      "Third-person action set during the first night of Bangladesh's Liberation War. Dynamic combat, cinematic cameras, and reactive environments built on UE5 with multiplayer foundations.",
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
    description:
      "Tactical encounter prototype set at a Liberation War border outpost. Behaviour-tree driven AI squads, multi-stage objectives, and replicated combat in UE4.",
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
    description:
      "First-person psychological horror with stalking AI, dynamic audio cues, and a hand-camera traversal system. Built around tight-corridor pacing and perception loops.",
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
    description:
      "Modular combat framework: character selection, stamina-driven movesets, hit reactions, and damage events all wired through gameplay tags and data assets.",
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
    description:
      "Early-career archery prototype: draw-tension input mapping, projectile arc with wind, and hit feedback. The tech demo that started everything.",
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
    description:
      "Spline-based traffic simulation with intersection logic, lane-changing, and signal-aware AI vehicles. Built as a reusable systems plugin.",
    tech: ["Unreal Engine", "C++", "Splines", "AI"],
    youtubeId: "l32GTdu-mL8",
    link: "https://www.youtube.com/watch?v=l32GTdu-mL8",
    glow: "blue",
  },
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
    role: "Game Developer — Metaverse & VR",
    period: "2024 — Present",
    location: "Dhaka, Bangladesh",
    details: [
      "Building large-scale Metaverse and VR experiences in Unreal Engine 5.",
      "Persistent virtual worlds with avatars, voice chat, social hubs, and virtual economies.",
      "Multiplayer systems, marketplace integrations, gamified learning environments.",
      "Cross-border collaboration to deliver networked, real-time experiences.",
    ],
  },
  {
    company: "VincatsBD",
    role: "VR Developer",
    period: "2024",
    location: "Dhaka, BD / Seoul, KR (Remote)",
    details: [
      "Interactive VR for Meta Quest with a hard focus on performance.",
      "Built immersive environments and interaction systems in UE.",
      "Worked with a Korea-based team refining VR gameplay and UX.",
    ],
  },
  {
    company: "SpinOFF Studio",
    role: "Senior Game Developer & Team Lead",
    period: "2020 — 2024",
    location: "Dhaka, Bangladesh",
    details: [
      "Led development of single-player narrative games in Unreal Engine.",
      "Designed advanced AI, quest mechanics, and narrative gameplay flow.",
      "Optimized for multi-platform, launched titles on Steam.",
      "Mentored juniors and coordinated cross-functional teams.",
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
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
