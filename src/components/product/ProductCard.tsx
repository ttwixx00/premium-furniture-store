"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/types";
import { useFavoritesStore } from "@/store";
import { useState } from "react";
import { motion } from "framer-motion";

export function ProductCard({ product }: { product: Product }) {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const isFavorite = favorites.includes(product.id);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
        {product.tags.map(tag => (
          <span key={tag} className="bg-deep-charcoal/90 backdrop-blur text-warm-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-full shadow-lg">
            {tag}
          </span>
        ))}
      </div>

      {/* Favorite Button */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(product.id);
        }}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-deep-charcoal/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-deep-charcoal shadow-lg border border-warm-white/10"
      >
        <Heart size={18} className={isFavorite ? "fill-accent-brown text-accent-brown" : "text-warm-white"} />
      </button>

      {/* Image Gallery */}
      <Link href={`/product/${product.slug}`} className="relative aspect-[4/5] overflow-hidden bg-deep-charcoal/50 rounded-3xl block shadow-lg group-hover:shadow-2xl transition-all duration-500 border border-warm-white/5">
        <motion.img 
          layoutId={`product-image-${product.id}`}
          src={product.images[0]} 
          alt={product.title}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered && product.images.length > 1 ? "opacity-0" : "opacity-100"}`}
        />
        {product.images.length > 1 && (
          <motion.img 
            src={product.images[1]} 
            alt={`${product.title} alternate`}
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </Link>

      {/* Product Info */}
      <div className="pt-5 flex flex-col gap-2 px-2">
        <div className="flex justify-between items-start">
          <Link href={`/product/${product.slug}`} className="text-lg font-medium text-warm-white hover:text-accent-brown transition-colors">
            {product.title}
          </Link>
          <div className="flex flex-col items-end">
            <span className="font-semibold text-warm-white">
              {product.price.toLocaleString("ru-RU")} ₽
            </span>
            {product.oldPrice && (
              <span className="text-xs text-warm-white/50 line-through mt-0.5">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-warm-white/60 capitalize">
            {product.category.replace("-", " ")}
          </p>
          <div className="flex gap-1 ml-auto">
            {product.colors.slice(0, 3).map((color, idx) => (
              <span key={idx} className="w-3 h-3 rounded-full border border-warm-white/20 shadow-inner" style={{ backgroundColor: color }} />
            ))}
            {product.colors.length > 3 && <span className="text-[10px] text-warm-white/60 ml-1">+{product.colors.length - 3}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
