'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cartCount, setCartCount] = useState<number>(0);
  const router = useRouter();

  // ✅ Load cart count from localStorage
  useEffect(() => {
    const loadCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const totalQuantity = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(totalQuantity);
      } catch (error) {
        console.error('Failed to parse cart:', error);
        setCartCount(0);
      }
    };

    loadCartCount();

    // ✅ Recheck on storage change (multi-tab support)
    window.addEventListener('storage', loadCartCount);

    // ✅ Optional: Recheck every 3s if cart can change outside this component
    const interval = setInterval(loadCartCount, 3000);

    return () => {
      window.removeEventListener('storage', loadCartCount);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="shadow-md fixed top-0 left-0 w-full z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo_final1.png"
              alt="Fictile Core Logo"
              width={65}
              height={45}
              className="rounded-2xl border"
            />
            <span className="hidden sm:block text-2xl font-bold text-blue-600 font-serif">
              Fictile Core
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link href="/homepages/services" className="text-gray-700 hover:text-blue-600">Services</Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">DashBoard</Link>

            {/* Cart Icon with Count */}
            <div
              className="relative cursor-pointer"
              onClick={() => router.push('/homepages/cart')}
            >
              <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={() => router.push('/homepages/login')}
              className="text-gray-700 hover:text-blue-600"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center text-gray-500">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-3">
          <Link href="/" className="block text-gray-700">Home</Link>
          <Link href="/homepages/services" className="block text-gray-700">Services</Link>
          <Link href="/dashboard" className="block text-gray-700">DashBoard</Link>

          <div className="flex items-center justify-between">
            <div
              onClick={() => router.push('/homepages/cart')}
              className="relative cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              onClick={() => router.push('/homepages/login')}
              className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
