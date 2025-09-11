import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginModal = ({ open, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await login(username, password);
      console.log('Login response:', res); // Imprime la respuesta en consola
      localStorage.setItem('token', res.token);
      if (res.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      onClose();
    } catch (err) {
      setError('Invalid credentials or server error');
      console.log('Login error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-[#0C2C65] mb-4 text-center">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23B0E8]" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23B0E8]" />
          <button type="submit" className="bg-[#23B0E8] text-white font-semibold px-4 py-2 rounded hover:bg-[#264893] transition">Login</button>
        </form>
        {error && <div className="mt-2 text-red-500 text-center">{error}</div>}
        <button onClick={onClose} className="mt-4 text-[#264893] hover:underline w-full text-center">Cancel</button>
      </div>
    </div>
  );
};

const HomeHero = ({ onLoginClick }) => (
  <section className="bg-[#0C2C65] text-white py-16 px-4 text-center">
    <img src="/logo.jpg" alt="MasterNet Logo" className="mx-auto mb-6 h-34 w-50 rounded shadow-lg" />
    <h1 className="text-4xl font-bold mb-4">Welcome to Die Control System</h1>
    <p className="text-lg mb-6 max-w-xl mx-auto">
      Professional solution for die management, damage reporting, and industrial catalog administration.
    </p>
    <button onClick={onLoginClick} className="inline-block bg-[#23B0E8] text-white font-semibold px-6 py-3 rounded shadow hover:bg-[#264893] transition">LogIn</button>
  </section>
);

const HomeFeatures = () => (
  <section className="py-12 px-4 bg-[#F4F6F8]">
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold text-[#0C2C65] mb-2">Dynamic Catalogs</h2>
        <p className="text-[#264893]">Manage all key catalogs of your operation from a single place.</p>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold text-[#0C2C65] mb-2">Reports & Tracking</h2>
        <p className="text-[#264893]">Generate and review damage reports, history, and die status.</p>
      </div>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold text-[#0C2C65] mb-2">Security & Roles</h2>
        <p className="text-[#264893]">Protected and personalized access according to each user's role.</p>
      </div>
    </div>
  </section>
);

const HomeFooter = () => (
  <footer className="bg-[#0C2C65] text-white py-6 text-center">
    <p className="text-sm">&copy; 2025 MasterNet - Die Control System. All rights reserved.</p>
  </footer>
);

const Home = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  return (
    <div>
      <HomeHero onLoginClick={() => setLoginOpen(true)} />
      <HomeFeatures />
      <HomeFooter />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
};

export default Home;
