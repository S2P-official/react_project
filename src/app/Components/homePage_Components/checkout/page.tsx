import { Suspense } from 'react';
import CheckoutClient from '../CheckoutClient';


export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading product...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
