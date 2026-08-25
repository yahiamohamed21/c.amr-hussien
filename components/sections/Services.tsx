"use client";

import { useState, useEffect, useRef } from "react";
import { Dumbbell, Activity, Target, HeartPulse, Utensils, Laptop, Zap } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const iconMap: Record<string, any> = {
  'fitness_center': Dumbbell,
  'transform': Activity,
  'sports_score': Target,
  'healing': HeartPulse,
  'restaurant': Utensils,
  'laptop_mac': Laptop,
  'default': Zap
};

export function Services() {
  const [services, setServices] = useState<any[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  
  // Carousel State
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/services`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((item: any, index: number) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          icon: item.icon || 'default',
        }));
        setServices(mapped);
      })
      .catch(err => {
        setServices([
          { id: '1', title: 'Personal Training', description: 'Private coaching tailored to your body, lifestyle, and goals, focusing on strength, movement quality, body composition, and long term health.', icon: 'fitness_center' },
          { id: '2', title: 'Body Transformation', description: 'Evidence based programs designed to reduce body fat, increase lean muscle, improve energy levels, and create sustainable lifestyle habits.', icon: 'transform' },
          { id: '3', title: 'Sports Performance', description: 'Advanced training systems that improve speed, power, endurance, agility, and athletic performance for recreational and competitive athletes.', icon: 'sports_score' },
          { id: '4', title: 'Injury Rehabilitation', description: 'Structured recovery programs that bridge the gap between physiotherapy and performance, helping you return stronger and move pain free.', icon: 'healing' },
          { id: '5', title: 'Strength & Conditioning', description: 'Scientifically designed programs that develop strength, stability, mobility, and resilience while reducing injury risk.', icon: 'fitness_center' },
          { id: '6', title: 'Nutrition Coaching', description: 'Practical nutritional strategies that support performance, recovery, fat loss, and sustainable health without restrictive dieting.', icon: 'restaurant' },
          { id: '7', title: 'Online Coaching', description: 'Personalized coaching from anywhere in the world with customized programming, nutrition guidance, progress tracking, and continuous support.', icon: 'laptop_mac' }
        ]);
      });
  }, []);

  // Smooth Infinite Auto-Scroll Logic
  useEffect(() => {
    if (services.length === 0) return;

    const animate = () => {
      const container = scrollContainerRef.current;
      if (container && !isHovered && !isDragging.current) {
        container.scrollLeft += 1.5; // Auto-scroll speed
        
        // Infinite Loop: If we scrolled past half the duplicated content, reset seamlessly
        if (container.scrollLeft >= container.scrollWidth / 2) {
           container.scrollLeft = 0;
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [isHovered, services]);

  // Mouse Drag Logic for Desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };
  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsHovered(false);
  };
  const handleMouseUp = () => {
    isDragging.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  useGSAP(() => {
    if (services.length === 0) return;

    // Title reveal
    gsap.fromTo(".service-title-word",
        { y: 100, opacity: 0 },
        {
            y: 0, opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
            }
        }
    );
  }, { scope: containerRef, dependencies: [services] });

  // Duplicate services to create an infinite scroll illusion
  const duplicatedServices = [...services, ...services, ...services, ...services];

  return (
    <section id="services" ref={containerRef} className="py-24 md:py-40 relative bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 overflow-hidden border-t border-[#10110F]/5 dark:border-white/5">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "80px 80px" }}></div>
      
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C7FF00]/10 blur-[150px] rounded-full pointer-events-none z-0 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#C7FF00]/5 blur-[150px] rounded-full pointer-events-none z-0 -translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full relative z-10">

        {/* Section Header */}
        <div className="max-w-[1500px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-3xl overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-[#10110F] dark:bg-[#C7FF00] service-title-word"></span>
              <span className="font-label-caps text-xs md:text-sm tracking-[0.3em] uppercase text-[#10110F] dark:text-[#C7FF00] font-bold service-title-word">
                Our Expertise
              </span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-[90px] uppercase leading-[0.9] text-[#10110F] dark:text-white">
                <span className="block service-title-word">Coaching Built</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#10110F] to-[#10110F]/50 dark:from-[#C7FF00] dark:to-white/70 service-title-word pb-4">
                    Around You
                </span>
            </h2>
          </div>
          <div className="max-w-md overflow-hidden">
              <p className="font-sans text-lg md:text-xl text-[#10110F]/70 dark:text-white/60 leading-relaxed font-medium border-l-2 border-[#10110F]/20 dark:border-[#C7FF00]/50 pl-6 py-2 service-title-word">
                A comprehensive suite of elite performance protocols designed to optimize every facet of your physical potential.
              </p>
          </div>
        </div>

        {/* Infinite Horizontal Carousel */}
        <div 
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className="flex overflow-x-auto gap-6 px-6 md:px-12 lg:px-20 pb-12 pt-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {duplicatedServices.map((service, i) => {
            const IconComponent = iconMap[service.icon] || iconMap['default'];
            const originalIndex = i % services.length;
            
            return (
              <div 
                key={`${service.id}-${i}`} 
                className={`group relative shrink-0 w-[85vw] md:w-[450px] lg:w-[500px] rounded-none p-8 md:p-12 overflow-hidden bg-white dark:bg-[#10110F] border border-[#10110F]/10 dark:border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[350px]`}
              >
                {/* Hover Sweep Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#10110F]/5 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Top Section: Icon */}
                <div className="flex items-start mb-12 relative z-10">
                    <div className={`w-16 h-16 rounded-none flex items-center justify-center transition-transform duration-500 group-hover:scale-110 bg-[#10110F]/5 dark:bg-white/[0.03] text-[#10110F] dark:text-[#C7FF00] border border-[#10110F]/10 dark:border-white/10`}>
                        <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Bottom Section: Text */}
                <div className="relative z-10">
                    <h3 className={`font-display text-3xl md:text-4xl uppercase mb-4 text-[#10110F] dark:text-white group-hover:tracking-wider transition-all duration-500 truncate whitespace-nowrap`}>
                        {service.title}
                    </h3>
                    <p className={`font-sans text-base md:text-lg leading-relaxed text-[#10110F]/70 dark:text-white/60 truncate whitespace-nowrap`}>
                        {service.description}
                    </p>
                </div>

                {/* Abstract animated border on hover */}
                <div className="absolute inset-0 border-2 border-[#10110F]/0 dark:border-white/0 rounded-none group-hover:border-[#10110F]/10 dark:group-hover:border-[#C7FF00]/30 transition-colors duration-500 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}