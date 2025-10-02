import React, { useEffect } from 'react';

const TITLE = 'Open Damage Reports Inventory';


function InventoryOpenDRModal({ data = [], onClose }) {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);

  // Ordenar por Die Description ascendente
  const sorted = [...data].sort((a, b) => (a.die_description_text || '').localeCompare(b.die_description_text || ''));

  // Impresión igual a circulation
  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=900,height=700');
    if (!printWindow) return;
    const now = new Date();
    const fecha = now.toLocaleDateString();
    const hora = now.toLocaleTimeString();
    const style = `
      <style>
        @page { size: A4 portrait; margin: 1.5cm 1.2cm 0.7cm 1.2cm; }
        @media print {
          .page-break { page-break-before: always; }
        }
        body { font-family: Arial, sans-serif; margin: 0; }
        .header { display: flex; align-items: center; border-bottom: 2px solid #264893; padding: 16px 0; }
        .header img { height: 48px; margin-right: 24px; }
        .header-title { font-size: 1.5rem; font-weight: bold; color: #0C2C65; flex: 1; text-align: center; }
        .header-total { font-size: 1.2rem; font-weight: bold; color: #264893; margin-left: 24px; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        th, td { border: 1px solid #bfc9d9; padding: 8px; text-align: left; }
        th { background: #e4e7ed; color: #264893; }
        .footer { margin-top: 12px; font-size: 1rem; color: #264893; display: flex; justify-content: space-between; align-items: center; }
      </style>
    `;
    // Paginación: 24 filas por hoja
    const rowsPerPage = 24;
    const totalPages = Math.ceil(sorted.length / rowsPerPage);
    let tablePages = '';
    for (let p = 0; p < totalPages; p++) {
      const pageRows = sorted.slice(p * rowsPerPage, (p + 1) * rowsPerPage).map(row => `
        <tr>
          <td>${row.serial_number || ''}</td>
          <td>${row.die_description_text || ''}</td>
          <td>${row.updated_at ? row.updated_at.slice(0, 10) : ''}</td>
        </tr>
      `).join('');
      tablePages += `
        <div${p > 0 ? ' class="page-break"' : ''}>
          <div class="header">
            <img src="${window.location.origin}/logo.jpg" alt="Logo" />
            <div class="header-title">${TITLE}</div>
            <div class="header-total">TOTAL: ${sorted.length}</div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Serial #</th>
                <th>Die Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              ${pageRows}
            </tbody>
          </table>
          <div class="footer">
            <span>Page ${p + 1} of ${totalPages}</span>
            <span>Printed: ${fecha} ${hora}</span>
          </div>
        </div>
      `;
    }
    printWindow.document.write(`<!DOCTYPE html><html><head><title>Print Open DR Inventory</title>${style}</head><body>${tablePages}</body></html>`);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-0 relative max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
          <div className="text-xl font-bold text-blue-900 text-center flex-1">
            {TITLE}
          </div>
          <div className="font-bold text-blue-900 text-lg">TOTAL: {sorted.length}</div>
          <button onClick={onClose} className="ml-4 text-blue-700 font-bold text-lg">Close</button>
        </div>
        {/* Tabla */}
        <div className="px-6 py-4">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-3 py-2 border-b text-left">Serial #</th>
                <th className="px-3 py-2 border-b text-left">Die Description</th>
                <th className="px-3 py-2 border-b text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {sorted.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">No records found.</td>
                </tr>
              ) : (
                sorted.map(row => (
                  <tr key={row.id} className="hover:bg-blue-50">
                    <td className="px-3 py-2 border-b">{row.serial_number}</td>
                    <td className="px-3 py-2 border-b">{row.die_description_text}</td>
                    <td className="px-3 py-2 border-b">{row.updated_at ? row.updated_at.slice(0, 10) : ''}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Botón imprimir */}
        <div className="px-6 pb-6 flex justify-end">
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg text-lg"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
}

export default InventoryOpenDRModal;
