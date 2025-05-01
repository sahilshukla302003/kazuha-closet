'use client';

import { useEffect, useState } from 'react';

const ProfileIcon = () => {
  const [initial, setInitial] = useState('');
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('first_name');
    if (name) {
      setInitial(name.charAt(0).toUpperCase());
      setFullName(name);
    }
  }, []);

  if (!initial) return null;

  return (
    <div
      title={fullName}
      className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 
                 text-black flex items-center justify-center font-bold text-xl 
                 shadow-[0_0_15px_rgba(255,223,0,0.6)] 
                 transition-transform duration-300 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,223,0,0.9)] cursor-pointer"
    >
      {initial}
    </div>
  );
};

export default ProfileIcon;
