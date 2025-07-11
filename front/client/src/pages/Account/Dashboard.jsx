import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { User, Package, Heart, LogOut } from 'lucide-react';
// Assuming useAuth is a standard React context hook (JS or TS, but usage is JS)
import { useAuth } from '../../context/AuthContext';

// Removed the : React.FC type annotation
const Dashboard = () => {
  // Destructuring from useAuth hook is standard JS/React
  const { user, logout } = useAuth();
  const location = useLocation();

  // Define navigation items - this is a standard JS array
  const navItems = [
    { path: '/account', icon: <User size={18} />, label: 'Profile' },
    { path: '/account/orders', icon: <Package size={18} />, label: 'Orders' },
    // Removed the Wishlist item as it was commented out in the TS version.
    // { path: '/account/wishlist', icon: <Heart size={18} />, label: 'Wishlist' },
  ];

  // Check if the current path matches the nav item path - standard JS logic
  const isActiveRoute = (path) => {
    if (path === '/account') {
      return location.pathname === '/account';
    }
    // Checking if the pathname starts with the path
    return location.pathname.startsWith(path);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif text-gray-900 mb-6">My Account</h1>

        {/* Conditional rendering based on user object */}
        {user ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Display user info */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="w-10 h-10 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                    {/* Accessing user properties assumes they exist, typical in JS */}
                    <span className="text-[#D4AF37] font-medium">
                      {user.name ? user.name.charAt(0).toUpperCase() : ''}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                {/* Navigation links */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      // Class names are dynamically determined based on active route
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-md
                        ${isActiveRoute(item.path)
                          ? 'bg-[#D4AF37]/10 text-[#D4AF37]'
                          : 'text-gray-700 hover:bg-gray-100'}
                      `}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}

                  {/* Sign out button */}
                  <button
                    onClick={logout} // onClick handler calls the logout function
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content Area rendered by react-router-dom's Outlet */}
            <div className="lg:col-span-3">
              <Outlet />
            </div>
          </div>
        ) : (
          /* Content displayed when user is not logged in */
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-xl font-medium mb-2">Please sign in</h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to view your account information.
            </p>
            <Link to="/login" className="bg-[#D4AF37] text-white px-4 py-2 rounded-md hover:bg-[#C19B22]">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;