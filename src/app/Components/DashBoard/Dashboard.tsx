// pages/dashboard/index.tsx
'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Home, Settings, User, Menu, X } from "lucide-react";
import Link from "next/link";
import Header from "./Header";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cards = [
    { title: "Add Products", path: "/dashboard/addproduct" },
    { title: "Stock : 00", path: "/dashboard/stock" },
    { title: "Open Orders", path: "/dashboard/openorders" },
    { title: "Packed Items", path: "/dashboard/deliveredlist" },
    { title: "Shipped Items", path: "/dashboard/deliveredlist" },
    { title: "Out For Delivery List", path: "/dashboard/deliveredlist" },
    { title: "Delivered List", path: "/dashboard/deliveredlist" },
    { title: "Add Shop", path: "/dashboard/addshop" },
    { title: "Shop List", path: "/dashboard/shoplist" },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile Top Bar with Toggle Button */}
      <div className="md:hidden bg-gray-900 text-white flex items-center justify-between p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white p-4 space-y-4 md:block ${
          sidebarOpen ? "block fixed inset-y-0 left-0 w-56 z-50" : "hidden"
        } md:relative md:w-64`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block">Dashboard</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/" className="flex items-center gap-2 hover:text-gray-300">
              <Home size={20} /> Home
            </Link>
          </li>
          <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
            <User size={20} /> Users
          </li>
          <li className="flex items-center gap-2 hover:text-gray-300 cursor-pointer">
            <Settings size={20} /> Settings
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="p-4 sm:p-6 bg-gray-100 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => router.push(card.path)}
                className="bg-white p-6 sm:p-10 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-center font-semibold text-gray-700"
              >
                {card.title}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
