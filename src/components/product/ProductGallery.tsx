"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function ProductGallery({ images, productId }: { images: string[], productId?: string }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:w-24 shrink-0 no-scrollbar">
        {images.map((img, idx) => (
          <button 
            key={idx} 
            onClick={() => setActiveImage(idx)}
            className={`relative w-20 h-24 shrink-0 transition-opacity rounded-xl overflow-hidden ${activeImage === idx ? "opacity-100 ring-2 ring-warm-white" : "opacity-50 hover:opacity-100"}`}
          >
            <img src={img} alt={`Thumbnail ${idx}`} className="absolute inset-0 w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-grow bg-deep-charcoal/50 relative aspect-square lg:aspect-auto lg:h-[700px] overflow-hidden rounded-3xl shadow-lg border border-warm-white/10">
        <motion.img 
          key={activeImage}
          layoutId={activeImage === 0 && productId ? `product-image-${productId}` : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={images[activeImage]} 
          alt="Main product view"
          className="absolute inset-0 w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform duration-700"
        />
      </div>
    </div>
  );
}
