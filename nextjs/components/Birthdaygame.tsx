'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Download } from 'lucide-react';
import Navbar from './Landingpage/Navbar';
import { rawCharacterData } from './characterData';
import domtoimage from 'dom-to-image-more';

interface Character {
  name: string;
  anime: string;
  image: string;
  quote: string;
}

const generateCharacterMap = (): { [key: string]: Character } => {
  const map: { [key: string]: Character[] } = {};
  rawCharacterData.forEach(char => {
    if (!map[char.date]) map[char.date] = [];
    map[char.date].push({
      name: char.name,
      anime: char.anime,
      image: `https://placehold.co/180x180/${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}/FFFFFF?text=${encodeURIComponent(char.name.split(' ')[0])}`,
      quote: char.quote,
    });
  });

  const finalMap: { [key: string]: Character } = {};
  for (let d = 1; d <= 31; d++) {
    const dayString = d < 10 ? `0${d}` : `${d}`;
    const key = `${dayString}-01`;
    const candidates: Character[] = [];

    for (const fullDate in map) {
      if (fullDate.startsWith(dayString + '-')) {
        candidates.push(...map[fullDate]);
      }
    }

    finalMap[key] = candidates.length
      ? candidates[Math.floor(Math.random() * candidates.length)]
      : {
          name: `Mystery Anime Fan ${dayString}`,
          anime: 'Anime Multiverse',
          image: `https://placehold.co/180x180/E0E0E0/000000?text=Day+${dayString}`,
          quote: `Uncover your anime spirit on the ${dayString}th!`,
        };
  }

  return finalMap;
};

const characterMap = generateCharacterMap();

export default function BirthdayCharacterPage() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCheck = () => {
    setError('');
    setShareMessage('');
    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month);
    if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > 31 || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      setError('Please enter valid day and month (e.g., Day: 04, Month: 05)');
      setCharacter(null);
      return;
    }

    const formattedDay = parsedDay < 10 ? '0' + parsedDay : parsedDay.toString();
    const dobKey = `${formattedDay}-01`;
    const foundCharacter = characterMap[dobKey];
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      setCharacter(null);
      setError('No character found for this date. Please try another day.');
    }
  };

  const handleShareToIGDM = () => {
    const instagramDMURL = 'https://www.instagram.com/direct/t/17842318353289876/';
    window.open(instagramDMURL, '_blank');
    setShareMessage("You've been redirected to Instagram. Please manually share the card from your downloads.");
  };

  const handleDownloadCard = async () => {
    if (!cardRef.current) {
      setShareMessage("Error: Could not capture card. Element not found.");
      return;
    }

    setShareMessage("Generating image for download...");
    try {
      const dataUrl = await domtoimage.toPng(cardRef.current);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${character?.name.replace(/\s/g, '_') || 'anime_character'}_birthday_card.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShareMessage("Card downloaded! You can now manually share it.");
    } catch (err) {
      console.error("Download failed:", err);
      setShareMessage("Failed to generate image for download. Please try again.");
    }
  };

  const handleNumericInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    min: number,
    max: number
  ) => {
    const val = e.target.value;
    if (val === '' || /^\d+$/.test(val)) {
      const numVal = parseInt(val);
      if (val === '' || (numVal >= min && numVal <= max)) setter(val);
      else if (numVal < min) setter(min.toString());
      else if (numVal > max) setter(max.toString());
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center px-4 py-12">
      <Navbar />
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
            className="mt-16 w-full max-w-md mx-auto bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.15)] px-6 py-10 flex flex-col items-center gap-6 sm:px-8 sm:py-12 md:px-10 md:py-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Enter your DOB</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <input
                type="number"
                value={day}
                onChange={(e) => handleNumericInputChange(e, setDay, 1, 31)}
                placeholder="Day (dd)"
                className="w-full px-4 py-3 rounded-lg text-white bg-white/20 placeholder-white/70 font-semibold text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ease-in-out sm:py-4 sm:text-xl"
              />
              <input
                type="number"
                value={month}
                onChange={(e) => handleNumericInputChange(e, setMonth, 1, 12)}
                placeholder="Month (mm)"
                className="w-full px-4 py-3 rounded-lg text-white bg-white/20 placeholder-white/70 font-semibold text-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 ease-in-out sm:py-4 sm:text-xl"
              />
            </div>
            {error && <p className="text-red-400 text-center mt-2 text-sm sm:text-base">{error}</p>}
            <button
              onClick={handleCheck}
              className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-lg text-black font-bold text-xl transition shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full sm:w-auto sm:px-10 sm:py-4 sm:text-2xl"
            >
              Go
            </button>
          </motion.div>
        )}

        {character && (
          <div className="flex flex-col items-center justify-center">
            {/* Card capture area */}
            <div
              ref={cardRef}
              className="bg-[#18181b] p-8 rounded-3xl inline-block"
              style={{ borderRadius: '1.5rem', boxShadow: 'none' }}
            >
              <div
                className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl shadow-[0_0_60px_rgba(255,255,255,0.15)] px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10 sm:px-8 sm:py-12 md:px-10 md:py-14"
                style={{ boxShadow: 'none' }}
              >
                <div className="w-[180px] h-[180px] relative rounded-full overflow-hidden border-4 border-white/20 shadow-xl flex-shrink-0 sm:w-[200px] sm:h-[200px]">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="object-cover w-full h-full rounded-full"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/180x180/CCCCCC/000000?text=Error';
                    }}
                  />
                </div>
                <div className="flex-1 text-center md:text-left space-y-3 sm:space-y-4">
                  <h2
                    className="text-3xl sm:text-4xl font-bold text-white"
                    style={{
                      margin: 0,
                      padding: 0,
                      background: 'none',
                      border: 'none',
                      boxShadow: 'none',
                      outline: 'none',
                    }}
                  >
                    {character.name}
                  </h2>
                  <p
                    className="italic text-lg sm:text-xl text-pink-300"
                    style={{
                      margin: 0,
                      padding: 0,
                      background: 'none',
                      border: 'none',
                      boxShadow: 'none',
                      outline: 'none',
                    }}
                  >
                    {character.anime}
                  </p>
                  <p
                    className="mt-2 text-md sm:text-lg text-white/90 max-w-xl"
                    style={{
                      margin: 0,
                      padding: 0,
                      background: 'none',
                      border: 'none',
                      boxShadow: 'none',
                      outline: 'none',
                    }}
                  >
                    “{character.quote}”
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons - not in screenshot */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
              <button
                onClick={handleShareToIGDM}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 sm:px-6 sm:py-3 sm:text-xl"
              >
                <Send size={18} /> Share on IG DM
              </button>
              <button
                onClick={handleDownloadCard}
                className="flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 sm:px-6 sm:py-3 sm:text-xl"
              >
                <Download size={18} /> Download Card
              </button>
            </div>
            {shareMessage && <p className="text-sm text-center text-gray-300 mt-2">{shareMessage}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
