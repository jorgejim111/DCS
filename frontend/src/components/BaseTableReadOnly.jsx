import React from "react";

export default function BaseTableReadOnly({ columns, data = [], loading, page, pageCount, onPageChange }) {
  return (
    <div className="w-full max-w-full">
      <div className="w-full overflow-x-auto">
        <table className="min-w-max border border-gray-300 bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-900 text-white">
              {columns.map(col => (
                <th key={col.accessor} className="px-3 py-2 text-left font-semibold">
                  {col.Header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">No data found</td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx} className="border-t hover:bg-blue-50">
                  {columns.map(col => (
                    <td key={col.accessor} className="px-3 py-2 whitespace-nowrap">
                      {row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50"
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            Previous
          </button>
          <span>Page {page} of {pageCount}</span>
          <button
            className="px-3 py-1 bg-blue-700 text-white rounded disabled:opacity-50"
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
