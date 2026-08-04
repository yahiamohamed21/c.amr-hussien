"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/components/ui";

interface BeforeAfterProps {
  before: string;
  after: string;
  name: string;
}

function BeforeAfterSlider({ before, after, name }: BeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50); // Default to 50%
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.getBoundingClientRect().width);
      }
    };
    updateWidth();
    
    // Use ResizeObserver for responsive width updates
    const observer = new ResizeObserver(updateWidth);
    observer.observe(containerRef.current);
    
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only move if we hover/move mouse
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative aspect-[4/5] bg-surface-container overflow-hidden rounded-lg shadow-2xl border border-black/5 dark:border-white/5 select-none touch-none cursor-ew-resize group"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* After Image (Background) */}
      <img
        className="absolute inset-0 w-full h-full object-cover filter contrast-[1.05]"
        src={after}
        alt={`${name} After`}
        draggable="false"
      />
      <div className="absolute top-4 right-4 bg-primary-container text-on-primary-fixed px-3 py-1 rounded font-label-caps text-[10px] tracking-widest uppercase shadow-md z-20">
        After
      </div>

      {/* Before Image (Clipped Overlay) */}
      <div 
        className="absolute inset-0 overflow-hidden border-r-2 border-primary z-10 pointer-events-none"
        style={{ width: `${sliderPosition}%` }}
      >
        <div 
          className="absolute inset-0 h-full"
          style={{ width: containerWidth ? `${containerWidth}px` : '100%' }}
        >
          <img
            className="w-full h-full object-cover filter grayscale"
            src={before}
            alt={`${name} Before`}
            draggable="false"
          />
        </div>
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded font-label-caps text-[10px] tracking-widest uppercase text-white z-20">
          Before
        </div>
      </div>

      {/* Slider Bar Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-primary pointer-events-none z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_15px_rgba(184,211,0,0.5)] border border-black/10 transition-transform duration-300 group-hover:scale-110">
          <span className="material-symbols-outlined text-lg font-bold select-none rotate-90">unfold_more</span>
        </div>
      </div>
    </div>
  );
}

export function Results() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const [transformations, setTransformations] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/transformations`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.clientDisplayName,
          type: item.programName,
          quote: item.testimonial,
          beforeImage: item.beforeImageId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${item.beforeImageId}` : '',
          afterImage: item.afterImageId ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${item.afterImageId}` : '',
        }));
        setTransformations(mapped);
      })
      .catch(err => {
        setTransformations([
          { id: '1', name: 'Ahmed M.', type: '12 Week Transformation', quote: 'Amr completely changed my approach to training and nutrition. The results speak for themselves.', beforeImage: '/c_amr.png', afterImage: '/c_amr.png' },
          { id: '2', name: 'Kareem S.', type: 'Performance Coaching', quote: 'I have never felt stronger. This is not just a workout program, it is a lifestyle overhaul.', beforeImage: '/c_amr.png', afterImage: '/c_amr.png' },
          { id: '3', name: 'Omar T.', type: 'Fat Loss Protocol', quote: 'Lost 15kg in 3 months while keeping all my strength. Absolute game changer.', beforeImage: '/c_amr.png', afterImage: '/c_amr.png' }
        ]);
      });
  }, []);

  return (
    <section id="transformations" className="py-32 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest relative overflow-hidden border-t border-black/5 dark:border-white/5">
      
      {/* Background Graphic */}
      <div className="absolute -top-40 -right-40 text-[30rem] font-display font-black text-black/[0.02] dark:text-white/[0.02] select-none pointer-events-none leading-none">
        PROOF
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-20 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[2px] bg-primary"></span>
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                RESULTS
              </span>
            </div>
            <h2 className="font-display-xl text-[clamp(3rem,6vw,5rem)] leading-[0.9] uppercase tracking-tighter text-on-surface mb-6">
              REAL PROGRESS. <br /> <span className="text-outline-text" style={{ WebkitTextStroke: "2px var(--color-on-surface)", color: "transparent" }}>REAL PEOPLE.</span>
            </h2>
            <p className="font-body-md text-on-surface-variant max-w-xl text-lg">
              Every transformation represents more than a physical change. It reflects discipline, consistency, and a commitment to becoming better every single day.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-all text-on-surface bg-background shadow-lg"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 border border-outline-variant/30 rounded-full flex items-center justify-center hover:bg-primary-container hover:text-on-primary-fixed transition-all text-on-surface bg-background shadow-lg"
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Transformations Carousel */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-8 md:gap-12 pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {transformations.map((item) => (
            <div key={item.id} className="flex flex-col flex-none w-[85vw] md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] snap-start">
              
              {/* Premium Drag/Move Slider */}
              <BeforeAfterSlider 
                before={item.beforeImage} 
                after={item.afterImage} 
                name={item.name} 
              />

              {/* Data Section */}
              <div className="flex flex-col flex-grow mt-8">
                <div className="w-12 h-1 bg-primary mb-6"></div>
                <h5 className="font-display text-3xl uppercase mb-2 text-on-surface tracking-tight">{item.name}</h5>
                <p className="font-label-caps text-[11px] tracking-[0.2em] text-primary uppercase mb-6">{item.type}</p>
                <div className="relative pl-4 border-l-2 border-outline-variant/30 mt-auto">
                  <p className="font-body-md text-on-surface-variant italic text-sm md:text-base leading-relaxed">
                    {item.quote}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
