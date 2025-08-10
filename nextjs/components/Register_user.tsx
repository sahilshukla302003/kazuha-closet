'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/utils/api/userUtils';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const res = await userRegister(form);

      if (res && res.token) {
        localStorage.setItem('token', res.token);
        toast.success('Registration successful!');
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        toast.error('Registration failed. Please check your details.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong during registration!');
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
      <div className="relative z-10 bg-black/30 backdrop-blur-md border border-transparent 
        rounded-2xl shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:border-white 
        transition-all duration-500 ease-in-out transform hover:scale-105
        w-[95%] sm:w-[90%] md:max-w-md
        px-3 py-4 sm:px-6 sm:py-8 md:px-8 md:py-10 text-white">

        <h2 className="text-center text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Register</h2>

        {/* First Name */}
        <div className="mb-3 sm:mb-4">
          <label htmlFor="first_name" className="block text-xs sm:text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            id="first_name"
            onChange={handleChange}
            value={form.first_name}
            placeholder="Enter your first name"
            className="w-full p-2 sm:p-3 text-sm rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Last Name */}
        <div className="mb-3 sm:mb-4">
          <label htmlFor="last_name" className="block text-xs sm:text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            id="last_name"
            onChange={handleChange}
            value={form.last_name}
            placeholder="Enter your last name"
            className="w-full p-2 sm:p-3 text-sm rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Email */}
        <div className="mb-3 sm:mb-4">
          <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Enter your email"
            className="w-full p-2 sm:p-3 text-sm rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4 sm:mb-6">
          <label htmlFor="phone" className="block text-xs sm:text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            onChange={handleChange}
            value={form.phone}
            placeholder="Enter your phone number"
            className="w-full p-2 sm:p-3 text-sm rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Password */}
        <div className="mb-4 sm:mb-6 relative">
          <label htmlFor="password" className="block text-xs sm:text-sm font-medium mb-1">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Enter your password"
            className="w-full p-2 sm:p-3 pr-10 text-sm rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
          <button
            type="button"
            className="absolute right-3 top-8 sm:top-9 text-gray-300 hover:text-yellow-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-yellow-400 text-black font-semibold py-2.5 sm:py-3 text-sm rounded-lg hover:bg-yellow-300 transition-all duration-300"
        >
          Register
        </button>

        {/* Login link */}
        <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-white">
          Already registered?{' '}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
