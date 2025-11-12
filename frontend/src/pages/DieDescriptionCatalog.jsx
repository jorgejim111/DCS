import React, { useEffect, useState } from 'react';
import BaseTableAdvanced from '../components/BaseTableAdvanced';
// importación eliminada, migrar a modal específico
import { dieDescriptionSchema } from '../schemas/dieDescriptionSchema';
import * as dieDescriptionService from '../services/dieDescriptionService';
import DieDescriptionModal from '../components/modals/DieDescriptionModal';


const DieDescriptionCatalog = () => {
  const [records, setRecords] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [selectOptions, setSelectOptions] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

 // Toggle activar/desactivar
  const handleToggleActive = async (row) => {
    try {
      // Asegura que is_active sea booleano o numérico correcto
      const currentActive = row.is_active === true || row.is_active === 1 || row.is_active === 'Active';
      await dieDescriptionService.updateDieDescription(row.id, { is_active: currentActive ? 0 : 1 });
      await fetchRecords();
    } catch (error) {
      alert('Error changing status.');
    }
  };
  // Fetch all records
  const fetchRecords = async () => {
    try {
      const res = await dieDescriptionService.getAllDieDescriptions();
      // Si la respuesta es un array, úsala directamente
      const rows = Array.isArray(res) ? res : (res?.data ?? []);
      // Normaliza is_active a 1/0 para lógica de botones
      const normalized = rows.map(row => ({
        ...row,
        // is_active: 1 (activo), 0 (inactivo)
        is_active: row.is_active === true || row.is_active === 1 || row.is_active === 'Active' ? 1 : 0,
        // Para mostrar el texto correcto en la tabla
        active_text: (row.is_active === true || row.is_active === 1 || row.is_active === 'Active') ? 'Active' : 'Inactive'
      }));
      // Ordena ascendente por die_description
      const sorted = normalized.slice().sort((a, b) => {
        if (a.die_description && b.die_description) {
          return a.die_description.localeCompare(b.die_description);
        }
        return 0;
      });
      setRecords(sorted);
    } catch (error) {
      setRecords([]);
      console.error('Error al obtener die descriptions:', error);
    }
  };

  // Fetch select options for foreign keys
  const fetchSelectOptions = async () => {
    const token = localStorage.getItem('token');
    const [inchRes, partRes, descRes] = await Promise.all([
      dieDescriptionService.getActiveInches(token),
      dieDescriptionService.getActiveParts(token),
      dieDescriptionService.getActiveDescriptions(token),
    ]);
    setSelectOptions({
      inch_id: inchRes.data,
      part_id: partRes.data,
      description_id: descRes.data,
    });
  };

  useEffect(() => {
    fetchRecords();
    fetchSelectOptions();
  }, []);

  // Add or edit record
  const handleSave = async (data) => {
    if (editRecord) {
      await dieDescriptionService.updateDieDescription(editRecord.id, data);
    } else {
      await dieDescriptionService.addDieDescription(data);
    }
    setModalOpen(false);
    setEditRecord(null);
    fetchRecords();
  };

  // Activate/deactivate
  const handleActivate = async (id) => {
    await dieDescriptionService.activateDieDescription(id);
    fetchRecords();
  };
  const handleDeactivate = async (id) => {
    await dieDescriptionService.deactivateDieDescription(id);
    fetchRecords();
  };

  // Paginación y actualización de totalPages
  useEffect(() => {
    setTotalPages(Math.max(1, Math.ceil(records.length / limit)));
    if (page > Math.max(1, Math.ceil(records.length / limit))) {
      setPage(1);
    }
  }, [records, limit]);

  const paginatedData = records.slice((page - 1) * limit, page * limit);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Die Description Catalog</h2>
      <div className="flex items-center gap-4 mb-2">
        <div className="ml-auto flex gap-2">
          <button
            className={
              `px-3 py-1 rounded bg-blue-700 text-white disabled:opacity-50`
            }
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button
            className={
              `px-3 py-1 rounded bg-blue-700 text-white disabled:opacity-50`
            }
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
      <BaseTableAdvanced
        schema={dieDescriptionSchema.filter(f => f.key !== 'id')}
        data={paginatedData.map(row => ({
          ...row,
          inch: row.inch,
          part: row.part,
          description: row.description,
          is_active: row.is_active,
          active_text: row.active_text
        }))}
        onEdit={rec => { setEditRecord(rec); setModalOpen(true); }}
        onToggleActive={handleToggleActive}
        onAdd={() => { setEditRecord(null); setModalOpen(true); }}
      />
      {modalOpen && (
        <DieDescriptionModal
          mode={editRecord ? 'edit' : 'add'}
          record={editRecord}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditRecord(null); }}
          inches={selectOptions.inch_id || []}
          parts={selectOptions.part_id || []}
          descriptions={selectOptions.description_id || []}
        />
      )}
    </div>
  );
};

export default DieDescriptionCatalog;
