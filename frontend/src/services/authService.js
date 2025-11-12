import api from './api';

const API_URL = '/api/auth/login';

export const login = async (username, password) => {
  const response = await api.post(API_URL, { username, password });
  return response.data;
};
