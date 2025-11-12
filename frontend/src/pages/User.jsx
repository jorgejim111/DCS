import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomeUser from './HomeUser';
// Aquí puedes importar más páginas de usuario
import UserLayout from '../layouts/UserLayout';

const User = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    // console.log('User.jsx localStorage:', { token, role }); // DEBUG: eliminar en producción
    if (!token || !role) {
      navigate('/');
    }
  }, [navigate]);
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    navigate('/');
  };
  const username = localStorage.getItem('username') || 'User';
  const role = localStorage.getItem('role') || 'produccion';
  return (
    <UserLayout username={username} role={role} onLogout={handleLogout}>
      <Routes>
        <Route index element={<HomeUser username={username} role={role} onLogout={handleLogout} />} />
        {/* Agrega aquí más rutas de usuario */}
      </Routes>
    </UserLayout>
  );
};

export default User;
