// app/layout.tsx
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet" />
import './globals.css';
import { Luckiest_Guy } from 'next/font/google';
import 'aos/dist/aos.css';

import type { Metadata } from 'next';
import Sidebar from '../components/Landingpage/Sidebar'; // 👈 import Sidebar

const luckiest = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
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
      <head />
      <body className={`${luckiest.className} bg-[#1b1b1d]`}>
        {/* Global Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="relative min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
