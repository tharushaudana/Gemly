import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

const AccountWishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  
  const handleAddToCart = (productId: string) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      addToCart(product, 1, product.metalType[0], product.availableSizes[0]);
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromWishlist(productId);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">My Wishlist</h2>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlistItems.map(item => (
            <div key={item.id} className="border rounded-md p-4">
              <div className="flex gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                
                <div className="flex-grow">
                  <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-[#D4AF37]">
                    {item.name}
                  </Link>
                  
                  <div className="text-sm text-gray-600 mt-1">
                    <span>{item.category}</span>
                  </div>
                  
                  <div className="font-medium text-gray-900 mt-1">${item.price.toLocaleString()}</div>
                  
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleAddToCart(item.id)}
                      disabled={isInCart(item.id)}
                      className="text-xs"
                    >
                      {isInCart(item.id) ? 'Added to Cart' : 'Add to Cart'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-xs"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">
            You haven't added any items to your wishlist yet. Explore our collections to find something you'll love.
          </p>
          <Link to="/products">
            <Button variant="primary">
              Browse Products
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccountWishlist;