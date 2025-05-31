import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, Address, Order } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<User>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  orders: Order[];
}

// Mock user data
const mockUser: User = {
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

// Mock orders
const mockOrders: Order[] = [
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const isAuthenticated = user !== null;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login functionality
    if (email === 'demo@example.com' && password === 'password') {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mock register functionality
    const newUser: User = {
      id: 'user-' + Date.now(),
      name,
      email,
      addresses: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    if (user) {
      const newAddress: Address = {
        ...address,
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

  const updateAddress = (address: Address) => {
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

  const removeAddress = (addressId: string) => {
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
        orders
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};