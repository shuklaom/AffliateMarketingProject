import axios from 'axios';
import { API_BASE_URL, API_CONFIG } from '../config/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  ...API_CONFIG,
});

export default apiClient;
