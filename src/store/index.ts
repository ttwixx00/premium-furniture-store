import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(i => i.product.id === item.product.id && i.selectedColor === item.selectedColor && i.selectedMaterial === item.selectedMaterial);
        if (existingItemIndex > -1) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += item.quantity;
          return { items: newItems };
        }
        return { items: [...state.items, item] };
      }),
      removeItem: (productId) => set((state) => ({
        items: state.items.filter((i) => i.product.id !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        items: state.items.map((i) => i.product.id === productId ? { ...i, quantity } : i)
      })),
      clearCart: () => set({ items: [] }),
      getCartTotal: () => get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    }),
    { name: "premium-cart" }
  )
);

interface FavoritesStore {
  favorites: string[];
  toggleFavorite: (productId: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set) => ({
      favorites: [],
      toggleFavorite: (productId) => set((state) => ({
        favorites: state.favorites.includes(productId) 
          ? state.favorites.filter(id => id !== productId)
          : [...state.favorites, productId]
      }))
    }),
    { name: "premium-favorites" }
  )
);

interface UIStore {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isFilterOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setFilterOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  isFilterOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
  setFilterOpen: (isOpen) => set({ isFilterOpen: isOpen })
}));
