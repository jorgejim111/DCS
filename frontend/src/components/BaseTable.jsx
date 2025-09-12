import React, { useState } from 'react';

/**
 * BaseTable - Componente reutilizable para mostrar datos de catálogos en el panel de administración.
 * Props:
 * - columns: Array de objetos { key, label } para definir las columnas
 * - data: Array de objetos con los datos a mostrar
 * - onEdit: función para editar un registro
 * - onToggleActive: función para activar/desactivar un registro
 */
const BaseTable = ({ columns, data, onEdit, onToggleActive }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [modalValue, setModalValue] = useState('');
  const [editRow, setEditRow] = useState(null);

  const handleOpenModal = (row) => {
    if (row) {
      setModalMode('edit');
      setModalValue(row.name);
      setEditRow(row);
    } else {
      setModalMode('add');
      setModalValue('');
      setEditRow(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalValue('');
    setEditRow(null);
  };

  const handleSave = () => {
    if (modalMode === 'edit' && editRow) {
      onEdit({ ...editRow, name: modalValue });
    } else if (modalMode === 'add') {
      onEdit({ name: modalValue, is_active: 1 });
    }
    handleCloseModal();
  };
  return (
    <div className="overflow-x-auto rounded shadow bg-white">
      <div className="flex justify-end p-2">
        <button
          className="bg-[#23B0E8] text-white px-4 py-2 rounded font-semibold hover:bg-[#0C2C65]"
          onClick={() => handleOpenModal(null)}
        >
          Add
        </button>
      </div>
      <table className="min-w-full text-sm text-left">
        <thead className="bg-[#0C2C65] text-white">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-2 font-semibold">{col.label}</th>
            ))}
            <th className="px-4 py-2 font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className={row.is_active ? '' : 'bg-gray-200'}>
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2 border-b">{row[col.key]}</td>
              ))}
              <td className="px-4 py-2 border-b flex gap-2">
                <button
                  className="bg-[#264893] text-white px-2 py-1 rounded hover:bg-[#23B0E8]"
                  onClick={() => handleOpenModal(row)}
                >
                  Edit
                </button>
      {showModal && (
  <div className="fixed inset-0 bg-gray-200 bg-opacity-0 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow-lg p-6 min-w-[300px]">
            <h3 className="text-lg font-bold mb-4">{modalMode === 'edit' ? 'Edit Position' : 'Add Position'}</h3>
            <label className="block mb-2 text-sm font-semibold text-[#0C2C65]">Name</label>
            <input
              type="text"
              className="border px-3 py-2 rounded w-full mb-4"
              value={modalValue}
              onChange={e => setModalValue(e.target.value)}
              placeholder="Enter position name"
            />
            <div className="flex gap-2 justify-end">
              <button
                className="bg-[#23B0E8] text-white px-4 py-2 rounded font-semibold hover:bg-[#0C2C65]"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded font-semibold hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
                <button
                  className={`px-2 py-1 rounded ${row.is_active ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white`}
                  onClick={() => onToggleActive(row)}
                >
                  {row.is_active ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaseTable;
