import React from 'react';
import { useProducts } from '../context/ProductContext';
import StatsCard from '../components/StatsCard';
import { Package, ShoppingBag, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { getProductStats } = useProducts();
  const stats = getProductStats();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary-900">Welcome Admin</h1>
        <p className="text-secondary-600 mt-1">Here's an overview of your jewelry inventory</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Products" 
          value={stats.total} 
          icon={<Package className="h-6 w-6" />} 
          color="gold"
        />
        
        <StatsCard 
          title="In Stock Products" 
          value={stats.inStock} 
          icon={<ShoppingBag className="h-6 w-6" />} 
          color="green"
        />
        
        <StatsCard 
          title="Out of Stock Products" 
          value={stats.outOfStock} 
          icon={<AlertTriangle className="h-6 w-6" />} 
          color="red"
        />
      </div>
      
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/products" className="card bg-secondary-900 hover:bg-secondary-800 text-white transition-colors duration-300">
            <h3 className="text-lg font-medium">View All Products</h3>
            <p className="mt-2 text-secondary-300 text-sm">Manage your existing inventory</p>
          </Link>
          
          <Link to="/products/add" className="card bg-primary-500 hover:bg-primary-600 text-white transition-colors duration-300">
            <h3 className="text-lg font-medium">Add New Product</h3>
            <p className="mt-2 text-primary-100 text-sm">Create a new jewelry listing</p>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity (could be implemented with actual data in a real app) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-secondary-900 mb-4">System Status</h2>
        <div className="card">
          <div className="flex items-center justify-between">
            <p className="text-secondary-600">System is operational</p>
            <span className="inline-flex h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <p className="mt-4 text-sm text-secondary-500">Last updated: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;