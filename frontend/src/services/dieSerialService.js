// Obtiene un die_serial por serial_number
export const getDieSerialBySerialNumber = (serial_number) => {
	const config = getAuthConfig();
	config.params = { serial_number };
	return axios.get('/api/die-serial', config).then(res => Array.isArray(res.data) ? res.data[0] : res.data);
};

// Obtiene el historial de un die_serial por serial_number
export const getDieSerialHistory = (serial_number) => {
	const config = getAuthConfig();
	return axios.get(`/api/die-serial/history/${encodeURIComponent(serial_number)}`, config).then(res => res.data);
};
// Obtiene solo los seriales activos ordenados por serial_number ascendente
export const getAllActiveDieSerials = () => {
	const config = getAuthConfig();
	config.params = { is_active: 1, order: 'serial_number', direction: 'asc' };
	return axios.get('/api/die-serial', config).then(res => res.data);
};
import axios from 'axios';

function getAuthConfig() {
	const token = localStorage.getItem('token');
	return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
}

export const getAllDieSerials = (params = {}) => {
	const config = getAuthConfig();
	config.params = params;
	return axios.get('/api/die-serial', config);
};
export const addDieSerial = (data) => axios.post('/api/die-serial', data, getAuthConfig());
export const updateDieSerial = (id, data) => axios.put(`/api/die-serial/${id}`, data, getAuthConfig());
export const patchDieSerialActive = (id, is_active) => axios.patch(`/api/die-serial/${id}/${is_active ? 'activate' : 'deactivate'}`, {}, getAuthConfig());
export const getActiveDieDescriptions = () => axios.get('/api/die-description/active', getAuthConfig());
export const getActiveStatuses = () => axios.get('/api/status/active', getAuthConfig());
