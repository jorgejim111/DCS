import React, { useState, useEffect } from 'react';
import BaseTable from '../components/BaseTable';
import { getPositions } from '../services/positionService';

const columns = [
  { key: 'name', label: 'Position' }
];

const PositionCatalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllPositions = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/position/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const positions = await response.json();
      setData(positions);
    } catch (err) {
      setError('Error loading data');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllPositions().finally(() => setLoading(false));
  }, []);

  const handleEdit = async (row) => {
    try {
      const token = localStorage.getItem('token');
      if (row.id) {
        // Editar existente
        await import('../services/positionService').then(mod => mod.updatePosition(row.id, { name: row.name }, token));
      } else {
        // Agregar nuevo
        await import('../services/positionService').then(mod => mod.createPosition(row, token));
      }
      await fetchAllPositions();
    } catch (err) {
      setError('Error saving position');
    }
  };

  const handleToggleActive = async (row) => {
    try {
      const token = localStorage.getItem('token');
      await import('../services/positionService').then(mod => mod.updatePosition(row.id, { is_active: !row.is_active }, token));
      await fetchAllPositions();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#0C2C65]">Position Catalog</h2>
      <BaseTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
};

export default PositionCatalog;
