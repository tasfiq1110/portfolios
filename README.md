# Tasfiqur Rahman — Portfolio

Personal portfolio for **Mohammed Tasfiqur Rahman**, Unreal Engine developer (Dhaka, BD).

Built hiring-manager-first: evidence before claims, nothing gated behind an
interaction, and the contact details reachable from the first screen.

## Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn-style design tokens (HSL CSS variables)
- **Motion**: Framer Motion (scroll reveals), CSS keyframes (hero)
- **Theming**: `next-themes` (dark default, system aware)
- **Icons**: lucide-react

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Structure

```
src/
├── app/
│   ├── layout.tsx           # root layout, fonts, metadata, JSON-LD, ThemeProvider
│   ├── page.tsx             # section order
│   └── globals.css          # design tokens + custom utilities
├── components/
│   ├── theme-provider.tsx
│   ├── ui/                  # primitives (button, badge, aurora, reveal, tilt,
│   │                          theme-toggle, spotlight-card, location-map,
│   │                          scroll-progress)
│   └── sections/            # nav, hero, projects, arcviz, vr, plugins,
│                              expertise, experience, about, contact, footer
└── lib/
    ├── utils.ts             # cn() helper
    └── portfolio-data.ts    # single source of truth for content
```

### Section order

`Hero → Work → ArcViz → VR → Plugins → Expertise → Experience → About → Contact`

Work comes immediately after the hero on purpose: a hiring manager gets the
proof before the self-description. About sits near the end, where a reader who
is already interested will look for it.

To update content (projects, experience, skills, copy), edit
[`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts).

## Replace before going live

- The `metadataBase` URL in `src/app/layout.tsx` once the production domain is known.
- The ArcViz write-up in `portfolio-data.ts` (`arcviz.description`, `highlights`,
  `tech`) describes standard UE5 ArcViz technique — confirm it matches what the
  project actually involved.

## Content notes

- The hero is a **server component with no client JS and no WebGL**, so the
  name, role, proof numbers and contact buttons paint immediately on any device.
  Entrance animations are CSS (`.rise-in`, sequenced with inline
  `animation-delay`).
- All video is **poster-first**: YouTube iframes only mount after the visitor
  presses play, so no section costs anything on load.
- The PIXO trailer is streamed from `playpixo.gg` and only fetched when a
  visitor presses play — the file is ~42 MB, so it must not be bundled or
  auto-loaded. Key art lives in `public/images/pixo/`.
- Hiring-facing copy (`strengths`, `proofPoints`, `profile.openTo`,
  `profile.workModes`, `profile.responseTime`) all lives in
  [`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts).
