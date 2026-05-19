"use client";

import { X, Trash2, Plus, Minus } from "lucide-react";
import { useCartStore, useUIStore } from "@/store";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

export function CartDrawer() {
  const { isCartOpen, setCartOpen } = useUIStore();
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-deep-charcoal/50 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-warm-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-soft-sand">
              <h2 className="text-xl font-bold tracking-tight">Корзина ({items.length})</h2>
              <button onClick={() => setCartOpen(false)} className="hover:opacity-70 transition-opacity">
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-soft-sand rounded-full flex items-center justify-center">
                    <span className="text-2xl opacity-50">🛒</span>
                  </div>
                  <p className="text-lg font-medium">Ваша корзина пуста</p>
                  <Button variant="outline" onClick={() => setCartOpen(false)}>
                    Продолжить покупки
                  </Button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedColor}-${item.selectedMaterial}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4"
                    >
                      <div className="w-24 h-24 bg-soft-sand shrink-0">
                        <img 
                          src={item.product.images[0]} 
                          alt={item.product.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm pr-4">{item.product.title}</h3>
                            <button 
                              onClick={() => removeItem(item.product.id)}
                              className="text-graphite/50 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="text-xs text-graphite/70 mt-1 space-y-0.5">
                            {item.selectedColor && <p>Цвет: {item.selectedColor}</p>}
                            {item.selectedMaterial && <p>Материал: {item.selectedMaterial}</p>}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-soft-sand rounded-md">
                            <button 
                              onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="p-1 hover:bg-soft-sand transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:bg-soft-sand transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="font-semibold text-sm">
                            {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-soft-sand bg-warm-white">
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Итого</span>
                  <span>{getCartTotal().toLocaleString("ru-RU")} ₽</span>
                </div>
                <Button className="w-full" asChild onClick={() => setCartOpen(false)}>
                  <Link href="/checkout">
                    Оформить заказ
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
