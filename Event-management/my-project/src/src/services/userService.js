import api from './api';

export const getUserProfile = async () => {
    return api.get('/user/profile');
};

export const updateUserProfile = async (data) => {
    return api.put('/user/profile', data);
};

export const updateUser = async (userId, data) => {
  return api.post(`/user/${userId}`, data);
};

export const getUserById = async (id) => {
  return (await api.get(`/user/byId/${id}`)).data;
};

// Add more if needed