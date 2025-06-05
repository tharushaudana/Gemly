import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import ProductTable from '../components/ProductTable';
import { useProducts } from '../context/ProductContext';
import DeleteConfirmation from '../components/DeleteConfirmation';

const ProductList = () => {
  const { getAllProducts, deleteProduct } = useProducts();
  const products = getAllProducts();
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState({ id: null, name: '' });
  
  const handleDeleteClick = (id, name) => {
    setProductToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    if (productToDelete.id) {
      deleteProduct(productToDelete.id);
      setIsDeleteModalOpen(false);
    }
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Products</h1>
          <p className="text-secondary-600 mt-1">Manage your jewelry inventory</p>
        </div>
        <Link 
          to="/products/add"
          className="btn-primary flex items-center justify-center mt-4 md:mt-0"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Product
        </Link>
      </div>
      
      {/* Filters/Search could go here in a real app */}
      <div className="bg-white rounded-lg shadow-card p-4 mb-6">
        <div className="text-sm text-secondary-600">
          Showing {products.length} products
        </div>
      </div>
      
      {/* Products Table */}
      <ProductTable 
        products={products}
        onDelete={handleDeleteClick}
      />
      
      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        productName={productToDelete.name}
      />
    </div>
  );
};

export default ProductList;