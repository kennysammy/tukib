import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import { booksAPI, usersAPI } from '@/lib/api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { FiStar, FiDownload, FiHeart, FiShare2, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import BookCard from '@/components/books/BookCard';

const BookDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [book, setBook] = useState<any>(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBook();
      fetchRelatedBooks();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await booksAPI.getBook(id as string);
      setBook(response.data.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBooks = async () => {
    try {
      const response = await booksAPI.getRelatedBooks(id as string);
      setRelatedBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching related books:', error);
    }
  };

  const handleDownload = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      const response = await booksAPI.downloadBook(id as string);
      window.open(response.data.data.fileUrl, '_blank');
    } catch (error) {
      console.error('Error downloading book:', error);
      alert('Failed to download book');
    }
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      if (isFavorite) {
        await usersAPI.removeFromFavorites(id as string);
        setIsFavorite(false);
      } else {
        await usersAPI.addToFavorites(id as string);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    setSubmittingReview(true);
    try {
      await booksAPI.addReview(id as string, reviewData);
      setReviewData({ rating: 5, comment: '' });
      fetchBook(); // Refresh to show new review
      alert('Review submitted successfully!');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 dark:bg-gray-700 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!book) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{book.title} - eBookCMS</title>
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            {/* Cover Image */}
            <div className="md:col-span-1">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Book Info */}
            <div className="md:col-span-2">
              <div className="mb-4">
                <span 
                  className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold mb-4"
                  style={{ backgroundColor: book.category?.color }}
                >
                  {book.category?.name}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                by {book.author}
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{book.ratings.average.toFixed(1)}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-1">
                    ({book.ratings.count} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <FiDownload className="mr-1" />
                  <span>{book.downloads} downloads</span>
                </div>
                <div className="flex items-center">
                  <FiEye className="mr-1" />
                  <span>{book.views} views</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Description</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {/* Book Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Publisher</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{book.publisher || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pages</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{book.pages || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Language</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{book.language}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Format</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{book.fileFormat}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button onClick={handleDownload} className="btn-primary flex items-center">
                  <FiDownload className="mr-2" />
                  Download
                </button>
                <button onClick={handleFavoriteToggle} className="btn-secondary flex items-center">
                  <FiHeart className={`mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
                <button className="btn-secondary flex items-center">
                  <FiShare2 className="mr-2" />
                  Share
                </button>
              </div>
            </div>
          </motion.div>

          {/* Reviews Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reviews</h2>
            
            {/* Add Review Form */}
            {isAuthenticated && (
              <form onSubmit={handleReviewSubmit} className="card mb-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Write a Review</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Rating
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({ ...reviewData, rating: star })}
                        className="text-2xl"
                      >
                        <FiStar
                          className={star <= reviewData.rating ? 'fill-current text-yellow-400' : 'text-gray-400'}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                    Comment
                  </label>
                  <textarea
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    className="input-field"
                    rows={4}
                    placeholder="Share your thoughts about this book..."
                  />
                </div>
                <button type="submit" disabled={submittingReview} className="btn-primary">
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}

            {/* Reviews List */}
            <div className="space-y-4">
              {book.reviews?.length > 0 ? (
                book.reviews.map((review: any, index: number) => (
                  <div key={index} className="card">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.user?.avatar || '/default-avatar.png'}
                        alt={review.user?.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{review.user?.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`text-sm ${i < review.rating ? 'fill-current text-yellow-400' : 'text-gray-400'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to review this book!</p>
              )}
            </div>
          </div>

          {/* Related Books */}
          {relatedBooks.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Books</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedBooks.map((book: any) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default BookDetailPage;
