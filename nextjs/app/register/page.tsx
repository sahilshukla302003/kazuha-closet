'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import API from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const validateForm = () => {
    // Add more validations if needed
    if (!form.first_name || !form.email || !form.password) {
      alert('Please fill in required fields.');
      return false;
    }
    // Email format validation (simple check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      alert('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true); // Start loading

    try {
      const res = await API.post('/register/', form);
      alert('Registration successful!');
      
      // Optionally auto-login or redirect
      localStorage.setItem('first_name', form.first_name.charAt(0).toUpperCase());

      router.push('/'); // Redirect to home
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Something went wrong';
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-black/30 backdrop-blur-md border border-transparent p-8 rounded-2xl 
                      shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] 
                      hover:border-white transition-all duration-500 ease-in-out transform hover:scale-105 w-[90%] max-w-md text-white">
        
        <h2 className="text-center text-3xl font-bold mb-6">Register</h2>

        {/* First Name */}
        <div className="mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            id="first_name"
            onChange={handleChange}
            value={form.first_name}
            placeholder="Enter your first name"
            className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            id="last_name"
            onChange={handleChange}
            value={form.last_name}
            placeholder="Enter your last name"
            className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            value={form.email}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Phone */}
        <div className="mb-6">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            onChange={handleChange}
            value={form.phone}
            placeholder="Enter your phone number"
            className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            value={form.password}
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300"
          disabled={loading} // Disable when loading
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        {/* Login link */}
        <p className="mt-4 text-center text-sm text-white">
          Already registered?{' '}
          <Link href="/login" className="text-yellow-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
