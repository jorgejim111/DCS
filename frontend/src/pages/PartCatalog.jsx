import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTable from '../components/BaseTable';
import { getParts, updatePart, createPart } from '../services/partService';

const columns = [
  { key: 'name', label: 'Part Name' }
];

const PartCatalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllParts = async () => {
    try {
      const token = localStorage.getItem('token');
      const parts = await getParts(token);
      setData(parts);
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
    fetchAllParts().finally(() => setLoading(false));
  }, []);

  const handleEdit = async (row) => {
    try {
      const token = localStorage.getItem('token');
      if (row.id) {
        await updatePart(row.id, { name: row.name }, token);
      } else {
        await createPart({ name: row.name, is_active: 1 }, token);
      }
      await fetchAllParts();
    } catch (err) {
      setError('Error saving part');
    }
  };

  const handleToggleActive = async (row) => {
    try {
      const token = localStorage.getItem('token');
      await updatePart(row.id, { is_active: !row.is_active }, token);
      await fetchAllParts();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#0C2C65]">Part Catalog</h2>
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

export default PartCatalog;
