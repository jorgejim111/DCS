import axios from "axios";

function getAuthConfig() {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

const API_URL = "/api/damage-report";

const getAll = async ({ page, startDate, endDate }) => {
  const params = {};
  if (page) params.page = page;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  const config = getAuthConfig();
  config.params = params;
  const res = await axios.get(API_URL, config);
  return res.data;
};


export const getSerialDetailsForReport = (id) => {
  const token = localStorage.getItem('token');
  return axios.get(`/api/die-serial/${id}/details-for-report`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};


export const createDamageReport = async (data) => {
  const config = getAuthConfig();
  const res = await axios.post(API_URL, data, config);
  return res.data;
};

// Buscar el primer damage report por serial
export const getDamageReportBySerial = async (serial) => {
  const token = localStorage.getItem('token');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  // Ajusta la URL según tu backend
  const res = await axios.get(`/api/damage-report/by-serial/${serial}`, config);
  return res.data;
};

const damageReportService = { getAll, createDamageReport };
export default damageReportService;
