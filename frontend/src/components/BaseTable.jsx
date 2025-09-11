import React from 'react';

/**
 * BaseTable - Componente reutilizable para mostrar datos de catálogos en el panel de administración.
 * Props:
 * - columns: Array de objetos { key, label } para definir las columnas
 * - data: Array de objetos con los datos a mostrar
 * - onEdit: función para editar un registro
 * - onToggleActive: función para activar/desactivar un registro
 */
const BaseTable = ({ columns, data, onEdit, onToggleActive }) => {
  return (
    <div className="overflow-x-auto rounded shadow bg-white">
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
                  onClick={() => onEdit(row)}
                >
                  Editar
                </button>
                <button
                  className={`px-2 py-1 rounded ${row.is_active ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white`}
                  onClick={() => onToggleActive(row)}
                >
                  {row.is_active ? 'Desactivar' : 'Activar'}
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
