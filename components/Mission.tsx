import Image from "next/image";


export function Mission() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-background py-24 border-t border-on-surface/5">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 px-margin-mobile max-w-[1440px] mx-auto w-full flex flex-col items-center justify-center text-center">
        {/* Text Content */}
        <div className="w-full max-w-4xl flex flex-col items-center">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] uppercase block mb-6 scroll-reveal">
            MISSION
          </span>
          <h2 className="font-display-xl text-[56px] md:text-[80px] uppercase leading-[1.1] md:leading-none mb-8 scroll-reveal text-on-surface">
            TO REDEFINE <span className="text-primary-container bg-on-surface px-4 py-1 inline-block mx-1">PERSONAL TRAINING</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mb-10 scroll-reveal">
            By combining performance coaching, rehabilitation, and lifestyle transformation into one integrated system that delivers lasting results.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center scroll-reveal">
            <a href="#contact" className="bg-primary-container text-on-primary-fixed font-label-caps px-10 py-5 tracking-widest uppercase hover:opacity-90 transition-all shadow-md text-center">
              START YOUR JOURNEY
            </a>
            <a href="#methodology" className="border border-outline text-on-surface font-label-caps px-10 py-5 tracking-widest uppercase hover:bg-on-surface/5 transition-all text-center">
              VIEW METHODOLOGY
            </a>
          </div>
        </div>
       </div>
    </section>
  );
}
