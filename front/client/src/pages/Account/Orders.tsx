import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, Eye } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

const Orders: React.FC = () => {
  const { orders } = useAuth();
  
  // Helper function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-6">Order History</h2>
        
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="border rounded-md overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Order Number</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Date Placed</p>
                    <p className="font-medium">
                      {new Date(order.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Total Amount</p>
                    <p className="font-medium">${order.total.toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-medium text-gray-900 hover:text-[#D4AF37]"
                          >
                            {item.product.name}
                          </Link>
                          
                          <div className="text-sm text-gray-600 mt-1">
                            <span>Metal: {item.metalType}</span>
                            {item.size !== 'One Size' && (
                              <span className="ml-2">Size: {item.size}</span>
                            )}
                          </div>
                          
                          <div className="text-sm text-gray-600 mt-1">
                            <span>Quantity: {item.quantity}</span>
                            <span className="ml-3">Price: ${item.product.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Order Actions */}
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
                    <div>
                      <p className="text-sm text-gray-600">
                        Shipped to: {order.shippingAddress.name}
                      </p>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                      >
                        <Eye size={16} />
                        View Details
                      </Button>
                      
                      {order.status === 'delivered' && (
                        <Button variant="outline" size="sm">
                          Buy Again
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-md">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No orders yet</h3>
            <p className="text-gray-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to="/products">
              <Button variant="primary">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;