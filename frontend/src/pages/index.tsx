import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiBook, FiTrendingUp, FiStar, FiSearch } from 'react-icons/fi';

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>eBookCMS - Modern eBook Content Management System</title>
        <meta name="description" content="Discover and manage your digital library with our modern eBook CMS" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Discover Your Next Great Read
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-primary-100">
                Access thousands of eBooks in our modern digital library
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/books" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
                  <FiBook className="mr-2" />
                  Browse Books
                </Link>
                <Link href="/register" className="bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors border-2 border-white inline-flex items-center justify-center">
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
                Why Choose eBookCMS?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Feature 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="card text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiBook className="text-primary-600 dark:text-primary-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    Vast Collection
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Access thousands of eBooks across multiple genres and categories
                  </p>
                </motion.div>

                {/* Feature 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="card text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiSearch className="text-primary-600 dark:text-primary-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    Easy Discovery
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Find your perfect book with our powerful search and filtering system
                  </p>
                </motion.div>

                {/* Feature 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="card text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiStar className="text-primary-600 dark:text-primary-400 text-3xl" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    User Reviews
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Read and share reviews to help others discover great books
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
                Ready to Start Reading?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Join thousands of readers and explore our digital library today
              </p>
              <Link href="/books" className="btn-primary text-lg">
                Explore Books Now
              </Link>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Home;
