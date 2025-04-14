// app/products/page.tsx

'use client';

import React from 'react';
import ProductCard from './ProductCard';


const products = Array.from({ length: 20 }, (_, index) => ({
  image: `/products/sample${(index % 5) + 1}.jpg`,
  name: `Truke Crystal Bass Earbuds Model ${index + 1}`,
  price: 899,
  originalPrice: 2999,
  rating: 4.5 + (index % 5) * 0.1,
}));

const ProductsPage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      
      <div className="pt-24 pb-10 px-4">
        <h1 className="text-2xl font-semibold text-center mb-6">Top Deals on Earbuds</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
