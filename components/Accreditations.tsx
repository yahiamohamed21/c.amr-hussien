"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      scrollContainerRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-surface relative overflow-hidden border-y border-white/5">
      
      {/* Background Graphic - Fixed size for mobile */}
      <div className="absolute top-10 md:top-20 -left-10 md:-left-20 text-[6rem] md:text-[20rem] font-display font-black text-white/[0.03] select-none pointer-events-none leading-none">
        ACCREDITED
      </div>

      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full">
        
        {/* Header with Navigation - Fixed Mobile Layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-4 mb-4">
              <span className="w-8 h-[2px] bg-primary"></span>
              <span className="font-label-caps text-xs text-primary uppercase tracking-[0.4em]">
                Global Standards
              </span>
            </div>
            <h2 className="font-display-xl text-4xl md:text-[clamp(3rem,5vw,4.5rem)] leading-[0.9] uppercase text-on-surface tracking-tight max-w-xl">
              International <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">
                Accreditations
              </span>
            </h2>
          </div>

          {/* Navigation Controls - Left aligned on mobile, right on desktop */}
          <div className="flex gap-4 self-start md:self-auto">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 md:w-14 md:h-14 border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-all text-on-surface bg-background shadow-lg"
              aria-label="Scroll left"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 md:w-14 md:h-14 border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-all text-on-surface bg-background shadow-lg"
              aria-label="Scroll right"
            >
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        {/* Interactive Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-8 md:pb-16 pt-4 md:pt-8 no-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {certs.map((cert) => (
            <div 
              key={cert.id} 
              className="group flex flex-col flex-none w-[80vw] sm:w-[350px] md:w-[400px] snap-center md:snap-start"
            >
              
              {/* Premium Framed Certificate */}
              <div className="relative w-full aspect-[4/3] bg-surface-container rounded-sm p-3 md:p-4 shadow-xl transition-all duration-700 md:group-hover:-translate-y-2 md:group-hover:shadow-[0_20px_50px_rgba(184,211,0,0.15)] border border-white/5 md:group-hover:border-primary/30">
                
                {/* Decorative Pins */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block"></div>
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block"></div>
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-white/10 hidden md:block"></div>

                {/* Inner Matte */}
                <div className="w-full h-full bg-[#f8f9fa] p-2 border border-black/10 overflow-hidden relative shadow-inner">
                  {/* Glossy Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none translate-x-[-100%] group-hover:translate-x-[100%] ease-in-out"></div>
                  
                  <img
                    alt={cert.title}
                    className="w-full h-full object-cover filter grayscale-[0.2] contrast-[1.1] transition-all duration-700 md:group-hover:grayscale-0 md:group-hover:scale-105"
                    src={cert.image}
                    draggable="false"
                  />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="mt-6 md:mt-8 opacity-90 md:opacity-70 transition-opacity duration-500 md:group-hover:opacity-100">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-4 h-[1px] bg-primary"></span>
                  <p className="font-label-caps text-[10px] tracking-[0.3em] text-primary uppercase">
                    {cert.issuer}
                  </p>
                </div>
                <h3 className="font-display text-lg sm:text-xl md:text-2xl uppercase tracking-wider text-on-surface">
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
