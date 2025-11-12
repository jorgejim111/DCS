export const getAllDescriptionDrs = async (token) => {
  const response = await api.get('/api/description-dr/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDescriptionDrs = async (token) => {
  const response = await api.get('/api/description-dr', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createDescriptionDr = async (data, token) => {
  const response = await api.post('/api/description-dr', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDescriptionDr = async (id, data, token) => {
  const response = await api.put(`/api/description-dr/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteDescriptionDr = async (id, token) => {
  const response = await api.delete(`/api/description-dr/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
