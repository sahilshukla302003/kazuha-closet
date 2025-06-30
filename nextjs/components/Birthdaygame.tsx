'use client';
import React, { useState, useRef } from 'react'; // Import useRef
import { motion } from 'framer-motion';
import { Send, Download } from 'lucide-react'; // Import Send and Download icons
import Navbar from './Landingpage/Navbar';
import html2canvas from 'html2canvas'; // Make sure html2canvas is correctly installed and imported

// Import rawCharacterData from the separate file
import { rawCharacterData } from './characterData'; // Adjust path as needed

// Define the structure for a character object
interface Character {
  name: string;
  anime: string;
  image: string;
  quote: string;
}

// This function generates the character map for each day of the month.
// It prioritizes characters from `rawCharacterData` whose birthday falls on that specific day
// (regardless of month). If multiple characters share a day, one is randomly chosen.
// If no specific character is found for a day, a generic fallback is used.
const generateCharacterMap = (): { [key: string]: Character } => {
  const map: { [key: string]: Character[] } = {}; // Temporary map to hold lists of characters per full date (dd-mm)

  // Populate the temporary map with all collected characters, grouped by their exact birthday
  rawCharacterData.forEach(char => {
    if (!map[char.date]) {
      map[char.date] = [];
    }
    map[char.date].push({
      name: char.name,
      anime: char.anime,
      // Generate a random color for placeholder images for visual variety
      // You'll want to replace these with actual image URLs if you have them
      image: `https://placehold.co/180x180/${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}/FFFFFF?text=${encodeURIComponent(char.name.split(' ')[0])}`,
      quote: char.quote,
    });
  });

  const finalMap: { [key: string]: Character } = {}; // The final map with one character per day-of-month key (dd-01)

  // Loop through each day from 1 to 31
  for (let d = 1; d <= 31; d++) {
    const dayString = d < 10 ? `0${d}` : `${d}`;
    // We use a consistent month '01' (January) for lookup in finalMap,
    // as per the request to only use the date (day) for character assignment.
    const keyForMapLookup = `${dayString}-01`;

    let chosenCharacter: Character | null = null;
    const candidatesForDay: Character[] = [];

    // Collect all characters whose birthday falls on 'dayString' across ANY month
    // This allows a character born on 01-07 to be a candidate for day '01' in our map
    for (const fullDate in map) {
      if (fullDate.startsWith(dayString + '-')) { // Check if the date starts with the current dayString
        candidatesForDay.push(...map[fullDate]);
      }
    }

    if (candidatesForDay.length > 0) {
      // If there are multiple candidates for the same day, pick one randomly
      chosenCharacter = candidatesForDay[Math.floor(Math.random() * candidatesForDay.length)];
    }

    if (chosenCharacter) {
      finalMap[keyForMapLookup] = chosenCharacter;
    } else {
      // If no specific anime character from our list is found for this day, use a generic fallback
      const fallbackAnime = 'Anime Multiverse';
      const fallbackQuote = `Uncover your anime spirit on the ${dayString}th!`;
      finalMap[keyForMapLookup] = {
        name: `Mystery Anime Fan ${dayString}`,
        anime: fallbackAnime,
        image: `https://placehold.co/180x180/E0E0E0/000000?text=Day+${dayString}`,
        quote: fallbackQuote,
      };
    }
  }
  return finalMap;
};

// Generate the character map once when the component loads
const characterMap = generateCharacterMap();

export default function BirthdayCharacterPage() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState('');
  const [shareMessage, setShareMessage] = useState(''); // For messages related to sharing/download
  const cardRef = useRef<HTMLDivElement>(null); // Ref for the character card div, used by html2canvas

  // Handles the "Go" button click to find and display the character
  const handleCheck = () => {
    setError(''); // Clear any previous errors
    setShareMessage(''); // Clear any previous share/download messages

    // Parse and validate day and month inputs
    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month);

    if (isNaN(parsedDay) || parsedDay < 1 || parsedDay > 31 || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      setError('Please enter valid day and month (e.g., Day: 04, Month: 05)');
      setCharacter(null); // Clear displayed character if input is invalid
      return;
    }

    // Format day to "dd" string (e.g., 4 becomes "04")
    const formattedDay = parsedDay < 10 ? '0' + parsedDay : parsedDay.toString();
    // The lookup key for our characterMap only uses the formatted day, with '01' as a placeholder month
    const dobKey = `${formattedDay}-01`;

    // Look up the character in the pre-generated map
    const foundCharacter = characterMap[dobKey];
    if (foundCharacter) {
      setCharacter(foundCharacter);
    } else {
      // Fallback if no character is found (should ideally not happen if map is fully populated)
      setCharacter(null);
      setError('No character found for this date. Please try another day.');
    }
  };

  // Handles redirecting the user to a specific Instagram DM thread
  const handleShareToIGDM = () => {
    const instagramDMURL = 'https://www.instagram.com/direct/t/17842318353289876/';
    window.open(instagramDMURL, '_blank'); // Open the URL in a new tab/window
    setShareMessage("You've been redirected to Instagram. Please manually share the card from your downloads.");
  };

  // Handles capturing the character card as an image and prompting for download
  const handleDownloadCard = async () => {
    if (!cardRef.current) {
      setShareMessage("Error: Could not capture card. Element not found.");
      return;
    }

    // Crucial check: Ensure html2canvas is loaded before attempting to use it
    if (typeof html2canvas === 'undefined') {
      // Updated message to be more precise about Next.js installation
      setShareMessage("Error: 'html2canvas' library is not loaded. If you are in a Next.js project, please install it via `npm install html2canvas` or `yarn add html2canvas` and then import it directly with `import html2canvas from 'html2canvas';`. If you are in a non-Next.js environment, ensure the CDN script tag for html2canvas is present in your HTML file.");
      console.error("html2canvas is not defined. Make sure the script is loaded correctly.");
      return;
    }

    setShareMessage("Generating image for download...");
    try {
      // Use html2canvas to render the specified DOM element (the character card) to a canvas
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, // Allows loading cross-origin images (like our placeholder images)
        backgroundColor: null, // Ensures transparent background if the card itself is semi-transparent
      });

      // Convert the canvas content to a PNG image data URL
      const image = canvas.toDataURL('image/png');

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = image;
      // Set the download filename based on the character's name
      link.download = `${character?.name.replace(/\s/g, '_') || 'anime_character'}_birthday_card.png`;
      document.body.appendChild(link); // Append link to body to make it clickable
      link.click(); // Programmatically click the link to start download
      document.body.removeChild(link); // Clean up the temporary link

      setShareMessage("Card downloaded! You can now manually share it on Instagram or other platforms.");

    } catch (err) {
      console.error("Error capturing card:", err);
      setShareMessage("Failed to generate image for download. Please try again.");
    }
  };

  // Helper function for input validation (for day and month fields)
  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>, minVal: number, maxVal: number) => {
    const value = e.target.value;
    // Allow empty string (for clearing input) or a string that looks like a number
    if (value === '' || /^\d+$/.test(value)) {
      const numValue = parseInt(value);
      if (value === '' || (numValue >= minVal && numValue <= maxVal)) {
        setter(value);
      } else if (numValue < minVal) {
        setter(minVal.toString()); // Cap at min value
      } else if (numValue > maxVal) {
        setter(maxVal.toString()); // Cap at max value
      }
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
            // Styles for the DOB input section, enhanced for glassmorphism and responsiveness
            className="mt-16 w-full max-w-md mx-auto
                       bg-white/10 backdrop-blur-3xl
                       border border-white/30 rounded-3xl
                       shadow-[0_0_60px_rgba(255,255,255,0.15)]
                       px-6 py-10 flex flex-col items-center gap-6
                       sm:px-8 sm:py-12 md:px-10 md:py-14"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center">Enter your DOB</h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full">
              <input
                type="number"
                value={day}
                onChange={(e) => handleNumericInputChange(e, setDay, 1, 31)} // Use new validation handler
                placeholder="Day (dd)"
                min="1"
                max="31"
                // Input styling with white text and placeholder for visibility against glass background
                className="w-full px-4 py-3 rounded-lg text-white bg-white/20 placeholder-white/70 font-semibold text-lg
                           shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-500
                           transition-all duration-300 ease-in-out sm:py-4 sm:text-xl"
              />
              <input
                type="number"
                value={month}
                onChange={(e) => handleNumericInputChange(e, setMonth, 1, 12)} // Use new validation handler
                placeholder="Month (mm)"
                min="1"
                max="12"
                // Input styling with white text and placeholder for visibility against glass background
                className="w-full px-4 py-3 rounded-lg text-white bg-white/20 placeholder-white/70 font-semibold text-lg
                           shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500
                           transition-all duration-300 ease-in-out sm:py-4 sm:text-xl"
              />
            </div>
            {error && <p className="text-red-400 text-center mt-2 text-sm sm:text-base">{error}</p>}
            <button
              onClick={handleCheck}
              className="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-lg text-black font-bold text-xl
                         transition shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500
                         w-full sm:w-auto sm:px-10 sm:py-4 sm:text-2xl"
            >
              Go
            </button>
          </motion.div>
        )}

        {character && (
          <motion.div
            ref={cardRef} // Attach ref to this div for html2canvas to capture
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            // Styles for the character display card, enhanced for glassmorphism and responsiveness
            className="mt-16 w-full max-w-5xl mx-auto
                       bg-white/10 backdrop-blur-3xl
                       border border-white/30 rounded-3xl
                       shadow-[0_0_60px_rgba(255,255,255,0.15)]
                       px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-10
                       sm:px-8 sm:py-12 md:px-10 md:py-14"
          >
            {/* Left Image Section */}
            <div className="w-[180px] h-[180px] relative rounded-full overflow-hidden border-4 border-white/20 shadow-xl flex-shrink-0
                            sm:w-[200px] sm:h-[200px]">
              <img
                src={character.image}
                alt={character.name}
                className="object-cover w-full h-full rounded-full"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/180x180/CCCCCC/000000?text=Error'; }}
              />
            </div>

            {/* Right Content Section */}
            <div className="flex-1 text-center md:text-left space-y-3 sm:space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">{character.name}</h2>
              <p className="italic text-lg sm:text-xl text-pink-300">{character.anime}</p>
              <p className="mt-2 text-md sm:text-lg text-white/90 max-w-xl">
                “{character.quote}”
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-4">
                {/* Button to redirect to Instagram DM (manual sharing required) */}
                <button
                  onClick={handleShareToIGDM}
                  className="flex items-center justify-center gap-2 px-5 py-2
                             bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg
                             hover:scale-105 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500
                             sm:px-6 sm:py-3 sm:text-xl"
                >
                  <Send size={18} /> Share on IG DM
                </button>

                {/* Button to download the card as a PNG image */}
                <button
                  onClick={handleDownloadCard}
                  className="flex items-center justify-center gap-2 px-5 py-2
                             bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-lg
                             hover:scale-105 transition shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400
                             sm:px-6 sm:py-3 sm:text-xl"
                >
                  <Download size={18} /> Download Card
                </button>
              </div>
              {shareMessage && <p className="text-sm text-center text-gray-300 mt-2">{shareMessage}</p>}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}