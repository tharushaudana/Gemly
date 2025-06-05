import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../context/FetchContext';
import { fetchWithError } from '../utils/fetchWithError';

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated, token, serverParams } = useAuth();
  const { callFetch } = useFetch();
  const navigate = useNavigate();

  const [selectedAddressId, setSelectedAddressId] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load the PayHere script once when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.payhere.lk/lib/payhere.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: '/checkout' } });
    }

    if (user && user.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      setSelectedAddressId(defaultAddress?.id || user.addresses[0].id);
    } else {
      setUseExistingAddress(false);
    }
  }, [cartItems.length, isAuthenticated, navigate, user]);

  const openPayherePopup = (paymentRequest) => {
    window.payhere.onCompleted = (orderId) => {
      console.log('Payment completed. OrderID:', orderId);
    };

    window.payhere.onDismissed = () => {
      console.log('Payment dismissed');
    };

    window.payhere.onError = (error) => {
      console.error('Payment error:', error);
    };

    // Start payment
    window.payhere.startPayment(paymentRequest);
  }

  const createCheckoutSession = async () => {
    try {
      const response = await fetchWithError(
        fetch('http://localhost:3000/checkout/create-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            addressId: selectedAddressId
          })
        })
      );
      
      openPayherePopup(response.paymentRequest);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      setErrors({ checkout: 'An error occurred while processing your order. Please try again.' });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({}); // Reset errors
    setIsSubmitting(true);

    await callFetch(createCheckoutSession());

    setIsSubmitting(false);

    // setTimeout(() => {
    //   // Clear the cart and navigate to the confirmation page
    //   clearCart();
    //   navigate('/order-confirmation', {
    //     state: {
    //       orderId: 'ORD-' + Date.now().toString().substring(5), // Simple client-side ID
    //       orderTotal: orderTotal.toFixed(2) // Pass the calculated total
    //     }
    //   });

    //   setIsSubmitting(false);
    // }, 1500);
  };

  const subtotal = getTotalPrice();
  const orderTotal = subtotal;

  // Check if user is loaded and has addresses before rendering the existing address section
  const hasExistingAddresses = user && user.addresses && user.addresses.length > 0;

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif text-gray-900 mb-6">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Shipping Address</h2>

                {/* Conditionally render the existing address option */}
                {hasExistingAddresses ? (
                  <div className="mb-6">
                    <div className="space-y-4">
                      {user.addresses.map(address => (
                        <label key={address.id} className="flex items-start p-3 border rounded-md cursor-pointer hover:border-[#D4AF37] transition-colors">
                          <input
                            type="radio"
                            name="address"
                            value={address.id}
                            checked={selectedAddressId === address.id}
                            onChange={() => setSelectedAddressId(address.id)}
                            className="h-4 w-4 mt-1 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          <div className="ml-3">
                            <p className="font-medium">{address.name}</p>
                            <p className="text-gray-600">{address.street}</p>
                            <p className="text-gray-600">
                              {address.city}, {address.state} {address.zip}
                            </p>
                            <p className="text-gray-600">{address.country}</p>
                            {address.isDefault && (
                              <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                                Default Address
                              </span>
                            )}
                          </div>
                        </label>
                      ))}

                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-red-600">No saved addresses found. Please add an address in your account settings.</p>
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Method</h2>
                <a href="https://www.payhere.lk/" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 mb-4 block">
                  <img src="https://payherestorage.blob.core.windows.net/payhere-resources/www/images/PayHere-Logo.png" alt="PayHere Logo" className="w-32 mb-4" />
                </a>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              {/* Added mt-8 for small screens to give space */}
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 mt-8 lg:mt-0">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>

                <div className="max-h-80 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
                    // Assuming item structure has product.id, metalType, size, product.images[0], product.name, quantity, product.price
                    <div key={`${item.product.id}-${item.metalType}-${item.size}`} className="flex py-3 border-b border-gray-200 last:border-0">
                      <div className="w-16 h-16 flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-3 flex-grow">
                        <p className="font-medium text-sm">{item.product.name}</p>
                        {/* Check if metalType or size exist before displaying */}
                        {(item.metalType || item.size !== 'One Size') && (
                          <p className="text-xs text-gray-500">
                            {item.metalType && `${item.metalType}`}
                            {item.metalType && item.size !== 'One Size' && ' / '}
                            {item.size !== 'One Size' && `Size ${item.size}`}
                          </p>
                        )}
                        <div className="flex justify-between mt-1">
                          {/* Use toLocaleString for currency formatting */}
                          <span className="text-sm">{item.quantity} × ${item.product.price.toLocaleString()}</span>
                          <span className="font-medium">${(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    {/* Use toLocaleString for currency formatting */}
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-lg">Total</span>
                      {/* Format total amount to 2 decimal places */}
                      <span className="font-medium text-lg">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>


                {orderTotal > serverParams.payhereMaxAmount ? (
                  <div className="mt-4 text-center text-sm text-red-600">
                    The total amount exceeds <b>Rs. {serverParams.payhereMaxAmount}</b> You cannot place the order online—please visit our shop to complete the purchase.
                  </div>
                ) : (
                  <>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isSubmitting}
                      disabled={cartItems.length === 0 || isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Pay Now'}
                    </Button>
                    {errors.checkout && (
                      <p className="text-red-500 text-sm mt-1">{errors.checkout}</p>
                    )}
                    <div className="mt-4 text-center text-xs text-gray-500">
                      By placing your order, you agree to our Terms of Service and Privacy Policy.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;