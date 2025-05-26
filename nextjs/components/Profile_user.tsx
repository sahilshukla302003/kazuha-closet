"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUser } from "@/utils/api/userUtils";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const ProfileSection = () => {
const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userid");
      if (!userId) return;

      try {
        const user = await getUser(userId);
        setUserData(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="relative min-h-screen px-4 py-10 flex items-center justify-center overflow-hidden">
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
        {/* Radial soft glow background */}
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
                className="w-60 h-60 rounded-full flex items-center justify-center font-extrabold text-5xl shadow-xl bg-gradient-to-br from-gray-900 via-gray-600 to-gray-300 text-white"
                style={{
                  textShadow: "0 0 6px rgba(255,255,255,0.4)",
                }}
              >
                {userData?.first_name?.[0]?.toUpperCase() || "?"}
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-[1px] bg-white/40 my-12 rounded"></div>

            {/* Profile Info */}
            <div className="w-[70%] px-10 pt-14 pb-6 flex flex-col justify-start text-white space-y-8">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                {[
                  { label: "First Name", value: userData?.first_name, type: "text" },
                  { label: "Last Name", value: userData?.last_name, type: "text" },
                  { label: "Email", value: userData?.email, type: "email" },
                  { label: "Phone Number", value: userData?.phone, type: "tel" },
                ].map(({ label, value, type }) => (
                  <div key={label}>
                    <label className="block text-sm mb-1 font-semibold text-white">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={value || ""}
                      readOnly
                      placeholder={`Enter your ${label.toLowerCase()}`}
                      className="w-full px-4 py-3 rounded-md bg-white/10 backdrop-blur-md text-white placeholder-white/70 outline-none border border-white/20 shadow-md transition-all focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                    />
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
