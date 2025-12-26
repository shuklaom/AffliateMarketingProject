import { useState, useEffect, useCallback } from 'react';
import { fetchProducts, fetchProductsByCategory, searchProducts } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(Array.isArray(data) ? data : data.products || []);
      setError(null);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const searchByCategory = useCallback(async (category) => {
    try {
      setLoading(true);
      const data = await fetchProductsByCategory(category);
      setProducts(Array.isArray(data) ? data : data.products || []);
      setError(null);
    } catch (err) {
      console.error(`Error loading category ${category}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchByQuery = useCallback(async (query) => {
    if (!query.trim()) {
      loadProducts();
      return;
    }

    try {
      setLoading(true);
      const data = await searchProducts(query);
      setProducts(Array.isArray(data) ? data : data.products || []);
      setError(null);
    } catch (err) {
      console.error(`Error searching for "${query}":`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  const refetch = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    searchByCategory,
    searchByQuery,
    refetch,
  };
};
