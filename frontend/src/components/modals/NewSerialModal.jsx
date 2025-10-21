import React, { useState, useEffect } from "react";
import { getAllDieDescriptions } from "../../services/dieDescriptionService";
import { addDieSerial } from "../../services/dieSerialService";
import { createDieSerialHistory } from "../../services/dieSerialHistoryService";

const NewSerialModal = ({ open, onClose }) => {
  const [serial, setSerial] = useState("");
  const [dieDescriptionInput, setDieDescriptionInput] = useState("");
  const [dieDescriptions, setDieDescriptions] = useState([]);
  const [inner, setInner] = useState("");
  const [outer, setOuter] = useState("");
  const [proudness, setProudness] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  // Cargar die descriptions al abrir el modal
  useEffect(() => {
    if (open) {
      setLoading(true);
      getAllDieDescriptions()
        .then(res => {
          const data = res.data;
          const mapped = Array.isArray(data)
            ? data
                .map(d => ({
                  id: d.id,
                  die_description: d.die_description || d.name || ''
                }))
                .filter(d => d.die_description)
                .sort((a, b) => a.die_description.localeCompare(b.die_description))
            : [];
          setDieDescriptions(mapped);
        })
        .catch(() => setDieDescriptions([]))
        .finally(() => setLoading(false));
    }
  }, [open]);

  // Validar campos
  const validate = () => {
    const errs = {};
    if (!serial.trim()) errs.serial = "Serial# is required.";
    if (!dieDescriptionInput.trim()) errs.dieDescription = "Die Description is required.";
    if (!inner || isNaN(inner)) errs.inner = "Inner is required.";
    if (!outer || isNaN(outer)) errs.outer = "Outer is required.";
    if (!proudness || isNaN(proudness)) errs.proudness = "Proudness is required.";
    return errs;
  };

  // Guardar nuevo serial y registrar en die_serial_history
  const handleSave = async (e) => {
    e.preventDefault();
    setErrors({});
    setSaveStatus("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      // Buscar dieDescriptionId
      const dieDesc = dieDescriptions.find(d => d.die_description === dieDescriptionInput);
      if (!dieDesc) {
        setErrors({ dieDescription: "Select a valid Die Description." });
        setLoading(false);
        return;
      }
      // Crear serial
      const serialRes = await addDieSerial({
        serial_number: serial.toUpperCase(),
        die_description_id: dieDesc.id,
        status_id: 1,
        inner: parseFloat(inner),
        outer: parseFloat(outer),
        proudness: parseFloat(proudness)
      });
      // Registrar en die_serial_history
      const dieSerialId = serialRes?.data?.id;
      if (!dieSerialId) {
        console.error("ERROR: El backend no devolvió el id del nuevo serial. serialRes=", serialRes);
        setSaveStatus("Error: El backend no devolvió el id del nuevo serial. No se puede crear historial.");
        setLoading(false);
        return;
      }
  // Log eliminado: serialRes y dieSerialId
      await createDieSerialHistory({
        die_serial_id: dieSerialId,
        status_id: 1,
        inner_to_grind: parseFloat(inner),
        outer_to_grind: parseFloat(outer),
        note: "Brand new die pending production test",
        proudness: parseFloat(proudness),
        performed_by: 2 // id de usuario, ajustar si tienes el id dinámico
        // Los demás campos quedan como null por default
      });
      setSaveStatus("Serial created successfully!");
      handleClose();
    } catch (err) {
      setSaveStatus("Error creating serial. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Limpiar campos al cerrar el modal
  const handleClose = () => {
  setSerial("");
    setDieDescriptionInput("");
    setInner("");
    setOuter("");
    setProudness("");
    setErrors({});
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <img src="/logo.jpg" alt="Logo" className="h-12 mb-2" />
        <h2 className="text-2xl font-bold text-[#0C2C65] mb-4">Create New Serial#</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSave} autoComplete="off">
          <div>
            <label className="font-bold text-blue-900 text-xs mb-1">Serial# <span className="text-red-600">*</span></label>
            <input
              className="border px-2 py-1 rounded w-full"
              placeholder="Enter serial..."
              value={serial}
              onChange={e => setSerial(e.target.value.toUpperCase())}
              autoComplete="off"
              required
              disabled={loading}
            />
            {errors.serial && <div className="text-red-600 text-xs mt-1">{errors.serial}</div>}
          </div>
          <div className="flex flex-col">
            <label className="text-xs font-bold text-blue-900 mb-1">Die Description <span className="text-red-600">*</span></label>
            <input
              className="border px-2 py-1 rounded w-full"
              placeholder="Select Die Description..."
              value={dieDescriptionInput}
              onChange={e => setDieDescriptionInput(e.target.value)}
              list="die-description-list"
              autoComplete="off"
              required
            />
            <datalist id="die-description-list">
              {dieDescriptions
                .sort((a, b) => a.die_description.localeCompare(b.die_description))
                .map(d => (
                  <option key={d.id} value={d.die_description} />
                ))}
            </datalist>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-blue-900 text-xs mb-1">Inner <span className="text-red-600">*</span></label>
              <input
                type="number"
                className="border px-2 py-1 rounded w-full"
                value={inner}
                onChange={e => setInner(e.target.value)}
                placeholder="Inner thickness"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.inner && <div className="text-red-600 text-xs mt-1">{errors.inner}</div>}
            </div>
            <div>
              <label className="font-bold text-blue-900 text-xs mb-1">Outer <span className="text-red-600">*</span></label>
              <input
                type="number"
                className="border px-2 py-1 rounded w-full"
                value={outer}
                onChange={e => setOuter(e.target.value)}
                placeholder="Outer thickness"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.outer && <div className="text-red-600 text-xs mt-1">{errors.outer}</div>}
            </div>
            <div>
              <label className="font-bold text-blue-900 text-xs mb-1">Proudness <span className="text-red-600">*</span></label>
              <input
                type="number"
                className="border px-2 py-1 rounded w-full"
                value={proudness}
                onChange={e => setProudness(e.target.value)}
                placeholder="Proudness"
                min="0"
                step="0.01"
                disabled={loading}
              />
              {errors.proudness && <div className="text-red-600 text-xs mt-1">{errors.proudness}</div>}
            </div>
          </div>
          <div className="flex justify-between gap-4 mt-6">
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded shadow-lg text-lg" disabled={loading}>Save New Serial#</button>
            <button type="button" onClick={handleClose} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded shadow-lg text-lg" disabled={loading}>Exit</button>
          </div>
        </form>
        {saveStatus && <div className={`mt-4 text-lg font-bold ${saveStatus.includes('success') ? 'text-green-700' : 'text-red-700'}`}>{saveStatus}</div>}
      </div>
    </div>
  );
}

export default NewSerialModal;
