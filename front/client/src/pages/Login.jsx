import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Github, Mail } from 'lucide-react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
// Assuming useAuth is exported from a JS/TS file
import { useAuth } from '../context/AuthContext';

// Removed type annotation React.FC
const Login = () => {
  // Removed type annotations from useState
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // useAuth, useNavigate, useLocation are React hooks, valid in JS
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state
  // Removed type assertion/cast - directly access the property
  const redirectTo = location.state?.redirectTo || '/';

  // Removed type annotation React.FormEvent
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation - logic remains the same
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // The login function is assumed to be available from useAuth context
      const success = await login(email, password);

      if (success) {
        navigate(redirectTo);
      } else {
        // This error is often handled within the login function itself,
        // but keeping it here matches the original TS code's structure.
        // A more robust approach might involve the context returning the error message.
        setError('Invalid email or password');
      }
    } catch (err) {
      // Basic error handling for unexpected errors
      console.error("Login error:", err); // Log for debugging
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-serif text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">
                Sign in to your account to continue
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {error}
              </div>
            )}

            {/* Form handling and rendering logic remain the same */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input component is assumed to work correctly with JS props */}
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-[#D4AF37] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                {/* Input component */}
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="pt-2">
                {/* Button component */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </div>
            </form>

            {/* Social login options */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Facebook size={20} className="text-[#1877F2]" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Github size={20} className="text-black" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Mail size={20} className="text-[#D4AF37]" />
                </button>
              </div>
            </div>

            {/* Signup link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#D4AF37] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>For demo purposes, use:</p>
            <p>Email: demo@example.com</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;