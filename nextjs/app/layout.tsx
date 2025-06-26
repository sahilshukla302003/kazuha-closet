'use client';

import './globals.css';
import 'aos/dist/aos.css';
import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Initial load timeout
    const timer = setTimeout(() => setLoading(false), 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`bg-[#1b1b1d] ${poppins.className}`}>
        <main className="relative min-h-screen overflow-x-hidden">
          {loading ? <Loader /> : children}
        </main>
      </body>
    </html>
  );
}
