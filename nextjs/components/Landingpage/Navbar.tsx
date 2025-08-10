'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { Luckiest_Guy } from 'next/font/google';
import { getUser } from '@/utils/api/userUtils';
import SearchBar from './search'; // Import the SearchBar component

interface User {
  first_name?: string;
  avatarUrl?: string;
}

const luckiest = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
});

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [firstLetter, setFirstLetter] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  setMounted(true);

  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  // Attach listeners
  window.addEventListener("scroll", handleScroll);
  document.addEventListener("mousedown", handleClickOutside);

  const token = localStorage.getItem("token");
  if (token) {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUserData(user);
        setFirstLetter(user.first_name?.[0]?.toUpperCase() || null);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }

  // Cleanup
  return () => {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);



  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full px-4 sm:px-6 md:px-10 transition-all duration-500 flex items-center justify-between ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
      } ${scrolled ? 'py-2 backdrop-blur-md bg-black/80 shadow-md' : 'py-4 backdrop-blur-lg bg-black/60 shadow-lg'}`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center space-x-3 sm:space-x-4 cursor-pointer"
      >
        <Image src="/logo.png" alt="Logo" width={32} height={32} className="rounded-full sm:w-12 sm:h-12 w-8 h-8" />
        <div className={`text-sm leading-4 font-semibold tracking-wide text-white ${luckiest.className} select-none`}>
          KAZUHA <br className="hidden sm:block" /> CLOSET
        </div>
      </Link>

      {/* Desktop Search - Now using SearchBar component */}
      <div className="hidden sm:flex items-center w-1/2 md:w-1/3">
        <SearchBar />
      </div>

      {/* Mobile Icons (Search, Orders, Hamburger) */}
      <div className="sm:hidden flex items-center space-x-4">
        {/* Mobile Search Icon */}
        <button
          className="text-white flex items-center justify-center w-6 h-6"
          aria-label="Search"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>

        {/* Mobile Orders Icon */}
        <Link href="/orders" aria-label="Orders">
          <div className="text-white hover:text-green-400 transition-transform duration-300 cursor-pointer flex items-center justify-center w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="text-white cursor-pointer focus:outline-none flex items-center justify-center w-6 h-6"
          aria-label="Open Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Search Bar (appears when icon is clicked) - Now using SearchBar component */}
      {mobileSearchOpen && (
        <div className="absolute top-full left-0 w-full px-4 py-2 bg-black/90 backdrop-blur-md shadow-md sm:hidden">
          <SearchBar isMobile={true} onClose={closeMobileSearch} />
        </div>
      )}

      {/* Desktop Right Icons */}
      <div className="hidden sm:flex items-center space-x-6 text-white text-xl sm:text-2xl relative">
        {/* Cart */}
        <Link href="/cart" aria-label="Cart">
          <div className="hover:scale-125 transition-transform duration-300 hover:text-yellow-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.3M16 16a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </div>
        </Link>

        {/* Orders Icon */}
        <Link href="/order-summary" aria-label="Orders">
          <div className="hover:scale-125 transition-transform duration-300 hover:text-green-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </Link>

        {/* Profile or Login */}
        {firstLetter ? (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full overflow-hidden border-2 border-yellow-400 hover:scale-125 transition-transform duration-300 cursor-pointer"
              aria-label="User menu"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setDropdownOpen(!dropdownOpen)}
            >
              {userData?.avatarUrl ? (
                <Image
                  src={userData.avatarUrl}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="bg-yellow-400 text-black font-bold w-full h-full flex items-center justify-center select-none">
                  {firstLetter}
                </div>
              )}
            </div>

            {dropdownOpen && (
              <div className="absolute top-12 right-0 w-44 bg-white text-black rounded-xl shadow-xl py-3 z-50">
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-2 text-sm font-medium hover:bg-gray-100 transition rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A9.003 9.003 0 0112 3a9.003 9.003 0 016.879 14.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-left hover:bg-gray-100 transition rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="hover:scale-125 transition-transform duration-300 hover:text-blue-400 cursor-pointer"
            aria-label="Login"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5zM12 12a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
            {/* Removed 'Login' text from here for desktop view */}
          </Link>
        )}
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 w-52 bg-black/90 backdrop-blur-md rounded-xl shadow-xl p-4 flex flex-col space-y-4 text-white z-50">
          <Link href="/cart" className="flex items-center gap-3 hover:text-yellow-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.3M16 16a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
            Cart
          </Link>

         

          {firstLetter ? (
            <>
              <Link href="/profile" className="flex items-center gap-3 hover:text-yellow-400 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A9.003 9.003 0 0112 3a9.003 9.003 0 016.879 14.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 hover:text-yellow-400 transition text-left"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                  />
                </svg>
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-blue-400 transition flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 14c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5zM12 12a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
              Login {/* This "Login" text is preserved for mobile view */}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
