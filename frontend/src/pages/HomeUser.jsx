

import React from 'react';
import { HiDocumentSearch, HiOutlineClipboardList } from 'react-icons/hi';
import { MdOutlineInventory } from 'react-icons/md';


const HomeUser = ({ username = 'User', role = 'produccion', onLogout }) => {
  return (
    <>
      <h1 className="text-2xl font-bold text-[#0C2C65] mb-4">Welcome, {username}!</h1>
      <p className="text-[#264893] mb-6">This is your dashboard. Use the sidebar to access your main actions.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Die History Button - Left, light gray background, with icon */}
        <button
          className="bg-[#E4E7ED] hover:bg-[#D3D9E1] text-[#264893] rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-[#D3D9E1] focus:outline-none focus:ring-2 focus:ring-[#23B0E8]"
          style={{ minHeight: '170px' }}
        >
          <HiOutlineClipboardList className="text-5xl mb-2" />
          <span className="font-bold text-lg">Die History</span>
        </button>
        {/* Damage Report Button - Red, prominent, with icon */}
        <button
          className="bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          style={{ minHeight: '170px' }}
        >
          <HiDocumentSearch className="text-5xl mb-2" />
          <span className="font-bold text-lg">Damage Report</span>
        </button>
        {/* Inventory Button - Right, blue background, with icon */}
        <button
          className="bg-[#264893] hover:bg-[#0C2C65] text-white rounded-xl shadow-lg flex flex-col items-center justify-center p-6 transition-all duration-200 border-4 border-[#0C2C65] focus:outline-none focus:ring-2 focus:ring-[#23B0E8]"
          style={{ minHeight: '170px' }}
        >
          <MdOutlineInventory className="text-5xl mb-2" />
          <span className="font-bold text-lg">Inventory</span>
        </button>
      </div>
    </>
  );
};

export default HomeUser;
