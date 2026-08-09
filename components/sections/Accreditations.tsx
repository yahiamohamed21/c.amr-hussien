"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Accreditations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const [certs, setCerts] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/accreditations`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.name,
          issuer: item.issuer,
          image: item.imageId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${item.imageId}` : '',
        }));
        setCerts(mapped);
      })
      .catch(err => {
        setCerts([
          { id: '1', title: 'Strength & Conditioning', issuer: 'NSCA', image: '/c_amr.png' },
          { id: '2', title: 'Sports Nutritionist', issuer: 'ISSA', image: '/c_amr.png' },
          { id: '3', title: 'Performance Specialist', issuer: 'EXOS', image: '/c_amr.png' },
          { id: '4', title: 'Biomechanics Expert', issuer: 'ACE', image: '/c_amr.png' }
        ]);
      });
  }, []);

  useGSAP(() => {
    if (certs.length === 0) return;

    // Header reveal
    gsap.fromTo(".cert-header-reveal",
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

    // Cards staggered reveal
    gsap.fromTo(".cert-card", 
        { x: 100, opacity: 0 },
        { 
            x: 0, opacity: 1,
            duration: 1, 
            stagger: 0.15,
            ease: "expo.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            }
        }
    );

  }, { scope: containerRef, dependencies: [certs] });

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 relative overflow-hidden border-t border-[#10110F]/5 dark:border-white/5">
      
      {/* Background Graphic */}
      <div className="absolute top-10 md:top-20 -left-10 md:-left-20 text-[6rem] md:text-[18rem] font-display uppercase tracking-tighter text-[#10110F]/[0.02] dark:text-white/[0.02] select-none pointer-events-none leading-none z-0">
        ACCREDITED
      </div>
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#C7FF00]/10 blur-[150px] rounded-full pointer-events-none z-0 translate-x-1/2 -translate-y-1/2"></div>

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 w-full">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-4 mb-4 cert-header-reveal">
              <span className="w-8 h-[2px] bg-[#10110F] dark:bg-[#C7FF00]"></span>
              <span className="font-label-caps text-xs text-[#10110F] dark:text-[#C7FF00] uppercase tracking-[0.4em] font-bold">
                Global Standards
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-[70px] leading-[0.9] uppercase text-[#10110F] dark:text-white tracking-tight max-w-xl cert-header-reveal">
              International <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10110F] to-[#10110F]/50 dark:from-[#C7FF00] dark:to-white/70">
                Accreditations
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4 self-start md:self-auto cert-header-reveal">
            <button 
              onClick={scrollLeft}
              className="w-14 h-14 rounded-none border border-[#10110F]/10 dark:border-white/10 flex items-center justify-center hover:bg-[#10110F] hover:text-[#F2F0E9] dark:hover:bg-[#C7FF00] dark:hover:text-[#10110F] transition-all text-[#10110F] dark:text-white bg-white dark:bg-[#10110F] shadow-lg"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-14 h-14 rounded-none border border-[#10110F]/10 dark:border-white/10 flex items-center justify-center hover:bg-[#10110F] hover:text-[#F2F0E9] dark:hover:bg-[#C7FF00] dark:hover:text-[#10110F] transition-all text-[#10110F] dark:text-white bg-white dark:bg-[#10110F] shadow-lg"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Interactive Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-16 pt-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:-mx-12 md:px-12 lg:-mx-20 lg:px-20 scroll-smooth"
        >
          {certs.map((cert) => (
            <div 
              key={cert.id} 
              className="cert-card group flex flex-col flex-none w-[85vw] sm:w-[380px] snap-center md:snap-start bg-white dark:bg-[#10110F] border border-[#10110F]/10 dark:border-white/10 p-6 md:p-8 hover:-translate-y-4 transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(199,255,0,0.15)] relative overflow-hidden"
            >
              {/* Background Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#10110F]/5 dark:from-[#C7FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0"></div>
              
              {/* Top Section: Issuer & Icon */}
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex flex-col">
                    <span className="font-mono text-xs text-[#10110F]/50 dark:text-white/40 uppercase tracking-widest mb-1">Issuer</span>
                    <span className="font-label-caps text-sm text-[#10110F] dark:text-[#C7FF00] font-bold tracking-[0.2em]">{cert.issuer}</span>
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-[#10110F]/5 dark:bg-white/[0.03] border border-[#10110F]/10 dark:border-white/10 group-hover:scale-110 group-hover:bg-[#10110F] dark:group-hover:bg-[#C7FF00] group-hover:text-white dark:group-hover:text-[#10110F] transition-all duration-500 text-[#10110F] dark:text-white">
                    <Award className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>

              {/* Premium Framed Certificate Image */}
              <div className="relative w-full aspect-[4/3] bg-white dark:bg-[#10110F] rounded-none p-2 shadow-inner border border-[#10110F]/5 dark:border-white/5 mb-8 z-10 group-hover:border-[#10110F]/20 dark:group-hover:border-[#C7FF00]/30 transition-colors duration-500 overflow-hidden">
                <div className="w-full h-full relative overflow-hidden bg-[#F2F0E9] dark:bg-[#1A1A1A]">
                  <img
                    alt={cert.title}
                    className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    src={cert.image}
                    draggable="false"
                  />
                  {/* Glossy Reflection Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out"></div>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="relative z-10 flex-1 flex flex-col justify-end">
                <h3 className="font-display text-2xl md:text-3xl uppercase tracking-wide text-[#10110F] dark:text-white group-hover:tracking-wider transition-all duration-500 truncate whitespace-nowrap">
                  {cert.title}
                </h3>
              </div>

              {/* Animated Bottom Border */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#10110F] dark:bg-[#C7FF00] group-hover:w-full transition-all duration-700 ease-out z-10"></div>
            </div>
          ))}
          
          {/* Spacer at the end */}
          <div className="flex-none w-10 md:w-20"></div>
        </div>

      </div>
    </section>
  );
}
