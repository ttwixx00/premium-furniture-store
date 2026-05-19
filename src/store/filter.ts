import { create } from "zustand";

interface FilterState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  selectedColors: string[];
  selectedMaterials: string[];
  sort: "newest" | "price_asc" | "price_desc" | "popular";
  setCategory: (category: string | null) => void;
  setPriceRange: (min: number, max: number) => void;
  toggleColor: (color: string) => void;
  toggleMaterial: (material: string) => void;
  setSort: (sort: FilterState["sort"]) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: null,
  minPrice: 0,
  maxPrice: 1000000,
  selectedColors: [],
  selectedMaterials: [],
  sort: "popular",
  setCategory: (category) => set({ category }),
  setPriceRange: (min, max) => set({ minPrice: min, maxPrice: max }),
  toggleColor: (color) => set((state) => ({
    selectedColors: state.selectedColors.includes(color)
      ? state.selectedColors.filter(c => c !== color)
      : [...state.selectedColors, color]
  })),
  toggleMaterial: (material) => set((state) => ({
    selectedMaterials: state.selectedMaterials.includes(material)
      ? state.selectedMaterials.filter(m => m !== material)
      : [...state.selectedMaterials, material]
  })),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set({
    minPrice: 0,
    maxPrice: 1000000,
    selectedColors: [],
    selectedMaterials: [],
    sort: "popular"
  })
}));
