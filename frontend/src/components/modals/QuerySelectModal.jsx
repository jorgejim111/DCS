import React from "react";

const QUERY_OPTIONS = [
  {
    key: "new-dies-required",
    label: "New Dies Required"
  },
  {
    key: "move-to-circulation",
    label: "Dies Ready for Circulation"
  },
  {
    key: "damage-report-range",
    label: "Damage Reports by Date Range"
  },
  {
    key: "grinding-record-maif13",
    label: "Die Grinding Record (MAIF-13)"
  }
];

function QuerySelectModal({ open, onClose, onSelect }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-[#264893] hover:text-[#0C2C65] text-2xl font-bold">&times;</button>
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.jpg" alt="Logo" className="h-14 mb-2" />
          <h2 className="text-2xl font-bold text-[#0C2C65] mb-2">Select a Query</h2>
        </div>
        <div className="flex flex-col gap-4">
          {QUERY_OPTIONS.map(opt => (
            <button
              key={opt.key}
              className="bg-[#D3D9E1] hover:bg-[#264893] text-[#264893] hover:text-white font-semibold px-4 py-3 rounded transition text-lg border border-[#264893] focus:outline-none focus:ring-2 focus:ring-[#23B0E8]"
              onClick={() => onSelect(opt.key)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {/* No Exit button, close with X */}
      </div>
    </div>
  );
}

export default QuerySelectModal;
