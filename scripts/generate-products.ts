import fs from 'fs';
import path from 'path';

type Category = "sofas" | "office-chairs" | "cabinet-furniture";

interface Product {
  id: string;
  slug: string;
  title: string;
  category: Category;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: string[];
  materials: string[];
  dimensions?: { width?: number; height?: number; depth?: number };
  tags: string[];
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
  sofaType?: "direct" | "corner" | "modular" | "folding";
  chairErgonomics?: boolean;
  relatedProductsIds?: string[];
}

const colorsList = ["#F7F3EE", "#151515", "#C8A27A", "#8B5E3C", "#E7D8C8", "#252525", "#808080", "#555555"];
const tagsList = ["Хит", "-17%", "Новинка", "Premium", "-10%", "-20%"];
const imagesPool = {
  "sofas": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1540574163026-643ea20d25b5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80"
  ],
  "office-chairs": [
    "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=800&q=80"
  ],
  "cabinet-furniture": [
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1601392740426-907c7b028119?auto=format&fit=crop&w=800&q=80"
  ]
};

const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomMultiple = <T>(arr: T[], count: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const products: Product[] = [];

for (let i = 1; i <= 250; i++) {
  const categories: Category[] = ["sofas", "office-chairs", "cabinet-furniture"];
  const category = categories[i % 3];
  
  const id = `prod_${i}`;
  const slug = `product-${i}-${category}`;
  const title = `Premium ${category.split('-').join(' ')} ${i}`;
  const price = Math.floor(Math.random() * 200000) + 30000;
  const hasOldPrice = Math.random() > 0.7;
  const oldPrice = hasOldPrice ? price + Math.floor(Math.random() * 50000) : undefined;
  const tagsCount = Math.floor(Math.random() * 3);
  const tags = getRandomMultiple(tagsList, tagsCount);

  const newProduct: Product = {
    id,
    slug,
    title,
    category,
    price,
    oldPrice,
    rating: Number((Math.random() * (5 - 3.5) + 3.5).toFixed(1)),
    reviewsCount: Math.floor(Math.random() * 500),
    images: getRandomMultiple(imagesPool[category], Math.floor(Math.random() * 2) + 1),
    colors: getRandomMultiple(colorsList, Math.floor(Math.random() * 3) + 1),
    materials: category === 'sofas' ? getRandomMultiple(["Velvet", "Linen", "Leather", "Cotton"], 2) :
               category === 'office-chairs' ? getRandomMultiple(["Mesh", "Aluminum", "Fabric", "Steel"], 2) :
               getRandomMultiple(["Oak", "Metal", "MDF", "Walnut Veneer"], 2),
    tags,
    description: `A stunning premium ${category} design, offering unmatched quality and style for your modern living space.`,
    specs: { "Brand": "Zona Comforta Exclusive", "Warranty": "5 Years" },
    inStock: Math.random() > 0.1,
  };

  if (category === "sofas") {
    newProduct.sofaType = getRandom(["direct", "corner", "modular", "folding"]);
  }
  if (category === "office-chairs") {
    newProduct.chairErgonomics = Math.random() > 0.5;
  }
  if (category === "cabinet-furniture") {
    newProduct.dimensions = {
      width: Math.floor(Math.random() * 100) + 50,
      height: Math.floor(Math.random() * 150) + 50,
      depth: Math.floor(Math.random() * 50) + 30
    };
  }

  products.push(newProduct);
}

// Interrelationships (Related Products)
products.forEach(p => {
  const related = products
    .filter(other => other.category === p.category && other.id !== p.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map(other => other.id);
  p.relatedProductsIds = related;
});

const fileContent = `import { Product } from "@/types";\n\nexport const mockProducts: Product[] = ${JSON.stringify(products, null, 2)};`;
const targetPath = path.join(__dirname, '..', 'src', 'data', 'mock-products.ts');

fs.writeFileSync(targetPath, fileContent, 'utf-8');
console.log("Successfully generated 250 products!");
