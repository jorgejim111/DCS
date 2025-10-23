import React, { useEffect, useState } from 'react';

import { getDamageReportById } from '../../services/damageReportService';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).replace(/ /g, '-');
}

const DamageReportViewModal = ({ open, onClose, id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && id) {
      setLoading(true);
      getDamageReportById(id)
        .then(setData)
        .finally(() => setLoading(false));
    }
  }, [open, id]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl p-0 w-full max-w-3xl relative shadow-lg">
        {/* Encabezado */}
        <div className="flex items-start justify-between px-8 pt-6 pb-2 border-b">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <img src="/logo.jpg" alt="Logo" className="h-12 mb-1" />
            <span className="text-xs text-[#0C2C65] font-bold">MasterNet Ltd.</span>
          </div>
          {/* Título */}
          <div className="flex-1 flex flex-col items-center">
            <span className="text-2xl font-bold text-[#0C2C65] leading-tight">Damage Report</span>
            <span className="text-lg text-[#264893] font-semibold">Check a Damage Report</span>
          </div>
          {/* Fecha e IDDR */}
          <div className="flex flex-col items-end text-right">
            <span className="text-base text-[#264893] font-semibold">Date: {data ? formatDate(data.created_at) : ''}</span>
            <span className="text-base text-[#264893] font-semibold">IDDR: {id}</span>
          </div>
          {/* Botón cerrar */}
          <button onClick={onClose} className="absolute top-4 right-4 text-[#264893] hover:text-red-600 text-2xl font-bold">×</button>
        </div>
        {/* Cuerpo */}
        <div className="px-8 py-6">
          {loading ? (
            <div className="text-center text-[#264893] font-semibold">Loading...</div>
          ) : data ? (
            <>
              {/* Línea 1 */}
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <div className="text-xs font-bold text-[#264893] mb-1">Serial #</div>
                  <div className="text-base text-[#0C2C65]">{data.serial_number}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#264893] mb-1">Product</div>
                  <div className="text-base text-[#0C2C65]">{data.product_name}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#264893] mb-1">Line</div>
                  <div className="text-base text-[#0C2C65]">{data.line_name}</div>
                </div>
              </div>
              {/* Línea 2 */}
              <div className="grid grid-cols-3 gap-6 mb-4">
                <div>
                  <div className="text-xs font-bold text-[#264893] mb-1">Description</div>
                  <div className="text-base text-[#0C2C65]">{data.description_dr}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#264893] mb-1">Explanation</div>
                  <div className="text-base text-[#0C2C65]">{data.explanation}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#264893] mb-1">Sample</div>
                  <div className="text-base text-[#0C2C65]">{data.if_sample ? 'Yes' : 'No'}</div>
                </div>
              </div>
              {/* Línea 3: Note */}
              <div className="mb-4">
                <div className="text-xs font-bold text-[#264893] mb-1">Note</div>
                <div className="text-base text-[#0C2C65]">{data.note}</div>
              </div>
            </>
          ) : (
            <div className="text-center text-red-600 font-semibold">No data found.</div>
          )}
        </div>
        {/* Botones */}
        <div className="flex justify-center gap-6 pb-6">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-xl text-lg shadow">Good</button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-xl text-lg shadow">To Fix</button>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl text-lg shadow">To Scrap</button>
        </div>
      </div>
    </div>
  );
};

export default DamageReportViewModal;
