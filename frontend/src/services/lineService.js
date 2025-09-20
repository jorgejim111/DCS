import axios from 'axios';

export const getLines = async (token) => {
  const response = await axios.get('/api/line/active', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateLine = async (id, data, token) => {
  const response = await axios.put(`/api/line/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createLine = async (data, token) => {
  const response = await axios.post('/api/line', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
