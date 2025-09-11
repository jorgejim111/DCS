import React, { useState, useEffect } from 'react';
import BaseTable from '../components/BaseTable';
import { getInches } from '../services/inchService';

const columns = [
  { key: 'name', label: 'Diámetro (Inch)' }
];

const InchCatalog = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Reemplaza esto por la obtención real del token
        const token = localStorage.getItem('token');
        const inches = await getInches(token);
        setData(inches);
      } catch (err) {
        setError('Error al obtener datos');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (row) => {
    alert(`Editar: ${row.name}`);
  };

  const handleToggleActive = (row) => {
    // Aquí iría la lógica para activar/desactivar en la BD
    setData(data.map(item =>
      item.id === row.id ? { ...item, is_active: !item.is_active } : item
    ));
  };

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-[#0C2C65]">Catálogo de Diámetros (Inch)</h2>
      <BaseTable
        columns={columns}
        data={data}
        onEdit={handleEdit}
        onToggleActive={handleToggleActive}
      />
    </div>
  );
};

export default InchCatalog;
