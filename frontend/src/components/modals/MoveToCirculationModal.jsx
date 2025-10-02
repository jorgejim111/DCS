import React, { useState } from "react";
import { getDieSerialBySerialNumber, updateDieSerial } from "../../services/dieSerialService";
import { createDieSerialHistory } from "../../services/dieSerialHistoryService";

const MoveToCirculationModal = ({ open, onClose }) => {
  const [serial, setSerial] = useState("");
  const [dieDescription, setDieDescription] = useState("");
  const [status, setStatus] = useState(null); // null, 1=new, 2=circulation, 4=open dr
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [dieId, setDieId] = useState(null);
  const [dieDescriptionId, setDieDescriptionId] = useState(null);


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
    }
  }, [open]);

  if (!open) return null;


  // Estado de botones
  const isNew = status === 1;
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
      setError("");
    } catch (e) {
      setError("Error fetching serial info");
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
      // 1. Update die_serial status_id to 2 (Circulation)
      await updateDieSerial(dieId, { status_id: 2 });
      // 2. Add die_serial_history record
      await createDieSerialHistory({
        die_serial_id: dieId,
        status_id: 2,
        fecha: new Date().toISOString(),
        note: "Moved to Circulation from New",
        die_description_id: dieDescriptionId,
        // Add more fields if needed (e.g., user, line, etc.)
      });
      setSuccess("Die moved to Circulation and history recorded.");
      setStatus(2);
    } catch (e) {
      setError("Error moving die to Circulation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            placeholder="Enter Serial Number"
          />
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
            className={`px-4 py-2 rounded font-semibold text-lg w-full ${isOpenDR ? 'bg-blue-700 hover:bg-blue-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            disabled={!isOpenDR}
          >
            Move Repaired Die to Circulation
          </button>
        </div>
        {isCirculation && (
          <div className="mt-4 text-yellow-700 font-semibold text-center">Die is already in Circulation</div>
        )}
        {success && (
          <div className="mt-4 text-green-700 font-semibold text-center">{success}</div>
        )}
      </div>
    </div>
  );
};

export default MoveToCirculationModal;
