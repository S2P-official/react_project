import { Suspense } from 'react';
import UserLogin from '../UserLogin';


export default function page() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-600">Loading product...</div>}>
    <UserLogin/>
    </Suspense>
  );
}
