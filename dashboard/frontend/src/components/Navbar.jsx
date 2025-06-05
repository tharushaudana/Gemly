import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <header className="bg-white h-16 shadow-sm z-10 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center">
        <h1 className="text-lg md:text-xl font-semibold text-secondary-900">Admin Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center">
          <span className="text-secondary-700 mr-2">Admin User</span>
          <div className="bg-primary-100 rounded-full p-1">
            <User className="h-6 w-6 text-primary-700" />
          </div>
        </div>
        
        <button 
          onClick={logout}
          className="p-1 rounded-full hover:bg-secondary-100 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 text-secondary-700" />
        </button>
      </div>
    </header>
  );
};

export default Navbar