'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, Phone } from 'lucide-react';
import Navbar from './Navbar';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // TODO: Replace with backend integration
    console.log({ name, phone, email, password });
    router.push('/login');
  };

  return (
    <>
      <Navbar />
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white mx-8 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleRegister} className="space-y-5">

          {/* Full Name */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <User className="text-gray-400 mr-2" size={20} />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Phone Number */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Phone className="text-gray-400 mr-2" size={20} />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Mail className="text-gray-400 mr-2" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Lock className="text-gray-400 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center border rounded-xl px-3 py-2">
            <Lock className="text-gray-400 mr-2" size={20} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link href="/homepages/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
    </>
  );
}
