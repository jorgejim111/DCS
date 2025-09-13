import React, { useEffect, useState } from 'react';
import BaseTableAdvanced from '../components/BaseTableAdvanced';
import { dieSerialSchema } from '../schemas/dieSerialSchema';
import * as dieSerialService from '../services/dieSerialService';
import DieSerialModal from '../components/modals/DieSerialModal';

const DieSerialCatalog = () => {
  const [records, setRecords] = useState([]);
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
  const fetchRecords = async (newPage = page) => {
    const params = { page: newPage, limit, orderBy: 'die_description', orderDir: 'DESC' };
    const res = await dieSerialService.getAllDieSerials(params);
    setRecords(res.data);
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
    fetchRecords(page);
    fetchSelectOptions();
  }, [page, limit]);

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
      <div className="flex items-center gap-4 mb-2">
        <button
          className="bg-blue-700 text-white px-3 py-1 rounded disabled:opacity-50"
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          disabled={page === 1}
        >Previous</button>
        <span>Page {page}</span>
        <button
          className="bg-blue-700 text-white px-3 py-1 rounded"
          onClick={() => setPage(page + 1)}
        >Next</button>
        <label className="ml-4">Rows per page:
          <select value={limit} onChange={e => setLimit(Number(e.target.value))} className="ml-2 px-2 py-1 border rounded">
            {[10, 20, 50, 100].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>
      </div>
      <BaseTableAdvanced
        schema={dieSerialSchema.filter(f => f.key !== 'id')}
        data={records}
        onEdit={rec => { setEditRecord(rec); setModalOpen(true); }}
        onToggleActive={handleToggleActive}
        onAdd={() => { setEditRecord(null); setModalOpen(true); }}
      />
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
