import React, { useState, useEffect } from 'react';

// Recibe: schema, data (registro), mode ('add'|'edit'), onClose, onSave
export default function BaseModalAdvanced({ schema, data, mode, onClose, onSave }) {
  const [form, setForm] = useState(() => {
    const initial = {};
    schema.forEach(f => {
      if (f.type === 'select' && data) {
        // Si el campo es select, busca el id correspondiente
        initial[f.key] = data[f.key] || data[f.optionValue] || '';
      } else {
        initial[f.key] = data ? data[f.key] : (f.type === 'boolean' ? true : '');
      }
    });
    return initial;
  });
  const [selectOptions, setSelectOptions] = useState({});

  useEffect(() => {
    // Cargar opciones para selects desde API si source está definido
    schema.filter(f => f.type === 'select' && f.source).forEach(async f => {
      const token = localStorage.getItem('token');
      const res = await fetch(f.source, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const opts = await res.json();
      setSelectOptions(prev => ({ ...prev, [f.key]: opts }));
    });
  }, [schema]);

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Si es edición, incluye el id en el form
    const formData = { ...form };
    if (data && data.id) {
      formData.id = data.id;
    }
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-blue-200">
        <h3 className="text-2xl font-bold mb-6 text-blue-900">{mode === 'add' ? 'Add Record' : 'Edit Record'}</h3>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Name</label>
            <input
              type="text"
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.name || ''}
              onChange={e => handleChange('name', e.target.value)}
              required
            />
          </div>
          {/* Die Description */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Die Description</label>
            <select
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.die_description_id || ''}
              onChange={e => handleChange('die_description_id', e.target.value)}
              required
            >
              <option value="">Select...</option>
              {(selectOptions.die_description_id || []).map(opt => (
                <option key={opt.id} value={opt.id}>{opt.die_description}</option>
              ))}
            </select>
          </div>
          {/* Material */}
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Material</label>
            <select
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.material_id || ''}
              onChange={e => handleChange('material_id', e.target.value)}
              required
            >
              <option value="">Select...</option>
              {(selectOptions.material_id || []).map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
          {/* Active */}
          <div className="mb-6 flex items-center">
            <label className="block font-semibold mr-2 text-blue-900">Active</label>
            <input
              type="checkbox"
              checked={!!form.is_active}
              onChange={e => handleChange('is_active', e.target.checked)}
              className="accent-blue-600 w-5 h-5"
            />
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
