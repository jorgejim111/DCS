export const createPart = async (data, token) => {
  const response = await axios.post('/api/part', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import axios from 'axios';

export const getParts = async (token) => {
  // Obtener todos los registros, activos e inactivos
  const response = await axios.get('/api/part/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updatePart = async (id, data, token) => {
  const response = await axios.put(`/api/part/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const togglePartActive = async (id, isActive, token) => {
  const response = await axios.put(`/api/part/${id}`, { is_active: isActive }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
