"use client";

import { useState } from "react";

export function Contact() {
  const [goal, setGoal] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const goals = [
    { value: "strength", label: "Strength & Muscle" },
    { value: "fat-loss", label: "Fat Loss Transformation" },
    { value: "athletic", label: "Athletic Performance" },
    { value: "rehab", label: "Injury Rehabilitation" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted. We will review your biometrics and goals and contact you via WhatsApp.");
  };

  return (
    <section className="py-32 px-margin-mobile md:px-margin-desktop bg-surface relative border-t border-white/5 overflow-hidden" id="contact">
      
      {/* Background massive text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.03] select-none z-0">
        <h2 className="font-display font-black text-[clamp(5rem,20vw,25rem)] leading-none uppercase">APPLY</h2>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-primary"></span>
            <span className="font-label-caps text-xs text-primary uppercase tracking-[0.4em]">
              The Final Step
            </span>
          </div>
          
          <h2 className="font-display-xl text-[clamp(4rem,8vw,6rem)] leading-[0.85] uppercase tracking-tighter text-on-surface mb-8">
            READY TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container relative">
              EVOLVE?
              <span className="absolute inset-0 bg-primary/20 blur-[50px] -z-10"></span>
            </span>
          </h2>
          
          <div className="border-l-2 border-primary/30 pl-6 space-y-4">
            <p className="font-body-md text-on-surface-variant text-lg leading-relaxed">
              Applications for the Elite Performance Program are strictly reviewed. We only work with those who are <strong className="text-on-surface">relentless</strong> about their goals.
            </p>
            <p className="font-label-caps text-xs tracking-widest text-primary uppercase">
              Limited spots available.
            </p>
          </div>
        </div>

        {/* Right Column: Brutalist Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="bg-surface-container border border-black/10 dark:border-white/10 p-8 md:p-12 shadow-2xl relative">
            
            {/* Form Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mb-10">
              <div className="relative group">
                <input className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 text-on-surface py-4 text-lg focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="Full Name" id="name" type="text" required />
                <label htmlFor="name" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-focus:tracking-widest uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-on-surface-variant font-label-caps">Full Name</label>
              </div>
              <div className="relative group">
                <input className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 text-on-surface py-4 text-lg focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="Email" id="email" type="email" required />
                <label htmlFor="email" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-focus:tracking-widest uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-on-surface-variant font-label-caps">Email Address</label>
              </div>
              <div className="relative group">
                <input className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 text-on-surface py-4 text-lg focus:outline-none focus:border-primary transition-colors peer placeholder-transparent" placeholder="WhatsApp" id="whatsapp" type="tel" required />
                <label htmlFor="whatsapp" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-focus:tracking-widest uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-on-surface-variant font-label-caps">WhatsApp Number</label>
              </div>
              
              {/* Custom Dropdown */}
              <div className="relative group">
                <div 
                  className={`w-full bg-transparent border-b-2 ${goal || isDropdownOpen ? 'border-primary' : 'border-black/10 dark:border-white/10'} text-on-surface py-4 text-lg cursor-pointer flex justify-between items-center transition-colors relative z-20`}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className={goal ? "text-on-surface" : "text-transparent select-none"}>
                    {goal ? goals.find(g => g.value === goal)?.label : "Placeholder"}
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-300 text-on-surface-variant ${isDropdownOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </div>
                
                <label className={`absolute left-0 transition-all pointer-events-none uppercase tracking-widest font-label-caps z-20 ${goal || isDropdownOpen ? '-top-6 text-xs text-primary' : 'top-4 text-lg text-on-surface-variant'}`}>
                  Primary Goal
                </label>

                {/* Invisible backdrop to close dropdown when clicking outside */}
                {isDropdownOpen && (
                  <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                )}

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 w-full bg-surface-container-highest border border-black/10 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 transition-all duration-300 origin-top overflow-hidden ${isDropdownOpen ? 'opacity-100 scale-y-100 mt-2' : 'opacity-0 scale-y-0 mt-0 pointer-events-none'}`}>
                  {goals.map(g => (
                    <div 
                      key={g.value} 
                      className={`px-6 py-4 cursor-pointer transition-colors text-base md:text-lg ${goal === g.value ? 'bg-primary/20 text-primary' : 'text-on-surface hover:bg-primary hover:text-black'}`}
                      onClick={() => {
                        setGoal(g.value);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {g.label}
                    </div>
                  ))}
                </div>
                {/* Hidden input for form validation */}
                <input type="hidden" name="goal" value={goal} required />
              </div>
            </div>

            <div className="relative group mb-12">
              <textarea className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 text-on-surface py-4 text-lg focus:outline-none focus:border-primary transition-colors peer placeholder-transparent resize-none" placeholder="Injuries" id="injuries" rows={3} required></textarea>
              <label htmlFor="injuries" className="absolute left-0 top-4 text-on-surface-variant text-lg transition-all peer-focus:-top-6 peer-focus:text-xs peer-focus:text-primary peer-focus:tracking-widest uppercase peer-valid:-top-6 peer-valid:text-xs peer-valid:text-on-surface-variant font-label-caps">Current Injuries / Physical State</label>
            </div>

            <button className="group relative w-full bg-primary-container overflow-hidden flex items-center justify-center py-6" type="submit">
              {/* Button Hover Sweep */}
              <div className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></div>
              
              <span className="relative z-10 font-display text-2xl md:text-3xl uppercase tracking-widest text-on-primary-container group-hover:text-black transition-colors duration-500 flex items-center gap-4">
                Submit Application
                <span className="material-symbols-outlined transform group-hover:translate-x-2 transition-transform duration-300">arrow_forward</span>
              </span>
            </button>
            
          </form>
        </div>

      </div>
    </section>
  );
}
