"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function DarkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Ambient movement for the glow
    gsap.to(glowRef.current, {
      xPercent: 5,
      yPercent: -4,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Pulse for a more "alive / energetic" gym feel
    gsap.to(glowRef.current, {
      opacity: 1,
      scale: 1.06,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Particles: faster, more energetic movement
    gsap.to(".dark-bg-particle", {
      y: "-=26",
      x: "+=12",
      duration: 4.5,
      stagger: { each: 0.3, from: "random" },
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Base background - deeper, more athletic black */}
      <div className="absolute inset-0 w-full h-full bg-[#0E110A]"></div>

      {/* Diagonal energy sweep for a dynamic, "training" feel */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20 md:opacity-40"
        style={{
          background:
            "linear-gradient(115deg, transparent 30%, rgba(199,255,0,0.06) 48%, transparent 66%)",
        }}
      ></div>

      {/* Moving spotlight / glow - much softer and toned down */}
      <div
        ref={glowRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-75"
        style={{
          background:
            "radial-gradient(55% 65% at 50% 42%, rgba(199,255,0,0.12) 0%, rgba(199,255,0,0.02) 55%, rgba(199,255,0,0) 78%)",
        }}
      ></div>

      {/* Fine technical grid - changed to a very subtle dark gray/white grid to remove excess green */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 md:opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 42%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 42%, black 40%, transparent 85%)",
        }}
      ></div>

      {/* Strong vignette for focus / depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(120% 120% at 50% 50%, transparent 45%, rgba(0,0,0,0.7) 100%)",
        }}
      ></div>

      {/* Grain texture for a premium, non-flat surface */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none mix-blend-overlay">
        <filter id="darkBgGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#darkBgGrain)" />
      </svg>

      {/* Ambient floating athletic icons (Dumbbells) - subtle gray/white and rotated */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => {
          const rotation = (i * 35) % 360;
          return (
            <div
              key={i}
              className="dark-bg-particle absolute text-white/5 w-6 h-6 flex items-center justify-center"
              style={{
                left: `${(i * 113) % 90 + 5}%`,
                top: `${(i * 67) % 90 + 5}%`,
                transform: `rotate(${rotation}deg)`,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M6 3h1v18H6zm11 0h1v18h-1zM2 8h4v8H2zm16 0h4v8h-4zM6 11h11v2H6z"/>
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}