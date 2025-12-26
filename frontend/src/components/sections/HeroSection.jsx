import React from 'react';
import Button from '../common/Button';

export const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary via-indigo-500 to-secondary py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Find Amazing Deals
        </h1>
        <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
          Discover the best products with the best prices. Browse thousands of deals, 
          save money, and create your personal wishlist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '#products'}
          >
            Browse Deals
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-primary"
            onClick={() => window.location.href = '/register'}
          >
            Create Wishlist
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
