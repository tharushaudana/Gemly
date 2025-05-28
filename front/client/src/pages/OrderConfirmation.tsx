import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Calendar, Truck } from 'lucide-react';

import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const OrderConfirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Get order details from location state
  const orderId = location.state?.orderId || 'ORD-123456789';
  const orderTotal = location.state?.orderTotal || 0;
  
  // If user manually navigated to this page without an order, redirect to home
  React.useEffect(() => {
    if (!location.state?.orderId) {
      navigate('/');
    }
  }, [location.state, navigate]);
  
  // Generate a random delivery date (5-7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 5);
  
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mb-6">
              <CheckCircle size={64} className="mx-auto text-green-500" />
            </div>
            
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. We've received your order and will begin processing it right away.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">{orderId}</span>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Order Total:</span>
                <span className="font-medium">${orderTotal.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-medium">{formattedDeliveryDate}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-6">
              <h2 className="text-xl font-medium mb-4">What's Next?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Package size={20} className="text-[#D4AF37] mr-2" />
                    <span className="font-medium">Order Processing</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    We're preparing your items for shipment. You'll receive an email once your order ships.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Truck size={20} className="text-[#D4AF37] mr-2" />
                    <span className="font-medium">Shipping</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your order will be carefully packaged and shipped via our premium delivery service.
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Calendar size={20} className="text-[#D4AF37] mr-2" />
                    <span className="font-medium">Delivery</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Expected delivery by {formattedDeliveryDate}. We'll keep you updated on your delivery status.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline">
                  Return to Homepage
                </Button>
              </Link>
              
              {isAuthenticated && (
                <Link to="/account/orders">
                  <Button variant="primary">
                    Track Your Order
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              If you have any questions about your order, please contact our customer service team.
            </p>
            <Link to="/contact" className="text-[#D4AF37] hover:underline">
              Contact Customer Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;