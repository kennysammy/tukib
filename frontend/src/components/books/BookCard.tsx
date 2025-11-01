import React from 'react';
import Link from 'next/link';
import { FiStar, FiDownload, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
    category: {
      name: string;
      color: string;
    };
    ratings: {
      average: number;
      count: number;
    };
    downloads: number;
    views: number;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="book-card"
    >
      <Link href={`/books/${book._id}`}>
        <div className="relative">
          {/* Cover Image */}
          <div className="relative h-64 bg-gray-200 dark:bg-gray-700">
            <img
              src={book.coverImage || '/placeholder-book.png'}
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {/* Category Badge */}
            <div 
              className="absolute top-2 right-2 px-3 py-1 rounded-full text-white text-xs font-semibold"
              style={{ backgroundColor: book.category?.color || '#3B82F6' }}
            >
              {book.category?.name}
            </div>
          </div>

          {/* Book Info */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              by {book.author}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <FiStar className="text-yellow-400" />
                <span>{book.ratings?.average?.toFixed(1) || '0.0'}</span>
                <span className="text-xs">({book.ratings?.count || 0})</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <FiDownload />
                  <span>{book.downloads || 0}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FiEye />
                  <span>{book.views || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BookCard;
