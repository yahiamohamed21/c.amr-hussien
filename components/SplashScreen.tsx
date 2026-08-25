"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = [
  { at: 0, label: "PREPARING SESSION" },
  { at: 30, label: "LOADING PROGRAM" },
  { at: 65, label: "RACKING WEIGHTS" },
  { at: 92, label: "READY" },
];

function getStage(progress: number) {
  let current = STAGES[0].label;
  for (const s of STAGES) if (progress >= s.at) current = s.label;
  return current;
}

function NameLine({
  text,
  fill,
  reducedMotion,
}: {
  text: string;
  fill: number;
  reducedMotion: boolean;
}) {
  const showEdge = !reducedMotion && fill > 0 && fill < 100;
  return (
    <div className="relative inline-block" aria-hidden="true">
      {/* Ghost outline — establishes the full word instantly */}
      <span
        className="block font-display font-bold uppercase leading-[0.86] tracking-tight text-transparent select-none splash-ghost-text"
        style={{
          fontSize: "clamp(2.75rem, 11vw, 5.25rem)",
        }}
      >
        {text}
      </span>
      {/* Solid fill, revealed left-to-right as this word "loads" */}
      <span
        className="absolute inset-0 block font-display font-bold uppercase leading-[0.86] tracking-tight text-[#10110F] dark:text-white select-none overflow-hidden"
        style={{
          fontSize: "clamp(2.75rem, 11vw, 5.25rem)",
          clipPath: `inset(0 ${100 - fill}% 0 0)`,
          transition: reducedMotion ? "none" : "clip-path 100ms linear",
        }}
      >
        {text}
      </span>
      {/* Loading front — a thin scan edge at the current fill position */}
      {showEdge && (
        <span
          className="absolute top-0 bottom-0 w-[2px]"
          style={{
            left: `${fill}%`,
            transform: "translateX(-1px)",
            background: "rgba(184,211,0,0.9)",
            boxShadow: "0 0 12px 2px rgba(184,211,0,0.65)",
          }}
        />
      )}
    </div>
  );
}

export function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const progressRef = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    let finished = false;

    // Eases up to 92% on its own so the reveal feels alive, then snaps
    // to 100% once the page has actually finished loading.
    const tick = () => {
      const target = 92;
      progressRef.current += (target - progressRef.current) * 0.025 + 0.12;
      if (progressRef.current > target) progressRef.current = target;
      setProgress(progressRef.current);
      if (!finished) rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    const finish = () => {
      if (finished) return;
      finished = true;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      progressRef.current = 100;
      setProgress(100);
      setTimeout(() => setIsExiting(true), 260);
      setTimeout(() => setIsLoading(false), 260 + 700);
    };

    const handleLoad = () => setTimeout(finish, 280);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      finished = true;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  const fillFirst = Math.min(progress * 2, 100);
  const fillSecond = Math.max(Math.min((progress - 50) * 2, 100), 0);
  const curtainDuration = reducedMotion ? "500ms" : "700ms";

  const grainStyle: React.CSSProperties = {
    backgroundAttachment: "fixed",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Screen-reader status — the visual reveal is decorative */}
      <h1 className="sr-only" role="status" aria-live="polite">
        Amr Hussien, Performance Coach — loading {Math.round(progress)}%
      </h1>

      {/* Curtain panels: the exit is a split reveal, not a plain fade */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-[#F2F0E9] dark:bg-[#0a0a0a] overflow-hidden transition-transform ease-[cubic-bezier(.76,0,.24,1)]"
        style={{
          transform: isExiting ? "translateX(-100%)" : "translateX(0)",
          transitionDuration: curtainDuration,
        }}
      >
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={grainStyle} />
      </div>
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-[#F2F0E9] dark:bg-[#0a0a0a] overflow-hidden transition-transform ease-[cubic-bezier(.76,0,.24,1)]"
        style={{
          transform: isExiting ? "translateX(100%)" : "translateX(0)",
          transitionDuration: curtainDuration,
        }}
      >
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={grainStyle} />
      </div>

      {/* Ambient glow, independent of the curtain split */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] rounded-full bg-primary-container/10 blur-[100px] pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isExiting ? 0 : 1,
          animation: reducedMotion ? "none" : "breathe 3.4s ease-in-out infinite",
        }}
      />

      {/* Content */}
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 transition-all duration-500 ease-out ${isExiting ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"
          }`}
      >
        <span
          className="text-[#10110F]/50 dark:text-white/40 text-[10px] font-label-caps tracking-[0.3em]"
          style={{ animation: reducedMotion ? "none" : "fadeUp 600ms ease-out both" }}
          aria-hidden="true"
        >
          PERFORMANCE COACH
        </span>

        <div
          className="flex flex-col items-center gap-1"
          style={{ animation: reducedMotion ? "none" : "fadeUp 700ms ease-out 100ms both" }}
        >
          <NameLine text="AMR" fill={fillFirst} reducedMotion={reducedMotion} />
          <NameLine text="HUSSIEN" fill={fillSecond} reducedMotion={reducedMotion} />
        </div>

        <div
          className="flex items-center gap-2 text-[#10110F]/40 dark:text-white/30"
          style={{ animation: reducedMotion ? "none" : "fadeUp 700ms ease-out 200ms both" }}
          aria-hidden="true"
        >
          <span className="text-[10px] font-label-caps tracking-[0.2em]">{getStage(progress)}</span>
          <span className="w-1 h-1 rounded-full bg-[#10110F]/30 dark:bg-white/20" />
          <span className="text-[10px] font-label-caps [font-variant-numeric:tabular-nums]">
            {String(Math.round(progress)).padStart(2, "0")}%
          </span>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .splash-ghost-text {
          -webkit-text-stroke: 1.5px rgba(16, 17, 15, 0.16);
        }
        :global(.dark) .splash-ghost-text, .dark .splash-ghost-text {
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.16);
        }
        @keyframes breathe {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `,
        }}
      />
    </div>
  );
}