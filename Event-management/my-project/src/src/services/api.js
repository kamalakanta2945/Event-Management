import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { getToken } from '../utils/authUtils';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Add token to all requests
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.message || 'API Error');
    return Promise.reject(error);
  }
);

export default api;
