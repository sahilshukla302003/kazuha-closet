'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const characterMap = {
  '01-01': {
    name: 'Naruto Uzumaki',
    anime: 'Naruto',
    image: '/characters/naruto.png',
    quote: "I'm not gonna run away, I never go back on my word!",
  },
  '15-06': {
    name: 'Giyu Tomioka',
    anime: 'Demon Slayer',
    image: '/characters/giyu.png',
    quote: "Feel the rage. The powerful, pure rage of not being able to forgive.",
  },
};

export default function BirthdayCharacterPage() {
  const [dob, setDob] = useState('');
  const [character, setCharacter] = useState<typeof characterMap['01-01'] | null>(null);

  const handleCheck = () => {
    setCharacter(characterMap[dob] || null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl sm:text-6xl font-extrabold text-center mb-6 tracking-wide bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          Which Anime Character Are You?
        </motion.h1>

        {!character && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto mt-10"
          >
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="Enter DOB (dd-mm)"
              className="w-full px-4 py-3 rounded-lg text-black font-semibold text-lg shadow-inner"
            />
            <button
              onClick={handleCheck}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-lg text-black font-bold text-lg transition shadow-lg"
            >
              Go
            </button>
          </motion.div>
        )}

        {character && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mt-16 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)] px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10"
          >
            {/* Left Image */}
            <div className="w-[180px] h-[180px] relative rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
              <Image
                src={character.image}
                alt={character.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-3xl font-bold text-white">{character.name}</h2>
              <p className="italic text-lg text-pink-300">{character.anime}</p>
              <p className="mt-2 text-md text-white/90 max-w-xl">
                “{character.quote}”
              </p>
              <button
                className="mt-4 flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition"
              >
                <Send size={18} /> Share on IG DM
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
