"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export function Services() {
  // We define the static data here for now, but structure it so it's easy to replace with an API map later.
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/services`)
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((item: any, index: number) => ({
          id: item.id,
          title: item.name,
          description: item.description,
          icon: "fitness_center", // Using default icon as we don't have strings in DB yet for icon, or maybe we map it differently. The DB just has an IconId for media which we aren't using on this specific component design which expects a material symbol text.
          featured: index === 0, // First item is featured
        }));
        setServices(mapped);
      })
      .catch(err => {
        setServices([
          { id: '1', title: 'Personal Training', description: 'Private coaching tailored to your body, lifestyle, and goals, focusing on strength, movement quality, body composition, and long term health.', icon: 'fitness_center', featured: true },
          { id: '2', title: 'Body Transformation', description: 'Evidence based programs designed to reduce body fat, increase lean muscle, improve energy levels, and create sustainable lifestyle habits.', icon: 'transform', featured: false },
          { id: '3', title: 'Sports Performance', description: 'Advanced training systems that improve speed, power, endurance, agility, and athletic performance for recreational and competitive athletes.', icon: 'sports_score', featured: false },
          { id: '4', title: 'Injury Rehabilitation', description: 'Structured recovery programs that bridge the gap between physiotherapy and performance, helping you return stronger and move pain free.', icon: 'healing', featured: false },
          { id: '5', title: 'Strength & Conditioning', description: 'Scientifically designed programs that develop strength, stability, mobility, and resilience while reducing injury risk.', icon: 'fitness_center', featured: false },
          { id: '6', title: 'Nutrition Coaching', description: 'Practical nutritional strategies that support performance, recovery, fat loss, and sustainable health without restrictive dieting.', icon: 'restaurant', featured: false },
          { id: '7', title: 'Online Coaching', description: 'Personalized coaching from anywhere in the world with customized programming, nutrition guidance, progress tracking, and continuous support.', icon: 'laptop_mac', featured: false }
        ]);
      });
  }, []);
return(
    <section id="services" className="py-24 relative bg-black overflow-hidden">
      {/* Background Images Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        {/* Mobile Background (Single Image, no fading mask) */}
        <div className="absolute inset-0 w-full h-full block md:hidden">
          <Image
            src="/image-5.jpeg"
            alt="Nutrition Background"
            fill
            className="object-cover object-center opacity-70"
          />
        </div>

        {/* Desktop Background (Dual Blended Images) */}
        <div className="absolute inset-0 w-full h-full hidden md:block">
          <div 
            className="absolute inset-y-0 left-0 w-[60%] h-full"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, black 60%, transparent 100%)',
              maskImage: 'linear-gradient(to right, black 60%, transparent 100%)'
            }}
          >
            <Image
              src="/image-5.jpeg"
              alt="Nutrition Background 1"
              fill
              className="object-cover object-center opacity-70"
            />
          </div>

          <div 
            className="absolute inset-y-0 right-0 w-[60%] h-full"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, black 60%, transparent 100%)',
              maskImage: 'linear-gradient(to left, black 60%, transparent 100%)'
            }}
          >
            <Image
              src="/image-6.jpeg"
              alt="Nutrition Background 2"
              fill
              className="object-cover object-center opacity-70"
            />
          </div>
        </div>

        {/* Global Clean Overlay for text readability (no muddy gradients) */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent z-0"></div>
      <div className="absolute top-40 -left-40 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-primary"></span>
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                Our Expertise
              </span>
            </div>
            <h2 className="font-display-xl text-[clamp(2.5rem,5vw,4rem)] leading-[0.9] uppercase tracking-tight text-on-surface">
              COACHING BUILT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface-variant">
                AROUND YOU
              </span>
            </h2>
          </div>

          <div className="md:max-w-sm">
            <p className="font-body-md text-on-surface-variant text-sm md:text-base border-l-2 border-primary/30 pl-4 py-1">
              A comprehensive suite of elite performance protocols designed to optimize every facet of your physical potential.
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden bg-surface-container-lowest rounded-2xl border border-black/5 dark:border-white/5 shadow-sm transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 ${service.featured ? 'md:col-span-2 lg:col-span-2 row-span-2 p-8 md:p-12' : 'p-6 md:p-8'}`}
            >
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container/0 via-transparent to-primary-container/0 group-hover:from-primary/5 transition-colors duration-500"></div>

              <div className="relative z-10 h-full flex flex-col">
                <div className="flex justify-end items-start mb-auto">

                  {/* Decorative Lamp (Lightbulb) */}
                  <div className="w-8 h-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:border-primary/50 group-hover:text-primary group-hover:shadow-[0_0_15px_rgba(184,211,0,0.5)]">
                    <span className="material-symbols-outlined text-sm animate-pulse">lightbulb</span>
                  </div>
                </div>

                <div>
                  <h3 className={`font-display uppercase tracking-tight text-on-surface mb-3 group-hover:text-primary transition-colors ${service.featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                    {service.title}
                  </h3>
                  <p className={`font-body-md text-on-surface-variant leading-relaxed ${service.featured ? 'text-base md:text-lg max-w-md' : 'text-sm'}`}>
                    {service.description}
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
