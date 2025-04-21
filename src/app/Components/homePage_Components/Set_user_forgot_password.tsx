'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import Link from 'next/link';

export default function set_user_forgot_password() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Hook to backend/email service
    console.log(`Reset link sent to ${email}`);
    alert(`If an account with ${email} exists, a reset link has been sent.`);
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Forgot Password</h2>

        <form onSubmit={handleForgotPassword} className="space-y-5">
          {/* Email Input */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Mail className="text-gray-400 mr-2" size={20} />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Remember your password?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
