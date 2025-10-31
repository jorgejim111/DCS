import React, { useState } from "react";
import { getAllDieSerials } from "../../services/dieSerialService";
import { getDieSerialHistory } from "../../services/dieSerialService";
import { getDamageReportBySerial } from "../../services/damageReportService";
import { getDieSerialBySerialNumber, updateDieSerial } from "../../services/dieSerialService";
import { createDieSerialHistory } from "../../services/dieSerialHistoryService";

const MoveToCirculationModal = ({ open, onClose }) => {
  const [dieInner, setDieInner] = useState("");
  const [dieOuter, setDieOuter] = useState("");
  const [dieProudness, setDieProudness] = useState("");
  const [serial, setSerial] = useState("");
  const [serialOptions, setSerialOptions] = useState([]);
  const [dieDescription, setDieDescription] = useState("");
  const [status, setStatus] = useState(null); // null, 1=new, 2=circulation, 4=open dr
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [dieId, setDieId] = useState(null);
  const [dieDescriptionId, setDieDescriptionId] = useState(null);
  // Modal para datos de reparación
  const [showRepairModal, setShowRepairModal] = useState(false);
  const [repairData, setRepairData] = useState({
    inner: "",
    outer: "",
    proudness: "",
    innerGrinding: "",
    outerGrinding: ""
  });
  const [repairError, setRepairError] = useState("");
  const [repairSummary, setRepairSummary] = useState(null);
  const [confirmingRepair, setConfirmingRepair] = useState(false);


  // Limpiar estado al cerrar el modal
  React.useEffect(() => {
    if (!open) {
      setSerial("");
      setDieDescription("");
      setStatus(null);
      setError("");
      setLoading(false);
      setSuccess("");
      setDieId(null);
      setDieDescriptionId(null);
      setSerialOptions([]);
    } else {
      // Al abrir, cargar seriales válidos (status 1 o 7)
      fetchSerialOptions();
    }
  }, [open]);

  const fetchSerialOptions = async () => {
    try {
      setLoading(true);
      // Usar el servicio con token
      const [data1, data7] = await Promise.all([
        getAllDieSerials({ status: 1 }),
        getAllDieSerials({ status: 7 })
      ]);
      // Unifica y filtra duplicados
      const allSerials = [...(Array.isArray(data1.data) ? data1.data : [data1.data]), ...(Array.isArray(data7.data) ? data7.data : [data7.data])];
      const uniqueSerials = Array.from(new Set(allSerials.map(s => s.serial_number)))
        .map(sn => allSerials.find(s => s.serial_number === sn));
      setSerialOptions(uniqueSerials);
    } catch (err) {
      setSerialOptions([]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;


  // Estado de botones
  const isNew = status === 1;
  const isToFix = status === 7;
  const isOpenDR = status === 4;
  const isCirculation = status === 2;

  const handleCheckDieInfo = async () => {
    setError("");
    setSuccess("");
    setDieDescription("");
    setStatus(null);
    setDieId(null);
    setDieDescriptionId(null);
    if (!serial.trim()) {
      setError("Please enter a Serial Number");
      return;
    }
    setLoading(true);
    try {
      const die = await getDieSerialBySerialNumber(serial.trim());
      if (!die) {
        setError("Serial number not found");
        setDieDescription("");
        setStatus(null);
        setDieId(null);
        setDieDescriptionId(null);
        return;
      }
      setDieDescription(die.die_description_text || die.die_description || "");
      setStatus(die.status_id);
      setDieId(die.id);
      setDieDescriptionId(die.die_description_id);
  setDieInner(die.inner);
  setDieOuter(die.outer);
  setDieProudness(die.proudness);
      setError("");
    } catch (e) {
      setError("Error fetching serial info");
            {/* Modal para datos de reparación */}
            {showRepairModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                  <button onClick={() => setShowRepairModal(false)} className="absolute top-2 right-2 text-[#264893] hover:text-[#0C2C65] text-2xl font-bold">&times;</button>
                  <h3 className="text-xl font-bold text-[#0C2C65] mb-4 text-center">Repair Data for Die</h3>
                  <div className="mb-2 text-[#264893] font-semibold">Die Description:</div>
                  <div className="mb-4 text-[#0C2C65] bg-gray-100 rounded px-2 py-1">{dieDescription}</div>
                  <form onSubmit={e => { e.preventDefault(); handleRepairSummary(); }}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block font-semibold mb-1">Inner (in x .0001)</label>
                        <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.inner} onChange={e => setRepairData({ ...repairData, inner: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Outer (in x .0001)</label>
                        <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.outer} onChange={e => setRepairData({ ...repairData, outer: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Proudness (mm)</label>
                        <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.proudness} onChange={e => setRepairData({ ...repairData, proudness: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Inner Grinding</label>
                        <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.innerGrinding} onChange={e => setRepairData({ ...repairData, innerGrinding: e.target.value })} required />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Outer Grinding</label>
                        <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.outerGrinding} onChange={e => setRepairData({ ...repairData, outerGrinding: e.target.value })} required />
                      </div>
                    </div>
                    {repairError && <div className="mb-2 text-red-600 font-semibold text-center">{repairError}</div>}
                    {!repairSummary && (
                      <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded w-full">Show Summary</button>
                    )}
                  </form>
                  {repairSummary && (
                    <div className="mt-4">
                      <div className="mb-2 font-semibold text-[#264893]">Summary</div>
                      <div className="mb-2 text-[#0C2C65] bg-gray-100 rounded px-2 py-1">
                        <div><b>Die Description:</b> {dieDescription}</div>
                        <div><b>Inner:</b> {repairData.inner}</div>
                        <div><b>Outer:</b> {repairData.outer}</div>
                        <div><b>Proudness:</b> {repairData.proudness}</div>
                        <div><b>Inner Grinding:</b> {repairData.innerGrinding}</div>
                        <div><b>Outer Grinding:</b> {repairData.outerGrinding}</div>
                      </div>
                      <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full mt-2" onClick={handleMoveRepairedDie} disabled={confirmingRepair}>
                        {confirmingRepair ? "Processing..." : "Confirm and Move to Circulation"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
      setDieDescription("");
      setStatus(null);
      setDieId(null);
      setDieDescriptionId(null);
    } finally {
      setLoading(false);
    }
  };

  // Move New Die to Circulation
  const handleMoveNewDie = async () => {
    setError("");
    setSuccess("");
    if (!dieId || !isNew) return;
    setLoading(true);
    try {
      // Update die_serial status_id to 2 (Circulation) y todos los campos actuales
      await updateDieSerial(dieId, {
        serial_number: serial,
        die_description_id: dieDescriptionId,
        status_id: 2,
        inner: dieInner !== null && dieInner !== undefined && dieInner !== "" ? dieInner : 0,
        outer: dieOuter !== null && dieOuter !== undefined && dieOuter !== "" ? dieOuter : 0,
        proudness: dieProudness !== null && dieProudness !== undefined && dieProudness !== "" ? dieProudness : 0
      });
      // 3. Add die_serial_history record
      await createDieSerialHistory({
        die_serial_id: dieId,
        status_id: 2,
        note: "Need be tested by production",
        // Los demás campos se quedan como null/no
      });
      setSuccess("Die moved to Circulation and history recorded.");
      setStatus(2);
      if (typeof onClose === 'function') onClose();
    } catch (e) {
      setError("Error moving die to Circulation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Validar y mostrar resumen
  function handleRepairSummary() {
    setRepairError("");
    // Validación básica
    const { inner, outer, proudness, innerGrinding, outerGrinding } = repairData;
    if ([inner, outer, proudness, innerGrinding, outerGrinding].some(v => v === "" || isNaN(Number(v)) || Number(v) < 0)) {
      setRepairError("All values must be positive numbers.");
      return;
    }
    setRepairSummary({ ...repairData });
  }

  // Lógica para mover die reparado a circulación
  async function handleMoveRepairedDie() {
    setRepairError("");
    setConfirmingRepair(true);
    try {
  // 1. Buscar el primer damage_report por id de die_serial
  const dr = await getDamageReportBySerial(dieId);
      if (!dr || !dr.id) {
        setRepairError("No damage report found for this die. Please check the workflow.");
        setConfirmingRepair(false);
        return;
      }
      // 2. Actualizar die_serial con todos los campos requeridos
      await updateDieSerial(dieId, {
        serial_number: serial,
        die_description_id: dieDescriptionId,
        status_id: 2,
        inner: repairData.inner,
        outer: repairData.outer,
        proudness: repairData.proudness
      });
      // 3. Insertar en die_serial_history
      await createDieSerialHistory({
        die_serial_id: dieId,
        status_id: 2,
        note: "Die repaired and moved to circulation. Awaiting production test.",
        proudness: repairData.proudness,
        inner_grinding: repairData.innerGrinding,
        outer_grinding: repairData.outerGrinding,
        inner_land_thickness: repairData.inner,
        outer_land_thickness: repairData.outer,
        damage_report_id: dr.id,
        observed_damage_id: dr.observed_damage_id,
        performed_by: dr.performed_by, // O usa el usuario de sesión si está disponible
      });
  setSuccess("Repaired die moved to Circulation and history recorded.");
  setStatus(2);
  setShowRepairModal(false);
  if (typeof onClose === 'function') onClose();
    } catch (e) {
      setRepairError("Error moving repaired die to Circulation. Please try again.");
    } finally {
      setConfirmingRepair(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-[#264893] hover:text-[#0C2C65] text-2xl font-bold">&times;</button>
        <div className="flex flex-col items-center mb-6">
          <img src="/logo.jpg" alt="Logo" className="h-14 mb-2" />
          <h2 className="text-2xl font-bold text-[#0C2C65] mb-2">Move to Circulation</h2>
        </div>
        <div className="mb-4">
          <label className="block text-[#264893] font-semibold mb-1">Serial #</label>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full mb-2"
            value={serial}
            onChange={e => setSerial(e.target.value)}
            list="serial-datalist"
            placeholder="Select or enter Serial Number"
            autoComplete="off"
          />
          <datalist id="serial-datalist">
            {serialOptions.map(option => (
              <option key={option.serial_number + '-' + (option.die_description_id || '')} value={option.serial_number}>
                {option.serial_number} - {option.die_description_text || option.die_description || ""}
              </option>
            ))}
          </datalist>
          <button
            className="bg-[#23B0E8] hover:bg-[#0C2C65] text-white font-semibold px-4 py-2 rounded transition text-lg w-full mb-2 disabled:opacity-60"
            onClick={handleCheckDieInfo}
            disabled={loading}
          >
            {loading ? "Checking..." : "Check Die Info"}
          </button>
        </div>
        {dieDescription && (
          <label className="block text-[#264893] font-semibold mb-2 text-center">
            Die Description:
            <div className="mt-1 text-base font-normal text-[#0C2C65] bg-gray-100 rounded px-2 py-1 inline-block w-full break-words">
              {dieDescription}
            </div>
          </label>
        )}
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
        )}
        <div className="flex flex-col gap-3">
          <button
            className={`px-4 py-2 rounded font-semibold text-lg w-full ${isNew ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!isNew || loading}
            onClick={handleMoveNewDie}
          >
            {loading && isNew ? "Processing..." : "Move New Die to Circulation"}
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold text-lg w-full ${isToFix ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!isToFix}
            onClick={() => {
              setRepairData({ inner: "", outer: "", proudness: "", innerGrinding: "", outerGrinding: "" });
              setRepairError("");
              setRepairSummary(null);
              setShowRepairModal(true);
            }}
          >
            Move Repaired Die to Circulation
          </button>
      {/* Modal para datos de reparación */}
      {showRepairModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
            <button onClick={() => setShowRepairModal(false)} className="absolute top-2 right-2 text-[#264893] hover:text-[#0C2C65] text-2xl font-bold">&times;</button>
            <h3 className="text-xl font-bold text-[#0C2C65] mb-4 text-center">Repair Data for Die</h3>
            <div className="mb-2 text-[#264893] font-semibold">Die Description:</div>
            <div className="mb-4 text-[#0C2C65] bg-gray-100 rounded px-2 py-1">{dieDescription}</div>
            <form onSubmit={e => { e.preventDefault(); handleRepairSummary(); }}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-semibold mb-1">Inner (in x .0001)</label>
                  <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.inner} onChange={e => setRepairData({ ...repairData, inner: e.target.value })} required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Outer (in x .0001)</label>
                  <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.outer} onChange={e => setRepairData({ ...repairData, outer: e.target.value })} required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Proudness (mm)</label>
                  <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.proudness} onChange={e => setRepairData({ ...repairData, proudness: e.target.value })} required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Inner Grinding</label>
                  <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.innerGrinding} onChange={e => setRepairData({ ...repairData, innerGrinding: e.target.value })} required />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Outer Grinding</label>
                  <input type="number" step="0.01" min="0" className="border px-2 py-1 rounded w-full" value={repairData.outerGrinding} onChange={e => setRepairData({ ...repairData, outerGrinding: e.target.value })} required />
                </div>
              </div>
              {repairError && <div className="mb-2 text-red-600 font-semibold text-center">{repairError}</div>}
              {!repairSummary && (
                <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-4 py-2 rounded w-full">Show Summary</button>
              )}
            </form>
            {repairSummary && (
              <div className="mt-4">
                <div className="mb-2 font-semibold text-[#264893]">Summary</div>
                <div className="mb-2 text-[#0C2C65] bg-gray-100 rounded px-2 py-1">
                  <div><b>Die Description:</b> {dieDescription}</div>
                  <div><b>Inner:</b> {repairData.inner}</div>
                  <div><b>Outer:</b> {repairData.outer}</div>
                  <div><b>Proudness:</b> {repairData.proudness}</div>
                  <div><b>Inner Grinding:</b> {repairData.innerGrinding}</div>
                  <div><b>Outer Grinding:</b> {repairData.outerGrinding}</div>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full mt-2" onClick={handleMoveRepairedDie} disabled={confirmingRepair}>
                  {confirmingRepair ? "Processing..." : "Confirm and Move to Circulation"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

          {/* Cierre de flex flex-col gap-3 */}
        </div>
      {/* Cierre de bg-white rounded-lg ... */}
      </div>
    {/* Cierre de fixed inset-0 ... */}
    </div>
  );
}

export default MoveToCirculationModal;
