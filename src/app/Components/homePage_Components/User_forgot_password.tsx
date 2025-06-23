'use client';
import { useState } from 'react';
import { Mail } from 'lucide-react';
import Navbar from './Navbar';

export default function User_forgot_password() {
  const [email, setEmail] = useState('');

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger password reset logic
    alert(`Reset link sent to ${email}`);
  };

  return (
    <>
    
      <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-8 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Forgot Password</h2>
        <form onSubmit={handleReset} className="space-y-5">
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
          <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded-xl hover:bg-yellow-600">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
        </>
  );
}
