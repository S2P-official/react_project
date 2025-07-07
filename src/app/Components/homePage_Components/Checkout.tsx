'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Checkout: React.FC = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return; // ⛔️ Wait until router is ready

    const rawProductName = router.query.name as string;
    const productName = rawProductName?.replace(/[^a-zA-Z0-9-_]/g, '_') || '';

    const fetchImages = async () => {
      try {
        const res = await fetch(`https://fictilecore.com/api/images/${productName}`);
        const data = await res.json();
        setImageUrls(data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    };

    if (productName) {
      fetchImages();
    }
  }, [router.isReady, router.query.name]);

  return (
    <div className="flex gap-4 justify-center flex-wrap mt-6">
      {imageUrls.length === 0 ? (
        <p className="text-gray-500">No images available.</p>
      ) : (
        imageUrls.map((url, idx) => (
          <div key={idx} className="relative w-40 h-40 rounded-lg overflow-hidden shadow-md">
            <Image
              src={`https://fictilecore.com${url}`}
              alt={`Product image ${idx + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ))
      )}
    </div>
  );
};

export default Checkout;
