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
