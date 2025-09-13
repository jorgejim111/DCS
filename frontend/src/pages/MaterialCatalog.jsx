import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTable from '../components/BaseTable';
import { getMaterials, updateMaterial, createMaterial } from '../services/materialService';

const columns = [
  { key: 'name', label: 'Material Name' }
];

const MaterialCatalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllMaterials = async () => {
    try {
      const token = localStorage.getItem('token');
      // Cambia a endpoint que retorna todos los materiales
      const response = await getMaterials(token);
      setData(response);
    } catch (err) {
      if (err?.response?.status === 403) {
        navigate('/');
      } else {
        setError('Error loading data');
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAllMaterials().finally(() => setLoading(false));
  }, []);

  const handleEdit = async (row) => {
    try {
      const token = localStorage.getItem('token');
      if (row.id) {
        await updateMaterial(row.id, { name: row.name }, token);
      } else {
        await createMaterial({ name: row.name, is_active: 1 }, token);
      }
      await fetchAllMaterials();
    } catch (err) {
      setError('Error saving material');
    }
  };

  const handleToggleActive = async (row) => {
    try {
      const token = localStorage.getItem('token');
      await updateMaterial(row.id, { is_active: row.is_active ? 0 : 1 }, token);
      await fetchAllMaterials();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#0C2C65]">Material Catalog</h2>
      <BaseTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
        showInactive={true}
      />
    </div>
  );
};

export default MaterialCatalog;
