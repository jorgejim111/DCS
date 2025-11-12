export const getAllExplanations = async (token) => {
  const response = await api.get('/api/explanation/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getExplanations = async (token) => {
  const response = await api.get('/api/explanation', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createExplanation = async (data, token) => {
  const response = await api.post('/api/explanation', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateExplanation = async (id, data, token) => {
  const response = await api.put(`/api/explanation/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteExplanation = async (id, token) => {
  const response = await api.delete(`/api/explanation/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
