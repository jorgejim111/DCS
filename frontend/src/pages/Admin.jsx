import React from 'react';
import AdminLayout from './AdminLayout';
import { Routes, Route } from 'react-router-dom';
import InchCatalog from './InchCatalog';
import PartCatalog from './PartCatalog';
import DescriptionCatalog from './DescriptionCatalog';
import StatusCatalog from './StatusCatalog';
import PositionCatalog from './PositionCatalog';
import LineCatalog from './LineCatalog';
import ProductCatalog from './ProductCatalog';
import DieDescriptionCatalog from './DieDescriptionCatalog';
import DescriptionDrCatalog from './DescriptionDrCatalog';
import ExplanationCatalog from './ExplanationCatalog';
import MaterialCatalog from './MaterialCatalog';
import RoleCatalog from './RoleCatalog';

import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };
  return (
    <AdminLayout username="Admin" onLogout={handleLogout}>
      <Routes>
        <Route index element={
          <>
            <h1 className="text-2xl font-bold text-[#0C2C65] mb-4">Admin Dashboard</h1>
            <p className="text-[#264893]">Welcome to the administration panel. Select a section from the sidebar to begin.</p>
          </>
        } />
        <Route path="inch" element={<InchCatalog />} />
        <Route path="part" element={<PartCatalog />} />
        <Route path="description" element={<DescriptionCatalog />} />
        <Route path="product" element={<ProductCatalog />} />
        <Route path="die-description" element={<DieDescriptionCatalog />} />
        <Route path="status" element={<StatusCatalog />} />
        <Route path="position" element={<PositionCatalog />} />
        <Route path="line" element={<LineCatalog />} />
        <Route path="description-dr" element={<DescriptionDrCatalog />} />
        <Route path="explanation" element={<ExplanationCatalog />} />
        <Route path="role" element={<RoleCatalog />} />
        <Route path="material" element={<MaterialCatalog />} />
      </Routes>
    </AdminLayout>
  );
};

export default Admin;
