import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

// No need for React.FC type annotation in JavaScript
const Contact = () => {
  // Removed type annotation
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Removed type annotation
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Removed type annotation for event parameter
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field if it exists
    // Check if the property exists before trying to delete
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Removed return type annotation
  const validateForm = () => {
    // Initialized as an empty object, implicitly Record<string, string> structure
    const newErrors = {};

    // Trim whitespace and check if empty
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    // Return boolean based on whether newErrors is empty
    return Object.keys(newErrors).length === 0;
  };

  // Removed type annotation for event parameter
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-serif text-gray-900 mb-3">Contact Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you. Whether you have a question about our products, custom designs, or anything else, our team is ready to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 h-full">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <MapPin size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Visit Us</h3>
                    <p className="text-gray-600">
                      123 Fifth Avenue<br />
                      New York, NY 10160<br />
                      United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <Phone size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Call Us</h3>
                    <p className="text-gray-600">
                      +1 (800) 123-4567<br />
                      +1 (212) 555-6789
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <Mail size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">
                      contact@luxejewelry.com<br />
                      support@luxejewelry.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <Clock size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 7:00 PM<br />
                      Saturday: 10:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM8.711 12.178c0-1.8.5-2.2 2.2-2.2h2.178c1.8 0 2.2.5 2.2 2.2v2.178c0 1.8-.5 2.2-2.2 2.2h-2.178c-1.8 0-2.2-.5-2.2-2.2z"></path>
                    </svg>
                  </a>
                   <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Twitter"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-medium text-gray-900 mb-6">Send Us a Message</h2>

              {submitted ? (
                <div className="bg-green-50 border border-green-100 text-green-700 rounded-md p-6 text-center">
                  <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium mb-2">Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Input component is assumed to work with standard props */}
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      // Pass error message string or undefined
                      error={errors.name}
                      placeholder="John Doe"
                      required
                    />

                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                       // Pass error message string or undefined
                      error={errors.email}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <Input
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    // Pass error message string or undefined
                    error={errors.subject}
                    placeholder="How can we help you?"
                    required
                  />

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your inquiry..."
                      className={`
                        w-full px-3 py-2 border rounded-md shadow-sm
                        ${errors.message ? 'border-red-500' : 'border-gray-300'}
                        focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]
                      `}
                      required
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      isLoading={isSubmitting}
                    >
                      Send Message
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Find Us</h2>
            <div className="aspect-[16/9] w-full rounded-md overflow-hidden">
              <iframe
                title="LUXE Jewelry Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215256364718!2d-73.98945672426656!3d40.75246397138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1681485215550!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;