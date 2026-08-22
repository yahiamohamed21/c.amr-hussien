"use client";

import { FileText } from "lucide-react";

export function Accreditations() {
  return (
    <section id="cv" className="py-24 md:py-32 bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 relative flex justify-center items-center border-t border-[#10110F]/5 dark:border-white/5">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-[#C7FF00]/10 blur-[100px] rounded-full pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex justify-center">
        <a 
          href="/cv.pdf" 
          target="_blank" 
          className="group flex flex-col items-center justify-center gap-6 p-12 md:px-24 md:py-16 rounded-[40px] border border-[#10110F]/10 dark:border-white/10 bg-white dark:bg-[#10110F] hover:border-[#10110F]/30 dark:hover:border-[#C7FF00]/50 transition-all duration-700 hover:-translate-y-2 shadow-lg hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_50px_rgba(199,255,0,0.15)]"
        >
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#10110F]/5 dark:from-[#C7FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[40px]"></div>

          <div className="w-24 h-24 rounded-full bg-[#10110F]/5 dark:bg-white/[0.03] border border-[#10110F]/10 dark:border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#10110F] dark:group-hover:bg-[#C7FF00] group-hover:border-[#10110F] dark:group-hover:border-[#C7FF00] transition-all duration-500 z-10">
            <FileText className="w-10 h-10 text-[#10110F] dark:text-[#C7FF00] group-hover:text-white dark:group-hover:text-[#10110F] transition-colors duration-500" strokeWidth={1.5} />
          </div>
          
          <div className="flex flex-col items-center text-center z-10">
            <span className="font-label-caps text-xs text-[#10110F]/60 dark:text-white/50 uppercase tracking-[0.3em] mb-2 group-hover:text-[#10110F]/80 dark:group-hover:text-white/80 transition-colors duration-500">
              Professional Experience
            </span>
            <div className="font-display text-3xl md:text-5xl uppercase tracking-wider text-[#10110F] dark:text-white group-hover:text-[#10110F] dark:group-hover:text-[#C7FF00] transition-colors duration-500">
              View CV
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
