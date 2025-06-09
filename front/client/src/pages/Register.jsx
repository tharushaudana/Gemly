import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Github, Mail } from 'lucide-react';

import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
// Assuming useAuth is a custom hook implemented in JavaScript or correctly transpiled
import { useAuth } from '../context/AuthContext';
import { useFetch } from '../context/FetchContext';
import { fetchWithError } from '../utils/fetchWithError';

// Removed type annotation : React.FC
const Register = () => {
  // Removed type annotations for useState
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // Removed type annotation <Record<string, string>>
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // useAuth and useNavigate are standard React/react-router-dom hooks, valid in JS
  const { register } = useAuth();
  const { callFetch } = useFetch();
  const navigate = useNavigate();

  // Removed type annotation : boolean
  const validateForm = () => {
    // Removed type annotation : Record<string, string>
    const newErrors = {};

    // Logic remains the same
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await callFetch(register(name, email, phone, password));
      navigate('/login');
    } catch (err) {
      console.error("Registration error:", err); 
      setErrors({ form: 'An error occurred during registration' });
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
              <h1 className="text-2xl font-serif text-gray-900 mb-2">Create an Account</h1>
              <p className="text-gray-600">
                Join us to start shopping our exquisite jewelry collection
              </p>
            </div>

            {/* Accessing errors object properties - valid in JS */}
            {errors.form && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                {errors.form}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Input component props - assumed to work in JS */}
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                error={errors.name} // Accessing errors object properties
                required
              />

              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                error={errors.email} // Accessing errors object properties
                required
              />

              <Input
                label="Phone"
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="077xxxxxxx"
                error={errors.phone} // Accessing errors object properties
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.password} // Accessing errors object properties
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                error={errors.confirmPassword} // Accessing errors object properties
                required
              />

              <div className="pt-2">
                {/* Button component props - assumed to work in JS */}
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                {/* Link component from react-router-dom - valid in JS */}
                <Link to="/login" className="text-[#D4AF37] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;