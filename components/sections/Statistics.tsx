"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Trophy, Timer, Users, Flame } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const statsData = [
  { value: 10, suffix: "+", label: "Years Exp.", icon: Timer },
  { value: 2, suffix: "X", label: "Top Trainer", icon: Trophy },
  { value: 10000, suffix: "+", label: "Sessions", icon: Users },
  { value: 100, suffix: "+", label: "Transformations", icon: Flame }
];

export function Statistics() {
  const containerRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {

    // Animate Cards entering
    gsap.fromTo(".stat-card",
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );

    // Number counting animation (Robust Method)
    statsData.forEach((stat, index) => {
      const el = numbersRef.current[index];
      if (!el) return;

      gsap.fromTo(el,
        { innerText: 0 },
        {
          innerText: stat.value,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            once: true, // Only animate once
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 overflow-hidden border-t border-[#10110F]/5 dark:border-white/5">

      {/* Abstract Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[300px] max-w-[1000px] bg-[#C7FF00]/20 dark:bg-[#C7FF00]/10 blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="stat-card group relative p-[1px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden rounded-3xl"
              >
                {/* Spinning Gradient Border */}
                <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_300deg,#C7FF00_360deg)] animate-[spin_3s_linear_infinite] opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>

                {/* Inner Card Content */}
                <div className="relative w-full h-full bg-white dark:bg-[#10110F] transition-colors duration-500 flex flex-col justify-center items-center p-10 z-10 rounded-3xl">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#C7FF00]/10 dark:from-[#C7FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"></div>

                  {/* Icon Container */}
                  <div className="w-16 h-16 bg-[#10110F]/5 dark:bg-white/[0.03] border border-[#10110F]/10 dark:border-white/10 flex justify-center items-center mb-8 group-hover:scale-110 group-hover:bg-[#C7FF00]/20 dark:group-hover:bg-[#C7FF00]/10 group-hover:border-[#C7FF00]/50 transition-all duration-500 relative z-10 rounded-2xl">
                    <Icon className="w-8 h-8 text-[#10110F] dark:text-[#C7FF00] transition-colors duration-300" strokeWidth={1.5} />
                  </div>

                  {/* Number */}
                  <div className="font-display text-5xl md:text-6xl text-[#10110F] dark:text-white transition-colors duration-500 mb-3 flex items-center relative z-10">
                    <span ref={el => { numbersRef.current[index] = el; }}>
                      {stat.value}
                    </span>
                    <span className="text-[#C7FF00] ml-1">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <div className="font-label-caps text-xs md:text-sm tracking-[0.2em] text-[#10110F]/60 dark:text-white/50 uppercase text-center relative z-10 group-hover:text-[#10110F]/90 dark:group-hover:text-white/80 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
