"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/image-1.jpeg", alt: "Transformation 1" },
  { src: "/image-2.jpeg", alt: "Transformation 2" },
  { src: "/image-3.jpeg", alt: "Transformation 3" },
  { src: "/image-4.jpeg", alt: "Transformation 4" },
  { src: "/image-5.jpeg", alt: "Transformation 5" },
  { src: "/image-6.jpeg", alt: "Transformation 6" },
];

export function Gallery() {
  return (
    <section 
      id="gallery" 
      className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-surface-container-low -skew-x-12 translate-x-32 opacity-40 z-0 pointer-events-none"></div>

      <div className="relative z-10 max-w-[var(--spacing-container-max)] mx-auto">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="font-label-caps text-label-caps text-primary uppercase mb-4 flex items-center justify-center gap-4">
            <span className="w-8 h-[2px] bg-primary"></span>
            Transformation In Action
            <span className="w-8 h-[2px] bg-primary"></span>
          </span>

          <h2 className="font-display-xl text-[clamp(3rem,8vw,5rem)] leading-[0.9] tracking-tight uppercase mb-6 text-on-surface">
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-on-surface-variant">GRIND</span>
          </h2>
          
          <p className="font-body-md text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
            Witness the dedication, the sweat, and the real results. This is what it takes to build a bulletproof body and mind.
          </p>
        </motion.div>

        {/* Masonry Layout without cropping */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
              className="relative overflow-hidden rounded-2xl shadow-xl border border-white/5 group break-inside-avoid"
            >
              {/* Using natural sizing so nothing is cropped */}
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={800}
                className="w-full h-auto object-contain grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-700 ease-out"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
              
              {/* Hover overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
