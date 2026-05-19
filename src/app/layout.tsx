import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScrolling from "@/components/ui/SmoothScrolling";
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PREMIUM. | Modern Furniture Store",
  description: "High-end modern furniture for your home and office. Level up your interior with PREMIUM.",
};

import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased font-sans bg-transparent text-warm-white min-h-screen flex flex-col`}>
        <AnimatedBackground />
        <CustomCursor />
        <SmoothScrolling>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
