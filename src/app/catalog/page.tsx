import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { ProductGrid } from "@/components/catalog/ProductGrid";

export default function CatalogPage() {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-warm-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-deep-charcoal mb-4">Весь каталог</h1>
          <p className="text-graphite max-w-2xl">
            Откройте для себя нашу полную коллекцию дизайнерской мебели. От премиальных диванов до эргономичных кресел.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar />
          <ProductGrid />
        </div>

      </div>
    </div>
  );
}
