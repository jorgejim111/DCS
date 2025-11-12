export const getAllParts = async (token) => {
  const response = await api.get('/api/part/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getActiveParts = async () => {
  const token = localStorage.getItem('token');
  return api.get('/api/part/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createPart = async (data, token) => {
  const response = await api.post('/api/part', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getParts = async (token) => {
  const response = await api.get('/api/part', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updatePart = async (id, data, token) => {
  const response = await api.put(`/api/part/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deletePart = async (id, token) => {
  const response = await api.delete(`/api/part/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const togglePartActive = async (id, isActive, token) => {
  const response = await api.put(`/api/part/${id}`, { is_active: isActive }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
