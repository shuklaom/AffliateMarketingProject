import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const Header = ({ logoText = 'DealFinder', navItems = [] }) => {
  const { isLoggedIn, logout } = useAuth();

  const handleBrowse = () => {
    window.location.href = '/browse-deals';
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = '/';
          }}
          className="text-2xl font-bold text-primary hover:text-indigo-700 transition"
        >
          {logoText}
        </a>
        <div className="flex items-center gap-8">
          <ul className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition duration-200 font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={handleBrowse}
            className="hidden md:block text-gray-700 hover:text-primary transition duration-200 font-medium"
          >
            Browse Deals
          </button>
        </div>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <a
                href="/wishlist"
                className="text-gray-700 hover:text-primary transition duration-200 font-medium"
              >
                ❤️ Wishlist
              </a>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-500 transition duration-200 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-gray-700 hover:text-primary transition duration-200 font-medium"
              >
                Login
              </a>
              <a
                href="/register"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
