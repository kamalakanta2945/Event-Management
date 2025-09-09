// src/services/bookingService.js
import api from './api';
import { toast } from 'react-toastify';

/**
 * Create a new booking
 * @param {Object} data - Booking data
 */
export const createBooking = async (data) => {
  try {
    return (await api.post('/bookings', data)).data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to create booking');
    throw error;
  }
};

/**
 * Get booking by ID
 * @param {string} id - Booking ID
 */
export const getBookingById = async (id) => {
  try {
    return (await api.get(`/bookings/${id}`)).data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch booking');
    throw error;
  }
};

/**
 * Get bookings for the logged-in user
 */
export const getBookingsByUser = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) throw new Error('User not logged in');
    const userId = user.id;
    return (await api.get(`/bookings/user/${userId}`)).data;
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || 'Failed to fetch user bookings');
    throw error;
  }
};

/**
 * Get bookings by event ID
 * @param {string} eventId 
 */
export const getBookingsByEventId = async (eventId) => {
  try {
    return (await api.get(`/bookings/event/${eventId}`)).data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch event bookings');
    throw error;
  }
};

/**
 * Select seats for a booking
 * @param {Object} data - { eventId, seatNumbers, userId }
 */
export const selectSeats = async (data) => {
  try {
    return (await api.post('/bookings/select-seats', data)).data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Seat selection failed');
    throw error;
  }
};

/**
 * Confirm a booking (admin or user)
 * @param {string} bookingId 
 * @param {string} paymentId 
 */
export const confirmBooking = async (bookingId, paymentId) => {
  try {
    return (await api.post(`/bookings/${bookingId}/confirm`, null, { params: { paymentId } })).data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to confirm booking');
    throw error;
  }
};

/**
 * Cancel a booking (admin or user)
 * @param {string} bookingId 
 */
export const cancelBooking = async (bookingId) => {
  try {
    return (await api.post(`/bookings/${bookingId}/cancel`)).data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to cancel booking');
    throw error;
  }
};

/**
 * Get all bookings (admin)
 */
export const getAllBookings = async () => {
  try {
    return (await api.get('/bookings')).data;
  } catch (error) {
    toast.error(error.response?.data?.message || 'Failed to fetch all bookings');
    throw error;
  }
};
