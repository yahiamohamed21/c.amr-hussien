"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/index";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Elements
  const fullCoachRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  // Text elements for entrance animation
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  useGSAP(() => {
    if (!imageLoaded) return;

    // ---------- Initial states ----------
    gsap.set(glowRef.current, {
      opacity: 0.85,
      background: "radial-gradient(55% 65% at 50% 42%, rgba(199,255,0,0.16) 0%, rgba(199,255,0,0) 70%)",
    });
    gsap.set(gridRef.current, { opacity: 0.5 });

    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      autoAlpha: 0,
      y: 40,
      filter: "blur(10px)"
    });

    // Marquees initial state
    gsap.set([marquee1Ref.current, marquee2Ref.current], { autoAlpha: 1, filter: "blur(0px)" });

    // Entrance animation
    const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    entranceTl
      .to(titleRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 0.2 })
      .to(subtitleRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.6")
      .to(ctaRef.current, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.6");

    // ---------- Ambient (scroll-independent) motion ----------
    const ambientTl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } });
    ambientTl
      .to(glowRef.current, { xPercent: 4, yPercent: -3, duration: 6 }, 0)
      .to(".hero-particle", {
        y: "-=18",
        x: "+=8",
        duration: 7,
        stagger: { each: 0.4, from: "random" },
      }, 0);

    gsap.to(".hero-ring", {
      rotate: 360,
      duration: 40,
      ease: "none",
      repeat: -1,
      transformOrigin: "50% 50%",
    });

    // Animate marquees continuously
    gsap.to(marquee1Ref.current, { xPercent: -20, ease: "none", duration: 15, repeat: -1, yoyo: true });
    gsap.to(marquee2Ref.current, { xPercent: 20, ease: "none", duration: 15, repeat: -1, yoyo: true });

  }, { scope: containerRef, dependencies: [imageLoaded] });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center z-10">

      {/* Base background color layer */}
      <div className="absolute inset-0 z-1 w-full h-full bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500">
        <div className="absolute inset-0 bg-black/5 opacity-0 dark:opacity-100 dark:bg-black/60"></div>
      </div>

      {/* Moving spotlight / glow */}
      <div ref={glowRef} className="absolute inset-0 z-2 w-full h-full pointer-events-none dark:hidden"></div>

      {/* Background Geometric Shapes (Static & Rotating decor) */}
      <div className="absolute inset-0 z-2 pointer-events-none overflow-hidden dark:hidden">
        {/* Giant abstract outline circles */}
        <div className="hero-ring absolute -top-[20%] -right-[10%] w-[60vw] max-w-[800px] aspect-square rounded-full border-[1px] border-dashed border-[#10110F]/10 dark:border-[#C7FF00]/15"></div>
        <div className="absolute top-[5%] -right-[10%] w-[60vw] max-w-[700px] aspect-square rounded-full border-[1px] border-[#10110F]/5 dark:border-[#C7FF00]/5"></div>

        {/* Bottom left abstract circles */}
        <div className="hero-ring absolute -bottom-[15%] -left-[10%] w-[45vw] max-w-[500px] aspect-square rounded-full border-[1px] border-dashed border-[#10110F]/15 dark:border-[#C7FF00]/15"></div>
        <div className="absolute -bottom-[20%] -left-[15%] w-[55vw] max-w-[600px] aspect-square rounded-full border-[1px] border-[#10110F]/5 dark:border-[#C7FF00]/5"></div>
      </div>

      {/* Fine technical grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 z-3 pointer-events-none opacity-0 dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(199,255,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(199,255,0,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, black 40%, transparent 85%)",
        }}
      ></div>

      {/* Grain texture for a premium, non-flat surface */}
      <svg className="absolute inset-0 z-4 w-full h-full opacity-[0.05] pointer-events-none mix-blend-overlay dark:hidden">
        <filter id="heroGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heroGrain)" />
      </svg>

      {/* Ambient floating particles */}
      <div className="absolute inset-0 z-5 pointer-events-none dark:hidden">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="hero-particle absolute rounded-full bg-[#C7FF00]/40"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${(i * 137) % 100}%`,
              top: `${(i * 71) % 100}%`,
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      {/* Marquee Layers */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-6 pointer-events-none overflow-hidden gap-4 md:gap-8 opacity-10 dark:opacity-10">
        <div ref={marquee1Ref} className="whitespace-nowrap flex w-[200vw] justify-center">
          <h2 className="font-display text-7xl md:text-[12vw] tracking-tighter uppercase text-transparent [-webkit-text-stroke:2px_rgba(16,17,15,0.4)] dark:[-webkit-text-stroke:2px_rgba(199,255,0,0.6)] transition-colors duration-500">
            ELITE PERFORMANCE &middot; ELITE PERFORMANCE &middot; ELITE PERFORMANCE &middot;
          </h2>
        </div>
        <div ref={marquee2Ref} className="whitespace-nowrap flex w-[200vw] justify-center -translate-x-[5%]">
          <h2 className="font-sans font-black text-6xl md:text-[10vw] tracking-widest text-[#10110F]/80 dark:text-[#C7FF00]/80 uppercase transition-colors duration-500">
            COACHING &middot; COACHING &middot; COACHING &middot; COACHING &middot;
          </h2>
        </div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-between gap-8 pt-28 md:pt-20">

        {/* Foreground Content - The Text Layer */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left order-2 pb-16 md:pb-0">
          <h1 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase text-[#10110F] dark:text-white leading-[0.95] mb-6 drop-shadow-lg">
            Unlock Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10110F] to-[#10110F]/60 dark:from-[#C7FF00] dark:to-[#C7FF00]/60">Elite Potential</span>
          </h1>
          <p ref={subtitleRef} className="font-sans text-base md:text-xl text-[#10110F]/80 dark:text-white/80 mb-8 max-w-md mx-auto md:mx-0 font-medium drop-shadow-md">
            Precision coaching, biomechanics, and data-driven performance for athletes who demand more from their bodies.
          </p>
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pointer-events-auto">
            <Button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-[#10110F] text-white hover:bg-[#10110F]/90 dark:bg-[#C7FF00] dark:text-[#10110F] dark:hover:bg-[#C7FF00]/90 text-sm md:text-base py-4 px-8"
            >
              Explore Programs
            </Button>
          </div>
        </div>

        {/* ELEMENT 1: Full Transparent Coach Cutout */}
        <div
          ref={fullCoachRef}
          className="w-full md:w-1/2 relative h-[45vh] md:h-[70vh] flex justify-center items-center order-1"
        >
          {/* Faded Image Container (Restored the original radial portal look) */}
          <div
            className="absolute inset-0 z-10 flex justify-center items-center"
            style={{
              maskImage: "radial-gradient(ellipse at 50% 50%, black 55%, transparent 85%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 50%, black 35%, transparent 75%)",
            }}
          >
            <div className="relative w-full h-full max-w-[500px] aspect-square">
              <Image
                src="/amr-hero-3.jpeg"
                alt="Coach Amr"
                fill
                quality={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top opacity-95"
                priority
                onLoad={handleImageLoad}
                onError={() => setImageLoaded(true)}
              />
              {/* Subtle overlay to integrate the photo with the theme colors */}
              <div className="absolute inset-0 bg-[#C7FF00]/10 mix-blend-overlay dark:mix-blend-color pointer-events-none"></div>
              {/* Deep inner shadow to further blend edges into darkness */}
              <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] pointer-events-none"></div>
            </div>
          </div>

          {/* HUD Elements - Delicate Square Framing */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[350px] aspect-square pointer-events-none z-20">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#10110F]/40 dark:border-[#C7FF00]/60"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#10110F]/40 dark:border-[#C7FF00]/60"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#10110F]/40 dark:border-[#C7FF00]/60"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#10110F]/40 dark:border-[#C7FF00]/60"></div>
          </div>

          {/* Wireframe scan rings centered on the subject */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] max-w-[300px] aspect-square rounded-full border border-dashed border-[#10110F]/15 dark:border-white/10 z-0 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] max-w-[240px] aspect-square rounded-full border-[1.5px] border-dashed border-[#10110F]/25 dark:border-[#C7FF00]/25 z-0 pointer-events-none"></div>
        </div>

      </div>

    </section>
  );
}