import { useState, useCallback } from 'react';
import { login, logout, isAuthenticated } from '../services/authService';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = useCallback(async (email, password) => {
    try {
      setLoading(true);
      await login(email, password);
      setIsLoggedIn(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsLoggedIn(false);
  }, []);

  return {
    isLoggedIn,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout,
  };
};
