"use client";

import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function About() {
  const containerRef = useRef<HTMLElement>(null);

  const { data: about, isLoading } = useQuery({
    queryKey: ["public-about"],
    queryFn: async () => {
      const res = await api.get("/api/v1/public/about");
      return res.data;
    },
    retry: 1,
  });

  const displayEyebrow = about?.eyebrow || "Meet the Coach";
  const displayTitle = about?.title || "MORE THAN FITNESS";
  const displayWatermark = about?.watermarkText || "PERFORMANCE";
  const displayDescription = about?.body || `Fitness changes your body.\nPerformance changes your life.\n\nAmr Hussien believes that true transformation isn't measured by kilograms lost or muscles gained. It is measured by confidence restored, resilience built, and a body that performs the way it was meant to.\n\nWith over a decade of experience in elite coaching, rehabilitation, and performance training, his philosophy combines evidence based science with personalized coaching to create sustainable, measurable results.\n\nEvery client follows a journey built around one principle.\nYour body should work for you, not against you.`;
  const isVisible = about ? about.isVisible : true;

  useGSAP(() => {
    if (!isVisible) return;

    // Reveal Text elements smoothly
    gsap.fromTo(".about-reveal",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%"
        }
      }
    );

    // Dynamic Parallax for the Image Collage
    gsap.to(".about-img-1", {
      yPercent: -20,
      ease: "none",
      scrollTrigger: { trigger: containerRef.current, scrub: true, start: "top bottom", end: "bottom top" }
    });
    gsap.to(".about-img-2", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: { trigger: containerRef.current, scrub: true, start: "top bottom", end: "bottom top" }
    });
    gsap.to(".about-img-3", {
      yPercent: -40,
      xPercent: -10,
      rotation: -5,
      ease: "none",
      scrollTrigger: { trigger: containerRef.current, scrub: true, start: "top bottom", end: "bottom top" }
    });

  }, { scope: containerRef, dependencies: [isVisible] });

  if (!isVisible) {
    return null;
  }

  const checkItems = ["Scientific Approach", "Customized Programming", "Mindset Coaching", "Nutritional Guidance"];

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-40 relative bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 overflow-hidden border-t border-[#10110F]/5 dark:border-white/5">

      {/* Background Watermark */}
      {displayWatermark && (
        <div className="absolute top-0 right-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] select-none z-0 translate-x-1/4 -translate-y-1/4 overflow-hidden">
          <h2 className="font-display font-black text-[30vw] uppercase leading-none text-transparent [-webkit-text-stroke:2px_#10110F] dark:[-webkit-text-stroke:2px_#C7FF00]">
            {displayWatermark}
          </h2>
        </div>
      )}

      {/* Ambient Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-[#C7FF00]/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* Content */}
          <div className="w-full max-w-5xl flex flex-col justify-center">

            <div className="about-reveal inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#10110F]/10 dark:border-white/10 bg-white/5 backdrop-blur-md mb-8 w-fit shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#10110F] dark:bg-[#C7FF00] animate-pulse"></div>
              <span className="font-label-caps text-xs md:text-sm tracking-[0.2em] text-[#10110F] dark:text-[#C7FF00] uppercase font-bold">
                {displayEyebrow}
              </span>
            </div>

            <h2 className="about-reveal font-display text-5xl md:text-7xl lg:text-[80px] uppercase text-[#10110F] dark:text-white leading-[0.9] mb-8">
              {displayTitle}
            </h2>

            <div className="about-reveal w-16 h-[3px] bg-[#10110F] dark:bg-[#C7FF00] mb-8"></div>

            <div className="about-reveal font-sans text-lg md:text-xl text-[#10110F]/80 dark:text-white/70 leading-relaxed mb-12 max-w-4xl font-medium">
              <p className="whitespace-pre-line">{displayDescription}</p>
            </div>

            {/* Core Principles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checkItems.map((item, i) => (
                <div key={i} className="about-reveal group flex items-center gap-4 p-4 rounded-2xl border border-[#10110F]/5 dark:border-white/5 bg-[#10110F]/[0.02] dark:bg-white/[0.02] hover:bg-[#10110F]/[0.05] dark:hover:bg-white/[0.06] hover:border-[#10110F]/10 dark:hover:border-white/10 transition-colors duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#10110F]/5 dark:bg-[#10110F] border border-[#10110F]/10 dark:border-[#C7FF00]/30 flex justify-center items-center group-hover:bg-[#10110F] dark:group-hover:bg-[#C7FF00] transition-colors duration-300">
                    <CheckCircle2 className="w-6 h-6 text-[#10110F] dark:text-[#C7FF00] group-hover:text-white dark:group-hover:text-[#10110F] transition-colors duration-300" />
                  </div>
                  <span className="font-sans text-sm md:text-base font-bold text-[#10110F] dark:text-white uppercase tracking-wider">{item}</span>
                </div>
              ))}
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}
