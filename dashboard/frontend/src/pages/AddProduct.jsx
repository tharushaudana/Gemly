import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { ArrowLeft } from 'lucide-react';

const AddProduct = () => {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (formData) => {
    setIsSubmitting(true);
    
    try {
      // Add the product
      addProduct(formData);
      
      // Redirect to product list
      navigate('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/products')}
          className="flex items-center text-secondary-600 hover:text-secondary-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Products
        </button>
        <h1 className="text-2xl font-bold text-secondary-900 mt-4">Add New Product</h1>
        <p className="text-secondary-600 mt-1">Create a new jewelry item in your inventory</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <ProductForm
          onSubmit={handleSubmit}
          buttonText={isSubmitting ? "Saving..." : "Add Product"}
        />
      </div>
    </div>
  );
};

export default AddProduct;