"use client";

import { Camera, Star, Dumbbell } from "lucide-react";

export function TopTrainer() {
  return (
    <section className="py-24 px-margin-mobile md:px-margin-desktop bg-surface relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-surface to-surface"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-6">
          <span className="w-12 h-[2px] bg-primary"></span>
          <span className="font-label-caps text-xs text-primary uppercase tracking-[0.4em]">
            Highlights
          </span>
          <span className="w-12 h-[2px] bg-primary"></span>
        </div>

        <h2 className="font-display-xl text-[clamp(3rem,6vw,5rem)] leading-none uppercase tracking-tighter text-on-surface mb-8">
          Instagram <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container relative">
            HIGHLIGHTS
            <span className="absolute inset-0 bg-primary/20 blur-[40px] -z-10"></span>
          </span>
        </h2>
        
        <p className="font-body-md text-on-surface-variant text-lg leading-relaxed max-w-2xl mb-12">
          Check out the highlights that define my journey as a top fitness professional, see what clients have to say, and witness real transformations.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTQ2MTA2MjgzNDU4Nzc0?story_media_id=3785940835355855732&igsi=MXhpZmVsNGlyb2RiZg%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-surface-container-high border border-white/10 hover:border-primary/50 transition-colors duration-300 px-8 py-5 w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-0 bg-primary/10 transition-all duration-500 ease-out group-hover:w-full"></div>
            <span className="relative z-10 flex items-center gap-3 font-label-caps text-sm tracking-widest text-on-surface uppercase group-hover:text-primary transition-colors">
              <Camera className="w-5 h-5" />
              Top Trainer
            </span>
          </a>

          <a 
            href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTQ5MjkzNjMzNDU2ODc5?story_media_id=3946900869052553949&igsi=MTkzb25rc3F6OGJnMA%3D%3D" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-surface-container-high border border-white/10 hover:border-primary/50 transition-colors duration-300 px-8 py-5 w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-0 bg-primary/10 transition-all duration-500 ease-out group-hover:w-full"></div>
            <span className="relative z-10 flex items-center gap-3 font-label-caps text-sm tracking-widest text-on-surface uppercase group-hover:text-primary transition-colors">
              <Star className="w-5 h-5" />
              Client Feedback
            </span>
          </a>

          <a 
            href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTY3Mzk1NDI1NDgzMTcw?story_media_id=2714809424994840085&igsi=ejBtNXV4M2xsYzNt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center bg-surface-container-high border border-white/10 hover:border-primary/50 transition-colors duration-300 px-8 py-5 w-full sm:w-auto"
          >
            <div className="absolute inset-0 w-0 bg-primary/10 transition-all duration-500 ease-out group-hover:w-full"></div>
            <span className="relative z-10 flex items-center gap-3 font-label-caps text-sm tracking-widest text-on-surface uppercase group-hover:text-primary transition-colors">
              <Dumbbell className="w-5 h-5" />
              Transformations
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
