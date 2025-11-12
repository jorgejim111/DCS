import React, { useEffect, useState } from 'react';

// Utilidad para formatear fecha como dd-MMM-yyyy
function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}
import { getDieSerialBySerialNumber, getDieSerialHistory } from '../../services/dieSerialService';

const DieHistoryModal = ({ serialNumber, isOpen, onClose }) => {
  const [die, setDie] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen || !serialNumber) return;
    setLoading(true);
    setError('');
    Promise.all([
      getDieSerialBySerialNumber(serialNumber),
      getDieSerialHistory(serialNumber)
    ])
      .then(([dieData, historyData]) => {
        setDie(dieData);
        setHistory(historyData);
        setLoading(false);
      })
      .catch(() => {
        setError('Error loading die history');
        setLoading(false);
      });
  }, [isOpen, serialNumber]);

  if (!isOpen) return null;

  // Fecha actual en formato dd-MMM-yyyy
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <>
      <style>{`
        @media print {
          body, html {
            background: #fff !important;
          }
          /* Oculta todo excepto el modal */
          body > *:not(.modal-overlay) {
            display: none !important;
          }
          .modal-overlay {
            position: static !important;
            background: none !important;
            box-shadow: none !important;
            z-index: auto !important;
            display: block !important;
          }
          .modal-content {
            box-shadow: none !important;
            border-radius: 0 !important;
            width: 850px !important;
            min-width: 850px !important;
            max-width: 850px !important;
            margin: 0 auto !important;
            padding: 0 !important;
            position: static !important;
            top: 0 !important;
            left: 0 !important;
          }
          .print\:hidden, .modal-overlay > .absolute.top-2.right-2 {
            display: none !important;
          }
          @page {
            size: letter;
            margin: 12mm 8mm 12mm 8mm;
          }
          table {
            page-break-inside: auto;
          }
          thead {
            display: table-header-group;
          }
          tr {
            page-break-inside: avoid;
            page-break-after: auto;
          }
        }
      `}</style>
      <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
        <div
          className="modal-content bg-white rounded-lg shadow-lg w-[850px] relative overflow-auto max-h-[95vh]"
          style={{ padding: 0 }}
        >
          {/* Header con logo y fecha */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px 0 32px' }}>
            <img src="/logo.jpg" alt="Logo" style={{ height: 38, marginRight: 12 }} />
            <div style={{ flex: 1, textAlign: 'center' }}>
              <h2 style={{ fontWeight: 700, fontSize: 28, color: '#23408e', margin: 0 }}>
                Die History Information
              </h2>
            </div>
            <div style={{ minWidth: 120, textAlign: 'right', color: '#23408e', fontWeight: 500, fontSize: 18 }}>
              {formattedDate}
            </div>
          </div>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600 print:hidden">✕</button>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">{error}</div>
          ) : (
            <>
              {/* Tabla de datos del serial */}
              <table style={{ width: '100%', marginTop: 18, borderCollapse: 'collapse', fontSize: 17 }}>
                <thead>
                  <tr style={{ background: '#f5f7fa' }}>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Serial #</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Die Inch</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Description</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Die Part</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>{die?.serial_number}</td>
                    <td style={{ textAlign: 'center' }}>{die?.inch}</td>
                    <td style={{ textAlign: 'center' }}>{die?.description}</td>
                    <td style={{ textAlign: 'center' }}>{die?.part}</td>
                  </tr>
                  <tr style={{ fontSize: '0.95em', color: '#555' }}>
                    <td style={{ textAlign: 'center' }}>Inner x/1000</td>
                    <td style={{ textAlign: 'center' }}>Outer x/1000</td>
                    <td style={{ textAlign: 'center' }}>Proudness x mm</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: 'center' }}>{die?.inner}</td>
                    <td style={{ textAlign: 'center' }}>{die?.outer}</td>
                    <td style={{ textAlign: 'center' }}>{die?.proudness}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

              {/* Tabla de historial */}
              <table style={{ width: '100%', marginTop: 24, borderCollapse: 'collapse', fontSize: 16 }}>
                <thead>
                  <tr style={{ background: '#eaf0fa' }}>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Date</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>ID DR</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Inner</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Outer</th>
                    <th style={{ padding: '8px 0', fontWeight: 600 }}>Note</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, idx) => (
                    <tr key={row.id || idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f7f9fc' }}>
                      <td style={{ textAlign: 'center', padding: '6px 0' }}>{formatDate(row.date)}</td>
                      <td style={{ textAlign: 'center' }}>{row.status || ''}</td>
                      <td style={{ textAlign: 'center' }}>{row.damage_report_id || ''}</td>
                      <td style={{ textAlign: 'center' }}>{row.inner_to_grind || ''}</td>
                      <td style={{ textAlign: 'center' }}>{row.outer_to_grind || ''}</td>
                      <td style={{ textAlign: 'center' }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Botones */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 32, padding: '0 32px 24px 32px' }}>
                <button
                  className="bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg print:hidden"
                  style={{ minWidth: 100, fontSize: 17 }}
                  onClick={() => {
                    const printWindow = window.open('', '', 'width=900,height=700');
                    if (!printWindow) return;
                    const now = new Date();
                    const fecha = now.toLocaleDateString();
                    const hora = now.toLocaleTimeString();
                    const style = `
                      <style>
                        @page { size: letter portrait; margin: 1.2cm 1.2cm 0.7cm 1.2cm; }
                        body { font-family: Arial, sans-serif; margin: 0; }
                        .header { display: flex; align-items: center; border-bottom: 2px solid #23408e; padding: 16px 0; }
                        .header img { height: 38px; margin-right: 18px; }
                        .header-title { font-size: 1.5rem; font-weight: bold; color: #23408e; flex: 1; text-align: center; }
                        .header-date { font-size: 1.1rem; color: #23408e; margin-left: 18px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 16px; }
                        th, td { border: 1px solid #bfc9d9; padding: 8px; text-align: center; }
                        th { background: #eaf0fa; color: #23408e; }
                        .footer { margin-top: 12px; font-size: 1rem; color: #23408e; display: flex; justify-content: space-between; align-items: center; }
                      </style>
                    `;
                    const serial = die || {};
                    // Header info
                    const headerTable = `
                      <table style="width:100%; margin-top:8px; border-collapse:collapse; font-size:17px;">
                        <thead>
                          <tr style="background:#f5f7fa;">
                            <th>Serial #</th>
                            <th>Die Inch</th>
                            <th>Description</th>
                            <th>Die Part</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>${serial.serial_number || ''}</td>
                            <td>${serial.inch || serial.die_inch || ''}</td>
                            <td>${serial.description || ''}</td>
                            <td>${serial.part || serial.die_part || ''}</td>
                          </tr>
                          <tr style="font-size:0.95em;color:#555;">
                            <td>Inner x/1000</td>
                            <td>Outer x/1000</td>
                            <td>Proudness x mm</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>${serial.inner || serial.inner_land_thickness || ''}</td>
                            <td>${serial.outer || serial.outer_land_thickness || ''}</td>
                            <td>${serial.proudness || ''}</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    `;
                    // Historial
                    const historyRows = history.map(row => `
                      <tr>
                        <td>${row.date ? formatDate(row.date) : ''}</td>
                        <td>${row.status || ''}</td>
                        <td>${row.damage_report_id || ''}</td>
                        <td>${row.inner_to_grind || ''}</td>
                        <td>${row.outer_to_grind || ''}</td>
                        <td>${row.note || ''}</td>
                      </tr>
                    `).join('');
                    const historyTable = `
                      <table style="width:100%; margin-top:24px; border-collapse:collapse; font-size:16px;">
                        <thead>
                          <tr style="background:#eaf0fa;">
                            <th>Date</th>
                            <th>Status</th>
                            <th>ID DR</th>
                            <th>Inner</th>
                            <th>Outer</th>
                            <th>Note</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${historyRows}
                        </tbody>
                      </table>
                    `;
                    const html = `<!DOCTYPE html><html><head><title>Die History Report</title>${style}</head><body>
                      <div class="header">
                        <img src="${window.location.origin}/logo.jpg" alt="Logo" />
                        <div class="header-title">Die History Information</div>
                        <div class="header-date">${fecha}</div>
                      </div>
                      ${headerTable}
                      ${historyTable}
                      <div class="footer">
                        <span>Printed: ${fecha} ${hora}</span>
                      </div>
                    </body></html>`;
                    printWindow.document.write(html);
                    printWindow.document.close();
                    printWindow.focus();
                    setTimeout(() => { printWindow.print(); }, 500);
                  }}>
                  Print
                </button>
                <button className="bg-red-600 text-white font-bold py-2 px-6 rounded shadow-lg print:hidden" style={{ minWidth: 100, fontSize: 17 }} onClick={onClose}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DieHistoryModal;
