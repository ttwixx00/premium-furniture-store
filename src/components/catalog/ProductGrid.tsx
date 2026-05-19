"use client";

import { useFilterStore } from "@/store/filter";
import { mockProducts } from "@/data/mock-products";
import { ProductCard } from "@/components/product/ProductCard";
import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ProductGrid({ category }: { category?: string }) {
  const { minPrice, maxPrice, selectedColors, selectedMaterials, sort } = useFilterStore();

  const filteredProducts = useMemo(() => {
    let result = mockProducts;

    if (category) {
      result = result.filter(p => p.category === category);
    }

    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);

    if (selectedColors.length > 0) {
      result = result.filter(p => p.colors.some(c => selectedColors.includes(c)));
    }

    if (selectedMaterials.length > 0) {
      result = result.filter(p => p.materials.some(m => selectedMaterials.includes(m)));
    }

    // Sorting
    if (sort === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "popular") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "newest") {
      result.sort((a, b) => b.tags.includes("Новинка") ? 1 : -1);
    }

    return result;
  }, [category, minPrice, maxPrice, selectedColors, selectedMaterials, sort]);

  return (
    <div className="flex-grow">
      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl text-graphite mb-4">По вашему запросу ничего не найдено.</p>
          <button onClick={() => useFilterStore.getState().resetFilters()} className="text-accent-brown hover:underline">
            Сбросить фильтры
          </button>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map(product => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
