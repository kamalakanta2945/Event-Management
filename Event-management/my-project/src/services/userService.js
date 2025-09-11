import api from './api';

export const getUserProfile = async () => {
    const res = await api.get('/user/profile');
    return res.data?.data || res.data;
};

export const updateUserProfile = async (data) => {
    const res = await api.put('/user/profile', data);
    return res.data?.data || res.data;
};

export const updateUser = async (userId, data) => {
  const res = await api.post(`/user/${userId}`, data);
  return res.data?.data || res.data;
};

export const getUserById = async (id) => {
  const res = await api.get(`/user/byId/${id}`);
  return res.data?.data || res.data;
};

// Add more if needed