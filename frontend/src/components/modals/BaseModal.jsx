import React from 'react';

const BaseModal = ({
  open,
  onClose,
  logo,
  title,
  total,
  columns = [],
  data = [],
  filterValue = '',
  onFilterChange,
  filterPlaceholder = 'Filter...',
  page = 1,
  totalPages = 1,
  onPageChange,
  onExport,
  onPrint,
  children
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {logo && <img src={logo} alt="logo" className="h-8 w-8" />}
            <h2 className="text-xl font-bold text-blue-900">{title}</h2>
          </div>
          <span className="text-gray-600 font-semibold">Total: {total}</span>
        </div>
        {/* Filter */}
        <div className="flex items-center mb-2 gap-2">
          <input
            type="text"
            className="border px-2 py-1 rounded w-64"
            placeholder={filterPlaceholder}
            value={filterValue}
            onChange={e => onFilterChange && onFilterChange(e.target.value)}
          />
        </div>
        {/* Table */}
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full bg-white rounded shadow border border-gray-200 text-sm">
            <thead className="bg-blue-900 text-white">
              <tr>
                {columns.map(col => (
                  <th key={col.key} className="border px-4 py-2 font-semibold text-left">{col.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr><td colSpan={columns.length} className="text-center py-4">No data</td></tr>
              ) : (
                data.map((row, idx) => (
                  <tr key={row.id || idx} className={idx % 2 === 0 ? 'bg-blue-50' : ''}>
                    {columns.map(col => (
                      <td key={col.key} className="border px-4 py-2">{row[col.key]}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between mb-4">
          <div></div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-blue-700 text-white px-3 py-1 rounded"
              onClick={() => onPageChange && onPageChange(page - 1)}
              disabled={page <= 1}
            >Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button
              className="bg-blue-700 text-white px-3 py-1 rounded"
              onClick={() => onPageChange && onPageChange(page + 1)}
              disabled={page >= totalPages}
            >Next</button>
          </div>
        </div>
        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button className="bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg" onClick={onExport}>Export Excel</button>
          <button className="bg-blue-700 text-white font-bold py-2 px-6 rounded shadow-lg" onClick={onPrint}>Print</button>
          <button className="bg-red-600 text-white font-bold py-2 px-6 rounded shadow-lg" onClick={onClose}>Exit</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
