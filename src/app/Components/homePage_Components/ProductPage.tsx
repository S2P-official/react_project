'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  originalPrice: number;
  category: string;
  isSponsored: boolean;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetching product data inside useEffect (this ensures it's only on the client)
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch('http://localhost:8081/getAllProducts');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

  // Show loading state before fetching
  if (loading) return <div className="text-center mt-10">Loading products...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-24 px-4">
      <h1 className="text-lg font-semibold text-center mb-6 text-gray-700">
        Top Deals on Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
