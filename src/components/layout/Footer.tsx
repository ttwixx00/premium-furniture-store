"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-deep-charcoal text-warm-white py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-bold tracking-tight mb-6">PREMIUM.</h2>
            <p className="text-sm text-soft-sand max-w-xs">
              Высококачественная современная мебель для дома и офиса. Создаем пространства, в которых хочется жить.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-oak-beige">Каталог</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/category/sofas" className="hover:text-oak-beige transition-colors">Диваны</Link></li>
              <li><Link href="/category/office-chairs" className="hover:text-oak-beige transition-colors">Офисные кресла</Link></li>
              <li><Link href="/category/cabinet-furniture" className="hover:text-oak-beige transition-colors">Корпусная мебель</Link></li>
              <li><Link href="/catalog" className="hover:text-oak-beige transition-colors">Весь каталог</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-oak-beige">Клиентам</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-oak-beige transition-colors">О компании</Link></li>
              <li><Link href="/delivery" className="hover:text-oak-beige transition-colors">Доставка и оплата</Link></li>
              <li><Link href="/warranty" className="hover:text-oak-beige transition-colors">Гарантия</Link></li>
              <li><Link href="/contact" className="hover:text-oak-beige transition-colors">Контакты</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-oak-beige">Подписка</h3>
            <p className="text-sm text-soft-sand mb-4">Подпишитесь на новости и получите скидку 10% на первый заказ.</p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Ваш E-mail" 
                className="bg-transparent border-b border-soft-sand px-0 py-2 flex-grow focus:outline-none focus:border-oak-beige text-sm"
              />
              <button type="submit" className="text-oak-beige text-sm uppercase tracking-wider font-semibold ml-4 hover:opacity-80">
                Подписаться
              </button>
            </form>
          </div>

        </div>
        
        <div className="border-t border-graphite mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-soft-sand">
          <p>&copy; {new Date().getFullYear()} PREMIUM. Все права защищены.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-warm-white transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-warm-white transition-colors">Условия использования</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
