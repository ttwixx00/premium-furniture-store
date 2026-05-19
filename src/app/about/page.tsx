export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-warm-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-deep-charcoal mb-8 text-center">О компании PREMIUM</h1>
        
        <div className="aspect-[21/9] w-full bg-soft-sand mb-12 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" 
            alt="Офис и производство" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-8 text-lg text-graphite leading-relaxed">
          <p>
            Добро пожаловать в PREMIUM — место, где современный дизайн встречается с бескомпромиссным качеством. Мы создаем мебель, которая становится продолжением вас и вашего образа жизни.
          </p>
          <p>
            Наша философия проста: мебель должна быть не только красивой, но и функциональной, долговечной и экологичной. Мы тщательно отбираем материалы со всего мира, сотрудничаем с лучшими дизайнерами и используем передовые технологии производства.
          </p>
          <h2 className="text-2xl font-bold text-deep-charcoal mt-12 mb-4">Наши ценности</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li><strong className="text-deep-charcoal">Эстетика минимализма.</strong> Мы верим, что истинная красота кроется в простоте и чистоте линий.</li>
            <li><strong className="text-deep-charcoal">Долговечность.</strong> Мы создаем мебель, которая будет служить вам десятилетиями, становясь только лучше со временем.</li>
            <li><strong className="text-deep-charcoal">Экологичность.</strong> Мы используем возобновляемые материалы и минимизируем влияние нашего производства на окружающую среду.</li>
            <li><strong className="text-deep-charcoal">Индивидуальность.</strong> Каждое пространство уникально, поэтому мы предлагаем широкие возможности кастомизации.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
