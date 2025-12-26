import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProductShowcase from '../components/sections/ProductShowcase';
import { useProducts } from '../hooks/useProducts';

export default function BrowseDealsPage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Page Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Browse All Deals
          </h1>
          <p className="text-lg text-indigo-100">
            Discover thousands of products at amazing prices
          </p>
        </div>
      </section>

      {/* Products Section */}
      <div className="flex-1">
        <ProductShowcase
          products={products}
          isLoading={loading}
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 m-4 rounded-lg">
          <p className="text-red-800">
            Error loading deals: {error}. Please try refreshing the page.
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}
