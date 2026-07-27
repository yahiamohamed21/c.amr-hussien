import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-container-low -skew-x-12 translate-x-20 opacity-50 z-0"></div>

      <div className="editorial-grid relative z-10 items-center">

        {/* Left Side: Typography & Content */}
        <div className="col-span-12 lg:col-span-5 relative mb-16 lg:mb-0">
          <div className="scroll-reveal" style={{ transitionDelay: '100ms' }}>
            <span className="font-label-caps text-label-caps text-primary uppercase mb-4 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-primary"></span>
              About the Coach
            </span>

            <h2 className="font-display-xl text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tight uppercase mb-8 text-on-surface">
              MORE THAN <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface-variant">FITNESS</span>
            </h2>

            <div className="space-y-6 text-on-surface-variant">
              <p className="font-body-md text-lg md:text-xl leading-relaxed text-on-surface">
                Amr Hussien is not just a personal trainer; he is a performance architect. With a foundation built on scientific rigor and years of practical application, Amr specializes in transforming human potential into tangible results.
              </p>
              <p className="font-body-md text-base md:text-lg leading-relaxed">
                His philosophy is simple: performance changes your life. When you master your body, you master your environment. It&apos;s about building resilience, power, and an unbreakable mindset.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["Scientific Approach", "Customized Programming", "Mindset Coaching", "Nutritional Guidance"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="font-label-caps text-sm tracking-widest uppercase text-on-surface-variant">{item}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Side: Image Composition */}
        <div className="col-span-12 lg:col-span-6 lg:col-start-7 relative">
          <div className="relative w-full max-w-[500px] mx-auto lg:mx-0 lg:ml-auto pr-8 pb-8 scroll-reveal">
            {/* The main image */}
            <div className="aspect-[3/4] relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/5">
              <Image
                fill
                className="object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                alt="Coach Amr Portrait"
                src="/c_amr.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50"></div>
            </div>

            {/* Decorative Offset Box */}
            <div className="absolute top-8 right-0 bottom-0 left-8 border-2 border-primary-container rounded-2xl z-0 hidden md:block opacity-50"></div>

            {/* Floating Glass Badge (Moved to bottom left so it doesn't cover face) */}
            <div className="absolute -bottom-4 left-2 md:-left-6 bg-background/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl z-20 flex items-center gap-4 scroll-reveal" style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 bg-primary-container text-on-primary-fixed rounded-full flex items-center justify-center shrink-0">
                <span className="font-display text-xl">10+</span>
              </div>
              <div className="whitespace-nowrap">
                <p className="font-label-caps text-[10px] md:text-xs tracking-widest text-on-surface-variant uppercase">Years of</p>
                <p className="font-bold text-sm md:text-base text-on-surface">Experience</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
