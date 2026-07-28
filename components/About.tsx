"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

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
  const displayDescription = about?.body || `Amr Hussien is not just a personal trainer; he is a performance architect. With a foundation built on scientific rigor and years of practical application, Amr specializes in transforming human potential into tangible results.

His philosophy is simple: performance changes your life. When you master your body, you master your environment. It's about building resilience, power, and an unbreakable mindset.`;
  const isVisible = about ? about.isVisible : true;

  if (!isVisible) {
    return null;
  }

  const checkItems = ["Scientific Approach", "Customized Programming", "Mindset Coaching", "Nutritional Guidance"];

  return (
    <section id="about" className="py-24 px-margin-mobile md:px-margin-desktop bg-background relative overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-primary-container/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-[1300px] mx-auto bg-surface-container border border-white/5 rounded-3xl p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl">
        
        {/* Glow Accent Line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

        {/* Diagonal Light Beam */}
        <div className="absolute -top-[10%] -left-[10%] w-[30%] h-[50%] bg-gradient-to-br from-primary/10 to-transparent blur-[60px] pointer-events-none transform rotate-12"></div>

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
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-[4/5] scroll-reveal">
              
              {/* Premium Offset Decorative Frame */}
              <div className="absolute -inset-4 border border-primary/20 rounded-2xl z-0 pointer-events-none transform translate-x-2 translate-y-2 hidden md:block"></div>

              {about?.imageId ? (
                <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-black/40">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${about.imageId}`}
                    className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-750 scale-100 hover:scale-105"
                    alt={displayTitle}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                </div>
              ) : (
                /* Premium Overlapping Collage */
                <div className="relative w-full h-full">
                  {/* Main Large Image (Left) */}
                  <div className="absolute top-0 left-0 w-[72%] h-[88%] rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10 group">
                    <Image
                      fill
                      className="object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700 hover:scale-102"
                      alt="Coach Amr 1"
                      src="/image-1.jpeg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Top Right Small Image */}
                  <div className="absolute top-[4%] right-0 w-[46%] h-[42%] rounded-2xl overflow-hidden shadow-2xl border-4 border-surface-container z-20 group">
                    <Image
                      fill
                      className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      alt="Coach Amr 2"
                      src="/image-2.jpeg"
                    />
                  </div>

                  {/* Bottom Right Small Image */}
                  <div className="absolute bottom-[4%] right-[4%] w-[52%] h-[48%] rounded-2xl overflow-hidden shadow-2xl border-4 border-surface-container z-30 group">
                    <Image
                      fill
                      className="object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      alt="Coach Amr 3"
                      src="/image-3.jpeg"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
