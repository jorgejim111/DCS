import axios from 'axios';

export const getExplanations = async (token) => {
  const response = await axios.get('/api/explanation/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateExplanation = async (id, data, token) => {
  const response = await axios.put(`/api/explanation/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createExplanation = async (data, token) => {
  const response = await axios.post('/api/explanation', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
