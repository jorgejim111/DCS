import React from 'react';
import AdminLayout from './AdminLayout';
import { Routes, Route } from 'react-router-dom';
import InchCatalog from './InchCatalog';

const Admin = () => {
  return (
    <AdminLayout username="Admin">
      <Routes>
        <Route index element={
          <>
            <h1 className="text-2xl font-bold text-[#0C2C65] mb-4">Admin Dashboard</h1>
            <p className="text-[#264893]">Welcome to the administration panel. Select a section from the sidebar to begin.</p>
          </>
        } />
        <Route path="inch" element={<InchCatalog />} />
        {/* Aquí puedes agregar más rutas para otros catálogos */}
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
