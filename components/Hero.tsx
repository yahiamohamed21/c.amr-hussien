"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  // Elements
  const fullCoachRef = useRef<HTMLDivElement>(null);
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const cardImageRef = useRef<HTMLImageElement>(null);
  const cardRingRef = useRef<HTMLDivElement>(null);

  const originalHeroContentRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const [imageLoaded, setImageLoaded] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useGSAP(() => {
    if (!imageLoaded) return;

    // ---------- Initial states ----------
    gsap.set(bgRef.current, { backgroundColor: isDark ? "transparent" : "#F2F0E9" });
    gsap.set(glowRef.current, {
      opacity: 0.5,
      background: isDark
        ? "radial-gradient(45% 55% at 50% 38%, rgba(199,255,0,0.15) 0%, rgba(23,27,18,0) 70%)"
        : "radial-gradient(45% 55% at 50% 38%, rgba(255,255,255,0.9) 0%, rgba(242,240,233,0) 70%)",
    });
    gsap.set(gridRef.current, { opacity: 0 });
    gsap.set(scanLineRef.current, { autoAlpha: 0, top: "8%" });

    // Image 1 (full coach) starts perfectly centered, sharp, at rest
    gsap.set(fullCoachRef.current, {
      autoAlpha: 1,
      scale: 1,
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 0,
      filter: "blur(0px)",
    });

    // Image 2 (portrait card) starts fully hidden, slightly zoomed + blurred, ready to reveal
    gsap.set(portraitCardRef.current, {
      autoAlpha: 0,
      scale: 1.12,
      xPercent: -50,
      yPercent: -50,
      filter: "blur(14px)",
    });
    gsap.set(cardRingRef.current, { opacity: 0, scale: 1.08 });

    gsap.set([marquee1Ref.current, marquee2Ref.current], { autoAlpha: 0, filter: "blur(6px)" });

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

    const scrollTl = gsap.timeline({
      paused: true,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=220%",
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    scrollTl.addLabel("start", 0);

    // 0% - 12%: Hold the original centered image completely still (no premature motion)
    scrollTl.to({}, { duration: 0.12 }, 0);

    // Background + ambient glow begin drifting early so the shift feels driven, not switched
    scrollTl.to(
      bgRef.current,
      { backgroundColor: isDark ? "transparent" : "#e2e4d0", ease: "sine.inOut", duration: 0.5 },
      0.1
    );

    scrollTl.to(
      glowRef.current,
      {
        opacity: 0.85,
        background:
          "radial-gradient(55% 65% at 50% 42%, rgba(199,255,0,0.16) 0%, rgba(199,255,0,0) 70%)",
        ease: "sine.inOut",
        duration: 0.5,
      },
      0.1
    );

    scrollTl.to(gridRef.current, { opacity: 0.5, ease: "sine.inOut", duration: 0.4 }, 0.15);

    // Fade out the original hero copy just before the coach starts transforming
    scrollTl.to(originalHeroContentRef.current, { autoAlpha: 0, ease: "power1.out", duration: 0.15 }, 0.1);

    // Scan-line sweep down the full coach — reads as it being "captured" right before it vanishes
    scrollTl.fromTo(
      scanLineRef.current,
      { autoAlpha: 1, top: "6%" },
      { top: "92%", ease: "none", duration: 0.22 },
      0.12
    );
    scrollTl.to(scanLineRef.current, { autoAlpha: 0, duration: 0.04 }, 0.34);

    // ---------------------------------------------------------------
    // 12% -> 45%: IMAGE 1 fully disappears, THEN (only after it's gone)
    // IMAGE 2 reveals. No cross-fade overlap — a deliberate, professional beat.
    // ---------------------------------------------------------------
    const isDesktop = window.innerWidth >= 768;

    if (isDesktop) {
      // Step A (0.15 -> 0.35): Image 1 dissolves away
      scrollTl.to(
        fullCoachRef.current,
        {
          autoAlpha: 0,
          scale: 0.95,
          filter: "blur(8px)",
          ease: "power2.inOut",
          duration: 0.20,
        },
        0.15
      );

      // Step B (0.20 -> 0.40): Image 2 reveals WHILE Image 1 is fading out (Crossfade)
      scrollTl.fromTo(
        portraitCardRef.current,
        { autoAlpha: 0, scale: 1.12, filter: "blur(14px)" },
        {
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          duration: 0.20,
          immediateRender: false,
        },
        0.20
      );

      scrollTl.fromTo(
        cardRingRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, ease: "power2.out", duration: 0.2 },
        0.36
      );
    } else {
      // Mobile-specific premium sequence — same "gone, then appear" logic

      // Step A: Image 1 fades out
      scrollTl.to(
        fullCoachRef.current,
        {
          autoAlpha: 0,
          scale: 0.95,
          y: 5,
          filter: "blur(8px)",
          ease: "power2.inOut",
          duration: 0.2,
        },
        0.15
      );

      // Step B: Image 2 slides up from below WHILE Image 1 fades out (Crossfade)
      scrollTl.fromTo(
        portraitCardRef.current,
        {
          autoAlpha: 0,
          scale: 0.9,
          yPercent: -45,
          rotation: -2,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: -50,
          rotation: 0,
          filter: "blur(0px)",
          duration: 0.22,
          ease: "back.out(1.2)",
          immediateRender: false,
        },
        0.20
      );

      // Card neon ring pulses out right after the card lands
      scrollTl.fromTo(
        cardRingRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" },
        0.48
      );

      // The portrait card will now stay visible and scroll up naturally with the page
    }

    // 45% -> 75%: Reveal marquees with a lift + blur-in, once the card has landed
    scrollTl.to(
      [marquee1Ref.current, marquee2Ref.current],
      { autoAlpha: 1, filter: "blur(0px)", ease: "power1.out", duration: 0.25 },
      0.46
    );

    scrollTl.to(marquee1Ref.current, { xPercent: -20, ease: "none", duration: 0.55 }, 0.46);
    scrollTl.to(marquee2Ref.current, { xPercent: 20, ease: "none", duration: 0.55 }, 0.46);

    // Glow intensifies as the lime marquee and grid take over
    scrollTl.to(
      glowRef.current,
      {
        opacity: 0,
        background:
          "radial-gradient(60% 70% at 50% 45%, rgba(199,255,0,0.22) 0%, rgba(199,255,0,0) 72%)",
        ease: "sine.inOut",
        duration: 0.3,
      },
      0.5
    );
    scrollTl.to(gridRef.current, { opacity: 0.9, ease: "sine.inOut", duration: 0.3 }, 0.5);

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [imageLoaded, isDark] });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center items-center z-10">

      {/* Base background color layer */}
      <div ref={bgRef} className="absolute inset-0 z-1 w-full h-full bg-[#F2F0E9]"></div>

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

        {/* Floating crosshairs (+) */}
        <div className="absolute top-[20%] left-[15%] text-[#10110F]/20 dark:text-[#C7FF00]/20 font-sans text-xl">+</div>
        <div className="absolute top-[60%] right-[20%] text-[#10110F]/20 dark:text-[#C7FF00]/20 font-sans text-xl">+</div>
        <div className="absolute bottom-[30%] left-[25%] text-[#10110F]/20 dark:text-[#C7FF00]/20 font-sans text-xl">+</div>

        {/* Floating Data / HUD elements */}
        <div className="absolute top-8 left-8 flex flex-col gap-1 text-[10px] font-mono tracking-widest text-[#10110F]/40 dark:text-[#C7FF00]/40 z-2 hidden md:flex">
          <span>HPL // SYS.ACTIVE</span>
          <span>LAT 30.0444° N</span>
          <span>LON 31.2357° E</span>
        </div>

        <div className="absolute bottom-12 right-8 flex flex-col items-end gap-1 text-[10px] font-mono tracking-widest text-[#10110F]/40 dark:text-[#C7FF00]/40 z-2 hidden md:flex text-right">
          <span>V.02 MAX / OPTIMIZED</span>
          <span>PERFORMANCE METRICS</span>
          <span>INITIALIZING...</span>
        </div>
      </div>

      {/* Fine technical grid — "human performance lab" motif, fades in on scroll */}
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

      {/* Decorative Typography (Subtle Background Monogram) */}
      <div className="absolute inset-0 flex justify-center items-center z-2 pointer-events-none opacity-[0.035] dark:hidden">
        <span className="font-display text-[40vw] text-[#10110F] leading-none">AH</span>
      </div>

      {/* Marquee Layers (behind portrait card) */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-6 pointer-events-none overflow-hidden gap-4 md:gap-8 opacity-90">
        <div ref={marquee1Ref} className="whitespace-nowrap flex w-[200vw] justify-center">
          <h2 className="font-display text-6xl md:text-[10vw] tracking-tighter text-[#10110F] dark:text-[#C7FF00] uppercase" style={{ WebkitTextStroke: isDark ? '1px rgba(199,255,0,0.5)' : '1px rgba(16,17,15,0.2)', color: 'transparent' }}>
            BUILD THE STRONGEST VERSION OF YOURSELF &middot; BUILD THE STRONGEST VERSION OF YOURSELF &middot; BUILD THE STRONGEST VERSION OF YOURSELF &middot;
          </h2>
        </div>
        <div ref={marquee2Ref} className="whitespace-nowrap flex w-[200vw] justify-center -translate-x-[5%]">
          <h2 className="font-sans font-black text-5xl md:text-[8vw] tracking-widest text-[#10110F]/80 dark:text-white/90 uppercase">
            TRAIN WITH PURPOSE &middot; TRANSFORM FOR LIFE &middot; TRAIN WITH PURPOSE &middot; TRANSFORM FOR LIFE &middot;
          </h2>
        </div>
      </div>

      {/* ELEMENT 2: Real Portrait Card */}
      <div
        ref={portraitCardRef}
        className="absolute left-1/2 top-1/2 z-10 h-[50vh] max-w-[85vw] md:max-w-none md:h-[65vh] w-auto aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-md shadow-2xl"
      >
        <Image
          ref={cardImageRef}
          src="/amr-card.webp"
          alt="Coach Amr Hussien"
          fill
          className="object-cover"
          aria-hidden="true"
        />
        {/* Pulsing lime ring around the card once revealed */}
        <div
          ref={cardRingRef}
          className="hero-ring pointer-events-none absolute -inset-[2px] rounded-md border border-[#C7FF00]/60"
        ></div>
      </div>

      {/* ELEMENT 1: Full Transparent Coach Cutout */}
      <div
        ref={fullCoachRef}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-[100vw] md:w-[750px] xl:w-[900px] h-[60vh] md:h-[75vh] origin-center flex justify-center items-center"
      >
        <Image
          src="/amr-hero2.png"
          alt="Coach Amr"
          fill
          quality={100}
          sizes="(max-width: 768px) 120vw, (max-width: 1024px) 900px, 1200px"
          className="object-contain object-center"
          priority
          onLoad={handleImageLoad}
          onError={() => setImageLoaded(true)}
        />

        {/* Wireframe scan rings */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] aspect-square rounded-t-full border-t border-dashed border-[#10110F]/20 z-0"></div>
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[70%] aspect-square rounded-t-full border-t border-dashed border-[#10110F]/10 z-0"></div>

        {/* Animated scan-line sweep */}
        <div
          ref={scanLineRef}
          className="absolute left-0 right-0 h-[2px] z-1 pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, #C7FF00 20%, #C7FF00 80%, transparent)",
            boxShadow: "0 0 12px 2px rgba(199,255,0,0.6)",
          }}
        ></div>
      </div>

    </section>
  );
}