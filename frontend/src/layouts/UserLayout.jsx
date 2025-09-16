import React from 'react';
import UserSidebar from '../components/UserSidebar';

const UserLayout = ({ children, username = 'User', role = 'produccion', onLogout }) => {
  return (
    <div className="min-h-screen w-full bg-[#F4F6F8] flex flex-col">
      <header className="bg-[#0C2C65] text-white flex items-center justify-between px-6 py-3 shadow">
        <div className="font-bold text-lg">Die Control System</div>
        <div className="flex items-center gap-4">
          <span>Welcome {username} ({role})</span>
          <button onClick={onLogout} className="bg-red-600 px-3 py-1 rounded text-white">Logout</button>
        </div>
      </header>
      <div className="flex flex-1 w-full">
        <aside className="w-56 min-h-screen bg-[#D3D9E1] shadow-md flex-shrink-0 flex flex-col">
          <UserSidebar role={role} />
        </aside>
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
