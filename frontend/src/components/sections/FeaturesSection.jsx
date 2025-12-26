import React from 'react';
import Button from '../common/Button';

export const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      title: 'Thousands of Deals',
      description: 'Browse through thousands of products from major retailers.',
      icon: '🛍️',
    },
    {
      id: 2,
      title: 'Save Money',
      description: 'Find discounts and deals you will not find anywhere else.',
      icon: '💰',
    },
    {
      id: 3,
      title: 'Personal Wishlist',
      description: 'Create an account and save products you love for later.',
      icon: '❤️',
    },
    {
      id: 4,
      title: 'Smart Search',
      description: 'Easily search and filter products by category or price.',
      icon: '🔍',
    },
    {
      id: 5,
      title: 'Best Prices',
      description: 'We guarantee the lowest prices from trusted retailers.',
      icon: '✨',
    },
    {
      id: 6,
      title: 'Updated Daily',
      description: 'New deals added every day to our growing collection.',
      icon: '📅',
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why DealFinder?</h2>
          <p className="text-xl text-gray-600">
            The easiest way to find amazing deals on products you love
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" onClick={() => window.location.href = '/register'}>
            Create Free Account
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
