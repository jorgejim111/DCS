import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async () => {
  const response = await api.get('/api/product', {
    headers: getAuthHeader()
  });
  // Si la respuesta es un array, úsala directamente; si es objeto, usa .data; si no, retorna []
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.data)) return response.data.data;
  return [];
};

export const getActiveProducts = async () => {
  return api.get('/api/product/active', {
    headers: getAuthHeader()
  });
};

export const createProduct = async (data) => {
  const response = await api.post('/api/product', data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await api.put(`/api/product/${id}`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/api/product/${id}`, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getDieDescriptions = async () => {
  const response = await api.get('/api/die-description/active', {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getMaterials = async () => {
  const response = await api.get('/api/material/active', {
    headers: getAuthHeader()
  });
  return response.data;
};
