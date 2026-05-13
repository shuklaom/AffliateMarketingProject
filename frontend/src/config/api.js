export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const API_ENDPOINTS = {
  PRODUCTS:              `${API_BASE_URL}/products`,
  PRODUCT_BY_ID:         (id)       => `${API_BASE_URL}/products/${id}`,
  PRODUCTS_FEATURED:     `${API_BASE_URL}/products/featured`,
  PRODUCTS_BY_CATEGORY:  (category) => `${API_BASE_URL}/products/category/${category}`,
  PRODUCTS_SEARCH:       (query)    => `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`,
  PRODUCT_CLICK:         (id)       => `${API_BASE_URL}/products/${id}/click`,
};

export const API_CONFIG = {
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
};
