import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginModal = ({ open, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  // Limpiar campos cuando el modal se cierra
  useEffect(() => {
    if (!open) {
      setUsername('');
      setPassword('');
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      const { token, role, username: uname } = res.data;
      if (!token || !role) {
        setError('Login failed');
        return;
      }
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', uname || username);
      setError(null);
      if (onSuccess) onSuccess(role);
      if (onClose) onClose();
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded shadow w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#0C2C65] mb-2">Login</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => {
            setUsername(e.target.value);
            if (error) setError(null);
          }}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            if (error) setError(null);
          }}
          className="border p-2 rounded"
          required
        />
        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-[#0C2C65] text-white py-2 rounded hover:bg-[#23B0E8] font-semibold flex-1" onClick={handleSubmit}>Login</button>
          <button type="button" className="bg-gray-300 text-[#0C2C65] py-2 rounded font-semibold flex-1" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
