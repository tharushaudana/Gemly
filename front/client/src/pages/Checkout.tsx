import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Check } from 'lucide-react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Address } from '../types';

const Checkout: React.FC = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated, addAddress } = useAuth();
  const navigate = useNavigate();
  
  // State for address selection/input
  const [useExistingAddress, setUseExistingAddress] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  
  // New address form state
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    isDefault: false
  });
  
  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'paypal'>('creditCard');
  const [saveAddress, setSaveAddress] = useState(false);
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    if (user && user.addresses.length > 0) {
      const defaultAddress = user.addresses.find(addr => addr.isDefault);
      setSelectedAddressId(defaultAddress?.id || user.addresses[0].id);
    } else {
      setUseExistingAddress(false);
    }
  }, [cartItems.length, isAuthenticated, navigate, user]);
  
  // Handle input change for new address form
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  
  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!useExistingAddress) {
      // Validate new address fields
      if (!newAddress.name.trim()) newErrors.name = 'Name is required';
      if (!newAddress.street.trim()) newErrors.street = 'Street address is required';
      if (!newAddress.city.trim()) newErrors.city = 'City is required';
      if (!newAddress.state.trim()) newErrors.state = 'State is required';
      if (!newAddress.zip.trim()) newErrors.zip = 'ZIP code is required';
      if (!newAddress.country.trim()) newErrors.country = 'Country is required';
    } else if (!selectedAddressId) {
      newErrors.address = 'Please select an address';
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
    return Object.keys(newErrors).length === 0;
  };
  
  // Credit card state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, this would make an API call to process the order
    setTimeout(() => {
      // If saving address is checked, add it to the user's addresses
      if (!useExistingAddress && saveAddress) {
        addAddress(newAddress);
      }
      
      // Clear the cart and navigate to the confirmation page
      clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderId: 'ORD-' + Date.now().toString().substring(5),
          orderTotal: getTotalPrice()
        } 
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  // Shipping cost calculation (simplified)
  const shippingCost = cartItems.length > 0 ? 15 : 0;
  const taxRate = 0.07; // 7% tax rate
  const taxAmount = getTotalPrice() * taxRate;
  const orderTotal = getTotalPrice() + shippingCost + taxAmount;
  
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
                
                {user && user.addresses.length > 0 && (
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
                    {user && user.addresses.length > 0
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
                    </div>
                  </div>
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
                          <span className="inline-block w-10 h-6 bg-gray-200 rounded"></span>
                          <span className="inline-block w-10 h-6 bg-gray-200 rounded"></span>
                          <span className="inline-block w-10 h-6 bg-gray-200 rounded"></span>
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
                            />
                          </div>
                          
                          <div className="md:col-span-2">
                            <Input
                              label="Name on Card"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              error={errors.cardName}
                            />
                          </div>
                          
                          <div>
                            <Input
                              label="Expiry Date"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(e.target.value)}
                              placeholder="MM/YY"
                              error={errors.expiryDate}
                            />
                          </div>
                          
                          <div>
                            <Input
                              label="Security Code (CVV)"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              placeholder="123"
                              error={errors.cvv}
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
                      <span className="inline-block w-16 h-6 bg-gray-200 rounded"></span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-medium text-gray-900 mb-4">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-4">
                  {cartItems.map((item) => (
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
                        <p className="text-xs text-gray-500">
                          {item.metalType} {item.size !== 'One Size' ? `/ Size ${item.size}` : ''}
                        </p>
                        <div className="flex justify-between mt-1">
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
                    <span className="font-medium">${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shippingCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (7%)</span>
                    <span className="font-medium">${taxAmount.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-lg">Total</span>
                      <span className="font-medium text-lg">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  isLoading={isSubmitting}
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