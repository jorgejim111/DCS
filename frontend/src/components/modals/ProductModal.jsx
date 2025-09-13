import React, { useState } from 'react';

export default function ProductModal({ mode, record, onSave, onClose, dieDescriptions = [], materials = [] }) {
  const [form, setForm] = useState({
    name: record?.name || '',
    die_description: record?.die_description_id || record?.die_description || '',
    material: record?.material_id || record?.material || '',
  });

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      die_description_id: Number(form.die_description),
      material_id: Number(form.material),
      is_active: record?.is_active ?? true,
    };
    onSave(payload);
    onClose();
  };

  // Helper para mostrar el texto correcto en el select
  const getOptionLabel = (obj, keys) => {
    for (const k of keys) {
      if (typeof obj[k] === 'string' && obj[k]) return obj[k];
    }
    // Si no encuentra, muestra la primera propiedad string
    const firstString = Object.values(obj).find(v => typeof v === 'string');
    return firstString || '';
  };

  // ...existing code...

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-blue-200">
        <h3 className="text-2xl font-bold mb-6 text-blue-900">{mode === 'add' ? 'Add Product' : 'Edit Product'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Name</label>
            <input
              type="text"
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.name}
              onChange={e => handleChange('name', e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Die Description</label>
            <select
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.die_description}
              onChange={e => handleChange('die_description', e.target.value)}
              required
            >
              <option value="">Select...</option>
              {dieDescriptions.filter(opt => opt.is_active).map(opt => (
                <option key={opt.id} value={opt.id}>{getOptionLabel(opt, ['die_description', 'name', 'description'])}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Material</label>
            <select
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.material}
              onChange={e => handleChange('material', e.target.value)}
              required
            >
              <option value="">Select...</option>
              {materials.filter(opt => opt.is_active).map(opt => (
                <option key={opt.id} value={opt.id}>{getOptionLabel(opt, ['name', 'material', 'description'])}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <button type="button" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
