import React from 'react';

const AdminNav = ({ username = 'Admin', onLogout }) => {
  return (
  <nav className="w-full flex items-center justify-between bg-[#0C2C65] text-[#FFFFFF] px-6 py-5 shadow">
      {/* Izquierda: Logo + Título */}
  <div className="flex items-center gap-3 min-w-0">
  <img src="/logo.jpg" alt="Logo" className="h-20 w-50 rounded mr-4" />
        <span className="font-bold text-lg tracking-wide">Die Control System</span>
      </div>
      {/* Derecha: Links */}
  <div className="flex items-center gap-4 flex-wrap min-w-0">
  <a href="/profile" className="hover:text-[#23B0E8]">Welcome {username}</a>
  <a href="/home" className="hover:text-[#23B0E8]">Home</a>
  <button onClick={onLogout} className="bg-[#264893] px-3 py-1 rounded hover:bg-[#23B0E8] font-semibold text-[#FFFFFF]">Logout</button>
      </div>
    </nav>
  );
};

export default AdminNav;
