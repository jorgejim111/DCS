import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getMaterials = async (token) => {
  const response = await api.get('/api/material', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createMaterial = async (data, token) => {
  const response = await api.post('/api/material', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateMaterial = async (id, data, token) => {
  const response = await api.put(`/api/material/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteMaterial = async (id, token) => {
  const response = await api.delete(`/api/material/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
