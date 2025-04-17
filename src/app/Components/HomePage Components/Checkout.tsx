'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Checkout: React.FC = () => {
  const [pincode, setPincode] = useState('');

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <Image
            src="/earbuds.jpg"
            alt="Truke earbuds"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            truke Crystal Bass earbuds with 13mm Drivers, Made in India, 70Hrs Playtime, 4-Mic ENC Bluetooth (MatteBlack, True Wireless)
          </h1>

          <div className="flex items-center space-x-2 mt-2">
            <span className="text-green-600 font-bold">4.6★</span>
            <span className="text-gray-500 text-sm">(381 Ratings & 227 Reviews)</span>
          </div>

          <div className="mt-4">
            <span className="text-2xl font-bold text-green-700">₹899</span>
            <span className="ml-2 line-through text-gray-400">₹2,999</span>
            <span className="ml-2 text-green-600 font-semibold">70% off</span>
          </div>

          {/* Offers */}
          <div className="mt-4 space-y-1 text-sm text-gray-700">
            <p className="text-green-700 font-medium">Available Offers:</p>
            <ul className="list-disc list-inside">
              <li>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
              <li>10% off up to ₹1,000 on Axis Bank Credit Card EMI Txns of ₹7,490+</li>
              <li>10% off on BOBCARD EMI Txns, up to ₹1,500 on ₹5,000+ orders</li>
              <li>Special Price: Extra 70% off (price inclusive of coupon)</li>
            </ul>
          </div>

          {/* Warranty */}
          <p className="mt-4 text-sm text-gray-600">
            <strong>Warranty:</strong> 1 Year from the date of purchase. Mandatory registration required on truke website.
          </p>

          {/* Pincode + Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <input
              type="text"
              placeholder="Enter Delivery Pincode"
              className="px-4 py-2 border rounded-md w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
              Check
            </button>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
              ADD TO CART
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
              BUY NOW
            </button>
          </div>

          {/* Buy From Options */}
          <div className="mt-8">
            <p className="text-gray-700 font-semibold mb-2">Also available on:</p>
            <div className="flex gap-4">
              <Link
                href="https://www.amazon.in"
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <Image src="/amazon-logo.png" alt="Amazon" width={20} height={20} />
                <span className="text-sm">Amazon</span>
              </Link>
              <Link
                href="https://www.flipkart.com"
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <Image src="/flipkart-logo.png" alt="Flipkart" width={20} height={20} />
                <span className="text-sm">Flipkart</span>
              </Link>
              <Link
                href="https://www.meesho.com"
                target="_blank"
                className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <Image src="/meesho-logo.png" alt="Meesho" width={20} height={20} />
                <span className="text-sm">Meesho</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
