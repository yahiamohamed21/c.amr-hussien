"use client";

import { useRef, useEffect, useState } from "react";

export function Accreditations() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          { id: '3', title: 'Performance Specialist', issuer: 'EXOS', image: '/c_amr.png' }
        ]);
      });
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="py-32 bg-surface relative overflow-hidden border-y border-white/5">
      
      {/* Background Graphic */}
      <div className="absolute top-20 -left-20 text-[20rem] font-display font-black text-white/[0.02] select-none pointer-events-none leading-none">
        ACCREDITED
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full">
        
        {/* Header with Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px] bg-primary"></span>
              <span className="font-label-caps text-xs text-primary uppercase tracking-[0.4em]">
                Global Standards
              </span>
            </div>
            <h2 className="font-display-xl text-[clamp(2.5rem,5vw,4rem)] leading-[0.9] uppercase text-on-surface tracking-tight max-w-xl">
              International <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                Accreditations
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-4">
            <button 
              onClick={scrollLeft}
              className="w-14 h-14 border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-all text-on-surface bg-background shadow-lg"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={scrollRight}
              className="w-14 h-14 border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-all text-on-surface bg-background shadow-lg"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

      {/* Interactive Horizontal Scroll Container */}
      {/* Note: pl is margin-mobile/desktop so it aligns with the grid, but items can scroll offscreen */}
      <div 
        ref={scrollContainerRef}
        className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-16 pt-8 px-margin-mobile md:px-margin-desktop no-scrollbar"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {certs.map((cert) => (
          <div 
            key={cert.id} 
            className="group flex flex-col flex-none w-[85vw] md:w-[400px] snap-center md:snap-start"
          >
            
            {/* Premium Framed Certificate */}
            <div className="relative w-full aspect-[4/3] bg-surface-container rounded-sm p-4 shadow-xl transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_20px_50px_rgba(184,211,0,0.15)] border border-white/5 group-hover:border-primary/30">
              
              {/* Decorative Pins */}
              <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/10"></div>
              <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/10"></div>
              <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-white/10"></div>
              <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/10"></div>

              {/* Inner Matte */}
              <div className="w-full h-full bg-[#f8f9fa] p-2 border border-black/10 overflow-hidden relative shadow-inner">
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out"></div>
                
                <img
                  alt={cert.title}
                  className="w-full h-full object-cover filter grayscale-[0.3] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  src={cert.image}
                  draggable="false"
                />
              </div>
            </div>

            {/* Certificate Details */}
            <div className="mt-8 opacity-70 transition-opacity duration-500 group-hover:opacity-100">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-4 h-[1px] bg-primary"></span>
                <p className="font-label-caps text-[10px] tracking-[0.3em] text-primary uppercase">
                  {cert.issuer}
                </p>
              </div>
              <h3 className="font-display text-xl md:text-2xl uppercase tracking-wider text-on-surface">
                {cert.title}
              </h3>
            </div>

          </div>
        ))}
        
        {/* Spacer at the end so the last item isn't flush with the right edge */}
        <div className="flex-none w-8 md:w-24"></div>
      </div>

      </div>

    </section>
  );
}
