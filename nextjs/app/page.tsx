'use client';

import Sidebar from '../components/Landingpage/Sidebar';
import Navbar from '../components/Landingpage/Navbar';
import PromoCard from '../components/Landingpage/PromoCard';
import ProductShowcase from '../components/Landingpage/ProductShowcase';
import AboutSection from '../components/Landingpage/AboutSection';
import ContactSection from '../components/Landingpage/ContactSection';
import Wallpaper from '../components/Landingpage/wallpaper';
import BirthdayAnimeGame from '../components/BirthdayAnimeGame';

export default function Home() {
  return (
    <main className="relative bg-gradient-to-bl from-black via-zinc-800 to-zinc-300 min-h-screen scroll-smooth overflow-x-hidden">
      <Sidebar />

      {/* Home Section */}
      <section id="home" className="p-10 transition-all duration-300 relative w-full">
        <Navbar />

        {/* PromoCard centered */}
        <div className="max-w-[1000px] mx-auto">
          <PromoCard />
        </div>

        {/* BirthdayAnimeGame absolutely positioned to full screen's bottom right */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:right-10 md:translate-x-0 lg:right-16 z-30 flex flex-col gap-4 items-center md:items-end">
          <BirthdayAnimeGame />
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="pt-2 md:pt-10">
        <ProductShowcase />
      </section>

      {/* About Section */}
      <section id="about" className="pt-2 md:pt-10 px-4 mb-[-6px]">
        <AboutSection />
      </section>

      {/* Wallpapers Section */}
      <section id="wallpapers" className="mt-[-64px] md:mt-[-96px]">
        <Wallpaper />
      </section>

      {/* Contact Section */}
      <section id="contact" className="mt-6 md:mt-20">
        <ContactSection />
      </section>
    </main>
  );
}
