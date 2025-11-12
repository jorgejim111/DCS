export const getActiveInches = async (token) => {
  const response = await api.get('/api/inch/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getActiveParts = async (token) => {
  const response = await api.get('/api/part/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getActiveDescriptions = async (token) => {
  const response = await api.get('/api/description/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDieDescriptions = async () => {
  const response = await api.get('/api/die-description', {
    headers: getAuthHeader()
  });
  return response.data;
};

export const createDieDescription = async (data, token) => {
  const response = await api.post('/api/die-description', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDieDescription = async (id, data) => {
  const headers = getAuthHeader();
  const response = await api.put(`/api/die-description/${id}`, data, {
    headers
  });
  return response.data;
};

export const deleteDieDescription = async (id, token) => {
  const response = await api.delete(`/api/die-description/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllDieDescriptions = async () => {
  const headers = getAuthHeader();
  const response = await api.get('/api/die-description/all', {
    headers
  });
  return response.data;
};
