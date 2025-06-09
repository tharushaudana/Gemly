import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, X, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { getTotalItems } = useCart();
  const { isAuthenticated } = useAuth();

  const cartItemCount = getTotalItems();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  var navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  if (isAuthenticated) {
    // push /foryour after /products
    const insertIndex = navLinks.findIndex(link => link.path === '/products');
    if (insertIndex !== -1) {
      navLinks.splice(insertIndex + 1, 0, { name: 'For You', path: '/foryou' });
    }
  }

  const navbarClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}
  `;

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);

    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location = `/products?search=${encodeURIComponent(searchTerm)}`;
      setIsSearchOpen(false);
    } else {
      window.location = `/products`;
    }
  };

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold text-gray-900">
            GEMLY
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  text-sm font-medium transition-colors
                  ${location.pathname === link.path
                    ? 'text-[#D4AF37]'
                    : isScrolled ? 'text-gray-800 hover:text-[#D4AF37]' : 'text-gray-800 hover:text-[#D4AF37]'}
                `}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-700" />
            </button>

            <Link
              to="/wishlist"
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Wishlist"
            >
              <Heart size={20} className="text-gray-700" />
            </Link>

            <Link
              to="/cart"
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} className="text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link
              to={isAuthenticated ? "/account" : "/login"}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Account"
            >
              <User size={20} className="text-gray-700" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? (
                <X size={20} className="text-gray-700" />
              ) : (
                <Menu size={20} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 transition-all">
            <form onSubmit={handleSearchSubmit} className="flex">
              <input
                id="search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products..."
                className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] text-white px-4 py-2 rounded-r-md hover:bg-[#C19B22] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 transition-all">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    text-sm font-medium transition-colors p-2 rounded-md
                    ${location.pathname === link.path
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'text-gray-800 hover:text-[#D4AF37] hover:bg-gray-100'}
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;