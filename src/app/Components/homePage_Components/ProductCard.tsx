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

  // 🔼 Move this above the handleShopNow!
const safeProductName = product.name?.replace(/[^a-zA-Z0-9-_]/g, '_') || 'default';
const firstImageFile = product.imagePaths?.split(',')[0]?.trim().split('/').pop() || '';
const firstImageUrl = firstImageFile
  ? `http://localhost:8080/uploads/${safeProductName}/${firstImageFile}`
  : '/default.jpg';


  const handleShopNow = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation(); // prevent double trigger
    if (!product?.id || !product?.name) {
      console.error('Invalid product data:', product);
      return;
    }

    const query = new URLSearchParams({
      id: product.id.toString(),
      name: encodeURIComponent(product.name),
      description: encodeURIComponent(product.description || ''),
      imageUrl: encodeURIComponent(firstImageUrl),
      price: (product.price ?? 0).toString(),
      originalPrice: (product.originalPrice ?? 0).toString(),
      rating: (product.rating ?? 4.6).toString(),
    }).toString();

    router.push(`/homepages/checkout?${query}`);
  };

  return (
    <div
      onClick={handleShopNow}
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full h-40 rounded-xl overflow-hidden">
        <Image
          src={firstImageUrl}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover rounded-xl"
          unoptimized
        />
      </div>

      {/* Product Name */}
      <h3 className="mt-3 font-semibold text-gray-800 text-md line-clamp-1">{product.name}</h3>

      {/* Price and Button */}
      <div className="flex justify-between items-center mt-3">
        <span className="text-green-600 font-bold text-md">Just At ₹{product.price}</span>
        <button
          onClick={handleShopNow}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
