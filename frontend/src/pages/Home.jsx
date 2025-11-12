import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginModal from './Login.jsx';

const HomeHero = ({ onLoginClick }) => {
  return (
    <section className="bg-[#0C2C65] text-white py-16 px-4 text-center">
      <img src="/logo.jpg" alt="MasterNet Logo" className="mx-auto mb-6 h-34 w-50 rounded shadow-lg" />
      <p className="text-lg mb-6 max-w-xl mx-auto">
        Professional solution for die management, damage reporting, and industrial catalog administration.
      </p>
      <button onClick={onLoginClick} className="inline-block bg-[#23B0E8] text-white font-semibold px-6 py-3 rounded shadow hover:bg-[#264893] transition">LogIn</button>
    </section>
  );
};

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
  const navigate = useNavigate();
  const handleLoginSuccess = (role) => {
    const normalizedRole = (role || '').toLowerCase();
    if (normalizedRole === 'admin') {
      navigate('/admin');
    } else if (["gerente", "setupsr", "setup", "production", "produccion"].includes(normalizedRole)) {
      navigate('/user');
    }
  };
  return (
    <div>
      <HomeHero onLoginClick={() => setLoginOpen(true)} />
      <HomeFeatures />
      <HomeFooter />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Home;
