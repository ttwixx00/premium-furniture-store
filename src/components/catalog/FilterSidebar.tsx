"use client";

import { useFilterStore } from "@/store/filter";
import { mockProducts } from "@/data/mock-products";
import { useMemo } from "react";
import { Button } from "@/components/ui/button";

export function FilterSidebar({ category }: { category?: string }) {
  const { minPrice, maxPrice, selectedColors, selectedMaterials, setPriceRange, toggleColor, toggleMaterial, resetFilters } = useFilterStore();

  const allColors = useMemo(() => {
    const products = category ? mockProducts.filter(p => p.category === category) : mockProducts;
    const colors = new Set<string>();
    products.forEach(p => p.colors.forEach(c => colors.add(c)));
    return Array.from(colors);
  }, [category]);

  const allMaterials = useMemo(() => {
    const products = category ? mockProducts.filter(p => p.category === category) : mockProducts;
    const materials = new Set<string>();
    products.forEach(p => p.materials.forEach(m => materials.add(m)));
    return Array.from(materials);
  }, [category]);

  return (
    <div className="w-full lg:w-64 shrink-0 space-y-8 sticky top-28 h-fit hidden lg:block">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Фильтры</h3>
        <button onClick={resetFilters} className="text-xs text-graphite hover:text-deep-charcoal underline">
          Сбросить
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="font-semibold text-sm uppercase tracking-wider text-graphite">Цена</h4>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            value={minPrice} 
            onChange={(e) => setPriceRange(Number(e.target.value), maxPrice)}
            className="w-full border border-soft-sand px-3 py-2 text-sm focus:outline-none focus:border-deep-charcoal bg-transparent"
          />
          <span>-</span>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => setPriceRange(minPrice, Number(e.target.value))}
            className="w-full border border-soft-sand px-3 py-2 text-sm focus:outline-none focus:border-deep-charcoal bg-transparent"
          />
        </div>
      </div>

      {allColors.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-graphite">Цвета</h4>
          <div className="flex flex-wrap gap-2">
            {allColors.map(color => (
              <button
                key={color}
                onClick={() => toggleColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-transform ${selectedColors.includes(color) ? "border-deep-charcoal scale-110" : "border-transparent"}`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {allMaterials.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-graphite">Материалы</h4>
          <div className="space-y-2">
            {allMaterials.map(material => (
              <label key={material} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={selectedMaterials.includes(material)}
                  onChange={() => toggleMaterial(material)}
                  className="w-4 h-4 accent-deep-charcoal"
                />
                <span className="text-sm">{material}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
