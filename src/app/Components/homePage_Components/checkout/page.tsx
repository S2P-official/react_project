'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Checkout: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pincode, setPincode] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);

  const name = searchParams?.get('name') || 'Unnamed Product';
  const description = searchParams?.get('description') || 'No description available.';
  const imageUrl = searchParams?.get('imageUrl') || '/default.jpg';
  const price = searchParams?.get('price') || '0';
  const originalPrice = searchParams?.get('originalPrice') || '0';
  const rating = searchParams?.get('rating') || '4.6';
  const productId = searchParams?.get('id') || '';

  const images = [imageUrl, imageUrl, imageUrl]; // Add more URLs if you have more images

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/Components/homePage_Components/UserLogin');
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productId,
          quantity: 1,
        }),
      });

      if (!res.ok) throw new Error('Failed to add to cart');

      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Could not add product to cart');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white shadow-2xl rounded-2xl p-4 sm:p-6 md:p-8 transition-all hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Images Section */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square relative">
              <Image
                src={images[selectedImage]}
                alt={name}
                fill
                className="object-cover rounded-xl shadow-xl transition-transform duration-300 ease-in-out hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto w-full scrollbar-hide">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`min-w-[60px] h-[60px] border-2 rounded-lg cursor-pointer ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumb ${index}`}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">{name}</h1>

              <div className="flex items-center space-x-2 mt-2">
                <span className="text-green-600 font-bold">{rating}★</span>
                <span className="text-gray-500 text-sm">(381 Ratings & 227 Reviews)</span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-green-700">₹{price}</span>
                <span className="line-through text-gray-400">₹{originalPrice}</span>
                <span className="text-green-600 font-semibold">70% off</span>
              </div>

              <p className="mt-4 text-sm text-gray-700">{description}</p>

              {/* Offers */}
              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p className="text-green-700 font-medium">Available Offers:</p>
                <ul className="list-disc list-inside">
                  <li>5% Cashback on Axis Bank Credit Card</li>
                  <li>10% off up to ₹1,000 on EMI</li>
                  <li>Extra 70% off (inclusive of coupon)</li>
                </ul>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                <strong>Warranty:</strong> 1 Year from date of purchase.
              </p>

              {/* Pincode */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  className="px-4 py-2 border rounded-md w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
                <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                  Check
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-orange-500 text-white w-full sm:w-auto px-6 py-2 rounded-md hover:bg-orange-600 transition"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={() => alert('Redirecting to payment (not implemented)')}
                  className="bg-red-600 text-white w-full sm:w-auto px-6 py-2 rounded-md hover:bg-red-700 transition"
                >
                  BUY NOW
                </button>
              </div>
            </div>

            {/* Buy from Other Platforms */}
            <div className="mt-8">
              <p className="text-gray-700 font-semibold mb-2">Also available on:</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { href: 'https://www.amazon.in', src: '/amazon-logo.png', label: 'Amazon' },
                  { href: 'https://www.flipkart.com', src: '/flipkart-logo.png', label: 'Flipkart' },
                  { href: 'https://www.meesho.com', src: '/meesho-logo.png', label: 'Meesho' },
                ].map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100 transition"
                  >
                    <Image src={link.src} alt={link.label} width={20} height={20} />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
