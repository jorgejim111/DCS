import api from './api';

function getAuthConfig() {
  const token = localStorage.getItem('token');
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const getAllActiveDamageReportIds = async (filter = '') => {
  const config = getAuthConfig();
  config.params = {};
  if (filter) config.params.filter = filter;
  const res = await api.get('/api/damage-report/active-ids', config);
  return res.data;
};
