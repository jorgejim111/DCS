import React, { useState, useEffect } from 'react';
import BaseTable from '../components/BaseTable';
import { getRoles, updateRole, createRole } from '../services/roleService';
import { useNavigate } from 'react-router-dom';

const columns = [
  { key: 'name', label: 'Role Name' }
];

const RoleCatalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAllRoles = async () => {
    try {
      const token = localStorage.getItem('token');
      const roles = await getRoles(token);
      setData(roles);
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
    fetchAllRoles().finally(() => setLoading(false));
  }, []);

  const handleEdit = async (row) => {
    try {
      const token = localStorage.getItem('token');
      if (row.id) {
        await updateRole(row.id, { name: row.name }, token);
      } else {
        await createRole({ name: row.name, is_active: 1 }, token);
      }
      await fetchAllRoles();
    } catch (err) {
      setError('Error saving role');
    }
  };

  const handleToggleActive = async (row) => {
    try {
      const token = localStorage.getItem('token');
      await updateRole(row.id, { is_active: !row.is_active }, token);
      await fetchAllRoles();
    } catch (err) {
      setError('Error updating status');
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#0C2C65]">Role Catalog</h2>
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

export default RoleCatalog;
