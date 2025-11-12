import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getStatuses = async (token) => {
  const response = await api.get('/api/status', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createStatus = async (data, token) => {
  const response = await api.post('/api/status', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateStatus = async (id, data, token) => {
  const response = await api.put(`/api/status/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteStatus = async (id, token) => {
  const response = await api.delete(`/api/status/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllStatuses = async (token) => {
  const response = await api.get('/api/status/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
