"use client";
import React, { useState } from "react";
import Image from "next/image";

const characterMap: Record<string, { name: string; anime: string; image: string; quote: string }> = {
  "01-01": {
    name: "Naruto Uzumaki",
    anime: "Naruto",
    image: "/characters/naruto.png",
    quote: "I'm not gonna run away, I never go back on my word!",
  },
  "15-06": {
    name: "Giyu Tomioka",
    anime: "Demon Slayer",
    image: "/characters/giyu.png",
    quote: "Feel the rage. The powerful, pure rage of not being able to forgive.",
  },
  // Add more birthdays...
};

const BirthdayAnimeGame: React.FC = () => {
  const [dob, setDob] = useState("");
  const [character, setCharacter] = useState<typeof characterMap["01-01"] | null>(null);

  const handleCheck = () => {
    const result = characterMap[dob];
    setCharacter(result || null);
  };

  return (
    <div
      className="absolute bottom-2 right-2 w-[180px] bg-cover bg-center rounded-lg shadow-lg p-2 z-30 text-white border border-white backdrop-blur-sm"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <p className="text-[12px] font-bold mb-1">Enter DOB (dd-mm):</p>
      <input
        type="text"
        placeholder="e.g., 01-01"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        className="w-full p-1 mb-1 rounded text-black text-[12px]"
      />
      <button
        onClick={handleCheck}
        className="bg-white text-black text-[12px] font-semibold w-full py-[2px] rounded hover:bg-gray-300 transition-all"
      >
        Go
      </button>

      {character && (
        <div className="mt-2 flex items-center gap-2 bg-gray-200 p-2 rounded-md border border-blue-500">
          <Image
            src={character.image}
            alt={character.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-black text-sm font-medium">{character.name}</p>
        </div>
      )}
    </div>
  );
};

export default BirthdayAnimeGame;
