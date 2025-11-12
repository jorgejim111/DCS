import React, { useEffect, useState } from "react";
import { getActivePositions } from "../../services/positionService";
import userService from "../../services/userService";

export default function WorkerModal({ open, onClose, onSave, worker }) {
  const [name, setName] = useState(worker?.name || "");
  const [positionId, setPositionId] = useState(worker?.position_id || "");
  const [userId, setUserId] = useState(worker?.user_id || "");
  const [isActive, setIsActive] = useState(worker?.is_active ?? true);
  const [positions, setPositions] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchDropdowns = async () => {
  setPositions(await getActivePositions());
  setUsers(await userService.getAll());
    };
    fetchDropdowns();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...worker,
      name,
      position_id: positionId,
      user_id: userId,
      is_active: isActive
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4">{worker ? "Edit Worker" : "Add Worker"}</h3>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Position</label>
          <select
            value={positionId}
            onChange={e => setPositionId(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select position</option>
            {positions.map(pos => (
              <option key={pos.id} value={pos.id}>{pos.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">User</label>
          <select
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>{u.username}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isActive}
            onChange={e => setIsActive(e.target.checked)}
            id="isActive"
            className="mr-2"
          />
          <label htmlFor="isActive" className="font-semibold">Active</label>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
