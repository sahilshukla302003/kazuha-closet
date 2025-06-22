"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const wallpapers = {
  naruto: Array.from({ length: 15 }, (_, i) => `/wallpapers/naruto/n${i + 1}.jpg`),
  demonslayer: Array.from({ length: 15 }, (_, i) => `/wallpapers/demonslayer/ds${i + 1}.jpg`),
  dragonball: Array.from({ length: 15 }, (_, i) => `/wallpapers/dragonball/db${i + 1}.jpg`),
  jujutsu: Array.from({ length: 15 }, (_, i) => `/wallpapers/jujutsukaisen/jk${i + 1}.jpg`),
  onepiece: Array.from({ length: 15 }, (_, i) => `/wallpapers/onepiece/op${i + 1}.jpg`),
};

const categories = [
  { key: "all", label: "All" },
  { key: "naruto", label: "Naruto" },
  { key: "demonslayer", label: "Demon Slayer" },
  { key: "dragonball", label: "Dragon Ball" },
  { key: "jujutsu", label: "Jujutsu Kaisen" },
  { key: "onepiece", label: "One Piece" },
];

const ScrollSlider = ({ images }: { images: string[] }) => {
  const loopImages = [...images, ...images];
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex w-max whitespace-nowrap gap-5"
        style={{
          animation: selectedImg ? "none" : "scrollX 40s linear infinite",
        }}
      >
        {loopImages.map((src, index) => (
          <div
            key={index}
            className="relative group flex-shrink-0 w-[250px] h-[350px] rounded-xl overflow-hidden shadow-xl border border-white/10 bg-zinc-900 cursor-pointer"
            onClick={() => setSelectedImg(src)}
          >
            <Image
              src={src}
              alt={`wallpaper-${index}`}
              width={250}
              height={350}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </motion.div>

      {selectedImg && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImg(null)}
        >
          <motion.div
            className="relative"
            style={{ width: "375px", height: "525px" }}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImg}
              alt="Selected Wallpaper"
              width={375}
              height={525}
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              <a
                href={selectedImg}
                download
                className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                Download
              </a>
              <button
                onClick={() => setSelectedImg(null)}
                className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default function WallpapersPage() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof wallpapers | "all">("all");

  const filteredCategories =
    selectedCategory === "all"
      ? Object.keys(wallpapers) as (keyof typeof wallpapers)[]
      : [selectedCategory];

  return (
    <>
      <style jsx>{`
        @keyframes scrollX {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <main className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white px-4 sm:px-10 py-16 space-y-16">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center text-4xl sm:text-5xl font-extrabold tracking-wide bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent"
        >
          Explore Epic Anime Wallpapers
        </motion.h1>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                selectedCategory === key
                  ? "bg-white text-black border-white"
                  : "bg-zinc-800 text-white border-white/20 hover:bg-white hover:text-black"
              }`}
              onClick={() => setSelectedCategory(key as any)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Filtered Sections */}
        {filteredCategories.map((key) => (
          <section key={key} className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase text-white tracking-wide">
                {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
              </h2>
              <div className="h-1 w-24 mx-auto mt-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full" />
            </div>
            <ScrollSlider images={wallpapers[key]} />
          </section>
        ))}
      </main>
    </>
  );
}
