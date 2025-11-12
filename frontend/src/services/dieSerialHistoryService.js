// Service for fetching die_serial_history data
import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const fetchDieSerialHistory = async (dateFrom, dateTo, token) => {
  const response = await api.get('/api/die-serial-history', {
    params: { date_from: dateFrom, date_to: dateTo },
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getDieSerialHistories = async (token) => {
  const response = await api.get('/api/die-serial-history', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const createDieSerialHistory = async (data, token) => {
  const response = await api.post('/api/die-serial-history', data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updateDieSerialHistory = async (id, data, token) => {
  const response = await api.put(`/api/die-serial-history/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deleteDieSerialHistory = async (id, token) => {
  const response = await api.delete(`/api/die-serial-history/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
