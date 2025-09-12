import React, { useState, useEffect } from 'react';
import BaseTable from '../components/BaseTable';
import { getExplanations, updateExplanation, createExplanation } from '../services/explanationService';
import { useNavigate } from 'react-router-dom';

const columns = [
  { key: 'name', label: 'Explanation' }
];

const ExplanationCatalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllExplanations = async () => {
    try {
      const token = localStorage.getItem('token');
      const explanations = await getExplanations(token);
      setData(explanations);
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
    fetchAllExplanations().finally(() => setLoading(false));
  }, []);

  const handleEdit = async (row) => {
    try {
      const token = localStorage.getItem('token');
      if (row.id) {
        await updateExplanation(row.id, { name: row.name }, token);
      } else {
        await createExplanation({ name: row.name, is_active: 1 }, token);
      }
      await fetchAllExplanations();
    } catch (err) {
      setError('Error saving explanation');
    }
  };

  const handleToggleActive = async (row) => {
    try {
      const token = localStorage.getItem('token');
      await updateExplanation(row.id, { is_active: !row.is_active }, token);
      await fetchAllExplanations();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#0C2C65]">Explanation Catalog</h2>
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

export default ExplanationCatalog;
