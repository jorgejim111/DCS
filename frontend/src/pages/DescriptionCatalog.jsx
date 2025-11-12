import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseTable from '../components/BaseTable';
import { getAllDescriptions, updateDescription, createDescription } from '../services/descriptionService';

const columns = [
  { key: 'name', label: 'Description' }
];

const DescriptionCatalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllDescriptions = async () => {
    try {
      const token = localStorage.getItem('token');
  const descriptions = await getAllDescriptions();
      // Ordenar ascendente por name
      const sorted = descriptions.slice().sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
      setData(sorted);
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
    fetchAllDescriptions().finally(() => setLoading(false));
  }, []);

  const handleEdit = async (row) => {
    try {
      const token = localStorage.getItem('token');
      if (row.id) {
        await updateDescription(row.id, { name: row.name }, token);
      } else {
        await createDescription({ name: row.name, is_active: 1 }, token);
      }
      await fetchAllDescriptions();
    } catch (err) {
      setError('Error saving description');
    }
  };

  const handleToggleActive = async (row) => {
    try {
      const token = localStorage.getItem('token');
      await updateDescription(row.id, { is_active: !row.is_active }, token);
      await fetchAllDescriptions();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#0C2C65]">Description Catalog</h2>
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

export default DescriptionCatalog;
