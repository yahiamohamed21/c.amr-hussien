"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { X, ZoomIn, Loader2, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Education() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { data: qualifications } = useQuery({
    queryKey: ["public-qualifications"],
    queryFn: async () => {
      const res = await api.get("/api/v1/public/qualifications");
      return res.data;
    },
    retry: false,
  });

  const defaultItems = [
    {
      id: "01",
      title: "MSc High Performance Sport",
      description: "Academic mastery of physiological adaptation, load management, and sports science analytics to build unbreakable athletes.",
      year: "2020",
    },
    {
      id: "02",
      title: "NASM Performance Enhancement",
      description: "Certified specialist in enhancing athletic movement, explosive output, and injury prevention mechanics.",
      year: "2018",
    },
    {
      id: "03",
      title: "Precision Nutrition L2",
      description: "Advanced metabolic profiling, macro-coaching, and behavior change psychology for sustainable body composition.",
      year: "2019",
    },
    {
      id: "04",
      title: "Exos Performance Specialist",
      description: "Industry-leading training systems used by professional athletes globally to peak for competition.",
      year: "2021",
    }
  ];

  const displayItems = qualifications?.length > 0
    ? qualifications.map((q: any, index: number) => ({
      id: String(index + 1).padStart(2, "0"),
      title: q.name,
      description: q.description || `${q.name} certificate obtained from ${q.institution}.`,
      year: q.year ? String(q.year) : "",
      imageId: q.imageId,
      institution: q.institution || "",
    }))
    : defaultItems;

  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [selectedCert, setSelectedCert] = useState<any | null>(null);

  // Disable background scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = "hidden";
      setImageLoading(true); // Reset loading state when new modal opens
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  // GSAP Animations
  useGSAP(() => {
    if (!mounted) return;

    gsap.fromTo(".edu-header-item",
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(".edu-accordion-item",
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef, dependencies: [mounted] });

  return (
    <section ref={containerRef} className="py-24 md:py-40 px-6 md:px-12 lg:px-20 bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 relative border-t border-[#10110F]/5 dark:border-white/5 overflow-hidden">

      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C7FF00]/5 blur-[150px] rounded-full pointer-events-none z-0 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 items-start relative z-10">

        {/* Sticky Sidebar Header */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-32 z-10">
          <div className="flex items-center gap-4 mb-6 edu-header-item">
            <span className="w-12 h-[2px] bg-[#10110F] dark:bg-[#C7FF00]"></span>
            <span className="font-label-caps text-xs text-[#10110F] dark:text-[#C7FF00] uppercase tracking-[0.4em] font-bold">
              Credentials
            </span>
          </div>

          <h2 className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] uppercase text-[#10110F] dark:text-white tracking-tighter mb-8 edu-header-item">
            EXPERTISE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10110F]/40 to-[#10110F] dark:from-white/20 dark:to-white">
              BACKED BY
            </span><br />
            <span className="text-[#C7FF00]">EDUCATION</span>
          </h2>

          <div className="relative pl-6 border-l-2 border-[#10110F]/20 dark:border-[#C7FF00]/50 max-w-sm edu-header-item">
            <p className="font-sans text-[#10110F]/70 dark:text-white/60 text-lg leading-relaxed font-medium">
              Knowledge is the foundation of performance. I never stop learning so you never stop growing.
            </p>
          </div>
        </div>

        {/* Interactive Accordion List */}
        <div className="lg:col-span-7">
          <div className="border-t border-[#10110F]/10 dark:border-white/10">
            {displayItems.map((item: any, index: number) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setSelectedCert(item)}
                  className="edu-accordion-item group cursor-pointer border-b border-[#10110F]/10 dark:border-white/10 transition-colors duration-500 hover:bg-[#10110F]/[0.02] dark:hover:bg-white/[0.02] overflow-hidden"
                >
                  <div className="flex flex-col py-8 px-4 md:px-8">

                    {/* Top Row: Number, Title, Arrow */}
                    <div className="flex items-center gap-6 md:gap-10 w-full">
                      <span className={`font-display text-2xl md:text-3xl transition-colors duration-500 font-bold ${isActive ? 'text-[#10110F] dark:text-[#C7FF00]' : 'text-[#10110F]/20 dark:text-white/20'}`}>
                        {item.id}
                      </span>

                      <h4 className={`font-display text-2xl md:text-4xl uppercase tracking-tight transition-all duration-500 flex-grow ${isActive ? 'text-[#10110F] dark:text-white translate-x-2' : 'text-[#10110F]/60 dark:text-white/60'}`}>
                        {item.title}
                      </h4>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(item);
                        }}
                        className={`w-12 h-12 rounded-none border flex items-center justify-center transition-all duration-500 ${isActive
                            ? 'border-[#10110F] bg-[#10110F] text-[#F2F0E9] dark:border-[#C7FF00] dark:bg-[#C7FF00] dark:text-[#10110F] scale-110 shadow-[0_0_20px_rgba(199,255,0,0.4)]'
                            : 'border-[#10110F]/10 text-[#10110F]/40 dark:border-white/10 dark:text-white/40 group-hover:opacity-100 group-hover:border-[#10110F]/30 dark:group-hover:border-white/30'
                          }`}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Expandable Content */}
                    <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                      <div className="overflow-hidden">
                        <div className="pl-[4rem] md:pl-[5rem] pr-4 md:pr-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                          <div className="space-y-4 flex-grow">
                            <p className="font-sans text-[#10110F]/70 dark:text-white/60 text-base md:text-lg leading-relaxed max-w-lg">
                              {item.description}
                            </p>

                            {item.imageId && (
                              <div className="mt-6 flex items-center gap-3 text-xs text-[#10110F] dark:text-[#C7FF00] font-label-caps tracking-wider opacity-60 group-hover:opacity-100 transition-opacity font-bold">
                                <ZoomIn className="w-4 h-4" /> Click to view full document
                              </div>
                            )}
                          </div>

                          <span className="font-display text-5xl font-black text-[#10110F]/5 dark:text-white/5 select-none self-end md:self-center">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Active Glow Line */}
                  <div className={`h-[2px] bg-[#10110F] dark:bg-[#C7FF00] transition-all duration-700 ease-out ${isActive ? 'w-full' : 'w-0'}`}></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Premium Fullscreen Modal/Lightbox */}
      {selectedCert && mounted && createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-white/90 dark:bg-black/90 backdrop-blur-xl transition-opacity duration-300 animate-in fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative bg-white dark:bg-[#10110F] border border-[#10110F]/10 dark:border-white/10 rounded-none max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#10110F]/20 dark:[&::-webkit-scrollbar-thumb]:bg-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-[#10110F]/10 dark:border-white/10 text-[#10110F] dark:text-white flex items-center justify-center hover:bg-[#10110F] hover:text-white dark:hover:bg-[#C7FF00] dark:hover:text-[#10110F] transition-all duration-300 shadow-md"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left/Top: Image Container */}
            <div className="lg:w-3/5 bg-[#F2F0E9] dark:bg-[#1A1A1A] relative flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#10110F]/10 dark:border-white/10 min-h-[350px] lg:min-h-[550px] p-8">
              {selectedCert.imageId ? (
                <>
                  {/* Loading Spinner overlay */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm z-10 animate-in fade-in duration-300">
                      <Loader2 className="w-10 h-10 text-[#10110F] dark:text-[#C7FF00] animate-spin mb-4" />
                      <span className="font-label-caps text-xs tracking-[0.2em] uppercase text-[#10110F]/70 dark:text-white/70">Loading Document...</span>
                    </div>
                  )}

                  {/* Actual Image */}
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${selectedCert.imageId}`}
                    alt={selectedCert.title}
                    onLoad={() => setImageLoading(false)}
                    className={`max-w-full max-h-[45vh] lg:max-h-[70vh] object-contain shadow-2xl border border-[#10110F]/10 dark:border-white/10 transition-opacity duration-700 ${imageLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                  />
                </>
              ) : (
                <div className="text-center p-8 space-y-4">
                  <span className="material-symbols-outlined text-6xl text-[#10110F]/20 dark:text-white/20">school</span>
                  <p className="text-[#10110F]/50 dark:text-white/50 font-label-caps text-xs tracking-widest uppercase">No Document Attached</p>
                </div>
              )}
            </div>

            {/* Right/Bottom: Description Card */}
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col justify-center space-y-8 bg-white dark:bg-[#10110F]">
              <div className="space-y-6">
                <span className="font-display text-5xl text-[#10110F]/10 dark:text-[#C7FF00]/20 font-black block leading-none">
                  {selectedCert.id}
                </span>

                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight text-[#10110F] dark:text-white leading-tight">
                  {selectedCert.title}
                </h3>

                {(selectedCert.institution || selectedCert.year) && (
                  <div className="flex flex-wrap gap-3">
                    {selectedCert.institution && (
                      <span className="px-3 py-1.5 bg-[#10110F]/5 dark:bg-[#C7FF00]/10 text-[#10110F] dark:text-[#C7FF00] border border-[#10110F]/10 dark:border-[#C7FF00]/30 rounded-none font-label-caps text-xs tracking-wider font-bold">
                        {selectedCert.institution}
                      </span>
                    )}
                    {selectedCert.year && (
                      <span className="px-3 py-1.5 bg-black/5 dark:bg-white/5 text-[#10110F]/70 dark:text-white/70 border border-[#10110F]/10 dark:border-white/10 rounded-none font-label-caps text-xs tracking-wider">
                        {selectedCert.year}
                      </span>
                    )}
                  </div>
                )}

                <div className="w-12 h-[2px] bg-[#10110F] dark:bg-[#C7FF00]"></div>

                <p className="font-sans text-[#10110F]/70 dark:text-white/70 text-base md:text-lg leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

            </div>

          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
