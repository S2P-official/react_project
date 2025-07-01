"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import router from "next/router";
import Image from 'next/image'


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for the search query

  // Handle search change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

             <Image
      src="/logo_final1.png"
      alt="Landscape picture"
      width={65}
      height={45}
      className="rounded-2xl border-solid"
    />
         
          <div  className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-blue-600 font-serif "
            >

            </Link>
          </div>

          {/* Center - Search */}
          {/* <div className="hidden md:flex flex-1 justify-center mx-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          {/* Right - Menu Items */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </Link>
            <Link
              href="/services"
              className="text-gray-700 hover:text-blue-600"
            >
              Services
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600"
            >
              DashBoard
            </Link>

            <div className="relative cursor-pointer">
              <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-blue-600" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                10
              </span>
            </div>

            <Link
              href="/homepages/login"
              className="text-gray-700 hover:text-blue-600"
              onClick={() => router.push("/homepages/login")}
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center text-gray-500  ">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 mx-3 py-1 text-gray-500 border border-gray-500 rounded-[8px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? (
                <X className="w-8 h-8" />
              ) : (
                <Menu className="w-8 h-8" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          <Link href="/" className="block text-gray-700">
            Home
          </Link>
          <Link href="/services" className="block text-gray-700">
            Services
          </Link>
          <Link href="/dashboard" className="block text-gray-700">
            DashBoard
          </Link>
          {/* <Link href="/dashboard/login" className="block text-gray-700">
            Login
          </Link> */}

          <div className="flex items-center justify-between">
            <ShoppingCart className="w-5 h-5 text-gray-700" />

             <Link href="/dashboard/login"  className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700">
            Login
          </Link>
            {/* <button
              className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700"
              onClick={() => router.push("./dashboard/login")}
            >
              Login
            </button> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
