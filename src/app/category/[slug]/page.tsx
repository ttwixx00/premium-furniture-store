import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { notFound } from "next/navigation";

const categories = {
  "sofas": {
    title: "Диваны",
    description: "Премиальные диваны для вашего отдыха. Прямые, угловые и модульные решения."
  },
  "office-chairs": {
    title: "Офисные кресла",
    description: "Эргономичные кресла для продуктивной работы. Максимальный комфорт в течение всего дня."
  },
  "cabinet-furniture": {
    title: "Корпусная мебель",
    description: "Современные системы хранения, тумбы и комоды, созданные по вашим размерам."
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const categoryInfo = categories[slug as keyof typeof categories];

  if (!categoryInfo) {
    notFound();
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-warm-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-deep-charcoal mb-4">{categoryInfo.title}</h1>
          <p className="text-graphite max-w-2xl">
            {categoryInfo.description}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar category={slug} />
          <ProductGrid category={slug} />
        </div>

      </div>
    </div>
  );
}
