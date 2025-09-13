import React, { useState, useEffect } from 'react';

export default function DieDescriptionModal({ mode, record, onSave, onClose, inches = [], parts = [], descriptions = [] }) {
  const [form, setForm] = useState({
    inch_id: '',
    part_id: '',
    description_id: '',
    min_in_circulation: '',
    min_in_stock: '',
  });

  useEffect(() => {
    if (mode === 'edit' && record) {
      // Log para depuración
      console.log('Edit record:', record);
      // Función de comparación flexible
        // Mejor comparación: elimina espacios, paréntesis y normaliza
        const clean = (str) => str?.toString()
          .replace(/\s+/g, '') // quita todos los espacios
          .replace(/[()]/g, '') // quita paréntesis
          .toLowerCase();

      // Log arrays para depuración
      // Log nombres para depuración
        const inch_id = inches.find(i => clean(i.name) === clean(record.inch))?.id || '';
        const part_id = parts.find(p => clean(p.name) === clean(record.part))?.id || '';
        const description_id = descriptions.find(d => clean(d.name) === clean(record.description))?.id || '';
      setForm({
        inch_id,
        part_id,
        description_id,
        min_in_circulation: record.min_in_circulation || '',
        min_in_stock: record.min_in_stock || '',
      });
    } else if (mode === 'add') {
      setForm({
        inch_id: '',
        part_id: '',
        description_id: '',
        min_in_circulation: '',
        min_in_stock: '',
      });
    }
  }, [mode, record, inches, parts, descriptions]);

  // Concatenar Die Description
  const getDieDescription = () => {
    const inch = inches.find(i => i.id === Number(form.inch_id));
    const part = parts.find(p => p.id === Number(form.part_id));
    const description = descriptions.find(d => d.id === Number(form.description_id));
    return [inch?.name, part?.name, description?.name].filter(Boolean).join(' ');
  };

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Busca los nombres para concatenar
  const inchObj = inches.find(i => i.id === Number(form.inch_id));
  const partObj = parts.find(p => p.id === Number(form.part_id));
  const descriptionObj = descriptions.find(d => d.id === Number(form.description_id));
  const die_description = `${inchObj?.name || ''}" ${partObj?.name || ''} ${descriptionObj?.name || ''}`.trim();

    const payload = {
      inch_id: Number(form.inch_id),
      part_id: Number(form.part_id),
      description_id: Number(form.description_id),
      die_description,
      min_in_circulation: Number(form.min_in_circulation),
      min_in_stock: Number(form.min_in_stock),
      is_active: 1,
    };
  // Log del payload antes de enviar
  console.log('Payload enviado a updateDieDescription:', payload);
    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg border border-blue-200">
        <h3 className="text-2xl font-bold mb-6 text-blue-900">{mode === 'add' ? 'Add Die Description' : 'Edit Die Description'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Inch</label>
            <select
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.inch_id}
              onChange={e => handleChange('inch_id', e.target.value)}
              required
            >
              <option value="">Select...</option>
              {inches.filter(opt => opt.is_active).map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Part</label>
            <select
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.part_id}
              onChange={e => handleChange('part_id', e.target.value)}
              required
            >
              <option value="">Select...</option>
              {parts.filter(opt => opt.is_active).map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Description</label>
            <select
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.description_id}
              onChange={e => handleChange('description_id', e.target.value)}
              required
            >
              <option value="">Select...</option>
              {descriptions.filter(opt => opt.is_active).map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Die Description</label>
            <input
              type="text"
              className="w-full border border-blue-300 px-3 py-2 rounded bg-gray-100"
              value={getDieDescription()}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Min In Circulation</label>
            <input
              type="number"
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.min_in_circulation}
              onChange={e => handleChange('min_in_circulation', e.target.value)}
              required
              min={0}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2 text-blue-900">Min In Stock</label>
            <input
              type="number"
              className="w-full border border-blue-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500"
              value={form.min_in_stock}
              onChange={e => handleChange('min_in_stock', e.target.value)}
              required
              min={0}
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
