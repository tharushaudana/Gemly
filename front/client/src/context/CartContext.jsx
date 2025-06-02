import React, { createContext, useState, useContext, useEffect } from 'react';
// Type imports are removed in JavaScript

// No need for the interface CartContextType in JavaScript

// Removed the type argument for createContext
const CartContext = createContext(undefined);

// Removed the React.FC and children type annotations
export const CartProvider = ({ children }) => {
  // Removed type annotation <CartItem[]>
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on initial render
    // JSON.parse will work as long as the stored data is valid JSON
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes - logic remains the same
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Removed type annotations on function parameters
  const addToCart = (product, quantity, metalType, size) => {
    setCartItems(prevItems => {
      // The findIndex logic relies on the structure of the objects,
      // which is fine in JavaScript as long as the data adheres to it.
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id && item.metalType === metalType && item.size === size
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item already exists with same options
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        return updatedItems;
      } else {
        // Add new item
        // Creates a new object with product, quantity, metalType, size properties.
        return [...prevItems, { product, quantity, metalType, size }];
      }
    });
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