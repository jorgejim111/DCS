import axios from 'axios';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getProducts = async () => {
  const response = await axios.get('/api/product/active', {
    headers: getAuthHeader()
  });
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axios.post('/api/product', data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axios.put(`/api/product/${id}`, data, {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getDieDescriptions = async () => {
  const response = await axios.get('/api/die-description/active', {
    headers: getAuthHeader()
  });
  return response.data;
};

export const getMaterials = async () => {
  const response = await axios.get('/api/material/active', {
    headers: getAuthHeader()
  });
  return response.data;
};
