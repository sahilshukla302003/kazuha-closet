'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Loader() {
  const progressPx = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const narutoWidth = 96; // w-24

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;

      const controls = animate(progressPx, containerWidth, {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      });

      return controls.stop;
    }
  }, []);

  const barWidth = useTransform(progressPx, (v) => `${v}px`);
  const narutoX = useTransform(progressPx, (v) => {
    const x = v - narutoWidth / 2;
    return Math.max(0, x);
  });

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
      <div
        ref={containerRef}
        className="relative w-[90vw] sm:w-[400px] max-w-[400px] h-28 overflow-hidden"
      >
        {/* Background bar */}
        <div className="absolute bottom-0 left-0 w-full h-3 bg-gray-700 rounded-full" />

        {/* Orange progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-3 bg-orange-500 rounded-full"
          style={{ width: barWidth }}
        />

        {/* Naruto image */}
        <motion.img
          src="/videos/loader.gif"
          alt="Naruto"
          className="absolute bottom-3 w-24 h-24 pointer-events-none"
          style={{ x: narutoX }}
        />
      </div>
    </div>
  );
}
