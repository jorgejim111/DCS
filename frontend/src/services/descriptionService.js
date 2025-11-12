import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDescriptions = async (token) => {
  const response = await api.get('/api/description', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllDescriptions = async () => {
  const token = localStorage.getItem('token');
  const response = await api.get('/api/description/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createDescription = async (data, token) => {
  const response = await api.post('/api/description', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDescription = async (id, data, token) => {
  const response = await api.put(`/api/description/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteDescription = async (id, token) => {
  const response = await api.delete(`/api/description/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
