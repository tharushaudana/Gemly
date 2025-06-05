import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWithError } from '../utils/fetchWithError';
import { useAuth } from './AuthContext';
import { redirectToLogin } from '../utils/redirectToLogin';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    // const savedCart = localStorage.getItem('cart');
    return user ? user.cartItems : [];
  });

  const addToCart = async (product, quantity, metalType) => {
    try {
      const result = await fetchWithError(
        fetch('http://localhost:3000/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: product.id,
            quantity,
            metalType,
          }),
        })
      );

      setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(
          item => item.product.id === product.id && item.metalType === metalType
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity += quantity;
          return updatedItems;
        } else {
          return [...prevItems, { product, quantity, metalType }];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Failed to add item to cart');
    }
  };

  // Removed type annotation on function parameter
  const removeFromCart = (productId) => {
    // Filter logic remains the same, relies on item.product.id existing
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Removed type annotations on function parameters
  const updateQuantity = (productId, quantity) => {
    // Map logic remains the same, relies on item.product.id existing
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) } // Math.max ensures quantity >= 1
          : item
      )
    );
  };

  // Logic remains the same
  const clearCart = () => {
    setCartItems([]);
  };

  // Logic remains the same, relies on item.quantity existing
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Logic remains the same, relies on item.product.price and item.quantity existing
  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  // Logic remains the same, relies on item.product.id existing
  const isInCart = (productId) => {
    return cartItems.some(item => item.product.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Removed the return type annotation
export const useCart = () => {
  const context = useContext(CartContext);
  // The check for undefined context is still a good practice in JS
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};