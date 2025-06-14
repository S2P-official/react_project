// pages/dashboard/index.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation"; // ✅ for programmatic navigation
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard: React.FC = () => {
  const router = useRouter();

  // List of cards and where they should navigate
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">Overview</h2>
         {/* <button onClick={() => router.push(`/dashboard/login`)}>Login</button> */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                onClick={() => router.push(card.path)}
                className="bg-white p-10 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer text-center font-semibold text-gray-700"
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
