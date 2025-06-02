import React, { createContext, useState, useContext, useEffect } from 'react';
// Removed: import { Product } from '../types';

// Removed the interface definition
// interface WishlistContextType { ... }

// Removed type annotation from createContext
const WishlistContext = createContext(undefined);

// Removed type annotation from the component definition
export const WishlistProvider = ({ children }) => {
  // Removed type annotation <Product[]>
  const [wishlistItems, setWishlistItems] = useState(() => {
    // Load wishlist from localStorage on initial render
    const savedWishlist = localStorage.getItem('wishlist');
    // JSON.parse works fine on the stored string, result will be an array or null
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Removed type annotation from parameter
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      // Assumes product has an 'id' property
      if (prevItems.some(item => item.id === product.id)) {
        return prevItems; // Product already in wishlist
      }
      return [...prevItems, product]; // Add new product
    });
  };

  // Removed type annotation from parameter
  const removeFromWishlist = (productId) => {
    // Assumes product items have an 'id' property
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Removed type annotation from parameter
  const isInWishlist = (productId) => {
    // Assumes product items have an 'id' property
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Removed return type annotation
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  // The check for undefined is still good practice in JS
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context; // Returns the context value object
};