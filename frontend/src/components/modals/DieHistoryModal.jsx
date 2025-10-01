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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl relative overflow-auto max-h-[95vh]">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-600">✕</button>
        <h2 className="text-xl font-bold text-blue-900 mb-2 text-center">Die History Information</h2>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">{error}</div>
        ) : (
          <>
            {/* Header Table */}
            <table className="w-full mb-4 border text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Serial #</th>
                  <th className="border px-2 py-1">Die Inch</th>
                  <th className="border px-2 py-1">Description</th>
                  <th className="border px-2 py-1">Die Part</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-2 py-1">{die?.serial_number}</td>
                  <td className="border px-2 py-1">{die?.inch}</td>
                  <td className="border px-2 py-1">{die?.description}</td>
                  <td className="border px-2 py-1">{die?.part}</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border px-2 py-1 text-xs text-gray-600">Inner Land Thickness x/1000</td>
                  <td className="border px-2 py-1 text-xs text-gray-600">Outer Land Thickness x/1000</td>
                  <td className="border px-2 py-1 text-xs text-gray-600">Proudness x mm</td>
                  <td className="border px-2 py-1"></td>
                </tr>
                <tr>
                  <td className="border px-2 py-1">{die?.inner_land_thickness}</td>
                  <td className="border px-2 py-1">{die?.outer_land_thickness}</td>
                  <td className="border px-2 py-1">{die?.proudness}</td>
                  <td className="border px-2 py-1"></td>
                </tr>
              </tbody>
            </table>
            {/* History Table */}
            <div className="overflow-x-auto">
              <table className="w-full border text-xs">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border px-2 py-1">Date</th>
                    <th className="border px-2 py-1">Status</th>
                    <th className="border px-2 py-1">ID DR</th>
                    <th className="border px-2 py-1">Inner</th>
                    <th className="border px-2 py-1">Outer</th>
                    <th className="border px-2 py-1">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((row, idx) => (
                    <tr key={row.id || idx} className={idx % 2 === 0 ? 'bg-blue-50' : ''}>
                      <td className="border px-2 py-1 whitespace-nowrap">{formatDate(row.date)}</td>
                      <td className="border px-2 py-1">{row.status || ''}</td>
                      <td className="border px-2 py-1">{row.damage_report_id || ''}</td>
                      <td className="border px-2 py-1">{row.inner_to_grind || ''}</td>
                      <td className="border px-2 py-1">{row.outer_to_grind || ''}</td>
                      <td className="border px-2 py-1">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg print:hidden"
                onClick={() => window.print()}
              >
                Print
              </button>
              <button
                className="bg-red-600 text-white font-bold py-2 px-6 rounded shadow-lg print:hidden"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DieHistoryModal;
