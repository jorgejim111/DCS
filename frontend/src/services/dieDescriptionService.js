import axios from 'axios';

const API_URL = '/api/die-description';

function getAuthHeader() {
	const token = localStorage.getItem('token');
	return token ? { Authorization: `Bearer ${token}` } : {};
}

export const getAllDieDescriptions = () => axios.get(API_URL, { headers: getAuthHeader() });
export const addDieDescription = (data) => axios.post(API_URL, data, { headers: getAuthHeader() });
export const updateDieDescription = (id, data) => axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeader() });
export const activateDieDescription = (id) => axios.patch(`${API_URL}/${id}/activate`, {}, { headers: getAuthHeader() });
export const deactivateDieDescription = (id) => axios.patch(`${API_URL}/${id}/deactivate`, {}, { headers: getAuthHeader() });

// Foreign key fetchers
export const getActiveInches = () => axios.get('/api/inch/active', { headers: getAuthHeader() });
export const getActiveParts = () => axios.get('/api/part/active', { headers: getAuthHeader() });
export const getActiveDescriptions = () => axios.get('/api/description/active', { headers: getAuthHeader() });
