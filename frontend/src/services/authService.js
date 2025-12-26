import apiClient from './apiClient';
import { API_ENDPOINTS } from '../config/api';

// Login user
export const login = async (email, password) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.LOGIN, { email, password });
    if (response.data.token) {
      localStorage.setItem('jwtToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Register user
export const register = async (userData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.REGISTER, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Logout user
export const logout = () => {
  localStorage.removeItem('jwtToken');
  localStorage.removeItem('refreshToken');
};

// Get current user token
export const getToken = () => {
  return localStorage.getItem('jwtToken');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('jwtToken');
};
