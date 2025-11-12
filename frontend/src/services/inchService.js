import api from './api';
export const getAllInches = async (token) => {
  const response = await api.get('/api/inch/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};


const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getInches = async (token) => {
  const response = await api.get('/api/inch', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createInch = async (data, token) => {
  const response = await api.post('/api/inch', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateInch = async (id, data, token) => {
  const response = await api.put(`/api/inch/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteInch = async (id, token) => {
  const response = await api.delete(`/api/inch/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
