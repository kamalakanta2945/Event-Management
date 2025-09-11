import api from './api';

/**
 * Create a new event
 * @param {Object} data - Event data
 */
export const createEvent = async (data) => {
  const response = await api.post('/events', data);
  return response.data?.data || response.data; 
};

/**
 * Get event by ID
 * @param {string} id - Event _id
 */
export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data?.data || response.data;
};

/**
 * Get all events
 */
export const getAllEvents = async () => {
  const response = await api.get('/events');
  return response.data?.data || response.data;
};

/**
 * Get upcoming events
 */
export const getUpcomingEvents = async () => {
  const response = await api.get('/events/upcoming');
  return response.data?.data || response.data;
};

/**
 * Get events for the logged-in organizer
 */
export const getEventsByOrganizer = async () => {
  const response = await api.get('/events/my-events');
  return response.data?.data || response.data;
};

/**
 * Search events with optional params
 * @param {Object} params - { name, venue, category, startDate, endDate }
 */
export const searchEvents = async (params) => {
  const response = await api.get('/events/search', { params });
  return response.data?.data || response.data;
};

/**
 * Update an event
 * @param {string} id - Event _id
 * @param {Object} data - Event data to update
 */
export const updateEvent = async (id, data) => {
  const response = await api.put(`/events/${id}`, data);
  return response.data?.data || response.data;
};

/**
 * Delete an event
 * @param {string} id - Event _id
 */
export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data?.data || response.data;
};
