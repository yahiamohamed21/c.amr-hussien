"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function Process() {
  const { data: methodology } = useQuery({
    queryKey: ["public-methodology"],
    queryFn: async () => {
      const res = await api.get("/api/v1/public/methodology");
      return res.data;
    },
    retry: false,
  });

  const defaultSteps = [
    {
      id: "01",
      title: "ASSESS",
      description: "Understand your body before changing it.",
    },
    {
      id: "02",
      title: "BUILD",
      description: "Develop strength, mobility, and movement quality.",
    },
    {
      id: "03",
      title: "PERFORM",
      description: "Improve endurance, athleticism, and confidence.",
    },
    {
      id: "04",
      title: "SUSTAIN",
      description: "Create habits that last a lifetime.",
    }
  ];

  const displaySteps = methodology?.steps?.length > 0
    ? methodology.steps.map((s: any, index: number) => ({
        id: String(index + 1).padStart(2, "0"),
        title: s.name,
        description: s.description,
      }))
    : defaultSteps;

  const eyebrow = methodology?.eyebrow || "SIGNATURE FRAMEWORK";
  const title = methodology?.title || "THE PERFORMANCE METHOD";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default open first one

  // If the section is explicitly set to invisible in database, we can choose to hide or show fallback.
  // The API returns 404 when IsVisible is false, so it will fall back to default steps.

  return (
    <section id="methodology" className="py-32 px-margin-mobile md:px-margin-desktop bg-background overflow-hidden relative border-t border-black/5 dark:border-white/5">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full   from-primary-container/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-primary"></span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
              {eyebrow}
            </span>
          </div>
          <h2 className="font-display-xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] uppercase tracking-tight text-on-surface max-w-3xl">
            {title}
          </h2>
        </div>

        {/* Interactive Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[450px]">
          {displaySteps.map((step: any, index: number) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            
            return (
              <div 
                key={step.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative overflow-hidden rounded-2xl transition-all duration-700 ease-out cursor-pointer flex flex-col justify-end p-8 md:p-10
                  ${isHovered ? 'lg:flex-[3] shadow-2xl bg-surface' : 'lg:flex-1 bg-surface-container-lowest shadow-sm'}
                  ${!isHovered && isAnyHovered ? 'lg:opacity-40 grayscale-[50%]' : 'opacity-100 grayscale-0'}
                  min-h-[200px] lg:min-h-0
                `}
              >
                {/* Giant Background Number */}
                <div 
                  className={`
                    absolute top-4 right-4 md:-right-8 md:-top-10 font-display font-black leading-none select-none transition-all duration-700
                    ${isHovered ? 'text-[120px] md:text-[250px] text-primary/10' : 'text-[80px] md:text-[150px] text-black/5 dark:text-white/5'}
                  `}
                >
                  {step.id}
                </div>

                {/* Content */}
                <div className="relative z-10 mt-auto">
                  <div className="flex items-center gap-6 mb-4">
                    <span className={`font-display text-2xl md:text-3xl font-bold transition-colors duration-500 ${isHovered ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {step.id}
                    </span>
                    <h3 className={`font-display uppercase tracking-wider transition-all duration-500 ${isHovered ? 'text-3xl md:text-4xl text-on-surface' : 'text-xl md:text-2xl text-on-surface-variant'}`}>
                      {step.title}
                    </h3>
                  </div>
                  
                  {/* Expandable Description */}
                  <div 
                    className={`
                      grid transition-all duration-700 ease-in-out
                      ${isHovered ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 lg:opacity-0 lg:mt-0 opacity-100 mt-4 grid-rows-[1fr]'}
                    `}
                  >
                    <div className="overflow-hidden">
                      <p className="font-body-md text-on-surface-variant md:text-lg max-w-xl leading-relaxed border-l-2 border-primary/30 pl-4">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Active Indicator Line */}
                <div 
                  className={`absolute bottom-0 left-0 h-1 bg-primary transition-all duration-700 ease-out ${isHovered ? 'w-full' : 'w-0'}`}
                ></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
