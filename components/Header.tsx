"use client";

import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Philosophy", href: "#about" },
    { label: "Method", href: "#methodology" },
    { label: "Services", href: "#services" },
    { label: "Results", href: "#transformations" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-white/5 flex justify-between items-center px-3 sm:px-6 md:px-margin-desktop py-3 sm:py-4 md:py-6 transition-all">
      
      {/* Premium Logo */}
      <a href="#" className="group flex flex-col items-center justify-center select-none relative z-50">
        <div className="flex items-baseline gap-2 leading-none">
          <span className="font-extrabold text-2xl sm:text-4xl tracking-[0.05em] text-on-surface" style={{ fontFamily: 'Impact, sans-serif', transform: 'scaleX(1.2)', transformOrigin: 'left' }}>AMR</span>
          <span className="font-light text-2xl sm:text-4xl tracking-tight text-on-surface" style={{ marginLeft: '12px' }}>HUSSIEN</span>
        </div>
        <div className="flex flex-col items-center mt-2 w-full">
          <span className="font-bold text-[7px] sm:text-[9px] tracking-[0.4em] sm:tracking-[0.6em] text-on-surface uppercase text-center w-full">
            Human Performance Lab
          </span>
          <div className="w-12 h-[2px] bg-primary mt-1.5 transition-all duration-300 group-hover:w-24"></div>
        </div>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8 items-center">
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            className="font-label-caps text-xs uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors relative group"
            href={link.href}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
        <div className="w-px h-4 bg-outline-variant/30 mx-2"></div>
        <ThemeToggle />
      </nav>

      {/* Mobile Controls */}
      <div className="flex items-center gap-2 sm:gap-3 lg:hidden relative z-50">
        <ThemeToggle />
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="w-8 h-8 sm:w-10 sm:h-10 border border-outline-variant/30 flex items-center justify-center text-on-surface hover:bg-primary-container hover:text-on-primary-fixed transition-colors rounded-[2px]"
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined text-xl sm:text-2xl transition-transform duration-300" style={{ transform: isMenuOpen ? 'rotate(90deg)' : 'rotate(0)' }}>
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Desktop CTA */}
      <a href="#contact" className="hidden lg:block bg-primary text-black font-label-caps text-xs px-8 py-4 tracking-[0.2em] uppercase hover:bg-white transition-colors shadow-lg hover:shadow-[0_0_20px_rgba(184,211,0,0.4)]">
        GET STARTED
      </a>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-b border-white/5 flex flex-col items-center py-10 gap-8 lg:hidden shadow-2xl transition-all duration-500 origin-top ${isMenuOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'}`}
      >
        {navLinks.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="font-display text-3xl uppercase tracking-widest text-on-surface hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
        <div className="w-12 h-px bg-outline-variant/30 my-2"></div>
        <a href="#contact" onClick={() => setIsMenuOpen(false)} className="bg-primary text-black font-label-caps text-xs px-12 py-4 tracking-[0.2em] uppercase w-11/12 max-w-sm mt-4 text-center">
          START YOUR JOURNEY
        </a>
      </div>

    </header>
  );
}
