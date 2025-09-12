export const createDescription = async (data, token) => {
  const response = await axios.post('/api/description', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import axios from 'axios';

export const getDescriptions = async (token) => {
  // Obtener todos los registros, activos e inactivos
  const response = await axios.get('/api/description/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDescription = async (id, data, token) => {
  const response = await axios.put(`/api/description/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const toggleDescriptionActive = async (id, isActive, token) => {
  const response = await axios.put(`/api/description/${id}`, { is_active: isActive }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
