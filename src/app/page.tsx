import { HeroSection } from "@/components/home/HeroSection";
import { CategoryBlocks } from "@/components/home/CategoryBlocks";
import { NewsletterBlock } from "@/components/home/NewsletterBlock";
import { ProductCard } from "@/components/product/ProductCard";
import { mockProducts } from "@/data/mock-products";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  const popularProducts = mockProducts.filter(p => p.tags.includes("Хит")).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryBlocks />
      
      {/* Popular Products */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-warm-white">Популярное сейчас</h2>
            <Link href="/catalog" className="text-accent-brown hover:underline hidden sm:block">
              Смотреть все
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Button variant="outline" asChild className="w-full">
              <Link href="/catalog">Смотреть все</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Block */}
      <section className="py-24 relative z-10 mx-4 lg:mx-8 mb-24 rounded-[3rem] bg-deep-charcoal/90 backdrop-blur-xl text-warm-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-deep-charcoal via-deep-charcoal/80 to-deep-charcoal pointer-events-none" />
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">Премиальное качество</h3>
              <p className="text-soft-sand">Мы используем только лучшие материалы: массив дерева, натуральную кожу и ткани высшей категории.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Безупречный сервис</h3>
              <p className="text-soft-sand">Личный менеджер, доставка &quot;до двери&quot; и профессиональная сборка в удобное для вас время.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Индивидуальный подход</h3>
              <p className="text-soft-sand">Возможность кастомизации корпусной мебели: выбирайте размеры, материалы и фурнитуру.</p>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBlock />
    </div>
  );
}
