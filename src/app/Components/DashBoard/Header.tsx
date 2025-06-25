// components/Header.tsx
// import Image from 'next/image';
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Welcome back!</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Admin</span>

        {/* <Image  
 
        src="https://i.pravatar.cc/40"
          alt="avatar"
                 width={40}
  height={40}
          className="w-10 h-10 rounded-full"></Image> */}
        
      </div>
    </header>
  );
};

export default Header;
