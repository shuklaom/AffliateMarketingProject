import { useState, useCallback, useEffect } from 'react';
import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../services/wishlistService';
import { useAuth } from './useAuth';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isLoggedIn } = useAuth();

  const loadWishlist = useCallback(async () => {
    if (!isLoggedIn) return;

    setLoading(true);
    try {
      const data = await fetchWishlist();
      setWishlist(data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to load wishlist:', err);
      setError('Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Load wishlist on component mount (only if logged in)
  useEffect(() => {
    if (isLoggedIn) {
      loadWishlist();
    }
  }, [isLoggedIn, loadWishlist]);

  const addItem = useCallback(
    async (productId) => {
      if (!isLoggedIn) {
        setError('Please log in to add items to wishlist');
        return;
      }

      try {
        await addToWishlist(productId);
        // Reload wishlist to sync with backend
        await loadWishlist();
        setError(null);
      } catch (err) {
        console.error('Failed to add to wishlist:', err);
        setError('Failed to add item to wishlist');
      }
    },
    [isLoggedIn, loadWishlist]
  );

  const removeItem = useCallback(
    async (productId) => {
      if (!isLoggedIn) {
        setError('Please log in to manage wishlist');
        return;
      }

      try {
        await removeFromWishlist(productId);
        // Update local state immediately for better UX
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
        setError(null);
      } catch (err) {
        console.error('Failed to remove from wishlist:', err);
        setError('Failed to remove item from wishlist');
      }
    },
    [isLoggedIn]
  );

  const isWishlistItem = useCallback(
    (productId) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  return {
    wishlist,
    loading,
    error,
    addItem,
    removeItem,
    isWishlistItem,
    reloadWishlist: loadWishlist,
  };
};
