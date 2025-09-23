
// Service for fetching die_serial_history data
import axios from 'axios';

export async function fetchDieSerialHistory(dateFrom, dateTo) {
  const token = localStorage.getItem('token');
  const response = await axios.get('/api/die-serial-history', {
    params: { date_from: dateFrom, date_to: dateTo },
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return response.data;
}
export async function createDieSerialHistory(data) {
  const token = localStorage.getItem('token');
  const response = await axios.post('/api/die-serial-history', data, {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
  return response.data;
}
