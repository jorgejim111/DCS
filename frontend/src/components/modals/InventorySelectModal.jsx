import React from "react";

const InventorySelectModal = ({ open, onClose, onSelect, role }) => {
  if (!open) return null;
  // Solo mostrar las opciones permitidas según el rol
  const isProduction = role === "production" || role === "produccion";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-[#264893] hover:text-[#0C2C65] text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold text-[#0C2C65] mb-6 text-center">Select Inventory</h2>
        <div className="flex flex-col gap-4">
          <button
            className="bg-[#23B0E8] hover:bg-[#0C2C65] text-white font-semibold px-4 py-3 rounded transition text-lg"
            onClick={() => onSelect("circulation")}
          >
            Circulation
          </button>
          {!isProduction && (
            <button
              className="bg-[#D3D9E1] hover:bg-[#264893] text-[#264893] hover:text-white font-semibold px-4 py-3 rounded transition text-lg"
              onClick={() => onSelect("open-damage-report")}
            >
              Open Damage Report
            </button>
          )}
          {!isProduction && (
            <button
              className="bg-[#D3D9E1] hover:bg-[#264893] text-[#264893] hover:text-white font-semibold px-4 py-3 rounded transition text-lg"
              onClick={() => onSelect("new")}
            >
              New
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventorySelectModal;
