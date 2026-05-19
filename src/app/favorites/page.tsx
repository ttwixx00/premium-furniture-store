"use client";

import { useFavoritesStore } from "@/store";
import { mockProducts } from "@/data/mock-products";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function FavoritesPage() {
  const { favorites } = useFavoritesStore();
  
  const favoriteProducts = mockProducts.filter(p => favorites.includes(p.id));

  return (
    <div className="pt-28 pb-24 min-h-screen bg-warm-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-deep-charcoal mb-4">Избранное</h1>
        
        {favoriteProducts.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-soft-sand rounded-full flex items-center justify-center mb-6">
              <span className="text-3xl opacity-50">🤍</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Список желаний пуст</h2>
            <p className="text-graphite max-w-md mb-8">
              Вы еще ничего не добавили в избранное. Перейдите в каталог, чтобы найти идеальную мебель для вашего дома.
            </p>
            <Button size="lg" asChild>
              <Link href="/catalog">Перейти в каталог</Link>
            </Button>
          </div>
        ) : (
          <>
            <p className="text-graphite mb-12">Товаров в списке: {favoriteProducts.length}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {favoriteProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
