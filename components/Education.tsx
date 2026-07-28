"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function Education() {
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
      }))
    : defaultItems;

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

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
                      
                      <span className={`material-symbols-outlined transition-all duration-500 ${isActive ? 'text-primary translate-x-0 opacity-100 rotate-0' : 'text-on-surface-variant opacity-0 -translate-x-4 -rotate-45'}`}>
                        arrow_forward
                      </span>
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
                              <div className="mt-4 border border-white/10 rounded overflow-hidden max-w-xs shadow-md">
                                <img 
                                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${item.imageId}`} 
                                  alt={item.title} 
                                  className="w-full object-cover max-h-[160px]"
                                />
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
    </section>
  );
}
