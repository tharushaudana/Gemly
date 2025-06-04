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
    shippingAddress: {
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

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? savedToken : null;
  });

  const [orders, setOrders] = useState(mockOrders); // Using mock orders

  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email, password) => {
    const result = await fetchWithError(
      fetch('http://localhost:3000/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
      })
    );
    
    localStorage.setItem('token', result.token);
    localStorage.setItem('user', JSON.stringify(result.customer));
    setToken(result.token);
    setUser(result.customer);

    return true;
  };

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
    );

    return true;
  };

  const logout = () => {
    clearUserData();
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

  const clearUserData = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Verifying user token
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:3000/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error verifying token:', error);
        clearUserData();
      } finally {
        setIsVerifying(false);
      }
    };

    if (token) {
      verifyToken();
    } else {
      setIsVerifying(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: user !== null,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        orders // Providing mock orders
      }}
    >
      {isVerifying ? (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : children}
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