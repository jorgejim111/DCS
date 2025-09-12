import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    label: 'Catalogs',
    subItems: [
      { name: 'Line', path: '/admin/line' },
      { name: 'Product', path: '/admin/product' },
  { name: 'Die Description', path: '/admin/die-description' },
      { name: 'Status', path: '/admin/status' },
      { name: 'Description DR', path: '/admin/description-dr' },
      { name: 'Explanation', path: '/admin/explanation' },
      
    ]
  },
  {
    label: 'Die Descriptions',
    subItems: [
      { name: 'Die Description', path: '/admin/die-description' },
  { name: 'Inch', path: '/admin/inch' },
  { name: 'Part', path: '/admin/part' },
  { name: 'Description', path: '/admin/description' },
    ]
  },
  { label: 'Serial #', subItems: [] },
  { label: 'Damage Report', subItems: [] },
  {
    label: 'Users',
    subItems: [
      { name: 'User', path: '/admin/user' },
      { name: 'Role', path: '/admin/role' }
    ]
  },
  {
    label: 'Workers',
    subItems: [
      { name: 'Worker', path: '/admin/worker' },
      { name: 'Position', path: '/admin/position' }
    ]
  },
];

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="h-full w-full bg-[#D3D9E1] flex flex-col gap-4 justify-start">
      {menuItems.map((item, idx) => (
        <div key={item.label} className="w-full">
          <button
            className="w-full text-left font-semibold text-[#0C2C65] py-2 px-3 rounded hover:bg-[#F4F6F8] focus:outline-none"
            onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
          >
            {item.label}
          </button>
          {item.subItems.length > 0 && openMenu === idx && (
            <div className="ml-4 mt-1 flex flex-col gap-1">
              {item.subItems.map(sub => (
                <Link
                  key={sub.name}
                  to={sub.path}
                  className="text-[#264893] hover:text-[#23B0E8] py-1 px-2 rounded"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
