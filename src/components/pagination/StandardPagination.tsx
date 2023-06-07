import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export default function StandardPagination({
  data,
  count,
  pageSize,
  currentPage,
  setCurrentPage,
  //   maxPageSize,
}) {
  const [listingsPerPage] = useState(pageSize);

  const visitPage = async (page) => {
    setCurrentPage(page, () => {
      // re-render the component
    });
  };

  const previousNumber = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextNumber = async () => {
    if (currentPage !== Math.ceil(data.length)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(count / listingsPerPage); i += 1) {
    pages.push(i);
  }

  const start = Math.max(1, currentPage - 2);
  const end = Math.min(pages.length, currentPage + 2);
  const visiblePages = pages.slice(start - 1, end);

  return (
    <div className="flex items-center justify-between dark:border-dark-second border-t border-gray-200  px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => {
            previousNumber();
          }}
          type="button"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={() => {
            nextNumber();
          }}
          type="button"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm dark:text-dark-txt-secondary text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{' '}
            <span className="font-medium">{Math.min(count, currentPage * pageSize)}</span> of{' '}
            <span className="font-medium">{count}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate z-20 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={previousNumber}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md border dark:text-dark-txt-secondary border-gray-300 dark:border-dark-border dark:bg-dark-second bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {visiblePages.map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => visitPage(page)}
                style={{ color: currentPage === page ? 'gray' : 'black' }}
                className="relative inline-flex items-center border dark:text-dark-txt-secondary border-gray-300 dark:border-dark-border dark:bg-dark-second bg-white px-4 py-2 text-sm font-medium dark:hover:bg-dark-third hover:bg-gray-50 focus:z-20"
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              onClick={nextNumber}
              disabled={currentPage === Math.ceil(count / listingsPerPage)}
              className="relative inline-flex items-center rounded-r-md border dark:text-dark-txt-secondary border-gray-300 bg-white dark:border-dark-border dark:bg-dark-second px-2 py-2 text-sm font-medium text-gray-500 dark:hover:bg-dark-third hover:bg-gray-50 focus:z-20"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
