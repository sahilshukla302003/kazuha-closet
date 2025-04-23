'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-full px-10 transition-all duration-500 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      } ${scrolled ? 'py-2 backdrop-blur-md bg-black/80 shadow-md' : 'py-4 backdrop-blur-lg bg-black/60 shadow-lg'}`}
    >
      <div className="flex justify-between items-center text-white">
        {/* Left - Logo & Brand */}
        <div className="flex items-center space-x-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
          <img src="/logo.png" alt="Logo" className="w-12 h-12 rounded-full" />
          <div className="text-lg leading-5 font-semibold tracking-wide">
            KAZUHA <br /> CLOSET
          </div>
        </div>

        {/* Middle - Search */}
        <div className="flex items-center bg-white/80 rounded-full px-4 py-2 w-1/3 backdrop-blur-sm shadow-inner">
          <button className="text-gray-600 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none text-sm w-full text-black placeholder-gray-500"
          />
        </div>

        {/* Right - Icons */}
        <div className="flex items-center justify-center space-x-8 text-white text-2xl">
          {/* Cart */}
          <div className="hover:scale-125 transition-transform duration-300 hover:text-yellow-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.3M16 16a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>

          {/* Login */}
          <Link href="/login">
            <div className="hover:scale-125 transition-transform duration-300 hover:text-blue-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5zM12 12a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            </div>
          </Link>

          {/* Heart */}
          <div className="hover:scale-125 transition-transform duration-300 hover:text-red-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C12 21 4 13.5 4 8.5C4 6 6 4 8.5 4C10.11 4 11.55 4.99 12 6.25C12.45 4.99 13.89 4 15.5 4C18 4 20 6 20 8.5C20 13.5 12 21 12 21Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
