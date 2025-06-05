import React, { createContext, useState, useContext, useEffect } from 'react';
import { dummyProducts } from '../data/dummyProducts';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  
  // Initialize with dummy data
  useEffect(() => {
    setProducts(dummyProducts);
  }, []);
  
  // Get all products
  const getAllProducts = () => {
    return products;
  };
  
  // Get a product by id
  const getProductById = (id) => {
    return products.find(product => product.id === Number(id));
  };
  
  // Add a new product
  const addProduct = (product) => {
    // Generate a new id (in a real app, this would be handled by the backend)
    const newId = products.length > 0 
      ? Math.max(...products.map(p => p.id)) + 1 
      : 1;
    
    const newProduct = {
      ...product,
      id: newId,
    };
    
    setProducts([...products, newProduct]);
    return newProduct;
  };
  
  // Update an existing product
  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map(product => 
        product.id === Number(id) ? { ...updatedProduct, id: Number(id) } : product
      )
    );
  };
  
  // Delete a product
  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== Number(id)));
  };
  
  // Get product stats
  const getProductStats = () => {
    const total = products.length;
    const inStock = products.filter(p => p.stock).length;
    const outOfStock = total - inStock;
    
    return {
      total,
      inStock,
      outOfStock
    };
  };
  
  const value = {
    products,
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductStats
  };
  
  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};