"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const heroImages = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1618220179428-22790b46a013?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1920&q=80"
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current || !textRef.current || !imagesRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300%", // Scroll for 3 screen heights to complete animation
          pin: true,
          scrub: 1, // Smooth scrubbing
        }
      });

      const images = gsap.utils.toArray<HTMLElement>(".hero-image");
      const words = gsap.utils.toArray<HTMLElement>(".hero-word");

      // Animation sequence
      
      // 1. Initial fade out of first image & zoom out
      tl.to(images[0], {
        scale: 0.8,
        opacity: 0,
        y: -50,
        rotateX: 10,
        duration: 1
      }, 0);

      // Bring in second image
      tl.fromTo(images[1], 
        { y: "100%", opacity: 0, scale: 1.2 },
        { y: "0%", opacity: 1, scale: 1, duration: 1 },
        0
      );

      // Text animation 1: Scatter first part
      tl.to(words.slice(0, 3), {
        y: -100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        filter: "blur(10px)"
      }, 0);

      // 2. Fade out second image
      tl.to(images[1], {
        scale: 0.8,
        opacity: 0,
        y: -50,
        rotateX: 10,
        duration: 1
      }, 1);

      // Bring in third image
      tl.fromTo(images[2], 
        { y: "100%", opacity: 0, scale: 1.2 },
        { y: "0%", opacity: 1, scale: 1, duration: 1 },
        1
      );

      // Text animation 2: Scatter rest
      tl.to(words.slice(3), {
        y: -100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        filter: "blur(10px)"
      }, 1);

      // 3. Final text replacement (appears in center)
      tl.fromTo(".hero-final-text",
        { opacity: 0, scale: 0.5, y: 100 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)" },
        1.5
      );

      // 4. Fade out entire scene to seamlessly blend with the animated background downwards
      tl.to(imagesRef.current, {
        opacity: 0,
        duration: 1
      }, 2.5);
      tl.to(".hero-final-text", {
        opacity: 0,
        y: -50,
        duration: 1
      }, 2.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="hero-section relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background Images Stack */}
      <div ref={imagesRef} className="absolute inset-0 z-0 w-full h-full perspective-[1000px]">
        {heroImages.map((src, i) => (
          <div 
            key={i} 
            className="hero-image absolute inset-0 w-full h-full origin-bottom"
            style={{ zIndex: 10 - i }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-deep-charcoal/80 via-deep-charcoal/40 to-deep-charcoal/90 z-10" />
            <img 
              src={src} 
              alt="Premium Interior" 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      <div ref={textRef} className="relative z-20 text-center px-4 container mx-auto flex flex-col items-center pointer-events-none h-full justify-center">
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 max-w-5xl leading-tight text-warm-white drop-shadow-2xl flex flex-wrap justify-center gap-x-4">
          <span className="hero-word inline-block">Искусство</span>
          <span className="hero-word inline-block">жить</span>
          <br className="hidden md:block hero-word" />
          <span className="hero-word inline-block text-accent-brown">в</span>
          <span className="hero-word inline-block text-accent-brown">комфорте</span>
        </h1>
        
        <div className="hero-final-text absolute inset-0 flex flex-col items-center justify-center pointer-events-auto opacity-0 translate-y-[100px]">
           <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-warm-white drop-shadow-2xl text-center">
             Откройте <br/>Новое Измерение
           </h2>
           <motion.div 
            className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
           >
            <Button size="lg" className="bg-warm-white text-deep-charcoal hover:bg-soft-sand hover:scale-105 transition-transform w-full sm:w-auto rounded-full px-10 py-8 text-xl shadow-2xl" asChild>
              <Link href="/catalog">Войти в каталог</Link>
            </Button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
