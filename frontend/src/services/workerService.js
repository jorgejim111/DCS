import axios from "axios";

function getAuthConfig() {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

const API_URL = "/api/worker";

const getAll = async () => {
  const res = await axios.get(API_URL, getAuthConfig());
  return res.data;
};

const create = async (worker) => {
  const res = await axios.post(API_URL, worker, getAuthConfig());
  return res.data;
};

const update = async (id, worker) => {
  const res = await axios.put(`${API_URL}/${id}`, worker, getAuthConfig());
  return res.data;
};

const workerService = { getAll, create, update };
export default workerService;
