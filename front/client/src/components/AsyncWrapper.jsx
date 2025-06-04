import React, { useEffect, useState } from 'react';

const AsyncWrapper = ({ promises, onSuccess, children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        setLoading(true);
        setError(null);

        const promiseArray = Array.isArray(promises) ? promises : [promises];

        Promise.all(promiseArray.map(p => p()))
            .then((results) => {
                if (isMounted) {
                    onSuccess?.(...results);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message || 'An error occurred');
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [promises]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </div>
    );

    if (error) return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="p-4 bg-white rounded-lg shadow-lg border border-red-500">
            <h2 className="text-xl font-bold text-red-500 mb-2">Error</h2>
            <p className="text-gray-700">{error}</p>
        </div>
    </div>
    );

    return <>{children}</>;
};

export default AsyncWrapper;
