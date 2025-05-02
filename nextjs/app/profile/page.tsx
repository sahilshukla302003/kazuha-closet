"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`/api/user/${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, []);

  if (!user) return <div className="text-white p-6">Loading Profile...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-bold">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-4xl mb-6 font-extrabold tracking-wider">MY PROFILE</h1>
        <div className="bg-gray-800 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-lg">
          <img
            src="/default-avatar.png"
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-2xl">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-300">{user.email}</p>
            <p className="text-gray-400">{user.phone}</p>
            <div className="mt-4 flex gap-4">
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-xl">Edit Profile</button>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
