import React from 'react';
// importación eliminada, migrar a modal específico

// Recibe: schema (array de campos), data (array de registros), onAdd, onEdit, onToggleActive
export default function BaseTableAdvanced({ schema, data, onAdd, onEdit, onToggleActive, onMoveToCirculation }) {
  // Columnas dinámicas
  const columns = Array.isArray(schema) ? schema.filter(f => f.key !== 'created_at' && f.key !== 'updated_at' && !f.hideInTable) : [];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-blue-900">Catalog Table</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onAdd}>Add</button>
      </div>
      <table className="min-w-full bg-white rounded shadow border border-gray-200">
        <thead className="bg-blue-900 text-white">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="border px-4 py-2 font-semibold text-left">{col.label}</th>
            ))}
            <th className="border px-4 py-2 font-semibold text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(data) ? data : []).map(row => (
            <tr key={row.id} className="hover:bg-blue-50">
              {columns.map(col => (
                <td key={col.key} className="border px-4 py-2">
                  {col.type === 'boolean' ? (row[col.key] ? 'Active' : 'Inactive') : row[col.key]}
                </td>
              ))}
              <td className="border px-4 py-2 flex gap-2">
                <button className="bg-blue-700 hover:bg-blue-900 text-white px-3 py-1 rounded" onClick={() => onEdit(row)}>Edit</button>
                {schema.some(f => f.key === 'is_active') && (
                  <button
                    className={row.is_active
                      ? 'bg-red-600 hover:bg-red-800 text-white px-3 py-1 rounded'
                      : 'bg-green-600 hover:bg-green-800 text-white px-3 py-1 rounded'}
                    onClick={() => onToggleActive(row)}
                  >
                    {row.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                )}
                {onMoveToCirculation && (
                  <button
                    className="bg-green-700 hover:bg-green-900 text-white px-3 py-1 rounded"
                    onClick={() => onMoveToCirculation(row)}
                  >
                    Move to Circulation
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
