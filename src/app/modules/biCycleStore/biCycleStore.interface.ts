// Defining a TypeScript type named `BiCycleStore`
// This type describes the structure of a bicycle store's data
export type BiCycleStore = {
  name: string;
  brand: string;
  price: number;
  type: string;
  photo: string;
  description: string;
  quantity: number;
  inStock: boolean;
};
export interface SearchFilters {
  priceRange?: { min: number; max: number };
  category?: string;
  availability?: boolean;
  brand?: string;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}