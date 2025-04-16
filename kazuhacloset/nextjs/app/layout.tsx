// app/layout.tsx
import './globals.css';  // Import global CSS
import { Luckiest_Guy } from 'next/font/google';  // Import Google font
import type { Metadata } from 'next';  // Import Metadata type from Next.js

// Apply the Luckiest_Guy font to the layout
const luckiest = Luckiest_Guy({
  subsets: ['latin'],  // Specify the font subsets
  weight: '400',  // Set the weight of the font
});

// Define the metadata for the page, including the title
export const metadata: Metadata = {
  title: 'Naruto T-Shirt Landing',  // Set the page title
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;  // Define the type for children prop
}) {
  return (
    <html lang="en" suppressHydrationWarning={true} data-qb-installed="true">
      <head>
        {/* You might want to add meta tags or link elements here, like favicon or charset */}
      </head>
      <body className={luckiest.className}>
        {children}
      </body>
    </html>
  );
}
