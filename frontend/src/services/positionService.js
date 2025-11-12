import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getActivePositions = async () => {
  const token = localStorage.getItem('token');
  return api.get('/api/position/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createPosition = async (data, token) => {
  const response = await api.post('/api/position', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getPositions = async (token) => {
  const response = await api.get('/api/position', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updatePosition = async (id, data, token) => {
  const response = await api.put(`/api/position/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deletePosition = async (id, token) => {
  const response = await api.delete(`/api/position/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const togglePositionActive = async (id, isActive, token) => {
  const response = await api.put(`/api/position/${id}`, { is_active: isActive }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
