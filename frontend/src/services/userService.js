import api from './api';

export const getActive = async () => {
  const token = localStorage.getItem('token');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const res = await fetch('/api/user/active', config);
  return res.json();
};

const API_URL = '/api/user';
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const getAll = async () => {
  const res = await api.get(API_URL, getAuthConfig());
  return res.data;
};

const create = async (user) => {
  const res = await api.post(API_URL, user, getAuthConfig());
  return res.data;
};

const update = async (id, user) => {
  // Enviar todos los campos editables, incluyendo password
  const payload = {
    username: user.username,
    role_id: Number(user.role_id),
    password: user.password // Siempre enviar password
  };
  const res = await api.put(`${API_URL}/${id}`, payload, getAuthConfig());
  return res.data;
};

const userService = { getAll, create, update };
export default userService;
