import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWithError } from '../utils/fetchWithError';
// Removed import for types (User, Address, Order) as they are not needed in JS

// Removed interface AuthContextType

// Mock user data - removed type annotation
const mockUser = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  addresses: [
    {
      id: 'address-1',
      name: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      isDefault: true
    }
  ]
};

// Mock orders - removed type annotation
const mockOrders = [
  {
    id: 'order-1',
    date: '2025-03-15',
    status: 'delivered',
    items: [
      {
        product: {
          id: '1',
          name: 'Diamond Eternity Ring',
          price: 2499.99,
          images: ['https://images.pexels.com/photos/9428867/pexels-photo-9428867.jpeg'],
          category: 'Rings',
          collection: 'Wedding',
          metalType: ['White Gold', 'Yellow Gold', 'Rose Gold'],
          description: 'Our stunning Diamond Eternity Ring features a continuous circle of brilliant-cut diamonds set in precious metal.',
          shortDescription: 'Brilliant-cut diamonds in a continuous circle of elegance.',
          isNew: false,
          isBestSeller: true,
          availableSizes: ['5', '6', '7', '8', '9']
        },
        quantity: 1,
        metalType: 'White Gold',
        size: '7'
      }
    ],
    total: 2499.99,
    shippingAddress: { // Assume this structure matches Address type
      id: 'address-1',
      name: 'Home',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'USA',
      isDefault: true
    },
    paymentMethod: 'Credit Card'
  }
];

// Removed type argument <AuthContextType | undefined>
const AuthContext = createContext(undefined);

// Removed type annotation React.FC<{ children: React.ReactNode }>
export const AuthProvider = ({ children }) => {
  // Removed type annotation <User | null>
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  // Removed type annotation <Order[]>
  const [orders, setOrders] = useState(mockOrders); // Using mock orders

  const isAuthenticated = user !== null;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Removed parameter and return type annotations
  const login = async (email, password) => {
    // Mock login functionality
    if (email === 'demo@example.com' && password === 'password') {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  // Removed parameter and return type annotations
  const register = async (name, email, phone, password) => {
    await fetchWithError(
      fetch('http://localhost:3000/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone, 
            password,
          }),
      })
    )
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  // Removed parameter type annotation
  const updateProfile = (updates) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  // Removed parameter type annotation
  const addAddress = (address) => {
    if (user) {
      // Removed type annotation for newAddress
      const newAddress = {
        ...address, // Assumes 'address' object structure matches Address without 'id'
        id: 'address-' + Date.now()
      };

      // If this is the first address or it's marked as default, make sure it's the only default
      const updatedAddresses = address.isDefault
        ? user.addresses.map(addr => ({ ...addr, isDefault: false }))
        : [...user.addresses];

      updatedAddresses.push(newAddress);
      setUser({ ...user, addresses: updatedAddresses });
    }
  };

  // Removed parameter type annotation
  const updateAddress = (address) => {
    if (user) {
      let updatedAddresses;

      // If this address is being set as default, update all other addresses
      if (address.isDefault) {
        updatedAddresses = user.addresses.map(addr =>
          addr.id === address.id ? address : { ...addr, isDefault: false }
        );
      } else {
        updatedAddresses = user.addresses.map(addr =>
          addr.id === address.id ? address : addr
        );
      }

      setUser({ ...user, addresses: updatedAddresses });
    }
  };

  // Removed parameter type annotation
  const removeAddress = (addressId) => {
    if (user) {
      const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
      setUser({ ...user, addresses: updatedAddresses });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        orders // Providing mock orders
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Removed return type annotation
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    // This check is good practice in JS too when context default is undefined
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context; // The returned object implicitly has the shape of the context value
};