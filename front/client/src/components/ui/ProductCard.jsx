import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext'; 
import Button from './Button'; 
import { useFetch } from '../../context/FetchContext';

const ProductCard = ({ product }) => { 
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { callFetch } = useFetch();
  const isWishlisted = isInWishlist(product.id);

  const handleWishlistToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      await callFetch(removeFromWishlist(product.id));
    } else {
      await callFetch(addToWishlist(product));
    }
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Product Badge */}
      {product.isNew && (
        <div className="absolute top-2 left-2 z-10 bg-[#1A237E] text-white text-xs font-bold px-2 py-1 rounded">
          New
        </div>
      )}
      {product.isBestSeller && !product.isNew && (
        <div className="absolute top-2 left-2 z-10 bg-[#D4AF37] text-white text-xs font-bold px-2 py-1 rounded">
          Best Seller
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
      >
        <Heart
          size={18}
          className={`transition-colors ${isWishlisted ? 'fill-[#800020] text-[#800020]' : 'text-gray-600'}`}
        />
      </button>

      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          {/* Assumes product.images is an array and product.name is a string */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`} className="block">
          {/* Assumes product.name, product.category, product.price exist */}
          <h3 className="text-gray-800 font-semibold mb-1 hover:text-[#D4AF37] transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="font-medium text-gray-900 mb-3">Rs. {product.price.toLocaleString()}</p>
        </Link>

        <Link to={`/product/${product.id}`}>
          <Button variant="outline" fullWidth>
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;