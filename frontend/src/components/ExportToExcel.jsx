import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ data, filename }) => {
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, filename);
  };
  return (
    <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded">Export to Excel</button>
  );
};

export default ExportToExcel;
