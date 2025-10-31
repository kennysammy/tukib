import React from 'react';

const BookCardSkeleton: React.FC = () => {
  return (
    <div className="book-card">
      <div className="relative">
        {/* Cover Image Skeleton */}
        <div className="h-64 bg-gray-300 dark:bg-gray-700 skeleton"></div>

        {/* Book Info Skeleton */}
        <div className="p-4 space-y-3">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 skeleton rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton rounded w-1/2"></div>
          <div className="flex items-center justify-between">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton rounded w-20"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 skeleton rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCardSkeleton;
