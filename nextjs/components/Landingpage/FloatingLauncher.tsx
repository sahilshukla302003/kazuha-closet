'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PartyPopper } from 'lucide-react';

const FloatingLauncher = () => {
  const router = useRouter();

  return (
    <motion.button
      onClick={() => router.push('/Birthday')}
      initial={{ y: 0 }}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-yellow-300 rounded-full shadow-2xl border border-white ring-2 ring-white hover:scale-110 transition-all flex items-center justify-center"
    >
      <PartyPopper className="text-black w-5 h-5" />
    </motion.button>
  );
};

export default FloatingLauncher;
