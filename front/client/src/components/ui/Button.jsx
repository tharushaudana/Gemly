import React from 'react';

// Type aliases and interfaces are removed in JavaScript
// type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
// type ButtonSize = 'sm' | 'md' | 'lg';
// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: ButtonVariant;
//   size?: ButtonSize;
//   fullWidth?: boolean;
//   isLoading?: boolean;
//   children: React.ReactNode;
// }

// Removed the React.FC type annotation
const Button = ({
  variant = 'primary', // Default values are handled directly in the destructuring
  size = 'md',
  fullWidth = false,
  isLoading = false,
  className = '', // Default for className
  children, // Children is a prop, no specific type annotation needed in JS
  ...props // Rest props are handled by the spread operator
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  // These maps still work the same way in JavaScript
  const variantClasses = {
    primary: 'bg-[#D4AF37] text-white hover:bg-[#C19B22] focus:ring-[#D4AF37]',
    secondary: 'bg-[#1A237E] text-white hover:bg-[#151C60] focus:ring-[#1A237E]',
    outline: 'border border-[#D4AF37] text-[#D4AF37] bg-transparent hover:bg-[#D4AF37]/10 focus:ring-[#D4AF37]',
    ghost: 'text-[#1A237E] hover:bg-[#1A237E]/10 focus:ring-[#1A237E]'
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };

  // Conditional class names
  const widthClass = fullWidth ? 'w-full' : '';
  const loadingClass = isLoading ? 'opacity-70 cursor-not-allowed' : '';

  // Combining classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${loadingClass} ${className}`;

  // The JSX structure remains the same
  return (
    <button className={classes} disabled={isLoading || props.disabled} {...props}>
      {isLoading ? (
        <div className="mr-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
        </div>
      ) : null}
      {children}
    </button>
  );
};

export default Button;