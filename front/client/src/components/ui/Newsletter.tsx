import React, { useState } from 'react';
import Button from './Button';
import Input from './Input';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Clear error if previously set
    setError('');
    
    // Simulate submission success
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F5F5F5] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-gray-900 mb-3">Join Our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to receive updates on new collections, special offers, and jewelry care tips.
          </p>
          
          {submitted ? (
            <div className="bg-green-50 text-green-800 rounded-md p-4 border border-green-200">
              <p>Thank you for subscribing to our newsletter!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                className="flex-grow"
                aria-label="Email address"
              />
              <Button type="submit" variant="primary">
                Subscribe
              </Button>
            </form>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;