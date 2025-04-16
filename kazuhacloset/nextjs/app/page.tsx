'use client';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="bg-[#1b1b1d] min-h-screen relative">
      {/* Bookmark Toggle Button */}
      <div
        className="fixed left-0 top-1/2 -translate-y-1/2 bg-[#2c2c2e] hover:bg-yellow-500 text-white w-10 h-24 rounded-r-xl flex items-center justify-center cursor-pointer z-50 animate-pulse hover:animate-none group"
        onClick={() => setIsOpen(true)}
        title="Click to open menu"
      >
        <span className="rotate-[-90deg] text-sm font-bold tracking-wider group-hover:scale-110 transition-transform duration-300">
          MENU
        </span>
        <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-yellow-400 rounded-full animate-ping z-[-1]"></div>
      </div>

      {/* Sliding Sidebar */}
      {isOpen && (
        <div
          className={`fixed top-1/2 -translate-y-1/2 left-14 bg-[#2c2c2e] text-white w-40 py-4 rounded-xl shadow-xl z-40 transition-all duration-300 ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
          onMouseLeave={() => setIsOpen(false)}
        >
          <ul className="space-y-4 text-sm px-4">
            <li className="hover:text-yellow-400 cursor-pointer">Home</li>
            <li className="hover:text-yellow-400 cursor-pointer">Products</li>
            <li className="hover:text-yellow-400 cursor-pointer">About</li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact</li>
          </ul>
        </div>
      )}

      {/* Rest of your content... */}

      {/* Main Content */}
      <div className={`bg-gradient-to-br from-[#0f0f10] to-[#2c2c2e] min-h-screen p-10 pl-${isOpen ? '52' : '20'} transition-all duration-300`}>
        {/* Navbar */}
        <div className="flex justify-between items-center text-white mb-10">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12" />
            <div className="text-lg leading-5">
              KAZUHA <br /> CLOSET
            </div>
          </div>

          <div className="flex items-center bg-[#e7e1eb] rounded-full px-4 py-2 w-1/3">
            <button className="text-gray-500 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm w-full text-black"
            />
          </div>

          <div className="flex items-center justify-center space-x-8 text-white text-2xl">
            <div className="transition-transform transform hover:scale-125 hover:text-yellow-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 2.7a1 1 0 00.9 1.3h12.3M16 16a1 1 0 11-2 0 1 1 0 012 0zm-8 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </div>
            <div className="transition-transform transform hover:scale-125 hover:text-blue-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-3.314 0-6 2.239-6 5v1h12v-1c0-2.761-2.686-5-6-5zM12 12a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </div>
            <div className="transition-transform transform hover:scale-125 hover:text-red-400 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21C12 21 4 13.5 4 8.5C4 6 6 4 8.5 4C10.11 4 11.55 4.99 12 6.25C12.45 4.99 13.89 4 15.5 4C18 4 20 6 20 8.5C20 13.5 12 21 12 21Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Product Card Section */}
        <div className="bg-[#888888] rounded-3xl flex justify-between items-center px-[50px] py-8 max-w-[1000px] mx-auto mt-36 relative overflow-visible shadow-xl transition-all duration-300 border border-transparent hover:border-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)]">
          <div className="text-white font-extrabold space-y-6 z-10">
            <h2 className="text-6xl drop-shadow-2xl glow-text animate-fadeIn">NARUTO</h2>
            <h3 className="text-5xl drop-shadow-2xl ml-[150px] glow-text animate-fadeIn">TSHIRT</h3>
            <p className="text-5xl mt-6 text-black drop-shadow-lg font-extrabold group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300 ease-in-out animate-fadeIn">50% OFF</p>
          </div>

          {/* Image Section */}
          <div className="relative z-20 ml-32 w-[500px] h-[380px] overflow-visible -mt-20">
            <img
              src="/Kurama-Tshirt.png"
              alt="Kurama T-Shirt"
              className="absolute top-[-0px] left-44 z-10 w-[400px] h-[400px] object-contain animate-slideUpFade img-hover-scale"
            />
            <img
              src="/Naruto-Tshirt.png"
              alt="Naruto Uzumaki T-Shirt"
              className="absolute top-[-10px] left-8 z-20 w-[450px] h-[450px] object-contain animate-slideUpFade img-hover-scale"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
