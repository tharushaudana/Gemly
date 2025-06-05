import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { redirectToLogin } from '../utils/redirectToLogin';
import { useFetch } from '../context/FetchContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const { callFetch } = useFetch();

  const navigate = useNavigate();

  if (!isAuthenticated) {
    redirectToLogin();
  }

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = async (cartItemId) => {
    await callFetch(removeFromCart(cartItemId));
  };

  const handleCheckout = () => {
    // navigate('/checkout');
    // Used window.location.href to resync with server
    window.location.href = '/checkout';
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif text-gray-900 mb-6">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Cart Header - Desktop */}
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                  <div className="col-span-6">
                    <span className="font-medium text-gray-800">Product</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-gray-800">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium text-gray-800">Quantity</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="font-medium text-gray-800">Total</span>
                  </div>
                </div>

                {/* Cart Items  */}
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.metalType}-${item.size}`} className="border-b border-gray-200 last:border-0">
                    {/* Mobile Layout */}
                    <div className="md:hidden p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-grow">
                          {/* Link component is standard react-router-dom */}
                          <Link to={`/product/${item.product.id}`} className="font-medium text-gray-900 hover:text-[#D4AF37]">
                            {item.product.name}
                          </Link>

                          <div className="text-sm text-gray-600 mt-1">
                            <span>Metal: {item.metalType}</span>
                          </div>

                          <div className="flex justify-between items-center mt-2">
                            <span className="font-medium">${item.product.price.toLocaleString()}</span>

                            <div className="flex items-center">
                              <span className="w-10 h-8 flex items-center justify-center border border-gray-300">
                                {item.quantity}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <span className="font-medium">
                              Total: ${(item.product.price * item.quantity).toLocaleString()}
                            </span>

                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 p-1 hover:bg-red-50 rounded"
                              aria-label="Remove item"
                            >
                              <Trash2 size={18} />
                            </button>
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
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <Link to={`/product/${item.product.id}`} className="font-medium text-gray-900 hover:text-[#D4AF37]">
                              {item.product.name}
                            </Link>
                            <div className="text-sm text-gray-600 mt-1">
                              <span>Metal: {item.metalType}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center">
                        <span>${item.product.price.toLocaleString()}</span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-2">
                        <div className="flex items-center justify-center">
                          <span className="w-10 h-8 flex items-center justify-center border border-gray-300">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Total & Remove */}
                      <div className="col-span-2 text-right flex justify-end items-center gap-3">
                        <span className="font-medium">${(item.product.price * item.quantity).toLocaleString()}</span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-500 p-1 hover:bg-red-50 rounded"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-6">
                <Link to="/products" className="flex items-center text-[#D4AF37] hover:underline">
                  <ArrowLeft size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getTotalPrice().toLocaleString()}</span>
                  </div>

                  {/* Uncomment if you want */}
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div> */}

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-lg">Estimated Total</span>
                      <span className="font-medium text-lg">${getTotalPrice().toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>

                {/* Uncomment if you want */}
                {/* <div className="mt-4 text-center text-sm text-gray-500">
                  Shipping, taxes, and discounts will be calculated at checkout.
                </div> */}
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={24} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any items to your cart yet.
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

export default Cart;