import api from './api';

// Obtiene un die_serial por serial_number
export const getDieSerialBySerialNumber = (serial_number) => {
	const config = getAuthConfig();
	config.params = { serial_number };
	return api.get('/api/die-serial', config).then(res => Array.isArray(res.data) ? res.data[0] : res.data);
};

// Obtiene el historial de un die_serial por serial_number
export const getDieSerialHistory = (serial_number) => {
	const config = getAuthConfig();
	return api.get(`/api/die-serial/history/${encodeURIComponent(serial_number)}`, config).then(res => res.data);
};
// Obtiene solo los seriales activos ordenados por serial_number ascendente
export const getAllActiveDieSerials = () => {
	const config = getAuthConfig();
	config.params = { is_active: 1, order: 'serial_number', direction: 'asc' };
	return api.get('/api/die-serial', config).then(res => res.data);
};

function getAuthConfig() {
	const token = localStorage.getItem('token');
	return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

// Eliminadas duplicidades: usar solo las versiones async con endpoint '/api/dieserial'
export const patchDieSerialActive = (id, is_active) => api.patch(`/api/die-serial/${id}/${is_active ? 'activate' : 'deactivate'}`, {}, getAuthConfig());
export const getActiveDieDescriptions = () => api.get('/api/die-description/active', getAuthConfig());
export const getActiveStatuses = () => api.get('/api/status/active', getAuthConfig());

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getDieSerials = async (token) => {
  const response = await api.get('/api/die-serial', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createDieSerial = async (data, token) => {
  const response = await api.post('/api/die-serial', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDieSerial = async (id, data, token) => {
  const response = await api.put(`/api/die-serial/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteDieSerial = async (id, token) => {
  const response = await api.delete(`/api/die-serial/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const addDieSerial = async (data, token) => {
  const response = await api.post('/api/die-serial', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getAllDieSerials = async (params = {}) => {
  const config = getAuthConfig();
  if (params && Object.keys(params).length > 0) {
    config.params = params;
  }
  const response = await api.get('/api/die-serial', config);
  return response.data;
};
