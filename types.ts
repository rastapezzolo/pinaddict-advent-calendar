
export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  description: string;
  imageUrl?: string;
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
