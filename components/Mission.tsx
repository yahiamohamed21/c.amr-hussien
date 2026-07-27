import { IdCard } from "./IdCard";

export function Mission() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-background py-24 border-t border-on-surface/5">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 px-margin-mobile max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className="order-2 lg:order-1 lg:col-span-7 lg:text-left text-center">
          <span className="font-label-caps text-label-caps text-primary tracking-[0.3em] uppercase block mb-6 scroll-reveal">
            Human Performance Lab
          </span>
          <h2 className="font-display-xl text-[56px] md:text-[80px] uppercase leading-[1.1] md:leading-none mb-8 scroll-reveal text-on-surface">
            BUILD THE <span className="text-primary-container bg-on-surface px-4 py-1 inline-block mx-1">STRONGEST</span> VERSION OF YOURSELF
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto lg:mx-0 mb-10 scroll-reveal">
            Through science, discipline, and a system built around you. Elite performance coaching for those who refuse to settle.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center lg:justify-start scroll-reveal">
            <a href="#contact" className="bg-primary-container text-on-primary-fixed font-label-caps px-10 py-5 tracking-widest uppercase hover:opacity-90 transition-all shadow-md text-center">
              START YOUR JOURNEY
            </a>
            <a href="#methodology" className="border border-outline text-on-surface font-label-caps px-10 py-5 tracking-widest uppercase hover:bg-on-surface/5 transition-all text-center">
              VIEW METHODOLOGY
            </a>
          </div>
        </div>

        {/* ID Card Graphic */}
        <div className="order-1 lg:order-2 lg:col-span-5 flex justify-center scroll-reveal relative h-[450px] md:h-[550px] lg:h-[600px] w-full lg:mt-0 scale-[0.75] md:scale-90 lg:scale-100 origin-center pointer-events-auto">
          <IdCard />
        </div>
      </div>
    </section>
  );
}
