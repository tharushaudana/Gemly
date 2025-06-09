import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const CollectionCard = ({ collection }) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md group">
      {/* Collection Image */}
      <div className="aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] relative">
        <img
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
        <p className="text-sm mb-4">{collection._count.products} Products</p>

        {/* Link to collection details page */}
        <Link to={`/products?collection=${collection.name}`}>
          <Button variant="primary2" size="sm" className="bg-white">
            View Collection
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CollectionCard;