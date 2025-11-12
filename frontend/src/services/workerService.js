import api from './api';

const API_URL = '/api/worker';
const getAuthConfig = () => {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const getAll = async () => {
  const res = await api.get(API_URL, getAuthConfig());
  return res.data;
};

export const create = async (worker) => {
  const res = await api.post(API_URL, worker, getAuthConfig());
  return res.data;
};

export const update = async (id, worker) => {
  const res = await api.put(`${API_URL}/${id}`, worker, getAuthConfig());
  return res.data;
};

export const deleteWorker = async (id) => {
  const res = await api.delete(`${API_URL}/${id}`, getAuthConfig());
  return res.data;
};

const workerService = { getAll, create, update, deleteWorker };
export default workerService;
