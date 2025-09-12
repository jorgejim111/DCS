import axios from 'axios';

export const getDescriptionDrs = async (token) => {
  const response = await axios.get('/api/description-dr/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDescriptionDr = async (id, data, token) => {
  const response = await axios.put(`/api/description-dr/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createDescriptionDr = async (data, token) => {
  const response = await axios.post('/api/description-dr', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
