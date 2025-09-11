import axios from 'axios';

const API_URL = '/api/inch';

export const getInches = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
