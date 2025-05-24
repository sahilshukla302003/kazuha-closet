"use client";

import React from "react";

const ProfileSection = () => {
  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl h-[450px] rounded-[20px] bg-white/10 backdrop-blur-lg border border-white/20 flex shadow-xl overflow-hidden">
        <div className="flex w-full">
          {/* Left - Profile Avatar */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center text-black font-bold text-xl">
              PFP
            </div>
          </div>

          {/* Divider */}
          <div className="w-[2px] bg-white/40 my-12 rounded"></div>

          {/* Right - Profile Inputs */}
          <div className="w-1/2 flex flex-col justify-center px-6 space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-2">
              PROFILE SECTION
            </h2>
            <input
              type="text"
              placeholder="First Name"
              className="px-4 py-3 rounded-full bg-white/90 text-black outline-none"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="px-4 py-3 rounded-full bg-white/90 text-black outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-full bg-white/90 text-black outline-none"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="px-4 py-3 rounded-full bg-white/90 text-black outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
