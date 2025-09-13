export const getActiveInches = async (token) => {
  const response = await axios.get('/api/inch/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
export const updateInch = async (id, data, token) => {
  const response = await axios.put(`/api/inch/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createInch = async (data, token) => {
  const response = await axios.post('/api/inch', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import axios from 'axios';

const API_URL = '/api/inch';

export const getInches = async (token) => {
  // Obtener todos los registros, activos e inactivos
  const response = await axios.get(API_URL + '/all', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
