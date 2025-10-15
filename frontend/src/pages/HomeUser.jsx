import React, { useState } from 'react';
import InventoryCatalogModal from '../components/modals/InventoryCatalogModal';
import InventoryOpenDRModal from '../components/modals/InventoryOpenDRModal';
// import hooks solo cuando se usen en los modales
import { HiDocumentSearch } from 'react-icons/hi';
import { MdOutlineInventory } from 'react-icons/md';
import InventorySelectModal from '../components/modals/InventorySelectModal';
import QuerySelectModal from '../components/modals/QuerySelectModal';
import MoveToCirculationModal from '../components/modals/MoveToCirculationModal';
import DamageReportModal from '../components/modals/DamageReportModal';
import DieHistoryModalLauncher from '../components/modals/DieHistoryModalLauncher';

const HomeUser = ({ username = 'User', role = 'produccion', onLogout }) => {
  const [inventoryModalOpen, setInventoryModalOpen] = useState(false);
  const [catalogModalOpen, setCatalogModalOpen] = useState(false);
  const [catalogType, setCatalogType] = useState(null);
  const [damageModalOpen, setDamageModalOpen] = useState(false);
  const [openDRModalOpen, setOpenDRModalOpen] = useState(false);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [moveToCircModalOpen, setMoveToCircModalOpen] = useState(false);
  const handleQueryClick = () => setQueryModalOpen(true);
  const handleMoveToCircClick = () => setMoveToCircModalOpen(true);
  const handleMoveToCircClose = () => setMoveToCircModalOpen(false);
  const handleQueryClose = () => setQueryModalOpen(false);
  const handleQuerySelect = (key) => {
    setQueryModalOpen(false);
    // Aquí irá la lógica para cada query
    // Por ahora solo cerrar el modal
  };


  const handleInventoryClick = () => setInventoryModalOpen(true);
  const handleInventoryClose = () => setInventoryModalOpen(false);

  const handleInventorySelect = (type) => {
    setInventoryModalOpen(false);
    if (type === 'open-damage-report') {
      setOpenDRModalOpen(true);
    } else {
      setCatalogType(type);
      setCatalogModalOpen(true);
    }
  };
  const handleOpenDRClose = () => {
    setOpenDRModalOpen(false);
  };

  const handleCatalogClose = () => {
    setCatalogModalOpen(false);
    setCatalogType(null);
  };

  const handleDamageClick = () => setDamageModalOpen(true);
  const handleDamageClose = () => setDamageModalOpen(false);

  return (
    <>
      <h1 className="text-2xl font-bold text-[#0C2C65] mb-4">Welcome, {username}!</h1>
      <p className="text-[#264893] mb-6">This is your dashboard. Use the sidebar to access your main actions.</p>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <DieHistoryModalLauncher onSerialSelected={serial => {
      console.log('Selected serial:', serial);
    }} />
    <button
      className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
      style={{ minHeight: '170px' }}
      onClick={handleDamageClick}
    >
      <HiDocumentSearch className="text-5xl mb-2" />
      <span className="font-bold text-lg">Damage Report</span>
    </button>
    <button
      className="bg-[#264893] hover:bg-[#0C2C65] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-[#0C2C65] focus:outline-none focus:ring-2 focus:ring-[#23B0E8]"
      style={{ minHeight: '170px' }}
      onClick={handleInventoryClick}
    >
      <MdOutlineInventory className="text-5xl mb-2" />
      <span className="font-bold text-lg">Inventory</span>
    </button>
  </div>
  {(role === 'admin' || role === 'gerente' || role === 'setupSr' || role === 'setup') && (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <button
        className="bg-[#264893] hover:bg-[#0C2C65] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-[#0C2C65] focus:outline-none focus:ring-2 focus:ring-[#23B0E8]"
        style={{ minHeight: '170px' }}
        onClick={handleMoveToCircClick}
      >
        <span className="font-bold text-lg">Move to Circulation</span>
      </button>
  <MoveToCirculationModal
    open={moveToCircModalOpen}
    onClose={handleMoveToCircClose}
  />
      <button
        className="bg-gray-200 hover:bg-gray-300 text-[#264893] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#23B0E8]"
        style={{ minHeight: '170px' }}
        onClick={handleQueryClick}
      >
        <span className="font-bold text-lg">Queries</span>
      </button>
    </div>
  )}
  <QuerySelectModal
    open={queryModalOpen}
    onClose={handleQueryClose}
    onSelect={handleQuerySelect}
  />
        {/* Duplicado eliminado, solo queda la fila correcta de Move to Circulation y Queries */}
      <InventorySelectModal
        open={inventoryModalOpen}
        onClose={handleInventoryClose}
        onSelect={handleInventorySelect}
        role={role}
      />
      {catalogModalOpen && (catalogType === 'circulation' || catalogType === 'new') && (
        <InventoryCatalogModal
          type={catalogType}
          onClose={handleCatalogClose}
        />
      )}
      {openDRModalOpen && (
        <InventoryOpenDRModal
          onClose={handleOpenDRClose}
        />
      )}
      {damageModalOpen && (
        <DamageReportModal onClose={handleDamageClose} />
      )}
    </>
  );
};

export default HomeUser;
