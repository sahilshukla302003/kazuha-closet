'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Download } from 'lucide-react';
import Navbar from './Landingpage/Navbar';
import { rawCharacterData } from './characterData';
import html2canvas from 'html2canvas';  // npm install html2canvas


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
      image: `/Birthdaycard/${parseInt(char.date.split('-')[0])}.jpg`,
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
          image: `/Birthdaycard/${d}.jpg`,
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
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const handleDownloadCard = () => {
    if (!cardRef.current) {
      setShareMessage("Error: Could not capture card. Element not found.");
      return;
    }

    if (!imageLoaded) {
      setShareMessage("Please wait, image is still loading...");
      return;
    }

    setShareMessage("Generating image for download...");

    setTimeout(async () => {
      try {
        const canvas = await html2canvas(cardRef.current!, {
          useCORS: true,
          backgroundColor: '#18181b',
          scale: 2,
        });
        const dataUrl = canvas.toDataURL('image/png');
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
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 flex items-center justify-center px-2 py-6 sm:px-4 sm:py-12">
      <Navbar />
      <div className="w-full max-w-5xl text-white">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-4 sm:mb-8 tracking-wide bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent"
        >
          Which Anime Character Are You?
        </motion.h1>

        {!character && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 w-[90vw] sm:w-[600px] max-w-full mx-auto bg-white/10 backdrop-blur-3xl border border-white/30 rounded-3xl px-6 py-6 sm:py-10 flex flex-col items-center gap-4 sm:gap-6"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white text-center">Enter your DOB</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                placeholder="Day (dd)"
                className="w-full px-4 py-2 rounded-lg text-white bg-white/20 placeholder-white/70 font-semibold text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="Month (mm)"
                className="w-full px-4 py-2 rounded-lg text-white bg-white/20 placeholder-white/70 font-semibold text-base shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
            <button
              onClick={handleCheck}
              className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg text-black font-bold text-lg transition shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 w-full"
            >
              Go
            </button>
          </motion.div>
        )}

        {character && (
          <div className="flex flex-col items-center justify-center mt-4">
            <div
                ref={cardRef}
                style={{
                  backgroundColor: '#18181b',
                  padding: '24px',
                  borderRadius: '24px',
                  fontFamily: "'Poppins', sans-serif",
                  maxWidth: '600px',
                  width: '90vw',
                  minHeight: window.innerWidth >= 640 ? '200px' : 'auto', // ↑ height only on desktop
                }}
              >
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '24px',
                  padding: '20px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '4px solid rgba(255, 255, 255, 0.2)',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onLoad={() => setImageLoaded(true)}
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/180x180/CCCCCC/000000?text=Error';
                      setImageLoaded(true);
                    }}
                  />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{character.name}</h2>
                  <p style={{ fontStyle: 'italic', fontSize: '16px', color: '#f472b6' }}>{character.anime}</p>
                  <p style={{ fontSize: '14px', color: '#e4e4e7', marginTop: '4px' }}>“{character.quote}”</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
              <button
                onClick={handleShareToIGDM}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm sm:text-base"
              >
                <Send size={18} /> Share on IG DM
              </button>
              <button
                onClick={handleDownloadCard}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg hover:scale-105 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
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
