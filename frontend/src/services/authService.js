import axios from 'axios';

const API_URL = '/api/auth/login';

export const login = async (username, password) => {
  const response = await axios.post(API_URL, { username, password });
  return response.data;
};
