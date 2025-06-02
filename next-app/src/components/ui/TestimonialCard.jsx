import React from 'react';
import { Star } from 'lucide-react';
// No need to import the Testimonial type in JavaScript
// import { Testimonial } from '../../types';

// No need for the interface definition in JavaScript
// interface TestimonialCardProps {
//   testimonial: Testimonial;
// }

// Remove the type annotation ": React.FC<TestimonialCardProps>"
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
      {/* Rating Stars */}
      <div className="flex mb-4">
        {/* Assumes testimonial object has a 'rating' property */}
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={`${
              i < testimonial.rating
                ? 'text-[#D4AF37] fill-[#D4AF37]'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      {/* Assumes testimonial object has a 'comment' property */}
      <p className="text-gray-700 italic mb-6 flex-grow">{testimonial.comment}</p>

      {/* Customer Info */}
      <div className="flex items-center mt-auto">
        {/* Assumes testimonial object has 'avatar' and 'name' properties */}
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <div>
          {/* Assumes testimonial object has 'name' and 'date' properties */}
          <h4 className="font-medium text-gray-800">{testimonial.name}</h4>
          <p className="text-xs text-gray-500">
            {/* Assumes testimonial object has a 'date' property which is a valid date string or object */}
            {new Date(testimonial.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;