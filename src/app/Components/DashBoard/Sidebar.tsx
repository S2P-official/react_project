// components/Sidebar.tsx
import React from 'react';
import { Home, User, Settings } from 'lucide-react';

const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-64 bg-gray-900 text-white p-4 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <Home size={20} /> Home
        </li>
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <User size={20} /> Users
        </li>
        <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
          <Settings size={20} /> Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
