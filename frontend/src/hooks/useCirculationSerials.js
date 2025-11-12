import { useEffect, useState } from 'react';
import * as dieSerialService from '../services/dieSerialService';

export default function useCirculationSerials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    dieSerialService
      .getAllDieSerials({ status: 2 })
      .then(res => {
        setData(res); // res ya es el array de seriales
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
