import { mockProducts } from "@/data/mock-products";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPageContent } from "./ProductPageContent";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = mockProducts.find(p => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  // Use relatedProductsIds if they exist, otherwise fallback to category filter
  let relatedProducts = [];
  if (product.relatedProductsIds && product.relatedProductsIds.length > 0) {
    relatedProducts = mockProducts.filter(p => product.relatedProductsIds?.includes(p.id));
  } else {
    relatedProducts = mockProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }

  return <ProductPageContent product={product} relatedProducts={relatedProducts} />;
}

export function generateStaticParams() {
  return mockProducts.map((product) => ({
    slug: product.slug,
  }));
}
