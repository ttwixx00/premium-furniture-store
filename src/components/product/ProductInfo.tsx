"use client";

import { Product } from "@/types";
import { useCartStore, useFavoritesStore, useUIStore } from "@/store";
import { Button } from "@/components/ui/button";
import { Heart, Truck, Shield, Wrench } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function ProductInfo({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(product.materials[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("specs");

  const { addItem } = useCartStore();
  const { toggleFavorite, favorites } = useFavoritesStore();
  const { setCartOpen } = useUIStore();
  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = () => {
    addItem({ product, quantity, selectedColor, selectedMaterial });
    setCartOpen(true);
  };

  return (
    <div className="flex flex-col space-y-8 sticky top-28 text-warm-white">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <span className="text-sm text-warm-white/60 capitalize">{product.category.replace("-", " ")}</span>
          {product.tags.map(tag => (
            <span key={tag} className="bg-accent-brown/90 shadow-lg text-warm-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 drop-shadow-md">{product.title}</h1>
        
        <div className="flex items-end gap-4">
          <span className="text-3xl font-semibold drop-shadow-sm">{product.price.toLocaleString("ru-RU")} ₽</span>
          {product.oldPrice && (
            <span className="text-lg text-warm-white/50 line-through mb-1">
              {product.oldPrice.toLocaleString("ru-RU")} ₽
            </span>
          )}
        </div>
      </div>

      {/* Selectors */}
      <div className="space-y-6 pt-6 border-t border-warm-white/20">
        {/* Colors */}
        {product.colors.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-white/70 mb-3">Цвет</h3>
            <div className="flex gap-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform shadow-lg ${selectedColor === color ? "border-warm-white scale-110" : "border-transparent ring-1 ring-warm-white/20"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Materials */}
        {product.materials.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-white/70 mb-3">Материал</h3>
            <div className="flex flex-wrap gap-2">
              {product.materials.map(material => (
                <button
                  key={material}
                  onClick={() => setSelectedMaterial(material)}
                  className={`px-4 py-2 border text-sm transition-colors rounded-lg shadow-sm ${selectedMaterial === material ? "border-warm-white bg-warm-white text-deep-charcoal font-semibold" : "border-warm-white/20 hover:border-warm-white/50 text-warm-white/80"}`}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-white/70 mb-3">Количество</h3>
          <div className="flex items-center w-32 border border-warm-white/20 h-12 rounded-lg overflow-hidden bg-deep-charcoal/20 backdrop-blur-sm">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 hover:bg-warm-white/10 h-full transition-colors">-</button>
            <span className="flex-1 text-center font-medium">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="flex-1 hover:bg-warm-white/10 h-full transition-colors">+</button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button size="lg" className="flex-grow bg-warm-white text-deep-charcoal hover:bg-soft-sand hover:scale-105 transition-all duration-300 text-lg shadow-[0_0_20px_rgba(247,243,238,0.3)] border-none" onClick={handleAddToCart}>
          Добавить в корзину
        </Button>
        <Button size="icon" variant="outline" onClick={() => toggleFavorite(product.id)} className={`h-12 w-12 border-warm-white/20 hover:bg-warm-white/10 transition-colors ${isFavorite ? "border-accent-brown bg-accent-brown/20" : "bg-transparent text-warm-white"}`}>
          <Heart size={20} className={isFavorite ? "fill-accent-brown text-accent-brown" : "text-warm-white"} />
        </Button>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 gap-4 pt-8 border-t border-warm-white/20">
        <div className="flex items-center gap-4 text-sm text-warm-white/80">
          <Truck size={20} className="text-warm-white" />
          <span>Бесплатная доставка от 100 000 ₽</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-warm-white/80">
          <Wrench size={20} className="text-warm-white" />
          <span>Профессиональная сборка</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-warm-white/80">
          <Shield size={20} className="text-warm-white" />
          <span>Гарантия от производителя 2 года</span>
        </div>
      </div>

      {/* Accordion */}
      <div className="pt-8 border-t border-warm-white/20">
        <div className="border-b border-warm-white/20">
          <button 
            className="w-full flex justify-between items-center py-4 text-left font-semibold hover:text-soft-sand transition-colors"
            onClick={() => setActiveAccordion(activeAccordion === "specs" ? null : "specs")}
          >
            Характеристики
            <span className="text-xl font-light">{activeAccordion === "specs" ? "−" : "+"}</span>
          </button>
          <motion.div 
            initial={false}
            animate={{ height: activeAccordion === "specs" ? "auto" : 0, opacity: activeAccordion === "specs" ? 1 : 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 space-y-2 text-sm text-warm-white/70">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between border-b border-warm-white/10 pb-2 pt-1">
                  <span className="font-medium text-warm-white/90">{key}</span>
                  <span>{val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <div className="border-b border-warm-white/20">
          <button 
            className="w-full flex justify-between items-center py-4 text-left font-semibold hover:text-soft-sand transition-colors"
            onClick={() => setActiveAccordion(activeAccordion === "desc" ? null : "desc")}
          >
            Описание
            <span className="text-xl font-light">{activeAccordion === "desc" ? "−" : "+"}</span>
          </button>
          <motion.div 
            initial={false}
            animate={{ height: activeAccordion === "desc" ? "auto" : 0, opacity: activeAccordion === "desc" ? 1 : 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-warm-white/70 leading-relaxed">
              {product.description}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
