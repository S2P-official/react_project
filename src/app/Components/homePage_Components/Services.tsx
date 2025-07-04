// pages/services.tsx
'use client';

import React from 'react';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Our Services
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manufacturing Toys */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Manufacturing Toys
            </h2>
            <p className="text-gray-600">
              We specialize in designing and manufacturing high-quality car toys and educational toys. Our focus is on creativity, safety, and durability to ensure joyful learning and play experiences.
            </p>
          </div>

          {/* Software Service */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Seamless Software Services for Startups
            </h2>
            <p className="text-gray-600">
              Empowering startups with reliable software solutions — from web development to product strategy. We help transform ideas into scalable businesses with cutting-edge technology and support.
            </p>
          </div>

          {/* Encouraging Entrepreneurs */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 md:col-span-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Encouraging Entrepreneurs
            </h2>
            <p className="text-gray-600">
              We actively support and mentor aspiring entrepreneurs. From idea validation to go-to-market strategies, our goal is to nurture innovation and foster economic growth through entrepreneurship.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Services;
