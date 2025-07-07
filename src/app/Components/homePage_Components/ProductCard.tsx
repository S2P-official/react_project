'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  isSponsored: boolean;
  rating?: number;
  imagePaths?: string; // comma-separated backend paths like "/uploads/..."
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const handleShopNow = () => {
    if (!product || !product.id || !product.name) {
      console.error('Invalid product data:', product);
      return;
    }

    const query = new URLSearchParams({
      id: product.id.toString(),
      name: product.name,
      description: product.description || '',
      imageUrl: firstImageUrl || '',
      price: (product.price ?? 0).toString(),
      originalPrice: (product.originalPrice ?? 0).toString(),
      rating: (product.rating ?? 4.6).toString(),
    }).toString();

    router.push(`/Components/homePage_Components/checkout?${query}`);
  };

  // 🔥 Get first image from backend imagePaths
  const firstImageUrl =
    product.imagePaths?.split(',')[0]?.startsWith('/uploads/')
      ? `https://fictilecore.com${product.imagePaths.split(',')[0]}`
      : '/default.jpg';

  return (
    <div
      onClick={handleShopNow}
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
    >
      {/* Product Image */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image
          src={firstImageUrl}
          alt={product.name}

           width={300}
  height={300}
          // layout="fill"
          // objectFit="cover"
          unoptimized // ← important if images are from external URL without next.config
        />
      </div>

      {/* Product Details */}
      <h3 className="mt-3 font-semibold text-gray-800 text-md line-clamp-1">{product.name}</h3>

      {/* Price and Button */}
      <div className="flex justify-between mt-3 items-center">
        <span className="text-green-600 font-bold text-md">Just At ₹{product.price}</span>
        <button
          onClick={handleShopNow}
          className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-700 transition hover:shadow-xl hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
