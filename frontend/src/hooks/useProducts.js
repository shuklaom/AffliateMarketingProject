import { useState, useEffect, useCallback } from 'react';
import {
  fetchProducts,
  fetchProductsByCategory,
  searchProducts,
} from '../services/productService';

/**
 * Centralised product-fetching hook.
 *
 * Usage:
 *   const { products, loading, error, totalPages, setCategory, setQuery, setPage } = useProducts();
 */
export function useProducts({ initialCategory = 'All', initialQuery = '', initialSort = 'latest' } = {}) {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory]     = useState(initialCategory);
  const [query, setQuery]           = useState(initialQuery);
  const [sort, setSort]             = useState(initialSort);

  const normalise = (data) => {
    if (Array.isArray(data)) return { products: data, totalPages: 1 };
    return {
      products:   Array.isArray(data.products) ? data.products : [],
      totalPages: data.totalPages ?? 1,
    };
  };

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (query.trim()) {
        data = await searchProducts(query, { page, sort });
      } else if (category && category !== 'All') {
        data = await fetchProductsByCategory(category, { page, sort });
      } else {
        data = await fetchProducts({ page, sort });
      }
      const { products: items, totalPages: tp } = normalise(data);
      setProducts(items);
      setTotalPages(tp);
    } catch (err) {
      setError(err.message || 'Failed to load products.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [query, category, page, sort]);

  useEffect(() => { load(); }, [load]);

  const handleSetCategory = useCallback((cat) => {
    setCategory(cat);
    setQuery('');
    setPage(1);
  }, []);

  const handleSetQuery = useCallback((q) => {
    setQuery(q);
    setCategory('All');
    setPage(1);
  }, []);

  const handleSetSort = useCallback((s) => {
    setSort(s);
    setPage(1);
  }, []);

  return {
    products,
    loading,
    error,
    page,
    totalPages,
    setPage,
    category,
    setCategory: handleSetCategory,
    query,
    setQuery: handleSetQuery,
    sort,
    setSort: handleSetSort,
    refetch: load,
  };
}
