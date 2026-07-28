"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function Footer() {
  const { data: settings } = useQuery({
    queryKey: ["public-site-settings"],
    queryFn: async () => {
      const res = await api.get("/api/v1/public/site-settings");
      return res.data;
    },
  });

  const { data: footerData } = useQuery({
    queryKey: ["public-footer"],
    queryFn: async () => {
      const res = await api.get("/api/v1/public/footer");
      return res.data;
    },
  });

  const instagramUrl = settings?.instagramUrl;
  const xUrl = settings?.xUrl;
  const facebookUrl = settings?.facebookUrl;
  const linkedInUrl = settings?.linkedInUrl;

  const brandName = footerData?.brandName || settings?.brandName || "AMR HUSSIEN";
  const footerDesc = footerData?.description || "Redefining human potential through scientific precision, data-driven protocols, and elite athletic coaching.";

  return (
    <footer className="bg-background w-full pt-16 md:pt-32 pb-8 px-margin-mobile md:px-margin-desktop relative overflow-hidden border-t border-white/10">
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-y-12 gap-x-4 md:gap-8 mb-16 md:mb-32">
          
          {/* Brand & Mission */}
          <div className="col-span-2 md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-on-surface uppercase mb-4 md:mb-6 tracking-tight">
                {brandName}
              </div>
              <p className="font-body-md text-on-surface-variant text-base md:text-lg max-w-sm mb-8 md:mb-12 border-l-2 border-primary/30 pl-4">
                {footerDesc}
              </p>
            </div>
            
            {/* Brutalist Social Blocks */}
            <div className="flex gap-4">
              {instagramUrl && (
                <a 
                  className="w-14 h-14 bg-surface-container border border-white/5 flex items-center justify-center text-on-surface hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-lg group" 
                  href={instagramUrl} 
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              )}
              {xUrl && (
                <a 
                  className="w-14 h-14 bg-surface-container border border-white/5 flex items-center justify-center text-on-surface hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-lg group" 
                  href={xUrl} 
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.13 1.671-4.816 2.272-7.511 1.956 2.189 1.403 4.789 2.221 7.579 2.221 9.143 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
              )}
              {facebookUrl && (
                <a 
                  className="w-14 h-14 bg-surface-container border border-white/5 flex items-center justify-center text-on-surface hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-lg group" 
                  href={facebookUrl} 
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
                </a>
              )}
              {linkedInUrl && (
                <a 
                  className="w-14 h-14 bg-surface-container border border-white/5 flex items-center justify-center text-on-surface hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 shadow-lg group" 
                  href={linkedInUrl} 
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h5 className="font-label-caps text-[10px] md:text-xs text-primary uppercase tracking-[0.3em] mb-6 md:mb-8">Navigation</h5>
            <ul className="space-y-4 md:space-y-6 font-display text-base md:text-lg uppercase tracking-wider text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Philosophy</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Methodology</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Online Coaching</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Client Portal</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h5 className="font-label-caps text-[10px] md:text-xs text-primary uppercase tracking-[0.3em] mb-6 md:mb-8">Legal</h5>
            <ul className="space-y-4 md:space-y-6 font-display text-base md:text-lg uppercase tracking-wider text-on-surface-variant">
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Privacy Policy</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Coaching Agreement</a></li>
              <li><a className="hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="w-0 h-px bg-primary transition-all duration-300 group-hover:w-4"></span>Affiliates</a></li>
            </ul>
          </div>

        </div>

        {/* Massive Brand Watermark */}
        <div className="w-full flex justify-center mb-8 border-b border-black/5 dark:border-white/5 pb-16">
          <h1 className="font-display font-black text-[clamp(4rem,15vw,25rem)] leading-none uppercase text-black/[0.03] dark:text-white/[0.03] select-none tracking-tighter w-full text-center">
            {brandName}
          </h1>
        </div>

        {/* Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-label-caps text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/40">
          <div>© {new Date().getFullYear()} {brandName}. ELITE PERFORMANCE COACHING.</div>
          
          {/* Creator Badge */}
          <a 
            href="https://www.linkedin.com/in/yahia-mohamed-b8b440372/" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center border border-outline-variant/30 rounded-full px-4 py-2 bg-surface hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 group cursor-pointer relative overflow-hidden shadow-sm"
          >
            <div className="absolute inset-0 w-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent group-hover:w-full transition-all duration-700 ease-in-out -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%]"></div>
            <span className="text-primary font-bold tracking-widest mr-2 opacity-70 group-hover:opacity-100 transition-opacity text-xs">{"</>"}</span>
            <span className="text-on-surface-variant group-hover:text-on-surface transition-colors duration-300 text-[10px] md:text-xs">
              Engineered by <span className="font-bold text-on-surface group-hover:text-primary tracking-[0.15em] ml-1">YAHIA MOHAMED</span>
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}
