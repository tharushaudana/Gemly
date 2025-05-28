import { Collection } from '../types';

export const collections: Collection[] = [
  {
    id: '1',
    name: 'Wedding',
    description: 'Celebrate your special day with our exquisite wedding collection. From engagement rings to wedding bands and bridal jewelry, find the perfect pieces to symbolize your eternal love.',
    image: 'https://images.pexels.com/photos/5702276/pexels-photo-5702276.jpeg',
    productCount: 24
  },
  {
    id: '2',
    name: 'Gold',
    description: 'Our gold collection features timeless pieces crafted from 18k solid gold. From chains and bracelets to statement earrings, these pieces showcase the warm, luxurious glow that only gold can provide.',
    image: 'https://images.pexels.com/photos/9428907/pexels-photo-9428907.jpeg',
    productCount: 36
  },
  {
    id: '3',
    name: 'Daily Wear',
    description: 'Elevate your everyday style with our daily wear collection. These versatile pieces transition seamlessly from day to night, adding a touch of luxury to any outfit.',
    image: 'https://images.pexels.com/photos/10952001/pexels-photo-10952001.jpeg',
    productCount: 42
  }
];

export const getCollectionById = (id: string): Collection | undefined => {
  return collections.find(collection => collection.id === id);
};