import { FadeUp } from "@/components/ui/FadeUp";
import { Crosshair, Settings2, RotateCw, ShieldCheck } from "lucide-react";

export function Philosophy() {
  const principles = [
    { title: "Intention", desc: "Every exercise has a reason. Every movement has intention.", align: "items-end text-right", cardAlign: "items-end text-right", icon: Crosshair },
    { title: "Customization", desc: "Every program is built around your goals, not generic templates.", align: "items-start text-left", cardAlign: "items-start text-left", icon: Settings2 },
    { title: "Consistency", desc: "Progress is earned through consistency, not intensity.", align: "items-end text-right", cardAlign: "items-end text-right", icon: RotateCw },
    { title: "Sustainability", desc: "Transformation isn't about doing more. It's about doing what matters.", align: "items-start text-left", cardAlign: "items-start text-left", icon: ShieldCheck }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F2F0E9] dark:bg-[#10110F] py-24 md:py-32 border-t border-[#10110F]/5 dark:border-white/5 transition-colors duration-500">

      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)", backgroundSize: "80px 80px" }}></div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 lg:gap-12 items-center">

        {/* Left: Cinematic Cut-out Image */}
        <FadeUp className="lg:col-span-5 relative group" delay={0}>
          {/* Decorative Crosshairs */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#10110F]/30 dark:border-[#C7FF00]/50 transition-all duration-700 group-hover:-top-6 group-hover:-left-6"></div>
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#10110F]/30 dark:border-[#C7FF00]/50 transition-all duration-700 group-hover:-bottom-6 group-hover:-right-6"></div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl filter contrast-125 transition-all duration-700 flex items-end justify-center @container shadow-2xl">
            <img
              src="./image-3.jpeg"
              alt="Coach Amr"
              className="w-full h-full object-cover scale-105 transition-transform duration-1000 group-hover:scale-100 absolute inset-0 z-0 grayscale opacity-80 group-hover:opacity-100 group-hover:grayscale-0"
            />
            {/* Title Overlay */}
            <div className="absolute top-8 left-8 z-30 pointer-events-none w-full pr-8">
              <h3 className="font-display text-[clamp(7rem,17cqw,8.5rem)] leading-[0.85] uppercase tracking-tight text-white drop-shadow-2xl">
                Train With <br />
                <span className="text-[#C7FF00]">Purpose</span>
              </h3>
            </div>

            {/* Inner Glitch/Scanline effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-20" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 4px)' }}></div>
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none z-10"></div>
          </div>
        </FadeUp>

        {/* Right: Circular Layout */}
        <div className="lg:col-span-7 flex flex-col justify-center relative z-40 min-h-[500px] sm:min-h-[700px] mt-16 lg:mt-0">

          {/* Subtle Ambient Glow for the entire section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[#C7FF00]/10 blur-[150px] rounded-full pointer-events-none z-0"></div>

          {/* Central Core (Philosophy Node) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-30">
            {/* Elegant rotating rings */}
            <div className="absolute inset-[-60px] rounded-full border border-[#10110F]/10 dark:border-white/10 animate-[spin_15s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#10110F] dark:bg-[#C7FF00] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(199,255,0,0.8)]"></div>
            </div>
            <div className="absolute inset-[-90px] rounded-full border border-dashed border-[#10110F]/10 dark:border-white/5 animate-[spin_25s_linear_infinite_reverse]"></div>

            <div className="relative w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-white dark:bg-[#10110F] flex flex-col items-center justify-center border border-[#10110F]/10 dark:border-white/10 group cursor-default shadow-2xl hover:border-[#10110F]/40 dark:hover:border-[#C7FF00]/40 transition-all duration-700 overflow-hidden">
              {/* Inner glowing core */}
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0_300deg,#C7FF00_360deg)] animate-[spin_4s_linear_infinite] opacity-10 dark:opacity-30"></div>
              <div className="absolute inset-1 bg-white dark:bg-[#10110F] rounded-full flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-[#10110F] dark:text-[#C7FF00] mb-2 text-3xl sm:text-4xl transition-transform duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(199,255,0,0.6)]">token</span>
                <span className="font-display text-[#10110F] dark:text-white tracking-[0.3em] text-xs sm:text-sm uppercase z-10 text-center font-bold">Core</span>
              </div>
            </div>
          </div>

          {/* Items Grid (Radial Nodes) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:gap-x-16 gap-y-36 sm:gap-y-48 relative z-20 py-8 sm:py-16">

            {principles.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeUp key={i} delay={0.2 + (i * 0.15)} className={`relative group flex flex-col ${item.align}`}>

                  {/* Connecting subtle line to center */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-[50vw] sm:w-[150%] h-[1px] from-transparent to-[#10110F]/20 dark:to-[#C7FF00]/30 pointer-events-none hidden sm:block ${i % 2 === 0 ? 'bg-gradient-to-r -right-[120%]' : 'bg-gradient-to-l -left-[120%]'}`}>
                    {/* Animated signal on the line */}
                    <div className="absolute top-0 w-10 h-full bg-gradient-to-r from-transparent via-[#10110F] dark:via-[#C7FF00] to-transparent animate-[pulse_3s_ease-in-out_infinite]" style={{ left: i % 2 === 0 ? '50%' : '20%' }}></div>
                  </div>

                  {/* Premium Node Card Design */}
                  <div className={`relative w-full max-w-[320px] bg-white dark:bg-[#10110F] border border-[#10110F]/10 dark:border-white/10 hover:border-[#10110F]/30 dark:hover:border-[#C7FF00]/40 p-6 sm:p-8 rounded-none transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_15px_40px_-10px_rgba(200,255,0,0.15)] flex flex-col justify-center ${item.cardAlign} z-10`}>

                    {/* Hover Glow Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10110F]/5 dark:from-[#C7FF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    {/* Colored Top Accent Line */}
                    <div className={`absolute top-0 ${i % 2 === 0 ? 'right-0' : 'left-0'} w-24 h-[3px] bg-[#10110F]/10 dark:bg-[#C7FF00]/20 group-hover:bg-[#10110F] dark:group-hover:bg-[#C7FF00] group-hover:shadow-[0_0_15px_rgba(199,255,0,0.8)] transition-all duration-500`}></div>

                    <div className={`w-12 h-12 flex items-center justify-center bg-[#10110F]/5 dark:bg-white/[0.03] border border-[#10110F]/10 dark:border-white/10 mb-6 transition-all duration-500 group-hover:bg-[#10110F]/10 dark:group-hover:bg-[#C7FF00]/10 ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                      <Icon className="w-6 h-6 text-[#10110F] dark:text-[#C7FF00]" strokeWidth={1.5} />
                    </div>

                    <h4 className="font-display text-[#10110F] dark:text-white mb-4 text-2xl sm:text-3xl tracking-wide uppercase group-hover:tracking-wider transition-all duration-500">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-[#10110F]/70 dark:text-gray-400 leading-relaxed transition-colors duration-300">
                      {item.desc}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
