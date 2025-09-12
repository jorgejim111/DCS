 
import React, { useEffect, useState } from 'react';
import BaseTableAdvanced from '../components/BaseTableAdvanced';
import BaseModalAdvanced from '../components/BaseModalAdvanced';
import { dieDescriptionSchema } from '../schemas/dieDescriptionSchema';
import * as dieDescriptionService from '../services/dieDescriptionService';

const DieDescriptionCatalog = () => {
const [records, setRecords] = useState([]);
const [modalOpen, setModalOpen] = useState(false);
const [editRecord, setEditRecord] = useState(null);
const [selectOptions, setSelectOptions] = useState({});

 // Toggle activar/desactivar
  const handleToggleActive = async (row) => {
    try {
      await dieDescriptionService.updateDieDescription(row.id, { is_active: !row.is_active });
      await fetchRecords();
    } catch (error) {
      alert('Error changing status.');
    }
  };
  // Fetch all records
  const fetchRecords = async () => {
    const res = await dieDescriptionService.getAllDieDescriptions();
    setRecords(res.data);
  };

  // Fetch select options for foreign keys
  const fetchSelectOptions = async () => {
    const [inchRes, partRes, descRes] = await Promise.all([
      dieDescriptionService.getActiveInches(),
      dieDescriptionService.getActiveParts(),
      dieDescriptionService.getActiveDescriptions(),
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

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-900">Die Description Catalog</h2>
      <BaseTableAdvanced
        schema={dieDescriptionSchema}
        data={records.map(row => ({
          ...row,
          inch: row.inch,
          part: row.part,
          description: row.description,
        }))}
        onEdit={rec => { setEditRecord(rec); setModalOpen(true); }}
        onToggleActive={handleToggleActive}
        onAdd={() => { setEditRecord(null); setModalOpen(true); }}
      />
      {modalOpen && (
        <BaseModalAdvanced
          schema={dieDescriptionSchema}
          mode={editRecord ? 'edit' : 'add'}
          record={editRecord}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditRecord(null); }}
          selectOptions={selectOptions}
        />
      )}
    </div>
  );
};

export default DieDescriptionCatalog;
