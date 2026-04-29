# Tasfiqur Rahman — Portfolio

Personal portfolio for **Mohammed Tasfiqur Rahman**, Unreal Engine developer (Dhaka, BD).

## Stack

- **Framework**: Next.js 14 (App Router) + React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn-style design tokens (HSL CSS variables)
- **Motion**: Framer Motion + GSAP
- **3D**: Three.js (custom shaders, particle field, nebula)
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
│   ├── layout.tsx           # root layout, fonts, metadata, ThemeProvider
│   ├── page.tsx             # composes all sections
│   └── globals.css          # design tokens + custom utilities
├── components/
│   ├── theme-provider.tsx
│   ├── ui/                  # primitives (button, badge, card,
│   │                          theme-toggle, spotlight-card,
│   │                          location-map, qr-code, orbital-skills)
│   └── sections/            # nav, hero, about, skills, projects,
│                              experience, contact, footer
└── lib/
    ├── utils.ts             # cn() helper
    └── portfolio-data.ts    # single source of truth for content
```

To update content (projects, experience, skills, copy), edit
[`src/lib/portfolio-data.ts`](src/lib/portfolio-data.ts).

## Replace before going live

- `public/files/Mohammed_Tasfiqur_Rahman_CV.pdf` — drop your real CV here.
- The `metadataBase` URL in `src/app/layout.tsx` once the production domain is known.

## References

The original component sketches that inspired this site live in
[`_references/`](./_references/). They are not imported by the build.
