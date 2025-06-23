'use client';

import { useEffect, useState } from 'react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        !document.getElementById('sidebar')?.contains(e.target as Node) &&
        !document.getElementById('toggleBtn')?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // close sidebar after clicking
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div
        id="toggleBtn"
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-[#2c2c2e] hover:bg-yellow-500 text-white w-8 h-20 rounded-r-xl flex items-center justify-center cursor-pointer z-50 animate-pulse hover:animate-none group sm:w-10 sm:h-24"
        onClick={() => setIsOpen(!isOpen)}
        title="Click to open/close menu"
      >
        <span className="rotate-[-90deg] text-sm font-bold tracking-wider group-hover:scale-110 transition-transform duration-300">
          MENU
        </span>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping z-[-1]" />
      </div>

      {isOpen && (
        <div
          id="sidebar"
          className="fixed top-1/2 -translate-y-1/2 left-14 bg-[#2c2c2e] text-white 
                     w-32 sm:w-36 md:w-40 py-4 rounded-xl shadow-xl z-40"
        >
          <ul className="space-y-4 text-sm px-4">
            <li
              className="hover:text-yellow-400 cursor-pointer py-1"
              onClick={() => scrollToSection('home')}
            >
              Home
            </li>
            <li
              className="hover:text-yellow-400 cursor-pointer py-1"
              onClick={() => scrollToSection('products')}
            >
              Products
            </li>
            <li
              className="hover:text-yellow-400 cursor-pointer py-1"
              onClick={() => scrollToSection('about')}
            >
              About
            </li>
            <li
              className="hover:text-yellow-400 cursor-pointer py-1"
              onClick={() => scrollToSection('wallpapers')}
            >
              Wallpapers
            </li>
            <li
              className="hover:text-yellow-400 cursor-pointer py-1"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
