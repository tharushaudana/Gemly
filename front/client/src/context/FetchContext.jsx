import React, { createContext, useContext, useState } from 'react';

const FetchContext = createContext(undefined);

export const FetchProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const callFetch = async (fetchPromise) => {
        setIsLoading(true);
        try {
            const result = await fetchPromise;
            return result;
        } catch (error) {
            alert(`${error.message}`);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FetchContext.Provider value={{ callFetch }}>
            {/* Linear progress indicator */}
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-1 overflow-hidden bg-gray-200 z-[60]">
                    <div className="absolute w-full h-full animate-indeterminate bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500"></div>
                </div>
            )}

            <style>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-indeterminate {
          animation: indeterminate 1.5s infinite linear;
        }
      `}</style>

            {children}
        </FetchContext.Provider>
    );
};

export const useFetch = () => {
    const context = useContext(FetchContext);
    if (!context) {
        throw new Error('useFetch must be used within a FetchProvider');
    }
    return context;
};
