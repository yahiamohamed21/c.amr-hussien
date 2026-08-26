"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Elements
  const fullCoachRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [imageLoaded, setImageLoaded] = useState(false);

  const { data: heroData } = useQuery({
    queryKey: ["public-hero"],
    queryFn: async () => {
      try {
        const res = await api.get("/api/v1/public/hero");
        return res.data;
      } catch (err) {
        return null;
      }
    },
  });

  const getCvUrl = () => {
    if (!heroData?.primaryButtonUrl) return "/Amr%20Hussien%20CV.docx";
    if (heroData.primaryButtonUrl.startsWith('/api')) {
      return `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}${heroData.primaryButtonUrl}`;
    }
    return heroData.primaryButtonUrl;
  };

  const cvUrl = getCvUrl();
  const cvText = heroData?.primaryButtonText || "Download My CV";

  const getImageUrl = () => {
    if (heroData?.imageId) {
      return `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/api/v1/public/media/${heroData.imageId}`;
    }
    return "/upscalemedia-transformed.png";
  };

  useGSAP(() => {
    if (!imageLoaded) return;

    // ---------- Initial states ----------
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], { autoAlpha: 0, y: 30 });
    gsap.set(fullCoachRef.current, { autoAlpha: 0, scale: 0.98, y: 20 });

    // Entrance animation
    const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    entranceTl
      .to(fullCoachRef.current, { autoAlpha: 1, scale: 1, y: 0, duration: 1.2 }, 0)
      .to(titleRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0.4)
      .to(subtitleRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0.6)
      .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 1 }, 0.8);

  }, { scope: containerRef, dependencies: [imageLoaded] });

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  };

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] w-full bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 z-10 flex flex-col pt-24 md:pt-0">

      {/* Subtle Grain for Premium Feel */}
      <div className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 flex-1 flex flex-col md:flex-row items-center justify-between z-10">

        {/* Mobile: Image First | Desktop: Image Right */}
        <div
          ref={fullCoachRef}
          className="relative w-full md:w-1/2 h-[55vh] md:h-[75vh] max-h-[700px] flex justify-center items-end order-1 md:order-2 md:mt-16"
        >
          <div className="relative w-full h-[105%] origin-bottom">
            <Image
              src={getImageUrl()}
              alt="Coach Amr"
              fill
              quality={100}
              priority
              className="object-contain object-bottom md:object-center contrast-[1.1] saturate-[0.85] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all duration-500"
              style={{
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
              onLoad={handleImageLoad}
              onError={() => setImageLoaded(true)}
            />
            {/* Artistic Film Grain Overlay to mask pixelation */}
            <div
              className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
            ></div>
          </div>
        </div>

        {/* Text Section (Mobile: Bottom | Desktop: Left) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left order-2 md:order-1 pt-8 pb-16 md:py-0">

          <div className="flex justify-center md:justify-start mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#10110F]/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#10110F] dark:bg-[#C7FF00] animate-pulse"></span>
              <span className="font-label-caps text-xs tracking-widest text-[#10110F] dark:text-[#C7FF00] uppercase font-bold">
                {heroData?.eyebrow || "Elite Performance"}
              </span>
            </div>
          </div>

          <h1 ref={titleRef} className="font-display text-[3.5rem] leading-[0.9] md:text-7xl lg:text-8xl md:leading-[0.9] uppercase text-[#10110F] dark:text-white mb-6">
            {heroData?.title || "Unlock Your"} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10110F] to-[#10110F]/60 dark:from-[#C7FF00] dark:to-[#C7FF00]/60">
              {heroData?.highlightedText || "Elite Potential"}
            </span>
          </h1>

          <div ref={subtitleRef} className="max-w-md mx-auto md:mx-0">
            <p className="font-sans text-base md:text-lg text-[#10110F]/70 dark:text-white/70 font-medium leading-relaxed mb-4">
              {heroData?.description || "Precision coaching, biomechanics, and data-driven performance for athletes who demand more from their bodies."}
            </p>
            <p className="font-sans text-sm font-bold tracking-widest text-[#10110F] dark:text-[#C7FF00] uppercase mb-10">
              {heroData?.coachCardName || "6X TOP TRAINER · 10+ YEARS EXPERIENCE"}
            </p>
          </div>

          <div ref={ctaRef} className="flex justify-center md:justify-start">
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-14 px-10 font-sans font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-[#10110F] text-white dark:bg-white dark:text-[#10110F] hover:bg-[#10110F]/80 dark:hover:bg-white/80 rounded shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              {cvText}
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}