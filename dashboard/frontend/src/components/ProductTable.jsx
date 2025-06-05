import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductTable = ({ products, onDelete, onEdit }) => {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th className="rounded-tl-lg">Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th className="rounded-tr-lg">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary-100">
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id} className="hover:bg-secondary-50 transition-colors duration-150">
                <td>
                  <img 
                    src={product.image || 'https://via.placeholder.com/100'} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="font-medium text-secondary-900">{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td>
                  {product.stock ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Out of Stock
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex items-center space-x-3">
                    <Link 
                      to={`/products/edit/${product.id}`}
                      className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => onDelete(product.id, product.name)} 
                      className="p-1 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-8 text-secondary-500">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;