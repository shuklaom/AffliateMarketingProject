import React from 'react';

export const Footer = ({ companyName = 'DealFinder', year = new Date().getFullYear() }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-400">Find amazing deals on products you love.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Browse</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#products" className="hover:text-white transition">All Deals</a></li>
              <li><a href="#products" className="hover:text-white transition">Categories</a></li>
              <li><a href="#products" className="hover:text-white transition">Search</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Account</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/login" className="hover:text-white transition">Login</a></li>
              <li><a href="/register" className="hover:text-white transition">Sign Up</a></li>
              <li><a href="/wishlist" className="hover:text-white transition">Wishlist</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#about" className="hover:text-white transition">About</a></li>
              <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              <li><a href="#privacy" className="hover:text-white transition">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {year} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
