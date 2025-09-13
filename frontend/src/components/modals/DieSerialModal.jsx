import React, { useState, useEffect } from 'react';

const DieSerialModal = ({ mode, record, onSave, onClose, dieDescriptions, statuses }) => {
  const [form, setForm] = useState({
    serial_number: '',
    die_description_id: '',
    status_id: '',
    inner: '',
    outer: '',
    proudness: '',
    is_active: true,
  });

  useEffect(() => {
    if (record) {
      setForm({
        serial_number: record.serial_number || '',
        die_description_id: record.die_description_id || '',
        status_id: record.status_id || '',
        inner: record.inner || '',
        outer: record.outer || '',
        proudness: record.proudness || '',
        is_active: record.is_active ?? true,
      });
    } else {
      setForm({
        serial_number: '',
        die_description_id: '',
        status_id: '',
        inner: '',
        outer: '',
        proudness: '',
        is_active: true,
      });
    }
  }, [record]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...form, is_active: form.is_active ? 1 : 0 });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg min-w-[350px]">
        <h3 className="text-lg font-bold mb-4 text-blue-900">{mode === 'edit' ? 'Edit Serial' : 'Add Serial'}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="serial_number" value={form.serial_number} onChange={handleChange} placeholder="Serial Number" className="border px-3 py-2 rounded" required />
          <select name="die_description_id" value={form.die_description_id} onChange={handleChange} className="border px-3 py-2 rounded" required>
            <option value="">Select Die Description</option>
            {dieDescriptions.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.die_description}</option>
            ))}
          </select>
          <select name="status_id" value={form.status_id} onChange={handleChange} className="border px-3 py-2 rounded" required>
            <option value="">Select Status</option>
            {statuses.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.name}</option>
            ))}
          </select>
          <input name="inner" type="number" value={form.inner} onChange={handleChange} placeholder="Inner" className="border px-3 py-2 rounded" required />
          <input name="outer" type="number" value={form.outer} onChange={handleChange} placeholder="Outer" className="border px-3 py-2 rounded" required />
          <input name="proudness" type="number" value={form.proudness} onChange={handleChange} placeholder="Proudness" className="border px-3 py-2 rounded" required />
          <label className="flex items-center gap-2">
            <input name="is_active" type="checkbox" checked={!!form.is_active} onChange={handleChange} />
            Active
          </label>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-blue-700 hover:bg-blue-900 text-white px-4 py-2 rounded">Save</button>
            <button type="button" className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DieSerialModal;
