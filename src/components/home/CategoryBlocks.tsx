"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  {
    title: "Диваны",
    slug: "sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    title: "Офисные кресла",
    slug: "office-chairs",
    image: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80",
    colSpan: "col-span-1",
  },
  {
    title: "Корпусная мебель",
    slug: "cabinet-furniture",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    colSpan: "col-span-1 md:col-span-3",
  }
];

export function CategoryBlocks() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const images = gsap.utils.toArray(".parallax-bg");
    
    images.forEach((img: any) => {
      gsap.to(img, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: img.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-32 relative z-10" ref={containerRef}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-warm-white"
            >
              Коллекции
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-soft-sand max-w-xl text-lg font-light leading-relaxed"
            >
              Исследуйте наши тщательно подобранные коллекции. Каждый предмет создан для того, чтобы стать центральным элементом вашего интерьера.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/catalog" className="text-accent-brown font-medium hover:text-warm-white transition-colors mt-4 md:mt-0 whitespace-nowrap text-lg relative group overflow-hidden inline-block">
              <span className="relative z-10">Смотреть все категории &rarr;</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-warm-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-2xl h-[450px] md:h-[600px] ${cat.colSpan}`}
            >
              <Link href={`/category/${cat.slug}`} className="block w-full h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-deep-charcoal/20 group-hover:bg-deep-charcoal/50 transition-colors duration-700 z-10" />
                <div className="absolute inset-[-10%] w-[120%] h-[120%]">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="parallax-bg w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                </div>
                <div className="absolute bottom-10 left-10 z-20 overflow-hidden">
                  <h3 className="text-3xl font-bold text-warm-white mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">{cat.title}</h3>
                  <span className="text-soft-sand uppercase tracking-widest text-sm font-bold flex items-center opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    Перейти <span className="ml-2">&rarr;</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
