import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { categoriesAPI } from '@/lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoriesAPI.getCategories();
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Categories - eBookCMS</title>
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Browse by Category
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Explore books organized by genre and topic
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="card h-32">
                  <div className="h-full bg-gray-300 dark:bg-gray-700 skeleton rounded"></div>
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category: any) => (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/books?category=${category._id}`}>
                    <div 
                      className="card h-32 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      style={{ borderLeft: `4px solid ${category.color}` }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {category.booksCount} books
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No categories available yet.
              </p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default CategoriesPage;
