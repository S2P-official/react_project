// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Welcome back!</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Admin</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};

export default Header;
