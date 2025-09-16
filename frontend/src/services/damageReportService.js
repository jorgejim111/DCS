
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

const damageReportService = { getAll };
export default damageReportService;
