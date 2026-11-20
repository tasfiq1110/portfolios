import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { profile } from "@/lib/portfolio-data";

const sans = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-sans", weight: "100 900" });
const mono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-mono", weight: "100 900" });
export const metadata: Metadata = {
  metadataBase: new URL("https://portfolios-liard.vercel.app"),
  title: {
    default: "Tasfiqur Rahman — Team Lead & Unreal Engine Developer",
    template: "%s | Tasfiqur Rahman",
  },
  description:
    "Team Lead and Unreal Engine developer with 6+ years shipping gameplay, AI, multiplayer, VR and architectural visualization in C++ and Blueprint. Steam releases, Meta Quest apps, four plugins published on Fab, and gameplay work on PIXO. Open to senior and lead roles, remote or on-site.",
  keywords: [
    "Unreal Engine",
    "UE5",
    "C++",
    "Game Developer",
    "Team Lead",
    "KillBack Replay",
    "VR Developer",
    "AI Programmer",
    "Niagara",
    "Unreal Engine Plugins",
    "Fab Marketplace",
    "PIXO",
    "Gameplay Programmer",
    "Multiplayer Programmer",
    "Meta Quest",
    "Architectural Visualization",
    "ArcViz",
    "Tasfiqur Rahman",
  ],
  authors: [{ name: "Mohammed Tasfiqur Rahman" }],
  openGraph: {
    title: "Tasfiqur Rahman — Team Lead & Unreal Engine Developer",
    description:
      "6+ years of gameplay, AI, multiplayer and VR in Unreal Engine. Steam releases, Meta Quest apps and four plugins published on Fab.",
    type: "website",
    locale: "en_US",
    siteName: "Tasfiqur Rahman",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tasfiqur Rahman — Team Lead & Unreal Engine Developer",
    description:
      "Gameplay, AI, multiplayer and VR in Unreal Engine. Projects, plugins and contact.",
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured data so search and recruiter tools read the profile correctly */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: profile.name,
              alternateName: profile.shortName,
              jobTitle: profile.role,
              email: `mailto:${profile.email}`,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Dhaka",
                addressCountry: "BD",
              },
              knowsAbout: [
                "Unreal Engine 5",
                "C++",
                "Gameplay Programming",
                "Game AI",
                "Multiplayer Networking",
                "Virtual Reality",
                "Niagara VFX",
                "Architectural Visualization",
              ],
              sameAs: [
                profile.socials.github,
                profile.socials.linkedin,
                profile.socials.youtube,
                profile.socials.fab,
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
