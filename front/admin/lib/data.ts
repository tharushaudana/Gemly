import { ProductType } from "./types";

// Mock data for dashboard
export const dashboardData = {
  totalProducts: 124,
  bestSellers: 38,
  newArrivals: 12,
  lowStock: 7,
};

// Mock product data
export const products: ProductType[] = [
  {
    id: "1",
    name: "Diamond Eternity Ring",
    price: 1299,
    images: [
      "https://images.pexels.com/photos/9428836/pexels-photo-9428836.jpeg",
      "https://images.pexels.com/photos/10417665/pexels-photo-10417665.jpeg",
    ],
    category: "Rings",
    collection: "Eternity",
    metalType: ["Gold", "Platinum"],
    description:
      "This stunning diamond eternity ring features 15 round brilliant diamonds set in 18k gold. Perfect as a wedding band or anniversary gift.",
    shortDescription: "Diamond eternity ring with 15 round brilliant diamonds",
    isNew: true,
    isBestSeller: true,
    availableSizes: ["6", "7", "8"],
    stockQuantity: 5,
  },
  {
    id: "2",
    name: "Sapphire Pendant Necklace",
    price: 899,
    images: [
      "https://images.pexels.com/photos/8891951/pexels-photo-8891951.jpeg",
      "https://images.pexels.com/photos/10984823/pexels-photo-10984823.jpeg",
    ],
    category: "Necklaces",
    collection: "Gemstone",
    metalType: ["Silver"],
    description:
      "A beautiful sapphire pendant necklace featuring a 2-carat blue sapphire surrounded by small diamonds, suspended on an 18-inch sterling silver chain.",
    shortDescription: "Sapphire pendant with diamond accents",
    isNew: false,
    isBestSeller: true,
    availableSizes: ["One Size"],
    stockQuantity: 8,
  },
  {
    id: "3",
    name: "Pearl Drop Earrings",
    price: 499,
    images: [
      "https://images.pexels.com/photos/5442447/pexels-photo-5442447.jpeg",
      "https://images.pexels.com/photos/10984828/pexels-photo-10984828.jpeg",
    ],
    category: "Earrings",
    collection: "Ocean",
    metalType: ["Gold"],
    description:
      "These elegant pearl drop earrings feature 8mm freshwater pearls suspended from 14k gold posts. The perfect addition to any jewelry collection.",
    shortDescription: "14k gold earrings with freshwater pearl drops",
    isNew: true,
    isBestSeller: false,
    availableSizes: ["One Size"],
    stockQuantity: 15,
  },
  {
    id: "4",
    name: "Men's Tungsten Wedding Band",
    price: 349,
    images: [
      "https://images.pexels.com/photos/6311704/pexels-photo-6311704.jpeg",
      "https://images.pexels.com/photos/6311668/pexels-photo-6311668.jpeg",
    ],
    category: "Rings",
    collection: "Men's",
    metalType: ["Tungsten"],
    description:
      "A sleek and modern men's wedding band crafted from durable tungsten carbide. Features a brushed finish with polished beveled edges.",
    shortDescription: "Modern tungsten carbide men's wedding band",
    isNew: false,
    isBestSeller: true,
    availableSizes: ["8", "9", "10", "11", "12"],
    stockQuantity: 20,
  },
  {
    id: "5",
    name: "Emerald Tennis Bracelet",
    price: 1599,
    images: [
      "https://images.pexels.com/photos/12114907/pexels-photo-12114907.jpeg",
      "https://images.pexels.com/photos/5442456/pexels-photo-5442456.jpeg",
    ],
    category: "Bracelets",
    collection: "Gemstone",
    metalType: ["Gold", "White Gold"],
    description:
      "This stunning tennis bracelet features 25 emerald gemstones (5 carats total) set in 18k white gold. Includes a secure box clasp with safety catch.",
    shortDescription: "Emerald tennis bracelet with 25 stones in white gold",
    isNew: true,
    isBestSeller: false,
    availableSizes: ["7 inch", "7.5 inch"],
    stockQuantity: 3,
  },
];

// Available options for product form
export const productOptions = {
  categories: ["Rings", "Necklaces", "Earrings", "Bracelets", "Watches", "Accessories"],
  collections: ["Eternity", "Gemstone", "Ocean", "Men's", "Wedding", "Seasonal", "Limited Edition"],
  metalTypes: ["Gold", "Silver", "Platinum", "White Gold", "Rose Gold", "Tungsten", "Titanium", "Stainless Steel"],
  sizes: ["5", "6", "7", "8", "9", "10", "11", "12", "One Size", "7 inch", "7.5 inch", "8 inch"],
};