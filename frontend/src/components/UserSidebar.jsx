import React from 'react';
import { Link } from 'react-router-dom';

const menuByRole = {
  produccion: [
    { name: 'Home', path: '/user' },
    { name: 'Create Serial#', path: '/user/create-serial' },
    { name: 'Register Movement', path: '/user/register-movement' },
    { name: 'My History', path: '/user/my-history' },
  ],
  setup: [
    { name: 'Home', path: '/user' },
    { name: 'Register Movement', path: '/user/register-movement' },
    { name: 'My History', path: '/user/my-history' },
  ],
  admin: [
    { name: 'Home', path: '/user' },
    { name: 'Create Serial#', path: '/user/create-serial' },
    { name: 'Register Movement', path: '/user/register-movement' },
    { name: 'My History', path: '/user/my-history' },
    { name: 'Admin Panel', path: '/admin' },
  ],
  // Puedes agregar más roles y menús aquí
};

const UserSidebar = ({ role }) => {
  const menu = menuByRole[role] || menuByRole['produccion'];
  return (
    <nav className="flex flex-col gap-2 p-4">
      {menu.map(item => (
        <Link
          key={item.name}
          to={item.path}
          className="text-[#264893] hover:text-[#23B0E8] py-2 px-3 rounded font-medium"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default UserSidebar;
