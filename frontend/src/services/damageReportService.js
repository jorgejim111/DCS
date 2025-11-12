import api from "./api";

// Obtener un Damage Report por ID
export const getDamageReportById = async (id) => {
  const config = getAuthConfig();
  const res = await api.get(`/api/damage-report/${id}`, config);
  return res.data;
};
// Obtener Damage Reports por status_id
export const getDamageReportsByStatus = async (status_id) => {
  const config = getAuthConfig();
  const res = await api.get(`/api/damage-report/status/${status_id}`, config);
  return res.data;
};
// Obtener todos los Damage Reports abiertos (id_status = 5)
export const getOpenDamageReports = async () => {
  const config = getAuthConfig();
  const res = await api.get("/api/damage-report/open", config);
  return res.data;
};

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
  const res = await api.get(API_URL, config);
  return res.data;
};


export const getSerialDetailsForReport = (id) => {
  const token = localStorage.getItem('token');
  return api.get(`/api/die-serial/${id}/details-for-report`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const createDamageReport = async (data) => {
  const config = getAuthConfig();
  const res = await api.post(API_URL, data, config);
  return res.data;
};

// Buscar el primer damage report por serial
export const getDamageReportBySerial = async (serial) => {
  const token = localStorage.getItem('token');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  // Ajusta la URL según tu backend
  const res = await api.get(`/api/damage-report/by-serial/${serial}`, config);
  return res.data;
};

const damageReportService = { getAll, createDamageReport };
export default damageReportService;
