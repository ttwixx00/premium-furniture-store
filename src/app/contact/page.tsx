"use client";

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-warm-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-deep-charcoal mb-12 text-center">Свяжитесь с нами</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Наш флагманский шоурум</h2>
              <p className="text-graphite">
                г. Москва, ул. Премиальная, д. 1<br />
                Ежедневно с 10:00 до 22:00
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Телефоны</h2>
              <p className="text-graphite">
                8 (800) 123-45-67 — бесплатно по РФ<br />
                +7 (495) 123-45-67 — для звонков из Москвы
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Email</h2>
              <p className="text-graphite">
                hello@premium-furniture.ru — общие вопросы<br />
                b2b@premium-furniture.ru — для корпоративных клиентов
              </p>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-soft-sand/30 p-8">
            <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  className="w-full p-4 border border-soft-sand bg-warm-white focus:outline-none focus:border-deep-charcoal"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full p-4 border border-soft-sand bg-warm-white focus:outline-none focus:border-deep-charcoal"
                />
              </div>
              <div>
                <textarea 
                  placeholder="Ваше сообщение" 
                  rows={5}
                  className="w-full p-4 border border-soft-sand bg-warm-white focus:outline-none focus:border-deep-charcoal resize-none"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-deep-charcoal text-warm-white py-4 font-semibold hover:bg-opacity-90 transition-opacity"
              >
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
