"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/index";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Mission() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Reveal text lines on the left
        gsap.fromTo(".mission-reveal-text",
            { y: 100, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                }
            }
        );

        // Scrub fade up each card on the right
        const cards = gsap.utils.toArray('.mission-card');
        cards.forEach((card: any, i) => {
            gsap.fromTo(card,
                { y: 100, opacity: 0.3, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
                        end: "top 70%",
                        scrub: 1,
                    }
                }
            );
        });

    }, { scope: containerRef });

    return (
        <section id="mission" ref={containerRef} className="relative bg-[#F2F0E9] dark:bg-[#10110F] transition-colors duration-500 border-t border-[#10110F]/5 dark:border-white/5">

            <div className="max-w-[1600px] mx-auto w-full flex flex-col lg:flex-row relative">

                {/* Left Side: Sticky Content */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-[100dvh] flex flex-col justify-center p-8 md:p-16 lg:px-24 overflow-hidden z-10">

                    {/* Background watermark */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none">
                        <h2 className="font-display text-[25vw] lg:text-[15vw] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:2px_#10110F] dark:[-webkit-text-stroke:2px_#C7FF00] -rotate-90 origin-left translate-x-[20%]">
                            MISSION
                        </h2>
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-4 mb-8 overflow-hidden">
                            <span className="w-12 h-[2px] bg-[#10110F] dark:bg-[#C7FF00] mission-reveal-text"></span>
                            <span className="font-label-caps text-sm md:text-base tracking-[0.4em] uppercase text-[#10110F]/60 dark:text-[#C7FF00] mission-reveal-text">
                                The Objective
                            </span>
                        </div>

                        <div className="overflow-hidden mb-2">
                            <h2 className="font-display text-5xl sm:text-6xl md:text-[80px] lg:text-[90px] uppercase leading-[0.9] text-[#10110F] dark:text-white mission-reveal-text">
                                To Redefine
                            </h2>
                        </div>
                        <div className="overflow-hidden mb-12">
                            <h2 className="font-display text-5xl sm:text-6xl md:text-[80px] lg:text-[90px] uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-[#10110F] to-[#10110F]/50 dark:from-[#C7FF00] dark:to-[#C7FF00]/60 mission-reveal-text pb-4">
                                Personal Training
                            </h2>
                        </div>

                        <div className="overflow-hidden flex flex-col sm:flex-row gap-4">
                            <div className="mission-reveal-text w-full sm:w-auto">
                                <Button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full bg-[#10110F] text-white hover:bg-[#10110F]/90 dark:bg-[#C7FF00] dark:text-[#10110F] dark:hover:bg-[#C7FF00]/90 text-sm md:text-base py-6 px-10 rounded-xl font-bold"
                                >
                                    Start Your Journey
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Scrolling Cards */}
                <div className="w-full lg:w-1/2 py-10 lg:py-40 px-6 md:px-16 flex flex-col gap-8 lg:gap-24 relative z-20">

                    {/* Card 1 */}
                    <div className="mission-card w-full h-[320px] sm:h-[350px] relative rounded-[2rem] overflow-hidden group border border-[#10110F]/10 dark:border-white/10 shadow-2xl">
                        <div className="absolute inset-0 z-0 bg-[#10110F] overflow-hidden">
                            {/* Abstract Performance Glow */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C7FF00]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 group-hover:bg-[#C7FF00]/20 transition-colors duration-700"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C7FF00]/5 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 group-hover:scale-150 transition-transform duration-1000"></div>

                            {/* Diagonal speed lines pattern */}
                            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700"
                                style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 11px)' }}>
                            </div>
                        </div>
                        <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#C7FF00] flex justify-center items-center mb-6">
                                <span className="font-display text-xl md:text-2xl text-[#10110F]">01</span>
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl text-white uppercase mb-4">Elite Performance</h3>
                            <p className="font-sans text-base md:text-lg text-white/80 max-w-md font-medium">
                                Pushing the boundaries of human potential through science-backed, high-intensity performance coaching.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="mission-card w-full h-[320px] sm:h-[350px] relative rounded-[2rem] overflow-hidden bg-[#10110F] group border border-[#10110F]/10 dark:border-white/10 shadow-2xl">
                        <div className="absolute inset-0 z-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40">
                            {/* Technical grid background */}
                            <div className="w-full h-full" style={{ backgroundImage: "linear-gradient(to right, rgba(199,255,0,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(199,255,0,0.2) 1px, transparent 1px)", backgroundSize: "40px 40px" }}></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-[#10110F] via-transparent to-[#10110F]"></div>
                        </div>
                        <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-[#C7FF00] flex justify-center items-center mb-6">
                                <span className="font-display text-xl md:text-2xl text-[#C7FF00]">02</span>
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl text-white uppercase mb-4">Biomechanical Rehab</h3>
                            <p className="font-sans text-base md:text-lg text-white/80 max-w-md font-medium">
                                Identifying imbalances, correcting posture, and bulletproofing the body to prevent injury and move pain-free.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="mission-card w-full h-[320px] sm:h-[350px] relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#C7FF00] to-[#9acc00] group shadow-2xl border border-transparent">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/30 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                        </div>
                        <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-end">
                            <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#10110F] flex justify-center items-center mb-6">
                                <span className="font-display text-xl md:text-2xl text-[#C7FF00]">03</span>
                            </div>
                            <h3 className="font-display text-3xl md:text-4xl text-[#10110F] uppercase mb-4">Lifestyle Transformation</h3>
                            <p className="font-sans text-base md:text-lg text-[#10110F]/80 max-w-md font-bold">
                                Creating sustainable, integrated systems that deliver lasting results far beyond the gym floor.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
