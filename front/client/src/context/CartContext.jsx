import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWithError } from '../utils/fetchWithError';
import { useAuth } from './AuthContext';
import { redirectToLogin } from '../utils/redirectToLogin';
import { apiUrl } from '../utils/api';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();

  const [cartItems, setCartItems] = useState(() => {
    return user ? user.cartItems : [];
  });

  const addToCart = async (product, quantity, metalType) => {
    try {
      const result = await fetchWithError(
        fetch(apiUrl('/cart'), {
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
          return [...prevItems, { id: result.id, product, quantity, metalType }];
        }
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error(error.message);
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await fetchWithError(
        fetch(apiUrl('/cart'), {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ cartItemId }),
        })
      );

      setCartItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error(error.message);
    }
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, quantity) } // Math.max ensures quantity >= 1
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

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

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};