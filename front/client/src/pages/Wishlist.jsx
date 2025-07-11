import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

import Button from '../components/ui/Button';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { redirectToLogin } from '../utils/redirectToLogin';
import { useFetch } from '../context/FetchContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { callFetch } = useFetch();

  if (!isAuthenticated) {
    redirectToLogin();
  }

  const handleAddToCart = async (productId) => {
    const product = wishlistItems.find(item => item.id === productId);
    if (product) {
      await callFetch(addToCart(product, 1, product.metalType[0]));
    }
  };

  const handleRemoveItem = async (productId) => {
    await callFetch(removeFromWishlist(productId));
  };

  const handleClearWishlist = async () => {
    await callFetch(clearWishlist());
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif text-gray-900 mb-6">My Wishlist</h1>

        {wishlistItems.length > 0 ? (
          <>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              {/* Wishlist Header - Desktop */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="col-span-6">
                  <span className="font-medium text-gray-800">Product</span>
                </div>
                <div className="col-span-2 text-center">
                  <span className="font-medium text-gray-800">Price</span>
                </div>
                <div className="col-span-4 text-right">
                  <span className="font-medium text-gray-800">Actions</span>
                </div>
              </div>

              {/* Wishlist Items */}
              {/* Mapping over wishlistItems, item object structure is assumed */}
              {wishlistItems.map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-0">
                  {/* Mobile Layout */}
                  <div className="md:hidden p-4">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-24 h-24 flex-shrink-0">
                        {/* Accessing array element and object property */}
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        {/* Using item.id for link */}
                        <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-[#D4AF37]">
                          {item.name}
                        </Link>

                        <div className="text-sm text-gray-600 mt-1">
                          {/* Accessing properties and using join method */}
                          <span>{item.category} • {item.metalType.join(', ')}</span>
                        </div>

                        {/* Accessing property and using toLocaleString */}
                        <div className="font-medium mt-2">${item.price.toLocaleString()}</div>

                        <div className="flex gap-2 mt-3">
                          {isInCart(item.id) && (
                            <span className="px-2 py-1 text-xs font-medium text-white bg-[#D4AF37] rounded flex items-center">
                              Added to Cart
                            </span>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            // Calling function with item.id
                            onClick={() => handleRemoveItem(item.id)}
                            className="flex-shrink-0"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 items-center">
                    {/* Product */}
                    <div className="col-span-6">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 flex-shrink-0">
                          {/* Accessing array element and object property */}
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div>
                          {/* Using item.id for link */}
                          <Link to={`/product/${item.id}`} className="font-medium text-gray-900 hover:text-[#D4AF37]">
                            {item.name}
                          </Link>
                          <div className="text-sm text-gray-600 mt-1">
                            {/* Accessing properties and using join method */}
                            <span>{item.category} • {item.metalType.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="col-span-2 text-center">
                      {/* Accessing property and using toLocaleString */}
                      <span>Rs. {item.price.toLocaleString()}</span>
                    </div>


                    <div className="col-span-4 text-right flex justify-end items-center gap-3">
                      {isInCart(item.id) && (
                        <span className="px-2 py-1 text-xs font-medium text-white bg-[#D4AF37] rounded flex items-center">
                          Added to Cart
                        </span>
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        // Calling function with item.id
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link to="/products" className="flex items-center text-[#D4AF37] hover:underline">
                <ArrowLeft size={16} className="mr-2" />
                Continue Shopping
              </Link>

              <Button
                variant="outline"
                // Calling the clearWishlist function from the hook
                onClick={handleClearWishlist}
                className="text-gray-700"
              >
                Clear Wishlist
              </Button>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any items to your wishlist yet. Explore our collections to find something you'll love.
            </p>
            <Link to="/products">
              <Button variant="primary">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;