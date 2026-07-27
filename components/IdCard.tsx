"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function IdCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Framer Motion physics values for dragging
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring configuration for bouncy return
  const springConfig = { damping: 12, stiffness: 150, mass: 1.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Tie the lanyard's sway to the horizontal drag position (x)
  const sway = useTransform(springX, [-300, 300], [-30, 30]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reducedMotion) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((mouseY - centerY) / centerY) * -12;
    const rotateY = ((mouseX - centerX) / centerX) * 12;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (mouseX / rect.width) * 100, y: (mouseY / rect.height) * 100 });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  // On reduced motion, disable the physics sway. Otherwise use the spring sway + mouse sway.
  const lanyardRotation = reducedMotion ? 0 : sway;

  return (
    <div className="relative flex flex-col items-center justify-start h-full pt-[140px]">
      {/* Draggable Assembly Wrapper */}
      <motion.div
        className="relative flex flex-col items-center w-full cursor-grab active:cursor-grabbing z-10"
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.6}
        style={{ x, y, rotate: lanyardRotation, transformOrigin: "center center" }}
        whileDrag={{ scale: 1.05 }}
      >
        {/* Lanyard assembly — ribbon, clip and strap move as one connected unit */}
        <div
          className="absolute bottom-[calc(100%-142px)] flex flex-col items-center justify-end z-0 pointer-events-none"
          style={{ height: '150vh' }}
        >
          {/* Woven ribbon */}
          <div
            className="relative w-7 h-full shadow-lg overflow-hidden shrink"
            style={{
              borderRadius: "3px 3px 2px 2px",
              background:
                "repeating-linear-gradient(115deg, #14100c 0px, #14100c 6px, #201a12 6px, #201a12 12px), linear-gradient(90deg, #0a0806 0%, #221b12 12%, #2c2213 50%, #221b12 88%, #0a0806 100%)",
            }}
          >
            {/* Edge stitching */}
            <div className="absolute left-[3px] top-0 bottom-0 w-px bg-white/15" />
            <div className="absolute right-[3px] top-0 bottom-0 w-px bg-white/15" />
            {/* Sewn brand tag */}
            <div className="absolute left-1/2 bottom-8 -translate-x-1/2 bg-primary-container/90 px-1.5 py-2 rounded-sm shadow-sm">
              <span className="block text-on-primary-fixed text-[6.5px] font-label-caps leading-[1.3] tracking-[0.15em] [writing-mode:vertical-rl]">
                ELITE COACH
              </span>
            </div>
          </div>

          {/* Swivel ring */}
          <div className="w-3.5 h-3.5 rounded-full border-[2.5px] border-gray-300/90 shadow-md -mt-px z-10 bg-[#1a1c1c] shrink-0" />

          {/* Bulldog badge clip */}
          <div
            className="relative w-9 h-7 -mt-1 z-10 shadow-xl shrink-0"
            style={{
              clipPath: "polygon(18% 0%, 82% 0%, 100% 100%, 0% 100%)",
              background:
                "linear-gradient(180deg, #f4f4f4 0%, #cfcfcf 35%, #9a9a9a 65%, #b8b8b8 100%)",
            }}
          >
            <div className="absolute left-1/2 top-1.5 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gray-500/70 shadow-inner" />
            <div className="absolute left-1/2 bottom-1.5 -translate-x-1/2 w-5 h-px bg-gray-600/40" />
          </div>

          {/* Short strap linking clip to the card's grommet */}
          <div
            className="w-2 h-3 -mt-px z-10 shrink-0"
            style={{
              background:
                "linear-gradient(180deg, #201a12, #2c2213)",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Metal grommet — physically anchors the strap to the card */}
        <div className="relative z-20 -mb-2.5 w-4 h-4 rounded-full border-2 border-gray-300 bg-gradient-to-b from-gray-100 to-gray-400 shadow-md flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]" />
        </div>

        {/* 3D Perspective Container */}
        <div
          className="perspective-[1500px] z-10"
          style={{
            animation: reducedMotion ? "none" : "floating 6s ease-in-out infinite",
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {/* The Card */}
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative w-[300px] h-[450px] bg-gradient-to-br from-[#1a1c1c] to-[#0a0a0a] rounded-[2rem] overflow-hidden shadow-2xl border border-white/20 transition-transform duration-300 ease-out"
            style={{
              transform: isHovered
                ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.04, 1.04, 1.04)`
                : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
              transformStyle: "preserve-3d",
              boxShadow: isHovered
                ? `${-rotation.y * 2}px ${rotation.x * 2 + 30}px 50px rgba(184,211,0,0.25)`
                : "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            {/* Fine plastic grain */}
            <div
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              }}
            />

            {/* Holographic security strip — the signature element */}
            <div
              className="absolute -top-10 -right-24 w-64 h-20 rotate-[35deg] pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isHovered ? 0.55 : 0.22,
                mixBlendMode: "color-dodge",
                backgroundImage:
                  "repeating-linear-gradient(100deg, #ff6b6b 0%, #ffd93d 12%, #6bffb8 24%, #6bd4ff 36%, #b86bff 48%, #ff6b6b 60%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: `${50 + rotation.y * 3}%`,
                filter: "blur(0.4px)",
              }}
            />
            <div
              className="absolute -top-10 -right-24 w-64 h-20 rotate-[35deg] pointer-events-none overflow-hidden opacity-30"
              aria-hidden
            >
              <div className="flex flex-col gap-3 mt-1 whitespace-nowrap">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    className="text-[7px] text-white font-label-caps tracking-[0.4em]"
                  >
                    VERIFIED &middot; VERIFIED &middot; VERIFIED &middot; VERIFIED
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic glare, follows cursor */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.35), rgba(255,255,255,0) 45%)`,
              }}
            />

 
            {/* ID meta, top right */}
            <div
              className="absolute top-6 right-6 z-20 text-right transition-transform duration-300"
              style={{ transform: isHovered ? "translateZ(30px)" : "translateZ(0)" }}
            >
              <span className="block text-white/50 text-[8px] font-label-caps tracking-[0.15em]">
                NO. 0417
              </span>
              <span className="block text-white/50 text-[8px] font-label-caps tracking-[0.15em]">
                EST. 2021
              </span>
            </div>

            {/* Portrait Image */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <img
                src="/c_amr.png"
                alt="Amr Hussien"
                className="w-full h-full object-cover object-bottom transition-all duration-700 ease-out"
                style={{
                  filter: isHovered
                    ? "grayscale(0) contrast(1.1) brightness(1.1) drop-shadow(0 0 20px rgba(0,0,0,0.5))"
                    : "grayscale(1) contrast(1.2) brightness(0.9)",
                }}
              />
              {/* Bottom fade so the nameplate always reads clean */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Bottom Right Decoration */}
            <div
              className="absolute bottom-0 right-0 w-36 h-36 z-0 pointer-events-none overflow-hidden rounded-br-[2rem] transition-transform duration-500"
              style={{ transform: isHovered ? "translateZ(20px)" : "translateZ(0)" }}
            >
              <div
                className="absolute bottom-0 right-0 w-full h-28 bg-primary-container/90 backdrop-blur-md rounded-tl-[70px] transition-transform duration-500 ease-out"
                style={{ transform: isHovered ? "scale(1.1) translate(-5px, -5px)" : "scale(1)" }}
              />
              <div className="absolute bottom-5 right-5 text-on-primary-container">
                <svg
                  className="w-10 h-10 fill-current transition-all duration-300"
                  viewBox="0 0 24 24"
                  style={{
                    transform: isHovered
                      ? `rotate(${rotation.x * 5 + rotation.y * 5}deg)`
                      : "rotate(0deg)",
                  }}
                >
                  <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
              </div>
            </div>

            {/* Name Plate */}
            <div
              className="absolute bottom-8 left-6 z-20 bg-white/95 backdrop-blur-xl rounded-2xl p-5 shadow-2xl w-[75%] border border-white/40 transition-transform duration-300 ease-out"
              style={{
                transform: isHovered ? "translateZ(50px) translateY(-10px)" : "translateZ(0) translateY(0)",
              }}
            >
              <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary rounded-full shadow-lg border-2 border-white/20 animate-pulse" />
              <h3 className="text-black font-display text-3xl uppercase leading-none mb-2 tracking-tight">
                AMR HUSSIEN
              </h3>
              <div className="bg-black text-white text-[11px] font-label-caps uppercase px-4 py-2 rounded-full inline-flex items-center gap-2 tracking-widest shadow-inner">
                <span className="w-1.5 h-1.5 bg-primary-container rounded-full" />
                PERFORMANCE COACH
              </div>

              {/* Barcode strip, reads as authentic ID stock */}
              <div className="mt-3 flex items-end gap-[1.5px] h-5 opacity-70" aria-hidden>
                {[2, 1, 3, 1, 1, 2, 1, 4, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 4, 1, 1, 2].map((w, i) => (
                  <span
                    key={i}
                    className="bg-black"
                    style={{ width: `${w}px`, height: i % 5 === 0 ? "100%" : "70%" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse { animation: none !important; }
        }
      `,
        }}
      />
    </div>
  );
}