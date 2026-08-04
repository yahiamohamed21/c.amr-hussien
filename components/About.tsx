"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const { data: about, isLoading } = useQuery({
    queryKey: ["public-about"],
    queryFn: async () => {
      const res = await api.get("/api/v1/public/about");
      return res.data;
    },
    retry: 1,
  });

  const displayEyebrow = about?.eyebrow || "About the Coach";
  const displayTitle = about?.title || "MORE THAN FITNESS";
  const displayWatermark = about?.watermarkText || "PERFORMANCE";
  const displayDescription = about?.body || `Fitness changes your body.
Performance changes your life.

Amr Hussien believes that true transformation isn't measured by kilograms lost or muscles gained. It is measured by confidence restored, resilience built, and a body that performs the way it was meant to.

With over a decade of experience in elite coaching, rehabilitation, and performance training, his philosophy combines evidence based science with personalized coaching to create sustainable, measurable results.

Every client follows a journey built around one principle.
Your body should work for you, not against you.`;
  const isVisible = about ? about.isVisible : true;

  if (!isVisible) {
    return null;
  }

  const checkItems = ["Scientific Approach", "Customized Programming", "Mindset Coaching", "Nutritional Guidance"];

  return (
    <section id="about" className="py-24 px-margin-mobile md:px-margin-desktop   relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-[1300px] mx-auto   p-8 md:p-16 lg:p-20 relative overflow-hidden ">
        
        {/* Glow Accent Line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px]  from-transparent via-primary/30 to-transparent"></div>

        {/* Diagonal Light Beam */}
        <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[50%]   from-primary/10 to-transparent blur-[60px] pointer-events-none transform rotate-12"></div>

        {/* Background Watermark Text */}
        {displayWatermark && (
          <div className="absolute bottom-6 right-6 pointer-events-none opacity-[0.02] select-none z-0 hidden lg:block">
            <h2 className="font-display font-black text-8xl uppercase tracking-widest">{displayWatermark}</h2>
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Side: Typography & Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              {displayEyebrow && (
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold tracking-wider text-primary uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  {displayEyebrow}
                </span>
              )}

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter text-on-surface leading-[0.9]">
                {displayTitle}
              </h2>
            </div>

            <div className="w-16 h-[2px] bg-primary"></div>

            <div className="space-y-6 text-on-surface-variant font-body-md text-base md:text-lg leading-relaxed">
              <p className="whitespace-pre-line">
                {displayDescription}
              </p>
            </div>

            {/* Checklist Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {checkItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5 bg-surface/50 border border-white/5 rounded-xl hover:border-primary/20 hover:bg-surface transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-label-caps text-xs tracking-wider uppercase text-on-surface-variant font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Image Composition */}
          <div className="lg:col-span-6 flex flex-col gap-6 items-center justify-center scroll-reveal">
            
            {/* Image 1 */}
            <div className="relative w-full max-w-[320px] aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
              <img
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                alt="Coach Amr 1"
                src={about?.image1Id ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${about.image1Id}` : "/image-1.jpeg"}
              />
            </div>
            
            {/* Image 2 */}
            <div className="relative w-full max-w-[320px] aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
              <img
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                alt="Coach Amr 2"
                src={about?.image2Id ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${about.image2Id}` : "/image-2.jpeg"}
              />
            </div>

            {/* Image 3 */}
            <div className="relative w-full max-w-[320px] aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-white/10 group">
              <img
                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                alt="Coach Amr 3"
                src={about?.image3Id ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${about.image3Id}` : "/image-4.jpeg"}
              />
            </div>
            
          </div>

        </div>
      </div>
    </section>
  );
}
