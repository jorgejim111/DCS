import React, { useState } from 'react';

/**
 * BaseTable - Componente reutilizable para mostrar datos de catálogos en el panel de administración.
 * Props:
 * - columns: Array de objetos { key, label } para definir las columnas
 * - data: Array de objetos con los datos a mostrar
 * - onEdit: función para editar un registro
 * - onToggleActive: función para activar/desactivar un registro
 */
const BaseTable = ({ columns, data, onEdit, onToggleActive, pageSize = 10 }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [modalValue, setModalValue] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // Paginación
  const totalPages = Math.ceil(data.length / pageSize);
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key} className="px-4 py-2 border">{col.label}</th>
            ))}
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={row.id || idx}>
              {columns.map(col => (
                <td key={col.key} className="px-4 py-2 border">{row[col.key]}</td>
              ))}
              <td className="px-4 py-2 border">
                <button
                  className="mr-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => handleOpenModal(row)}
                >
                  Editar
                </button>
                {onToggleActive && (
                  <button
                    onClick={() => onToggleActive(row)}
                    className={`px-3 py-1 rounded font-semibold transition
                      ${row.is_active
                        ? 'bg-red-500 hover:bg-red-700 text-white border border-red-700'
                        : 'bg-green-500 hover:bg-green-700 text-white border border-green-700'}`}
                  >
                    {row.is_active ? 'Desactivar' : 'Activar'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Controles de paginación */}
      <div className="flex justify-center items-center mt-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-2 py-1 mx-1 border rounded">Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-2 py-1 mx-1 border rounded">Siguiente</button>
      </div>
      {/* Modal de edición/agregado */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">{modalMode === 'edit' ? 'Editar' : 'Agregar'} Parte</h2>
            <input
              type="text"
              className="border px-3 py-2 rounded w-full mb-4"
              value={modalValue}
              onChange={e => setModalValue(e.target.value)}
              placeholder="Nombre de la parte"
            />
            <div className="flex gap-2 justify-end">
              <button
                className="bg-[#23B0E8] text-white px-4 py-2 rounded font-semibold hover:bg-[#0C2C65]"
                onClick={handleSave}
              >
                Guardar
              </button>
              <button
                className="bg-gray-300 px-4 py-2 rounded font-semibold hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseTable;
