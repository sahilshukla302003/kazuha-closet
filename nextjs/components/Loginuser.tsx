'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { userLogin } from '@/utils/api/userUtils';
import { Eye, EyeOff } from 'lucide-react'; // npm install lucide-react

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert('Please fill in both email and password');
      return;
    }

    try {
      const res = await userLogin(form);
      if (res && res.id) {
        localStorage.setItem('userid', res.id);
        router.push('/');
      } else {
        alert('Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/tanjiro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form Content */}
      <div className="relative z-10 bg-black/30 backdrop-blur-md border border-transparent p-8 rounded-2xl 
        shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] 
        hover:border-white transition-all duration-500 ease-in-out transform hover:scale-105 w-[90%] max-w-md text-white"
      >
        <h2 className="text-center text-3xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
              required
            />
          </div>

          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 pr-12 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-gray-300 hover:text-yellow-400"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-white">
          Not registered?{' '}
          <Link href="/register" className="text-yellow-400 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
