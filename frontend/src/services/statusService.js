export const createStatus = async (data, token) => {
  const response = await axios.post('/api/status', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import axios from 'axios';

export const getStatuses = async (token) => {
  // Obtener todos los registros, activos e inactivos
  const response = await axios.get('/api/status/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateStatus = async (id, data, token) => {
  const response = await axios.put(`/api/status/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const toggleStatusActive = async (id, isActive, token) => {
  const response = await axios.put(`/api/status/${id}`, { is_active: isActive }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
