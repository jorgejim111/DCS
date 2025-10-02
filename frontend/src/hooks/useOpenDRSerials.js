import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useOpenDRSerials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios.get('/api/die-serial?status=4', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => setData(Array.isArray(res.data) ? res.data : []))
      .catch(() => setData([]))
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
