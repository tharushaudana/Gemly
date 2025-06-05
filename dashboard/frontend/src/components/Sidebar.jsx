import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Package, PlusCircle, Diamond } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="bg-secondary-900 text-white w-16 md:w-64 flex flex-col transition-all duration-300 ease-in-out">
      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start p-4 h-16 border-b border-secondary-800">
        <Diamond className="h-8 w-8 text-primary-500" />
        <span className="hidden md:block ml-2 text-lg font-semibold text-primary-500">Luxury Jewels</span>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-1 mt-6 px-2">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `sidebar-link mb-1 ${isActive ? 'active' : ''}`
          }
          end
        >
          <Home className="w-5 h-5 mr-3" />
          <span className="hidden md:block">Dashboard</span>
        </NavLink>
        
        <NavLink 
          to="/products" 
          className={({ isActive }) => 
            `sidebar-link mb-1 ${isActive ? 'active' : ''}`
          }
          end
        >
          <Package className="w-5 h-5 mr-3" />
          <span className="hidden md:block">Products</span>
        </NavLink>
        
        <NavLink 
          to="/products/add" 
          className={({ isActive }) => 
            `sidebar-link mb-1 ${isActive ? 'active' : ''}`
          }
        >
          <PlusCircle className="w-5 h-5 mr-3" />
          <span className="hidden md:block">Add Product</span>
        </NavLink>
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-secondary-800 text-xs text-secondary-400 hidden md:block">
        <p>Admin Dashboard v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;