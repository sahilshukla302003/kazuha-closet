'use client';
import React, { useState, useRef } from 'react'; // Import useRef
import { motion } from 'framer-motion';
import { Send, Download } from 'lucide-react'; // Import Send and Download icons
import Navbar from './Landingpage/Navbar';
import html2canvas from 'html2canvas';

// Define the structure for a character object
interface Character {
  name: string;
  anime: string;
  image: string;
  quote: string;
}

// Raw data collected from searches for specific anime character birthdays.
// This data is used to populate the character map.
const rawCharacterData: { name: string; anime: string; date: string; quote: string; }[] = [
  // One Piece Characters
  { name: 'Portgas D. Ace', anime: 'One Piece', date: '01-01', quote: "I don't wanna live a thousand years. If I just live through today, that'll be enough." },
  { name: 'Usopp', anime: 'One Piece', date: '02-04', quote: "When does a man die? When he is shot in the heart by a bullet? No! When he is ravaged by an incurable disease? No! When he drinks a soup made from a poisonous mushroom?! No! A man dies when he is forgotten!" },
  { name: 'Sanji', anime: 'One Piece', date: '02-03', quote: "I can't be a hero, because I'm a pirate!" },
  { name: 'Brook', anime: 'One Piece', date: '03-04', quote: "Even in death, I am still fabulous!" },
  { name: 'Edward Newgate (Whitebeard)', anime: 'One Piece', date: '06-04', quote: "A man's dream... will never die!" },
  { name: 'Shanks', anime: 'One Piece', date: '09-03', quote: "You can pour drinks on me, you can throw food at me... You can even spit on me. I'll just laugh that stuff off. But... good reason or not... nobody hurts a friend of mine!" },
  { name: 'Dracule Mihawk', anime: 'One Piece', date: '09-03', quote: "Weakness is a sin." },
  { name: 'Franky', anime: 'One Piece', date: '09-03', quote: "SUPER!" },
  { name: 'Nami', anime: 'One Piece', date: '03-07', quote: "Luffy... help me." },
  { name: 'Nico Robin', anime: 'One Piece', date: '06-02', quote: "Ignorance is bliss." },
  { name: 'Roronoa Zoro', anime: 'One Piece', date: '11-11', quote: "A scar on the back is a swordsman's shame." },
  { name: 'Monkey D. Luffy', anime: 'One Piece', date: '05-05', quote: "I'm gonna be the King of the Pirates!" },
  { name: 'Jinbe', anime: 'One Piece', date: '02-04', quote: "Life is like a game of poker. If you don't show your hand, you'll never know if you're holding a winning one." },
  { name: 'Boa Hancock', anime: 'One Piece', date: '02-09', quote: "Whether I kick a kitten or tear off a man's ears, the world will forgive my actions, because I am beautiful!" },

  // Naruto Characters
  { name: 'Maito Gai', anime: 'Naruto', date: '01-01', quote: "The true strength of a shinobi is not in their jutsu, but in their unwavering spirit!" },
  { name: 'Haku', anime: 'Naruto', date: '09-01', quote: "When people are protecting something truly precious to them, they can become as strong as they need to be." },
  { name: 'Gaara', anime: 'Naruto', date: '19-01', quote: "I am a living proof that loneliness exists." },
  { name: 'Shino Aburame', anime: 'Naruto', date: '23-01', quote: "Never underestimate the power of quiet observation." },
  { name: 'Naruto Uzumaki', anime: 'Naruto', date: '10-10', quote: "I'm not gonna run away, I never go back on my word! That's my ninja way!" },
  { name: 'Sasuke Uchiha', anime: 'Naruto', date: '23-07', quote: "My name is Sasuke Uchiha. I hate a lot of things, and I don't particularly like anything." },
  { name: 'Sakura Haruno', anime: 'Naruto', date: '28-03', quote: "All I've been doing is watching you two from behind! Now, get a good look at my back!" },
  { name: 'Kakashi Hatake', anime: 'Naruto', date: '15-09', quote: "Those who break the rules are scum, but those who abandon their friends are worse than scum." },
  { name: 'Hinata Hyuga', anime: 'Naruto', date: '27-12', quote: "I will never go back on my word... because that too is my ninja way!" },
  { name: 'Rock Lee', anime: 'Naruto', date: '27-11', quote: "A genius, huh? What's that? A genius is someone who performs brilliantly, but their performance is still just the result of continuous effort!" },
  { name: 'Itachi Uchiha', anime: 'Naruto', date: '09-06', quote: "Foolish little brother... If you want to kill me, despise me, hate me, and live a long and unsightly life... Run away, run away, and cling to your life." },

  // Attack on Titan Characters
  { name: 'Eren Yeager', anime: 'Attack on Titan', date: '30-03', quote: "I'll kill them all! Every last one!" },
  { name: 'Mikasa Ackerman', anime: 'Attack on Titan', date: '10-02', quote: "The world is a cruel and beautiful place." },
  { name: 'Armin Arlert', anime: 'Attack on Titan', date: '03-11', quote: "I don't want to regret anything. So, I will move forward, no matter what." },
  { name: 'Levi Ackerman', anime: 'Attack on Titan', date: '25-12', quote: "The only thing we're allowed to do is believe that we won't regret the choice we made." },
  { name: 'Erwin Smith', anime: 'Attack on Titan', date: '14-10', quote: "Dedicate your hearts!" },
  { name: 'Historia Reiss', anime: 'Attack on Titan', date: '15-01', quote: "I am Historia Reiss, the true ruler of these walls." },
  { name: 'Annie Leonhart', anime: 'Attack on Titan', date: '22-03', quote: "I just want the world to be peaceful." },
  { name: 'Jean Kirschtein', anime: 'Attack on Titan', date: '07-04', quote: "The strong eat the weak. It's the law of the jungle." },
  { name: 'Sasha Braus', anime: 'Attack on Titan', date: '26-07', quote: "Meat!" },
  { name: 'Reiner Braun', anime: 'Attack on Titan', date: '01-08', quote: "I am the Armored Titan." },

  // Demon Slayer Characters
  { name: 'Tanjiro Kamado', anime: 'Demon Slayer', date: '14-07', quote: "No matter how many people you lose, you have no choice but to go on living." },
  { name: 'Zenitsu Agatsuma', anime: 'Demon Slayer', date: '03-09', quote: "I can only do the first form. But you can't defeat me either." },
  { name: 'Inosuke Hashibira', anime: 'Demon Slayer', date: '22-04', quote: "PIG ASSAULT!" },
  { name: 'Giyu Tomioka', anime: 'Demon Slayer', date: '08-02', quote: "Feel the rage. The powerful, pure rage of not being able to forgive." },
  { name: 'Mitsuri Kanroji', anime: 'Demon Slayer', date: '01-06', quote: "I really love all the members of the Demon Slayer Corps!" },
  { name: 'Obanai Iguro', anime: 'Demon Slayer', date: '15-09', quote: "I always believed that one day, my blade would be for her." },
  { name: 'Sanemi Shinazugawa', anime: 'Demon Slayer', date: '29-11', quote: "Demons are all terrible, no matter what!" },
  { name: 'Gyomei Himejima', anime: 'Demon Slayer', date: '23-08', quote: "Pity the demon." },
  { name: 'Muichiro Tokito', anime: 'Demon Slayer', date: '08-08', quote: "If you want to protect someone, then you just have to do it." },
  { name: 'Shinobu Kocho', anime: 'Demon Slayer', date: '24-02', quote: "It's alright. Just keep on breathing." },
  { name: 'Tengen Uzui', anime: 'Demon Slayer', date: '31-10', quote: "I am the God of Festivities!" },
  { name: 'Kyojuro Rengoku', anime: 'Demon Slayer', date: '10-05', quote: "Set your heart ablaze!" },

  // Death Note Characters
  { name: 'Light Yagami', anime: 'Death Note', date: '28-02', quote: "I'll take a potato chip... AND EAT IT!" },
  { name: 'L Lawliet', anime: 'Death Note', date: '31-10', quote: "I am justice." },
  { name: 'Misa Amane', anime: 'Death Note', date: '25-12', quote: "I can't imagine a world without Light!" },
  { name: 'Near (Nate River)', anime: 'Death Note', date: '24-08', quote: "If you use your head, you won't need to use the Death Note." },
  { name: 'Mello (Mihael Keehl)', anime: 'Death Note', date: '13-12', quote: "I will become number one." },
  { name: 'Touta Matsuda', anime: 'Death Note', date: '14-12', quote: "This is all for justice, right?!" },
  { name: 'Mail Jeevas (Matt)', anime: 'Death Note', date: '01-02', quote: "I hate this waiting game!" },

  // Bleach Characters
  { name: 'Shihoin Yoruichi', anime: 'Bleach', date: '01-01', quote: "Don't you dare try to run away now, after all that talk!" },
  { name: 'Kuchiki Rukia', anime: 'Bleach', date: '14-01', quote: "It's because we're not alone that we can stand strong." },
  { name: 'Kuchiki Byakuya', anime: 'Bleach', date: '31-01', quote: "I will eradicate any who stand in the way of my family's pride." },
  { name: 'Kurosaki Ichigo', anime: 'Bleach', date: '15-07', quote: "We're not fighting because we want to be stronger! We're fighting because we have to protect!" },
  { name: 'Uryu Ishida', anime: 'Bleach', date: '06-11', quote: "I do not care about your reasons. I only care about results." },
  { name: 'Orihime Inoue', anime: 'Bleach', date: '03-09', quote: "Even if I'm scared, I'll go forward. Even if I get hurt, I'll keep going." },
  { name: 'Yasutora Sado (Chad)', anime: 'Bleach', date: '07-04', quote: "I can't lose to anyone who puts their life on the line for someone else." },
  { name: 'Sosuke Aizen', anime: 'Bleach', date: '29-05', quote: "Admiration is the furthest state from understanding." },
  { name: 'Toshiro Hitsugaya', anime: 'Bleach', date: '20-12', quote: "My ice will make you regret ever being born!" },
  { name: 'Kenpachi Zaraki', anime: 'Bleach', date: '19-11', quote: "Don't get cocky. I'm just getting warmed up." },
  { name: 'Isshin Kurosaki', anime: 'Bleach', date: '10-12', quote: "Protect what matters, and never lose your cool!" },

  // My Hero Academia Characters
  { name: 'Izuku Midoriya', anime: 'My Hero Academia', date: '15-07', quote: "My motivation might seem trivial compared to yours, but I can't lose, either!" },
  { name: 'Katsuki Bakugo', anime: 'My Hero Academia', date: '20-04', quote: "I'll win with my own power!" },
  { name: 'Shoto Todoroki', anime: 'My Hero Academia', date: '11-01', quote: "It's not about being a good person, it's about being a hero." },
  { name: 'Ochaco Uraraka', anime: 'My Hero Academia', date: '27-12', quote: "I want to be able to help people and smile like All Might." },
  { name: 'Tenya Iida', anime: 'My Hero Academia', date: '22-08', quote: "As Class 1-A's representative, I must lead by example!" },
  { name: 'Eijiro Kirishima', anime: 'My Hero Academia', date: '16-10', quote: "It's not manly to back down!" },
  { name: 'Denki Kaminari', anime: 'My Hero Academia', date: '29-06', quote: "I'm... shocking!" },
  { name: 'Momo Yaoyorozu', anime: 'My Hero Academia', date: '23-09', quote: "I must use my quirk to help others!" },
  { name: 'All Might', anime: 'My Hero Academia', date: '10-06', quote: "I am here!" },
  { name: 'Dabi (Toya Todoroki)', anime: 'My Hero Academia', date: '18-01', quote: "Burn, baby, burn!" },
  { name: 'Nezu', anime: 'My Hero Academia', date: '01-01', quote: "I am the principal of U.A. High School, and I am not a mouse, nor a dog, nor a bear. I am Nezu!" },

  // Jujutsu Kaisen Characters
  { name: 'Yuji Itadori', anime: 'Jujutsu Kaisen', date: '20-03', quote: "I don't know how I'll feel when I die, but I don't want to regret the way I lived." },
  { name: 'Megumi Fushiguro', anime: 'Jujutsu Kaisen', date: '22-12', quote: "I don't think I'm strong enough to be truly selfish." },
  { name: 'Nobara Kugisaki', anime: 'Jujutsu Kaisen', date: '07-08', quote: "I love myself when I'm stylish and strong!" },
  { name: 'Satoru Gojo', anime: 'Jujutsu Kaisen', date: '07-12', quote: "I'm the strongest." },
  { name: 'Maki Zenin', anime: 'Jujutsu Kaisen', date: '20-01', quote: "Being weak is a sin." },
  { name: 'Toge Inumaki', anime: 'Jujutsu Kaisen', date: '23-10', quote: "Salmon." },
  { name: 'Panda', anime: 'Jujutsu Kaisen', date: '05-03', quote: "I'm a pure-hearted jujutsu sorcerer!" },
  { name: 'Kento Nanami', anime: 'Jujutsu Kaisen', date: '03-07', quote: "A salaryman's job is not so bad. But my heart desires something more." },

  // Sword Art Online Characters
  { name: 'Kirito (Kazuto Kirigaya)', anime: 'Sword Art Online', date: '07-10', quote: "I'd rather trust and regret than doubt and regret." },
  { name: 'Asuna Yuuki', anime: 'Sword Art Online', date: '30-09', quote: "There's no point in having power if you don't use it to protect those you love." },
  { name: 'Sinon (Shino Asada)', anime: 'Sword Art Online', date: '21-08', quote: "In this world, a single bullet can change everything." },
  { name: 'Leafa (Suguha Kirigaya)', anime: 'Sword Art Online', date: '19-04', quote: "I'll definitely protect you, no matter what!" },
  { name: 'Lisbeth (Rika Shinozaki)', anime: 'Sword Art Online', date: '18-05', quote: "I'm a blacksmith, not some princess!" },

  // Hunter x Hunter Characters
  { name: 'Leorio Paradinight', anime: 'Hunter x Hunter', date: '03-03', quote: "I want money... so I can be a doctor!" },
  { name: 'Kurapika', anime: 'Hunter x Hunter', date: '04-04', quote: "I do not fear death. I fear only that my rage will fade over time." },
  { name: 'Gon Freecss', anime: 'Hunter x Hunter', date: '05-05', quote: "If you want to get to know someone, find out what makes them angry." },
  { name: 'Hisoka Morow', anime: 'Hunter x Hunter', date: '06-06', quote: "Love and hate are two sides of the same coin." },
  { name: 'Killua Zoldyck', anime: 'Hunter x Hunter', date: '07-07', quote: "I don't want to live the way my parents want me to." },

  // One Punch Man Characters
  { name: 'Saitama', anime: 'One-Punch Man', date: '24-03', quote: "Okay." },
  { name: 'Genos', anime: 'One-Punch Man', date: '10-04', quote: "I'll destroy everything, even if it kills me." },

  // Black Clover Characters
  { name: 'Asta', anime: 'Black Clover', date: '04-10', quote: "My magic is never giving up!" },
  { name: 'Yami Sukehiro', anime: 'Black Clover', date: '17-09', quote: "Surpass your limits. Right here. Right now!" },
  { name: 'Nacht Faust', anime: 'Black Clover', date: '30-04', quote: "Only a fool believes in perfection." },
  { name: 'Vanessa Enoteca', anime: 'Black Clover', date: '16-05', quote: "It's okay to make mistakes, as long as you learn from them." },
  { name: 'Charmy Pappitson', anime: 'Black Clover', date: '03-06', quote: "I just wanted to eat in peace!" },
  { name: 'Gordon Agrippa', anime: 'Black Clover', date: '13-01', quote: "Nee-hee-hee, I'm just here to observe..." },
  { name: 'Noelle Silva', anime: 'Black Clover', date: '15-11', quote: "I'm a royal, and I'm going to prove it!" },
  { name: 'Grey', anime: 'Black Clover', date: '20-02', quote: "I can change, just like my magic." },
  { name: 'Magna Swing', anime: 'Black Clover', date: '07-04', quote: "Respect the senior!" },
  { name: 'Luck Voltia', anime: 'Black Clover', date: '11-10', quote: "Let's fight! I want to fight you!" },

  // Chainsaw Man Characters
  { name: 'Aki Hayakawa', anime: 'Chainsaw Man', date: '11-11', quote: "I'll kill the Gun Devil." },
  { name: 'Himeno', anime: 'Chainsaw Man', date: '11-05', quote: "The best way to overcome fear is to confront it." },
  { name: 'Kobeni Higashiyama', anime: 'Chainsaw Man', date: '23-08', quote: "I just want to live a normal life!" },
  { name: 'Denji', anime: 'Chainsaw Man', date: '29-10', quote: "I just wanna touch some boobs and eat some good food!" },
  { name: 'Power', anime: 'Chainsaw Man', date: '26-11', quote: "I am Power! The Blood Fiend!" },

  // Solo Leveling (Manhwa, but requested - using fan-derived dates where exact dates are not easily available)
  { name: 'Sung Jinwoo', anime: 'Solo Leveling', date: '08-03', quote: "Arise." },
  { name: 'Cha Hae-In', anime: 'Solo Leveling', date: '26-11', quote: "I am a hunter, it's what I do." },
  { name: 'Go Gunhee', anime: 'Solo Leveling', date: '15-02', quote: "The weak will always be prey for the strong." },

  // Dragon Ball (Often lacks official birthdays, adding a few common ones or generics)
  { name: 'Goku', anime: 'Dragon Ball Z', date: '16-04', quote: "Hi! I'm Goku! And I'm insane!" }, // Fan-derived date
  { name: 'Vegeta', anime: 'Dragon Ball Z', date: '14-08', quote: "I am the Saiyan prince!" }, // Fan-derived date
  { name: 'Gohan', anime: 'Dragon Ball Z', date: '18-05', quote: "I'll protect my family!" }, // Fan-derived date
  { name: 'Piccolo', anime: 'Dragon Ball Z', date: '09-05', quote: "I am the demon king's son!" }, // Fan-derived date

  // Tokyo Ghoul characters (Often lack official birthdays, using placeholders)
  { name: 'Ken Kaneki', anime: 'Tokyo Ghoul', date: '20-12', quote: "I am not the protagonist of a novel or anything. I'm just a student who likes to read, like you." },
  { name: 'Touka Kirishima', anime: 'Tokyo Ghoul', date: '01-07', quote: "You think you can just do whatever you want to people, and then make them forget about it?" },
  { name: 'Juuzou Suzuya', anime: 'Tokyo Ghoul', date: '08-06', quote: "It's always the same. Humans kill ghouls, ghouls kill humans." },
  { name: 'Hideyoshi Nagachika', anime: 'Tokyo Ghoul', date: '10-06', quote: "If you're so worried about me, then just keep me safe!" },

  // Fullmetal Alchemist: Brotherhood (Few official birthdays, using placeholders)
  { name: 'Edward Elric', anime: 'Fullmetal Alchemist: Brotherhood', date: '03-02', quote: "A lesson without pain is meaningless. For you cannot gain something without sacrificing something else in return." },
  { name: 'Alphonse Elric', anime: 'Fullmetal Alchemist: Brotherhood', date: '01-03', quote: "It's a cruel world, but it's also beautiful." },
  { name: 'Roy Mustang', anime: 'Fullmetal Alchemist: Brotherhood', date: '26-06', quote: "The power of alchemy is in its ability to destroy." },
];

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
