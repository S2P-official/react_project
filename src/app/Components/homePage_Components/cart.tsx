'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false); // ✅ Prevent hydration mismatch

  useEffect(() => {
    setIsMounted(true);
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (err) {
        console.error('Failed to parse cart:', err);
        setCartItems([]);
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isMounted]);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleProceedToBuy = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }
    router.push('/homepages/ordernow');
  };

  if (!isMounted) return null; // ✅ Avoid SSR mismatch

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-bold">Total: ₹{total}</h3>
            <button
              onClick={handleProceedToBuy}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
            >
              Proceed to Buy
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
