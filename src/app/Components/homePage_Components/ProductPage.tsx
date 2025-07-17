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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await fetch('http://localhost:8080/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
        console.log(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, []);

const categories = Array.from(
  new Set(products.map((p) => p.category).filter((cat) => cat && cat.trim() !== ''))
);


  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  if (loading) return <div className="text-center mt-18">Loading products...</div>;

  return (
    <div className="bg-gray-100  overflow-hidden ">

  
      {/* Toggle Button for Mobile */}
      <div className="lg:hidden fixed top-20 right-4 z-50">
        <button
          onClick={() => setShowSidebar((prev) => !prev)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm shadow-md"
        >
          {showSidebar ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

     <div className="flex h-full pt-5 px-4 gap-6 overflow-hidden mt-15">
  {/* Sidebar */}
  {showSidebar && (
    <aside
      className="hidden lg:block w-64 p-4 rounded-xl shadow-md sticky top-2 h-[calc(100vh-6rem)] overflow-auto"
      style={{
        background:
          'linear-gradient(109deg, rgba(243,243,243,0.92), rgba(255,255,254,0.66), rgba(250,224,237,0.91))',
      }}
    >
      <h2 className="text-md text-black font-semibold mb-5">Filter by Category</h2>
      <ul className="space-y-2">
        <li>
   <button
  onClick={() => setSelectedCategory(null)}
  className={`w-full text-left px-3 py-2 rounded-xl text-black 
    ${selectedCategory === null ? 'bg-blue-200' : 'hover:bg-gray-100'} 
    focus:outline-none focus-visible:ring-0`}
>
  All Categories
</button>
        </li>

        {categories.map((category) => (
          <li key={category}>
        <button
  onClick={() => setSelectedCategory(category)}
  className={`w-full text-left px-3 py-2 rounded-xl text-black 
    ${selectedCategory === category ? 'bg-blue-600 text-white' : 'hover:bg-gray-400'} 
    focus:outline-none focus-visible:ring-0`}
>
  {category}
</button>
          </li>
        ))}
      </ul>
    </aside>
  )}



        {/* Products Scrollable Area */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-6rem)] pr-1">
          <h1 className="text-lg font-semibold text-center mb-6 text-gray-700">
            Top Deals on Products
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">No products found.</p>
            )}  
          </div>
        </main>
      </div>
    </div>
  );
};
export default ProductsPage;