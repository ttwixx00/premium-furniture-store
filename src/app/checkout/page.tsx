"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCartStore } from "@/store";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  lastName: z.string().min(2, "Фамилия должна содержать минимум 2 символа"),
  email: z.string().email("Неверный формат email"),
  phone: z.string().min(10, "Неверный формат телефона"),
  address: z.string().min(10, "Введите полный адрес доставки"),
  city: z.string().min(2, "Введите город"),
  zipCode: z.string().min(5, "Неверный индекс"),
  comment: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    // Имитация отправки данных
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Order submitted:", data);
    setIsSuccess(true);
    clearCart();
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-transparent flex items-center justify-center text-warm-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg px-4"
        >
          <div className="w-24 h-24 bg-warm-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-warm-white/20">
            <svg className="w-12 h-12 text-warm-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Спасибо за заказ!</h1>
          <p className="text-soft-sand text-lg mb-8">
            Ваш заказ успешно оформлен. Мы отправили подтверждение и детали заказа на ваш email. Наш менеджер свяжется с вами в ближайшее время.
          </p>
          <Button size="lg" onClick={() => router.push("/")} className="bg-warm-white text-deep-charcoal hover:bg-warm-white/90">
            Вернуться на главную
          </Button>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-transparent text-warm-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
        <p className="text-soft-sand mb-8">Добавьте товары в корзину для оформления заказа.</p>
        <Button onClick={() => router.push("/catalog")} className="bg-warm-white text-deep-charcoal hover:bg-warm-white/90">Перейти в каталог</Button>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const delivery = subtotal > 100000 ? 0 : 2500;
  const total = subtotal + delivery;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-transparent text-warm-white">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight mb-12">Оформление заказа</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-7 xl:col-span-8">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Контактные данные */}
              <div>
                <h2 className="text-xl font-bold mb-4 border-b border-warm-white/10 pb-2">Контактные данные</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      {...register("firstName")} 
                      placeholder="Имя" 
                      className={`w-full p-3 border bg-white/5 rounded-lg focus:outline-none placeholder-soft-sand/70 ${errors.firstName ? "border-red-500" : "border-warm-white/20 focus:border-warm-white"}`}
                    />
                    {errors.firstName && <span className="text-red-500 text-xs mt-1">{errors.firstName.message}</span>}
                  </div>
                  <div>
                    <input 
                      {...register("lastName")} 
                      placeholder="Фамилия" 
                      className={`w-full p-3 border bg-white/5 rounded-lg focus:outline-none placeholder-soft-sand/70 ${errors.lastName ? "border-red-500" : "border-warm-white/20 focus:border-warm-white"}`}
                    />
                    {errors.lastName && <span className="text-red-500 text-xs mt-1">{errors.lastName.message}</span>}
                  </div>
                  <div>
                    <input 
                      {...register("email")} 
                      placeholder="Email" 
                      className={`w-full p-3 border bg-white/5 rounded-lg focus:outline-none placeholder-soft-sand/70 ${errors.email ? "border-red-500" : "border-warm-white/20 focus:border-warm-white"}`}
                    />
                    {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                  </div>
                  <div>
                    <input 
                      {...register("phone")} 
                      placeholder="Телефон" 
                      className={`w-full p-3 border bg-white/5 rounded-lg focus:outline-none placeholder-soft-sand/70 ${errors.phone ? "border-red-500" : "border-warm-white/20 focus:border-warm-white"}`}
                    />
                    {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone.message}</span>}
                  </div>
                </div>
              </div>

              {/* Адрес доставки */}
              <div>
                <h2 className="text-xl font-bold mb-4 border-b border-warm-white/10 pb-2">Адрес доставки</h2>
                <div className="space-y-4">
                  <div>
                    <input 
                      {...register("address")} 
                      placeholder="Улица, дом, квартира" 
                      className={`w-full p-3 border bg-white/5 rounded-lg focus:outline-none placeholder-soft-sand/70 ${errors.address ? "border-red-500" : "border-warm-white/20 focus:border-warm-white"}`}
                    />
                    {errors.address && <span className="text-red-500 text-xs mt-1">{errors.address.message}</span>}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        {...register("city")} 
                        placeholder="Город" 
                        className={`w-full p-3 border bg-white/5 rounded-lg focus:outline-none placeholder-soft-sand/70 ${errors.city ? "border-red-500" : "border-warm-white/20 focus:border-warm-white"}`}
                      />
                      {errors.city && <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>}
                    </div>
                    <div>
                      <input 
                        {...register("zipCode")} 
                        placeholder="Индекс" 
                        className={`w-full p-3 border bg-white/5 rounded-lg focus:outline-none placeholder-soft-sand/70 ${errors.zipCode ? "border-red-500" : "border-warm-white/20 focus:border-warm-white"}`}
                      />
                      {errors.zipCode && <span className="text-red-500 text-xs mt-1">{errors.zipCode.message}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Комментарий */}
              <div>
                <h2 className="text-xl font-bold mb-4 border-b border-warm-white/10 pb-2">Комментарий к заказу</h2>
                <textarea 
                  {...register("comment")} 
                  placeholder="Дополнительная информация (опционально)" 
                  rows={4}
                  className="w-full p-3 border border-warm-white/20 bg-white/5 rounded-lg focus:outline-none focus:border-warm-white resize-none placeholder-soft-sand/70"
                />
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white/5 backdrop-blur-xl border border-warm-white/10 p-6 lg:p-8 sticky top-28 rounded-2xl">
              <h2 className="text-xl font-bold mb-6">Ваш заказ</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto no-scrollbar pr-2">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedColor}`} className="flex gap-4">
                    <div className="w-16 h-16 bg-warm-white/10 shrink-0 rounded-md overflow-hidden border border-warm-white/5">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-medium">{item.product.title}</h4>
                      <p className="text-xs text-soft-sand mt-1">Кол-во: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">{(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-warm-white/10 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-soft-sand">Товары</span>
                  <span>{subtotal.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-soft-sand">Доставка</span>
                  <span>{delivery === 0 ? "Бесплатно" : `${delivery.toLocaleString("ru-RU")} ₽`}</span>
                </div>
              </div>

              <div className="border-t border-warm-white/20 pt-4 mb-8">
                <div className="flex justify-between font-bold text-lg">
                  <span>К оплате</span>
                  <span>{total.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              <Button 
                type="submit" 
                form="checkout-form" 
                size="lg" 
                className="w-full bg-warm-white text-deep-charcoal hover:bg-warm-white/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Обработка..." : "Оформить заказ"}
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
