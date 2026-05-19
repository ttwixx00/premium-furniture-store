"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingBag, Heart, Search, Menu, X } from "lucide-react";
import { useCartStore, useUIStore } from "@/store";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { items } = useCartStore();
  const { setCartOpen, isMobileMenuOpen, setMobileMenuOpen } = useUIStore();
  
  const isHome = pathname === "/";
  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerBg = isHome 
    ? (isScrolled ? "bg-warm-white shadow-sm text-deep-charcoal" : "bg-transparent text-warm-white")
    : "bg-warm-white shadow-sm text-deep-charcoal";

  return (
    <header className={cn("fixed top-0 w-full z-50 transition-all duration-300", headerBg)}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button>
              <Search size={20} />
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link href="/catalog" className="hover:opacity-70 transition-opacity">Каталог</Link>
            <Link href="/category/sofas" className="hover:opacity-70 transition-opacity">Диваны</Link>
            <Link href="/category/office-chairs" className="hover:opacity-70 transition-opacity">Кресла</Link>
            <Link href="/category/cabinet-furniture" className="hover:opacity-70 transition-opacity">Корпусная мебель</Link>
          </div>

          <Link href="/" className="text-2xl font-bold tracking-tight absolute left-1/2 -translate-x-1/2">
            PREMIUM.
          </Link>

          <div className="flex items-center gap-6">
            <button className="hidden lg:block hover:opacity-70 transition-opacity">
              <Search size={20} />
            </button>
            <Link href="/favorites" className="hover:opacity-70 transition-opacity">
              <Heart size={20} />
            </Link>
            <button 
              className="relative hover:opacity-70 transition-opacity"
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent-brown text-warm-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-warm-white text-deep-charcoal z-40 lg:hidden p-4">
          <nav className="flex flex-col space-y-6 text-xl">
            <Link href="/catalog" onClick={() => setMobileMenuOpen(false)}>Каталог</Link>
            <Link href="/category/sofas" onClick={() => setMobileMenuOpen(false)}>Диваны</Link>
            <Link href="/category/office-chairs" onClick={() => setMobileMenuOpen(false)}>Офисные кресла</Link>
            <Link href="/category/cabinet-furniture" onClick={() => setMobileMenuOpen(false)}>Корпусная мебель</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)}>О нас</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Контакты</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
