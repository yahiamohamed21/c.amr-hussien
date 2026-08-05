export function Philosophy() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background py-20 border-t border-white/5">
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12  lg:gap-12 items-center">
        {/* Left: Cinematic Cut-out Image */}
        <div className="lg:col-span-5 relative group">
          {/* Decorative Crosshairs */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-primary/50 transition-all duration-700 group-hover:-top-6 group-hover:-left-6"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-primary/50 transition-all duration-700 group-hover:-bottom-6 group-hover:-right-6"></div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-sm filter contrast-125 transition-all duration-700 flex items-end justify-center @container">
            <img 
              src="./image-3.jpeg" 
              alt="Coach Amr" 
              className="w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-100 absolute inset-0 z-0"
            />
            {/* Title Overlay */}
            <div className="absolute top-6 left-6 z-30 pointer-events-none">
              <h3 className="font-display-lg text-[clamp(7rem,17cqw,11rem)] leading-[0.9] uppercase tracking-tight text-white drop-shadow-lg">
                Train With <br />
                <span className="text-primary italic">Purpose</span>
              </h3>
            </div>
 

            {/* Inner Glitch/Scanline effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay z-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
          </div>

         </div>

        {/* Right: Circular Layout */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center relative z-40 min-h-[320px] sm:min-h-[500px] mt-4 lg:mt-0">

          {/* Connecting Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
               <line x1="50" y1="50" x2="25" y2="25" stroke="currentColor" className="text-primary/40" strokeWidth="0.2" strokeDasharray="1 1" />
               <line x1="50" y1="50" x2="75" y2="25" stroke="currentColor" className="text-primary/40" strokeWidth="0.2" strokeDasharray="1 1" />
               <line x1="50" y1="50" x2="25" y2="75" stroke="currentColor" className="text-primary/40" strokeWidth="0.2" strokeDasharray="1 1" />
               <line x1="50" y1="50" x2="75" y2="75" stroke="currentColor" className="text-primary/40" strokeWidth="0.2" strokeDasharray="1 1" />
             </svg>
          </div>

          {/* Central Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border border-primary/50 bg-[#0f1012] flex flex-col items-center justify-center z-30 shadow-[0_0_40px_rgba(200,255,0,0.1)]">
            <span className="material-symbols-outlined text-primary mb-1 text-xl sm:text-3xl">psychology</span>
            <span className="font-display font-bold text-white tracking-widest text-[8px] sm:text-[10px] md:text-xs uppercase">Philosophy</span>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-6 sm:gap-x-12 gap-y-20 sm:gap-y-32 relative z-20 py-2 sm:py-8">
            
            <div className="bg-surface-container-low/90 backdrop-blur-md border border-white/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl hover:border-primary/50 transition-colors group">
              <h4 className="font-bold text-white mb-1 sm:mb-2 uppercase text-[10px] sm:text-sm tracking-wide flex items-center gap-2 sm:gap-3">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(200,255,0,0.5)] group-hover:shadow-[0_0_15px_rgba(200,255,0,0.8)]"></div>
                 Intention
              </h4>
              <p className="text-[9px] sm:text-sm text-on-surface-variant leading-relaxed">Every exercise has a reason. Every movement has intention.</p>
            </div>

            <div className="bg-surface-container-low/90 backdrop-blur-md border border-white/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl hover:border-primary/50 transition-colors group">
              <h4 className="font-bold text-white mb-1 sm:mb-2 uppercase text-[10px] sm:text-sm tracking-wide flex items-center gap-2 sm:gap-3">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(200,255,0,0.5)] group-hover:shadow-[0_0_15px_rgba(200,255,0,0.8)]"></div>
                 Customization
              </h4>
              <p className="text-[9px] sm:text-sm text-on-surface-variant leading-relaxed">Every program is built around your goals, not generic templates.</p>
            </div>

            <div className="bg-surface-container-low/90 backdrop-blur-md border border-white/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl hover:border-primary/50 transition-colors group">
              <h4 className="font-bold text-white mb-1 sm:mb-2 uppercase text-[10px] sm:text-sm tracking-wide flex items-center gap-2 sm:gap-3">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(200,255,0,0.5)] group-hover:shadow-[0_0_15px_rgba(200,255,0,0.8)]"></div>
                 Consistency
              </h4>
              <p className="text-[9px] sm:text-sm text-on-surface-variant leading-relaxed">Progress is earned through consistency, not intensity.</p>
            </div>

            <div className="bg-surface-container-low/90 backdrop-blur-md border border-white/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl hover:border-primary/50 transition-colors group">
              <h4 className="font-bold text-white mb-1 sm:mb-2 uppercase text-[10px] sm:text-sm tracking-wide flex items-center gap-2 sm:gap-3">
                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/50 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(200,255,0,0.5)] group-hover:shadow-[0_0_15px_rgba(200,255,0,0.8)]"></div>
                 Sustainability
              </h4>
              <p className="text-[9px] sm:text-sm text-on-surface-variant leading-relaxed">Because sustainable transformation isn't about doing more. It's about doing what matters.</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
