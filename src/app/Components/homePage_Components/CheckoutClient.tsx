'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Fragment } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  mrp: number;
  quantity: number;
  ageGroup: string;

  facebook?: string;
  amazon?: string;
  meesho?: string;
  youtube?: string;

  tax?: string;

  aboutItem1?: string;
  aboutItem2?: string;
  aboutItem3?: string;
  aboutItem4?: string;
  aboutItem5?: string;

  brand?: string;
  toyFigureType?: string;
  character?: string;
  modelName?: string;
  modelNumber?: string;
  manufacturer?: string;
  theme?: string;
  colour?: string;
  occasion?: string;
  material?: string;
  additionalFeatures?: string;
  areBatteriesRequired?: string;

  rating?: number;
  originalPrice?: number; // kept for backward compatibility
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams?.get('id');
  const numericProductId = productId ? Number(productId) : null;

  /* ---------------- state ---------------- */
  const [pincode, setPincode] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);

  /* ---------------- fetch product ---------------- */
  useEffect(() => {
    if (!numericProductId) return;

    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/checkout/${numericProductId}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setProduct(await res.json());
      } catch (e) {
        console.error('❌ Failed to fetch product:', e);
      }
    })();
  }, [numericProductId]);

  /* ---------------- fetch images ---------------- */
  useEffect(() => {
    if (!product?.name) return;
    const safeName = product.name.replace(/[^a-zA-Z0-9-_]/g, '_');

    (async () => {
      try {
        const res = await fetch(`http://localhost:8080/uploads/${safeName}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setImageUrls(await res.json());
      } catch (e) {
        console.error('❌ Failed to fetch images:', e);
      }
    })();
  }, [product?.name]);

  /* ---------------- cart logic ---------------- */
  const handleAddToCart = () => {
    if (!numericProductId || !product) {
      alert('Product info missing.');
      return;
    }
    const existing = localStorage.getItem('cart');
    const cart: CartItem[] = existing ? JSON.parse(existing) : [];

    const idx = cart.findIndex(c => c.id === numericProductId);
    if (idx !== -1) cart[idx].quantity += 1;
    else
      cart.push({
        id: numericProductId,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: imageUrls[0] ? `http://localhost:8080${imageUrls[0]}` : '/placeholder.jpg',
      });

    localStorage.setItem('cart', JSON.stringify(cart));
    alert('✅ Product added to cart!');
  };

  /* ---------------- helpers ---------------- */
  const aboutItems = [
    product?.aboutItem1,
    product?.aboutItem2,
    product?.aboutItem3,
    product?.aboutItem4,
    product?.aboutItem5,
  ].filter(Boolean) as string[];

  const specPairs: Record<string, string | undefined> = {
    Brand: product?.brand,
    'Toy‑Figure Type': product?.toyFigureType,
    Character: product?.character,
    'Model Name': product?.modelName,
    'Model Number': product?.modelNumber,
    Manufacturer: product?.manufacturer,
    Theme: product?.theme,
    Colour: product?.colour,
    Occasion: product?.occasion,
    Material: product?.material,
    'Additional Features': product?.additionalFeatures,
    'Batteries Required': product?.areBatteriesRequired,
    'Age Group': product?.ageGroup,
    Category: product?.category,
    Tax: product?.tax,
  };

  /* ---------------- rendering ---------------- */
  if (!product)
    return <div className="text-center p-10 text-gray-500">Loading product...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* ------------- Images ------------- */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-md">
              {imageUrls.length ? (
                <Image
                  src={`http://localhost:8080${imageUrls[selectedImage]}`}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-xl shadow-lg"
                  unoptimized
                />
              ) : (
                <p className="text-gray-400 text-center">Loading image…</p>
              )}
            </div>

            {imageUrls.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto max-w-md">
                {imageUrls.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border-2 rounded-lg ${
                      selectedImage === i ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={`http://localhost:8080${img}`}
                      alt={`thumb-${i}`}
                      width={60}
                      height={60}
                      className="rounded-md object-cover"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ------------- Details ------------- */}
          <div className="flex flex-col gap-6">
            {/* title & price */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-green-600 font-bold">{product.rating ?? 4.6}★</span>
                <span className="text-gray-500 text-sm">(381 Ratings & 227 Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4 mt-4">
                <span className="text-3xl font-bold text-green-700">₹{product.price}</span>
                {product.mrp ? (
                  <>
                    <span className="line-through text-gray-400">₹{product.mrp}</span>
                    <span className="text-green-600 font-semibold">
                      {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% off
                    </span>
                  </>
                ) : null}
              </div>
            </div>

            {/* description */}
            <p className="text-gray-700">{product.description}</p>

            {/* about items */}
            {aboutItems.length > 0 && (
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                {aboutItems.map((it, idx) => (
                  <li key={idx}>{it}</li>
                ))}
              </ul>
            )}

            {/* specifications */}
            <details className="border p-4 rounded-md bg-gray-50">
              <summary className="cursor-pointer font-medium">Specifications</summary>
              <table className="w-full text-sm mt-3">
                <tbody>
                  {Object.entries(specPairs)
                    .filter(([, v]) => v)
                    .map(([k, v]) => (
                      <tr key={k} className="border-b last:border-none">
                        <td className="py-1 pr-4 text-gray-600">{k}</td>
                        <td className="py-1 font-medium text-gray-800">{v}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </details>

            {/* pincode check */}
            <div className="flex gap-3">
              <input
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                placeholder="Enter Pincode"
                className="flex-1 border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Check
              </button>
            </div>

            {/* buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 w-full sm:w-auto"
              >
                ADD TO CART
              </button>
              <button
                onClick={() => router.push('/homepages/cart')}
                className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 w-full sm:w-auto"
              >
                BUY NOW
              </button>
            </div>

            {/* external links */}
            <div>
              <p className="text-gray-700 font-semibold mb-2">Also available on:</p>
              <div className="flex flex-wrap gap-4">
                {[
                  { href: product.amazon, src: '/amazon-logo.png', label: 'Amazon' },
                  { href: product.meesho, src: '/meesho-logo.png', label: 'Meesho' },
                  { href: product.facebook, src: '/facebook-logo.png', label: 'Facebook' },
                  { href: product.youtube, src: '/youtube-logo.png', label: 'YouTube' },
                ]
                  .filter(l => l.href)
                  .map(link => (
                    <Link
                      key={link.label}
                      href={link.href!}
                      target="_blank"
                      className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100"
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
}
