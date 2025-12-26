import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

// Fetch user's wishlist
export const fetchWishlist = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.WISHLIST);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add product to wishlist
export const addToWishlist = async (productId) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.WISHLIST_ADD, { productId });
    return response.data;
  } catch (error) {
    console.error(`Error adding product ${productId} to wishlist:`, error);
    throw error;
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const response = await apiClient.delete(API_ENDPOINTS.WISHLIST_REMOVE(productId));
    return response.data;
  } catch (error) {
    console.error(`Error removing product ${productId} from wishlist:`, error);
    throw error;
  }
};

// Check if product is in wishlist
export const isInWishlist = async (productId) => {
  try {
    const wishlist = await fetchWishlist();
    return wishlist.some((item) => item.id === productId);
  } catch (error) {
    return false;
  }
};
