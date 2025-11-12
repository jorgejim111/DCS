import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getRoles = async (token) => {
  const response = await api.get('/api/role', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getActiveRoles = async () => {
  const token = localStorage.getItem('token');
  return api.get('/api/role/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createRole = async (data, token) => {
  const response = await api.post('/api/role', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateRole = async (id, data, token) => {
  const response = await api.put(`/api/role/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteRole = async (id, token) => {
  const response = await api.delete(`/api/role/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
