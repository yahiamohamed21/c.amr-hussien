"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { X, ZoomIn } from "lucide-react";
import { createPortal } from "react-dom";

export function Education() {
  const [mounted, setMounted] = useState(false);

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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCert]);

  return (
    <section className="py-32 px-margin-mobile md:px-margin-desktop bg-background relative border-t border-white/5">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
        
        {/* Sticky Sidebar Header */}
        <div className="lg:col-span-5 relative lg:sticky lg:top-32 z-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-primary"></span>
            <span className="font-label-caps text-xs text-primary uppercase tracking-[0.4em]">
              Credentials
            </span>
          </div>
          
          <h2 className="font-display-xl text-[clamp(3rem,6vw,5rem)] leading-[0.9] uppercase text-on-surface tracking-tighter mb-8">
            EXPERTISE <br />
            <span className="text-outline-text text-transparent" style={{ WebkitTextStroke: "1px var(--color-on-surface-variant)" }}>
              BACKED BY
            </span><br />
            EDUCATION
          </h2>
          
          <div className="relative pl-6 border-l-2 border-primary/30 max-w-sm">
            <p className="font-body-md text-on-surface-variant text-lg leading-relaxed">
              Knowledge is the foundation of performance. I never stop learning so you never stop growing.
            </p>
          </div>
        </div>

        {/* Interactive Accordion List */}
        <div className="lg:col-span-7 lg:col-start-6">
          <div className="border-t border-outline-variant/20">
            {displayItems.map((item: any, index: number) => {
              const isActive = activeIndex === index;
              
              return (
                <div 
                  key={item.id}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setSelectedCert(item)}
                  className="group cursor-pointer border-b border-outline-variant/20 transition-colors duration-500 hover:bg-surface-container/30 overflow-hidden"
                >
                  <div className="flex flex-col py-8 px-4 md:px-8">
                    
                    {/* Top Row: Number, Title, Arrow */}
                    <div className="flex items-center gap-6 md:gap-12 w-full">
                      <span className={`font-display text-2xl md:text-3xl transition-colors duration-500 ${isActive ? 'text-primary drop-shadow-[0_0_10px_rgba(184,211,0,0.5)]' : 'text-on-surface-variant/30'}`}>
                        {item.id}
                      </span>
                      
                      <h4 className={`font-display text-2xl md:text-4xl uppercase tracking-tight transition-all duration-500 flex-grow ${isActive ? 'text-on-surface translate-x-2' : 'text-on-surface-variant'}`}>
                        {item.title}
                      </h4>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCert(item);
                        }}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? 'border-primary bg-primary text-black scale-110 shadow-[0_0_15px_rgba(184,211,0,0.4)]' 
                            : 'border-white/10 text-on-surface-variant opacity-40 group-hover:opacity-100'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">
                          arrow_forward
                        </span>
                      </button>
                    </div>

                    {/* Expandable Content */}
                    <div className={`grid transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                      <div className="overflow-hidden">
                        <div className="pl-[4.5rem] md:pl-[5.25rem] pr-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                          <div className="space-y-4 flex-grow">
                            <p className="font-body-md text-on-surface-variant text-base md:text-lg leading-relaxed max-w-lg">
                              {item.description}
                            </p>
                            
                            {item.imageId && (
                              <div className="mt-6 flex items-center gap-3 text-xs text-primary font-label-caps tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                                <ZoomIn className="w-4 h-4" /> Click card or arrow to view full credential document
                              </div>
                            )}
                          </div>
                          
                          <span className="font-display text-5xl font-black text-white/5 select-none self-end md:self-center">
                            {item.year}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                  </div>
                  
                  {/* Bottom Active Glow Line */}
                  <div className={`h-[2px] bg-primary transition-all duration-700 ease-out ${isActive ? 'w-full' : 'w-0'}`}></div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Premium Fullscreen Modal/Lightbox */}
      {selectedCert && mounted && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="relative bg-surface-container border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col lg:flex-row animate-in zoom-in-95 duration-300 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left/Top: Image Container */}
            <div className="lg:w-1/2 bg-black/40 p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 min-h-[250px] lg:min-h-[450px]">
              {selectedCert.imageId ? (
                <img 
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${selectedCert.imageId}`} 
                  alt={selectedCert.title} 
                  className="max-w-full max-h-[35vh] lg:max-h-[60vh] object-contain rounded shadow-2xl"
                />
              ) : (
                <div className="text-center p-8 space-y-4">
                  <span className="material-symbols-outlined text-5xl text-primary opacity-40">school</span>
                  <p className="text-on-surface-variant font-label-caps text-xs tracking-widest">No Document Attached</p>
                </div>
              )}
            </div>

            {/* Right/Bottom: Description Card */}
            <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6 bg-surface-container-high">
              <div className="space-y-4">
                <span className="font-display text-3xl text-primary/30 font-black block leading-none">
                  {selectedCert.id}
                </span>
                
                <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight text-on-surface leading-tight">
                  {selectedCert.title}
                </h3>

                {(selectedCert.institution || selectedCert.year) && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCert.institution && (
                      <span className="px-2.5 py-1 bg-primary/10 text-primary border border-primary/20 rounded font-label-caps text-[10px] tracking-wider">
                        {selectedCert.institution}
                      </span>
                    )}
                    {selectedCert.year && (
                      <span className="px-2.5 py-1 bg-white/5 text-on-surface-variant border border-white/10 rounded font-label-caps text-[10px] tracking-wider">
                        {selectedCert.year}
                      </span>
                    )}
                  </div>
                )}

                <div className="w-10 h-[2px] bg-primary"></div>

                <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-relaxed">
                  {selectedCert.description}
                </p>
              </div>

              <button 
                onClick={() => setSelectedCert(null)}
                className="w-full py-3.5 bg-primary text-black font-label-caps font-bold tracking-widest text-xs rounded hover:bg-primary-container hover:text-on-primary-fixed transition-all duration-300 uppercase shadow-lg shadow-primary/15"
              >
                Close Details
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
