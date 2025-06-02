import React from 'react';
import { Link } from 'react-router-dom';
// Removed: import { Collection } from '../../types'; // Type import is not needed in JS
import Button from './Button';

// Removed: interface CollectionCardProps { collection: Collection; } // Interface is not needed in JS

// Removed: React.FC<CollectionCardProps> type annotation
const CollectionCard = ({ collection }) => {
  // The 'collection' prop is received directly via destructuring.
  // In JS, there's no compile-time check for its shape,
  // but the code assumes it has properties like image, name, description, productCount, id.
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md group">
      {/* Collection Image */}
      <div className="aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] relative">
        <img
          // Accessing properties of the collection object
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Collection Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
        <h3 className="text-xl sm:text-2xl font-serif mb-2">{collection.name}</h3>
        <p className="text-sm text-white/80 mb-4 line-clamp-2">{collection.description}</p>
        <p className="text-sm mb-4">{collection.productCount} Products</p>

        {/* Link to collection details page */}
        <Link to={`/collection/${collection.id}`}>
          <Button variant="primary" size="sm" className="bg-white/90 hover:bg-white text-[#1A237E]">
            View Collection
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;