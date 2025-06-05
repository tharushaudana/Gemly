import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { ArrowLeft } from 'lucide-react';

const EditProduct = () => {
  const { id } = useParams();
  const { getProductById, updateProduct } = useProducts();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    const fetchedProduct = getProductById(id);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      // Product not found, redirect to products list
      navigate('/products');
    }
    setIsLoading(false);
  }, [id, getProductById, navigate]);
  
  const handleSubmit = (formData) => {
    setIsSubmitting(true);
    
    try {
      // Update the product
      updateProduct(id, formData);
      
      // Redirect to product list
      navigate('/products');
    } catch (error) {
      console.error('Error updating product:', error);
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
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
        <h1 className="text-2xl font-bold text-secondary-900 mt-4">Edit Product</h1>
        <p className="text-secondary-600 mt-1">Update details for {product?.name}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-card p-6">
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          buttonText={isSubmitting ? "Saving..." : "Update Product"}
        />
      </div>
    </div>
  );
};

export default EditProduct;