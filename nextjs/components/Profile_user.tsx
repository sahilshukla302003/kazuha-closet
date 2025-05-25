"use client";

import React from "react";
import { motion } from "framer-motion";

const ProfileSection = () => {
  return (
    <div className="relative min-h-screen px-4 py-10 flex items-center justify-center overflow-hidden">
      {/* 🎥 Video Background (no blur) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/tanjiro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Removed the blur overlay */}

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.015,
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.15)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-5xl h-[520px] rounded-[20px] bg-white/10 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Radial soft glow */}
        <div className="absolute inset-0 rounded-[20px] pointer-events-none z-0 border border-white/10 overflow-hidden">
          <div className="w-full h-full rounded-[20px] bg-gradient-to-br from-white/20 to-transparent opacity-20 blur-xl" />
        </div>

        <div className="relative z-10 flex flex-col w-full h-full">
          {/* Title */}
          <div className="text-center py-4">
            <h2 className="text-4xl font-bold text-white drop-shadow-md">
              PROFILE SECTION
            </h2>
          </div>

          <div className="flex flex-1 w-full">
            {/* Avatar */}
            <div className="w-[30%] flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-44 h-44 rounded-full flex items-center justify-center font-extrabold text-2xl shadow-xl bg-gradient-to-br from-gray-900 via-gray-600 to-gray-300 text-white"
                style={{
                  textShadow: "0 0 6px rgba(255,255,255,0.4)",
                }}
              >
                PFP
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-[1px] bg-white/40 my-12 rounded"></div>

            {/* Profile Inputs */}
            <div className="w-[70%] px-10 pt-14 pb-6 flex flex-col justify-start text-white space-y-8">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-8"
              >
                {[
                  { type: "text", placeholder: "First Name" },
                  { type: "text", placeholder: "Last Name" },
                  { type: "email", placeholder: "Email" },
                  { type: "tel", placeholder: "Phone Number" },
                ].map(({ type, placeholder }) => (
                  <div key={placeholder}>
                    <input
                      type={type}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-md bg-white/90 text-black outline-none shadow-md transition focus:ring-2 focus:ring-white/60"
                      style={{ textShadow: "0 0 2px rgba(0,0,0,0.3)" }}
                    />
                    <div className="h-[1px] bg-white/30 mt-2" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSection;
