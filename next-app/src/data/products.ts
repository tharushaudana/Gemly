import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    price: 2499.99,
    images: [
      'https://images.pexels.com/photos/9428867/pexels-photo-9428867.jpeg',
      'https://images.pexels.com/photos/9428863/pexels-photo-9428863.jpeg',
      'https://images.pexels.com/photos/9428855/pexels-photo-9428855.jpeg'
    ],
    category: 'Rings',
    collection: 'Wedding',
    metalType: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    description: 'Our stunning Diamond Eternity Ring features a continuous circle of brilliant-cut diamonds set in precious metal. Each diamond is meticulously hand-selected for exceptional clarity and brilliance. Perfect as a wedding band or anniversary gift, this timeless piece symbolizes endless love and commitment.',
    shortDescription: 'Brilliant-cut diamonds in a continuous circle of elegance.',
    isNew: false,
    isBestSeller: true,
    availableSizes: ['5', '6', '7', '8', '9']
  },
  {
    id: '2',
    name: 'Sapphire Pendant Necklace',
    price: 1899.99,
    images: [
      'https://images.pexels.com/photos/9428897/pexels-photo-9428897.jpeg',
      'https://images.pexels.com/photos/9428890/pexels-photo-9428890.jpeg',
      'https://images.pexels.com/photos/9428921/pexels-photo-9428921.jpeg'
    ],
    category: 'Necklaces',
    collection: 'Daily Wear',
    metalType: ['White Gold', 'Yellow Gold'],
    description: 'This exquisite Sapphire Pendant Necklace features a stunning blue sapphire center stone surrounded by a halo of brilliant-cut diamonds. The pendant hangs from a delicate chain crafted from your choice of precious metal. The deep blue sapphire symbolizes wisdom and royalty, making this piece a sophisticated addition to any jewelry collection.',
    shortDescription: 'Stunning blue sapphire surrounded by brilliant diamonds.',
    isNew: true,
    isBestSeller: false,
    availableSizes: ['One Size']
  },
  {
    id: '3',
    name: 'Gold Tennis Bracelet',
    price: 3299.99,
    images: [
      'https://images.pexels.com/photos/13944486/pexels-photo-13944486.jpeg',
      'https://images.pexels.com/photos/13944487/pexels-photo-13944487.jpeg',
      'https://images.pexels.com/photos/13944489/pexels-photo-13944489.jpeg'
    ],
    category: 'Bracelets',
    collection: 'Gold',
    metalType: ['Yellow Gold'],
    description: 'Our Gold Tennis Bracelet features a continuous line of round brilliant diamonds set in solid 18k gold. Each diamond is precisely matched for color, clarity, and cut, creating a bracelet that catches the light with every movement. Secure yet comfortable, this bracelet includes a safety clasp for peace of mind.',
    shortDescription: 'A line of brilliant diamonds set in luxurious 18k gold.',
    isNew: false,
    isBestSeller: true,
    availableSizes: ['6.5 inches', '7 inches', '7.5 inches']
  },
  {
    id: '4',
    name: 'Pearl Drop Earrings',
    price: 899.99,
    images: [
      'https://images.pexels.com/photos/1413420/pexels-photo-1413420.jpeg',
      'https://images.pexels.com/photos/9428932/pexels-photo-9428932.jpeg',
      'https://images.pexels.com/photos/9428951/pexels-photo-9428951.jpeg'
    ],
    category: 'Earrings',
    collection: 'Daily Wear',
    metalType: ['White Gold', 'Yellow Gold'],
    description: 'These elegant Pearl Drop Earrings feature lustrous freshwater pearls suspended from diamond-accented posts. The combination of diamonds and pearls creates a timeless look that transitions effortlessly from day to evening wear. Each pearl is carefully selected for its shape, luster, and surface quality.',
    shortDescription: 'Lustrous pearls suspended from diamond-accented posts.',
    isNew: false,
    isBestSeller: false,
    availableSizes: ['One Size']
  },
  {
    id: '5',
    name: 'Diamond Engagement Ring',
    price: 4999.99,
    images: [
      'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg',
      'https://images.pexels.com/photos/5370706/pexels-photo-5370706.jpeg',
      'https://images.pexels.com/photos/5370647/pexels-photo-5370647.jpeg'
    ],
    category: 'Rings',
    collection: 'Wedding',
    metalType: ['Platinum', 'White Gold', 'Rose Gold'],
    description: 'Make an unforgettable proposal with our stunning Diamond Engagement Ring. The center stone is a brilliant-cut diamond of exceptional quality, set in a cathedral setting that elevates the diamond for maximum light reflection. The band features pavé-set diamonds that add additional sparkle to this already magnificent ring.',
    shortDescription: 'Brilliant-cut center diamond in an elegant cathedral setting.',
    isNew: true,
    isBestSeller: true,
    availableSizes: ['4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8']
  },
  {
    id: '6',
    name: 'Gold Chain Necklace',
    price: 1299.99,
    images: [
      'https://images.pexels.com/photos/10952072/pexels-photo-10952072.jpeg',
      'https://images.pexels.com/photos/10951909/pexels-photo-10951909.jpeg',
      'https://images.pexels.com/photos/10951927/pexels-photo-10951927.jpeg'
    ],
    category: 'Necklaces',
    collection: 'Gold',
    metalType: ['Yellow Gold'],
    description: 'Our solid 18k Gold Chain Necklace combines timeless design with unparalleled craftsmanship. The links are individually crafted and connected to create a smooth, flowing chain that drapes beautifully around the neck. This versatile piece can be worn alone as a statement or paired with a pendant for a personalized look.',
    shortDescription: 'Solid 18k gold chain with expertly crafted links.',
    isNew: false,
    isBestSeller: true,
    availableSizes: ['16 inches', '18 inches', '20 inches', '24 inches']
  },
  {
    id: '7',
    name: 'Diamond Stud Earrings',
    price: 1499.99,
    images: [
      'https://images.pexels.com/photos/9940727/pexels-photo-9940727.jpeg',
      'https://images.pexels.com/photos/9940667/pexels-photo-9940667.jpeg',
      'https://images.pexels.com/photos/9940636/pexels-photo-9940636.jpeg'
    ],
    category: 'Earrings',
    collection: 'Daily Wear',
    metalType: ['White Gold', 'Yellow Gold', 'Platinum'],
    description: 'Our classic Diamond Stud Earrings feature brilliant-cut diamonds set in a secure four-prong setting. Each diamond is carefully selected for its exceptional cut, clarity, and brilliance. These timeless earrings are the perfect everyday luxury and make an ideal gift for any special occasion.',
    shortDescription: 'Classic brilliant-cut diamonds in secure four-prong settings.',
    isNew: false,
    isBestSeller: true,
    availableSizes: ['One Size']
  },
  {
    id: '8',
    name: 'Wedding Band Set',
    price: 3799.99,
    images: [
      'https://images.pexels.com/photos/6063708/pexels-photo-6063708.jpeg',
      'https://images.pexels.com/photos/6063713/pexels-photo-6063713.jpeg',
      'https://images.pexels.com/photos/6063714/pexels-photo-6063714.jpeg'
    ],
    category: 'Rings',
    collection: 'Wedding',
    metalType: ['White Gold', 'Platinum', 'Yellow Gold'],
    description: 'Celebrate your union with our matching Wedding Band Set. Crafted with precision and care, these bands feature a comfort-fit interior and your choice of finish. The bride\'s band includes pavé-set diamonds that catch the light with every movement, while the groom\'s band offers a coordinating design in a wider width.',
    shortDescription: 'Matching wedding bands with comfort-fit design.',
    isNew: true,
    isBestSeller: false,
    availableSizes: ['4-12 (in 0.5 size increments)']
  }
];

// Helper function to get products by filter
export const getFilteredProducts = (
  collection?: string,
  category?: string,
  isBestSeller?: boolean,
  isNew?: boolean,
  priceRange?: [number, number],
  metalType?: string
): Product[] => {
  return products.filter(product => {
    if (collection && product.collection !== collection) return false;
    if (category && product.category !== category) return false;
    if (isBestSeller === true && !product.isBestSeller) return false;
    if (isNew === true && !product.isNew) return false;
    if (priceRange && (product.price < priceRange[0] || product.price > priceRange[1])) return false;
    if (metalType && !product.metalType.includes(metalType)) return false;
    return true;
  });
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product): Product[] => {
  return products.filter(p => 
    p.id !== product.id && 
    (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);
};