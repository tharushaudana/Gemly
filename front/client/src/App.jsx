import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';

// Account Pages
import Dashboard from './pages/Account/Dashboard';
import Profile from './pages/Account/Profile';
import Orders from './pages/Account/Orders';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Main Pages */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/order-confirmation" element={<OrderConfirmation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  
                  {/* Account Pages */}
                  <Route path="/account" element={<Dashboard />}>
                    <Route index element={<Profile />} />
                    <Route path="orders" element={<Orders />} />
                  </Route>
                  
                  {/* 404 Page */}
                  <Route path="*" element={
                    <div className="pt-24 pb-16">
                      <div className="container mx-auto px-4 text-center">
                        <h1 className="text-5xl font-serif text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-8">Page not found</p>
                        <a href="/" className="inline-block bg-[#D4AF37] text-white px-6 py-3 rounded-md hover:bg-[#C19B22]">
                          Back to Home
                        </a>
                      </div>
                    </div>
                  } />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

