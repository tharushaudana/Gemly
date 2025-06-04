// import React from 'react';

// const Pagination = ({ pagination, onPageChange }) => {
//     const { currentPage, totalPages } = pagination;

//     const handlePageChange = (page) => {
//         if (page >= 1 && page <= totalPages) {
//             onPageChange(page);
//         }
//     };

//     const renderPageNumbers = () => {
//         const pages = [];
//         for (let i = 1; i <= totalPages; i++) {
//             pages.push(
//                 <button
//                     key={i}
//                     onClick={() => handlePageChange(i)}
//                     className={`px-3 py-1 rounded-md ${
//                         i === currentPage
//                             ? 'bg-blue-500 text-white'
//                             : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                     }`}
//                 >
//                     {i}
//                 </button>
//             );
//         }
//         return pages;
//     };

//     return (
//         <div className="flex items-center justify-center space-x-2 mt-4">
//             <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
//             >
//                 Previous
//             </button>
//             {renderPageNumbers()}
//             <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
//             >
//                 Next
//             </button>
//         </div>
//     );
// };

// export default Pagination;

import React from 'react';

// Helper function to generate page numbers with ellipses
function getPageNumbers({ currentPage, totalPages, pageNeighbours = 1 }) {
    const totalNumbers = pageNeighbours * 2 + 3; // e.g., 1 ... 4 5 6 ... 10 (for pageNeighbours=1, current=5)
                                                // This means: current page, 1 neighbour on each side, first page, last page
    const totalBlocks = totalNumbers + 2; // Add two for potential ellipses

    if (totalPages <= totalBlocks) {
        // If total pages are few enough, show all of them
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const leftBound = Math.max(2, currentPage - pageNeighbours);
    const rightBound = Math.min(totalPages - 1, currentPage + pageNeighbours);

    pages.push(1); // Always show the first page

    // Ellipsis after first page?
    if (leftBound > 2) {
        pages.push('...');
    }

    // Pages around the current page
    for (let i = leftBound; i <= rightBound; i++) {
        pages.push(i);
    }

    // Ellipsis before last page?
    if (rightBound < totalPages - 1) {
        pages.push('...');
    }

    pages.push(totalPages); // Always show the last page

    return pages;
}

const Pagination = ({ pagination, onPageChange }) => {
    const { currentPage, totalPages, totalItems } = pagination; // pageSize is not directly used here but good for context

    // If there are no items or only one page, don't render pagination (or render minimal)
    if (!totalItems || totalPages <= 0) {
      // You could return a message like "No items" or null
      // For this example, let's return null if no pages.
      return null; 
    }
    
    // If there's only one page, we might not need full pagination controls.
    // The logic below will correctly disable prev/next arrows.
    // You could add a specific check here:
    // if (totalPages === 1) return null; // Or render just "(1)"

    const pageNumbersToDisplay = getPageNumbers({ currentPage, totalPages, pageNeighbours: 1 }); // Show 1 neighbour page

    const handlePrev = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page) => {
        if (page !== currentPage && typeof page === 'number') {
            onPageChange(page);
        }
    };

    return (
        <nav aria-label="Pagination" className="flex items-center justify-center space-x-2 sm:space-x-3 my-8">
            {/* Previous Button */}
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="p-2 text-black font-semibold text-lg disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Previous page"
            >
                ← {/* Left arrow */}
            </button>

            {/* Page Numbers and Ellipses */}
            {pageNumbersToDisplay.map((page, index) => {
                if (page === '...') {
                    return (
                        <span key={`ellipsis-${index}`} className="text-black font-semibold text-lg px-1 select-none">
                            ...
                        </span>
                    );
                }

                if (page === currentPage) {
                    return (
                        <div
                            key={page}
                            className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold text-lg cursor-default select-none"
                            aria-current="page"
                        >
                            {page}
                        </div>
                    );
                }

                return (
                    <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className="w-10 h-10 flex items-center justify-center text-black font-semibold text-lg hover:bg-gray-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
                        aria-label={`Go to page ${page}`}
                    >
                        {page}
                    </button>
                );
            })}

            {/* Next Button */}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="p-2 text-black font-semibold text-lg disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Next page"
            >
                → {/* Right arrow */}
            </button>
        </nav>
    );
};

export default Pagination;