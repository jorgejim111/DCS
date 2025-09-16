export const getActive = async () => {
  const token = localStorage.getItem('token');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const res = await fetch('/api/position/active', config);
  return res.json();
};
export const createPosition = async (data, token) => {
  const response = await axios.post('/api/position', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
import axios from 'axios';

export const getPositions = async (token) => {
  const response = await axios.get('/api/position', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updatePosition = async (id, data, token) => {
  const response = await axios.put(`/api/position/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const togglePositionActive = async (id, isActive, token) => {
  const response = await axios.put(`/api/position/${id}`, { is_active: isActive }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
