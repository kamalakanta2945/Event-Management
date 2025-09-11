import api from './api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * User Management Service
 * Handles all user-related operations including CRUD, status updates, and data exports
 */

// ==================== USER CRUD OPERATIONS ====================

/**
 * Add a new user to the system
 * @param {Object} data - User data object
 * @returns {Promise} API response
 */
export const addUser = async (data) => {
  const res = await api.post('/admin/add', data);
  return res.data?.data || res.data;
};

/**
 * Update existing user information
 * @param {string|number} userId - ID of the user to update
 * @param {Object} data - Updated user data
 * @returns {Promise} API response
 */
export const updateUser = async (userId, data) => {
  const res = await api.post(`/admin/${userId}`, data);
  return res.data?.data || res.data;
};

/**
 * Toggle user active/inactive status
 * @param {string|number} userId - ID of the user to update
 * @returns {Promise} API response
 */
export const updateUserStatus = async (userId) => {
  const res = await api.post(`/admin/updateStatus/${userId}`);
  return res.data?.data || res.data;
};

/**
 * Get paginated list of users with optional search
 * @param {number} page - Page number (default: 0)
 * @param {number} size - Items per page (default: 5)
 * @param {string} query - Search query string (default: '')
 * @returns {Promise} Paginated user data
 */
export const getAllUsers = async (page = 0, size = 5, query = '') => {
  const res = await api.get('/admin/getByPage', { params: { page, size, query } });
  return res.data?.data || res.data;
};

/**
 * Get user details by ID
 * @param {string|number} id - User ID
 * @returns {Promise} User data object
 */
export const getUserById = async (id) => {
  const res = await api.get(`/admin/byId/${id}`);
  return res.data?.data || res.data;
};

/**
 * Delete a user from the system
 * @param {string|number} id - User ID to delete
 * @returns {Promise} API response
 */
export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/${id}`);
  return res.data?.data || res.data;
};

// ==================== DATA EXPORT OPERATIONS ====================

/**
 * Export users data to Excel format
 * Triggers browser download of the generated file
 */
export const exportExcel = async () => {
  try {
    const res = await api.get('/admin/excel', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.xls');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('Excel export failed:', error);
    throw error;
  }
};

/**
 * Export users data to PDF format
 * Triggers browser download of the generated file
 */
export const exportPdf = async () => {
  try {
    const res = await api.get('/admin/pdf', { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error('PDF export failed:', error);
    throw error;
  }
};

// ==================== SERVICE OBJECT EXPORT ====================

/**
 * User Service Object
 * Contains all user-related operations
 */
const UserService = {
  // CRUD operations
  addUser,
  updateUser,
  updateUserStatus,
  getAllUsers,
  getUserById,
  deleteUser,
  
  // Export operations
  exportExcel,
  exportPdf
};

export default UserService;