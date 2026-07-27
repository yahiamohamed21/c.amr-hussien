"use client";

import { useState } from "react";

export function Process() {
  const steps = [
    {
      id: "01",
      title: "ASSESS",
      description: "Biometric screening, movement analysis, and goal profiling to establish your baseline data.",
      bg: "bg-surface"
    },
    {
      id: "02",
      title: "BUILD",
      description: "Foundational programming designed to address imbalances and strengthen the core physiological pillars.",
      bg: "bg-surface-container"
    },
    {
      id: "03",
      title: "PERFORM",
      description: "High-intensity execution phase focusing on peak outputs, power, and metabolic efficiency.",
      bg: "bg-surface-container-high"
    },
    {
      id: "04",
      title: "SUSTAIN",
      description: "Strategic maintenance and recovery protocols to ensure longevity and permanent transformation.",
      bg: "bg-surface-container-highest"
    }
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0); // Default open first one

  return (
    <section id="methodology" className="py-32 px-margin-mobile md:px-margin-desktop bg-background overflow-hidden relative border-t border-black/5 dark:border-white/5">
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-container/5 to-transparent pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-primary"></span>
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
              The Process
            </span>
          </div>
          <h2 className="font-display-xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] uppercase tracking-tight text-on-surface max-w-3xl">
            THE PERFORMANCE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">METHOD</span>
          </h2>
        </div>

        {/* Interactive Accordion */}
        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[450px]">
          {steps.map((step, index) => {
            const isHovered = hoveredIndex === index;
            const isAnyHovered = hoveredIndex !== null;
            // On desktop, the hovered item expands (flex-[3]), others shrink (flex-1).
            // If none hovered, all are equal (flex-1).
            
            return (
              <div 
                key={step.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`
                  relative overflow-hidden rounded-2xl border transition-all duration-700 ease-out cursor-pointer flex flex-col justify-end p-8 md:p-10
                  ${isHovered ? 'lg:flex-[3] border-primary/50 shadow-2xl bg-surface' : 'lg:flex-1 border-black/5 dark:border-white/5 bg-surface-container-lowest shadow-sm'}
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
                      /* Note: On mobile, we always want the text visible or just allow it to expand. To keep it clean on mobile, we'll let it stay visible if hovered, or we can just make it fully responsive. */
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
