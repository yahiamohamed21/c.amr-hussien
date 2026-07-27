"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [pathname]); // Re-run when route changes, if needed

  return null;
}
