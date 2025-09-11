import api from '../services/api';
import { setToken } from '../utils/authUtils';
import { toast } from 'react-toastify';

export const authService = {
  login: (email, password) => api.post('/auth/signin', { email1: email, password }),
  signup: (userData) => api.post('/auth/signup', userData),
  getProfile: (token) =>
    api.get('/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  forgotPassword: (email) => api.post('/auth/forgot', null, { params: { email } }),
  resetPassword: (token, newPassword) =>
    api.post('/auth/reset', null, { params: { token, newPassword } }),
  changePassword: (email, oldPassword, newPassword, confirmPassword) =>
    api.post('/auth/change-password', { email, oldPassword, newPassword, confirmPassword }),
};
export default authService;

// ✅ Updated login function (Option 2)
export const login = async (email, password) => {
  const res = await api.post('/auth/signin', { email1: email, password });

  // Set JWT in authUtils
  setToken(res.data.jwt);

  // Store only role in localStorage safely
  localStorage.setItem('user', JSON.stringify({ role: res.data.role }));

  toast.success('Login successful');
  return res.data;
};

export const signup = async (data) => {
  // Default role if missing
  if (!data.role) {
    data.role = 'ROLE_USER'; // or 'USER' depending on your backend
  }

  const res = await api.post('/auth/signup', data);
  toast.success('Signup successful. Please login.');
  return res.data;
};


export const forgotPassword = async (email) => {
  // Backend expects email as query param
  return api.post('/auth/forgot', null, { params: { email } });
};

export const resetPassword = async (token, newPassword) => {
  // Backend expects token & newPassword as query params
  return api.post('/auth/reset', null, { params: { token, newPassword } });
};

export const changePassword = async (data) => {
  return api.post('/auth/change-password', data);
};

export const getProfile = async () => {
  return (await api.get('/user/profile')).data;
};

// ✅ Helper function to safely get user role
export const getUserRole = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null; // return null if nothing in localStorage
  try {
    const user = JSON.parse(userStr);
    return user?.role || null; // safely return role or null
  } catch (e) {
    console.error('Failed to parse user from localStorage', e);
    return null;
  }
};
