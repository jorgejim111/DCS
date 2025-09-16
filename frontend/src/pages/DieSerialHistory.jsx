

import React, { useState } from 'react';
import BaseTableReadOnly from '../components/BaseTableReadOnly';
import ExportToExcel from '../components/ExportToExcel';
import { fetchDieSerialHistory } from '../services/dieSerialHistoryService';

const PAGE_SIZE = 50;

const DieSerialHistory = () => {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const [data, setData] = useState([]);
  const [serialFilter, setSerialFilter] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Consulta real al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await fetchDieSerialHistory(dateFrom, dateTo);
      setData(result);
      setShowTable(true);
      setPage(1);
    } catch (err) {
      setError('Error fetching data');
      setData([]);
      setShowTable(false);
    }
    setLoading(false);
  };

  // Filtrado por serial# en frontend
  const filteredData = data.filter(row =>
    row.serial_number && row.serial_number.toLowerCase().includes(serialFilter.toLowerCase())
  );

  // Paginación local
  const pageCount = Math.ceil(filteredData.length / PAGE_SIZE) || 1;
  const pagedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Cambiar rango de fechas desde la vista
  const handleChangeDates = () => {
    setShowTable(false);
    setData([]);
    setSerialFilter('');
    setPage(1);
    setError('');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Die Serial History</h2>
      {!showTable ? (
        <form className="flex gap-4 items-end mb-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Date from</label>
            <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} required className="border rounded px-2 py-1" />
          </div>
          <div>
            <label className="block text-sm font-medium">Date to</label>
            <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} required className="border rounded px-2 py-1" />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
        </form>
      ) : (
        <>
          {error && <div className="text-red-600 mb-2">{error}</div>}
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Filter by Serial#"
                value={serialFilter}
                onChange={e => setSerialFilter(e.target.value)}
                className="border rounded px-2 py-1 w-64"
              />
              <button onClick={handleChangeDates} className="ml-2 bg-gray-300 px-2 py-1 rounded text-sm">Change Dates</button>
            </div>
            <ExportToExcel data={filteredData} filename="die_serial_history.xlsx" />
          </div>
          <BaseTableReadOnly
            data={pagedData}
            columns={[
              { Header: 'Serial#', accessor: 'serial_number' },
              { Header: 'Status', accessor: 'status_name' },
              { Header: 'Date', accessor: 'date' },
              { Header: 'User', accessor: 'user_name' },
              { Header: 'Comment', accessor: 'comment' },
            ]}
            loading={loading}
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default DieSerialHistory;
