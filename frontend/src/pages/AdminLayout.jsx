import React from 'react';
import AdminNav from '../components/AdminNav';
import Sidebar from '../components/Sidebar';

const AdminLayout = ({ children, username = 'Admin', onLogout }) => {
  return (
  <div className="min-h-screen w-[calc(104vw-100px)] bg-[#F4F6F8] flex flex-col p-0 m-0">
      <AdminNav username={username} onLogout={onLogout} />
  <div className="flex flex-1 w-full">
  <aside className="w-64 min-h-screen bg-[#D3D9E1] shadow-md flex-shrink-0 flex flex-col">
          <Sidebar />
        </aside>
  <main className="flex-1 p-2 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
