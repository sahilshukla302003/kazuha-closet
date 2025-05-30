'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { Luckiest_Guy } from 'next/font/google';
import { getUser } from '@/utils/api/userUtils';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    const userId = localStorage.getItem('userid');
    if (userId) {
      const fetchUser = async () => {
        try {
          const user = await getUser(userId);
          setUserData(user);
          setFirstLetter(user.first_name?.[0]?.toUpperCase() || null);
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      };
      fetchUser();
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
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

      {/* Search - hide on very small screens */}
      <div className="hidden sm:flex items-center bg-white/80 rounded-full px-4 py-2 w-1/2 md:w-1/3 backdrop-blur-sm shadow-inner">
        <button className="text-gray-600 mr-2" aria-label="Search Icon">
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
          </Link>
        )}

        {/* Heart */}
        <div className="hover:scale-125 transition-transform duration-300 hover:text-red-400 cursor-pointer" aria-label="Favorites">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21C12 21 4 13.5 4 8.5C4 6 6 4 8.5 4C10.11 4 11.55 4.99 12 6.25C12.45 4.99 13.89 4 15.5 4C18 4 20 6 20 8.5C20 13.5 12 21 12 21Z"
            />
          </svg>
        </div>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="sm:hidden flex items-center justify-center text-white text-2xl cursor-pointer focus:outline-none"
        aria-label="Open Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

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

          <Link href="/favorites" className="flex items-center gap-3 hover:text-red-400 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21C12 21 4 13.5 4 8.5C4 6 6 4 8.5 4C10.11 4 11.55 4.99 12 6.25C12.45 4.99 13.89 4 15.5 4C18 4 20 6 20 8.5C20 13.5 12 21 12 21Z"
              />
            </svg>
            Favorites
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
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}