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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative flex flex-col items-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#264893] hover:text-red-600 text-2xl font-bold">×</button>
        <img src="/logo.jpg" alt="MasterNet Logo" className="h-14 mb-2" />
        <h2 className="text-2xl font-bold text-[#264893] mb-6 text-center">Which Serial # do you want to review?</h2>
        <div className="w-full mb-6">
          <input
            className="border-2 border-[#7CA6F7] px-4 py-3 rounded-xl w-full focus:outline-none focus:border-[#264893] text-lg text-[#264893] bg-[#F6F8FB]"
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
        </div>
        {error && <div className="text-red-600 text-base mb-4 text-center font-semibold">{error}</div>}
        <button
          className="w-full bg-[#7CA6F7] hover:bg-[#264893] text-[#264893] hover:text-white font-bold py-3 rounded-xl text-lg mb-2 border-2 border-[#7CA6F7] disabled:opacity-50 transition-colors duration-150"
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
