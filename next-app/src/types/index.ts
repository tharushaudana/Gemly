export interface Product {
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
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  metalType: string;
  size: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: CartItem[];
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
}