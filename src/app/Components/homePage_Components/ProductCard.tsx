import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    originalPrice: number;
    category: string;
    isSponsored: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="max-w-sm rounded-2xl shadow-md p-4 border border-gray-200">
      <p className="text-sm font-semibold text-gray-700 mb-1">{product.category}</p>
      {product.isSponsored && (
        <p className="text-xs text-gray-500 mb-4">Sponsored</p>
      )}
      <div className="flex justify-center mb-4">
        <Image
          src={"/image.png"} // Dynamic image URL
          alt={"product.name"}
          width={150}
          height={150}
          className="rounded"
        />
      </div>
      <h3 className="text-xs text-gray-500 mb-4">{product.description}</h3>
      <div className="mb-2">
        <span className="text-lg font-bold text-green-600">
          ₹{product.price}
        </span>
        <span className="text-sm line-through text-gray-500">
          ₹{product.originalPrice}
        </span>
      </div>
      <a
        href="#"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
      >
        Shop now
      </a>
    </div>
  );
};

export default ProductCard;
