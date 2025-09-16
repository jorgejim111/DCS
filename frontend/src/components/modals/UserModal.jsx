import React, { useEffect, useState } from "react";
import { getActive } from "../../services/roleService";


export default function UserModal({ open, onClose, onSave, user }) {
  const [username, setUsername] = useState(user?.username || "");
  const [roleId, setRoleId] = useState(user?.role_id || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
  const res = await getActive();
  setRoles(res);
    };
    fetchRoles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      alert('Password is required');
      return;
    }
    const payload = { ...user, username, role_id: roleId, password };
    onSave(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white rounded p-6 w-full max-w-md shadow-lg">
        <h3 className="text-lg font-bold mb-4">{user ? "Edit User" : "Add User"}</h3>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Password</label>
          <div className="flex">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border rounded px-2 py-1"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              className="ml-2 px-2 py-1 border rounded"
              onClick={() => setShowPassword(v => !v)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Role</label>
          <select
            value={roleId}
            onChange={e => setRoleId(e.target.value)}
            className="w-full border rounded px-2 py-1"
            required
          >
            <option value="">Select role</option>
            {roles.map(role => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
          <button type="submit" className="px-4 py-1 bg-blue-700 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}
