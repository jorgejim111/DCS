import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Llamada real a la API de login
      const res = await axios.post('/api/login', { username, password });
      const { token, role, username: uname } = res.data;
      if (!token || !role) {
        setError('Login failed');
        return;
      }
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', uname || username);
      if (role === 'admin') {
        navigate('/admin');
      } else if (['gerente', 'setupSr', 'setup', 'production', 'produccion'].includes(role)) {
        navigate('/user');
      } else {
        setError('No access for this role');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96 flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-[#0C2C65] mb-2">Login</h2>
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-[#0C2C65] text-white py-2 rounded hover:bg-[#23B0E8] font-semibold">Login</button>
      </form>
    </div>
  );
};

export default Login;
