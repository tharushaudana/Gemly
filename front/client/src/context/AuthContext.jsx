import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchWithError } from '../utils/fetchWithError';
import { apiUrl } from '../utils/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [ serverParams, setServerParams ] = useState({});

  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('token');
    return savedToken ? savedToken : null;
  });

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
      fetch(apiUrl('/auth/login'),
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
      fetch(apiUrl('/auth/register'),
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
    window.location.href = '/login';
  };

  const updateProfile = async (updates) => {
    try {
      await fetchWithError(
        fetch(apiUrl('/customer/update_profile'),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          })
      );

      const updatedUser = {...user, ...updates};

      setUser({ ...updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error(error.message);
    }
  };

  const addAddress = async (address) => {
    try {
      const addr = await fetchWithError(
        fetch(apiUrl('/customer/add_address'),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              addressData: address,
            }),
          })
      );

      if (user) {
        const updatedAddresses = [...user.addresses, { ...addr }];
        setUser({ ...user, addresses: updatedAddresses });
      }
    } catch (error) {
      console.error('Error adding address:', error);
      throw new Error(error.message);
    }
  };

  const updateAddress = async (address) => {
    try {
      const updatedAddr = await fetchWithError(
        fetch(apiUrl('/customer/update_address'),
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              addressId: address.id,
              addressData: address,
            }),
          })
      );

      if (user) {
        const updatedAddresses = user.addresses.map(addr =>
          addr.id === updatedAddr.id ? updatedAddr : addr
        );
        setUser({ ...user, addresses: updatedAddresses });
      }
    } catch (error) {
      console.error('Error updating address:', error);
      throw new Error(error.message);
    }
  };

  const removeAddress = async (addressId) => {
    try {
      await fetchWithError(
        fetch(apiUrl('/customer/delete_address'),
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              addressId,
            }),
          })
      );

      if (user) {
        const updatedAddresses = user.addresses.filter(addr => addr.id !== addressId);
        setUser({ ...user, addresses: updatedAddresses });
      }
    } catch (error) {
      console.error('Error removing address:', error);
      throw new Error(error.message);
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
        const response = await fetch(apiUrl('/auth/verify'), {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(error.message);
        }

        const data = await response.json();
        setUser(data.customer);
        setServerParams(data.serverParams || {});
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
        serverParams,
        token,
        login,
        register,
        logout,
        isAuthenticated: user !== null,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
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