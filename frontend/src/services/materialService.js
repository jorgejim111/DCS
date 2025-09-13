import axios from 'axios';

const API_URL = '/api/material';

export const getMaterials = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const createMaterial = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const updateMaterial = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
