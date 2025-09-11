import api from './api';
import { toast } from 'react-toastify';

/**
 * Add a review for an event
 * @param {Object} data - { eventId, rating, comment }
 */
export const addReview = async (data) => {
  try {
    const response = await api.post('/reviews', data);
    toast.success('Review submitted successfully!');
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to submit review.');
    throw error;
  }
};
