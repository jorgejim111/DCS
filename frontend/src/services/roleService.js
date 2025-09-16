function getAuthConfig() {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const getActive = async () => {
  const res = await axios.get('/api/role/active', getAuthConfig());
  return res.data;
};
import axios from 'axios';

export const getRoles = async (token) => {
  const response = await axios.get('/api/role/all', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateRole = async (id, data, token) => {
  const response = await axios.put(`/api/role/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createRole = async (data, token) => {
  const response = await axios.post('/api/role', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
