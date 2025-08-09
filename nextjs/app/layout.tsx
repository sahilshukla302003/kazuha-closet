'use client';

import './globals.css';
import 'aos/dist/aos.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/Loader';
import FloatingLauncher from '@/components/Landingpage/FloatingLauncher';

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
              <FloatingLauncher />
            </>
          )}
        </main>

        {/* 🔥 Custom Toaster Styling with Avatar Icons */}
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'custom-toast',
            duration: 3500,
            success: {
              icon: (
                <img
                  src="/pass.png"
                  alt="Success"
                  className="w-8 h-8 rounded-full toast-avatar-glow"
                />
              ),
            },
            error: {
              icon: (
                <img
                  src="/fail.png"
                  alt="Error"
                  className="w-8 h-8 rounded-full toast-avatar-glow"
                />
              ),
            },
          }}
        />
      </body>
    </html>
  );
}
