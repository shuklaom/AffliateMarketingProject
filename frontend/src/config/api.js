// API Configuration for backend communication
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,

  // Products endpoints
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCTS_BY_ID: (id) => `${API_BASE_URL}/products/${id}`,
  PRODUCTS_BY_CATEGORY: (category) => `${API_BASE_URL}/products/category/${category}`,
  PRODUCTS_SEARCH: (query) => `${API_BASE_URL}/products/search?q=${query}`,

  // Wishlist endpoints
  WISHLIST: `${API_BASE_URL}/wishlist`,
  WISHLIST_ADD: `${API_BASE_URL}/wishlist/add`,
  WISHLIST_REMOVE: (productId) => `${API_BASE_URL}/wishlist/${productId}`,
};

export const API_CONFIG = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};
