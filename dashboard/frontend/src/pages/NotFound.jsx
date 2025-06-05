import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-primary-500">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-secondary-800 mt-6">Page Not Found</h2>
      <p className="text-secondary-600 mt-4 text-center max-w-md">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="mt-8 btn-primary flex items-center">
        <Home className="mr-2 h-5 w-5" />
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;