"use client";

import { Button } from "@/components/ui/button";

export function NewsletterBlock() {
  return (
    <section className="py-24 bg-soft-sand/30 relative z-10">
      <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-warm-white">
          Присоединяйтесь к PREMIUM
        </h2>
        <p className="text-soft-sand mb-10 text-lg">
          Подпишитесь на нашу рассылку, чтобы первыми узнавать о новых коллекциях, эксклюзивных предложениях и получать советы по дизайну интерьера.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Ваш E-mail адрес" 
            className="h-14 px-6 border border-graphite/20 bg-warm-white focus:outline-none focus:border-deep-charcoal w-full sm:w-96 text-lg rounded-none"
            required
          />
          <Button type="submit" size="lg" className="rounded-none w-full sm:w-auto">
            Подписаться
          </Button>
        </form>
      </div>
    </section>
  );
}
