export type ProductType = {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  collection: string;
  metalType: string[];
  description: string;
  shortDescription: string;
  isNew: boolean;
  isBestSeller: boolean;
  availableSizes: string[];
  stockQuantity: number;
};

export type DashboardStats = {
  totalProducts: number;
  bestSellers: number;
  newArrivals: number;
  lowStock: number;
};