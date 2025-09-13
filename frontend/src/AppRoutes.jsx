import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MaterialCatalog from './pages/MaterialCatalog';
// ...importa otras vistas...

const AppRoutes = () => (
  <Routes>
    {/* ...otras rutas... */}
    <Route path="/admin/material" element={<MaterialCatalog />} />
    {/* ...otras rutas... */}
  </Routes>
);

export default AppRoutes;
