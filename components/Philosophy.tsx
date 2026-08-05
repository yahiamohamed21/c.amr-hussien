export function Philosophy() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background py-20 border-t border-white/5">

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

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
            
            {/* Massive Foreground Typography (Inside the image) */}
            <div className="absolute bottom-2 md:bottom-4 left-0 w-full flex justify-center pointer-events-none select-none z-10 mix-blend-overlay px-2">
              <h2 
                className="font-display font-black text-transparent leading-[.7] uppercase tracking-tighter text-center   w-full"
                style={{ 
                  fontSize: "25cqw", 
                  WebkitTextStroke: "2px rgba(255,255,255,0.8)"
                }}
              >
                PHILOSOPHY
              </h2>
            </div>

            {/* Inner Glitch/Scanline effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay z-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
          </div>

         </div>

        {/* Right: Editorial Quote & Text */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center relative z-40">

          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-on-surface-variant">
              Philosophy
            </span>
          </div>
          {/* The rest is intact */}

          <h3 className="font-display-lg text-[clamp(2rem,4vw,3.5rem)] leading-none uppercase tracking-tight text-on-surface mb-10">
            Train With <br />
            <span className="text-primary italic">Purpose</span>
          </h3>

          <div className="relative mt-4">
            {/* Massive floating quote mark */}
            <span className="absolute -top-12 -left-6 text-9xl text-white/5 font-display leading-none select-none">"</span>

            <div className="relative z-10 flex flex-col gap-4">
              {[
                { title: "Intention", desc: "Every exercise has a reason. Every movement has intention." },
                { title: "Customization", desc: "Every program is built around your goals, not generic templates." },
                { title: "Consistency", desc: "Progress is earned through consistency, not intensity." },
                { title: "Sustainability", desc: "Because sustainable transformation isn't about doing more. It's about doing what matters." }
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low border border-white/5 hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface mb-3 text-2x  md:text-base tracking-wide uppercase">{tip.title}</h4>
                    <p className="font-body-md text-on-surface-variant text-sm md:text-base leading-[1.7] tracking-wide">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
