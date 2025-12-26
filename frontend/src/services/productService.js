import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

// Fetch all products
export const fetchProducts = async (page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category, page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.PRODUCTS_BY_CATEGORY(category)}?page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching products in ${category}:`, error);
    throw error;
  }
};

// Search products
export const searchProducts = async (query, page = 1, limit = 20) => {
  try {
    const response = await apiClient.get(
      `${API_ENDPOINTS.PRODUCTS_SEARCH(query)}&page=${page}&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

// Fetch single product by ID
export const fetchProductById = async (id) => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.PRODUCTS_BY_ID(id));
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

