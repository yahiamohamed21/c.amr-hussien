import type { Metadata } from "next";
import { Bebas_Neue, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ScrollRevealProvider } from "@/components/ScrollRevealProvider";
import { SplashScreen } from "@/components/SplashScreen";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken-grotesk",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "AMR HUSSIEN | ELITE PERFORMANCE COACHING",
  description: "Elite performance coaching for those who refuse to settle. Build the strongest version of yourself.",
};

import { DarkBackground } from "@/components/ui/DarkBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bebasNeue.variable} ${hankenGrotesk.variable} ${jetBrainsMono.variable} antialiased overflow-x-hidden`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased font-body overflow-x-hidden relative">
        <Providers>
          {/* Global Dark Mode Animated Background */}
          <div className="fixed inset-0 z-[-1] hidden dark:block">
            <DarkBackground />
          </div>

          <SplashScreen />
          <ScrollRevealProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}
