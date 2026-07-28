"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ShieldAlert, Activity, RefreshCw } from "lucide-react";

export function InjuryExpert() {
  const [data, setData] = useState<any>(null);

  const points = [
    {
      icon: <Activity className="w-6 h-6 text-primary" />,
      titleEn: "Biomechanical Assessment",
      desc: "Analyzing movement patterns to identify root causes of pain and dysfunction.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-primary" />,
      titleEn: "Injury Prevention",
      desc: "Targeting weak links and imbalances to shield your body against future injuries.",
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-primary" />,
      titleEn: "Rehab Protocols",
      desc: "Scientific strength-based rehabilitation that restores full functionality.",
    },
  ];

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/injury-rehab`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((resData) => {
        setData(resData);
      })
      .catch(() => {
        // Fallback data if API is not populated or fails
        setData({
          eyebrow: "Injury Rehabilitation Specialist",
          title: "REBUILD WITHOUT LIMITS",
          body: "Whether you are dealing with chronic pain, recovering from an athletic injury, or seeking to build a resilient body that resists future setbacks, we design customized, science-backed rehabilitation protocols to get you back to peak performance.",
          bodySecondary: "Amr Hussien specializes in bridging the gap between rehabilitation and high-level performance. Through customized corrective exercise programs and detailed biomechanical analysis, we target the source of the issue rather than just masking symptoms.",
          image1Id: null,
          image2Id: null,
        });
      });
  }, []);

  if (!data) return null;

  const img1Url = data.image1Id 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${data.image1Id}` 
    : "/amr.jpeg";
  const img2Url = data.image2Id 
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/public/media/${data.image2Id}` 
    : "/amr-2.jpeg";

  return (
    <section id="injury-rehab" className="py-24 px-margin-mobile md:px-margin-desktop bg-surface relative overflow-hidden">
      {/* Background Accent Blur */}
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Content */}
          <div className="lg:col-span-6">
            <div>
              {data.eyebrow && (
                <span className="font-label-caps text-label-caps text-primary uppercase mb-4 flex items-center gap-4">
                  <span className="w-8 h-[2px] bg-primary"></span>
                  {data.eyebrow}
                </span>
              )}

              <h2 className="font-display-xl text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] tracking-tight uppercase mb-6 text-on-surface">
                {data.title.split(" ").slice(0, -2).join(" ")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-on-surface to-on-surface-variant">
                  {data.title.split(" ").slice(-2).join(" ")}
                </span>
              </h2>

              <div className="space-y-6 text-on-surface-variant mb-10">
                <p className="font-body-md text-base md:text-lg leading-relaxed text-on-surface">
                  {data.body}
                </p>
                {data.bodySecondary && (
                  <p className="font-body-md text-sm md:text-base leading-relaxed opacity-85">
                    {data.bodySecondary}
                  </p>
                )}
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                {points.map((pt, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-low border border-white/5 flex items-center justify-center">
                      {pt.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-on-surface text-sm mb-1">{pt.titleEn}</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed opacity-75">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Side: Images Grid */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              
              {/* Image 1 */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl mt-8 lg:mt-0">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Injury Rehabilitation - Amr 1"
                  src={img1Url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-45"></div>
              </div>

              {/* Image 2 */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 group shadow-2xl mt-16 lg:mt-12">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt="Injury Rehabilitation - Amr 2"
                  src={img2Url}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-45"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
