import React, { useEffect, useState } from 'react';
import Modal from '../components/modals/Modal';
import BaseTableAdvanced from '../components/BaseTableAdvanced';
import { dieSerialSchema } from '../schemas/dieSerialSchema';
import * as dieSerialService from '../services/dieSerialService';
import DieSerialModal from '../components/modals/DieSerialModal';

const DieSerialCatalog = (props) => {
  // Use role prop or default to 'produccion'
  const role = typeof window !== 'undefined' && window.currentUserRole ? window.currentUserRole : (typeof props?.role === 'string' ? props.role : 'produccion');
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [moveRecord, setMoveRecord] = useState(null);
  const [queriesModalOpen, setQueriesModalOpen] = useState(false);
  // Move to Circulation handler
  const handleMoveToCirculation = (row) => {
    setMoveRecord(row);
    setMoveModalOpen(true);
  };

  const confirmMoveToCirculation = async () => {
    if (!moveRecord) return;
    await dieSerialService.updateDieSerial(moveRecord.id, { ...moveRecord, status_id: 2 }); // 2 = Circulation (adjust if needed)
    setMoveModalOpen(false);
    setMoveRecord(null);
    fetchRecords();
  };
  const [records, setRecords] = useState([]);
  const [statusFilter, setStatusFilter] = useState('circulation');
  const [filter, setFilter] = useState('');
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [selectOptions, setSelectOptions] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Toggle activar/desactivar
  const handleToggleActive = async (row) => {
    try {
      await dieSerialService.patchDieSerialActive(row.id, !row.is_active);
      await fetchRecords();
    } catch (error) {
      alert('Error changing status.');
    }
  };

  // Fetch all records with pagination and order
  const fetchRecords = async () => {
    const params = { orderBy: 'die_description', orderDir: 'DESC' };
    if (statusFilter !== 'all') {
      params.statusFilter = statusFilter;
    }
    const res = await dieSerialService.getAllDieSerials(params);
    // Si la respuesta es un array, úsala directamente; si es objeto, usa .data
    const rows = Array.isArray(res) ? res : (res?.data ?? []);
    setRecords(rows);
  };

  // Fetch select options for foreign keys
  const fetchSelectOptions = async () => {
    const [descRes, statusRes] = await Promise.all([
      dieSerialService.getActiveDieDescriptions(),
      dieSerialService.getActiveStatuses(),
    ]);
    setSelectOptions({
      die_description_id: descRes.data,
      status_id: statusRes.data,
    });
  };

  useEffect(() => {
    fetchRecords();
    fetchSelectOptions();
  }, [statusFilter]);

  // Filtrado y paginación en frontend
  useEffect(() => {
    let filtered = records;
    // Filtrar por status_id si no es 'all'
    if (statusFilter !== 'all') {
      const statusMap = {
        circulation: 2,
        new: 1,
        scraped: 3
      };
      filtered = filtered.filter(r => r.status_id === statusMap[statusFilter]);
    }
    if (filter.trim() !== '') {
      filtered = filtered.filter(r =>
        (r.die_description_text || '').toLowerCase().includes(filter.toLowerCase())
      );
    }
    setFilteredRecords(filtered);
    setTotalPages(Math.max(1, Math.ceil(filtered.length / limit)));
    if (page > Math.max(1, Math.ceil(filtered.length / limit))) {
      setPage(1);
    }
  }, [records, filter, limit, statusFilter]);

  // Add or edit record
  const handleSave = async (data) => {
    if (editRecord) {
      await dieSerialService.updateDieSerial(editRecord.id, data);
    } else {
      await dieSerialService.addDieSerial(data);
    }
    setModalOpen(false);
    setEditRecord(null);
    fetchRecords();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Die Serial Catalog</h2>
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-blue-900 text-lg">TOTAL: {filteredRecords.length}</div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Filter by Die Description..."
            value={filter}
            onChange={e => { setFilter(e.target.value); setPage(1); }}
            className="border px-2 py-1 rounded w-64"
          />
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded ${statusFilter === 'all' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-blue-900'}`}
              onClick={() => { setStatusFilter('all'); setPage(1); }}
            >All</button>
            <button
              className={`px-3 py-1 rounded ${statusFilter === 'circulation' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-blue-900'}`}
              onClick={() => { setStatusFilter('circulation'); setPage(1); }}
            >Circulation</button>
            <button
              className={`px-3 py-1 rounded ${statusFilter === 'new' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-blue-900'}`}
              onClick={() => { setStatusFilter('new'); setPage(1); }}
            >New</button>
            <button
              className={`px-3 py-1 rounded ${statusFilter === 'scraped' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-blue-900'}`}
              onClick={() => { setStatusFilter('scraped'); setPage(1); }}
            >Scraped</button>
          </div>
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-50"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button
            className="bg-blue-700 text-white px-3 py-1 rounded"
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
          >Next</button>
          <label className="ml-4">Rows per page:
            <select value={limit} onChange={e => setLimit(Number(e.target.value))} className="ml-2 px-2 py-1 border rounded">
              {[10, 20, 50, 100].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div className="flex justify-between items-center mb-2">
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => setModalOpen(true)}>Add</button>
          {(role === 'admin' || role === 'gerente' || role === 'setupSr' || role === 'setup') && (
            <button className="bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded" onClick={() => setQueriesModalOpen(true)}>Queries</button>
          )}
        </div>
      </div>
      <BaseTableAdvanced
        schema={dieSerialSchema.filter(f => f.key !== 'id')}
        data={filteredRecords.slice((page - 1) * limit, page * limit)}
        onEdit={rec => { setEditRecord(rec); setModalOpen(true); }}
        onToggleActive={handleToggleActive}
        onAdd={() => { setEditRecord(null); setModalOpen(true); }}
        onMoveToCirculation={
          (role === 'admin' || role === 'gerente' || role === 'setupSr' || role === 'setup')
            ? handleMoveToCirculation
            : undefined
        }
      />
      {/* Move to Circulation Modal */}
      {moveModalOpen && (
        <Modal open={moveModalOpen} onClose={() => setMoveModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Move to Circulation</h2>
            <p>Are you sure you want to move serial <b>{moveRecord?.serial_number}</b> to Circulation?</p>
            <div className="flex gap-2 mt-4 justify-end">
              <button className="bg-blue-700 text-white px-4 py-2 rounded" onClick={confirmMoveToCirculation}>Confirm</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setMoveModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </Modal>
      )}
      {/* Queries Modal */}
      {queriesModalOpen && (
        <Modal open={queriesModalOpen} onClose={() => setQueriesModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-lg font-bold mb-2">Queries</h2>
            <p>Here you will find inventory and purchase queries (feature coming soon).</p>
            <div className="flex gap-2 mt-4 justify-end">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setQueriesModalOpen(false)}>Close</button>
            </div>
          </div>
        </Modal>
      )}
      {modalOpen && (
        <DieSerialModal
          mode={editRecord ? 'edit' : 'add'}
          record={editRecord}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditRecord(null); }}
          dieDescriptions={selectOptions.die_description_id || []}
          statuses={selectOptions.status_id || []}
        />
      )}
    </div>
  );
};

export default DieSerialCatalog;
