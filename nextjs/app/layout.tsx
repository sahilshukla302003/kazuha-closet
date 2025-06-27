// app/layout.tsx
import './globals.css';
import 'aos/dist/aos.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import type { Metadata } from 'next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Naruto T-Shirt Landing',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`bg-[#1b1b1d] ${poppins.className}`}>
        <main className="relative min-h-screen overflow-x-hidden">
          {children}
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


