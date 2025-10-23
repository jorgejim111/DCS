import React, { useState, useEffect } from 'react';
// Debes crear este servicio para obtener los DR abiertos ordenados ascendente
import { getDamageReportsByStatus } from '../../services/damageReportService';

const ReviewDamageReportSelectModal = ({ isOpen, onClose, onSelect }) => {
  const [damageReports, setDamageReports] = useState([]);
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      getDamageReportsByStatus(4)
        .then(data => {
          setDamageReports(data.sort((a, b) => a.id - b.id));
        })
        .catch((err) => {
          console.error('Error fetching damage reports by status:', err);
          setDamageReports([]);
        });
      setSelected('');
      setError('');
    }
  }, [isOpen]);

  const handleSelect = (value) => {
    setSelected(value);
    setError('');
  };

  const handleContinue = () => {
    // Simular consulta a la BD para status_id
    // En este modal solo tenemos los DR abiertos (status_id=4)
    const dr = damageReports.find(d => String(d.id) === String(selected));
    if (!dr) {
      setError('Damage Report not found. Please check your request.');
      alert('Damage Report not found.');
      return;
    }
    if (dr.id_status === 6) {
      setError('Damage Report has already been reviewed. Please check your request.');
      alert('Damage Report has already been reviewed.');
      return;
    }
    if (dr.id_status === 4) {
      setError('');
      onSelect(dr.id);
      onClose();
      return;
    }
    // Cualquier otro status
    setError('Unknown status.');
    alert('Unknown status.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg relative flex flex-col items-center">
        <button onClick={onClose} className="absolute top-6 right-6 text-[#264893] hover:text-red-600 text-2xl font-bold">×</button>
        <img src="/logo.jpg" alt="MasterNet Logo" className="h-14 mb-2" />
        <h2 className="text-2xl font-bold text-[#264893] mb-6 text-center">Which Damage Report do you want to review?</h2>
        <div className="w-full mb-6">
          <input
            className="border-2 border-[#7CA6F7] px-4 py-3 rounded-xl w-full focus:outline-none focus:border-[#264893] text-lg text-[#264893] bg-[#F6F8FB]"
            placeholder="Type or select Damage Report ID..."
            list="dr-list"
            value={selected}
            onChange={e => handleSelect(e.target.value)}
            autoFocus
          />
          <datalist id="dr-list">
            {damageReports.map(dr => (
              <option key={dr.id} value={dr.id} />
            ))}
          </datalist>
        </div>
        {error && <div className="text-red-600 text-base mb-4 text-center font-semibold">{error}</div>}
        <button
          className="w-full bg-[#7CA6F7] hover:bg-[#264893] text-[#264893] hover:text-white font-bold py-3 rounded-xl text-lg mb-2 border-2 border-[#7CA6F7] disabled:opacity-50 transition-colors duration-150"
          onClick={handleContinue}
          disabled={!selected || !damageReports.find(dr => String(dr.id) === String(selected))}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default ReviewDamageReportSelectModal;
