import React, { useEffect, useState } from 'react';
import DiagnosisDamageReportModal from './DiagnosisDamageReportModal';
import axios from 'axios';
import { updateDieSerial } from '../../services/dieSerialService';
import { createDieSerialHistory } from '../../services/dieSerialHistoryService';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric'
  }).replace(/ /g, '-');
}

const DamageReportViewModal = ({ open, onClose, id }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGoodModal, setShowGoodModal] = useState(false);
  const [goodNote, setGoodNote] = useState('');
  const [showFixModal, setShowFixModal] = useState(false);
  const [fixNote, setFixNote] = useState('');
  const [innerToGrind, setInnerToGrind] = useState('');
  const [outerToGrind, setOuterToGrind] = useState('');
  const [showScrapModal, setShowScrapModal] = useState(false);
  const [scrapNote, setScrapNote] = useState('');
  const [showDiagnosisModal, setShowDiagnosisModal] = useState(false);
  const handleScrapSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      // 1. Actualizar el Damage Report: status_id a 6 (Closed) y veredicto 'Scrap'
      const drUpdate = {
        die_serial_id: data.die_serial_id ?? null,
        line_id: data.line_id ?? null,
        product_id: data.product_id ?? null,
        operator_id: data.operator_id ?? null,
        supervisor_id: data.supervisor_id ?? null,
        description_dr_id: data.description_dr_id ?? null,
        explanation_id: data.explanation_id ?? null,
        if_sample: data.if_sample ?? 0,
        note: data.note ?? '',
        status_id: 6,
        verdict: 'Scrap'
      };
      await axios.put(`/api/damage-report/${id}`, drUpdate, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. Actualizar el die_serial a status 3 (Scrap)
      if (data && data.die_serial_id) {
        const res = await axios.get(`/api/die-serial/${data.die_serial_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const serial = res.data;
        await updateDieSerial(
          data.die_serial_id,
          {
            serial_number: serial.serial_number,
            die_description_id: serial.die_description_id,
            status_id: 3,
            inner: serial.inner == null ? 0 : serial.inner,
            outer: serial.outer == null ? 0 : serial.outer,
            proudness: serial.proudness == null ? 0 : serial.proudness
          },
          token
        );
      }

      // 3. Registrar historial en die_serial_history con status 3 y nota
      if (data && data.die_serial_id) {
        await createDieSerialHistory(
          {
            die_serial_id: data.die_serial_id,
            status_id: 3, // Scrap
            note: scrapNote,
            damage_report_id: id,
            observed_damage_id: data.description_dr_id,
            performed_by: data.operator_id,
            product_id: data.product_id,
            line_id: data.line_id
          },
          token
        );
      }

      setShowScrapModal(false);
      setScrapNote('');
      alert('Die status updated to Scrap and history saved.');
      setShowDiagnosisModal(true);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
      if (onClose) onClose();
    }
  };
  const handleFixSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      // 1. Actualizar el Damage Report: status_id a 7 (To Fix) y veredicto
      const drUpdate = {
        die_serial_id: data.die_serial_id ?? null,
        line_id: data.line_id ?? null,
        product_id: data.product_id ?? null,
        operator_id: data.operator_id ?? null,
        supervisor_id: data.supervisor_id ?? null,
        description_dr_id: data.description_dr_id ?? null,
        explanation_id: data.explanation_id ?? null,
        if_sample: data.if_sample ?? 0,
        note: data.note ?? '',
        status_id: 7,
        verdict: 'To Fix'
      };
      await axios.put(`/api/damage-report/${id}`, drUpdate, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. Actualizar el die_serial a status 7 (To Fix)
      if (data && data.die_serial_id) {
        const res = await axios.get(`/api/die-serial/${data.die_serial_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const serial = res.data;
          await updateDieSerial(
            data.die_serial_id,
            {
              serial_number: serial.serial_number,
              die_description_id: serial.die_description_id,
              status_id: 7,
              inner: serial.inner == null ? 0 : serial.inner,
              outer: serial.outer == null ? 0 : serial.outer,
              proudness: serial.proudness == null ? 0 : serial.proudness
            },
            token
          );
      }

      // 3. Registrar historial en die_serial_history con inner/outer_to_grind y nota
      if (data && data.die_serial_id) {
          await createDieSerialHistory(
            {
              die_serial_id: data.die_serial_id,
              status_id: 7, // To Fix
              inner_to_grind: parseFloat(innerToGrind) || 0,
              outer_to_grind: parseFloat(outerToGrind) || 0,
              note: fixNote,
              damage_report_id: id,
              observed_damage_id: data.description_dr_id,
              performed_by: data.operator_id,
              product_id: data.product_id,
              line_id: data.line_id
              // Los demás campos se insertan como null/no
            },
            token
          );
      }

      setShowFixModal(false);
      setFixNote('');
      setInnerToGrind('');
      setOuterToGrind('');
      alert('Die status updated to To Fix and history saved.');
      setShowDiagnosisModal(true);
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
      if (onClose) onClose();
    }
  };
  

  useEffect(() => {
    if (open && id) {
      setLoading(true);
      axios.get(`/api/damage-report/raw/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
        .then(res => {
          console.log('DR RAW recibido al seleccionar IDDR:', res.data);
          setData(res.data);
        })
        .finally(() => setLoading(false));
    }
  }, [open, id]);

  const handleGoodSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      // 1. Actualizar el Damage Report: status_id a 6 (Closed) y nota
      // Construir el objeto con todos los datos existentes del DR, cambiando solo el status
      const drUpdate = {
        die_serial_id: data.die_serial_id ?? null,
        line_id: data.line_id ?? null,
        product_id: data.product_id ?? null,
        operator_id: data.operator_id ?? null,
        supervisor_id: data.supervisor_id ?? null,
        description_dr_id: data.description_dr_id ?? null,
        explanation_id: data.explanation_id ?? null,
        if_sample: data.if_sample ?? 0,
        note: data.note ?? '',
        status_id: 6,
        verdict: data.verdict ?? ''
      };
      console.log('DR PUT update:', drUpdate);
      await axios.put(`/api/damage-report/${id}`,
        drUpdate,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // 2. Actualizar el die_serial a status 2 (Circulation)
      if (data && data.die_serial_id) {
        const res = await axios.get(`/api/die-serial/${data.die_serial_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const serial = res.data;
        await updateDieSerial(
          data.die_serial_id,
          {
            serial_number: serial.serial_number,
            die_description_id: serial.die_description_id,
            status_id: 2,
            inner: serial.inner == null ? 0 : serial.inner,
            outer: serial.outer == null ? 0 : serial.outer,
            proudness: serial.proudness == null ? 0 : serial.proudness
          },
          token
        );
      }

      // 3. Registrar historial en die_serial_history
      if (data && data.die_serial_id) {
        await createDieSerialHistory(
          {
            die_serial_id: data.die_serial_id,
            status_id: 2, // Circulation
            note: goodNote,
            damage_report_id: id,
            observed_damage_id: data.description_dr_id,
            performed_by: data.operator_id, // id usuario
            product_id: data.product_id,
            line_id: data.line_id
            // Los demás campos se insertan como null/no
          },
          token
        );
      }

      setShowGoodModal(false);
      setGoodNote('');
      alert('Die status updated to Circulation and history saved.');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-2xl p-0 w-full max-w-3xl relative shadow-lg">
          {/* Encabezado */}
          <div className="flex items-start justify-between px-8 pt-6 pb-2 border-b">
            {/* Logo */}
            <div className="flex flex-col items-start">
              <img src="/logo.jpg" alt="Logo" className="h-12 mb-1" />
              <span className="text-xs text-[#0C2C65] font-bold">MasterNet Ltd.</span>
            </div>
            {/* Título */}
            <div className="flex-1 flex flex-col items-center">
              <span className="text-2xl font-bold text-[#0C2C65] leading-tight">Damage Report</span>
              <span className="text-lg text-[#264893] font-semibold">Check a Damage Report</span>
            </div>
            {/* Fecha e IDDR */}
            <div className="flex flex-col items-end text-right">
              <span className="text-base text-[#264893] font-semibold">Date: {data ? formatDate(data.created_at) : ''}</span>
              <span className="text-base text-[#264893] font-semibold">IDDR: {id}</span>
            </div>
            {/* Botón cerrar */}
            <button onClick={onClose} className="absolute top-4 right-4 text-[#264893] hover:text-red-600 text-2xl font-bold">×</button>
          </div>
          {/* Cuerpo */}
          <div className="px-8 py-6">
            {loading ? (
              <div className="text-center text-[#264893] font-semibold">Loading...</div>
            ) : data ? (
              <>
                {/* Línea 1 */}
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="text-xs font-bold text-[#264893] mb-1">Serial #</div>
                    <div className="text-base text-[#0C2C65]">{data.serial_number}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#264893] mb-1">Product</div>
                    <div className="text-base text-[#0C2C65]">{data.product_name}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#264893] mb-1">Line</div>
                    <div className="text-base text-[#0C2C65]">{data.line_name}</div>
                  </div>
                </div>
                {/* Línea 2 */}
                <div className="grid grid-cols-3 gap-6 mb-4">
                  <div>
                    <div className="text-xs font-bold text-[#264893] mb-1">Description</div>
                    <div className="text-base text-[#0C2C65]">{data.description_dr}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#264893] mb-1">Explanation</div>
                    <div className="text-base text-[#0C2C65]">{data.explanation}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#264893] mb-1">Sample</div>
                    <div className="text-base text-[#0C2C65]">{data.if_sample ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                {/* Línea 3: Note */}
                <div className="mb-4">
                  <div className="text-xs font-bold text-[#264893] mb-1">Note</div>
                  <div className="text-base text-[#0C2C65]">{data.note}</div>
                </div>
              </>
            ) : (
              <div className="text-center text-red-600 font-semibold">No data found.</div>
            )}
          </div>
          {/* Botones */}
          <div className="grid grid-cols-3 gap-6 pb-6">
            <button className="w-full bg-[#7CA6F7] hover:bg-[#264893] text-[#264893] hover:text-white font-bold py-3 rounded-xl text-lg border-2 border-[#7CA6F7] transition-colors duration-150" onClick={() => setShowGoodModal(true)}>Good</button>
        {/* Modal para motivo de diagnóstico 'Good' */}
        {showGoodModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative flex flex-col items-center">
              <h2 className="text-xl font-bold text-[#264893] mb-4 text-center">Why is the die in good condition?</h2>
              <textarea className="w-full border-2 border-[#7CA6F7] rounded-xl p-3 mb-4 text-lg" rows={3} value={goodNote} onChange={e => setGoodNote(e.target.value)} placeholder="Enter your reason..." />
              <div className="flex gap-4">
                <button className="bg-[#7CA6F7] hover:bg-[#264893] text-[#264893] hover:text-white font-bold py-2 px-6 rounded-xl text-lg border-2 border-[#7CA6F7]" onClick={handleGoodSubmit}>Confirm</button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl text-lg" onClick={() => setShowGoodModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
            <button className="w-full bg-[#7CA6F7] hover:bg-[#264893] text-[#264893] hover:text-white font-bold py-3 rounded-xl text-lg border-2 border-[#7CA6F7] transition-colors duration-150" onClick={() => setShowFixModal(true)}>To Fix</button>
        {/* Modal para motivo de diagnóstico 'To Fix' */}
        {showFixModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative flex flex-col items-center">
              <h2 className="text-xl font-bold text-[#264893] mb-4 text-center">To Fix - Grinding Details</h2>
              <input type="number" step="0.01" min="0" className="w-full border-2 border-[#7CA6F7] rounded-xl p-3 mb-4 text-lg" value={innerToGrind} onChange={e => setInnerToGrind(e.target.value)} placeholder='Inner to grind (X 0.001")' />
              <input type="number" step="0.01" min="0" className="w-full border-2 border-[#7CA6F7] rounded-xl p-3 mb-4 text-lg" value={outerToGrind} onChange={e => setOuterToGrind(e.target.value)} placeholder='Outer to grind (X 0.001")' />
              <textarea className="w-full border-2 border-[#7CA6F7] rounded-xl p-3 mb-4 text-lg" rows={3} value={fixNote} onChange={e => setFixNote(e.target.value)} placeholder="Enter your reason..." />
              <div className="flex gap-4">
                <button className="bg-[#7CA6F7] hover:bg-[#264893] text-[#264893] hover:text-white font-bold py-2 px-6 rounded-xl text-lg border-2 border-[#7CA6F7]" onClick={handleFixSubmit}>Confirm</button>
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl text-lg" onClick={() => setShowFixModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl text-lg shadow" onClick={() => setShowScrapModal(true)}>To Scrap</button>
        {/* Modal para motivo de diagnóstico 'Scrap' */}
        {showScrapModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative flex flex-col items-center">
              <h2 className="text-xl font-bold text-[#264893] mb-4 text-center">Scrap - Reason for scrapping</h2>
              <textarea className="w-full border-2 border-[#7CA6F7] rounded-xl p-3 mb-4 text-lg" rows={3} value={scrapNote} onChange={e => setScrapNote(e.target.value)} placeholder="Enter your reason..." />
              <div className="flex gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-xl text-lg border-2 border-[#7CA6F7]" onClick={handleScrapSubmit}>Confirm</button>
                <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-xl text-lg" onClick={() => setShowScrapModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>
      {/* Modal de diagnóstico después de To Fix/Scrap */}
      {showDiagnosisModal && (
        <DiagnosisDamageReportModal
          open={showDiagnosisModal}
          onClose={() => {
            setShowDiagnosisModal(false);
            if (onClose) onClose();
          }}
          iddrData={{
            id,
            date: data?.created_at ? formatDate(data.created_at) : '',
            serial_number: data?.serial_number,
            die_description: data?.die_description_name || data?.die_description,
            product_name: data?.product_name,
            line_name: data?.line_name,
            supervisor_name: data?.supervisor_name || data?.supervisor,
            operator_name: data?.operator_name || data?.operator,
            description_dr: data?.description_dr,
            explanation: data?.explanation
          }}
          performedBy={localStorage.getItem('username') || 'Unknown'}
        />
      )}
    </>
  );
};

export default DamageReportViewModal;
