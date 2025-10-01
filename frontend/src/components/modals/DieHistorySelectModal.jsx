import React, { useState, useEffect } from 'react';
import { getAllActiveDieSerials } from '../../services/dieSerialService';

const DieHistorySelectModal = ({ isOpen, onClose, onSelect }) => {
  const [serials, setSerials] = useState([]);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      getAllActiveDieSerials()
        .then(data => {
          setSerials(data.sort((a, b) => a.serial_number.localeCompare(b.serial_number)));
        })
        .catch(() => setSerials([]));
      setFilter('');
      setSelected('');
      setError('');
    }
  }, [isOpen]);

  const handleSelect = (value) => {
    setSelected(value);
    setError('');
  };

  const handleContinue = () => {
    if (!serials.find(s => s.serial_number === selected)) {
      setError('Serial not found');
      return;
    }
    onSelect(selected);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600">✕</button>
        <h2 className="text-lg font-bold text-blue-900 mb-4">Which Serial # do you want to review?</h2>
        <input
          className="border px-2 py-1 rounded w-full mb-2"
          placeholder="Type or select serial..."
          list="serial-list"
          value={selected}
          onChange={e => handleSelect(e.target.value)}
          autoFocus
        />
        <datalist id="serial-list">
          {serials.map(s => (
            <option key={s.id} value={s.serial_number} />
          ))}
        </datalist>
        {error && <div className="text-red-600 text-xs mb-2">{error}</div>}
        <button
          className="w-full bg-blue-700 text-white font-bold py-2 rounded mt-2 disabled:opacity-50"
          onClick={handleContinue}
          disabled={!selected || !serials.find(s => s.serial_number === selected)}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default DieHistorySelectModal;
