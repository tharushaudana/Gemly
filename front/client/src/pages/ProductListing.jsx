import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
// Assuming getFilteredProducts and products are exported from a JS/TS file
import { getFilteredProducts, products } from '../data/products';
import AsyncWrapper from '../components/AsyncWrapper';
import { fetchWithError } from '../utils/fetchWithError';
import { useCallback } from 'react';
import { useMemo } from 'react';
import Pagination from '../components/ui/Pagination';

// No need to import the Product type in JavaScript

const ProductListing = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // Removed type annotation <Product[]>
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter states - removed type annotations
  const [selectedCollection, setSelectedCollection] = useState(searchParams.get('collection') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedMetalType, setSelectedMetalType] = useState(searchParams.get('metal') || '');
  // Removed type annotation <[number, number]>
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortOption, setSortOption] = useState(searchParams.get('sort') || 'newest');

  // Categories and metal types - logic remains the same
  const categories = Array.from(new Set(products.map(p => p.category)));
  const collections = Array.from(new Set(products.map(p => p.collection)));
  const metalTypes = Array.from(new Set(products.flatMap(p => p.metalType)));

  // Filter data
  const [filterData, setFilterData] = useState(null);

  // Pagination data
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Update URL params when filters change - logic remains the same
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCollection) params.set('collection', selectedCollection);
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedMetalType) params.set('metal', selectedMetalType);
    if (sortOption) params.set('sort', sortOption);
    if (currentPage) params.set('page', currentPage);

    // { replace: true } is part of react-router-dom v6+ API, valid in JS
    setSearchParams(params, { replace: true });
  }, [selectedCollection, selectedCategory, selectedMetalType, sortOption, currentPage, setSearchParams]);

  // Reset filters - logic remains the same
  const handleResetFilters = () => {
    setSelectedCollection('');
    setSelectedCategory('');
    setSelectedMetalType('');
    setPriceRange([0, 10000]);
    setSortOption('newest');
    setSearchParams({}); // Clear all search params
  };

  // Toggle mobile filter - logic remains the same
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const handleOnSuccess = (filterData, productData) => {
    console.log('Filters:', filterData);
    
    setFilterData(filterData);
    setFilteredProducts(productData.data);
    setPagination(productData.pagination);
  };

  const getQuery = useCallback(() => {
    const query = new URLSearchParams();

    if (selectedCollection) query.set('collection', selectedCollection);
    if (selectedCategory) query.set('category', selectedCategory);
    if (selectedMetalType) query.set('metal', selectedMetalType);
    if (sortOption) query.set('sort', sortOption);
    if (currentPage) query.set('page', currentPage);

    return query.toString();
  }, [selectedCollection, selectedCategory, selectedMetalType, priceRange, sortOption, currentPage]);

  const promises = useMemo(() => [
    () => fetchWithError(fetch(`http://localhost:3000/filters`)),
    () => fetchWithError(fetch(`http://localhost:3000/products?${getQuery()}`)),
  ], [getQuery]);

  return (
    <AsyncWrapper
      promises={promises}
      onSuccess={handleOnSuccess}
      dependencies={[selectedCollection, selectedCategory, selectedMetalType, sortOption, currentPage]}
    >
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="py-8">
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Our Collection</h1>
            <p className="text-gray-600">
              Discover our exquisite selection of fine jewelry pieces, crafted with the utmost attention to detail.
            </p>
          </div>

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={toggleMobileFilter}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              Filters
              {(selectedCollection || selectedCategory || selectedMetalType) && (
                <span className="ml-1 bg-[#D4AF37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {[selectedCollection, selectedCategory, selectedMetalType].filter(Boolean).length}
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters - Desktop */}
            <div className="hidden md:block w-full md:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-medium text-lg">Filters</h2>
                  {(selectedCollection || selectedCategory || selectedMetalType) && (
                    <button
                      onClick={handleResetFilters}
                      className="text-sm text-[#D4AF37] hover:underline"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                {/* Collection Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Collection</h3>
                  <div className="space-y-2">
                    {filterData && filterData.collections.map(collection => (
                      <label key={collection.id} className="flex items-center">
                        <input
                          type="radio"
                          name="collection"
                          checked={selectedCollection === collection.name}
                          onChange={() => setSelectedCollection(collection.name)}
                          className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="ml-2 text-gray-700">{collection.name}</span>
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="collection"
                        checked={selectedCollection === ''}
                        onChange={() => setSelectedCollection('')}
                        className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span className="ml-2 text-gray-700">All Collections</span>
                    </label>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Category</h3>
                  <div className="space-y-2">
                    {filterData && filterData.categories.map(category => (
                      <label key={category.id} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category.name}
                          onChange={() => setSelectedCategory(category.name)}
                          className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="ml-2 text-gray-700">{category.name}</span>
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === ''}
                        onChange={() => setSelectedCategory('')}
                        className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span className="ml-2 text-gray-700">All Categories</span>
                    </label>
                  </div>
                </div>

                {/* Metal Type Filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Metal Type</h3>
                  <div className="space-y-2">
                    {filterData && filterData.metals.map(metal => (
                      <label key={metal.id} className="flex items-center">
                        <input
                          type="radio"
                          name="metal"
                          checked={selectedMetalType === metal.name}
                          onChange={() => setSelectedMetalType(metal.name)}
                          className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="ml-2 text-gray-700">{metal.name}</span>
                      </label>
                    ))}
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="metal"
                        checked={selectedMetalType === ''}
                        onChange={() => setSelectedMetalType('')}
                        className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                      />
                      <span className="ml-2 text-gray-700">All Metals</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Filters */}
            {isMobileFilterOpen && (
              <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
                <div className="bg-white h-full w-80 max-w-full p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-medium text-lg">Filters</h2>
                    <button onClick={toggleMobileFilter} className="p-1">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>

                  {/* Filter content - same as desktop but in mobile sidebar */}
                  {/* Collection Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Collection</h3>
                    <div className="space-y-2">
                      {filterData && filterData.collections.map(collection => (
                        <label key={collection.id} className="flex items-center">
                          <input
                            type="radio"
                            name="collection-mobile" // Use different name for mobile group
                            checked={selectedCollection === collection.name}
                            onChange={() => setSelectedCollection(collection.name)}
                            className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          <span className="ml-2 text-gray-700">{collection.name}</span>
                        </label>
                      ))}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="collection-mobile"
                          checked={selectedCollection === ''}
                          onChange={() => setSelectedCollection('')}
                          className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="ml-2 text-gray-700">All Collections</span>
                      </label>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {filterData && filterData.categories.map(category => (
                        <label key={category.id} className="flex items-center">
                          <input
                            type="radio"
                            name="category-mobile" // Use different name for mobile group
                            checked={selectedCategory === category.name}
                            onChange={() => setSelectedCategory(category.name)}
                            className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          <span className="ml-2 text-gray-700">{category.name}</span>
                        </label>
                      ))}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="category-mobile"
                          checked={selectedCategory === ''}
                          onChange={() => setSelectedCategory('')}
                          className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="ml-2 text-gray-700">All Categories</span>
                      </label>
                    </div>
                  </div>

                  {/* Metal Type Filter */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-3">Metal Type</h3>
                    <div className="space-y-2">
                      {filterData && filterData.metals.map(metal => (
                        <label key={metal.id} className="flex items-center">
                          <input
                            type="radio"
                            name="metal-mobile" // Use different name for mobile group
                            checked={selectedMetalType === metal.name}
                            onChange={() => setSelectedMetalType(metal.name)}
                            className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                          />
                          <span className="ml-2 text-gray-700">{metal.name}</span>
                        </label>
                      ))}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="metal-mobile"
                          checked={selectedMetalType === ''}
                          onChange={() => setSelectedMetalType('')}
                          className="h-4 w-4 text-[#D4AF37] focus:ring-[#D4AF37]"
                        />
                        <span className="ml-2 text-gray-700">All Metals</span>
                      </label>
                    </div>
                  </div>

                  {/* Apply/Reset Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleResetFilters}
                      fullWidth
                    >
                      Reset
                    </Button>
                    <Button
                      variant="primary"
                      onClick={toggleMobileFilter} // Clicking Apply just closes the filter
                      fullWidth
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <div className="flex-grow">
              {/* Sorting and Results Count */}
              <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                </p>

                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37]"
                  >
                    <option value="newest">Newest</option>
                    <option value="bestsellers">Most Popular</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-3 text-gray-500" />
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* ProductCard component is assumed to handle product data correctly in JS */}
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button variant="outline" onClick={handleResetFilters}>
                    Reset Filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {pagination && (
                <Pagination
                  pagination={pagination}
                  onPageChange={(page) => {
                    setCurrentPage(page);                    
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </AsyncWrapper>
  );
};

export default ProductListing;