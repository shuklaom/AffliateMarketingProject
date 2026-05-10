import React from 'react';

const Footer = ({ companyName = 'Everyday Deals', year = new Date().getFullYear() }) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{companyName}</h3>
            <p className="text-gray-600">Smart shopping, smart savings. Discover the best deals, effortlessly.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Browse</h4>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#products" className="hover:text-primary transition">All Deals</a></li>
              <li><a href="#products" className="hover:text-primary transition">Categories</a></li>
              <li><a href="#products" className="hover:text-primary transition">Search</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Account</h4>
            <ul className="text-gray-600 space-y-2">
              <li><a href="/login" className="hover:text-primary transition">Login</a></li>
              <li><a href="/register" className="hover:text-primary transition">Sign Up</a></li>
              <li><a href="/wishlist" className="hover:text-primary transition">Wishlist</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="text-gray-600 space-y-2">
              <li><a href="#about" className="hover:text-primary transition">About</a></li>
              <li><a href="#contact" className="hover:text-primary transition">Contact</a></li>
              <li><a href="#privacy" className="hover:text-primary transition">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
          <p>&copy; {year} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
