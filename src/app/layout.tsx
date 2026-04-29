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
  metadataBase: new URL("https://tasfiqurrahman.dev"),
  title: {
    default: "Tasfiqur Rahman — Unreal Engine Developer",
    template: "%s | Tasfiqur Rahman",
  },
  description:
    "Programmer & Unreal Engine developer specializing in AI systems, single-player narrative games, and VR. 4+ years building AAA-quality experiences in UE4/UE5.",
  keywords: [
    "Unreal Engine",
    "UE5",
    "C++",
    "Game Developer",
    "VR Developer",
    "AI Programmer",
    "Niagara",
    "Tasfiqur Rahman",
  ],
  authors: [{ name: "Mohammed Tasfiqur Rahman" }],
  openGraph: {
    title: "Tasfiqur Rahman — Unreal Engine Developer",
    description:
      "Real-time graphics, immersive experiences, and gameplay systems built in Unreal Engine.",
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
