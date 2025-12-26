import { useState, useEffect } from 'react';
import './styles/index.css';
import HomePage from './pages/HomePage';
import BrowseDealsPage from './pages/BrowseDealsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Listen for navigation changes
  useEffect(() => {
    const handleNavigate = (event) => {
      const path = window.location.pathname;
      if (path === '/browse-deals') {
        setCurrentPage('browse');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleNavigate);
    handleNavigate();

    return () => window.removeEventListener('popstate', handleNavigate);
  }, []);

  // Override window.location.href to handle client-side navigation
  useEffect(() => {
    const originalHref = Object.getOwnPropertyDescriptor(
      window.location,
      'href'
    );

    Object.defineProperty(window.location, 'href', {
      set: (url) => {
        if (url === '/browse-deals') {
          setCurrentPage('browse');
          window.history.pushState(null, '', '/browse-deals');
        } else if (url === '/') {
          setCurrentPage('home');
          window.history.pushState(null, '', '/');
        } else if (url.startsWith('http') || url.startsWith('/')) {
          window.location = url;
        }
      },
      get: () => window.location.toString(),
    });

    return () => {
      if (originalHref) {
        Object.defineProperty(window.location, 'href', originalHref);
      }
    };
  }, []);

  return currentPage === 'browse' ? <BrowseDealsPage /> : <HomePage />;
}

export default App;
