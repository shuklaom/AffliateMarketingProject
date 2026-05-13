import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

export const fetchProducts = async ({ page = 1, limit = 24, sort = 'latest' } = {}) => {
  const res = await apiClient.get(`${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${limit}&sort=${sort}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await apiClient.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
  return res.data;
};

export const fetchFeaturedProducts = async ({ limit = 8 } = {}) => {
  const res = await apiClient.get(`${API_ENDPOINTS.PRODUCTS_FEATURED}?limit=${limit}`);
  return res.data;
};

export const fetchProductsByCategory = async (category, { page = 1, limit = 24, sort = 'latest' } = {}) => {
  const res = await apiClient.get(
    `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)}?page=${page}&limit=${limit}&sort=${sort}`
  );
  return res.data;
};

export const searchProducts = async (query, { page = 1, limit = 24, sort = 'latest' } = {}) => {
  const res = await apiClient.get(
    `${API_ENDPOINTS.PRODUCTS_SEARCH(query)}&page=${page}&limit=${limit}&sort=${sort}`
  );
  return res.data;
};

export const recordProductClick = async (id) => {
  // Fire-and-forget — don't block the tab opening on a tracking failure
  try {
    await apiClient.post(API_ENDPOINTS.PRODUCT_CLICK(id));
  } catch (_) { /* ignore */ }
};

