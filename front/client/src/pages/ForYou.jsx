import React, { useState, useEffect } from 'react';

import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import AsyncWrapper from '../components/AsyncWrapper';
import { fetchWithError } from '../utils/fetchWithError';
import { useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiUrl } from '../utils/api';
import { redirectToLogin } from '../utils/redirectToLogin';

const ForYou = () => {
    const { token, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        redirectToLogin();
    }

    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const handleOnSuccess = (productData) => {
        setRecommendedProducts(productData);
    };

    const promises = useMemo(() => [
        () => fetchWithError(fetch(apiUrl('/recommend'), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })),
    ], [token]);

    return (
        <AsyncWrapper
            promises={promises}
            onSuccess={handleOnSuccess}
        >
            <div className="pt-20 pb-16">
                <div className="container mx-auto px-4">
                    <div className="py-8">
                        <h1 className="text-3xl font-serif text-gray-900 mb-2">Recommended For You</h1>
                        <p className="text-gray-600">
                            Picked for you — inspired by what you like and love.
                        </p>
                        <br />
                    </div>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Product Grid */}
                        <div className="flex-grow">
                            {/* Product Grid */}
                            {recommendedProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* ProductCard component is assumed to handle product data correctly in JS */}
                                    {recommendedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                                    <h3 className="text-xl font-medium mb-2">Nothing to show yet</h3>
                                    <p className="text-gray-600 mb-4">
                                        Start wishlisting or shopping to get tailored picks.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AsyncWrapper>
    );
};

export default ForYou;