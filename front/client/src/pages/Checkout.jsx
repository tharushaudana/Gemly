import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check } from 'lucide-react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
// Removed: import { Address } from '../types'; - Types are not needed in JS

// Removed: : React.FC
const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  // user object is assumed to have addresses property based on useAuth context
  const { user, isAuthenticated, addAddress } = useAuth();
  const navigate = useNavigate();

  // State for address selection/input - removed type annotations
  const [useExistingAddress, setUseExistingAddress] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  // New address form state - removed type annotation <Omit<Address, 'id'>>
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    isDefault: false
  });

  // Payment state - removed type annotation <'creditCard' | 'paypal'>
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [saveAddress, setSaveAddress] = useState(false);

  // Form validation state - removed type annotation <Record<string, string>>
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if cart is empty or user is not authenticated
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }

    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: '/checkout' } });
    }

    // Set default selected address if user has addresses
    // Check if user exists and has addresses property which is an array
    if (user && user.addresses && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      setSelectedAddressId(defaultAddress?.id || user.addresses[0].id);
    } else {
      // If no user or no addresses, default to entering a new address
      setUseExistingAddress(false);
    }
  }, [cartItems.length, isAuthenticated, navigate, user]);

  // Handle input change for new address form - removed type annotation for e
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Credit card state (simplified for validation in JS example)
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // Validate form - removed return type annotation
  const validateForm = () => {
    // Initializing newErrors as an empty object is sufficient in JS
    const newErrors = {};

    if (!useExistingAddress) {
      // Validate new address fields
      if (!newAddress.name.trim()) newErrors.name = 'Name is required';
      if (!newAddress.street.trim()) newErrors.street = 'Street address is required';
      if (!newAddress.city.trim()) newErrors.city = 'City is required';
      if (!newAddress.state.trim()) newErrors.state = 'State is required';
      if (!newAddress.zip.trim()) newErrors.zip = 'ZIP code is required';
      if (!newAddress.country.trim()) newErrors.country = 'Country is required';
    } else if (!selectedAddressId && user && user.addresses && user.addresses.length > 0) {
       // Only require selection if existing addresses are available
      newErrors.address = 'Please select an address';
    } else if (useExistingAddress && (!user || !user.addresses || user.addresses.length === 0)) {
      // This case shouldn't happen due to the useEffect logic setting useExistingAddress to false,
      // but added for robustness if component is rendered in unexpected state.
       newErrors.address = 'No existing addresses available. Please enter a new address.';
    }


    // Validate payment (would add more detailed validation in a real app)
    if (paymentMethod === 'creditCard') {
      // Simplified validation - would be more extensive in a real app
      if (!cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!cardName.trim()) newErrors.cardName = 'Name on card is required';
      if (!expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!cvv.trim()) newErrors.cvv = 'Security code is required';
    }

    setErrors(newErrors);
    // Standard JS way to check if an object has any keys (errors)
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission - removed type annotation for e
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log('Validation failed', errors); // Log errors for debugging
      return;
    }

    setIsSubmitting(true);

    // In a real app, this would make an API call to process the order
    setTimeout(() => {
      // If saving address is checked and it's a new address, add it to the user's addresses
      if (!useExistingAddress && saveAddress && user && addAddress) {
        // Need to ensure addAddress function exists on user/auth context
         // Generate a simple temporary ID for the new address before adding (in a real app, backend provides ID)
         const addressToAdd = { ...newAddress, id: 'addr-' + Date.now() };
         addAddress(addressToAdd);
      }

      // Clear the cart and navigate to the confirmation page
      clearCart();
      navigate('/order-confirmation', {
        state: {
          orderId: 'ORD-' + Date.now().toString().substring(5), // Simple client-side ID
          orderTotal: orderTotal.toFixed(2) // Pass the calculated total
        }
      });

      setIsSubmitting(false);
    }, 1500);
  };

  // Shipping cost calculation (simplified)
  const shippingCost = cartItems.length > 0 ? 15 : 0;
  const taxRate = 0.07; // 7% tax rate
  const subtotal = getTotalPrice();
  const taxAmount = subtotal * taxRate;
  const orderTotal = subtotal + shippingCost + taxAmount;

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
                {hasExistingAddresses && (
                  <div className="mb-6">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="use-existing-address"
                        name="address-type"
                        checked={useExistingAddress}
                        onChange={() => setUseExistingAddress(true)}
                        className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <label htmlFor="use-existing-address" className="ml-2 font-medium">
                        Use an existing address
                      </label>
                    </div>

                    {useExistingAddress && (
                      <div className="ml-6 space-y-4">
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
                    )}
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    id="use-new-address"
                    name="address-type"
                    checked={!useExistingAddress}
                    onChange={() => setUseExistingAddress(false)}
                    className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <label htmlFor="use-new-address" className="ml-2 font-medium">
                    {hasExistingAddresses // Use the checked flag here
                      ? 'Use a new address'
                      : 'Enter shipping address'}
                  </label>
                </div>

                {!useExistingAddress && (
                  <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Input
                        label="Full Name"
                        name="name"
                        value={newAddress.name}
                        onChange={handleAddressChange}
                        error={errors.name}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Input
                        label="Street Address"
                        name="street"
                        value={newAddress.street}
                        onChange={handleAddressChange}
                        error={errors.street}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        label="City"
                        name="city"
                        value={newAddress.city}
                        onChange={handleAddressChange}
                        error={errors.city}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        label="State / Province"
                        name="state"
                        value={newAddress.state}
                        onChange={handleAddressChange}
                        error={errors.state}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        label="ZIP / Postal Code"
                        name="zip"
                        value={newAddress.zip}
                        onChange={handleAddressChange}
                        error={errors.zip}
                        required
                      />
                    </div>

                    <div>
                      <Input
                        label="Country"
                        name="country"
                        value={newAddress.country}
                        onChange={handleAddressChange}
                        error={errors.country}
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                       {/* Only show Save address option if user is authenticated */}
                       {isAuthenticated && (
                          <>
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={saveAddress}
                                onChange={() => setSaveAddress(!saveAddress)}
                                className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                              />
                              <span className="ml-2 text-sm text-gray-600">
                                Save this address for future orders
                              </span>
                            </label>

                            {saveAddress && (
                              <label className="flex items-center mt-2">
                                <input
                                  type="checkbox"
                                  checked={newAddress.isDefault}
                                  onChange={() => setNewAddress(prev => ({ ...prev, isDefault: !prev.isDefault }))}
                                  className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37] rounded"
                                />
                                <span className="ml-2 text-sm text-gray-600">
                                  Set as default address
                                </span>
                              </label>
                            )}
                          </>
                       )}
                    </div>
                  </div>
                )}
                 {/* Display a general address validation error if needed */}
                 {errors.address && (
                   <p className="text-red-500 text-sm mt-4">{errors.address}</p>
                 )}
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Payment Method</h2>

                <div className="space-y-4 mb-6">
                  {/* Credit Card Option */}
                  <label className="flex items-start p-3 border rounded-md cursor-pointer hover:border-[#D4AF37] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="creditCard"
                      checked={paymentMethod === 'creditCard'}
                      onChange={() => setPaymentMethod('creditCard')}
                      className="h-4 w-4 mt-1 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <div className="ml-3 flex-grow">
                      <div className="flex justify-between">
                        <p className="font-medium">Credit Card</p>
                        <div className="flex gap-2">
                           {/* Placeholder icons for card types */}
                          <span className="inline-block w-10 h-6 bg-gray-200 rounded"></span> {/* Visa */}
                          <span className="inline-block w-10 h-6 bg-gray-200 rounded"></span> {/* Mastercard */}
                          <span className="inline-block w-10 h-6 bg-gray-200 rounded"></span> {/* Amex */}
                        </div>
                      </div>

                      {paymentMethod === 'creditCard' && (
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <Input
                              label="Card Number"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="0000 0000 0000 0000"
                              error={errors.cardNumber}
                              required // Added required attribute for basic browser validation too
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Input
                              label="Name on Card"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              error={errors.cardName}
                               required // Added required attribute
                            />
                          </div>

                          <div>
                            <Input
                              label="Expiry Date"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              placeholder="MM/YY"
                              error={errors.expiryDate}
                               required // Added required attribute
                            />
                          </div>

                          <div>
                            <Input
                              label="Security Code (CVV)"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              placeholder="123"
                              error={errors.cvv}
                               required // Added required attribute
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* PayPal Option */}
                  <label className="flex items-center p-3 border rounded-md cursor-pointer hover:border-[#D4AF37] transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={() => setPaymentMethod('paypal')}
                      className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <div className="ml-3 flex justify-between flex-grow">
                      <p className="font-medium">PayPal</p>
                      {/* Placeholder icon for PayPal */}
                      <span className="inline-block w-16 h-6 bg-gray-200 rounded"></span>
                    </div>
                  </label>
                </div>
                 {/* Display a general payment validation error if needed */}
                 {errors.payment && ( // Although current validateForm doesn't set 'payment' error, good practice
                   <p className="text-red-500 text-sm mt-4">{errors.payment}</p>
                 )}
                  {errors.cardNumber && paymentMethod === 'creditCard' && ( // Example: Display card specific error if no general one
                     <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                  )}
                  {errors.cardName && paymentMethod === 'creditCard' && (
                     <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                  )}
                   {errors.expiryDate && paymentMethod === 'creditCard' && (
                      <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                   )}
                   {errors.cvv && paymentMethod === 'creditCard' && (
                      <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                   )}
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
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax ({(taxRate * 100).toFixed(0)}%)</span>
                     {/* Format tax amount to 2 decimal places */}
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-lg">Total</span>
                       {/* Format total amount to 2 decimal places */}
                      <span className="font-medium text-lg">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Disable button if cart is empty or submitting */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
                  disabled={cartItems.length === 0 || isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Complete Order'}
                </Button>

                <div className="mt-4 text-center text-xs text-gray-500">
                  By placing your order, you agree to our Terms of Service and Privacy Policy.
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;