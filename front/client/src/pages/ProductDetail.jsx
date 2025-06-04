import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Minus, Plus, Heart, ShoppingBag, Check } from 'lucide-react';

import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
// Assuming getProductById and getRelatedProducts are exported from a JS/TS file
import { getProductById, getRelatedProducts } from '../data/products';
// Assuming useCart and useWishlist are standard React hooks from JS/TS context files
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import AsyncWrapper from '../components/AsyncWrapper';
import { fetchWithError } from '../utils/fetchWithError';
import { useMemo } from 'react';

// Remove the React.FC type annotation
const ProductDetail = () => {
  // Remove the type assertion <{ id: string }>
  const { id } = useParams();
  const navigate = useNavigate();
  // Hook usage is the same in JS
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // The logic for fetching product data remains the same
  // const product = id ? getProductById(id) : null;
  const relatedProducts = [];

  const [product, setProduct] = useState(null);

  // Remove type annotations from useState calls
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  // Optional chaining is valid in JS
  const [selectedMetalType, setSelectedMetalType] = useState(product?.metalType[0] || '');
  const [addedToCart, setAddedToCart] = useState(false);

  // Handle case where product is not found - JSX is the same
  // if (!product) {
  //   return (
  //     <div className="pt-24 pb-16">
  //       <div className="container mx-auto px-4">
  //         <div className="bg-white rounded-lg shadow-sm p-8 text-center">
  //           <h1 className="text-2xl font-medium mb-4">Product Not Found</h1>
  //           <p className="text-gray-600 mb-6">
  //             The product you're looking for doesn't exist or has been removed.
  //           </p>
  //           <Button variant="primary" onClick={() => navigate('/products')}>
  //             Back to Products
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Logic to check wishlist status remains the same
  // const isProductInWishlist = isInWishlist(product.id);
  const isProductInWishlist = false;

  // Handle quantity change - remove type annotation 'amount: number'
  const handleQuantityChange = (amount) => {
    setQuantity(Math.max(1, quantity + amount));
  };

  // Handle add to cart - logic remains the same
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedMetalType, 0);
    setAddedToCart(true);

    // Reset addedToCart flag after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  // Handle wishlist toggle - logic remains the same
  const handleWishlistToggle = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleOnSuccess = (productData) => {
    setProduct(productData);
  };

  const promises = useMemo(() => [
    () => fetchWithError(fetch(`http://localhost:3000/products/${id}`)),
  ], []);

  // JSX structure remains the same
  return (
    <AsyncWrapper
      promises={promises}
      onSuccess={handleOnSuccess}
    >
      {product && (
        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <div className="mb-6">
              <nav className="flex text-sm">
                <Link to="/" className="text-gray-500 hover:text-[#D4AF37]">Home</Link>
                <ChevronRight size={16} className="mx-2 text-gray-400" />
                <Link to="/products" className="text-gray-500 hover:text-[#D4AF37]">Products</Link>
                <ChevronRight size={16} className="mx-2 text-gray-400" />
                <span className="text-gray-900">{product.name}</span>
              </nav>
            </div>

            {/* Product Detail */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Product Images */}
              <div>
                <div className="aspect-square bg-white rounded-lg overflow-hidden mb-4">
                  <img
                    src={product.images[activeImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Thumbnail Images */}
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`aspect-square rounded overflow-hidden border-2 ${activeImage === index ? 'border-[#D4AF37]' : 'border-transparent'
                        }`}
                    >
                      <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                {/* Badges */}
                <div className="flex gap-2 mb-3">
                  {product.isNew && (
                    <span className="bg-[#1A237E] text-white text-xs font-bold px-2 py-1 rounded">
                      New
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="bg-[#D4AF37] text-white text-xs font-bold px-2 py-1 rounded">
                      Best Seller
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-serif text-gray-900 mb-2">{product.name}</h1>
                {/* Assuming product.price is a number */}
                <p className="text-2xl font-medium text-gray-900 mb-4">${product.price.toLocaleString()}</p>

                <p className="text-gray-600 mb-6">{product.shortDescription}</p>

                {/* Metal Type Selection */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Metal Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {/* Assuming product.metalType is an array */}
                    {product.metalType.map(metal => (
                      <button
                        key={metal}
                        onClick={() => setSelectedMetalType(metal)}
                        className={`px-4 py-2 border rounded-md ${selectedMetalType === metal
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                            : 'border-gray-300 text-gray-700 hover:border-[#D4AF37]'
                          }`}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 border-t border-b border-gray-300 min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    className="flex items-center justify-center gap-2"
                  >
                    {addedToCart ? (
                      <>
                        <Check size={18} />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} />
                        Add to Cart
                      </>
                    )}
                  </Button>

                  <Button
                    variant={isProductInWishlist ? 'primary' : 'outline'}
                    size="lg"
                    fullWidth
                    onClick={handleWishlistToggle}
                    className={`flex items-center justify-center gap-2 ${isProductInWishlist ? 'bg-[#800020] border-[#800020] hover:bg-[#6A001A]' : ''
                      }`}
                  >
                    <Heart size={18} className={isProductInWishlist ? 'fill-white' : ''} />
                    {isProductInWishlist ? 'Added to Wishlist' : 'Add to Wishlist'}
                  </Button>
                </div>

                {/* Product Details */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium mb-3">Product Details</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>

                  {/* Assuming product.category and product.collection exist */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-800">Category:</span> {product.category.name}
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Collection:</span> {product.collection.name}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h2 className="text-2xl font-serif text-gray-900 mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* ProductCard component is assumed to work correctly in JS */}
                  {relatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AsyncWrapper>
  );
};

export default ProductDetail;