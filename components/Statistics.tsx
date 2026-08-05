"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const statsData = [
  { value: 10, suffix: "+", label: "Years Exp." },
  { value: 2, suffix: "X", label: "Top Trainer" },
  { value: 10000, suffix: "+", label: "Sessions" },
  { value: 100, suffix: "+", label: "Transformations" }
];

export function Statistics() {
  const containerRef = useRef<HTMLElement>(null);
  const numbersRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    statsData.forEach((stat, index) => {
      const el = numbersRef.current[index];
      if (!el) return;

      const obj = { val: 0 };
      
      gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // start animation when section is 85% into view
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          el.innerHTML = Math.floor(obj.val) + stat.suffix;
        }
      });
      
      // Also fade in the whole container
      gsap.from(el.parentElement, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        }
      });
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-surface-container-lowest py-20 border-y border-outline-variant/10">
      <div className="px-4 md:px-margin-desktop grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-4 md:gap-gutter text-center">
        {statsData.map((stat, index) => (
          <div 
            key={index} 
            className={`${index !== 3 ? 'border-r' : ''} ${index === 1 ? 'border-r-0 md:border-r' : ''} border-outline-variant/10`}
          >
            <div 
              ref={el => { numbersRef.current[index] = el; }}
              className="font-display-lg text-4xl sm:text-headline-lg-mobile md:text-display-lg text-on-background"
            >
              0{stat.suffix}
            </div>
            <div className="font-label-caps text-[10px] md:text-label-caps text-primary uppercase mt-2">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
