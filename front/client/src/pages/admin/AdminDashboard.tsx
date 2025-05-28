import React, { useState } from 'react';
import { BarChart3, Package, Users, ShoppingBag, Plus, Edit, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import { products } from '../../data/products';
import { Order } from '../../types';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { orders } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'users'>('dashboard');
  
  // Dashboard metrics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalSales = orders.reduce((total, order) => total + order.total, 0);
  const totalUsers = 45; // Mock data
  
  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };
  
  // Render different tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'users':
        return renderUsers();
      default:
        return renderDashboard();
    }
  };
  
  // Dashboard tab content
  const renderDashboard = () => {
    return (
      <div>
        <h2 className="text-xl font-medium text-gray-900 mb-6">Dashboard Overview</h2>
        
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm">Total Products</h3>
              <div className="p-2 bg-blue-100 rounded-md">
                <ShoppingBag size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold">{totalProducts}</p>
            <p className="text-sm text-green-600 mt-2">+5% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm">Total Orders</h3>
              <div className="p-2 bg-purple-100 rounded-md">
                <Package size={20} className="text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold">{totalOrders}</p>
            <p className="text-sm text-green-600 mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm">Total Sales</h3>
              <div className="p-2 bg-green-100 rounded-md">
                <BarChart3 size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold">{formatCurrency(totalSales)}</p>
            <p className="text-sm text-green-600 mt-2">+8% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <div className="p-2 bg-orange-100 rounded-md">
                <Users size={20} className="text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-semibold">{totalUsers}</p>
            <p className="text-sm text-green-600 mt-2">+3% from last month</p>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recent Orders</h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-sm text-[#D4AF37] hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {order.shippingAddress.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                        ${order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : ''}
                        ${order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                      `}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Top Selling Products</h3>
            <button 
              onClick={() => setActiveTab('products')}
              className="text-sm text-[#D4AF37] hover:underline"
            >
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.filter(p => p.isBestSeller).slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded object-cover"
                            src={product.images[0]} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  // Products tab content
  const renderProducts = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Products Management</h2>
          <Button variant="primary" className="flex items-center gap-1">
            <Plus size={18} />
            Add Product
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collection
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img 
                            className="h-10 w-10 rounded object-cover"
                            src={product.images[0]} 
                            alt={product.name} 
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.category}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.collection}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        In Stock
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  // Orders tab content
  const renderOrders = () => {
    return (
      <div>
        <h2 className="text-xl font-medium text-gray-900 mb-6">Orders Management</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.shippingAddress.name}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.items.length}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <select 
                        className="text-sm rounded-md border-gray-300 shadow-sm focus:border-[#D4AF37] focus:ring focus:ring-[#D4AF37] focus:ring-opacity-50"
                        defaultValue={order.status}
                      >
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  // Users tab content
  const renderUsers = () => {
    // Mock user data
    const users = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Customer', status: 'Active', orders: 3 },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Customer', status: 'Active', orders: 2 },
      { id: 3, name: 'Michael Johnson', email: 'michael.j@example.com', role: 'Admin', status: 'Active', orders: 0 },
      { id: 4, name: 'Emily Williams', email: 'emily.w@example.com', role: 'Customer', status: 'Inactive', orders: 1 },
      { id: 5, name: 'Robert Brown', email: 'robert.b@example.com', role: 'Customer', status: 'Active', orders: 5 },
    ];
    
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium text-gray-900">Users Management</h2>
          <Button variant="primary" className="flex items-center gap-1">
            <Plus size={18} />
            Add User
          </Button>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-[#D4AF37]">
                            {user.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.orders}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif text-gray-900 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md w-full text-left
                    ${activeTab === 'dashboard'
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <BarChart3 size={20} />
                  <span>Dashboard</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('products')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md w-full text-left
                    ${activeTab === 'products'
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <ShoppingBag size={20} />
                  <span>Products</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md w-full text-left
                    ${activeTab === 'orders'
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <Package size={20} />
                  <span>Orders</span>
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md w-full text-left
                    ${activeTab === 'users'
                      ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <Users size={20} />
                  <span>Users</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="lg:col-span-4">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;