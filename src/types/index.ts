export type Category = "sofas" | "office-chairs" | "cabinet-furniture";

export interface Product {
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
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  tags: string[];
  description: string;
  specs: Record<string, string>;
  inStock: boolean;
  // Specific to category
  sofaType?: "direct" | "corner" | "modular" | "folding";
  chairErgonomics?: boolean;
  relatedProductsIds?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedMaterial?: string;
  configuration?: Record<string, string>;
}
