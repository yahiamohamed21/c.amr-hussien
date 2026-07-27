export function Philosophy() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background py-20 border-t border-white/5">
      
      {/* Massive Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center pointer-events-none opacity-20 select-none z-0">
        <h2 
          className="font-display font-black text-transparent leading-[0.75] uppercase tracking-tighter"
          style={{ 
            fontSize: "clamp(10rem, 30vw, 30rem)", 
            WebkitTextStroke: "2px var(--color-on-surface)"
          }}
        >
          PURPOSE
        </h2>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left: Cinematic Cut-out Image */}
        <div className="lg:col-span-5 relative group">
          {/* Decorative Crosshairs */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-primary/50 transition-all duration-700 group-hover:-top-6 group-hover:-left-6"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-primary/50 transition-all duration-700 group-hover:-bottom-6 group-hover:-right-6"></div>
          
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm filter grayscale-[0.8] contrast-125 transition-all duration-700 group-hover:grayscale-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByjZhYNDP5Dg1Jy7hYNVO7OnBhZepFbXDrbTPSHG2h3iq9hDNOnCA6P_Tie5EboH0at933GkzhnjPmFcoev6vDyGtCvD1i-TfHjS3twu1l9MbHeMesO1YxrwmqSyAI6N3kflMkA4u-ZyKUBNrur3Y5_ZE3kAgbipvxI8lK0bpnpMqi0_E7-KgC1SQm9mD64xioeyE1ZSGt1UEXLMWCYXOkAJ7vMwGYGte66a3BuqJZd9xPWdPT762x73dXFcUwp-feBU9S4_EALEbB" 
              alt="Coach Amr" 
              className="w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-100"
            />
            {/* Inner Glitch/Scanline effect */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
          </div>
          
          {/* Floating Data Badge */}
          <div className="absolute -right-8 bottom-12 bg-surface border border-white/10 p-4 backdrop-blur-md hidden md:flex flex-col gap-1 shadow-2xl">
            <span className="font-label-caps text-[9px] uppercase tracking-widest text-primary">Status</span>
            <span className="font-display text-lg uppercase text-on-surface">Unbreakable</span>
          </div>
        </div>

        {/* Right: Editorial Quote & Text */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-primary"></div>
            <span className="font-label-caps text-xs tracking-[0.3em] uppercase text-on-surface-variant">
              The Philosophy
            </span>
          </div>

          <h3 className="font-display-lg text-[clamp(2rem,4vw,3.5rem)] leading-none uppercase tracking-tight text-on-surface mb-10">
            Train with <br/> 
            <span className="text-primary italic">Relentless</span> Purpose
          </h3>

          <div className="relative pl-8 border-l-4 border-surface-container-high">
            {/* Massive floating quote mark */}
            <span className="absolute -top-12 -left-6 text-9xl text-white/5 font-display leading-none select-none">"</span>
            
            <p className="relative z-10 font-body-md text-xl md:text-3xl text-on-surface-variant leading-relaxed font-light">
              Success is not an accident. It is a <strong className="text-on-surface font-semibold">choice repeated every single day</strong> until it becomes your identity.
            </p>
          </div>
          
          <div className="mt-12">
            <button className="font-label-caps text-sm tracking-widest uppercase text-primary hover:text-on-primary-fixed hover:bg-primary border border-primary px-8 py-4 transition-colors duration-300">
              Read Full Story
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
