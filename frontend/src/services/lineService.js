import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getActiveLines = async () => {
  const token = localStorage.getItem('token');
  return api.get('/api/line/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const getLines = async (token) => {
  const response = await api.get('/api/line', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createLine = async (data, token) => {
  const response = await api.post('/api/line', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateLine = async (id, data, token) => {
  const response = await api.put(`/api/line/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteLine = async (id, token) => {
  const response = await api.delete(`/api/line/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllLines = async (token) => {
  const response = await api.get('/api/line/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
