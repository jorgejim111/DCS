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
