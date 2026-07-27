"use client";

import { cn } from "@/components/ui";

export function QuoteDivider() {
  const phrases = [
    "YOUR BODY IS YOUR GREATEST INVESTMENT",
    "TREAT IT LIKE ONE",
    "SCIENCE OVER TRENDS",
    "MASTER YOUR ENVIRONMENT",
    "DISCIPLINE EQUALS FREEDOM"
  ];

  // Repeat enough times to guarantee a seamless screen wrap
  const seamlessPhrases = [...phrases, ...phrases, ...phrases, ...phrases];

  return (
    <section className="relative overflow-hidden bg-surface py-6 md:py-8 flex flex-col justify-center items-center border-y border-white/10">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary-container/5 blur-[80px] rounded-full pointer-events-none"></div>

      {/* Typography Marquee */}
      <div className="relative z-10 w-full flex overflow-hidden">
        
        <div className="whitespace-nowrap flex gap-8 md:gap-16 items-center animate-marquee-fast group-hover:[animation-play-state:paused] cursor-default">
          {seamlessPhrases.map((phrase, i) => (
            <div key={`massive-${i}`} className="flex items-center gap-8 md:gap-16 py-2">
              <span 
                className={cn(
                  "font-display uppercase tracking-tighter text-[clamp(2rem,6vw,5rem)] leading-tight",
                  i % 2 === 0 
                    ? "text-primary drop-shadow-[0_0_15px_rgba(184,211,0,0.3)]" 
                    : "text-transparent"
                )}
                style={
                  i % 2 !== 0 
                    ? { WebkitTextStroke: "min(2px, 0.2vw) var(--color-primary)" } 
                    : {}
                }
              >
                {phrase}
              </span>
              
              {/* Separator */}
              <div className="flex flex-col gap-1.5 opacity-40">
                <span className="block w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-on-surface"></span>
                <span className="block w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-on-surface"></span>
                <span className="block w-1.5 h-1.5 md:w-2.5 md:h-2.5 bg-on-surface"></span>
              </div>
            </div>
          ))}
        </div>
        
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
}

