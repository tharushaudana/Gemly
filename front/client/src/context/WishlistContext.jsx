import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchWithError } from '../utils/fetchWithError';
import { apiUrl } from '../utils/api';

const WishlistContext = createContext(undefined);

export const WishlistProvider = ({ children }) => {
  const { token, user } = useAuth();

  const [wishlistItems, setWishlistItems] = useState(() => {
    return user ? user.wishlistItems.map(item => item.product) : [];
  });

  const addToWishlist = async (product) => {
    try {
      const result = await fetchWithError(
        fetch(apiUrl('/wishlist'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: product.id }),
      })
      );

      setWishlistItems(prevItems => {
        if (prevItems.some(item => item.id === product.id)) {
          return prevItems; // Product already in wishlist
        }
        return [...prevItems, product]; // Add new product
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw new Error(error.message);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await fetchWithError(
        fetch(apiUrl('/wishlist'), {
          method: 'DELETE',
          headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        })
      );

      setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      throw new Error(error.message);
    }
  };

  const clearWishlist = async () => {
    try {
      await fetchWithError(
        fetch(apiUrl('/wishlist/clear'), {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
      );

      setWishlistItems([]);
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      throw new Error(error.message);
    }
  };

  const isInWishlist = (productId) => {
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

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};