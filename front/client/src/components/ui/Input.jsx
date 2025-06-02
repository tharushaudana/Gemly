import React, { forwardRef } from 'react';

// In JavaScript, you don't need the explicit interface definition.
// The component receives props as a standard JavaScript object.

/**
 * @typedef {object} InputProps
 * @property {string} [label] - Optional label for the input.
 * @property {string} [error] - Optional error message to display.
 * @property {string} [className] - Additional CSS classes to apply to the input element.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} [otherProps] - Standard input element attributes (id, name, value, onChange, etc.).
 */

// Remove the type arguments from forwardRef
const Input = forwardRef(
  // Remove type annotations from function parameters
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id} // Assumes id is passed via props
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 border rounded-md shadow-sm
            ${error ? 'border-red-500' : 'border-gray-300'}
            focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]
            ${className}
          `}
          {...props} // Spread other input attributes like type, value, onChange, etc.
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;