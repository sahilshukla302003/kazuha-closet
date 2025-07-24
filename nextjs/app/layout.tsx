'use client';

import './globals.css';
import 'aos/dist/aos.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader';
import FloatingLauncher from '@/components/Landingpage/FloatingLauncher'; // 👈 NEW

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
          {loading ? (
            <Loader />
          ) : (
            <>
              {children}
              <FloatingLauncher /> {/* 👈 Bold floating button always visible */}
            </>
          )}
        </main>
      
<Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#1f1f1f',
      color: '#facc15',
      fontWeight: 'bold',
      borderRadius: '10px',
      padding: '12px 16px',
      boxShadow: '0 0 10px rgba(255, 255, 255, 0.15)',
      border: '1px solid #facc15',
    },
    success: {
      iconTheme: {
        primary: '#22c55e',
        secondary: '#1f1f1f',
      },
    },
    error: {
      iconTheme: {
        primary: '#f87171',
        secondary: '#1f1f1f',
      },
    },
  }}
/>

      </body>
    </html>
  );
}


