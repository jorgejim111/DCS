import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MaterialCatalog from './pages/MaterialCatalog';
import DamageReport from './pages/DamageReport';
// ...importa otras vistas...

const AppRoutes = () => (
  <Routes>
    {/* ...otras rutas... */}
    <Route path="/admin/material" element={<MaterialCatalog />} />
    <Route path="/damage-report" element={<DamageReport />} />
    {/* ...otras rutas... */}
  </Routes>
);

export default AppRoutes;
