import React, { useState } from 'react';
import DieHistorySelectModal from './DieHistorySelectModal';
import DieHistoryModal from './DieHistoryModal';

const DieHistoryModalLauncher = () => {
  const [selectOpen, setSelectOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [selectedSerial, setSelectedSerial] = useState(null);

  const handleSelect = (serial) => {
    setSelectOpen(false);
    setSelectedSerial(serial);
    setHistoryOpen(true);
  };

  const handleCloseHistory = () => {
    setHistoryOpen(false);
    setSelectedSerial(null);
  };

  return (
    <>
      <button
        className="bg-[#E4E7ED] hover:bg-[#D3D9E1] text-[#264893] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-[#D3D9E1] focus:outline-none focus:ring-2 focus:ring-[#23B0E8]"
        style={{ minHeight: '170px' }}
        onClick={() => setSelectOpen(true)}
      >
        <span className="font-bold text-lg">Die History</span>
      </button>
      <DieHistorySelectModal isOpen={selectOpen} onClose={() => setSelectOpen(false)} onSelect={handleSelect} />
      <DieHistoryModal serialNumber={selectedSerial} isOpen={historyOpen} onClose={handleCloseHistory} />
    </>
  );
};

export default DieHistoryModalLauncher;
