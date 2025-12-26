import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

const HomePage = () => {
  const handleBrowseDeals = () => {
    window.location.href = '/browse-deals';
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Amazing Deals
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 mb-4 max-w-3xl mx-auto">
              Discover thousands of products from your favorite retailers at unbeatable prices.
            </p>
            <p className="text-lg text-indigo-200 mb-10 max-w-2xl mx-auto">
              Save money. Curate your wishlist. Shop smarter.
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleBrowseDeals}
              className="px-8 py-4 text-lg"
            >
              Browse Deals Now
            </Button>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Finding deals has never been easier
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Browse</h3>
                <p className="text-gray-600 text-lg">
                  Explore thousands of products across all categories. Search, filter, and discover exactly what you need.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Save</h3>
                <p className="text-gray-600 text-lg">
                  Create an account and save products to your personal wishlist. Never forget a deal again.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Buy</h3>
                <p className="text-gray-600 text-lg">
                  Click "Get Deal" and shop directly from retailers. Fast checkout and secure transactions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose DealFinder Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose DealFinder?
              </h2>
              <p className="text-xl text-gray-600">
                We make saving money easy and enjoyable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Feature 1 */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">🏷️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Best Deals</h3>
                <p className="text-gray-600 text-lg">
                  We curate deals from trusted retailers to help you save money on products you love.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Personal Wishlist</h3>
                <p className="text-gray-600 text-lg">
                  Save your favorite products and get notified when prices drop. Never miss a deal.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Search</h3>
                <p className="text-gray-600 text-lg">
                  Find exactly what you're looking for with our powerful search and filtering options.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Updated Daily</h3>
                <p className="text-gray-600 text-lg">
                  New deals added every day. Stay on top of the latest offers from your favorite stores.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-indigo-600 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">10K+</div>
                <p className="text-lg text-indigo-100">Products</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">50+</div>
                <p className="text-lg text-indigo-100">Retailers</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">$M+</div>
                <p className="text-lg text-indigo-100">Saved</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <p className="text-lg text-indigo-100">Updated</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Browse our latest deals and create your wishlist today. It only takes seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBrowseDeals}
                className="px-8 py-4 text-lg"
              >
                Browse All Deals
              </Button>
              <a
                href="/register"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition"
              >
                Create Account
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
