"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const wallpapers = [
  { id: 1, src: "/wallpapers/wall1.jpg" },
  { id: 2, src: "/wallpapers/wall2.jpg" },
  { id: 3, src: "/wallpapers/wall3.jpg" },
  { id: 4, src: "/wallpapers/wall4.jpg" },
  { id: 5, src: "/wallpapers/wall5.jpg" },
];

export default function WallpapersSection() {
  const loopWallpapers = [...wallpapers, ...wallpapers];

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

        .scrolling-wrapper {
          animation: scrollX 25s linear infinite;
        }
      `}</style>

      <section className="py-16 px-4 sm:px-10">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-4xl sm:text-5xl font-extrabold tracking-wide"
          >
            WALLPAPERS
          </motion.h2>

          <div className="h-1 w-24 mx-auto my-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-full" />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-300 text-base sm:text-lg"
          >
            Download high-quality anime wallpapers
          </motion.p>
        </div>

        {/* Scrolling container */}
        <div className="relative overflow-hidden">
          <div className="flex w-max whitespace-nowrap gap-6 scrolling-wrapper">
            {loopWallpapers.map((wall, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[275px] h-[400px] rounded-xl overflow-hidden shadow-xl border border-white/10 bg-zinc-900"
              >
                <Image
                  src={wall.src}
                  alt={`Wallpaper ${index}`}
                  width={275}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-10"
        >
          <Link href="/wallpapers">
            <button className="bg-white text-black font-semibold px-6 py-2 rounded-xl hover:bg-gray-300 transition-all">
              View All Wallpapers
            </button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
