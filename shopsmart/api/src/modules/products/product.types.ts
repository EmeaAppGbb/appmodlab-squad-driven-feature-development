export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  image_url?: string;
  created_at: Date;
  updated_at: Date;
}

export enum ProductCategory {
  ELECTRONICS = 'Electronics',
  BOOKS = 'Books',
  CLOTHING = 'Clothing',
  HOME = 'Home',
  SPORTS = 'Sports',
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  stock: number;
  image_url?: string;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  category?: ProductCategory;
  stock?: number;
  image_url?: string;
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: ProductCategory;
  search?: string;
}
