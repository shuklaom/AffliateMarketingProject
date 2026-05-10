import { useState, useEffect } from 'react';
import './styles/index.css';
import BrowseDealsPage from './pages/BrowseDealsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const path = window.location.pathname;
    
    if (path === '/login') {
      setCurrentPage('login');
    } else if (path === '/register') {
      setCurrentPage('register');
    } else {
      setCurrentPage('home');
    }
  }, []);

  if (currentPage === 'login') {
    return <LoginPage />;
  } else if (currentPage === 'register') {
    return <RegisterPage />;
  }
  
  return <BrowseDealsPage />;
}

export default App;
