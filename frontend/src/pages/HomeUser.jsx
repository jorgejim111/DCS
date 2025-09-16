import React from 'react';
import UserLayout from '../layouts/UserLayout';

const HomeUser = ({ username = 'User', role = 'produccion', onLogout }) => {
  return (
    <UserLayout username={username} role={role} onLogout={onLogout}>
      <h1 className="text-2xl font-bold text-[#0C2C65] mb-4">Welcome, {username}!</h1>
      <p className="text-[#264893] mb-6">This is your dashboard. Use the sidebar to access your main actions.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-4xl mb-2">🔢</span>
          <span className="font-semibold">Create Serial#</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-4xl mb-2">🔄</span>
          <span className="font-semibold">Register Movement</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex flex-col items-center">
          <span className="text-4xl mb-2">📜</span>
          <span className="font-semibold">My History</span>
        </div>
      </div>
    </UserLayout>
  );
};

export default HomeUser;
