import React, { useState, useEffect } from 'react';
import { categories } from '../data/dummyProducts';

const ProductForm = ({ product = {}, onSubmit, buttonText = "Save Product" }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    stock: true,
    image: ''
  });
  
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState('');
  
  // If editing, populate form with product data
  useEffect(() => {
    if (product && product.id) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price ? product.price.toString() : '',
        description: product.description || '',
        stock: product.stock === undefined ? true : product.stock,
        image: product.image || ''
      });
      setPreviewUrl(product.image || '');
    }
  }, [product]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Simulate image upload - in a real app, you'd upload to a server
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleImageUrl = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image: url }));
    setPreviewUrl(url);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.price) newErrors.price = 'Price is required';
    else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format the data before submitting
      const formattedData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      // If it's an edit, preserve the id
      if (product.id) {
        formattedData.id = product.id;
      }
      
      onSubmit(formattedData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-input ${errors.name ? 'border-red-500' : ''}`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`form-input ${errors.category ? 'border-red-500' : ''}`}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>
        
        <div>
          <label htmlFor="price" className="form-label">Price ($)</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`form-input ${errors.price ? 'border-red-500' : ''}`}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className={`form-input ${errors.description ? 'border-red-500' : ''}`}
          ></textarea>
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        
        <div>
          <label htmlFor="stock" className="flex items-center">
            <input
              type="checkbox"
              id="stock"
              name="stock"
              checked={formData.stock}
              onChange={handleChange}
              className="h-4 w-4 text-primary-500 rounded border-secondary-300 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-secondary-700">In Stock</span>
          </label>
        </div>
        
        <div className="md:col-span-2">
          <div className="mb-4">
            <label className="form-label">Product Image</label>
            <div className="mt-2 flex items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={formData.image}
                  onChange={handleImageUrl}
                  className="form-input"
                />
              </div>
              <span className="mx-2 text-secondary-500">or</span>
              <div>
                <label className="btn btn-outline cursor-pointer">
                  Upload
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
          
          {previewUrl && (
            <div className="mt-4">
              <p className="form-label">Preview</p>
              <div className="mt-1 border border-secondary-200 rounded-lg overflow-hidden h-48 w-48">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          className="btn-primary"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;