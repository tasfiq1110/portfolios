import type { Metadata } from "next";
import { Space_Grotesk, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { Cursor } from "@/components/ui/cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// Per ui-ux-pro-max: "Minimalist Portfolio" pairing — distinctive headers + clean body
const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const sans = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolios-liard.vercel.app"),
  title: {
    default: "Tasfiqur Rahman — Team Lead & Unreal Engine Developer",
    template: "%s | Tasfiqur Rahman",
  },
  description:
    "Team Lead and Unreal Engine developer with 6+ years of experience in C++, gameplay, AI, multiplayer and VR. Explore my projects and four published Fab plugins.",
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
    "Tasfiqur Rahman",
  ],
  authors: [{ name: "Mohammed Tasfiqur Rahman" }],
  openGraph: {
    title: "Tasfiqur Rahman — Team Lead & Unreal Engine Developer",
    description:
      "Gameplay, AI, multiplayer and VR projects, plus Unreal Engine plugins published on Fab.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <ScrollProgress />
            <Cursor />
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
