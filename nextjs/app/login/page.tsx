import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (


   
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="bg-black/30 backdrop-blur-md border border-transparent p-8 rounded-2xl 
                      shadow-xl hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] 
                      hover:border-white transition-all duration-500 ease-in-out transform hover:scale-105 w-[90%] max-w-md text-white">
        
        <h2 className="text-center text-3xl font-bold mb-6">Login</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-black/40 placeholder-gray-300 text-white outline-none border border-gray-500 focus:border-yellow-400"
          />
        </div>

        <button
          className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg hover:bg-yellow-300 transition-all duration-300"
        >
          Login
        </button>

        {/* Register link */}
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
